#!/usr/bin/env node
/**
 * YardCalc SEO / AEO auditor — fails CI on guardrail violations.
 * See docs/SEO-GUARDRAILS.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DIST,
  isAssetHref,
  relUrl,
  resolveInternalTarget,
  stripTags,
  walkHtml,
} from './lib.mjs';
import {
  DEFAULT_SITE_URL,
  resolveSiteOrigin,
} from '../../src/config/site-origin.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

/** Explanatory article block; full <main> must still clear PAGE_MIN. */
const MIN_TOOL_WORDS = 450;
const PAGE_MIN = 600;
const MIN_GUIDE_WORDS = 800;
/** Fail CI when title is outside this range (aim ~30–60 in copy). */
const TITLE_MIN = 25;
const TITLE_MAX = 65;
/** Fail CI when meta description is outside this range (aim ~120–160). */
const DESC_MIN = 70;
const DESC_MAX = 160;

// Built in parts so this auditor file does not itself contain the forbidden host string.
const THIS_WORKERS_HOST = [
  'home-garden-calculators',
  'hammadiqbal117',
  'workers.dev',
].join('.');
const WORKERS_ALLOWLIST = new Set([
  path.join(ROOT, 'src/config/site-origin.mjs'),
  path.join(ROOT, 'docs/CUSTOM-DOMAIN.md'),
]);

const SITE_ORIGIN = resolveSiteOrigin(process.env);
const SITE_HOST = new URL(SITE_ORIGIN).host;

let errors = 0;
let warnings = 0;
const fail = (msg) => {
  console.error(`ERROR: ${msg}`);
  errors++;
};
const warn = (msg) => {
  console.warn(`WARN: ${msg}`);
  warnings++;
};

function walkRepoFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      ent.name === 'node_modules' ||
      ent.name === 'dist' ||
      ent.name === '.git' ||
      ent.name === '.astro'
    ) {
      continue;
    }
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (path.relative(ROOT, p) === path.join('docs', 'proof')) continue;
      walkRepoFiles(p, out);
    } else if (ent.isFile()) {
      out.push(p);
    }
  }
  return out;
}

function collectSitemapLocs(sitemapPath, depth = 0) {
  const locs = new Set();
  if (!sitemapPath || !fs.existsSync(sitemapPath) || depth > 5) return locs;
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  for (const m of sm.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    const loc = m[1].trim();
    locs.add(loc);
    // Child sitemap referenced from index
    if (/sitemap.*\.xml$/i.test(loc) && !/<urlset/i.test(sm)) {
      try {
        const u = new URL(loc);
        const child = path.join(DIST, u.pathname.replace(/^\//, ''));
        for (const c of collectSitemapLocs(child, depth + 1)) locs.add(c);
      } catch {
        /* ignore bad loc */
      }
    }
  }
  return locs;
}

function pagePathToSitemapUrl(url) {
  // relUrl is like /calculators/foo/ or /404.html
  if (url === '/404.html' || url === '/404/') return null;
  const origin = SITE_ORIGIN.replace(/\/$/, '');
  if (url === '/') return `${origin}/`;
  return `${origin}${url.endsWith('/') ? url : `${url}/`}`;
}

// —— Repo-wide: this site's workers.dev host (allowlisted files only) ——
for (const file of walkRepoFiles(ROOT)) {
  const abs = path.resolve(file);
  if (WORKERS_ALLOWLIST.has(abs)) continue;
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (text.includes(THIS_WORKERS_HOST)) {
    fail(
      `hardcoded ${THIS_WORKERS_HOST} in ${path.relative(ROOT, file)} (only allowed in src/config/site-origin.mjs and docs/CUSTOM-DOMAIN.md)`,
    );
  }
}

// —— IndexNow key in site.ts + public key file ——
const siteTsPath = path.join(ROOT, 'src/config/site.ts');
const siteTs = fs.existsSync(siteTsPath)
  ? fs.readFileSync(siteTsPath, 'utf8')
  : '';
const indexNowMatch = siteTs.match(/indexNowKey:\s*['"]([^'"]*)['"]/);
const indexNowKey = indexNowMatch?.[1] ?? '';
const PLACEHOLDER_KEYS = new Set([
  '',
  'changeme',
  'your_key',
  'YOUR_KEY',
  'xxxxxxxx',
  'placeholder',
]);
if (
  PLACEHOLDER_KEYS.has(indexNowKey) ||
  /^x{8,}$/i.test(indexNowKey) ||
  /placeholder/i.test(indexNowKey)
) {
  fail(`IndexNow placeholder key in site.ts (indexNowKey=${JSON.stringify(indexNowKey)})`);
} else if (indexNowKey) {
  const keyFile = path.join(ROOT, 'public', `${indexNowKey}.txt`);
  if (!fs.existsSync(keyFile)) {
    fail(`IndexNow key file missing: public/${indexNowKey}.txt`);
  } else {
    const body = fs.readFileSync(keyFile, 'utf8').trim();
    if (body !== indexNowKey) {
      fail(
        `IndexNow key file body does not match indexNowKey (public/${indexNowKey}.txt)`,
      );
    }
  }
} else {
  fail('IndexNow indexNowKey missing in site.ts');
}

if (!fs.existsSync(DIST)) {
  fail('dist/ missing — run npm run build first');
  process.exit(1);
}

const pages = walkHtml().filter((f) => !relUrl(f).includes('/embed/'));

// —— robots.txt ——
const robots = fs.existsSync(path.join(DIST, 'robots.txt'))
  ? fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8')
  : '';
if (!robots) fail('robots.txt missing in dist');
for (const bot of [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Claude-SearchBot',
]) {
  if (!robots.includes(bot)) warn(`robots.txt does not mention ${bot}`);
}
const sitemapLine = robots.match(/^\s*Sitemap:\s*(\S+)/im)?.[1];
if (!sitemapLine) {
  fail('robots.txt missing Sitemap absolute URL');
} else {
  try {
    const u = new URL(sitemapLine);
    if (u.host !== SITE_HOST) {
      fail(
        `robots.txt Sitemap must use SITE_ORIGIN (${SITE_ORIGIN}); got ${sitemapLine}`,
      );
    }
  } catch {
    fail(`robots.txt Sitemap is not an absolute URL: ${sitemapLine}`);
  }
}

// —— sitemap presence + locs ——
const sitemapPath = ['sitemap-index.xml', 'sitemap.xml']
  .map((f) => path.join(DIST, f))
  .find((p) => fs.existsSync(p));
let sitemapLocs = new Set();
if (!sitemapPath) {
  fail('sitemap-index.xml / sitemap.xml missing');
} else {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  if (!/<urlset|<sitemapindex/i.test(sm)) fail('sitemap does not look like XML sitemap');
  sitemapLocs = collectSitemapLocs(sitemapPath);
}

// —— Placeholder / bad absolute hosts in dist ——
const BAD_DIST_HOST_RE =
  /https?:\/\/(?:www\.)?(?:example\.com|yardcalc\.example|localhost)(?:[:/]|\"|'|\s|$)/gi;

const inbound = new Map(pages.map((f) => [relUrl(f), 0]));

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const url = relUrl(file);
  if (url === '/404.html' || url === '/404/') continue;

  if (BAD_DIST_HOST_RE.test(html)) {
    fail(`${url}: contains example.com / yardcalc.example / localhost absolute URL`);
  }
  // reset lastIndex after /g test
  BAD_DIST_HOST_RE.lastIndex = 0;

  // Also catch bare host strings without requiring full match edge cases
  if (
    /example\.com|yardcalc\.example|localhost/i.test(html) &&
    /https?:\/\//i.test(html)
  ) {
    for (const m of html.matchAll(
      /https?:\/\/[^\s"'<>]+/gi,
    )) {
      try {
        const u = new URL(m[0]);
        if (
          u.hostname === 'example.com' ||
          u.hostname === 'www.example.com' ||
          u.hostname === 'yardcalc.example' ||
          u.hostname === 'localhost' ||
          u.hostname === '127.0.0.1'
        ) {
          fail(`${url}: forbidden absolute URL ${m[0]}`);
        }
      } catch {
        /* skip */
      }
    }
  }

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || '';
  if (!title) fail(`${url}: missing <title>`);
  else {
    const titleLen = [...title].length;
    if (titleLen < TITLE_MIN || titleLen > TITLE_MAX) {
      fail(
        `${url}: title length ${titleLen} outside ${TITLE_MIN}–${TITLE_MAX}`,
      );
    }
  }

  const desc =
    html.match(
      /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i,
    )?.[1] ??
    html.match(
      /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i,
    )?.[1];
  if (!desc) fail(`${url}: missing meta description`);
  else {
    const len = [...desc].length;
    if (len < DESC_MIN || len > DESC_MAX) {
      fail(
        `${url}: meta description length ${len} outside ${DESC_MIN}–${DESC_MAX}`,
      );
    }
  }

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length === 0) fail(`${url}: missing H1`);
  else if (h1s.length > 1) fail(`${url}: expected 1 H1, found ${h1s.length}`);

  const canonical = html.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
  )?.[1];
  if (!canonical) fail(`${url}: missing canonical`);
  else {
    if (!canonical.endsWith('/')) warn(`${url}: canonical should end with /`);
    try {
      const u = new URL(canonical);
      if (u.host !== SITE_HOST) {
        fail(
          `${url}: canonical host ${u.host} != PUBLIC_SITE_URL / SITE_ORIGIN host ${SITE_HOST}`,
        );
      }
    } catch {
      fail(`${url}: canonical not absolute URL`);
    }
  }

  const ogImage =
    html.match(
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
    )?.[1] ??
    html.match(
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i,
    )?.[1];
  if (ogImage && /\/$/.test(ogImage)) {
    fail(`${url}: og:image must not end with / (${ogImage})`);
  }

  if (
    !/property=["']og:title["']/i.test(html) ||
    !/property=["']og:description["']/i.test(html) ||
    !/property=["']og:url["']/i.test(html)
  ) {
    fail(`${url}: incomplete Open Graph tags`);
  }

  const jsonBlocks = [
    ...html.matchAll(
      /<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi,
    ),
  ];
  if (
    (url === '/' ||
      url.startsWith('/calculators/') ||
      url.startsWith('/guides/') ||
      url.startsWith('/hubs/')) &&
    jsonBlocks.length === 0
  ) {
    fail(`${url}: missing JSON-LD`);
  }
  for (const [, raw] of jsonBlocks) {
    try {
      JSON.parse(raw);
    } catch {
      fail(`${url}: invalid JSON-LD`);
    }
  }

  // Inline classic scripts must not contain `import` (breaks GA / parsers)
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1] || '';
    const body = m[2] || '';
    if (/type\s*=\s*["']module["']/i.test(attrs)) continue;
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    if (/src\s*=/i.test(attrs) && !body.trim()) continue;
    if (/\bimport\b/.test(body)) {
      fail(`${url}: inline non-module script contains import`);
    }
  }

  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=/i.test(m[1])) warn(`${url}: img missing alt`);
  }

  // Tool pages: word counts + must link a guide
  if (url.startsWith('/calculators/') && url !== '/calculators/') {
    const prose =
      html.match(/<article[\s\S]*?<\/article>/i)?.[0] ||
      html.match(/<main[\s\S]*?<\/main>/i)?.[0] ||
      html;
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
    const proseWords = stripTags(prose).split(/\s+/).filter(Boolean).length;
    const pageWords = stripTags(main).split(/\s+/).filter(Boolean).length;
    if (proseWords < MIN_TOOL_WORDS) {
      fail(`${url}: tool article word count ${proseWords} < ${MIN_TOOL_WORDS}`);
    }
    if (pageWords < PAGE_MIN) {
      fail(`${url}: tool page <main> word count ${pageWords} < ${PAGE_MIN}`);
    }
    if (!/href=["']\/guides\//i.test(html)) {
      fail(`${url}: tool page has no /guides/ link`);
    }
  }

  // Guides: ≥800 words in article
  if (url.startsWith('/guides/') && url !== '/guides/') {
    const article =
      html.match(/<article[\s\S]*?<\/article>/i)?.[0] ||
      html.match(/<main[\s\S]*?<\/main>/i)?.[0] ||
      html;
    const words = stripTags(article).split(/\s+/).filter(Boolean).length;
    if (words < MIN_GUIDE_WORDS) {
      fail(`${url}: guide article word count ${words} < ${MIN_GUIDE_WORDS}`);
    }
  }

  // Sitemap coverage
  const expectedLoc = pagePathToSitemapUrl(url);
  if (expectedLoc && sitemapLocs.size) {
    const variants = new Set([
      expectedLoc,
      expectedLoc.replace(/\/$/, ''),
      `${expectedLoc.replace(/\/$/, '')}/`,
    ]);
    let found = false;
    for (const v of variants) {
      if (sitemapLocs.has(v)) {
        found = true;
        break;
      }
    }
    // Trust pages / legal may be omitted on some templates — still require indexable content pages
    if (
      !found &&
      (url === '/' ||
        url.startsWith('/calculators/') ||
        url.startsWith('/guides/') ||
        url.startsWith('/hubs/') ||
        url.startsWith('/about') ||
        url.startsWith('/contact') ||
        url.startsWith('/privacy') ||
        url.startsWith('/terms') ||
        url.startsWith('/embed-info') ||
        url.startsWith('/methodology'))
    ) {
      fail(`${url}: missing from sitemap locs (expected ${expectedLoc})`);
    }
  }

  for (const m of html.matchAll(/href=["'](\/[^"']*)/gi)) {
    const href = m[1].split('#')[0].split('?')[0];
    if (!href) continue;
    if (isAssetHref(href)) {
      if (!fs.existsSync(resolveInternalTarget(href))) {
        fail(`${url}: missing asset ${href}`);
      }
      continue;
    }
    let norm = href.endsWith('/') || href.endsWith('.html') ? href : `${href}/`;
    if (norm === '/404/') continue;
    if (inbound.has(norm)) inbound.set(norm, inbound.get(norm) + 1);
    else if (inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
    if (!fs.existsSync(resolveInternalTarget(href))) {
      fail(`${url}: broken internal link ${href}`);
    }
  }
}

// Also scan non-HTML dist assets for bad hosts (e.g. js, txt, xml)
function walkDistAll(dir = DIST, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkDistAll(p, out);
    else out.push(p);
  }
  return out;
}
for (const file of walkDistAll()) {
  if (/\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|map)$/i.test(file)) continue;
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  for (const m of text.matchAll(/https?:\/\/[^\s"'<>]+/gi)) {
    try {
      const u = new URL(m[0].replace(/[.,;)\]]+$/, ''));
      if (
        u.hostname === 'example.com' ||
        u.hostname === 'www.example.com' ||
        u.hostname === 'yardcalc.example' ||
        u.hostname === 'localhost' ||
        u.hostname === '127.0.0.1'
      ) {
        fail(
          `dist/${path.relative(DIST, file)}: forbidden absolute URL ${m[0]}`,
        );
      }
    } catch {
      /* skip */
    }
  }
}

for (const [u, count] of inbound) {
  if (u === '/' || u.includes('/embed/') || u.includes('404')) continue;
  if (count === 0) fail(`orphan page (no inbound internal links): ${u}`);
}

console.log(
  `SEO audit: ${pages.length} pages, ${errors} errors, ${warnings} warnings (SITE_ORIGIN=${SITE_ORIGIN}, default=${DEFAULT_SITE_URL})`,
);
process.exit(errors ? 1 : 0);

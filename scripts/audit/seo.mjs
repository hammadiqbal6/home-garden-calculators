#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {
  DIST,
  isAssetHref,
  relUrl,
  resolveInternalTarget,
  stripTags,
  walkHtml,
} from './lib.mjs';

const SITE_HOST_RE = /yardcalc\.example|localhost/;
/** Explanatory article block; full <main> must still clear PAGE_MIN (spec 600+). */
const MIN_TOOL_WORDS = 450;
const PAGE_MIN_WORDS = 600;
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

if (!fs.existsSync(DIST)) {
  fail('dist/ missing — run npm run build first');
  process.exit(1);
}

const pages = walkHtml().filter((f) => !relUrl(f).includes('/embed/'));

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
if (!/Sitemap:\s*https?:\/\//i.test(robots)) fail('robots.txt missing Sitemap absolute URL');

const sitemapPath = ['sitemap-index.xml', 'sitemap.xml']
  .map((f) => path.join(DIST, f))
  .find((p) => fs.existsSync(p));
if (!sitemapPath) fail('sitemap-index.xml / sitemap.xml missing');
else {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  if (!/<urlset|<sitemapindex/i.test(sm)) fail('sitemap does not look like XML sitemap');
}

const inbound = new Map(pages.map((f) => [relUrl(f), 0]));

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const url = relUrl(file);
  if (url === '/404.html' || url === '/404/') continue;

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || '';
  if (!title) fail(`${url}: missing <title>`);
  else if ([...title].length > 65) warn(`${url}: title length ${[...title].length} > 60–65`);

  const desc = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i,
  )?.[1];
  if (!desc) fail(`${url}: missing meta description`);
  else if ([...desc].length > 165) warn(`${url}: meta description ${[...desc].length} > 155–160`);

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length !== 1) fail(`${url}: expected 1 H1, found ${h1s.length}`);

  const canonical = html.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
  )?.[1];
  if (!canonical) fail(`${url}: missing canonical`);
  else {
    if (!canonical.endsWith('/')) warn(`${url}: canonical should end with /`);
    try {
      const u = new URL(canonical);
      if (!SITE_HOST_RE.test(u.host)) warn(`${url}: canonical host ${u.host}`);
    } catch {
      fail(`${url}: canonical not absolute URL`);
    }
  }

  if (
    !/property=["']og:title["']/i.test(html) ||
    !/property=["']og:description["']/i.test(html) ||
    !/property=["']og:url["']/i.test(html)
  ) {
    fail(`${url}: incomplete Open Graph tags`);
  }

  const jsonBlocks = [
    ...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi),
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

  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=/i.test(m[1])) warn(`${url}: img missing alt`);
  }

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
    if (pageWords < PAGE_MIN_WORDS) {
      fail(`${url}: tool page <main> word count ${pageWords} < ${PAGE_MIN_WORDS}`);
    }
  }

  for (const m of html.matchAll(/href=["'](\/[^"']*)/gi)) {
    const href = m[1].split('#')[0].split('?')[0];
    if (!href) continue;
    if (isAssetHref(href)) {
      if (!fs.existsSync(resolveInternalTarget(href))) fail(`${url}: missing asset ${href}`);
      continue;
    }
    let norm = href.endsWith('/') || href.endsWith('.html') ? href : `${href}/`;
    if (norm === '/404/') continue;
    if (inbound.has(norm)) inbound.set(norm, inbound.get(norm) + 1);
    else if (inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
    if (!fs.existsSync(resolveInternalTarget(href))) fail(`${url}: broken internal link ${href}`);
  }
}

for (const [u, count] of inbound) {
  if (u === '/' || u.includes('/embed/') || u.includes('404')) continue;
  if (count === 0) fail(`orphan page (no inbound internal links): ${u}`);
}

console.log(`SEO audit: ${pages.length} pages, ${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);

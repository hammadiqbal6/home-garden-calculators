#!/usr/bin/env node
/**
 * Indexing audit over dist/:
 * - Every sitemap URL → self-referencing absolute canonical (trailing slash)
 * - Sitemap URLs must not carry noindex
 * - noindex pages listed; must stay out of the sitemap (embeds, 404)
 * - Known redirect-alias paths must not appear in sitemap or as internal href targets
 * - Every calculator page under dist/calculators/<slug>/ must be in the sitemap with lastmod
 *
 * Keep REDIRECT_ALIAS_PATHS in sync with src/lib/workerRedirect.ts PATH_ALIAS_REDIRECTS
 * (+ /sitemap.xml and /calculators/:slug/embed/).
 *
 * See docs/SEO-GUARDRAILS.md and GSC “Page with redirect / noindex / alternate canonical”.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DIST, isAssetHref, relUrl, walkHtml } from './lib.mjs';
import { resolveSiteOrigin } from '../../src/config/siteDefaults.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const SITE_ORIGIN = resolveSiteOrigin(process.env).replace(/\/$/, '');
const SITE_HOST = new URL(SITE_ORIGIN).host;

/** Exact alias pathnames (with and without trailing slash) that 301 to a final URL. */
const REDIRECT_ALIAS_PATHS = new Set([
  '/about-us',
  '/about-us/',
  '/authors',
  '/authors/',
  '/contact-us',
  '/contact-us/',
  '/contacts',
  '/contacts/',
  '/privacy-policy',
  '/privacy-policy/',
  '/terms-of-service',
  '/terms-of-service/',
  '/sitemap_index.xml',
  '/sitemap_index.xml/',
  '/sitemap.xml',
  '/sitemap.xml/',
  '/guides/16x24-deck-material-list',
  '/guides/16x24-deck-material-list/',
]);

const EMBED_ALIAS_RE = /^\/calculators\/[^/]+\/embed\/?$/;

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

const report = {
  selfCanonicalOk: [],
  noindexInSitemap: [],
  missingSelfCanonical: [],
  ogUrlMismatch: [],
  noindexPages: [],
  noindexOkNotInSitemap: [],
  redirectAliasesInSitemap: [],
  redirectAliasesLinked: [],
  calculatorsMissingFromSitemap: [],
  calculatorsMissingLastmod: [],
};

function collectSitemapEntries(sitemapPath, depth = 0, out = []) {
  if (!sitemapPath || !fs.existsSync(sitemapPath) || depth > 5) return out;
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  for (const loc of sm.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    const locUrl = loc[1].trim();
    if (/sitemap.*\.xml$/i.test(locUrl) && !/<urlset/i.test(sm)) {
      const child = path.join(DIST, new URL(locUrl).pathname.replace(/^\//, ''));
      collectSitemapEntries(child, depth + 1, out);
      continue;
    }
    const escaped = locUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockMatch = sm.match(
      new RegExp(`<url>\\s*<loc>\\s*${escaped}\\s*</loc>([\\s\\S]*?)</url>`, 'i'),
    );
    const chunk = blockMatch?.[1] || '';
    const lastmod = chunk.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i)?.[1];
    out.push({ loc: locUrl, lastmod: lastmod || null });
  }
  return out;
}

function htmlPathForLoc(locUrl) {
  const u = new URL(locUrl);
  let p = u.pathname;
  if (p.endsWith('/')) p = `${p}index.html`;
  else if (!path.extname(p)) p = `${p}/index.html`;
  return path.join(DIST, p.replace(/^\//, ''));
}

function robotsDirectives(html) {
  return [...html.matchAll(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/gi)]
    .map((m) => m[1].toLowerCase())
    .join(', ');
}

function hasNoindex(html) {
  return /noindex/i.test(robotsDirectives(html));
}

function extractCanonical(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
}

function extractOgUrl(html) {
  return (
    html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:url["']/i)?.[1]
  );
}

function listCalculatorSlugs() {
  const dir = path.join(DIST, 'calculators');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((ent) => ent.isDirectory() && fs.existsSync(path.join(dir, ent.name, 'index.html')))
    .map((ent) => ent.name);
}

if (!fs.existsSync(DIST)) {
  fail(`dist/ missing — run npm run build first (${DIST})`);
  process.exit(1);
}

const sitemapIndex = path.join(DIST, 'sitemap-index.xml');
const sitemapFallback = path.join(DIST, 'sitemap.xml');
const sitemapPath = fs.existsSync(sitemapIndex)
  ? sitemapIndex
  : fs.existsSync(sitemapFallback)
    ? sitemapFallback
    : null;

if (!sitemapPath) {
  fail('sitemap-index.xml / sitemap.xml missing in dist/');
} else if (path.basename(sitemapPath) === 'sitemap.xml') {
  warn('dist/sitemap.xml exists as a file; production should 301 /sitemap.xml → /sitemap-index.xml');
}

const entries = sitemapPath ? collectSitemapEntries(sitemapPath) : [];
const sitemapLocs = new Set(entries.map((e) => e.loc));

console.log(`Indexing audit — origin ${SITE_ORIGIN}`);
console.log(`Sitemap URLs: ${entries.length}`);

for (const { loc, lastmod } of entries) {
  let u;
  try {
    u = new URL(loc);
  } catch {
    fail(`sitemap loc not a URL: ${loc}`);
    continue;
  }
  if (u.host !== SITE_HOST) {
    fail(`sitemap loc host ${u.host} != ${SITE_HOST}: ${loc}`);
  }
  if (!u.pathname.endsWith('/') && !path.extname(u.pathname)) {
    fail(`sitemap loc missing trailing slash: ${loc}`);
  }

  const file = htmlPathForLoc(loc);
  if (!fs.existsSync(file)) {
    fail(`sitemap loc has no dist HTML: ${loc} (expected ${path.relative(ROOT, file)})`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const canonical = extractCanonical(html);
  const ogUrl = extractOgUrl(html);

  if (!canonical) {
    fail(`${loc}: missing canonical`);
    report.missingSelfCanonical.push(loc);
  } else if (canonical !== loc) {
    fail(`${loc}: canonical is not self-referencing (got ${canonical})`);
    report.missingSelfCanonical.push(loc);
  } else {
    report.selfCanonicalOk.push(loc);
  }

  if (ogUrl && canonical && ogUrl !== canonical) {
    fail(`${loc}: og:url (${ogUrl}) != canonical (${canonical})`);
    report.ogUrlMismatch.push(loc);
  }

  if (hasNoindex(html)) {
    fail(`${loc}: sitemap URL has noindex`);
    report.noindexInSitemap.push(loc);
  }

  if (!lastmod) {
    warn(`${loc}: missing <lastmod> in sitemap`);
  }
}

for (const file of walkHtml()) {
  const url = relUrl(file);
  const html = fs.readFileSync(file, 'utf8');
  if (!hasNoindex(html)) continue;
  report.noindexPages.push(url);

  const candidates = new Set([`${SITE_ORIGIN}${url}`]);
  if (url !== '/' && !url.endsWith('/')) candidates.add(`${SITE_ORIGIN}${url}/`);
  if (url === '/404.html') {
    candidates.add(`${SITE_ORIGIN}/404/`);
    candidates.add(`${SITE_ORIGIN}/404`);
  }
  const inSitemap = [...candidates].some((v) => sitemapLocs.has(v));
  if (inSitemap) {
    fail(`noindex page is in sitemap: ${url}`);
  } else {
    report.noindexOkNotInSitemap.push(url);
  }

  if (url.includes('/embed/')) {
    const canonical = extractCanonical(html);
    if (!canonical) fail(`${url}: embed missing canonical to tool page`);
    else {
      try {
        const p = new URL(canonical).pathname;
        if (!/^\/calculators\/[^/]+\/$/.test(p)) {
          fail(`${url}: embed canonical should point at /calculators/<slug>/ (got ${canonical})`);
        }
      } catch {
        fail(`${url}: embed canonical not absolute (${canonical})`);
      }
    }
  }
}

for (const loc of sitemapLocs) {
  const pathname = new URL(loc).pathname;
  if (REDIRECT_ALIAS_PATHS.has(pathname) || EMBED_ALIAS_RE.test(pathname)) {
    fail(`sitemap includes redirect-alias path: ${loc}`);
    report.redirectAliasesInSitemap.push(loc);
  }
}

const aliasHrefHits = new Map();
for (const file of walkHtml()) {
  const from = relUrl(file);
  if (from.includes('/embed/')) continue;
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = m[1];
    if (
      isAssetHref(href) ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      continue;
    }
    let pathname;
    try {
      pathname = href.startsWith('http')
        ? new URL(href).pathname
        : new URL(href, 'https://example.invalid').pathname;
    } catch {
      continue;
    }
    if (REDIRECT_ALIAS_PATHS.has(pathname) || EMBED_ALIAS_RE.test(pathname)) {
      if (!aliasHrefHits.has(pathname)) aliasHrefHits.set(pathname, []);
      aliasHrefHits.get(pathname).push(from);
    }
  }
}
for (const [pathname, froms] of aliasHrefHits) {
  fail(`internal link to redirect-alias ${pathname} from ${froms.slice(0, 5).join(', ')}`);
  report.redirectAliasesLinked.push({ pathname, froms });
}

const locByPath = new Map(entries.map((e) => [new URL(e.loc).pathname, e]));
const calcSlugs = listCalculatorSlugs();
for (const slug of calcSlugs) {
  const p = `/calculators/${slug}/`;
  const entry = locByPath.get(p);
  if (!entry) {
    fail(`calculator missing from sitemap: ${p}`);
    report.calculatorsMissingFromSitemap.push(p);
  } else if (!entry.lastmod) {
    fail(`calculator sitemap entry missing lastmod: ${p}`);
    report.calculatorsMissingLastmod.push(p);
  }
}

console.log('\n—— Bucket report ——');
console.log(`Self-canonical sitemap URLs: ${report.selfCanonicalOk.length}/${entries.length}`);
console.log(
  `noindex pages (intentional embeds/404): ${report.noindexPages.join(', ') || '(none)'}`,
);
console.log(`noindex kept out of sitemap: ${report.noindexOkNotInSitemap.length}`);
if (report.noindexInSitemap.length) {
  console.log(`noindex incorrectly in sitemap: ${report.noindexInSitemap.join(', ')}`);
}
if (report.missingSelfCanonical.length) {
  console.log(
    `Non-self / missing canonical on sitemap URLs: ${report.missingSelfCanonical.join(', ')}`,
  );
}
if (report.redirectAliasesInSitemap.length || report.redirectAliasesLinked.length) {
  console.log('Redirect-alias leaks found (see ERRORS above).');
} else {
  console.log('Redirect aliases: none in sitemap or indexable internal links.');
}
console.log(
  `Calculators in dist: ${calcSlugs.length}; missing from sitemap: ${report.calculatorsMissingFromSitemap.length}`,
);

console.log('\n—— GSC bucket mapping (code audit) ——');
console.log(
  'Page with redirect: intentional 301 aliases (about-us, contact-us, privacy-policy, terms-of-service, sitemap.xml, authors, old guide slug, /calculators/*/embed/). Not in sitemap; validate in GSC after crawl.',
);
console.log(
  'Excluded by noindex: /embed/*/ (+ /404.html). Intentional; canonical on embeds points at the tool page.',
);
console.log(
  'Alternate page with proper canonical: embed URLs that canonicalize to /calculators/<slug>/. Intentional.',
);
console.log(
  'Discovered - not indexed: strengthen internal links (homepage grid, hubs, relatedSlugs); request indexing after deploy.',
);

console.log(
  errors
    ? `\nIndexing audit FAILED with ${errors} error(s), ${warnings} warning(s)`
    : `\nIndexing audit OK (${warnings} warning(s))`,
);
process.exit(errors ? 1 : 0);

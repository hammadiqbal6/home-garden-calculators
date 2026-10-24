#!/usr/bin/env node
/**
 * Per-page SEO/AEO checklist auditor (uploads/page-checklist.md).
 * Fast static checks on dist/. Fails CI when a page breaks the checklist.
 *
 * Run: npm run build && npm run audit:pages
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DIST, relUrl, stripTags, walkHtml } from './lib.mjs';
import { resolveSiteOrigin } from '../../src/config/site-origin.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SITE_ORIGIN = resolveSiteOrigin(process.env);
const SITE_HOST = new URL(SITE_ORIGIN).host;

let errors = 0;
const fail = (msg) => {
  console.error(`ERROR: ${msg}`);
  errors++;
};

if (!fs.existsSync(DIST)) {
  fail('dist/ missing — run npm run build first');
  process.exit(1);
}

function collectSitemapLocs(sitemapPath, depth = 0) {
  const locs = new Set();
  if (!sitemapPath || !fs.existsSync(sitemapPath) || depth > 5) return locs;
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  for (const m of sm.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    const loc = m[1].trim();
    locs.add(loc);
    if (/sitemap.*\.xml$/i.test(loc) && !/<urlset/i.test(sm)) {
      try {
        const u = new URL(loc);
        const child = path.join(DIST, u.pathname.replace(/^\//, ''));
        for (const c of collectSitemapLocs(child, depth + 1)) locs.add(c);
      } catch {
        /* ignore */
      }
    }
  }
  return locs;
}

const sitemapPath = ['sitemap-index.xml', 'sitemap.xml']
  .map((f) => path.join(DIST, f))
  .find((p) => fs.existsSync(p));
const sitemapLocs = sitemapPath ? collectSitemapLocs(sitemapPath) : new Set();
if (!sitemapPath) fail('sitemap missing');

const titles = new Map();
const descriptions = new Map();

const pages = walkHtml().filter((f) => {
  const u = relUrl(f);
  return !u.includes('/embed/') && u !== '/404.html' && u !== '/404/';
});

/** Unfinished copy / fake keys — not the intentional CLS-safe AdSlot label when ads are off. */
const PLACEHOLDER_RE =
  /\b(?:lorem ipsum|TODO:|FIXME:|your_key|changeme|xxx+|\[insert |coming soon\??\])\b/i;
const RAW_PATH_AS_TEXT_RE =
  /(?<!href=["']|content=["']|src=["'])(?:^|>)[^<]*\b\/(?:calculators|guides|hubs|about|contact)\/[a-z0-9-/]*\/?(?=<|$)/i;

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const url = relUrl(file);

  if (!/<meta\s+name=["']viewport["']/i.test(html)) {
    fail(`${url}: missing viewport meta`);
  }

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || '';
  if (!title) fail(`${url}: missing <title>`);
  else {
    const prev = titles.get(title);
    if (prev) fail(`${url}: duplicate title (also ${prev})`);
    else titles.set(title, url);
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
    const prev = descriptions.get(desc);
    if (prev) fail(`${url}: duplicate meta description (also ${prev})`);
    else descriptions.set(desc, url);
  }

  const h1s = [...html.matchAll(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi)];
  if (h1s.length !== 1) {
    fail(`${url}: expected exactly 1 H1, found ${h1s.length}`);
  }

  const canonical = html.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
  )?.[1];
  if (!canonical) fail(`${url}: missing canonical`);
  else {
    try {
      const u = new URL(canonical);
      if (u.host !== SITE_HOST) {
        fail(`${url}: canonical host ${u.host} != ${SITE_HOST}`);
      }
    } catch {
      fail(`${url}: canonical not absolute`);
    }
  }

  for (const [, raw] of html.matchAll(
    /<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(raw);
    } catch {
      fail(`${url}: invalid JSON-LD`);
    }
  }

  // Sitemap coverage for indexable content
  if (
    url === '/' ||
    url.startsWith('/calculators/') ||
    url.startsWith('/guides/') ||
    url.startsWith('/hubs/') ||
    url.startsWith('/about') ||
    url.startsWith('/contact') ||
    url.startsWith('/methodology') ||
    url.startsWith('/privacy') ||
    url.startsWith('/terms')
  ) {
    const origin = SITE_ORIGIN.replace(/\/$/, '');
    const expected =
      url === '/' ? `${origin}/` : `${origin}${url.endsWith('/') ? url : `${url}/`}`;
    const variants = new Set([
      expected,
      expected.replace(/\/$/, ''),
      `${expected.replace(/\/$/, '')}/`,
    ]);
    if (sitemapLocs.size && ![...variants].some((v) => sitemapLocs.has(v))) {
      fail(`${url}: missing from sitemap (expected ${expected})`);
    }
  }

  if (PLACEHOLDER_RE.test(html)) {
    fail(`${url}: placeholder or ad-stub text`);
  }

  // Answer-first: after H1, first meaningful block should be answer-first / lede / takeaway
  const isTool = url.startsWith('/calculators/') && url !== '/calculators/';
  const isGuide = url.startsWith('/guides/') && url !== '/guides/';
  const isHub = url.startsWith('/hubs/') || url === '/' || url === '/calculators/' || url === '/guides/';
  if (isTool || isGuide || isHub) {
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
    const h1Match = main.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i);
    if (h1Match) {
      const after = main.slice(main.indexOf(h1Match[0]) + h1Match[0].length);
      const next = after.match(
        /<(p|div|section|article|h2|ul|ol|table|aside)\b[^>]*>/i,
      );
      if (next) {
        const tag = next[0];
        const ok =
          /class=["'][^"']*(?:answer-first|lede|takeaway|answer-box)[^"']*["']/i.test(
            tag,
          ) || /class=["'][^"']*answer-first[^"']*["']/i.test(after.slice(0, 400));
        // Also allow: first <p> itself has answer-first in opening tag within first block
        const firstBlock = after.match(
          /<p\b([^>]*)>[\s\S]*?<\/p>/i,
        );
        const pOk =
          firstBlock &&
          /answer-first|lede|takeaway/i.test(firstBlock[1] || firstBlock[0]);
        if (!ok && !pOk) {
          fail(
            `${url}: answer block not first after H1 (expected .answer-first / .lede)`,
          );
        }
        // ≤60 words in the answer-first lead (tools/guides/hubs)
        const af =
          after.match(
            /<p\b[^>]*class=["'][^"']*answer-first[^"']*["'][^>]*>[\s\S]*?<\/p>/i,
          ) ||
          after.match(
            /<p\b[^>]*class=["'][^"']*lede[^"']*["'][^>]*>[\s\S]*?<\/p>/i,
          );
        if (af) {
          const words = stripTags(af[0]).split(/\s+/).filter(Boolean).length;
          if (words > 60) {
            fail(`${url}: answer-first has ${words} words (max 60)`);
          }
        }
        if (isTool && !/<input\b/i.test(after)) {
          fail(`${url}: no calculator input after H1`);
        }
      } else {
        fail(`${url}: no content block after H1`);
      }
    }
  }
}

// Cookie bar CSS must cap at 56px
const cssPath = path.join(ROOT, 'src/styles/global.css');
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf8');
  if (!/\.cookie-notice\s*\{[^}]*max-height:\s*56px/s.test(css)) {
    fail('cookie-notice missing max-height: 56px in global.css');
  }
}

console.log(
  `Page checklist audit: ${pages.length} pages, ${errors} errors (SITE_ORIGIN=${SITE_ORIGIN})`,
);
process.exit(errors ? 1 : 0);

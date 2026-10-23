#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, Yandex, etc.) of all URLs in the built sitemap.
 * Google does not use IndexNow.
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs --dry-run
 *
 * Env:
 *   INDEXNOW_KEY      — override key (default: committed public key)
 *   INDEXNOW_DISABLE=1 — skip quietly
 *   PUBLIC_SITE_URL   — canonical origin (else Workers.dev default)
 *
 * Never fails the build/deploy: all errors are caught; always exits 0.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveSiteOrigin } from '../src/config/site-origin.mjs';

const DEFAULT_KEY = 'c2a68b8b8e7e6ba2253b408fa0fe2c4c';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10_000;
const DIST = path.resolve('dist');

function log(...args) {
  console.log('[indexnow]', ...args);
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml))) locs.push(m[1].trim());
  return locs;
}

/** Map a sitemap <loc> URL to a file under dist/, or null if not local. */
function locToDistFile(loc) {
  try {
    const pathname = new URL(loc).pathname.replace(/^\/+/, '');
    if (!pathname || pathname.includes('..')) return null;
    const file = path.join(DIST, pathname);
    return file.startsWith(DIST + path.sep) || file === DIST ? file : null;
  } catch {
    return null;
  }
}

function collectUrlsFromSitemaps() {
  const urls = new Set();
  const indexPath = path.join(DIST, 'sitemap-index.xml');
  const singlePath = path.join(DIST, 'sitemap-0.xml');
  const plainPath = path.join(DIST, 'sitemap.xml');

  let childFiles = [];

  if (fs.existsSync(indexPath)) {
    const indexXml = fs.readFileSync(indexPath, 'utf8');
    for (const loc of extractLocs(indexXml)) {
      const file = locToDistFile(loc);
      if (file && fs.existsSync(file)) childFiles.push(file);
      else log('warn: missing child sitemap for', loc);
    }
  } else if (fs.existsSync(singlePath)) {
    childFiles = [singlePath];
  } else if (fs.existsSync(plainPath)) {
    childFiles = [plainPath];
  } else {
    throw new Error(`No sitemap found under ${DIST} (expected sitemap-index.xml)`);
  }

  for (const file of childFiles) {
    const xml = fs.readFileSync(file, 'utf8');
    for (const loc of extractLocs(xml)) urls.add(loc);
  }

  return [...urls];
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  if (process.env.INDEXNOW_DISABLE === '1') {
    log('skipped (INDEXNOW_DISABLE=1)');
    return;
  }

  const dryRun = process.argv.includes('--dry-run');
  const key = (process.env.INDEXNOW_KEY || DEFAULT_KEY).trim();
  // Same origin resolution as Astro/canonicals/sitemap (PUBLIC_SITE_URL → site-origin.mjs).
  const siteUrl = resolveSiteOrigin(process.env);
  const host = new URL(siteUrl).host;
  const PLACEHOLDER_KEYS = new Set(['', 'changeme', 'your_key', 'YOUR_KEY', 'xxxxxxxx', 'placeholder']);
  if (PLACEHOLDER_KEYS.has(key) || /^x{8,}$/i.test(key) || /placeholder/i.test(key)) {
    log('error (non-fatal): IndexNow key looks like a placeholder — set INDEXNOW_KEY');
    return;
  }
  const keyLocation = `${siteUrl}/${key}.txt`;

  const urlList = collectUrlsFromSitemaps();
  if (!urlList.length) {
    log('no URLs found in sitemap; nothing to submit');
    return;
  }

  const batches = chunk(urlList, BATCH_SIZE);
  log(`${urlList.length} URL(s) in ${batches.length} batch(es); host=${host}`);

  for (let i = 0; i < batches.length; i++) {
    const body = {
      host,
      key,
      keyLocation,
      urlList: batches[i],
    };

    if (dryRun) {
      log(`dry-run batch ${i + 1}/${batches.length}:`, JSON.stringify(body, null, 2));
      continue;
    }

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => '');
    log(`batch ${i + 1}/${batches.length} HTTP ${res.status}`, text.slice(0, 200));
  }
}

main().catch((err) => {
  log('error (non-fatal):', err?.message || err);
}).finally(() => {
  process.exit(0);
});

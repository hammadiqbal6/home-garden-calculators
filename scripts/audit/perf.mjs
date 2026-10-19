#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { DIST, relUrl, walkHtml } from './lib.mjs';

const MAX_JS_GZ_PER_PAGE = 50 * 1024;
let errors = 0;
const fail = (m) => {
  console.error(`ERROR: ${m}`);
  errors++;
};

if (!fs.existsSync(DIST)) {
  fail('dist/ missing');
  process.exit(1);
}

const pages = walkHtml().filter((p) => !relUrl(p).includes('/embed/'));

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
  let totalGz = 0;
  for (const src of scripts) {
    if (/^https?:/i.test(src)) continue;
    const assetPath = path.join(DIST, src.split('?')[0].replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) continue;
    totalGz += zlib.gzipSync(fs.readFileSync(assetPath)).length;
  }
  if (totalGz > MAX_JS_GZ_PER_PAGE) {
    fail(`${relUrl(file)}: first-party JS gz ${Math.round(totalGz / 1024)}KB > 50KB budget`);
  }
}

console.log(`Perf audit: checked ${pages.length} pages, ${errors} errors`);
process.exit(errors ? 1 : 0);

#!/usr/bin/env node
import fs from 'node:fs';
import { DIST, isAssetHref, resolveInternalTarget, walkHtml, relUrl } from './audit/lib.mjs';

let errors = 0;
if (!fs.existsSync(DIST)) {
  console.error('dist/ missing — run build first');
  process.exit(1);
}

for (const file of walkHtml()) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href=["'](\/[^"']*)/gi)) {
    const href = m[1].split('#')[0].split('?')[0];
    if (!href || href.startsWith('/#')) continue;
    const target = resolveInternalTarget(href);
    if (!fs.existsSync(target)) {
      console.error(`Broken: ${relUrl(file)} -> ${href}`);
      errors++;
    }
  }
}

console.log(errors ? `Found ${errors} broken links` : 'All internal links OK');
process.exit(errors ? 1 : 0);

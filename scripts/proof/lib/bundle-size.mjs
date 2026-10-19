import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { DIST, relUrl, walkHtml } from '../../audit/lib.mjs';
import { JS_GZ_MAX_BYTES } from './budgets.mjs';

export function computeJsGzipForPage(file) {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
  let totalGz = 0;
  const files = [];
  for (const src of scripts) {
    if (/^https?:/i.test(src)) continue;
    const assetPath = path.join(DIST, src.split('?')[0].replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) continue;
    const gz = zlib.gzipSync(fs.readFileSync(assetPath)).length;
    totalGz += gz;
    files.push({ src, gz });
  }
  return { totalGz, files };
}

export function writeBundleSizeReport(outPath) {
  const pages = walkHtml().filter((p) => !relUrl(p).includes('/embed/'));
  const lines = [];
  let errors = 0;
  lines.push(`First-party JS gzip budget: ${JS_GZ_MAX_BYTES / 1024}KB per page`);
  lines.push(`Pages checked: ${pages.length}`);
  lines.push('');
  lines.push('URL | JS gzip (bytes) | Pass');
  lines.push('--- | --- | ---');
  let maxGz = 0;
  let maxUrl = '';
  for (const file of pages) {
    const url = relUrl(file);
    const { totalGz } = computeJsGzipForPage(file);
    const pass = totalGz <= JS_GZ_MAX_BYTES;
    if (!pass) errors++;
    if (totalGz > maxGz) {
      maxGz = totalGz;
      maxUrl = url;
    }
    lines.push(`${url} | ${totalGz} | ${pass ? 'PASS' : 'FAIL'}`);
  }
  lines.push('');
  lines.push(`Worst page: ${maxUrl} (${maxGz} bytes gz, ${(maxGz / 1024).toFixed(1)}KB)`);
  lines.push(`Overall: ${errors === 0 ? 'PASS' : `FAIL (${errors} pages over budget)`}`);
  fs.writeFileSync(outPath, lines.join('\n') + '\n');
  return { errors, maxGz, maxUrl };
}

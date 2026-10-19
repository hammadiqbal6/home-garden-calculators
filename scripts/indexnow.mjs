#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, Yandex, etc.). Google does not use IndexNow.
 * Usage: node scripts/indexnow.mjs https://www.example.com/page/
 */
import fs from 'node:fs';
import path from 'node:path';

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Usage: node scripts/indexnow.mjs <url> [url…]');
  process.exit(1);
}

const DEFAULT_SITE_URL =
  'https://home-garden-calculators.hammadiqbal117.workers.dev';

const configPath = path.resolve('src/config/site.ts');
const src = fs.readFileSync(configPath, 'utf8');
const key = src.match(/indexNowKey:\s*'([^']+)'/)?.[1];

const siteUrl = (process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

if (!siteUrl || !key) {
  console.error('Could not resolve siteUrl (PUBLIC_SITE_URL) or indexNowKey from site.ts');
  process.exit(1);
}

const host = new URL(siteUrl).host;
const body = {
  host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log('IndexNow status', res.status, await res.text());
if (!res.ok) process.exit(1);

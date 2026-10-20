#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { DIST, stripTags, walkHtml, relUrl } from './lib.mjs';

let errors = 0;
const fail = (m) => {
  console.error(`ERROR: ${m}`);
  errors++;
};

if (!fs.existsSync(DIST)) {
  fail('dist/ missing — run npm run build first');
  process.exit(1);
}

const required = [
  'about/index.html',
  'contact/index.html',
  'privacy/index.html',
  'terms/index.html',
  'methodology/index.html',
  'ads.txt',
];
for (const rel of required) {
  if (!fs.existsSync(path.join(DIST, rel))) fail(`missing required ${rel}`);
}
// Playbook: /authors/ may 301 to /about/#maintainer — require a named maintainer on About.
const aboutHtml = fs.readFileSync(path.join(DIST, 'about/index.html'), 'utf8');
if (!/id=["']maintainer["']/i.test(aboutHtml) || !/Hammad Iqbal/i.test(aboutHtml)) {
  fail('about page missing named maintainer (#maintainer / Hammad Iqbal)');
}
const hasAuthorsPage = fs.existsSync(path.join(DIST, 'authors/index.html'));
const redirects = fs.existsSync(path.join(DIST, '_redirects'))
  ? fs.readFileSync(path.join(DIST, '_redirects'), 'utf8')
  : '';
if (!hasAuthorsPage && !/\/authors\/?\s+\/about\/\s+301/i.test(redirects)) {
  fail('missing authors page or /authors/ → /about/ 301 redirect');
}

const privacy = fs.readFileSync(path.join(DIST, 'privacy/index.html'), 'utf8');
for (const needle of ['cookie', 'Google', 'Ads Settings', 'aboutads.info', 'personalized']) {
  if (!privacy.toLowerCase().includes(needle.toLowerCase())) {
    fail(`privacy page missing disclosure mention: ${needle}`);
  }
}

const adsTxt = fs.readFileSync(path.join(DIST, 'ads.txt'), 'utf8');
if (!/google\.com|adsense|pub-/i.test(adsTxt)) fail('ads.txt invalid/empty');

for (const file of walkHtml(path.join(DIST, 'calculators'))) {
  const url = relUrl(file);
  if (url === '/calculators/') continue;
  const html = fs.readFileSync(file, 'utf8');
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  if (words < 500) fail(`thin tool page (${words} words): ${url}`);
  if (!/formula|example|cu ft|cubic|calculate/i.test(html)) {
    fail(`tool page lacks explanatory cues: ${url}`);
  }
}

const astroDir = path.join(DIST, '_astro');
let css = '';
if (fs.existsSync(astroDir)) {
  for (const f of fs.readdirSync(astroDir)) {
    if (f.endsWith('.css')) css += fs.readFileSync(path.join(astroDir, f), 'utf8');
  }
}
if (css && !/ad-slot|--ad-slot-h/i.test(css)) fail('CSS missing reserved ad-slot sizing');

console.log(`AdSense audit: ${errors} errors`);
process.exit(errors ? 1 : 0);

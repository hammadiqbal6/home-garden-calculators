import fs from 'node:fs';
import path from 'node:path';
import { DIST, relUrl, walkHtml } from '../../audit/lib.mjs';

const REQUIRED_BOTS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'PerplexityBot',
  'Claude-SearchBot',
];

function countSitemapUrls(xml) {
  return (xml.match(/<loc>/gi) || []).length;
}

function collectSitemapLocs(distDir) {
  const indexPath = path.join(distDir, 'sitemap-index.xml');
  const urls = [];
  if (fs.existsSync(indexPath)) {
    const index = fs.readFileSync(indexPath, 'utf8');
    const childLocs = [...index.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]);
    for (const loc of childLocs) {
      const childName = loc.split('/').pop();
      const childPath = path.join(distDir, childName);
      if (fs.existsSync(childPath)) {
        const childXml = fs.readFileSync(childPath, 'utf8');
        urls.push(...[...childXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]));
      }
    }
    if (!childLocs.length) urls.push(...[...index.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]));
  }
  const single = path.join(distDir, 'sitemap.xml');
  if (!urls.length && fs.existsSync(single)) {
    const xml = fs.readFileSync(single, 'utf8');
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]));
  }
  return urls;
}

export function writeSitemapRobotsReport(outPath) {
  const lines = [];
  const pages = walkHtml().filter((f) => {
    const u = relUrl(f);
    return !u.includes('/embed/') && u !== '/404.html' && u !== '/404/';
  });
  const pageCount = pages.length;

  const robotsPath = path.join(DIST, 'robots.txt');
  const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
  lines.push('=== robots.txt ===');
  lines.push(robots || '(missing)');
  lines.push('');

  let botPass = true;
  lines.push('=== Crawler allowances (name present in robots.txt) ===');
  for (const bot of REQUIRED_BOTS) {
    const ok = robots.includes(bot);
    if (!ok) botPass = false;
    lines.push(`${bot}: ${ok ? 'PASS' : 'FAIL'}`);
  }
  const sitemapLine = /Sitemap:\s*https?:\/\//i.test(robots);
  lines.push(`Sitemap absolute URL line: ${sitemapLine ? 'PASS' : 'FAIL'}`);
  lines.push('');

  const sitemapIndex = path.join(DIST, 'sitemap-index.xml');
  const sitemapXml = fs.existsSync(sitemapIndex)
    ? fs.readFileSync(sitemapIndex, 'utf8')
    : fs.existsSync(path.join(DIST, 'sitemap.xml'))
      ? fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8')
      : '';
  lines.push('=== Sitemap validity ===');
  if (!sitemapXml) {
    lines.push('FAIL: no sitemap-index.xml or sitemap.xml in dist/');
  } else {
    const valid = /<urlset|<sitemapindex/i.test(sitemapXml);
    lines.push(`XML structure: ${valid ? 'PASS' : 'FAIL'}`);
    lines.push(`Root loc count (index file): ${countSitemapUrls(sitemapXml)}`);
  }
  const sitemapUrls = collectSitemapLocs(DIST);
  lines.push(`Total URLs in sitemap(s): ${sitemapUrls.length}`);
  lines.push(`Built HTML pages (excl. embed, 404): ${pageCount}`);
  const countOk = sitemapUrls.length >= pageCount - 2;
  lines.push(`URL count vs pages: ${countOk ? 'PASS (sitemap covers site)' : 'WARN (review mismatch)'}`);
  lines.push('');

  const llmsPath = path.join(DIST, 'llms.txt');
  lines.push('=== llms.txt ===');
  lines.push(fs.existsSync(llmsPath) ? 'PASS: present in dist/' : 'FAIL: missing');

  const pass =
    Boolean(robots) &&
    botPass &&
    sitemapLine &&
    Boolean(sitemapXml) &&
    fs.existsSync(llmsPath);
  lines.push('');
  lines.push(`Overall: ${pass ? 'PASS' : 'FAIL'}`);

  fs.writeFileSync(outPath, lines.join('\n') + '\n');
  return { pass };
}

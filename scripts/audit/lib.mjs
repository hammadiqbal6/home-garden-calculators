import fs from 'node:fs';
import path from 'node:path';

export const DIST = path.resolve('dist');

export function walkHtml(dir = DIST, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, out);
    else if (ent.name === 'index.html' || ent.name === '404.html') out.push(p);
  }
  return out;
}

export function relUrl(file) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  return '/' + rel.replace(/index\.html$/, '');
}

export function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** True for static assets / non-HTML hrefs that should not be treated as pages */
export function isAssetHref(href) {
  return /\.(css|js|mjs|map|svg|png|jpe?g|gif|webp|avif|ico|txt|xml|webmanifest|json|woff2?|ttf|map)(\?|$)/i.test(
    href,
  );
}

export function resolveInternalTarget(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return path.join(DIST, 'index.html');
  if (isAssetHref(clean)) {
    return path.join(DIST, clean.replace(/^\//, ''));
  }
  const noSlash = clean.replace(/\/$/, '');
  const asIndex = path.join(DIST, noSlash.replace(/^\//, ''), 'index.html');
  const asHtml = path.join(DIST, noSlash.replace(/^\//, '') + '.html');
  if (fs.existsSync(asIndex)) return asIndex;
  if (fs.existsSync(asHtml)) return asHtml;
  return asIndex;
}

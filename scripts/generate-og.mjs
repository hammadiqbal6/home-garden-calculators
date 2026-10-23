#!/usr/bin/env node
/**
 * Dependency-free OG SVG generator for YardCalc.
 * Reads slugs + titles from src/data/tools.ts and src/data/guides.ts via regex
 * (no TypeScript import). Writes 1200×630 SVGs under public/og/.
 *
 * Run: node scripts/generate-og.mjs  (also hooked as npm run og / prebuild)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'og');

const FONT =
  'ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif';

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Split title into ≤3 lines for the OG canvas. */
function wrapTitle(title, maxChars = 28, maxLines = 3) {
  const words = String(title).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return ['YardCalc'];
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length >= maxLines - 1) break;
    } else {
      cur = next;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  const used = lines.join(' ').split(/\s+/).length;
  if (used < words.length && lines.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/\s+\S+$/, '')}…`.trim();
  }
  return lines.slice(0, maxLines);
}

/**
 * Parse `{ slug: '…', … title: '…' }` style objects from a TS source file.
 * Returns unique slug→title (last title wins if duplicate).
 */
function extractSlugTitles(src, { afterExport } = {}) {
  let text = src;
  if (afterExport) {
    const idx = text.search(afterExport);
    if (idx >= 0) text = text.slice(idx);
  }
  const blocks = [...text.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"]([\s\S]*?)(?=\n\s*\{|\n\s*\}(?:\s*,|\s*;|\s*$))/g)];
  const out = [];
  const seen = new Set();
  for (const m of blocks) {
    const slug = m[1];
    const body = m[0];
    const titleMatch =
      body.match(/\btitle:\s*['"]([^'"]+)['"]/) ||
      body.match(/\bname:\s*['"]([^'"]+)['"]/);
    if (!titleMatch) continue;
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug, title: titleMatch[1] });
  }
  return out;
}

/** Simpler pass: consecutive slug + title within ~400 chars. */
function extractSlugTitlesLoose(src) {
  const out = [];
  const seen = new Set();
  const re =
    /slug:\s*['"]([^'"]+)['"][\s\S]{0,500}?title:\s*['"]([^'"]+)['"]/g;
  for (const m of src.matchAll(re)) {
    const slug = m[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug, title: m[2] });
  }
  return out;
}

function ogSvg({ eyebrow, title }) {
  const lines = wrapTitle(title, 32, 3);
  const titleYs = [292, 368, 444].slice(0, lines.length);
  // Center vertically a bit when fewer lines
  const yShift = lines.length === 1 ? 40 : lines.length === 2 ? 20 : 0;
  const titleNodes = lines
    .map(
      (line, i) =>
        `<text x="72" y="${titleYs[i] + yShift}" font-family="${FONT}" font-size="54" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`,
    )
    .join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#145239"/>
      <stop offset="55%" stop-color="#1f6b4a"/>
      <stop offset="100%" stop-color="#2f8f65"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="80" r="220" fill="#ffffff" fill-opacity="0.06"/>
  <circle cx="120" cy="520" r="180" fill="#c45c26" fill-opacity="0.18"/>
  <text x="72" y="88" font-family="${FONT}" font-size="28" font-weight="600" fill="#b7f0d2" letter-spacing="0.04em">${escapeXml(eyebrow)}</text>
  <text x="72" y="200" font-family="${FONT}" font-size="36" font-weight="700" fill="#ffffff" fill-opacity="0.92">YardCalc</text>
  ${titleNodes}
  <text x="72" y="580" font-family="${FONT}" font-size="24" fill="#dceee4">Free home &amp; garden material calculators</text>
</svg>
`;
}

function writeSvg(filename, opts) {
  const p = path.join(outDir, filename);
  fs.writeFileSync(p, ogSvg(opts), 'utf8');
  return p;
}

function main() {
  const toolsSrc = fs.readFileSync(path.join(root, 'src/data/tools.ts'), 'utf8');
  const guidesSrc = fs.readFileSync(path.join(root, 'src/data/guides.ts'), 'utf8');

  // Hubs live in `categories`; tools in `export const tools`
  const catIdx = toolsSrc.indexOf('export const categories');
  const toolsIdx = toolsSrc.indexOf('export const tools');
  const categoriesSrc =
    catIdx >= 0 && toolsIdx > catIdx
      ? toolsSrc.slice(catIdx, toolsIdx)
      : toolsSrc.slice(0, toolsIdx >= 0 ? toolsIdx : undefined);
  const toolsOnlySrc = toolsIdx >= 0 ? toolsSrc.slice(toolsIdx) : toolsSrc;

  let hubs = extractSlugTitlesLoose(categoriesSrc);
  let tools = extractSlugTitlesLoose(toolsOnlySrc);
  let guides = extractSlugTitlesLoose(guidesSrc);

  // Fallback if loose regex missed (e.g. title before slug)
  if (!hubs.length) hubs = extractSlugTitles(categoriesSrc);
  if (!tools.length) tools = extractSlugTitles(toolsOnlySrc);
  if (!guides.length) guides = extractSlugTitles(guidesSrc);

  fs.mkdirSync(outDir, { recursive: true });

  let written = 0;
  writeSvg('home.svg', {
    eyebrow: 'HOME',
    title: 'Free home & garden material calculators',
  });
  written++;

  for (const t of tools) {
    writeSvg(`calculator-${t.slug}.svg`, {
      eyebrow: 'CALCULATOR',
      title: t.title,
    });
    written++;
  }
  for (const g of guides) {
    writeSvg(`guide-${g.slug}.svg`, {
      eyebrow: 'GUIDE',
      title: g.title,
    });
    written++;
  }
  for (const h of hubs) {
    writeSvg(`hub-${h.slug}.svg`, {
      eyebrow: 'HUB',
      title: h.title,
    });
    written++;
  }

  console.log(
    `generate-og: wrote ${written} SVG(s) to public/og/ (${tools.length} calculators, ${guides.length} guides, ${hubs.length} hubs + home)`,
  );
}

main();

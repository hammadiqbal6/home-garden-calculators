#!/usr/bin/env node
/**
 * Generate the playbook favicon / manifest / OG / logo set from the brand mark.
 * Run: node scripts/generate-icons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    const { execSync } = await import('node:child_process');
    execSync('npm install --no-save sharp', { cwd: root, stdio: 'inherit' });
    return (await import('sharp')).default;
  }
}

const markSvg = (size, { pad = 0, radiusRatio = 0.25, opaque = false } = {}) => {
  const inner = 32 * (1 - pad * 2);
  const offset = 32 * pad;
  const rx = radiusRatio * 32;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" ${opaque ? 'fill="#1f6b4a"' : `rx="${rx}" fill="#1f6b4a"`}/>
  <g transform="translate(${offset} ${offset}) scale(${1 - pad * 2})">
    <path d="M8 22 L16 8 L24 22 Z" stroke="#fff" stroke-width="2.2" fill="none" stroke-linejoin="round"/>
    <circle cx="16" cy="18" r="2" fill="#c45c26"/>
  </g>
</svg>`;
};

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
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
  <g transform="translate(80 180)">
    <rect width="120" height="120" rx="28" fill="#ffffff" fill-opacity="0.15"/>
    <path d="M30 90 L60 30 L90 90 Z" stroke="#fff" stroke-width="8" fill="none" stroke-linejoin="round"/>
    <circle cx="60" cy="72" r="8" fill="#c45c26"/>
  </g>
  <text x="240" y="250" font-family="ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif" font-size="84" font-weight="750" fill="#ffffff">YardCalc</text>
  <text x="240" y="330" font-family="ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif" font-size="36" fill="#dceee4">Free home &amp; garden material calculators</text>
  <text x="240" y="400" font-family="ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif" font-size="28" fill="#b7f0d2">Concrete · mulch · gravel · fence · deck · lawn</text>
</svg>`;

async function writePng(sharp, svg, outPath, size) {
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  fs.writeFileSync(outPath, buf);
  console.log('wrote', path.relative(root, outPath), `(${size}×${size})`);
}

function buildIco(images) {
  const headerSize = 6;
  const dirSize = 16 * images.length;
  let offset = headerSize + dirSize;
  const parts = [];
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  parts.push(header);
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.png.length, 8);
    entry.writeUInt32LE(offset, 12);
    parts.push(entry);
    offset += img.png.length;
  }
  for (const img of images) parts.push(img.png);
  return Buffer.concat(parts);
}

async function main() {
  const sharp = await loadSharp();

  // Playbook exact set
  await writePng(sharp, markSvg(96), path.join(publicDir, 'favicon-96x96.png'), 96);
  await writePng(
    sharp,
    markSvg(180, { pad: 0.1, opaque: true, radiusRatio: 0 }),
    path.join(publicDir, 'apple-touch-icon.png'),
    180,
  );
  await writePng(
    sharp,
    markSvg(192),
    path.join(publicDir, 'web-app-manifest-192x192.png'),
    192,
  );
  await writePng(
    sharp,
    markSvg(512),
    path.join(publicDir, 'web-app-manifest-512x512.png'),
    512,
  );
  await writePng(
    sharp,
    markSvg(512, { pad: 0.1, opaque: true, radiusRatio: 0 }),
    path.join(publicDir, 'maskable-icon-512x512.png'),
    512,
  );
  await writePng(sharp, markSvg(512), path.join(publicDir, 'logo-512.png'), 512);

  // Extra small PNGs (handy; not required in <head>)
  await writePng(sharp, markSvg(16), path.join(publicDir, 'favicon-16x16.png'), 16);
  await writePng(sharp, markSvg(32), path.join(publicDir, 'favicon-32x32.png'), 32);

  const sizes = [16, 32, 48];
  const icoImages = [];
  for (const size of sizes) {
    const png = await sharp(Buffer.from(markSvg(size))).resize(size, size).png().toBuffer();
    icoImages.push({ size, png });
  }
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buildIco(icoImages));
  console.log('wrote favicon.ico (16/32/48)');

  const og = await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og-default.png'), og);
  console.log('wrote og-default.png (1200×630)');

  // Remove superseded icon filenames if present
  for (const old of [
    'icon-192.png',
    'icon-512.png',
    'icon-192-maskable.png',
    'icon-512-maskable.png',
  ]) {
    const p = path.join(publicDir, old);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log('removed', old);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

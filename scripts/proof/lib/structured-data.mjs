import fs from 'node:fs';
import path from 'node:path';
import { DIST } from '../../audit/lib.mjs';

const SAMPLES = [
  { id: 'home', file: 'index.html', requiredTypes: ['WebSite', 'Organization'] },
  { id: 'hub-concrete', file: 'hubs/concrete/index.html', requiredTypes: ['BreadcrumbList'] },
  {
    id: 'tool-concrete-calculator',
    file: 'calculators/concrete-calculator/index.html',
    requiredTypes: ['BreadcrumbList', 'WebApplication'],
  },
  {
    id: 'guide-mulch-depth',
    file: 'guides/mulch-depth-guide/index.html',
    requiredTypes: ['BreadcrumbList', 'Article'],
  },
  { id: 'about', file: 'about/index.html', requiredTypes: ['BreadcrumbList'] },
];

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(re)) {
    blocks.push(m[1].trim());
  }
  return blocks;
}

function typesInGraph(obj, out = new Set()) {
  if (!obj || typeof obj !== 'object') return out;
  if (obj['@type']) {
    const t = obj['@type'];
    if (Array.isArray(t)) t.forEach((x) => out.add(x));
    else out.add(t);
  }
  for (const v of Object.values(obj)) {
    if (Array.isArray(v)) v.forEach((item) => typesInGraph(item, out));
    else if (v && typeof v === 'object') typesInGraph(v, out);
  }
  return out;
}

export function writeStructuredDataProof(outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const report = [];
  let errors = 0;
  report.push('Structured data extraction & local validation');
  report.push('Note: Re-run Google Rich Results Test on production URLs after deploy.');
  report.push('');

  for (const sample of SAMPLES) {
    const filePath = path.join(DIST, sample.file);
    const rel = sample.file;
    if (!fs.existsSync(filePath)) {
      report.push(`${sample.id}: FAIL — missing ${rel}`);
      errors++;
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    const rawBlocks = extractJsonLd(html);
    const parsed = [];
    const types = new Set();
    for (const raw of rawBlocks) {
      try {
        const data = JSON.parse(raw);
        parsed.push(data);
        typesInGraph(data, types);
      } catch (e) {
        report.push(`${sample.id}: FAIL — invalid JSON-LD: ${e.message}`);
        errors++;
      }
    }
    const outFile = path.join(outDir, `${sample.id}.json`);
    fs.writeFileSync(outFile, JSON.stringify(parsed, null, 2) + '\n');

    const missing = sample.requiredTypes.filter((t) => !types.has(t));
    if (missing.length) {
      report.push(
        `${sample.id}: FAIL — missing @type(s): ${missing.join(', ')} (found: ${[...types].join(', ')})`,
      );
      errors++;
    } else {
      report.push(`${sample.id}: PASS — types ${sample.requiredTypes.join(', ')}`);
    }
  }

  const index = SAMPLES.map((s) => ({
    id: s.id,
    source: s.file,
    artifact: `${s.id}.json`,
    requiredTypes: s.requiredTypes,
  }));
  fs.writeFileSync(path.join(outDir, 'page-types-index.json'), JSON.stringify(index, null, 2) + '\n');
  fs.writeFileSync(path.join(outDir, 'validation-report.txt'), report.join('\n') + '\n');
  return { errors };
}

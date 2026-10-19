import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateLhr } from './budgets.mjs';
import { computeJsGzipForPage } from './bundle-size.mjs';
import { DIST } from '../../audit/lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIGHTHOUSE_BIN = path.join(
  process.cwd(),
  'node_modules',
  'lighthouse',
  'cli',
  'index.js',
);

export const LIGHTHOUSE_TARGETS = [
  { slug: 'home-mobile', path: '/', formFactor: 'mobile' },
  { slug: 'hub-concrete-mobile', path: '/hubs/concrete/', formFactor: 'mobile' },
  { slug: 'hub-landscape-mobile', path: '/hubs/landscape/', formFactor: 'mobile' },
  { slug: 'hub-outdoor-structures-mobile', path: '/hubs/outdoor-structures/', formFactor: 'mobile' },
  { slug: 'hub-lawn-mobile', path: '/hubs/lawn/', formFactor: 'mobile' },
  { slug: 'tool-concrete-calculator-mobile', path: '/calculators/concrete-calculator/', formFactor: 'mobile' },
  { slug: 'tool-mulch-calculator-mobile', path: '/calculators/mulch-calculator/', formFactor: 'mobile' },
  { slug: 'tool-roof-pitch-calculator-mobile', path: '/calculators/roof-pitch-calculator/', formFactor: 'mobile' },
  { slug: 'tool-gravel-calculator-mobile', path: '/calculators/gravel-calculator/', formFactor: 'mobile' },
  { slug: 'tool-fence-calculator-mobile', path: '/calculators/fence-calculator/', formFactor: 'mobile' },
  { slug: 'home-desktop', path: '/', formFactor: 'desktop' },
];

function runLighthouse(url, outBase, formFactor) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '--quiet',
      '--chrome-flags=--headless --no-sandbox --disable-gpu',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      '--output=html',
      `--output-path=${outBase}`,
    ];
    if (formFactor === 'desktop') {
      args.push('--preset=desktop');
    } else {
      args.push('--form-factor=mobile');
      args.push('--screen-emulation.mobile=true');
      args.push('--screen-emulation.width=360');
      args.push('--screen-emulation.height=640');
      args.push('--screen-emulation.deviceScaleFactor=2');
    }
    const child = spawn(process.execPath, [LIGHTHOUSE_BIN, ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (d) => {
      stderr += d;
    });
    child.on('close', (code) => {
      if (code !== 0) reject(new Error(`lighthouse exited ${code}: ${stderr}`));
      else resolve();
    });
  });
}

function htmlPathForUrl(urlPath) {
  if (urlPath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, urlPath.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

export async function writeLighthouseProof(outDir, baseUrl) {
  fs.mkdirSync(outDir, { recursive: true });
  const rows = [];
  let failures = 0;
  const lhVersion = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'node_modules/lighthouse/package.json'), 'utf8'),
  ).version;

  for (const target of LIGHTHOUSE_TARGETS) {
    const url = `${baseUrl}${target.path}`;
    const outBase = path.join(outDir, target.slug);
    process.stdout.write(`Lighthouse ${target.slug}…\n`);
    await runLighthouse(url, outBase, target.formFactor);
    const jsonPath = `${outBase}.report.json`;
    const htmlPath = `${outBase}.report.html`;
    const legacyJson = `${outBase}.json`;
    if (fs.existsSync(legacyJson) && !fs.existsSync(jsonPath)) {
      fs.renameSync(legacyJson, jsonPath);
    }
    const finalJson = fs.existsSync(jsonPath) ? jsonPath : legacyJson;
    const lhr = JSON.parse(fs.readFileSync(finalJson, 'utf8'));
    const ev = evaluateLhr(lhr, { desktop: target.formFactor === 'desktop' });
    if (!ev.pass) failures++;

    const perf = Math.round((lhr.categories.performance?.score ?? 0) * 100);
    const a11y = Math.round((lhr.categories.accessibility?.score ?? 0) * 100);
    const bp = Math.round((lhr.categories['best-practices']?.score ?? 0) * 100);
    const seo = Math.round((lhr.categories.seo?.score ?? 0) * 100);

    let jsGz = '—';
    const pageFile = htmlPathForUrl(target.path);
    if (fs.existsSync(pageFile)) {
      jsGz = String(computeJsGzipForPage(pageFile).totalGz);
    }

    rows.push({
      slug: target.slug,
      url: target.path,
      formFactor: target.formFactor,
      perf,
      a11y,
      bp,
      seo,
      lcp: ev.lcp != null ? Math.round(ev.lcp) : null,
      cls: ev.cls,
      tbt: ev.tbt != null ? Math.round(ev.tbt) : null,
      jsGz,
      pass: ev.pass,
      issues: ev.issues,
      json: path.basename(finalJson),
      html: fs.existsSync(htmlPath) ? path.basename(htmlPath) : path.basename(`${outBase}.html`),
    });
  }

  const summaryLines = [
    `# Lighthouse proof summary`,
    ``,
    `Tool: lighthouse@${lhVersion}`,
    `Form factors: mobile 360×640 (all hub + tool URLs below) + desktop preset (home only)`,
    `Budgets: categories ≥95, LCP ≤2500ms, CLS ≤0.05`,
    ``,
    `| Run | URL | P | A | BP | SEO | LCP (ms) | CLS | TBT (ms) | JS gz (B) | Pass |`,
    `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |`,
  ];
  for (const r of rows) {
    summaryLines.push(
      `| ${r.slug} | ${r.url} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp ?? '—'} | ${r.cls ?? '—'} | ${r.tbt ?? '—'} | ${r.jsGz} | ${r.pass ? 'PASS' : 'FAIL'} |`,
    );
  }
  if (failures) {
    summaryLines.push('', '## Failures');
    for (const r of rows.filter((x) => !x.pass)) {
      summaryLines.push(`- **${r.slug}**: ${r.issues.join('; ')}`);
    }
  }
  fs.writeFileSync(path.join(outDir, 'summary.md'), summaryLines.join('\n') + '\n');
  return { failures, rows, lhVersion };
}

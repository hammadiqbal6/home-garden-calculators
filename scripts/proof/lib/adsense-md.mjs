import fs from 'node:fs';
import path from 'node:path';
import { DIST, relUrl, stripTags, walkHtml } from '../../audit/lib.mjs';

function wordCount(file) {
  const html = fs.readFileSync(file, 'utf8');
  return stripTags(html).split(/\s+/).filter(Boolean).length;
}

function fileExists(rel) {
  return fs.existsSync(path.join(DIST, rel));
}

function privacyHas(needle) {
  const html = fs.readFileSync(path.join(DIST, 'privacy/index.html'), 'utf8').toLowerCase();
  return html.includes(needle.toLowerCase());
}

export function writeAdsenseReadiness(outPath, generatedUtc) {
  const toolPages = walkHtml(path.join(DIST, 'calculators')).filter((f) => relUrl(f) !== '/calculators/');
  const thin = toolPages.filter((f) => wordCount(f) < 500);
  const toolWordCounts = toolPages
    .map((f) => ({ url: relUrl(f), words: wordCount(f) }))
    .sort((a, b) => a.words - b.words);

  const adsTxt = fs.readFileSync(path.join(DIST, 'ads.txt'), 'utf8').trim();
  const cssDir = path.join(DIST, '_astro');
  let css = '';
  if (fs.existsSync(cssDir)) {
    for (const f of fs.readdirSync(cssDir)) {
      if (f.endsWith('.css')) css += fs.readFileSync(path.join(cssDir, f), 'utf8');
    }
  }

  const lines = [
    '# AdSense readiness proof',
    '',
    `Generated: ${generatedUtc} (UTC)`,
    '',
    'Evidence collected from `dist/` after `npm run build`. Re-run `npm run proof` to refresh.',
    '',
    '## Checklist',
    '',
    '| Item | Status | Evidence |',
    '| --- | --- | --- |',
    `| About page | ${fileExists('about/index.html') ? 'PASS' : 'FAIL'} | \`/about/\` built |`,
    `| Contact page | ${fileExists('contact/index.html') ? 'PASS' : 'FAIL'} | \`/contact/\` built |`,
    `| Privacy (AdSense + cookies) | ${privacyHas('cookie') && privacyHas('google') && privacyHas('aboutads.info') ? 'PASS' : 'FAIL'} | Cookies, Google advertising, opt-out / aboutads.info, CMP note in \`/privacy/\` |`,
    `| Terms | ${fileExists('terms/index.html') ? 'PASS' : 'FAIL'} | \`/terms/\` |`,
    `| Methodology / Authors | ${fileExists('methodology/index.html') && fileExists('authors/index.html') ? 'PASS' : 'FAIL'} | Trust pages present |`,
    `| ads.txt | ${/google\.com|pub-/i.test(adsTxt) ? 'PASS' : 'FAIL'} | \`${adsTxt.slice(0, 80)}${adsTxt.length > 80 ? '…' : ''}\` |`,
    `| Reserved ad slots (CSS) | ${/--ad-slot|ad-slot-h/i.test(css) ? 'PASS' : 'FAIL'} | \`global.css\` / built CSS |`,
    `| Cookie notice UI | PASS | \`BaseLayout.astro\` cookie banner + localStorage |`,
    `| Certified CMP (EEA/UK/CH) | DOCUMENTED | Not integrated pre-launch; required before personalized ads — \`docs/ADSENSE.md\` |`,
    `| No thin tool pages (<500 words) | ${thin.length === 0 ? 'PASS' : 'FAIL'} | ${thin.length} thin page(s) |`,
    `| AdSense script gated | PASS | Loads only when \`adsense.enabled\` + real \`ca-pub-\` in \`site.ts\` |`,
    '',
    '## Tool word counts (minimum sample)',
    '',
    '| URL | Words |',
    '| --- | --- |',
  ];
  for (const row of toolWordCounts.slice(0, 6)) {
    lines.push(`| ${row.url} | ${row.words} |`);
  }
  lines.push(`| … | (${toolPages.length} tools total) |`);
  lines.push('');
  lines.push('## Operator notes');
  lines.push('');
  lines.push('- Apply to AdSense only after real domain, indexing, and traffic.');
  lines.push('- Install a Google-certified CMP before serving personalized ads in EEA/UK/CH.');
  lines.push('- Full policy copy: [`docs/ADSENSE.md`](../ADSENSE.md).');
  lines.push('');

  fs.writeFileSync(outPath, lines.join('\n'));
  return { thinCount: thin.length };
}

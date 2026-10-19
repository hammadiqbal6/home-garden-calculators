import fs from 'node:fs';
import path from 'node:path';

const CAPTURES = [
  { name: 'home', path: '/' },
  { name: 'hub-concrete', path: '/hubs/concrete/' },
  { name: 'tool-concrete-calculator', path: '/calculators/concrete-calculator/' },
  { name: 'tool-mulch-calculator', path: '/calculators/mulch-calculator/' },
  { name: 'tool-roof-pitch-calculator', path: '/calculators/roof-pitch-calculator/' },
];

const WIDTHS = [360, 768];

export async function writeMobileProof(outDir, baseUrl) {
  fs.mkdirSync(outDir, { recursive: true });
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    throw new Error('playwright is required for mobile proof — run npm install');
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const report = [];
  let scrollFails = 0;

  for (const width of WIDTHS) {
    const height = width === 360 ? 640 : 1024;
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: width === 360 ? 2 : 1,
    });
    const page = await context.newPage();
    for (const cap of CAPTURES) {
      const url = `${baseUrl}${cap.path}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      const overflow = metrics.scrollWidth > metrics.clientWidth + 1;
      if (overflow) scrollFails++;
      report.push(
        `${cap.name} @ ${width}px: horizontal overflow ${overflow ? 'FAIL' : 'PASS'} (scroll ${metrics.scrollWidth} vs client ${metrics.clientWidth})`,
      );
      const file = path.join(outDir, `${cap.name}-${width}.png`);
      await page.screenshot({ path: file, fullPage: false });
    }
    await context.close();
  }

  await browser.close();
  const outReport = path.join(outDir, 'viewport-check.txt');
  fs.writeFileSync(
    outReport,
    ['Mobile viewport capture', `Base URL: ${baseUrl}`, '', ...report, '', `Overall scroll check: ${scrollFails === 0 ? 'PASS' : `FAIL (${scrollFails})`}`].join(
      '\n',
    ) + '\n',
  );
  return { scrollFails };
}

#!/usr/bin/env node
import { chromium, devices } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.QA_BASE || 'http://127.0.0.1:4321';
const OUT = '/opt/cursor/artifacts/screenshots';
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  '/',
  '/calculators/concrete-calculator/',
  '/hubs/lawn/',
  '/about/',
];

const viewports = [
  { name: '360', width: 360, height: 740 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
];

const report = [];

async function measure(page, label) {
  return page.evaluate(() => {
    const docEl = document.documentElement;
    const overflow = docEl.scrollWidth > window.innerWidth + 1;
    const offenders = [];
    if (overflow) {
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > window.innerWidth + 1) {
          offenders.push({
            tag: el.tagName,
            cls: (el.className || '').toString().slice(0, 80),
            w: Math.round(r.width),
          });
        }
      });
    }
    const cookie = document.getElementById('cookie-notice');
    const cookieH = cookie && cookie.classList.contains('show') ? cookie.getBoundingClientRect().height : 0;
    const inputs = [...document.querySelectorAll('.calc-root input, .calc-root select, .calc-root textarea')].map((el) => {
      const cs = getComputedStyle(el);
      return { fs: parseFloat(cs.fontSize), h: el.getBoundingClientRect().height };
    });
    const taps = [];
    document
      .querySelectorAll('.unit-toggle button, .site-footer a, .breadcrumbs a, .nav-toggle')
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.height < 44) {
          taps.push({
            text: (el.textContent || '').trim().slice(0, 40),
            h: Math.round(r.height),
            cls: (el.className || '').toString().slice(0, 40),
          });
        }
      });
    const firstInput = document.querySelector('.calc-root input, .calc-root select');
    const firstY = firstInput ? firstInput.getBoundingClientRect().top : null;
    return {
      overflow,
      scrollWidth: docEl.scrollWidth,
      innerWidth: window.innerWidth,
      cookieH: Math.round(cookieH),
      minInputFs: inputs.length ? Math.min(...inputs.map((i) => i.fs)) : null,
      smallTaps: taps.slice(0, 8),
      firstInputY: firstY !== null ? Math.round(firstY) : null,
      offenders: offenders.slice(0, 5),
    };
  });
}

const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.width < 768,
    hasTouch: true,
    userAgent: devices['iPhone 12'].userAgent,
  });
  const page = await context.newPage();
  for (const p of pages) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    // Force cookie visible for measurement
    await page.evaluate(() => {
      try {
        localStorage.removeItem('yc_cookie_ok');
      } catch (e) {}
      const n = document.getElementById('cookie-notice');
      if (n) {
        n.hidden = false;
        n.classList.add('show');
        document.body.classList.add('cookie-visible');
      }
    });
    const slug = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_');
    const foldPath = path.join(OUT, `after-fold-${slug}-${vp.name}.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    const m = await measure(page, `${p}@${vp.name}`);
    report.push({ page: p, viewport: vp.name, ...m, screenshot: foldPath });
    console.log(
      `${p} @${vp.name}: overflow=${m.overflow} cookieH=${m.cookieH} minFs=${m.minInputFs} smallTaps=${m.smallTaps.length} firstY=${m.firstInputY}`,
    );
  }
  await context.close();
}
await browser.close();
fs.writeFileSync('/opt/cursor/artifacts/mobile-qa-report.json', JSON.stringify(report, null, 2));
const fails = report.filter(
  (r) =>
    r.overflow ||
    (r.cookieH && r.cookieH > 90) ||
    (r.minInputFs && r.minInputFs < 16) ||
    r.smallTaps.length > 0,
);
console.log(`\nChecked ${report.length} combos; ${fails.length} potential issues`);
if (fails.length) {
  console.log(JSON.stringify(fails, null, 2));
  process.exitCode = 1;
}

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GDPR_CONSENT_REGION_CODES,
  isGdprConsentRegion,
  isUnknownCfCountry,
} from '../src/lib/gdprRegions';
import {
  GEO_COUNTRY_META_NAME,
  countryFromWorkerRequest,
  injectGeoCountryMeta,
} from '../src/lib/htmlGeoInject';

describe('GDPR consent regions', () => {
  it('includes EEA, UK, and Switzerland samples', () => {
    expect(isGdprConsentRegion('DE')).toBe(true);
    expect(isGdprConsentRegion('fr')).toBe(true);
    expect(isGdprConsentRegion('GB')).toBe(true);
    expect(isGdprConsentRegion('CH')).toBe(true);
    expect(isGdprConsentRegion('NO')).toBe(true);
    expect(isGdprConsentRegion('IS')).toBe(true);
    expect(isGdprConsentRegion('LI')).toBe(true);
  });

  it('excludes non-CMP regions and junk', () => {
    expect(isGdprConsentRegion('US')).toBe(false);
    expect(isGdprConsentRegion('CA')).toBe(false);
    expect(isGdprConsentRegion('XX')).toBe(false);
    expect(isGdprConsentRegion('')).toBe(false);
    expect(isGdprConsentRegion(null)).toBe(false);
  });

  it('lists a stable set of region codes for Consent Mode', () => {
    expect(GDPR_CONSENT_REGION_CODES).toContain('GB');
    expect(GDPR_CONSENT_REGION_CODES).toContain('CH');
    expect(GDPR_CONSENT_REGION_CODES.length).toBeGreaterThanOrEqual(30);
  });

  it('treats Cloudflare XX/T1 as unknown', () => {
    expect(isUnknownCfCountry('XX')).toBe(true);
    expect(isUnknownCfCountry('T1')).toBe(true);
    expect(isUnknownCfCountry('US')).toBe(false);
  });
});

describe('HTML geo inject', () => {
  it('injects yt-geo-country after <head>', () => {
    const html = '<!doctype html><html><head><title>t</title></head><body></body></html>';
    const out = injectGeoCountryMeta(html, 'de');
    expect(out).toContain(`<meta name="${GEO_COUNTRY_META_NAME}" content="DE" />`);
    expect(out.indexOf('yt-geo-country')).toBeLessThan(out.indexOf('<title>'));
  });

  it('is idempotent', () => {
    const html = injectGeoCountryMeta('<head></head>', 'FR');
    expect(injectGeoCountryMeta(html, 'US')).toBe(html);
  });

  it('sanitizes country codes', () => {
    const out = injectGeoCountryMeta('<head></head>', 'gb<script>');
    expect(out).toContain('content="GB"');
    expect(out).not.toContain('<script>');
  });

  it('reads country from request.cf then CF-IPCountry', () => {
    expect(
      countryFromWorkerRequest({
        cf: { country: 'ie' },
        headers: new Headers({ 'CF-IPCountry': 'US' }),
      }),
    ).toBe('IE');
    expect(
      countryFromWorkerRequest({
        headers: new Headers({ 'CF-IPCountry': 'ch' }),
      }),
    ).toBe('CH');
    expect(countryFromWorkerRequest({ headers: new Headers() })).toBe('XX');
  });
});

describe('BaseLayout GA4 consent gating', () => {
  const layout = readFileSync(resolve('src/layouts/BaseLayout.astro'), 'utf8');

  it('sets Consent Mode defaults before any gtag config', () => {
    const firstConsent = layout.indexOf("gtag('consent', 'default'");
    const firstConfig = layout.indexOf("gtag('config', gaId");
    expect(firstConsent).toBeGreaterThan(-1);
    expect(firstConfig).toBeGreaterThan(-1);
    expect(firstConsent).toBeLessThan(firstConfig);
  });

  it('configures GA only inside __ycLoadGa (not on every page parse)', () => {
    const loadFn = layout.indexOf('window.__ycLoadGa = function');
    const configCall = layout.indexOf("gtag('config', gaId");
    expect(loadFn).toBeGreaterThan(-1);
    expect(configCall).toBeGreaterThan(loadFn);
    // No idle/interaction prefetch outside CMP — wait for Accept / prior Accept.
    expect(layout).not.toMatch(/pointerdown.*__ycLoadGa|setTimeout\(window\.__ycLoadGa/);
  });

  it('grants consent before first load and re-sends page_view if already configured', () => {
    expect(layout).toContain("gtag('event', 'page_view'");
    expect(layout).toMatch(/if \(configured\)[\s\S]*__ycSendPageView[\s\S]*else[\s\S]*__ycLoadGa/);
    expect(layout).toMatch(/getItem\(['"]yc_cookie_ok['"]\)/);
    expect(layout).toMatch(/v === ['"]1['"]/);
  });
});

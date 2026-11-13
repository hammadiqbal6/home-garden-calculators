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

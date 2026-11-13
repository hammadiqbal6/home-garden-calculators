/**
 * ISO 3166-1 alpha-2 codes where Google’s EU User Consent Policy / certified CMP
 * applies: EEA member states + United Kingdom + Switzerland.
 * Used for Consent Mode region defaults and to suppress the site cookie banner.
 */
export const GDPR_CONSENT_REGION_CODES = [
  // EU / EEA
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IS',
  'IT',
  'LV',
  'LI',
  'LT',
  'LU',
  'MT',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  // UK + Switzerland (Google CMP / EU User Consent Policy)
  'GB',
  'CH',
] as const;

export type GdprConsentRegionCode = (typeof GDPR_CONSENT_REGION_CODES)[number];

const GDPR_SET = new Set<string>(GDPR_CONSENT_REGION_CODES);

/** True when `code` is an EEA, UK, or CH country code (case-insensitive). */
export function isGdprConsentRegion(code: string | null | undefined): boolean {
  if (!code) return false;
  const cc = code.trim().toUpperCase();
  if (cc.length !== 2) return false;
  return GDPR_SET.has(cc);
}

/** Cloudflare special codes that mean “country unknown” (not a GDPR decision). */
export function isUnknownCfCountry(code: string | null | undefined): boolean {
  if (!code) return true;
  const cc = code.trim().toUpperCase();
  return cc === '' || cc === 'XX' || cc === 'T1';
}

/**
 * Single source for brand / site-identity fallbacks.
 * Build-time PUBLIC_* (Workers Builds / .env) override these for Astro HTML.
 * Worker runtime vars (wrangler `vars`, not PUBLIC_*) override redirect-related
 * defaults — see docs/CONFIGURATION.md and docs/CUSTOM-DOMAIN.md.
 *
 * Defaults match the live YardTally production site (https://getyardtally.com).
 */

/** Canonical origin (no trailing slash). Apex is canonical. */
export const DEFAULT_SITE_URL = 'https://getyardtally.com';

/** Hostname only — used by audits to detect scattered hardcoding. */
export const DEFAULT_SITE_HOST = new URL(DEFAULT_SITE_URL).host;

/** Brand shown in header, titles, schema Organization. */
export const DEFAULT_SITE_NAME = 'YardTally';

/** Short name for apple-mobile-web-app-title / manifest / JSON-LD alternateName. */
export const DEFAULT_SITE_SHORT_NAME = 'YardTally';

/**
 * Previous brand (About “formerly …” + JSON-LD alternateName during transition).
 * Intentional — keep this string; do not scatter “YardCalc” elsewhere.
 */
export const FORMER_SITE_NAME = 'YardCalc';

/** Homepage / Organization description. */
export const DEFAULT_SITE_TAGLINE = 'Free home & garden material calculators';

/** Shorter description for site.webmanifest. */
export const DEFAULT_MANIFEST_DESCRIPTION =
  'Free home and garden material calculators';

/** Public contact email (footer, Contact, schema). */
export const DEFAULT_CONTACT_EMAIL = 'hammadiqbal117@gmail.com';

/** Named maintainer (About, bylines, Person schema). */
export const DEFAULT_AUTHOR_NAME = 'Hammad Iqbal';

/** Honest short bio for Person / About (`{name}` → site name). */
export const DEFAULT_AUTHOR_BIO =
  'I build and maintain {name} as a one-person project: free home and garden material calculators with documented formulas, manufacturer bag yields, and university extension guidance. I am not a licensed contractor or engineer—results are planning estimates you should check against local building codes and product labels.';

/** Role label for visible bylines (not a credential). */
export const DEFAULT_AUTHOR_ROLE = 'Author & maintainer';

/** Primary profile URL (Person @id / sameAs). */
export const DEFAULT_AUTHOR_URL = 'https://github.com/hammadiqbal6';

/** Comma-separated profile URLs for Person.sameAs. */
export const DEFAULT_AUTHOR_SAME_AS = DEFAULT_AUTHOR_URL;

/** Comma-separated Organization.sameAs; empty → omit / reuse author. */
export const DEFAULT_ORG_SAME_AS = '';

/** Footer © owner; empty → use site name. */
export const DEFAULT_COPYRIGHT_OWNER = '';

/** Browser chrome / manifest theme_color. */
export const DEFAULT_THEME_COLOR = '#1f6b4a';

/** Manifest background_color. */
export const DEFAULT_BACKGROUND_COLOR = '#f3f6f2';

/** Open Graph locale (og:locale) / html lang baseline. */
export const DEFAULT_LOCALE = 'en-US';

/** Sitewide content stamp / published baselines. */
export const DEFAULT_CONTENT_UPDATED = '2026-11-07';
export const DEFAULT_DATE_CREATED = '2026-10-19';

/** Default Open Graph image path (no domain). */
export const DEFAULT_OG_IMAGE_PATH = '/og-default.png';

/** Default og:image:alt. `{name}` is replaced with the site name. */
export const DEFAULT_OG_IMAGE_ALT =
  '{name} — free home and garden material calculators';

/** Footer line on per-page OG SVGs. `{name}` → site name. */
export const DEFAULT_OG_IMAGE_FOOTER =
  '{name} · Free home & garden material calculators';

/** Organization logo path (JSON-LD ImageObject). */
export const DEFAULT_LOGO_PATH = '/logo-512.png';

/** IndexNow key (also committed as public/<key>.txt). */
export const DEFAULT_INDEXNOW_KEY = 'c2a68b8b8e7e6ba2253b408fa0fe2c4c';

/**
 * Exact hostnames that 301 → CANONICAL_ORIGIN (Worker runtime).
 * Comma-separated. www → apex only (workers.dev subdomain is retired/disabled).
 * Preview hosts (`<version>-…workers.dev`) must NOT be listed.
 */
export const DEFAULT_LEGACY_REDIRECT_HOSTS = 'www.getyardtally.com';

/**
 * Retired workers.dev host (disabled via wrangler `workers_dev: false`).
 * Kept for docs/SEO allowlist / older imports — not in LEGACY_REDIRECT_HOSTS.
 */
export const LEGACY_WORKERS_DEV_HOST =
  'home-garden-calculators.hammadiqbal117.workers.dev';

/** Sister-site origin fallbacks (no trailing slash). */
export const DEFAULT_SISTER_URL_PAYMENT_FEES =
  'https://payment-fee-calculators.hammadiqbal117.workers.dev';
export const DEFAULT_SISTER_URL_BUSINESS_DOCS = 'https://docuklin.com';
export const DEFAULT_SISTER_URL_HOME_GARDEN = DEFAULT_SITE_URL;
export const DEFAULT_SISTER_URL_FIBER_ARTS =
  'https://fiber-arts-calculators.hammadiqbal117.workers.dev';
export const DEFAULT_SISTER_URL_PET = 'https://pet-calculators.hammadiqbal117.workers.dev';

/** Sister-site display names (About list). */
export const DEFAULT_SISTER_NAME_PAYMENT_FEES = 'FeeCalc';
export const DEFAULT_SISTER_NAME_BUSINESS_DOCS = 'Docuklin';
export const DEFAULT_SISTER_NAME_FIBER_ARTS = 'FiberCalc';
export const DEFAULT_SISTER_NAME_PET = 'PetCalc Tools';

/** Replace `{name}` / `{short}` in brand templates. */
export function applyBrandTemplate(template, { name, shortName } = {}) {
  const n = name ?? DEFAULT_SITE_NAME;
  const s = shortName ?? DEFAULT_SITE_SHORT_NAME;
  return String(template).replaceAll('{name}', n).replaceAll('{short}', s);
}

/** Parse comma/whitespace-separated URL or host lists; drop empties. */
export function parseList(value, fallback = '') {
  const raw = (value == null || String(value).trim() === '' ? fallback : value)
    .toString()
    .trim();
  if (!raw) return [];
  return raw
    .split(/[, \n\r\t]+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Normalize a site origin: https, no trailing slash.
 * @param {string} [raw]
 * @returns {string}
 */
export function normalizeSiteUrl(raw) {
  const trimmed = String(raw ?? '')
    .trim()
    .replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_SITE_URL;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return DEFAULT_SITE_URL;
    return `${u.protocol}//${u.host}`;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Resolve PUBLIC_SITE_URL from env (or fallback).
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} [env]
 */
export function resolveSiteOrigin(env = process.env) {
  return normalizeSiteUrl(env?.PUBLIC_SITE_URL);
}

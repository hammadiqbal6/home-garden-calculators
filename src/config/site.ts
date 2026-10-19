/**
 * Single source of truth for brand, domain, and third-party IDs.
 * Public URL / contact / author / analytics / AdSense come from build-time
 * PUBLIC_* env vars (see `.env.example`). Nothing else should hardcode those values.
 */

/** Canonical origin used when PUBLIC_SITE_URL is unset (Workers.dev deploy). */
const DEFAULT_SITE_URL =
  'https://home-garden-calculators.hammadiqbal117.workers.dev';

/** Public contact inbox used when PUBLIC_CONTACT_EMAIL is unset. */
const DEFAULT_CONTACT_EMAIL = 'hammadiqbal117@gmail.com';

/** Brand team byline when PUBLIC_AUTHOR_NAME is unset — not a personal credential. */
const DEFAULT_AUTHOR_NAME = 'YardCalc team';

/**
 * Honest team bio when PUBLIC_AUTHOR_BIO is unset.
 * No licenses, degrees, or invented personal credentials.
 */
const DEFAULT_AUTHOR_BIO =
  'YardCalc builds free home and garden material calculators. We document formulas, cite manufacturer bag yields and extension-service guidance, and keep results as planning estimates—not a substitute for local building codes or a licensed professional.';

/** Role label for author boxes (not a credential). */
const DEFAULT_AUTHOR_ROLE = 'Home & garden calculator editors';

/**
 * Read a PUBLIC_* build env var from Vite/Astro (`import.meta.env`) or Node
 * (`process.env`). Empty/whitespace → ''.
 */
function readPublicEnv(key: `PUBLIC_${string}`): string {
  let fromMeta = '';
  try {
    const env = (import.meta as ImportMeta & { env?: Record<string, unknown> }).env;
    const v = env?.[key];
    if (typeof v === 'string') fromMeta = v;
  } catch {
    /* plain Node import (e.g. astro.config) may lack import.meta.env */
  }
  const fromProcess =
    typeof process !== 'undefined' && process.env ? String(process.env[key] ?? '') : '';
  return (fromMeta || fromProcess).trim();
}

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_SITE_URL;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return DEFAULT_SITE_URL;
    return `${u.protocol}//${u.host}`;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const siteUrl = normalizeSiteUrl(readPublicEnv('PUBLIC_SITE_URL'));
const contactEmail = readPublicEnv('PUBLIC_CONTACT_EMAIL') || DEFAULT_CONTACT_EMAIL;
const ga4MeasurementId = readPublicEnv('PUBLIC_GA4_MEASUREMENT_ID');
/** Prefer PUBLIC_GSC_VERIFICATION; keep legacy alias for older Workers Builds configs. */
const searchConsoleVerification =
  readPublicEnv('PUBLIC_GSC_VERIFICATION') ||
  readPublicEnv('PUBLIC_SEARCH_CONSOLE_VERIFICATION');
const adsensePublisherId = readPublicEnv('PUBLIC_ADSENSE_PUBLISHER_ID');

/** Real ca-pub id only — placeholders keep ads disabled. */
function isRealAdsensePublisherId(id: string): boolean {
  return (
    id.startsWith('ca-pub-') &&
    !/X{4,}/i.test(id) &&
    id.replace(/^ca-pub-/, '').length >= 10
  );
}

const adsenseEnabled =
  isRealAdsensePublisherId(adsensePublisherId) &&
  readPublicEnv('PUBLIC_ADSENSE_ENABLED').toLowerCase() === 'true';

const authorName = readPublicEnv('PUBLIC_AUTHOR_NAME') || DEFAULT_AUTHOR_NAME;
const authorBio = readPublicEnv('PUBLIC_AUTHOR_BIO') || DEFAULT_AUTHOR_BIO;

export const siteConfig = {
  /** Public site name shown in UI, titles, and structured data */
  name: 'YardCalc',
  /** Short tagline for home/hero and Organization description */
  tagline: 'Free home & garden material calculators',
  /**
   * Canonical origin with protocol, no trailing slash.
   * From PUBLIC_SITE_URL, else Workers.dev fallback.
   */
  siteUrl,
  /**
   * Contact email shown on Contact/Privacy/Terms, mailto links, and Organization JSON-LD.
   * From PUBLIC_CONTACT_EMAIL, else DEFAULT_CONTACT_EMAIL.
   */
  contactEmail,
  /** ISO date used for "Last updated" stamps and sitemap lastmod defaults */
  contentUpdated: '2026-10-19',
  /**
   * Author / reviewer byline for E-E-A-T boxes.
   * Name/bio from PUBLIC_AUTHOR_NAME / PUBLIC_AUTHOR_BIO (brand team defaults; no fake credentials).
   */
  author: {
    name: authorName,
    role: DEFAULT_AUTHOR_ROLE,
    bio: authorBio,
  },
  /** Social / entity sameAs links (add real profiles when available) */
  sameAs: [] as string[],
  analytics: {
    /** GA4 measurement ID from PUBLIC_GA4_MEASUREMENT_ID — empty disables gtag */
    ga4MeasurementId,
    /** Google Search Console HTML tag content — empty omits the meta tag */
    searchConsoleVerification,
  },
  adsense: {
    /**
     * Publisher ID from PUBLIC_ADSENSE_PUBLISHER_ID (e.g. ca-pub-…).
     * Ads stay off unless this is a real id AND PUBLIC_ADSENSE_ENABLED=true.
     */
    publisherId: adsensePublisherId,
    enabled: adsenseEnabled,
    /** Enable Google Auto ads when true (documented in docs/ADSENSE.md) */
    autoAds: false,
  },
  /** IndexNow key filename (place matching key file in /public) */
  indexNowKey: 'c2a68b8b8e7e6ba2253b408fa0fe2c4c',
  locale: 'en-US',
  defaultOgImage: '/og-default.png',
};

export type SiteConfig = typeof siteConfig;

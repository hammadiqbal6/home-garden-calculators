/**
 * Single source of truth for brand, domain, and third-party IDs.
 * Public URL / contact / author / analytics / AdSense come from build-time
 * PUBLIC_* env vars (see `.env.example`). Nothing else should hardcode those values.
 *
 * Site origin: `PUBLIC_SITE_URL` → `siteConfig.siteUrl` (fallback in `site-origin.mjs`).
 * Used for Astro `site`, canonicals, sitemap, robots.txt, llms.txt, OG, JSON-LD, IndexNow.
 */

import { DEFAULT_SITE_URL, normalizeSiteUrl } from './site-origin.mjs';

export { DEFAULT_SITE_URL } from './site-origin.mjs';

/** Public contact inbox used when PUBLIC_CONTACT_EMAIL is unset. */
const DEFAULT_CONTACT_EMAIL = 'hammadiqbal117@gmail.com';

/** Named maintainer — one-person site; no invented credentials. */
const DEFAULT_AUTHOR_NAME = 'Hammad Iqbal';

/**
 * Short bio for ProfilePage / about (honest; no licenses or degrees invented).
 */
const DEFAULT_AUTHOR_BIO =
  'I build and maintain YardCalc as a one-person project: free home and garden material calculators with documented formulas, manufacturer bag yields, and university extension guidance. I am not a licensed contractor or engineer—results are planning estimates you should check against local building codes and product labels.';

/** Role label for visible bylines (not a credential; never used as author.name in JSON-LD). */
const DEFAULT_AUTHOR_ROLE = 'Author & maintainer';

/**
 * Stable Person @id shared across this maintainer's tool sites.
 * Based on the public GitHub profile so Google can merge the entity.
 */
const CANONICAL_PERSON_URL = 'https://github.com/hammadiqbal6';

/** Public profile URLs for Person.sameAs (only real profiles). */
const AUTHOR_SAME_AS = ['https://github.com/hammadiqbal6'] as const;

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

const siteUrl = normalizeSiteUrl(readPublicEnv('PUBLIC_SITE_URL'));
const contactEmail = readPublicEnv('PUBLIC_CONTACT_EMAIL') || DEFAULT_CONTACT_EMAIL;
const ga4MeasurementId = readPublicEnv('PUBLIC_GA4_MEASUREMENT_ID');
/** Prefer PUBLIC_GSC_VERIFICATION; keep legacy alias for older Workers Builds configs. */
const searchConsoleVerification =
  readPublicEnv('PUBLIC_GSC_VERIFICATION') ||
  readPublicEnv('PUBLIC_SEARCH_CONSOLE_VERIFICATION');
/** Bing Webmaster HTML meta content — keep if already set in env; never invent. */
const bingVerification = readPublicEnv('PUBLIC_BING_SITE_VERIFICATION');
const adsensePublisherId = readPublicEnv('PUBLIC_ADSENSE_PUBLISHER_ID');

/** EmailJS public IDs — all three required to enable the /contact/ form (no private key). */
const emailjsServiceId = readPublicEnv('PUBLIC_EMAILJS_SERVICE_ID');
const emailjsTemplateId = readPublicEnv('PUBLIC_EMAILJS_TEMPLATE_ID');
const emailjsPublicKey = readPublicEnv('PUBLIC_EMAILJS_PUBLIC_KEY');
const emailjsEnabled = Boolean(
  emailjsServiceId && emailjsTemplateId && emailjsPublicKey,
);

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
  /** Short name for apple-mobile-web-app-title / manifest */
  shortName: 'YardCalc',
  /** Short tagline for home/hero and Organization description */
  tagline: 'Free home & garden material calculators',
  /** Brand color for theme-color / manifest */
  brandColor: '#1f6b4a',
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
  /**
   * Site-wide content stamp. Change only when formulas, sources, or substantial copy change
   * (Google: do not refresh dates without real updates).
   */
  contentUpdated: '2026-10-23',
  /** First public release date for ProfilePage / Article datePublished defaults */
  dateCreated: '2026-10-19',
  /**
   * Author / maintainer byline for E-E-A-T.
   * No "reviewed by" unless a real named reviewer exists.
   */
  author: {
    name: authorName,
    role: DEFAULT_AUTHOR_ROLE,
    bio: authorBio,
    /** On-site author URL (ProfilePage lives on /about/) */
    urlPath: '/about/#maintainer',
    /** Cross-site Person @id (same on all five tool sites) */
    canonicalPersonId: `${CANONICAL_PERSON_URL}#person`,
    canonicalPersonUrl: CANONICAL_PERSON_URL,
    sameAs: [...AUTHOR_SAME_AS],
    knowsAbout: [
      'home and garden material calculators',
      'concrete volume estimates',
      'landscape mulch and gravel quantity',
    ],
  },
  /** Brand Organization sameAs (omit empty arrays in JSON-LD) */
  sameAs: [] as string[],
  /** Default Open Graph image (1200×630 PNG) */
  defaultOgImage: '/og-default.png',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  defaultOgImageAlt: 'YardCalc — free home and garden material calculators',
  /** Organization logo (PNG ≥112px for Google Images) */
  logoPath: '/logo-512.png',
  analytics: {
    /** GA4 measurement ID from PUBLIC_GA4_MEASUREMENT_ID — empty disables gtag */
    ga4MeasurementId,
    /** Google Search Console HTML tag content — empty omits the meta tag */
    searchConsoleVerification,
    /** Bing Webmaster Tools msvalidate.01 content — empty omits the meta tag */
    bingVerification,
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
  /**
   * EmailJS browser form on /contact/ (FREE plan). Public IDs only — never put the
   * EmailJS private key in env or the repo. See docs/CONTACT-EMAILJS.md.
   * Form renders only when serviceId + templateId + publicKey are all set.
   */
  emailjs: {
    serviceId: emailjsServiceId,
    templateId: emailjsTemplateId,
    publicKey: emailjsPublicKey,
    enabled: emailjsEnabled,
  },
  /** IndexNow key filename (place matching key file in /public) */
  indexNowKey: 'c2a68b8b8e7e6ba2253b408fa0fe2c4c',
  locale: 'en-US',
};

export type SiteConfig = typeof siteConfig;

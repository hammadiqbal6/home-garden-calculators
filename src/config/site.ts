/**
 * Single source of truth for brand, domain, and third-party IDs.
 * Public URL / contact / author / analytics / AdSense / brand come from build-time
 * PUBLIC_* env vars (see `.env.example` + docs/CONFIGURATION.md).
 *
 * Site origin: `PUBLIC_SITE_URL` → `siteConfig.siteUrl` (fallback in `siteDefaults.mjs`).
 * Used for Astro `site`, canonicals, sitemap, robots.txt, llms.txt, OG, JSON-LD, IndexNow.
 */

import {
  DEFAULT_AUTHOR_BIO,
  DEFAULT_AUTHOR_NAME,
  DEFAULT_AUTHOR_ROLE,
  DEFAULT_AUTHOR_SAME_AS,
  DEFAULT_AUTHOR_URL,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_CONTENT_UPDATED,
  DEFAULT_COPYRIGHT_OWNER,
  DEFAULT_DATE_CREATED,
  DEFAULT_INDEXNOW_KEY,
  DEFAULT_LOCALE,
  DEFAULT_LOGO_PATH,
  DEFAULT_MANIFEST_DESCRIPTION,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_ORG_SAME_AS,
  DEFAULT_SITE_NAME,
  DEFAULT_SITE_SHORT_NAME,
  DEFAULT_SITE_TAGLINE,
  DEFAULT_SITE_URL,
  DEFAULT_THEME_COLOR,
  FORMER_SITE_NAME,
  applyBrandTemplate,
  normalizeSiteUrl,
  parseList,
} from './siteDefaults.mjs';

export {
  DEFAULT_SITE_URL,
  FORMER_SITE_NAME,
  applyBrandTemplate,
} from './siteDefaults.mjs';

/**
 * Stable Person @id shared across this maintainer's tool sites.
 * Based on the public GitHub profile so Google can merge the entity.
 */
const CANONICAL_PERSON_URL_DEFAULT = DEFAULT_AUTHOR_URL;

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

const name = readPublicEnv('PUBLIC_SITE_NAME') || DEFAULT_SITE_NAME;
const shortName = readPublicEnv('PUBLIC_SITE_SHORT_NAME') || DEFAULT_SITE_SHORT_NAME;
const tagline = readPublicEnv('PUBLIC_SITE_TAGLINE') || DEFAULT_SITE_TAGLINE;
const manifestDescription =
  readPublicEnv('PUBLIC_MANIFEST_DESCRIPTION') || DEFAULT_MANIFEST_DESCRIPTION;
const siteUrl = normalizeSiteUrl(readPublicEnv('PUBLIC_SITE_URL'));
const contactEmail = readPublicEnv('PUBLIC_CONTACT_EMAIL') || DEFAULT_CONTACT_EMAIL;
const copyrightOwner =
  (readPublicEnv('PUBLIC_COPYRIGHT_OWNER') || DEFAULT_COPYRIGHT_OWNER).trim() || name;
const brandColor = readPublicEnv('PUBLIC_THEME_COLOR') || DEFAULT_THEME_COLOR;
const backgroundColor =
  readPublicEnv('PUBLIC_BACKGROUND_COLOR') || DEFAULT_BACKGROUND_COLOR;
const locale = readPublicEnv('PUBLIC_LOCALE') || DEFAULT_LOCALE;
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
const authorBio = applyBrandTemplate(
  readPublicEnv('PUBLIC_AUTHOR_BIO') || DEFAULT_AUTHOR_BIO,
  { name, shortName },
);
const authorUrl = (readPublicEnv('PUBLIC_AUTHOR_URL') || CANONICAL_PERSON_URL_DEFAULT).replace(
  /\/$/,
  '',
);
const authorSameAs = parseList(readPublicEnv('PUBLIC_AUTHOR_SAME_AS'), DEFAULT_AUTHOR_SAME_AS);
const orgSameAs = parseList(readPublicEnv('PUBLIC_ORG_SAME_AS'), DEFAULT_ORG_SAME_AS);
const logoPath = readPublicEnv('PUBLIC_LOGO_PATH') || DEFAULT_LOGO_PATH;
const defaultOgImage = readPublicEnv('PUBLIC_OG_IMAGE_PATH') || DEFAULT_OG_IMAGE_PATH;
const defaultOgImageAlt = applyBrandTemplate(
  readPublicEnv('PUBLIC_OG_IMAGE_ALT') || DEFAULT_OG_IMAGE_ALT,
  { name, shortName },
);

export const siteConfig = {
  /** Public site name shown in UI, titles, and structured data */
  name,
  /** Short name for apple-mobile-web-app-title / manifest */
  shortName,
  /** Previous brand (About copy + schema alternateName) */
  formerName: FORMER_SITE_NAME,
  /** Short tagline for home/hero and Organization description */
  tagline,
  /** Manifest / PWA description */
  manifestDescription,
  /** Brand color for theme-color / manifest */
  brandColor,
  /** Manifest background_color */
  backgroundColor,
  /**
   * Canonical origin with protocol, no trailing slash.
   * From PUBLIC_SITE_URL, else DEFAULT_SITE_URL in siteDefaults.mjs.
   */
  siteUrl,
  /**
   * Contact email shown on Contact/Privacy/Terms, mailto links, and Organization JSON-LD.
   * From PUBLIC_CONTACT_EMAIL, else DEFAULT_CONTACT_EMAIL.
   */
  contactEmail,
  /** Footer © line owner */
  copyrightOwner,
  /**
   * Site-wide content stamp. Change only when formulas, sources, or substantial copy change
   * (Google: do not refresh dates without real updates).
   */
  contentUpdated: readPublicEnv('PUBLIC_CONTENT_UPDATED') || DEFAULT_CONTENT_UPDATED,
  /** First public release date for ProfilePage / Article datePublished defaults */
  dateCreated: readPublicEnv('PUBLIC_DATE_CREATED') || DEFAULT_DATE_CREATED,
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
    canonicalPersonId: `${authorUrl}#person`,
    canonicalPersonUrl: authorUrl,
    sameAs: authorSameAs.length ? authorSameAs : [authorUrl],
    knowsAbout: [
      'home and garden material calculators',
      'concrete volume estimates',
      'landscape mulch and gravel quantity',
    ],
  },
  /** Brand Organization sameAs (omit empty arrays in JSON-LD) */
  sameAs: orgSameAs as string[],
  /** Default Open Graph image (1200×630 PNG) */
  defaultOgImage,
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  defaultOgImageAlt,
  /** Organization logo (PNG ≥112px for Google Images) */
  logoPath,
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
  indexNowKey: readPublicEnv('PUBLIC_INDEXNOW_KEY') || DEFAULT_INDEXNOW_KEY,
  locale,
};

export type SiteConfig = typeof siteConfig;

/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Canonical origin (https, no trailing slash). Optional — falls back to workers.dev. */
  readonly PUBLIC_SITE_URL?: string;
  /** Sister-site origins (shared names across the five tool repos). Optional — workers.dev fallbacks. */
  readonly PUBLIC_SITE_URL_PAYMENT_FEES?: string;
  readonly PUBLIC_SITE_URL_BUSINESS_DOCS?: string;
  readonly PUBLIC_SITE_URL_HOME_GARDEN?: string;
  readonly PUBLIC_SITE_URL_FIBER_ARTS?: string;
  readonly PUBLIC_SITE_URL_PET?: string;
  /** Public contact email. Optional — falls back to hammadiqbal117@gmail.com. */
  readonly PUBLIC_CONTACT_EMAIL?: string;
  /** Author byline name. Optional — falls back to "Hammad Iqbal". */
  readonly PUBLIC_AUTHOR_NAME?: string;
  /** Author bio. Optional — falls back to honest one-person maintainer copy. */
  readonly PUBLIC_AUTHOR_BIO?: string;
  /** GA4 measurement ID (G-…). Empty/unset → no analytics scripts. */
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  /** Google Search Console HTML-tag verification content. Optional. */
  readonly PUBLIC_GSC_VERIFICATION?: string;
  /** @deprecated Prefer PUBLIC_GSC_VERIFICATION. Kept as a build-env alias. */
  readonly PUBLIC_SEARCH_CONSOLE_VERIFICATION?: string;
  /** Bing Webmaster Tools msvalidate.01 content. Optional — do not invent. */
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  /** AdSense publisher ID (ca-pub-…). Optional; ads stay off without a real value. */
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
  /** Set to "true" only after AdSense approval (requires real publisher id). */
  readonly PUBLIC_ADSENSE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

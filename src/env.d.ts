/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Canonical origin (https, no trailing slash). Optional — falls back to workers.dev. */
  readonly PUBLIC_SITE_URL?: string;
  /** GA4 measurement ID (G-…). Empty/unset → no analytics scripts. */
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  /** Google Search Console HTML-tag verification content. Optional. */
  readonly PUBLIC_SEARCH_CONSOLE_VERIFICATION?: string;
  /** AdSense publisher ID (ca-pub-…). Optional; ads stay off without a real value. */
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
  /** Set to "true" only after AdSense approval (requires real publisher id). */
  readonly PUBLIC_ADSENSE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

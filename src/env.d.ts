/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Canonical origin (https, no trailing slash). Optional — falls back to siteDefaults.mjs. */
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_SHORT_NAME?: string;
  readonly PUBLIC_SITE_TAGLINE?: string;
  readonly PUBLIC_MANIFEST_DESCRIPTION?: string;
  /** Sister-site origins (shared names across the five tool repos). Optional. */
  readonly PUBLIC_SITE_URL_PAYMENT_FEES?: string;
  readonly PUBLIC_SITE_URL_BUSINESS_DOCS?: string;
  readonly PUBLIC_SITE_URL_HOME_GARDEN?: string;
  readonly PUBLIC_SITE_URL_FIBER_ARTS?: string;
  readonly PUBLIC_SITE_URL_PET?: string;
  readonly PUBLIC_SISTER_NAME_PAYMENT_FEES?: string;
  readonly PUBLIC_SISTER_NAME_BUSINESS_DOCS?: string;
  readonly PUBLIC_SISTER_NAME_FIBER_ARTS?: string;
  readonly PUBLIC_SISTER_NAME_PET?: string;
  /** Public contact email. Optional — falls back to hammadiqbal117@gmail.com. */
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_COPYRIGHT_OWNER?: string;
  /** Author byline name. Optional — falls back to "Hammad Iqbal". */
  readonly PUBLIC_AUTHOR_NAME?: string;
  /** Author bio. Optional — falls back to honest one-person maintainer copy. */
  readonly PUBLIC_AUTHOR_BIO?: string;
  readonly PUBLIC_AUTHOR_URL?: string;
  readonly PUBLIC_AUTHOR_SAME_AS?: string;
  readonly PUBLIC_ORG_SAME_AS?: string;
  readonly PUBLIC_THEME_COLOR?: string;
  readonly PUBLIC_BACKGROUND_COLOR?: string;
  readonly PUBLIC_LOCALE?: string;
  readonly PUBLIC_CONTENT_UPDATED?: string;
  readonly PUBLIC_DATE_CREATED?: string;
  readonly PUBLIC_LOGO_PATH?: string;
  readonly PUBLIC_OG_IMAGE_PATH?: string;
  readonly PUBLIC_OG_IMAGE_ALT?: string;
  /** GA4 measurement ID (G-…). Empty/unset → no analytics scripts. */
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  /** Google Search Console HTML-tag verification content. Optional. */
  readonly PUBLIC_GSC_VERIFICATION?: string;
  /** @deprecated Prefer PUBLIC_GSC_VERIFICATION. Kept as a build-env alias. */
  readonly PUBLIC_SEARCH_CONSOLE_VERIFICATION?: string;
  /** Bing Webmaster Tools msvalidate.01 content. Optional — do not invent. */
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  readonly PUBLIC_INDEXNOW_KEY?: string;
  /** AdSense publisher ID (ca-pub-…). Optional; ads stay off without a real value. */
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
  /** Set to "true" only after AdSense approval (requires real publisher id). */
  readonly PUBLIC_ADSENSE_ENABLED?: string;
  /**
   * Numeric AdSense ad unit id for the primary fixed display slot (calculator mid).
   * Empty → no fixed `<ins>` (Auto ads still work when ads are enabled).
   */
  readonly PUBLIC_ADSENSE_SLOT_DISPLAY?: string;
  /** Optional numeric ad unit id for top placement. Falls back to DISPLAY. */
  readonly PUBLIC_ADSENSE_SLOT_TOP?: string;
  /** Optional numeric ad unit id for mid placement. Falls back to DISPLAY. */
  readonly PUBLIC_ADSENSE_SLOT_MID?: string;
  /** Optional numeric ad unit id for bottom placement. Falls back to DISPLAY. */
  readonly PUBLIC_ADSENSE_SLOT_BOTTOM?: string;
  /** EmailJS service ID for /contact/ form. Empty → mailto-only fallback. */
  readonly PUBLIC_EMAILJS_SERVICE_ID?: string;
  /** EmailJS template ID for /contact/ form. Empty → mailto-only fallback. */
  readonly PUBLIC_EMAILJS_TEMPLATE_ID?: string;
  /** EmailJS public key (user_id). Never use the private key. Empty → mailto-only. */
  readonly PUBLIC_EMAILJS_PUBLIC_KEY?: string;
  /**
   * Footer directory badges as a JSON array of
   * {href,img,alt,width?,height?,rel?}. When unset, falls back to Fazier
   * (see PUBLIC_FAZIER_BADGE_ENABLED). Invalid JSON → warn, render none.
   */
  readonly PUBLIC_DIRECTORY_BADGES?: string;
  /**
   * Footer "Featured on Fazier" badge fallback when PUBLIC_DIRECTORY_BADGES
   * is unset. Default on (empty/true). Set to "false" to hide.
   */
  readonly PUBLIC_FAZIER_BADGE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

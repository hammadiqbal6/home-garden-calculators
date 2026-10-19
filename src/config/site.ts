/**
 * Single source of truth for brand, domain, and third-party IDs.
 * Fill placeholders before launch — nothing else should hardcode these values.
 */
export const siteConfig = {
  /** Public site name shown in UI, titles, and structured data */
  name: 'YardCalc',
  /** Short tagline for home/hero and Organization description */
  tagline: 'Free home & garden material calculators',
  /**
   * Canonical origin with protocol, no trailing slash.
   * Example: https://www.yardcalc.com
   */
  siteUrl: 'https://www.yardcalc.example',
  /** Contact email shown on Contact page and mailto links */
  contactEmail: 'hello@yardcalc.example',
  /** ISO date used for "Last updated" stamps and sitemap lastmod defaults */
  contentUpdated: '2026-10-19',
  /** Author / reviewer placeholder for E-E-A-T boxes */
  author: {
    name: 'YardCalc Editorial',
    role: 'Home project calculation team',
    bio: 'We build practical material estimators for DIY and landscaping projects, citing extension services and manufacturer coverage rates.',
  },
  /** Social / entity sameAs links (add real profiles when available) */
  sameAs: [] as string[],
  analytics: {
    /** GA4 measurement ID, e.g. G-XXXXXXXXXX — leave empty to disable */
    ga4MeasurementId: '',
    /** Google Search Console HTML tag content value — leave empty to omit */
    searchConsoleVerification: '',
  },
  adsense: {
    /**
     * Publisher ID, e.g. ca-pub-XXXXXXXXXXXXXXXX
     * Ads stay disabled until this is set AND enabled is true.
     */
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
    /** Flip to true only after AdSense approval and CMP setup for EEA/UK/CH */
    enabled: false,
    /** Enable Google Auto ads when true (documented in docs/ADSENSE.md) */
    autoAds: false,
  },
  /** IndexNow key filename (place matching key file in /public) */
  indexNowKey: 'yardcalc-indexnow-key-replace-me',
  locale: 'en-US',
  defaultOgImage: '/og-default.png',
} as const;

export type SiteConfig = typeof siteConfig;

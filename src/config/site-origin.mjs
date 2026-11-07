/**
 * Compatibility re-exports for this site's canonical origin helpers.
 * Prefer importing from `./siteDefaults.mjs` for new code.
 * Custom domain switch: set PUBLIC_SITE_URL — do not scatter hostnames in pages.
 * See docs/CUSTOM-DOMAIN.md.
 */

export {
  DEFAULT_SITE_URL,
  DEFAULT_SITE_HOST,
  LEGACY_WORKERS_DEV_HOST,
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  normalizeSiteUrl,
  resolveSiteOrigin,
} from './siteDefaults.mjs';

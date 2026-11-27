/**
 * Static indexable pathnames that must appear in the sitemap (trailing slash).
 * Calculator / guide / hub paths are asserted from dist/ in audit:indexing and
 * from the tools/guides registries in tests/sitemap-coverage.test.ts.
 */

/** Static indexable pages (not derived from tools/guides registries). */
export const STATIC_INDEXABLE_PATHS = Object.freeze([
  '/',
  '/about/',
  '/contact/',
  '/methodology/',
  '/calculators/',
  '/guides/',
]);

/** Pathnames that must stay out of the sitemap when present as HTML. */
export const SITEMAP_EXCLUDED_PATH_RE =
  /^\/(404(\.html)?\/?|embed\/|privacy\/|cookies\/|terms\/)/i;

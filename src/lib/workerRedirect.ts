/**
 * Pure redirect helpers for the Cloudflare Worker (trailing slash + legacy hosts).
 * Kept separate from the Worker entry so Vitest can cover SEO cutover behavior.
 */
import {
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  DEFAULT_SITE_URL,
  LEGACY_WORKERS_DEV_HOST,
  parseList,
} from '../config/siteDefaults.mjs';

/** Long enough for `.webmanifest` (11 chars) and similar asset extensions. */
export const FILE_EXT = /\.[a-zA-Z0-9]{1,16}$/;

export {
  DEFAULT_SITE_URL as DEFAULT_CANONICAL_ORIGIN,
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  /** Retired workers.dev host (not in default redirect list). */
  LEGACY_WORKERS_DEV_HOST,
};

export function normalizeCanonicalOrigin(origin: string): string {
  return origin.trim().replace(/\/$/, '');
}

/** Parse comma-separated Host values from Worker `LEGACY_REDIRECT_HOSTS`. */
export function parseLegacyRedirectHosts(
  value: string | undefined | null,
  fallback: string = DEFAULT_LEGACY_REDIRECT_HOSTS,
): string[] {
  return parseList(value ?? '', fallback).map((h) => h.toLowerCase());
}

/** True when Host is in the exact legacy redirect list (not versioned previews). */
export function isLegacyRedirectHost(
  host: string,
  legacyHosts: string[] | string = DEFAULT_LEGACY_REDIRECT_HOSTS,
): boolean {
  const list = Array.isArray(legacyHosts)
    ? legacyHosts.map((h) => h.toLowerCase())
    : parseLegacyRedirectHosts(legacyHosts);
  return list.includes(host.toLowerCase());
}

/** @deprecated use isLegacyRedirectHost */
export function isLegacyWorkersDevHost(
  host: string,
  legacyHost: string = LEGACY_WORKERS_DEV_HOST,
): boolean {
  return isLegacyRedirectHost(host, legacyHost);
}

/**
 * Match Worker trailing-slash policy: add `/` for directory-like paths without
 * a file extension. Root `/` and asset paths are left unchanged.
 */
export function withTrailingSlashPath(pathname: string): string {
  if (pathname.length > 1 && !pathname.endsWith('/') && !FILE_EXT.test(pathname)) {
    return `${pathname}/`;
  }
  return pathname;
}

export function needsTrailingSlashRedirect(pathname: string): boolean {
  return withTrailingSlashPath(pathname) !== pathname;
}

/**
 * Exact path aliases (legacy/common misspellings) → canonical paths.
 * Keys are matched with or without a trailing slash; values are the Location
 * pathname (trailing slash for HTML routes; bare for file-like sitemap paths).
 */
export const PATH_ALIAS_REDIRECTS: Readonly<Record<string, string>> = {
  '/about-us': '/about/',
  '/authors': '/about/',
  '/contact-us': '/contact/',
  '/contacts': '/contact/',
  '/privacy-policy': '/privacy/',
  '/terms-of-service': '/terms/',
  '/sitemap_index.xml': '/sitemap-index.xml',
  '/guides/16x24-deck-material-list': '/guides/deck-material-list-16x24/',
  '/guides/how-much-mulch-do-i-need': '/calculators/mulch-calculator/',
};

/** /calculators/:slug/embed[/] → /embed/:slug/ */
const CALCULATOR_EMBED_ALIAS = /^\/calculators\/([^/]+)\/embed\/?$/;

/**
 * If pathname is a known path alias (or calculator embed alias), return the
 * absolute redirect Location (same origin, query preserved). Otherwise null.
 * Applied before trailing-slash 308 so aliases are a single 301 hop.
 */
export function pathAliasRedirectLocation(requestUrl: string): string | null {
  const url = new URL(requestUrl);
  const raw = url.pathname;
  const key = raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw;

  const exact = PATH_ALIAS_REDIRECTS[key];
  if (exact) {
    url.pathname = exact;
    return url.toString();
  }

  const embed = CALCULATOR_EMBED_ALIAS.exec(raw);
  if (embed) {
    url.pathname = `/embed/${embed[1]}/`;
    return url.toString();
  }

  return null;
}

/**
 * If the request Host is in the legacy redirect list, return the single-hop 301
 * Location on the canonical origin (path + query preserved, trailing slash
 * applied in the same hop). Otherwise null.
 */
export function legacyHostRedirectLocation(
  requestUrl: string,
  canonicalOrigin: string = DEFAULT_SITE_URL,
  legacyHosts: string[] | string = DEFAULT_LEGACY_REDIRECT_HOSTS,
): string | null {
  const url = new URL(requestUrl);
  if (!isLegacyRedirectHost(url.host, legacyHosts)) return null;
  const origin = normalizeCanonicalOrigin(canonicalOrigin || DEFAULT_SITE_URL);
  const path = withTrailingSlashPath(url.pathname);
  return `${origin}${path}${url.search}`;
}

/**
 * Single source of truth for this site's canonical origin fallback.
 * Imported by `site.ts` (Astro/Vite) and Node scripts (IndexNow, audits).
 * Custom domain switch: set PUBLIC_SITE_URL — do not scatter hostnames in pages.
 * See docs/CUSTOM-DOMAIN.md.
 */

/** Canonical origin when PUBLIC_SITE_URL is unset (Workers.dev deploy). */
export const DEFAULT_SITE_URL =
  'https://home-garden-calculators.hammadiqbal117.workers.dev';

/**
 * Normalize a site origin: https, no trailing slash.
 * @param {string} [raw]
 * @returns {string}
 */
export function normalizeSiteUrl(raw) {
  const trimmed = String(raw ?? '')
    .trim()
    .replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_SITE_URL;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return DEFAULT_SITE_URL;
    return `${u.protocol}//${u.host}`;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Resolve PUBLIC_SITE_URL from env (or fallback).
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} [env]
 */
export function resolveSiteOrigin(env = process.env) {
  return normalizeSiteUrl(env?.PUBLIC_SITE_URL);
}

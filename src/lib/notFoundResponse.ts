/**
 * Helpers for serving the Astro 404 page with a real HTTP 404 body.
 *
 * Cloudflare Assets `html_handling: force-trailing-slash` turns a fetch of
 * `/404.html` into a 307 `Location: /404/` with an empty body. Always fetch
 * `/404/` from the ASSETS binding (bypasses the Worker) and force status 404
 * while stripping any Location header.
 */

/** Path the Worker should ask ASSETS for when building a 404 document. */
export const NOT_FOUND_ASSET_PATH = '/404/';

export function isNotFoundPath(pathname: string): boolean {
  return pathname === '/404' || pathname === '/404/' || pathname === '/404.html';
}

export function notFoundAssetUrl(origin: string): URL {
  return new URL(NOT_FOUND_ASSET_PATH, origin);
}

/** Copy asset headers, drop redirect Location, mark uncacheable. */
export function notFoundResponseHeaders(assetHeaders: Headers): Headers {
  const headers = new Headers(assetHeaders);
  headers.delete('Location');
  headers.set('Cache-Control', 'no-store');
  return headers;
}

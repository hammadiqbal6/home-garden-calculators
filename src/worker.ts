/**
 * Cloudflare Worker entry (runs before static assets):
 * 1. Hosts in LEGACY_REDIRECT_HOSTS → single-hop 301 to CANONICAL_ORIGIN
 *    (path + query preserved; trailing slash applied in the same response)
 * 2. /sitemap.xml → /sitemap-index.xml (301)
 * 3. Otherwise permanent trailing-slash redirects (308)
 *
 * Built-in assets html_handling uses temporary 307; this worker upgrades slash
 * consolidation to 308. The retired workers.dev subdomain is disabled in
 * wrangler (`workers_dev` / `preview_urls` false). Localhost is not redirected.
 *
 * Runtime config (wrangler `vars` / dashboard Variables — not PUBLIC_*):
 *   CANONICAL_ORIGIN, LEGACY_REDIRECT_HOSTS
 * See docs/CONFIGURATION.md.
 */
import {
  DEFAULT_CANONICAL_ORIGIN,
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  legacyHostRedirectLocation,
  needsTrailingSlashRedirect,
  parseLegacyRedirectHosts,
} from './lib/workerRedirect';

export interface Env {
  ASSETS: Fetcher;
  /** Canonical https origin (no trailing slash). */
  CANONICAL_ORIGIN?: string;
  /** Comma-separated exact Host values that 301 → CANONICAL_ORIGIN. */
  LEGACY_REDIRECT_HOSTS?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const canonical = env.CANONICAL_ORIGIN || DEFAULT_CANONICAL_ORIGIN;
    const legacyHosts = parseLegacyRedirectHosts(
      env.LEGACY_REDIRECT_HOSTS,
      DEFAULT_LEGACY_REDIRECT_HOSTS,
    );

    const legacyLocation = legacyHostRedirectLocation(
      request.url,
      canonical,
      legacyHosts,
    );
    if (legacyLocation) {
      return Response.redirect(legacyLocation, 301);
    }

    // Canonical sitemap URL is Astro's sitemap-index.xml (301, not a 200 copy).
    if (url.pathname === '/sitemap.xml' || url.pathname === '/sitemap.xml/') {
      url.pathname = '/sitemap-index.xml';
      return Response.redirect(url.toString(), 301);
    }

    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      needsTrailingSlashRedirect(url.pathname)
    ) {
      url.pathname = `${url.pathname}/`;
      return Response.redirect(url.toString(), 308);
    }

    // Never serve /404/ as a soft-200 document. Cloudflare assets may still
    // emit a crawlable 404/index.html; always respond with HTTP 404 + body.
    if (url.pathname === '/404' || url.pathname === '/404/') {
      const notFoundReq = new Request(new URL('/404.html', url.origin), request);
      const assetRes = await env.ASSETS.fetch(notFoundReq);
      const headers = new Headers(assetRes.headers);
      headers.set('Cache-Control', 'no-store');
      return new Response(assetRes.body, { status: 404, statusText: 'Not Found', headers });
    }

    return env.ASSETS.fetch(request);
  },
};

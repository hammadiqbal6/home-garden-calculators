/**
 * Permanent trailing-slash redirects (308) for HTML routes + sitemap alias.
 * Cloudflare assets `force-trailing-slash` alone uses 307; this Worker upgrades
 * consolidation redirects to 308 while still serving static assets.
 *
 * FILE_EXT allows up to 16 chars so long extensions like `.webmanifest` are
 * treated as files (not HTML routes that would get a trailing slash).
 *
 * @param {Request} request
 * @param {{ ASSETS: { fetch: (req: Request) => Promise<Response> } }} env
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Canonical sitemap URL is Astro's sitemap-index.xml (301, not a 200 copy).
    if (pathname === '/sitemap.xml' || pathname === '/sitemap.xml/') {
      url.pathname = '/sitemap-index.xml';
      return Response.redirect(url.toString(), 301);
    }

    // Leave real files (extensions) alone: icons, manifests, robots, sitemaps, assets.
    // {1,16} covers .webmanifest (11) and similar long extensions.
    const looksLikeFile = /\.[a-zA-Z0-9]{1,16}$/.test(pathname);
    if (!looksLikeFile && pathname !== '/' && !pathname.endsWith('/')) {
      url.pathname = `${pathname}/`;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};

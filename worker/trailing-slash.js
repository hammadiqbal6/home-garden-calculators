/**
 * Permanent trailing-slash redirects (308) for HTML routes.
 * Cloudflare assets `force-trailing-slash` alone uses 307; this Worker upgrades
 * consolidation redirects to 308 while still serving static assets.
 *
 * @param {Request} request
 * @param {{ ASSETS: { fetch: (req: Request) => Promise<Response> } }} env
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Leave real files (extensions) alone: icons, manifests, robots, sitemaps, assets.
    const looksLikeFile = /\.[a-zA-Z0-9]{1,12}$/.test(pathname);
    if (!looksLikeFile && pathname !== '/' && !pathname.endsWith('/')) {
      url.pathname = `${pathname}/`;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};

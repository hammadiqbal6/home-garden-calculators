# Custom domain cutover (YardTally)

This site’s canonical origin is **https://getyardtally.com** (brand: **YardTally**, formerly YardCalc). Canonical URLs, the sitemap, `robots.txt`, `llms.txt`, JSON-LD, Open Graph, and IndexNow all read **one** origin:

| Setting | Where |
|---------|--------|
| `PUBLIC_SITE_URL` | Workers Builds / CI / `.env` (preferred) |
| `DEFAULT_SITE_URL` | `src/config/siteDefaults.mjs` (fallback when env unset) |
| Astro `site` | `astro.config.mjs` → `siteConfig.siteUrl` |
| Worker `CANONICAL_ORIGIN` | `wrangler.jsonc` `vars` (runtime only; defaults to `https://getyardtally.com`) |
| Worker `LEGACY_REDIRECT_HOSTS` | `wrangler.jsonc` `vars` (exact Host values that 301 → apex) |

**Do not** hardcode the custom-domain or workers.dev hostname in pages, components, or scripts beyond `siteDefaults.mjs` / wrangler vars / this doc / redirect tests. Sister-site origins use their own `PUBLIC_SITE_URL_*` vars (`src/config/sisterSites.ts`).

---

## Legacy hosts → apex (301)

The run-first Worker (`src/worker.ts`) permanently redirects these **exact** hostnames to `CANONICAL_ORIGIN` (default `https://getyardtally.com`), status **301**, in a **single hop** (trailing-slash normalization is applied in that same 301 — no 308-then-301 chain):

| Host | Behavior |
|------|----------|
| `home-garden-calculators.hammadiqbal117.workers.dev` | 301 → `https://getyardtally.com` + path + query |
| `www.getyardtally.com` | 301 → `https://getyardtally.com` + path + query |
| `getyardtally.com` | Normal site; trailing-slash only → **308** when needed |
| `<version>-home-garden-calculators.….workers.dev` (previews) | **No** host redirect |
| `localhost` / `127.0.0.1` | **No** host redirect |

Override without rebuilding Astro HTML by setting Worker vars `CANONICAL_ORIGIN` / `LEGACY_REDIRECT_HOSTS` in `wrangler.jsonc` or the Cloudflare dashboard. Build-time `PUBLIC_*` vars are **not** available to the Worker runtime.

Constants: `DEFAULT_LEGACY_REDIRECT_HOSTS` in `src/config/siteDefaults.mjs`. Unit coverage: `tests/worker-redirect.test.ts`.

---

## Cutover checklist

1. **Set build variables**  
   In Cloudflare Workers Builds → Variables (Production), set:
   ```bash
   PUBLIC_SITE_URL=https://getyardtally.com
   PUBLIC_SITE_NAME=YardTally
   PUBLIC_SITE_SHORT_NAME=YardTally
   ```
   Rebuild/deploy so Astro bakes the new origin into canonicals, sitemap, robots, llms, OG, and JSON-LD.

2. **Attach custom domains in Cloudflare**  
   Workers → this Worker → Custom Domains → add `getyardtally.com` and `www.getyardtally.com`. Complete DNS as prompted. Do not remove the workers.dev route until redirects work.

3. **Verify Worker 301s** (deployed in `src/worker.ts`):
   ```bash
   curl -sI 'https://home-garden-calculators.hammadiqbal117.workers.dev/calculators/concrete-calculator/?a=1' | head
   # expect: 301 Location: https://getyardtally.com/calculators/concrete-calculator/?a=1
   curl -sI 'https://www.getyardtally.com/guides/?utm=1' | head
   # expect: 301 Location: https://getyardtally.com/guides/?utm=1
   ```

4. **Google Search Console**  
   - Add a new URL-prefix (or Domain) property for `https://getyardtally.com`.  
   - Verify (HTML tag via `PUBLIC_GSC_VERIFICATION` or DNS).  
   - Submit `https://getyardtally.com/sitemap-index.xml`.  
   - Use **Change of Address** from the old workers.dev property once permanent 301s are live.

5. **Analytics**  
   In GA4, add/update the web data stream URL to `https://getyardtally.com`. Keep the same measurement ID unless you intentionally split properties.

6. **IndexNow**  
   Redeploy so `keyLocation` uses the new host. Optionally ping: `npm run indexnow`.

7. **Sister links**  
   Set `PUBLIC_SITE_URL_HOME_GARDEN=https://getyardtally.com` on **sibling** repos so cross-links stay correct.

8. **Verify**  
   `npm run build && npm run audit && npm run check:links`

## Rollback

Clear or revert `PUBLIC_SITE_URL` so builds fall back to `DEFAULT_SITE_URL` in `siteDefaults.mjs`, clear/override Worker `LEGACY_REDIRECT_HOSTS` if needed, and rebuild.

Also see [CONFIGURATION.md](./CONFIGURATION.md).

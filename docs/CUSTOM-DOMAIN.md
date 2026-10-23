# Custom domain cutover (YardCalc)

Do **not** change the live domain until DNS and Search Console are ready. Today the site is served on the Workers.dev URL defined as the single fallback in [`src/config/site-origin.mjs`](../src/config/site-origin.mjs).

## Single setting

| Layer | Source |
|---|---|
| Canonical origin | `PUBLIC_SITE_URL` → `siteConfig.siteUrl` (fallback: `DEFAULT_SITE_URL` in `site-origin.mjs`) |
| Astro `site` / sitemap | `astro.config.mjs` → `siteConfig.siteUrl` |
| Canonicals, OG, JSON-LD | `BaseLayout.astro` / `src/lib/schema.ts` via `siteConfig.siteUrl` |
| `robots.txt` Sitemap line | `src/pages/robots.txt.ts` |
| `llms.txt` | `src/pages/llms.txt.ts` |
| IndexNow `host` / `keyLocation` | `scripts/indexnow.mjs` → `resolveSiteOrigin()` |

**Rule:** never paste this site’s hostname into pages, layouts, or scripts. Import `siteConfig.siteUrl` or `resolveSiteOrigin()`. CI (`npm run audit:seo`) fails if `home-garden-calculators.hammadiqbal117.workers.dev` appears outside `site-origin.mjs` and this doc.

Sister-site URLs use `PUBLIC_SITE_URL_*` (see `src/config/sisterSites.ts`). For this property, prefer `PUBLIC_SITE_URL`; keep `PUBLIC_SITE_URL_HOME_GARDEN` in sync when both are set.

## Cutover checklist

1. **Set the variable**  
   In Cloudflare Workers Builds (and GitHub Actions `env` if you pin it), set:
   ```bash
   PUBLIC_SITE_URL=https://www.your-domain.com
   ```
   No trailing slash. Rebuild so sitemap, canonicals, robots, llms.txt, OG, and JSON-LD all emit the new origin.

2. **Attach the custom domain in Cloudflare**  
   Workers → this Worker → Custom Domains → add `www.your-domain.com` (and apex if desired). Complete DNS as prompted. Do not remove the workers.dev route until redirects work.

3. **301 workers.dev → custom domain**  
   Add a Cloudflare Redirect Rule (or Bulk Redirect) so  
   `https://home-garden-calculators.hammadiqbal117.workers.dev/*`  
   **301**s to  
   `https://www.your-domain.com/$1`  
   (preserve path + query). Prefer **301** over 302/307 for consolidation.

4. **Google Search Console**  
   - Add a new **URL-prefix** (or Domain) property for `https://www.your-domain.com`.  
   - Verify (DNS TXT or HTML meta via existing `PUBLIC_GSC_VERIFICATION` if you move the token).  
   - Submit `https://www.your-domain.com/sitemap-index.xml`.  
   - Use Change of Address if GSC offers it from the old workers.dev property; otherwise keep both properties until the new one shows coverage.

5. **Analytics**  
   In GA4, add/update the web data stream URL to the custom domain. Keep the same measurement ID (`PUBLIC_GA4_MEASUREMENT_ID`) unless you intentionally split properties.

6. **IndexNow**  
   Redeploy so `keyLocation` uses the new host. The key file remains `public/<indexNowKey>.txt`. Optionally ping: `npm run indexnow`.

7. **Sister links / env**  
   Set `PUBLIC_SITE_URL_HOME_GARDEN` to the same custom origin on **sibling** repos so cross-links stay correct.

8. **Verify**  
   `npm run build && npm run audit && npm run check:links`  
   Spot-check: view-source canonical, `/robots.txt`, `/sitemap-index.xml`, one tool OG URL, JSON-LD `@id`s — all should show the custom domain only.

## Rollback

Clear or revert `PUBLIC_SITE_URL` to empty/unset so builds fall back to `DEFAULT_SITE_URL` in `site-origin.mjs`, remove or pause the 301 rule, and rebuild.

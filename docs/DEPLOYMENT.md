# Deployment guide

Primary host: **Cloudflare Pages**. Also covered: Vercel and Netlify. The site is a static Astro build (`npm run build` → `dist/`).

## Before you deploy

1. Edit `src/config/site.ts`:
   - `siteUrl` (canonical origin, no trailing slash)
   - `name`, `contactEmail`
   - Optional: `analytics.ga4MeasurementId`, `analytics.searchConsoleVerification`
   - AdSense fields only after approval (`docs/ADSENSE.md`)
2. Update `public/robots.txt` `Sitemap:` line to your real domain.
3. Update `public/llms.txt` and IndexNow key file name to match `siteConfig.indexNowKey`.
4. Pick **one** canonical host (`www` or apex) and redirect the other.

## Cloudflare Pages (recommended)

1. Push this repo to GitHub/GitLab.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → Connect repo.
3. Build settings:
   - Framework preset: Astro (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20` or `22` (Pages environment variable `NODE_VERSION=20`)
4. After first deploy, add custom domain → enable Cloudflare SSL (Full/Strict).
5. Redirects:
   - Use `public/_redirects` and/or Bulk Redirects / Rules to send `http` → `https` and non-canonical host → canonical.
   - `public/_headers` is applied automatically on Pages for security headers.
6. Optional: enable Cloudflare IndexNow integration, or use `scripts/indexnow.mjs` after deploys.

### Useful Pages env vars

| Variable | Purpose |
|---|---|
| `NODE_VERSION` | Pin Node (e.g. `20`) |
| (none required for runtime) | Config is compile-time via `src/config/site.ts` |

## Vercel

1. Import repo → Framework: Astro → Output: static.
2. Build command `npm run build`, output `dist`.
3. `vercel.json` already sets headers, trailing slash, and sitemap rewrite.
4. Add domain; set redirect from non-www ↔ www in Domain settings.

## Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. `_headers` and `_redirects` in `public/` are copied into `dist/` and honored.

## Post-deploy checklist

- [ ] `https://your-domain/` loads over HTTPS
- [ ] www/apex redirect works both ways as intended
- [ ] `/robots.txt` and `/sitemap-index.xml` reachable
- [ ] Spot-check 3 calculators on a phone
- [ ] Submit sitemap in Google Search Console + Bing (see `docs/SEO-GUIDE.md`)
- [ ] Run `npm run audit` against production URLs or local `dist`

## IndexNow

1. Replace `siteConfig.indexNowKey` and the matching `public/<key>.txt` file contents.
2. After content updates, notify Bing/Yandex/etc. (Google does **not** use IndexNow):

```bash
node scripts/indexnow.mjs https://www.your-domain.com/calculators/concrete-calculator/
```

See script header for batch usage.

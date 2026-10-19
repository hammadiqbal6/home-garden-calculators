# Deployment guide — YardCalc (step by step)

This guide walks you from a fresh clone to a live, HTTPS site on your own domain, with Search Console, analytics, and (when ready) AdSense. It matches **this repository’s real scripts and files**—copy-paste the commands as written.

**Related docs:** [SEO-GUIDE.md](./SEO-GUIDE.md) · [ADSENSE.md](./ADSENSE.md) · [Proof bundle](./proof/README.md) · [README](../README.md)

---

## 1. Prerequisites

### What you need on your machine

| Requirement | Details |
| --- | --- |
| **Node.js** | **20+** (22 recommended). Check with `node -v`. Matches `package.json` `engines` and CI (`NODE_VERSION=22`). |
| **npm** | 9+ (`npm -v`). |
| **Git** | To push to GitHub/GitLab for hosted builds. |
| **A code editor** | To edit `src/config/site.ts` and `public/*` placeholders. |

### Accounts you will use (free tiers are fine)

| Service | Why |
| --- | --- |
| **GitHub** (or GitLab) | Source control; Cloudflare Pages / Vercel / Netlify connect here. |
| **Domain registrar** | e.g. Cloudflare Registrar, Namecheap, Google Domains successor—any DNS you control. |
| **Cloudflare** (recommended host) | Pages hosting + DNS + SSL. |
| **Google Search Console** | Indexing, coverage, queries, CWV field data. |
| **Bing Webmaster Tools** | Bing indexing; can import from GSC. |
| **Google Analytics 4** (optional at first) | Traffic and landing-page performance. |
| **Google AdSense** (later) | Only after the site has real content and some organic traffic. |

You do **not** need a database or server runtime. The site is **static HTML** in `dist/` after `npm run build`.

---

## 2. Local setup: build, preview, test, audit, proof

Clone and install:

```bash
git clone https://github.com/hammadiqbal6/home-garden-calculators.git
cd home-garden-calculators
npm install
```

### Configure before the first production build

Edit **`src/config/site.ts`** (see [Section 3](#3-configure-the-site-srcconfigsitets-and-public-files)). Then:

```bash
# 1) Calculator math
npm test

# 2) Production static site → dist/
npm run build

# 3) Smoke-test locally (Ctrl+C to stop)
npm run preview
# Open http://localhost:4321/ (default Astro preview port)

# 4) Broken internal links on dist/
npm run check:links

# 5) SEO + AdSense readiness + JS gzip budget (≤50KB/page)
npm run audit

# 6) Lighthouse CI budgets (mobile, subset of URLs — see lighthouserc.cjs)
npm run lighthouse

# 7) Full committed proof bundle (Lighthouse HTML/JSON, screenshots, audits)
npm run build && npm run proof
```

**What “green” means locally**

- `npm test` — 21 Vitest tests pass.
- `npm run audit` — `0 errors` for SEO, AdSense, and perf.
- `npm run proof` — writes [`docs/proof/`](./proof/README.md) and exits `0` (regenerates Lighthouse reports, Playwright mobile screenshots, structured-data samples, etc.).

Fix any failure **before** deploying. Proof artifacts are the evidence you can attach to launch reviews; CI also runs a `proof` job on pull requests.

---

## 3. Configure the site (`src/config/site.ts` and public files)

### 3.1 `src/config/site.ts` — every field

This file is the **only** place for brand, domain, and third-party IDs at **build time**. Astro reads `siteConfig.siteUrl` in `astro.config.mjs` for sitemaps and canonical URLs. There is **no** required `.env` file in this repo today.

| Field | Example | What to do |
| --- | --- | --- |
| `name` | `YardCalc` | Public brand in header, titles, JSON-LD. |
| `tagline` | Short sentence | Home hero and Organization description. |
| `siteUrl` | `https://www.yourdomain.com` | **Canonical origin** — `https`, **no trailing slash**. Must match the host you will redirect to. |
| `contactEmail` | `hammadiqbal117@gmail.com` | Contact page, trust pages, and `mailto:` links. Override with `PUBLIC_CONTACT_EMAIL`. |
| `contentUpdated` | `2026-10-19` | ISO date for “last updated” stamps and sitemap `lastmod` default. Bump when you ship content changes. |
| `author.name` / `role` / `bio` | Editorial byline | E-E-A-T boxes on guides/tools. Replace placeholder copy. |
| `sameAs` | `['https://…']` | Optional social/profile URLs for Organization schema. |
| `analytics.ga4MeasurementId` | `G-XXXXXXXXXX` or `''` | Empty = GA4 scripts omitted. Set after you create a GA4 property. |
| `analytics.searchConsoleVerification` | meta tag **content** value | Optional HTML-tag GSC verification. DNS verification is often easier—leave empty if using DNS. |
| `adsense.publisherId` | `ca-pub-XXXXXXXXXXXXXXXX` | Placeholder until approved; keep `enabled: false` until live. |
| `adsense.enabled` | `false` → `true` | **Only** after AdSense approval **and** CMP plan for EEA/UK/CH if serving personalized ads. |
| `adsense.autoAds` | `false` | Documented in [ADSENSE.md](./ADSENSE.md); enable only if you use Auto ads. |
| `indexNowKey` | filename without path | Must match `public/<indexNowKey>.txt` (see below). |
| `locale` | `en-US` | `<html lang="…">`. |
| `defaultOgImage` | `/og-default.png` | Replace image in `public/` if you want custom social preview art. |

**Build env vars:** See [`.env.example`](../.env.example). `PUBLIC_SITE_URL` drives canonicals, sitemap, `robots.txt`, and `llms.txt` (fallback: workers.dev URL). `PUBLIC_CONTACT_EMAIL` overrides the default public inbox (`hammadiqbal117@gmail.com`). `PUBLIC_GA4_MEASUREMENT_ID` enables GA4 gtag when set. AdSense stays off until `PUBLIC_ADSENSE_PUBLISHER_ID` is a real `ca-pub-…` **and** `PUBLIC_ADSENSE_ENABLED=true`.

### 3.2 Public files — replace placeholders

After you know your real domain (`https://www.yourdomain.com`):

| File | Action |
| --- | --- |
| **`public/robots.txt`** | Set `Sitemap: https://www.yourdomain.com/sitemap-index.xml` (line 44 today points at `yardcalc.example`). |
| **`public/llms.txt`** | Replace every `https://www.yardcalc.example` URL with your domain (optional file for some answer engines). |
| **`public/_redirects`** | Uncomment/edit apex → `www` (or reverse) rules for Netlify/Cloudflare Pages; see [Section 4](#4-custom-domain-dns-https-www-vs-apex). |
| **`public/ads.txt`** | Leave commented until AdSense approval; then uncomment and set `google.com, pub-NNNN…, DIRECT, f08c47fec0942fa0` (numeric pub id). |
| **`public/<indexNowKey>.txt`** | Rename file to match `siteConfig.indexNowKey`; file body = the key string. |
| **`public/_headers`** | Usually no edits; security headers and long-cache for hashed assets. CSP already allows AdSense/GA domains when you enable them. |

Rebuild after any config change:

```bash
npm run build
npm run audit
```

---

## 4. Custom domain: DNS, HTTPS, www vs apex

### 4.1 Pick one canonical host

Choose **either**:

- **`https://www.yourdomain.com`** (common for content sites), **or**
- **`https://yourdomain.com`** (apex only).

Every canonical link, `siteUrl`, sitemap URLs, and `robots.txt` must use that choice. Redirect the other host with a **301**.

### 4.2 Typical DNS (www canonical)

At your registrar or Cloudflare DNS:

| Type | Name | Value | Notes |
| --- | --- | --- | --- |
| `CNAME` | `www` | `<your-pages-subdomain>.pages.dev` | Cloudflare Pages custom domain wizard fills this. |
| `A` / `CNAME` | `@` (apex) | Pages apex setup or redirect to `www` | Cloudflare “Redirect Rules” or `public/_redirects`. |

For **Cloudflare Pages**: Dashboard → your project → **Custom domains** → add `www.yourdomain.com` and apex if desired → follow SSL prompts (**Full (strict)** once origin is Pages).

### 4.3 HTTPS

All three hosts below terminate TLS for you when DNS is correct:

- **Cloudflare Pages** — automatic certificate on custom domain.
- **Vercel** — automatic certificate.
- **Netlify** — automatic certificate.

Verify in a browser: padlock, certificate valid, no mixed-content warnings.

### 4.4 Redirect non-canonical host

**Cloudflare Pages** — example redirect rule (if apex should go to www):

- **If** hostname equals `yourdomain.com` **then** static redirect to `https://www.yourdomain.com` (301).

**Netlify / Cloudflare** — uncomment in `public/_redirects`:

```text
http://yourdomain.com/*   https://www.yourdomain.com/:splat  301
https://yourdomain.com/*  https://www.yourdomain.com/:splat  301
```

**Vercel** — Domain settings → set primary domain to `www` and add redirect from apex in the dashboard.

---

## 5. Deploy on Cloudflare Workers (recommended — static assets)

Production hosting is a **pure static-assets Worker** named `home-garden-calculators` (see committed `wrangler.jsonc`). No Astro Cloudflare adapter, SESSION KV, or Images bindings.

### 5.1 Workers Builds (already configured)

| Setting | Value |
| --- | --- |
| Worker name | `home-garden-calculators` |
| Branch | `main` |
| Root directory | `/` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

**Build variables** (Workers Builds → Variables):

| Name | Example / notes |
| --- | --- |
| `PUBLIC_SITE_URL` | `https://home-garden-calculators.hammadiqbal117.workers.dev` (or custom domain) |
| `PUBLIC_CONTACT_EMAIL` | Optional — defaults to `hammadiqbal117@gmail.com` |
| `PUBLIC_GA4_MEASUREMENT_ID` | Optional `G-…` — enables gtag.js when set |
| `PUBLIC_GSC_VERIFICATION` | Optional Google Search Console HTML-tag `content` value |
| `PUBLIC_ADSENSE_PUBLISHER_ID` / `PUBLIC_ADSENSE_ENABLED` | Leave unset until AdSense approval |
| `NODE_VERSION` | `22` (or `20`) if the build image needs it |

Local check: `npm run build && npx wrangler deploy --dry-run`.

Merging to `main` triggers the first production build/deploy.

### 5.2 Custom domain on Pages

1. Project → **Custom domains** → **Set up a domain** → enter `www.yourdomain.com`.
2. Add DNS records as instructed (often automatic if the zone is on Cloudflare).
3. Wait for **Active** SSL status.
4. Add apex redirect if needed ([Section 4](#4-custom-domain-dns-https-www-vs-apex)).

### 5.3 Headers, caching, redirects

- **`public/_headers`** is copied into `dist/` and applied on Cloudflare Pages (security headers, immutable cache for `/assets/*`, `*.js`, `*.css`).
- **`public/_redirects`** — `/sitemap.xml` → `/sitemap-index.xml` (200). Add host redirects here or in Cloudflare Rules.
- **Preview deployments**: every PR branch gets a `*.pages.dev` URL—use for QA before merging.

### 5.4 Post-deploy smoke test (Pages)

```bash
curl -I https://www.yourdomain.com/
curl -I https://www.yourdomain.com/robots.txt
curl -I https://www.yourdomain.com/sitemap-index.xml
```

Open on a phone: home, one hub, two calculators. Confirm US/metric toggle and results update.

---

## 6. Deploy on Vercel

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → import this repo.
2. Framework: **Astro**. Build command: `npm run build`. Output directory: `dist`.
3. **Node.js Version** in project settings: **22.x**.
4. `vercel.json` in the repo already sets:
   - Security headers (similar to `_headers`)
   - Long cache for `/assets/*`
   - `/sitemap.xml` → `/sitemap-index.xml`
   - `trailingSlash: true` (must match Astro config)
5. **Domains** → add `www.yourdomain.com` → set as primary → configure apex redirect to www (or the reverse, matching `siteUrl`).
6. **Preview deployments** are created per branch/PR automatically.

---

## 7. Deploy on Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment: `NODE_VERSION` = `22`
5. `public/_headers` and `public/_redirects` deploy with the site (Netlify native support).
6. **Domain management** → add custom domain → Netlify DNS or external DNS → enable HTTPS.
7. **Deploy previews** for pull requests: enable in **Site configuration** → **Build & deploy** → **Deploy previews**.

---

## 8. Post-deploy SEO

Do these on the **live** domain after DNS and HTTPS work.

### 8.1 Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** — prefer **Domain** property (`yourdomain.com`) with **DNS TXT** verification (works for all subdomains).  
   - Alternative: **URL prefix** `https://www.yourdomain.com/` and use the HTML tag from `siteConfig.analytics.searchConsoleVerification` in `site.ts`, then redeploy.
3. **Sitemaps** → Submit: `https://www.yourdomain.com/sitemap-index.xml`
4. **URL Inspection** → test and **Request indexing** for:
   - `/`
   - `/hubs/concrete/`
   - `/calculators/concrete-calculator/`
   - `/calculators/mulch-calculator/`
   - `/guides/mulch-depth-guide/`
5. Over the next days: check **Pages** indexing report and **Experience** → **Core Web Vitals**.

### 8.2 Bing Webmaster Tools + IndexNow

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) → add site → **Import from Google Search Console** (fastest) or verify DNS.
2. Submit the same sitemap URL.
3. **IndexNow** (Bing/Yandex; Google does not use IndexNow):
   - Ensure `public/<your-indexnow-key>.txt` exists and matches `siteConfig.indexNowKey`.
   - After meaningful content updates:

```bash
node scripts/indexnow.mjs \
  https://www.yourdomain.com/calculators/concrete-calculator/ \
  https://www.yourdomain.com/guides/mulch-depth-guide/
```

Optional: enable Cloudflare’s IndexNow integration for Pages.

### 8.3 Rich Results Test

1. Open [Rich Results Test](https://search.google.com/test/rich-results).
2. Test live URLs (not localhost): home (WebSite/Organization), a tool (WebApplication + BreadcrumbList), a guide (Article).
3. Local JSON-LD samples are in [`docs/proof/structured-data/`](./proof/structured-data/)—**re-run this test on production** after deploy.

### 8.4 PageSpeed Insights (field + lab)

1. [PageSpeed Insights](https://pagespeed.web.dev/) → enter live URLs (home + one tool).
2. Compare to committed lab scores in [`docs/proof/lighthouse/summary.md`](./proof/lighthouse/summary.md).
3. Targets: mobile Performance ≥ 95, LCP &lt; 2.5s, CLS &lt; 0.05 (see `lighthouserc.cjs`).

---

## 9. Google AdSense (when ready)

**Do not rush AdSense.** Apply when:

- All trust pages are live (About, Contact, Privacy, Terms, Methodology, Authors).
- Tools and guides are original and pass `npm run audit:adsense`.
- Search Console shows **impressions** on multiple pages (not necessarily clicks yet).
- You have fixed any thin/orphan issues.

See [ADSENSE.md](./ADSENSE.md) and [`docs/proof/adsense-readiness.md`](./proof/adsense-readiness.md).

### 9.1 Application flow

1. [adsense.google.com](https://adsense.google.com) → add your site URL (`https://www.yourdomain.com`).
2. Google may ask for verification—ensure `siteUrl` matches the live site.
3. Wait for approval email (can take days).

### 9.2 Enable ads in this codebase

1. Set `adsense.publisherId` and `adsense.enabled: true` in `src/config/site.ts`.
2. Uncomment/fill `public/ads.txt` with your `pub-` id.
3. `npm run build` → deploy.
4. In AdSense UI, confirm **sites** shows “Ready” and **ads.txt** is found at `https://www.yourdomain.com/ads.txt`.

The AdSense script in `BaseLayout.astro` loads only when `enabled` is true and the publisher id is not a placeholder.

### 9.3 Consent / CMP (EEA, UK, Switzerland)

- A **cookie notice** is already in `BaseLayout.astro` (informational).
- **Personalized ads** in EEA/UK/CH require a **Google-certified CMP** with IAB TCF—install **before** turning on personalized ads. Document the vendor in `/privacy/`.
- Until CMP is live, prefer non-personalized ads or keep `adsense.enabled: false` in those regions (consult your CMP vendor).

### 9.4 Ad placement and CLS

- Use existing `<AdSlot />` components—reserved min-heights in CSS (`--ad-slot-h`) prevent layout shift.
- Avoid stacking large display units above the calculator on mobile.
- After enabling ads, re-run `npm run proof` or PageSpeed Insights on a tool page and watch **CLS**.

---

## 10. Analytics (GA4) and weekly monitoring

### 10.1 Enable GA4

1. [analytics.google.com](https://analytics.google.com) → Admin → create **GA4** property for your domain.
2. Copy **Measurement ID** (`G-XXXXXXXXXX`).
3. Set `analytics.ga4MeasurementId` in `site.ts` → rebuild → deploy.
4. **Admin** → **DebugView** → visit the site with [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) or `?debug_mode=true` (if configured) to confirm `page_view` events.

### 10.2 Weekly operator routine (15–30 minutes)

| Source | What to check |
| --- | --- |
| **GSC → Performance** | Top queries, pages gaining/losing impressions; pages stuck at position 8–30 (content opportunities). |
| **GSC → Pages / Indexing** | New “Not indexed” or “Crawled – currently not indexed” URLs—fix canonicals, thin content, or internal links. |
| **GSC → Experience → CWV** | Mobile LCP/CLS/INP issues on real URLs. |
| **GA4** | Users by landing page; bounce on key calculators; confirm tracking after deploys. |
| **Bing WMT** | Index coverage, crawl errors. |
| **Repo** | `npm run audit` before each content release; `npm run proof` before major launches. |

---

## 11. Updating, redeploying, and rollback

### 11.1 Normal content or config update

```bash
# edit src/config/site.ts, content, or calculators
npm test
npm run build
npm run audit
git add -A && git commit -m "Describe change" && git push
```

Hosted platforms rebuild on push to the production branch. For config-only changes (GA4, AdSense), **you must redeploy**—values are baked in at build time.

### 11.2 IndexNow after publish

```bash
node scripts/indexnow.mjs https://www.yourdomain.com/path-you-changed/
```

### 11.3 Rollback

| Host | Rollback |
| --- | --- |
| **Cloudflare Pages** | Deployments → select previous successful deployment → **Rollback to this deployment**. |
| **Vercel** | Deployments → … on previous deployment → **Promote to Production**. |
| **Netlify** | Deploys → **Publish deploy** on an older build. |

Also revert the Git commit on `main` if the bad change is in source control.

---

## 12. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Sitemap URLs still show `yardcalc.example` | `siteUrl` not updated or old deploy | Fix `src/config/site.ts`, rebuild, redeploy. |
| `www` and apex both work without redirect | Redirect rule missing | Add Cloudflare Rule or `_redirects`; pick one canonical in `siteUrl`. |
| `/sitemap.xml` 404 | Host not using `_redirects` | Use `/sitemap-index.xml` directly in GSC, or add host redirect (Vercel has it in `vercel.json`). |
| Canonical mismatch warnings in GSC | `siteUrl` ≠ live URL | Align protocol, host, trailing slash (`trailingSlash: 'always'`). |
| `npm run audit` fails thin pages | Tool copy too short | Expand `src/data/toolBodies.ts`; rebuild. |
| `npm run proof` fails Lighthouse | Perf regression | See `docs/proof/lighthouse/summary.md`; fix CLS/JS before launch. |
| AdSense “ads.txt not found” | File commented or wrong domain | Uncomment `public/ads.txt`, correct `pub-` id, redeploy, curl live URL. |
| GA4 no data | Empty `ga4MeasurementId` or ad blocker | Set ID, redeploy, test in DebugView. |
| Playwright fails in CI proof job | Chromium install | CI runs `npx playwright install chromium --with-deps`; match locally if needed. |
| Build fails on Node 18 | Astro 5 expects Node 20+ | Set `NODE_VERSION=22` on the host. |

---

## 13. Launch checklist

Copy this list into your runbook and check off on launch day.

### Configuration & repo

- [ ] `src/config/site.ts` — `siteUrl`, `contactEmail`, brand, `contentUpdated`
- [ ] `public/robots.txt` — `Sitemap:` uses live domain
- [ ] `public/llms.txt` — URLs updated (optional)
- [ ] IndexNow key file renamed and matches `indexNowKey`
- [ ] `public/_redirects` — www/apex 301 rules enabled
- [ ] `npm test` && `npm run build` && `npm run audit` && `npm run proof` all pass

### Hosting & HTTPS

- [ ] Production deploy succeeded on chosen host (Pages / Vercel / Netlify)
- [ ] Custom domain active with valid HTTPS
- [ ] Non-canonical host redirects with 301
- [ ] `/robots.txt`, `/sitemap-index.xml`, `/ads.txt` (if ads) return 200

### SEO & discovery

- [ ] Google Search Console property verified (DNS or HTML tag)
- [ ] Sitemap submitted in GSC
- [ ] URL Inspection + Request indexing on home, hubs, top tools
- [ ] Bing Webmaster Tools configured; sitemap submitted
- [ ] Rich Results Test passed on live home, tool, guide URLs
- [ ] PageSpeed Insights checked on live home + one tool

### Quality & trust

- [ ] Mobile spot-check: 3 calculators + navigation + cookie notice
- [ ] Proof screenshots reviewed (`docs/proof/mobile/`)
- [ ] About / Contact / Privacy / Terms / Methodology live and linked in footer

### Analytics & ads (timing)

- [ ] GA4 measurement ID set (optional but recommended)
- [ ] AdSense: **only** after traffic + approval — `adsense.enabled`, `ads.txt`, CMP documented
- [ ] Weekly monitoring calendar set (GSC + GA4)

---

## 14. Quick reference

| Item | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20+ (22 in CI) |
| Canonical config | `src/config/site.ts` |
| Security / cache headers | `public/_headers` |
| Redirects | `public/_redirects` + host dashboard |
| Proof regeneration | `npm run proof` → `docs/proof/` |
| Full SEO playbook | [SEO-GUIDE.md](./SEO-GUIDE.md) |

When in doubt, rebuild locally, run `npm run proof`, and compare against the committed bundle in [`docs/proof/README.md`](./proof/README.md).

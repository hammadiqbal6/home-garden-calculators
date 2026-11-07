# Site configuration

Brand and site-identity values are driven by **environment variables** with YardTally defaults in `src/config/siteDefaults.mjs`. Changing a name or domain should only require setting variables (and a rebuild for build-time keys)—not editing page copy.

| Mechanism | When it applies | Where to set |
|-----------|-----------------|--------------|
| **Build-time `PUBLIC_*`** | Baked into Astro HTML, sitemap, OG SVGs, `site.webmanifest`, JSON-LD, `ads.txt` | Cloudflare **Workers Builds → Variables**, GitHub Actions `env`, local `.env` |
| **Worker runtime vars** | Host 301s only (`CANONICAL_ORIGIN`, `LEGACY_REDIRECT_HOSTS`) | `wrangler.jsonc` `vars` and/or Cloudflare Worker **Variables** (next deploy) |

Do **not** put `PUBLIC_*` in top-level wrangler `vars` (breaks `npx wrangler preview` and does not bake Astro HTML). See `wrangler.jsonc` comments.

---

## Build-time variables

| Variable | Default | Controls |
|----------|---------|----------|
| `PUBLIC_SITE_URL` | `https://getyardtally.com` | Canonical origin, sitemap, robots, llms, OG URLs, JSON-LD |
| `PUBLIC_SITE_NAME` | `YardTally` | Header, titles, Organization/WebSite `name`, footer |
| `PUBLIC_SITE_SHORT_NAME` | `YardTally` | `apple-mobile-web-app-title`, manifest `short_name` |
| `PUBLIC_SITE_TAGLINE` | Free home & garden material calculators | Organization / WebSite description |
| `PUBLIC_MANIFEST_DESCRIPTION` | Free home and garden material calculators | `site.webmanifest` `description` |
| `PUBLIC_CONTACT_EMAIL` | `hammadiqbal117@gmail.com` | Contact, footer, Organization email |
| `PUBLIC_COPYRIGHT_OWNER` | _(empty → site name)_ | Footer `©` owner |
| `PUBLIC_AUTHOR_NAME` | `Hammad Iqbal` | Bylines, About, Person schema |
| `PUBLIC_AUTHOR_BIO` | _(honest maintainer bio; `{name}` expands)_ | Person / About bio |
| `PUBLIC_AUTHOR_URL` | `https://github.com/hammadiqbal6` | Person `@id` |
| `PUBLIC_AUTHOR_SAME_AS` | author URL | Comma-separated Person `sameAs` |
| `PUBLIC_ORG_SAME_AS` | _(empty)_ | Comma-separated Organization `sameAs` |
| `PUBLIC_THEME_COLOR` | `#1f6b4a` | `theme-color` meta, manifest |
| `PUBLIC_BACKGROUND_COLOR` | `#f3f6f2` | Manifest `background_color` |
| `PUBLIC_LOCALE` | `en-US` | `<html lang>` |
| `PUBLIC_OG_IMAGE_PATH` | `/og-default.png` | Default `og:image` |
| `PUBLIC_OG_IMAGE_ALT` | `{name} — free home and garden…` | Default `og:image:alt` |
| `PUBLIC_SITE_URL_PAYMENT_FEES` | payment-fee-calculators…workers.dev | Sister origin |
| `PUBLIC_SITE_URL_BUSINESS_DOCS` | `https://docuklin.com` | Sister origin |
| `PUBLIC_SITE_URL_HOME_GARDEN` | `https://getyardtally.com` | This site as seen by sisters / self |
| `PUBLIC_SITE_URL_FIBER_ARTS` | fiber-arts-calculators…workers.dev | Sister origin |
| `PUBLIC_SITE_URL_PET` | pet-calculators…workers.dev | Sister origin |
| `PUBLIC_SISTER_NAME_*` | FeeCalc / Docuklin / FiberCalc / PetCalc Tools | About sibling display names |
| `PUBLIC_EMAILJS_*` | _(empty)_ | Contact form (see `docs/CONTACT-EMAILJS.md`) |
| `PUBLIC_GA4_MEASUREMENT_ID` | _(set in `.env.example`)_ | Analytics |
| `PUBLIC_GSC_VERIFICATION` | _(current GSC token)_ | Search Console meta |
| `PUBLIC_BING_SITE_VERIFICATION` | _(empty)_ | Bing meta |
| `PUBLIC_INDEXNOW_KEY` / `INDEXNOW_KEY` | _(current key)_ | IndexNow |
| `PUBLIC_ADSENSE_PUBLISHER_ID` | _(empty)_ | `ads.txt` line + ad client id |
| `PUBLIC_ADSENSE_ENABLED` | _(empty/false)_ | Ad slots stay off until `true` + real pub id |
| `PUBLIC_ADSENSE_SLOT_DISPLAY` | _(empty)_ | Numeric ad unit id for the fixed calculator display slot; empty → no fixed `<ins>` (Auto ads OK) |
| `PUBLIC_ADSENSE_SLOT_TOP` / `_MID` / `_BOTTOM` | _(empty)_ | Optional per-placement numeric overrides; each falls back to `DISPLAY` |
| `PUBLIC_DIRECTORY_BADGES` | _(unset)_ | Footer directory badges as a JSON array of `{href,img,alt,width?,height?,rel?}`. Invalid JSON → warn, render none. When unset, Fazier fallback applies |
| `PUBLIC_FAZIER_BADGE_ENABLED` | `true` (default on when unset) | Fazier footer badge **fallback** only when `PUBLIC_DIRECTORY_BADGES` is unset; set `false` to hide |

Templates: `{name}` and `{short}` in author bio / OG alt expand to the configured site / short name.

---

## Worker runtime variables

| Variable | Default | Controls |
|----------|---------|----------|
| `CANONICAL_ORIGIN` | `https://getyardtally.com` | 301 target for legacy hosts (no trailing slash) |
| `LEGACY_REDIRECT_HOSTS` | `www.getyardtally.com` | Comma-separated **exact** Host values that 301 → `CANONICAL_ORIGIN` |
| `workers_dev` / `preview_urls` | `false` / `false` (wrangler top-level) | Keep the retired `*.workers.dev` + preview URLs off on deploy |

Defaults are also in `wrangler.jsonc` `vars` (and `previews.vars`). Dashboard overrides apply on the next Worker deploy without an Astro rebuild.

---

## Rename / domain checklist

1. Set build-time `PUBLIC_SITE_URL`, `PUBLIC_SITE_NAME`, `PUBLIC_SITE_SHORT_NAME` (and any OG/manifest overrides) in Workers Builds → rebuild.
2. Set Worker `CANONICAL_ORIGIN` and update `LEGACY_REDIRECT_HOSTS` if the old host list changes → deploy Worker.
3. Point DNS / Custom Domains; verify with `curl -sI` on old and new hosts.
4. Update sister sites’ `PUBLIC_SITE_URL_HOME_GARDEN` when they rebuild.

Also see `docs/CUSTOM-DOMAIN.md`.

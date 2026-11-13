# AGENTS.md — YardTally

## 1. Project overview

- **YardTally** (`getyardtally.com`) — free home & garden material calculators (concrete, mulch, gravel, paint, seed, etc.).
- Goals: Google ranking, AI-search citations, AdSense readiness, mobile Core Web Vitals.
- **Stack:** Astro 5 static site + TypeScript; Vitest for calculator math; minimal client JS (calculator island); Cloudflare Worker serves `dist/`.
- **Deploy:** merge to `main` → Workers Builds auto-deploys the Cloudflare Worker (`npx wrangler deploy` + IndexNow). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
- Canonical origin: `PUBLIC_SITE_URL` → `siteConfig.siteUrl` only. Never hardcode the site hostname in pages/scripts.

## 2. Repo map

| Path | Role |
|---|---|
| `src/config/site.ts`, `src/config/siteDefaults.mjs` | Brand, AdSense, GA4, IndexNow, origin fallbacks |
| `src/lib/calculators/` | Pure math (imperial + metric via `units.ts`) |
| `src/data/tools.ts`, `toolBodies.ts`, `calculatorFields.ts`, `toolHowTo.ts` | Calculator registry, HTML bodies, SSR defaults, HowTo steps |
| `src/data/guides.ts`, `guideBodies.ts`, `guideFaqs.ts`, `guideHowTo.ts` | Guide registry, bodies, FAQ, HowTo |
| `src/components/Calculator.astro` | Calculator UI configs + island |
| `src/pages/calculators/[slug].astro`, `guides/[slug].astro` | Tool / guide templates + JSON-LD |
| `src/pages/llms.txt.ts`, `llms-full.txt.ts`, `.well-known/llms.txt.ts` | LLM/AI index files |
| `src/layouts/BaseLayout.astro` | Consent Mode, CMP/banner gate, shared head |
| `src/lib/gdprRegions.ts`, `htmlGeoInject.ts`, `src/worker.ts` | EEA/UK/CH geo + HTML inject |
| `public/_headers` | CSP + cache (Workers static assets) |
| `astro.config.mjs` | Sitemap `lastmod` from real `dateModified` |
| `docs/KEYWORD-MAP.md`, `SEO-GUARDRAILS.md`, `PAGE-CHECKLIST.md`, `ADSENSE.md` | SEO / AdSense ops |
| `.cursor/skills/`, `.cursor/rules/` | Agent skills and standing rules |

## 3. Commands

```bash
npm install
npm run dev          # local Astro server
npm test             # Vitest (calculator math + consent helpers)
npm run build        # static site → dist/ (also regenerates OG)
npm run audit        # SEO + AdSense + perf + pages (needs dist/)
npm run check:links  # internal links on dist/
npm run indexnow     # ping IndexNow with sitemap URLs (after deploy)
npm run proof        # full proof bundle (Lighthouse + audits)
```

- PR CI (`.github/workflows/ci.yml`): **build + unit tests** only.
- Full checks: **Actions → Full checks** or run `audit` / `proof` locally before merge.

## 4. Content rules

- **Voice:** human, contractor-practical; short sentences; no fake job-site stories or credentials.
- **Banned filler:** “in today’s world”, “delve”, “it’s important to note”, “whether you’re a beginner or a pro”, “look no further”, “unlock”, “elevate”, “comprehensive guide to”, “game-changer”, “leverage”, “robust solution”, emoji-heavy intros. See `.cursor/rules/content-quality.mdc`.
- **No invented stats.** Every number (bag yield, coverage, density, seed rate, pitch factor) needs a manufacturer TDS or extension URL.
- **Sources:** visible Sources list; guides show `Reviewed by Hammad Iqbal · Last updated {date}`; tools use `TrustBlock`.
- **Guides:** answer-first 40–60 words (sourced verdict first); question H2s from real search/PAA; worked example; FAQ 3–5; body ≥800 words in `guideBodies.ts`.
- **Tools:** answer-first 40–60 words before inputs; calculator above the fold; FAQ 3–5; SSR default results (real numbers, not em dashes) via `calculatorFields.ts`.

## 5. SEO / AEO rules

- Titles 25–65 (aim ~30–60); meta 70–160 (aim ~120–160); one H1; og/twitter match title & description.
- Answer-first on home/tools/guides; tools link ≥1 topical guide; no doorway/query-variant duplicates.
- **Schema:** BreadcrumbList; tools → WebApplication (+ FAQPage); guides → Article (+ FAQPage). **HowTo only from visible on-page steps** (`guideHowTo.ts` / `toolHowTo.ts`). No fake `aggregateRating`.
- **Sitemap `lastmod`:** from each page’s real `dateModified` in `astro.config.mjs` — **never** `Date.now()` / “now”.
- **IndexNow** after publish (`npm run indexnow` / deploy hook). Google does not use IndexNow.
- Keep `llms.txt` (Q→URL), `llms-full.txt` (figures), and `/.well-known/llms.txt` (alias) in sync when answers/figures change.
- Keyword map: `docs/KEYWORD-MAP.md`. Full checklist: `docs/PAGE-CHECKLIST.md`.

## 6. Security & consent

### CSP (`public/_headers`)
Keep the allowlist narrow; every host needs a comment + product reason.

| Hosts | Why |
|---|---|
| `googletagmanager.com`, `google-analytics.com`, `*.g.doubleclick.net`, `*.google.com` | GA4 / Google Signals |
| `*.googlesyndication.com`, `*.adtrafficquality.google`, `fundingchoicesmessages.google.com` | AdSense + Funding Choices CMP |
| `fonts.googleapis.com`, `fonts.gstatic.com` | Funding Choices UI fonts/styles |
| `static.cloudflareinsights.com`, `cloudflareinsights.com` | Cloudflare Web Analytics |

Do **not** loosen to `*` or broad CDNs. CSP changes are careful, dedicated PRs.

### Consent
- **Consent Mode v2:** default `denied` for ad/analytics storage in EEA/UK/CH until CMP updates (`BaseLayout.astro`, `gdprRegions.ts`).
- **EEA / UK / CH:** Google AdSense Privacy & messaging / Funding Choices is the **only** CMP UI; suppress the site cookie bar.
- **Elsewhere:** site Accept/Reject cookie bar only.
- Geo: Worker injects `<meta name="yt-geo-country">` from `request.cf.country`. Details: [docs/ADSENSE.md](docs/ADSENSE.md).

## 7. Adding pages

Follow the skills (file lists are authoritative):

- New calculator → [`.cursor/skills/add-a-new-calculator/SKILL.md`](.cursor/skills/add-a-new-calculator/SKILL.md)
- New guide → [`.cursor/skills/add-a-new-guide/SKILL.md`](.cursor/skills/add-a-new-guide/SKILL.md)
- Refresh a guide → [`.cursor/skills/refresh-an-existing-guide/SKILL.md`](.cursor/skills/refresh-an-existing-guide/SKILL.md)
- Pre-merge SEO/AEO → [`.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md`](.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md)
- UI/UX changes → [`.cursor/skills/ui-ux-pro-max/SKILL.md`](.cursor/skills/ui-ux-pro-max/SKILL.md)

Research first: one primary query, SERP/PAA, cannibalization check in `docs/KEYWORD-MAP.md`, then `docs/PAGE-CHECKLIST.md`.

## 8. Workflow

- **One agent / one concern / one PR.** Content ≠ CMP/consent ≠ calculator SEO ≠ docs/skills. Do not mix into open unrelated PRs.
- Branch from latest `main`: `cursor/<descriptive-name>-c2d2` (lowercase).
- Open PRs with `ManagePullRequest`; **do not merge** unless the user asks.
- Seasonality: ship evergreen DIY content **Nov–Feb** ahead of **Mar–Jun** peaks (lawn, mulch, concrete, paint).
- Before merge: run the [pre-merge SEO/AEO checklist](.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md) and `npm test && npm run build && npm run audit && npm run check:links`.
- After deploy: IndexNow; spot-check critical URLs in GSC when indexing matters.

## 9. Don'ts

- Don’t invent stats, yields, coverage rates, or first-person credentials.
- Don’t invent HowTo / FAQ schema that isn’t visible on the page.
- Don’t set sitemap `lastmod` to “now” or a fake freshness stamp.
- Don’t hardcode `getyardtally.com` (or any site host) outside `siteDefaults` / `PUBLIC_SITE_URL`.
- Don’t loosen CSP broadly or edit `public/_headers` without a named product reason.
- Don’t show the site cookie bar in EEA/UK/CH when Google’s CMP applies (or vice versa).
- Don’t put ads above the fold in a way that pushes the calculator down on mobile.
- Don’t ship doorway URL variants or near-duplicate keyword pages.
- Don’t leave copy disagreeing with Vitest math / bag yields.
- Don’t merge without green build+tests, or pile unrelated concerns into one PR.

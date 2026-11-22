# AGENTS.md — YardTally

## 1. Project overview

- **YardTally** (`getyardtally.com`) — free home & garden material calculators (concrete, mulch, gravel, paint, seed, etc.).
- Goals: Google ranking, AI-search citations, AdSense readiness, mobile Core Web Vitals.
- **Stack:** Astro 5 static site + TypeScript; Vitest for calculator math; minimal client JS (calculator island); Cloudflare Worker serves `dist/`.
- **Deploy:** merge to `main` → Workers Builds auto-deploys the Cloudflare Worker (`npx wrangler deploy` + IndexNow). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
- Canonical origin: `PUBLIC_SITE_URL` → `siteConfig.siteUrl` only. Never hardcode the site hostname in pages/scripts.

## SEO state (as of 2026-11-15)

**Living growth / SEO tracker:** always read [docs/GROWTH-STATUS.md](docs/GROWTH-STATUS.md) before planning growth, SEO, or content work (baseline metrics, done / in progress / pending, off-repo). Update that file in the **same PR** when you complete, start, or add an item.

**Mandatory docs on every change/PR:** update [README.md](README.md) and [docs/GROWTH-STATUS.md](docs/GROWTH-STATUS.md) with what was done and what remains (**Done** / **Remaining**), in the **same PR**. Do not leave status docs stale relative to the code change.

Read the snapshot below before rediscovering search setup. Do **not** rediscover or re-implement items marked Done.

### Done (verified in repo unless noted)

- **IndexNow (Bing/Yandex):** Key file `public/c2a68b8b8e7e6ba2253b408fa0fe2c4c.txt` (body = key; matches `DEFAULT_INDEXNOW_KEY` in `src/config/siteDefaults.mjs`). Ping script `scripts/indexnow.mjs` (idempotent; always exits `0`). Runs after production deploy via Workers Builds: `npx wrangler deploy && node scripts/indexnow.mjs` (also `npm run indexnow` / `deploy:indexnow`). **Do not add a second submitter.** Owner note: Bing Webmaster shows IndexNow active (~336 URLs submitted 2026-11-13, source “Self”).
- **Search consoles (owner-confirmed):** Bing Webmaster Tools verified; sitemap `https://getyardtally.com/sitemap-index.xml` submitted. Google Search Console verified (`PUBLIC_GSC_VERIFICATION` in `.env.example` / Workers Builds). GSC impressions started **2026-11-11**.
- **Sitemap / trailing slash:** Astro `trailingSlash: 'always'`; `/sitemap.xml` → `/sitemap-index.xml` **301** (`public/_redirects`, Worker). jev-seo trailing-slash **308** findings (R08/R25/R44) and “duplicate schema” counts are **known false alarms** — do not “fix” them. Real jev-seo fixes shipped in **PR #28**.
- **GSC-impression content (PR #29):** topsoil-vs-garden-soil guide; Sonotube bags-per-tube table + FAQ; mulch depth guide; roofing shingles calculator; internal links; `/embed/` meta descriptions. Embed routes are intentionally **`noindex,follow`** with canonical to the main `/calculators/<slug>/` tool (`src/pages/embed/[slug].astro`).
- **Embed widgets + trust (this PR / #30):** Calculator pages show “Embed this calculator” with a copy-to-clipboard iframe snippet. Attribution is **Powered by YardTally** with `rel="nofollow"` (`EmbedSnippet.astro` + embed page). **Keep nofollow** — Google treats keyword-rich followed widget links as link schemes. About page names the maintainer and how math works (personal-bio placeholder; no invented credentials). Structural calculators show a planning-estimate note + formula/disclaimer. Contact default: **`hello@getyardtally.com`** (`DEFAULT_CONTACT_EMAIL`); owner notes it is forwarded via Cloudflare Email Routing.
- **Also in code:** Answer-first tools/guides; TrustBlock sources; FAQ visible on tool/guide pages (FAQPage JSON-LD present — see policy below); HowTo only from `toolHowTo.ts` / `guideHowTo.ts`; `llms.txt` + `llms-full.txt` + `/.well-known/llms.txt` alias; IndexNow audited in `scripts/audit/seo.mjs`.

### Policy / don’t do

- **`llms.txt` does not help Google** — keep it for AI crawlers; do not treat it as a GSC lever.
- **Don’t rely on FAQ schema for rich results** (may still emit FAQPage when FAQ is on-page).
- **No thin programmatic variants** (city pages, one URL per bag size, doorway keyword clones).
- **No invented experts, headshots, credentials, or statistics.**
- **Branded titles ≤ 60 characters** (owner policy; CI audit still allows 25–65 — prefer ≤60 when writing titles).
- **Don’t re-ping IndexNow from a second path** or re-open “missing IndexNow” work.
- **Don’t chase jev-seo R08/R25/R44 trailing-slash 308s or duplicate-schema counts.**

### Open / off-page (not code)

- Directory submissions (Agathox, SaaSHub, others) and the existing Maker Launches listing.
- Embed outreach, Product Hunt launch, and editorial backlinks — site has essentially **no** editorial backlinks yet. Thread Reader App unrolls from `@hammadiqbal44` are minor.

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
| `docs/GROWTH-STATUS.md` | Living growth/SEO scoreboard (metrics, done, pending, off-repo) |
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

- **Human writing (required):** All new and refreshed guide/tool copy must follow [`docs/WRITING-GUIDE.md`](docs/WRITING-GUIDE.md). Voice is DIY practitioner (homeowner / landscaper), bursty sentence rhythm, contractions, no banned AI tells. **Detector target:** AI probability **&lt; 30%** on `node scripts/audit/ai-detect.mjs`; keep [`docs/ai-detect-scores.md`](docs/ai-detect-scores.md) updated when bodies change.
- **Voice:** human, contractor-practical; short sentences; no fake job-site stories or credentials.
- **Banned filler:** “in today’s world”, “delve”, “it’s important to note”, “whether you’re a beginner or a pro”, “look no further”, “unlock”, “elevate”, “comprehensive guide to”, “game-changer”, “leverage”, “robust solution”, emoji-heavy intros. See `.cursor/rules/content-quality.mdc` and `docs/WRITING-GUIDE.md`.
- **No invented stats.** Every number (bag yield, coverage, density, seed rate, pitch factor) needs a manufacturer TDS or extension URL.
- **Sources:** visible Sources list; guides show `Reviewed by Hammad Iqbal · Last updated {date}`; tools use `TrustBlock`.
- **Guides:** answer-first 40–60 words (sourced verdict first); question H2s from real search/PAA; worked example; FAQ 3–5; body ≥800 words in `guideBodies.ts`.
- **Tools:** answer-first 40–60 words before inputs; calculator above the fold; FAQ 3–5; SSR default results (real numbers, not em dashes) via `calculatorFields.ts`.

## 5. SEO / AEO / AI Overview rules

Standing rule file: [`.cursor/rules/seo.mdc`](.cursor/rules/seo.mdc). Page checklist skill: [`.cursor/skills/add-seo-page/SKILL.md`](.cursor/skills/add-seo-page/SKILL.md).

### Titles, H1, meta
- **Branded `<title>` ≤ 60 characters.** `formatPageTitle` appends ` | YardTally` (~12 chars) — keep the title **prop ≤ 48**.
- Unique title, H1, and meta per URL, aimed at real query wording (GSC / autocomplete / PAA). Meta 70–160 (aim ~120–160); og/twitter match; one H1.
- Never hard-code counts like “All 26 calculators” — use `tools.length` / `guides.length`.

### Cannibalization & merges
- Check `docs/KEYWORD-MAP.md` before any new URL. **One primary page per query cluster.**
- Prefer extending an existing tool/guide over a near-duplicate. If two URLs fight the same intent, **merge and 301** (keep `public/_redirects` and `PATH_ALIAS_REDIRECTS` in `src/lib/workerRedirect.ts` in sync).
- Example: `/guides/how-much-mulch-do-i-need/` → `/calculators/mulch-calculator/`. **Keep** `/guides/mulch-depth-guide/` as the depth page (do not merge it away).

### Internal links (required for new pages)
Every new indexable page needs inbound links from: (1) its **hub** body/prose, (2) homepage and/or index, (3) **2–3 related** siblings. Keep `relatedSlugs` / `relatedGuideSlugs` reciprocal with body anchors. Weak inbound (5–7 links) delays indexing.

### AI Overviews / AI Mode / answer engines
On calculator and guide bodies:
1. **1–2 sentence direct answer under each question H2**, then detail.
2. Plain HTML **summary tables** (sizes, bags, yards, weights) computed from formulas/sources — never copy competitors.
3. Show the **formula** and a **worked example** matching Vitest / calculator output.
4. Visible **Reviewed by** / last updated (guides byline; tools `TrustBlock`) and cite methodology or primary sources (USDA Wood Handbook, QUIKRETE/Sakrete TDS, extensions).
5. Clear link to the matching calculator so AI readers can click through.
6. Valid structured data: tools → WebApplication (+ FAQPage when FAQ visible); guides → Article (+ FAQPage); BreadcrumbList; HowTo **only** from real on-page steps. No fake `aggregateRating`.
7. Do **not** block AI crawlers in `robots.txt`. Keep `/llms.txt`, `/llms-full.txt`, `/.well-known/llms.txt` in sync when answers/figures change (`llms.txt` helps AI crawlers, not Google ranking).

### Canonicals, sitemap, embeds
- Self-canonical via `siteConfig.siteUrl`; **trailing-slash** URLs; embeds stay **`noindex,follow`** with canonical to the tool.
- Sitemap includes every tool/guide in `tools[]` / `guides[]` after build. `lastmod` from real `dateModified` — **never** `Date.now()` / “now”.

### After every deploy (mandatory)
1. **IndexNow** — `npm run indexnow` (or the Workers Builds `deploy:indexnow` hook). Script reads **all** `<loc>` URLs from `dist/` sitemaps (new pages + redirect **targets** that remain live). Do **not** change the IndexNow key or key file. Google does not use IndexNow.
2. **Google Search Console** — URL Inspection → **Request indexing** for each new or substantially changed page (and validate redirect/noindex buckets when relevant).

Agents must **not** run IndexNow or request GSC indexing unless the site was actually deployed and the owner asked. Keyword map: `docs/KEYWORD-MAP.md`. Full checklist: `docs/PAGE-CHECKLIST.md`.

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

- **SEO edit / new page checklist** → [`.cursor/skills/add-seo-page/SKILL.md`](.cursor/skills/add-seo-page/SKILL.md) (cannibalization, titles ≤60 branded, AI Overview answer-under-H2, inbound links, sitemap, IndexNow after deploy)
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
- **Growth / SEO / content:** read [docs/GROWTH-STATUS.md](docs/GROWTH-STATUS.md) first; update it in the same PR when status changes.
- **Every PR (mandatory):** update [README.md](README.md) **and** [docs/GROWTH-STATUS.md](docs/GROWTH-STATUS.md) Done/Remaining to match what this PR ships and what is still open. No exceptions for “small” fixes.
- Seasonality: ship evergreen DIY content **Nov–Feb** ahead of **Mar–Jun** peaks (lawn, mulch, concrete, paint).
- Before merge: run the [pre-merge SEO/AEO checklist](.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md) and `npm test && npm run build && npm run audit && npm run check:links`.
- **After every deploy:** run IndexNow (`npm run indexnow` / deploy hook — submits all sitemap URLs, including new pages and live redirect targets; do not change the key) **and** GSC URL Inspection → Request indexing for changed pages. Do not run IndexNow from an agent before deploy.

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
- Don’t hard-code tool/guide counts; don’t change the IndexNow key; don’t block AI crawlers in `robots.txt`.
- Don’t merge away `/guides/mulch-depth-guide/` (depth intent); quantity “how much mulch” lives on the mulch calculator after the 301 merge.

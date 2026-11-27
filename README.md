# YardTally — Home & Garden Material Calculators

Production-ready **static** website of free DIY / landscaping material calculators. Built to rank in Google, be citable by AI search, pass AdSense review, and stay fast on mobile.

**Brand:** YardTally · **Live site:** [https://getyardtally.com](https://getyardtally.com) · **Config:** [`src/config/site.ts`](src/config/site.ts)  
**Governing research:** [`docs/SEO-PLAYBOOK.md`](docs/SEO-PLAYBOOK.md) · [`docs/MARKET-RESEARCH.md`](docs/MARKET-RESEARCH.md) · [`docs/ideas/README.md`](docs/ideas/README.md)  
**Living growth tracker:** [`docs/GROWTH-STATUS.md`](docs/GROWTH-STATUS.md) (update Done/Remaining in the **same PR** as every change)

---

## Done / Remaining (summary)

Refresh this section whenever you ship a PR. Full detail + metrics: [`docs/GROWTH-STATUS.md`](docs/GROWTH-STATUS.md).

### Done (as of 2026-11-27)

- **Worker `/404/` body (this PR):** Serve the Astro 404 HTML with HTTP 404 (fetch ASSETS `/404/`, strip `Location`). Fixes empty-body 404 caused by `/404.html` → 307 under `force-trailing-slash`.
- Prior: Embed framing (#54); analytics reliability (#53); geo analytics consent (#52); SEO authority + GSC variants; durable SEO agent rules; title/H1 rewrite; mulch quantity merge; lumber weight + chart; Agathox; slab/footing upgrades; homepage grid; PAA guides; human-writing rewrite; TinyLaunch (2026-12-07).

## Embed this calculator

Live site: [https://getyardtally.com](https://getyardtally.com)

Every embeddable tool on the site has an **Embed this calculator** box. Copy the iframe + keep the credit link so the widget points back to the matching calculator:

```html
<iframe src="https://getyardtally.com/embed/concrete-calculator/" title="Concrete Calculator – YardTally" width="100%" height="640" loading="lazy" style="border:0;border-radius:8px;max-width:100%"></iframe>
<p style="font-size:12px;margin-top:8px"><a href="https://getyardtally.com/calculators/concrete-calculator/" target="_blank" rel="noopener">Calculator by YardTally</a></p>
```

Replace `concrete-calculator` with any embeddable slug (see the tool list below). The live embed UI shows the same credit.

### Remaining

- **After deploy (do not run from agents pre-deploy):** `npm run indexnow` (all sitemap URLs including new variants) **and** GSC URL Inspection → Request indexing / validate discovered-not-indexed + redirect/noindex buckets. IndexNow key unchanged.
- After deploy: confirm Agathox ownership; record listing URL in `docs/GROWTH-STATUS.md` when confirmed.
- Optional real LinkedIn/X/Product Hunt `sameAs` via env only; `PUBLIC_BING_SITE_VERIFICATION` still unset; editorial backlinks still essentially none.
- **Reddit promotion paused** (2026-11-19): build karma with link-free helpful comments before posting again.
- AdSense still in “Getting ready”; more directory submissions / embed outreach.
- Further impression-adjacent variants (e.g. stair **stringer**) still in `docs/ideas/README.md` — do not split lumber-weight or CMU URLs.
- Re-score bodies with `npm run audit:ai-detect` when copy changes; keep [`docs/ai-detect-scores.md`](docs/ai-detect-scores.md) in sync (not part of CI).

---

## Goals

- Ship working calculators (US imperial + metric) with **correct, unit-tested formulas**
- Pair every tool with original, cited explanatory content (AdSense-safe depth)
- Perfect technical SEO (canonicals, sitemap, robots, JSON-LD, CWV budgets)
- Stay agent-friendly: `AGENTS.md`, Cursor skills/rules/agents, runnable auditors, CI

---

## Live tool list

| Tool | Path | Primary keyword |
|---|---|---|
| Concrete calculator | [`/calculators/concrete-calculator/`](src/pages/calculators/[slug].astro) | concrete calculator |
| Concrete footings | `/calculators/concrete-footing-calculator/` | concrete footing calculator |
| Concrete slab cost | `/calculators/concrete-slab-cost-calculator/` | concrete slab cost calculator |
| Post holes concrete | `/calculators/concrete-calculator-post-holes/` | concrete calculator for post holes |
| Sonotube / columns | `/calculators/sonotube-concrete-calculator/` | sonotube concrete calculator |
| Mulch | `/calculators/mulch-calculator/` | mulch calculator |
| Tree ring mulch | `/calculators/mulch-calculator-tree-rings/` | mulch calculator for tree rings |
| Gravel | `/calculators/gravel-calculator/` | gravel calculator |
| French drain gravel | `/calculators/french-drain-gravel-calculator/` | french drain gravel calculator |
| Topsoil | `/calculators/topsoil-calculator/` | topsoil calculator |
| Sand | `/calculators/sand-calculator/` | sand calculator |
| Pavers | `/calculators/paver-calculator/` | paver calculator |
| Fence materials | `/calculators/fence-calculator/` | fence calculator |
| Deck materials | `/calculators/deck-material-calculator/` | deck material calculator |
| Deck footings | `/calculators/deck-footing-calculator/` | deck footing calculator |
| Roof pitch | `/calculators/roof-pitch-calculator/` | roof pitch calculator |
| Roofing shingles / squares | `/calculators/roofing-shingles-calculator/` | roofing calculator |
| Paint | `/calculators/paint-calculator/` | paint calculator |
| Retaining wall blocks | `/calculators/retaining-wall-calculator/` | retaining wall calculator |
| Grass seed | `/calculators/grass-seed-calculator/` | grass seed calculator |
| Fertilizer | `/calculators/fertilizer-calculator/` | fertilizer calculator |
| Raised bed soil | `/calculators/raised-bed-soil-calculator/` | raised bed soil calculator |
| Asphalt | `/calculators/asphalt-calculator/` | asphalt calculator |
| Brick / CMU | `/calculators/brick-calculator/` | brick calculator |
| Lumber / board feet | `/calculators/lumber-calculator/` | lumber calculator |
| Rebar | `/calculators/rebar-calculator/` | rebar calculator |

**Hubs:** `/hubs/concrete/` · `/hubs/landscape/` · `/hubs/outdoor-structures/` · `/hubs/lawn/`  
**Guides:** `/guides/` (concrete bags, fence posts, mulch depth, driveway gravel, roof pitch, paint, fertilizer, …)  
**Full keyword map:** [`docs/KEYWORD-MAP.md`](docs/KEYWORD-MAP.md)  
**Ideas backlog (23 niches + add-ons):** [`docs/ideas/README.md`](docs/ideas/README.md)

---

## Tech stack

- [Astro 5](https://astro.build/) static output + TypeScript
- Vitest for calculator math
- `@astrojs/sitemap` for XML sitemap index
- Minimal client JS (calculator island only)
- Deployable to Cloudflare Pages (primary), Vercel, or Netlify

### Architecture

```mermaid
flowchart TB
  subgraph source [Source]
    Config[src/config/site.ts]
    Data[src/data/tools.ts + guides.ts]
    Math[src/lib/calculators/*]
    UI[Calculator.astro island]
    Pages[src/pages/**]
  end
  subgraph build [Build]
    AstroBuild[astro build]
    Dist[dist/ static HTML/CSS/JS]
  end
  subgraph quality [Quality gates]
    Vitest[npm test]
    Audits[npm run audit]
    LHCI[lighthouserc / LHCI]
    Links[npm run check:links]
  end
  Config --> Pages
  Data --> Pages
  Math --> UI
  UI --> Pages
  Pages --> AstroBuild --> Dist
  Math --> Vitest
  Dist --> Audits
  Dist --> LHCI
  Dist --> Links
```

---

## Folder structure

```
├── AGENTS.md                 # Agent/human contributor guide
├── README.md
├── astro.config.mjs
├── lighthouserc.cjs
├── package.json
├── vercel.json
├── .cursor/
│   ├── agents/               # Subagent role definitions
│   ├── rules/                # SEO, content, perf, a11y rules
│   └── skills/               # Step-by-step skills
├── .github/workflows/ci.yml
├── docs/
│   ├── ADSENSE.md
│   ├── DEPLOYMENT.md
│   ├── KEYWORD-MAP.md
│   ├── MARKET-RESEARCH.md
│   ├── SEO-GUIDE.md
│   ├── SEO-PLAYBOOK.md
│   └── ideas/                # Compiled ideas research index
├── public/                   # robots.txt, ads.txt, _headers, llms.txt, icons
├── scripts/
│   ├── audit/                # seo, adsense, perf auditors
│   ├── check-links.mjs
│   └── indexnow.mjs
├── src/
│   ├── components/
│   ├── config/site.ts        # ONLY place for brand/domain/IDs
│   ├── data/
│   ├── layouts/
│   ├── lib/calculators/
│   ├── pages/
│   └── styles/global.css
└── tests/
```

---

## Prerequisites

- Node.js **20+** (22 recommended)
- npm 9+

---

## Local setup

```bash
git clone <repo-url>
cd home-garden-calculators
npm install
npm run dev
```

Open the printed localhost URL. Edit `src/config/site.ts` before any public launch.

**Deploy to production:** step-by-step domain, Cloudflare Pages / Vercel / Netlify, Search Console, AdSense, and launch checklist — **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)**.

---

## Scripts / commands

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm test` | Vitest calculator unit tests |
| `npm run test:watch` | Vitest watch mode |
| `npm run check:links` | Broken internal link check on `dist/` |
| `npm run audit:seo` | SEO auditor (titles, H1, canonical, JSON-LD, orphans…) |
| `npm run audit:indexing` | Sitemap self-canonical / noindex / redirect-alias audit |
| `npm run audit:adsense` | AdSense readiness auditor |
| `npm run audit:perf` | First-party JS gzip budget (≤50KB/page) |
| `npm run audit` | Run all auditors |
| `npm run lighthouse` | Lighthouse CI mobile budgets (`lighthouserc.cjs`) |
| `npm run proof` | Regenerate committed proof under `docs/proof/` (Lighthouse, audits, screenshots) |
| `npm run indexnow` | After deploy: ping IndexNow with **all** URLs from `dist/` sitemaps (new pages + live redirect targets). Do not change the key. Google does not use IndexNow — also Request indexing in GSC for changed URLs. |
| `npm run deploy:indexnow` | `wrangler deploy` then IndexNow ping |

---

## Configuration

All owner-specific values live in **`src/config/site.ts`** (no scattered hardcoded brand/domain).

| Key | Purpose | Before launch |
|---|---|---|
| `name` | Brand display name | Set final brand |
| `tagline` | Short description | Optional tweak |
| `siteUrl` | From `PUBLIC_SITE_URL` (fallback: getyardtally.com) | Set in Workers Builds |
| `contactEmail` | From `PUBLIC_CONTACT_EMAIL` (fallback: `hello@getyardtally.com`) | Optional override |
| `contentUpdated` | Default lastmod / stamps | Keep ISO date current |
| `author.*` | E-E-A-T byline | Replace placeholder bio |
| `sameAs` | Organization `sameAs` profile URLs | Add when available |
| `analytics.ga4MeasurementId` | GA4 `G-…` | Optional until analytics |
| `analytics.searchConsoleVerification` | GSC HTML tag content | Optional (DNS preferred) |
| `adsense.publisherId` | `ca-pub-…` | After approval |
| `adsense.enabled` | Master ads switch | `false` until approved |
| `adsense.autoAds` | Google Auto ads | Documented; default off |
| `indexNowKey` | IndexNow key + `public/<key>.txt` | Set; file body must match key |
| `locale` | `lang` attribute | Keep `en-US` unless expanding |
| `defaultOgImage` | OG image path in `/public` | Replace creative optional |

Also update after domain purchase:

- `public/robots.txt` → `Sitemap:` line  
- `public/llms.txt` URLs  
- `public/_redirects` host redirects  
- `public/ads.txt` when AdSense is live  

**Env vars:** none required at runtime (static site). Hosts may set `NODE_VERSION=20` for builds (see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)).

**Directory badges:** set build-time `PUBLIC_DIRECTORY_BADGES` to a JSON array of `{href,img,alt,width?,height?,rel?}` (width/height default `182`/`43`; `rel` only when you need it). Invalid JSON logs a warning and renders no badges. When unset, the Fazier badge still appears unless `PUBLIC_FAZIER_BADGE_ENABLED=false`. Full list: [`.env.example`](.env.example) · [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md).

---

## Adding a tool or article

Follow **[`AGENTS.md`](AGENTS.md)** and:

- `.cursor/skills/add-new-tool/SKILL.md`
- `.cursor/skills/write-seo-article/SKILL.md`

Math belongs in `src/lib/calculators/` with tests; page SEO/content in `src/data/tools.ts` / `guides.ts`; keyword row in `docs/KEYWORD-MAP.md`.

---

## Testing

```bash
npm test                 # formula correctness
npm run build
npm run check:links
npm run audit            # SEO + AdSense + perf budgets
```

---

## Proof

Committed, tool-generated evidence (scores are **not** hand-edited): **[`docs/proof/README.md`](docs/proof/README.md)**.

```bash
npm run build && npm run proof
```

Includes Lighthouse HTML/JSON, structured-data samples, audit logs, bundle-size table, mobile screenshots (360px & 768px), and AdSense readiness checklist. Regenerate locally with `npm run proof`, or via **Actions → Full checks** (uploads `docs/proof/` as an artifact).

---

## Audits & CI

- Auditors: `scripts/audit/*.mjs` wired via `npm run audit`
- Lighthouse CI config: `lighthouserc.cjs` (mobile, Performance/A11y/BP/SEO ≥ 0.95, CLS ≤ 0.05)
- PR / `main` CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)): **build + unit tests** only (job `build-test-audit`). Uses npm cache, Astro/Vite cache, parallel build+test, concurrency cancel-in-progress, and docs/skills-only path skip (job still succeeds so required checks are not blocked).
- Full suite ([`.github/workflows/full-checks.yml`](.github/workflows/full-checks.yml), manual): links, `npm run audit`, Lighthouse, and proof (Playwright Chromium cached).

---

## Performance budgets

| Metric | Budget |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 |
| LCP | < 2.5s (aim < 2.0s) |
| CLS | < 0.05 |
| TBT | < 150ms (warn) |
| First-party JS / page (gzip) | ≤ 50 KB |

System fonts, reserved ad slots, hashed assets, `_headers` long-cache for `/assets/*`.

---

## SEO & AI-search approach (summary)

- One intent per URL ([`docs/KEYWORD-MAP.md`](docs/KEYWORD-MAP.md))
- Tool above the fold → answer-first paragraph → formula/examples/FAQ/sources
- Hub clusters + breadcrumbs + related modules (≤3 clicks)
- JSON-LD: WebSite, Organization, BreadcrumbList, WebApplication, Article
- `robots.txt` allows search + AI-search crawlers; training bots allowed with documented choice
- Optional `llms.txt` (Google ignores it)
- Full playbook: [`docs/SEO-PLAYBOOK.md`](docs/SEO-PLAYBOOK.md)

---

## AdSense setup (summary)

1. Ship 20–30 quality pages + some traffic  
2. Set `PUBLIC_ADSENSE_PUBLISHER_ID` + `PUBLIC_ADSENSE_ENABLED=true`  
3. Set `PUBLIC_ADSENSE_SLOT_DISPLAY` to a numeric ad unit id for the fixed calculator slot (leave empty to rely on Auto ads only)  
4. Install certified CMP before personalized ads in EEA/UK/CH  

Details: [`docs/ADSENSE.md`](docs/ADSENSE.md) · env reference: [`.env.example`](.env.example)

---

## Deployment quick start

```bash
npm run build   # output: dist/
```

Primary: **Cloudflare Pages** (build `npm run build`, output `dist`).  
Also: Vercel / Netlify. Custom domain, HTTPS, www redirects: **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)**.

---

## Post-launch SEO steps

See **[`docs/SEO-GUIDE.md`](docs/SEO-GUIDE.md)**:

1. Google Search Console domain property + DNS verification  
2. Submit `sitemap-index.xml`  
3. URL Inspection / request indexing for home, hubs, top tools  
4. Bing Webmaster import + IndexNow key  
5. GA4 measurement ID in config  
6. 90-day content/link plan  

---

## Docs index

| Doc | Description |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Architecture, add-tool steps, quality bar, subagent roles |
| [`docs/SEO-PLAYBOOK.md`](docs/SEO-PLAYBOOK.md) | Governing SEO/GEO playbook |
| [`docs/MARKET-RESEARCH.md`](docs/MARKET-RESEARCH.md) | Market research report |
| [`docs/ideas/README.md`](docs/ideas/README.md) | All 23 ideas + add-on backlog index |
| [`docs/ideas/ideas.csv`](docs/ideas/ideas.csv) | Ranked ideas spreadsheet |
| [`docs/ideas/MORE-IDEAS.md`](docs/ideas/MORE-IDEAS.md) | Round-2 ideas #12–23 |
| [`docs/KEYWORD-MAP.md`](docs/KEYWORD-MAP.md) | Primary keyword per URL |
| [`docs/SEO-GUIDE.md`](docs/SEO-GUIDE.md) | Launch checklist & 90-day plan |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Cloudflare/Vercel/Netlify |
| [`docs/ADSENSE.md`](docs/ADSENSE.md) | AdSense enablement |
| [`.cursor/skills/*/SKILL.md`](.cursor/skills/) | Agent skills (add-tool, audits, etc.) |
| [`.cursor/agents/*.md`](.cursor/agents/) | seo-auditor, content-writer, adsense-reviewer, performance-auditor, link-builder-researcher |
| [`.cursor/rules/*.mdc`](.cursor/rules/) | SEO, content, performance, accessibility rules |

---

## AI agents / skills / auditors overview

- **Skills** — actionable workflows under `.cursor/skills/` (add-new-tool, write-seo-article, keyword-research, seo-audit, ai-seo-geo-audit, adsense-readiness-audit, performance-cwv-audit, content-refresh, internal-linking, structured-data).
- **Rules** — always-on guidance for matching globs (SEO pages, content quality, perf budget, a11y).
- **Subagents** — role prompts in `.cursor/agents/` (mirrored in `AGENTS.md`).
- **Runnable auditors** — `npm run audit` over `dist/` so CI fails on regressions.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `dist/` missing for audits | Run `npm run build` first |
| Sitemap host wrong | Set `siteUrl` in `src/config/site.ts` and rebuild |
| Ads not showing | `adsense.enabled` must be true **and** real `ca-pub-` id (no `XXXX`) |
| LHCI Chrome missing locally | Install Chrome or rely on CI; `continue-on-error` until Chrome present |
| IndexNow 403/422 | Ensure `public/<key>.txt` is live and matches the key in the POST body |
| Orphan page in SEO audit | Add nav/hub/related links to the URL |
| Engine warning Node < 22.22 | Repo pinned to Astro 5 for Node 20+/22.14 compatibility |

---

## Roadmap

From [`docs/ideas/README.md`](docs/ideas/README.md) add-on backlog and [`docs/SEO-GUIDE.md`](docs/SEO-GUIDE.md) calendar:

1. Stair stringer, sod, pool volume/salt, grout, insulation, metal roof, firewood, propane  
2. Next 20 supporting articles (slab thickness, driveway gravel depth, joist spacing, …)  
3. Embed distribution + resource-page outreach  
4. AdSense application after traffic + page-count threshold  

Other niches (#2 marketplace fees, #3 pets, …) are **separate sites**, not bolted onto this hub.

---

## License

Copyright © YardTally contributors. Source is provided for operating this calculator property.  
Calculator outputs are **estimates only**—verify with manufacturers, suppliers, and local building codes.  
Replace this section with your preferred license (e.g. MIT) before public open-source release if desired.

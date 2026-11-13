---
name: add-a-new-calculator
description: Add a YardTally calculator end-to-end (math, tests, UI, SSR defaults, SEO, HowTo, sitemap, llms).
---

# Add a new calculator

## When to use
New material estimator with unique “do” intent. Check `docs/ideas/README.md` backlog and `docs/KEYWORD-MAP.md` first — no keyword cannibalization.

## Files to touch

| File | What |
|---|---|
| `src/lib/calculators/<name>.ts` | Pure math (imperial + metric via `src/lib/units.ts`) |
| `src/lib/calculators/index.ts` | Re-export |
| `tests/calculators.test.ts` (or colocated `*.test.ts`) | Hand-checked expected values; cite TDS yields in comments |
| `src/components/Calculator.astro` | `configs` map entry + `calculatorId` |
| `src/data/calculatorFields.ts` | SSR field defaults **and** `defaultResultRows` (real numbers, never `—`) |
| `src/data/tools.ts` | Full `ToolDefinition` (keywords, title 25–65, meta 70–160, answerFirst 40–60, FAQ 3–5, sources, related links, `datePublished` / `dateModified`) |
| `src/data/toolBodies.ts` | sectionsHtml (~600–1200 words): formula, worked example, mistakes, shopping checklist |
| `src/data/toolHowTo.ts` | HowTo steps matching visible method steps (create file from `guideHowTo.ts` pattern if absent) |
| `src/pages/calculators/[slug].astro` | Dynamic from `tools[]`; wire `toolHowTo` + `howToJsonLd` like guides do |
| `docs/KEYWORD-MAP.md` | Primary + secondaries |
| Related guides / hub | ≥1 topical guide link; hub category in `categories` |
| `src/pages/llms.txt.ts` / `llms-full.txt.ts` | List picks up tools from `tools[]`; add Q→URL / figures if needed |
| `public/og/calculator-<slug>.*` | OG image for the new slug |

Optional: `embeddable: true` → `/embed/<slug>/`.

## Schema (already mostly automatic)
- `toolPageGraph` → WebApplication + WebPage + FAQPage (`src/lib/schema.ts`)
- BreadcrumbList in `[slug].astro`
- HowTo via `howToJsonLd` **only** when steps exist on-page (`toolHowTo.ts`)

## Content / SEO checklist
- Title/H1 match GSC/query wording (e.g. “per 1,000 sq ft”, “square feet”, “concrete tube”).
- Answer-first before inputs; calculator above the fold; ads never push it away on mobile.
- Every yield/rate sourced; Sources via `TrustBlock`.
- Bump `dateModified` on the tool (feeds sitemap lastmod) — not `Date.now()`.

## Ship
```bash
npm test && npm run build && npm run audit && npm run check:links
```
After deploy: IndexNow. Skill alias: `.cursor/skills/add-new-tool/SKILL.md`.

---
name: add-new-tool
description: Add a new YardTally calculator page end-to-end (math, tests, UI, SEO content, keyword map, audits).
---

# Add a new tool

Canonical steps (file list, SSR defaults, HowTo, llms, ship commands): **`.cursor/skills/add-a-new-calculator/SKILL.md`**.

Quick reminders:
1. Unique primary keyword in `docs/KEYWORD-MAP.md`.
2. Math in `src/lib/calculators/` + Vitest + `Calculator.astro` config.
3. SSR defaults in `src/data/calculatorFields.ts` (real result numbers).
4. Register in `src/data/tools.ts` + `toolBodies.ts` + `toolHowTo.ts`.
5. `npm test && npm run build && npm run audit && npm run check:links`.

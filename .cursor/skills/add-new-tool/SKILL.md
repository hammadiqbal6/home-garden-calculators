---
name: add-new-tool
description: Add a new YardCalc calculator page end-to-end (math, tests, UI, SEO content, keyword map, audits).
---

# Add a new tool

## When to use
User asks for a new calculator, backlog add-on (stair stringer, sod, pool volume, etc.), or long-tail landing page with unique value.

## Steps
1. Confirm unique primary keyword in `docs/KEYWORD-MAP.md` — no cannibalization.
2. Prefer add-ons from `docs/ideas/README.md` before inventing new niches.
3. Implement pure math in `src/lib/calculators/` + export in `index.ts`.
4. Add Vitest coverage with hand-checked expected values (cite manufacturer/extension numbers in comments when relevant).
5. Register UI config in `src/components/Calculator.astro` under a new `calculatorId`.
6. Add full `ToolDefinition` in `src/data/tools.ts` (title, meta, answerFirst 40–60 words, sectionsHtml, FAQ, sources, related links, dates).
7. Update `docs/KEYWORD-MAP.md` and hub category.
8. If embeddable, set `embeddable: true`.
9. Run `npm test && npm run build && npm run audit && npm run check:links`.

## Done when
Tool works US+metric, content ≥~600 words unique value, audits green, keyword map updated.

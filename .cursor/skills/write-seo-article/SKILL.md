---
name: write-seo-article
description: Write or expand a YardTally guide/article with answer-first SEO, citations, and internal links to calculators.
---

# Write SEO article

Canonical guide workflow: **`.cursor/skills/add-a-new-guide/SKILL.md`**.  
Refreshing existing copy: **`.cursor/skills/refresh-an-existing-guide/SKILL.md`**.

Quick reminders:
1. One primary keyword; register in `docs/KEYWORD-MAP.md`.
2. `guides.ts` + `guideBodies.ts` + `guideFaqs.ts` (+ `guideHowTo.ts` only for visible steps).
3. No invented stats; Sources + Reviewed-by byline.
4. Reciprocal links on ≥2 tools; update `llms.txt` / `llms-full.txt` when Q→URL or figures change.
5. `npm test && npm run build && npm run audit && npm run check:links`.

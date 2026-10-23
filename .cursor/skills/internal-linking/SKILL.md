---
name: internal-linking
description: Maintain YardCalc hub → tool → guide clusters, related blocks, and orphan-free navigation.
---

# Internal linking

## Rules
- Every tool links to its hub, ≥2 related tools, and ≥1 **topical** guide (“Learn more” near the calculator).
- Every guide links to ≥2 topic-matched tools and ≥1 related guide—**never** a fixed concrete/gravel/mulch list on every guide.
- Hub pages list all tools in the category and related guides (via `relatedToolSlugs` overlap).
- Lawn cluster: grass-seed ↔ fertilizer ↔ topsoil ↔ raised-bed ↔ `/hubs/lawn/` + lawn guides.
- Bidirectional: roof-pitch ↔ roofing-shingles; paver ↔ sand ↔ gravel.
- Breadcrumbs on all subpages.
- Reach any URL in ≤3 clicks from home.
- Use descriptive anchors (“post hole concrete calculator”) not “click here”.
- New guides must appear in sitemap, `/guides/`, hubs, and `llms.txt`.

## Verify
`npm run audit:seo` (orphans, tool→guide, sitemap coverage) + `npm run check:links`.

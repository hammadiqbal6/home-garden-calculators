---
name: internal-linking
description: Maintain YardCalc hub → tool → guide clusters, related blocks, and orphan-free navigation.
---

# Internal linking

## Rules
- Every tool links to its hub, ≥2 related tools, ≥1 guide when relevant.
- Every guide links to ≥2 tools.
- Hub pages list all tools in the category.
- Breadcrumbs on all subpages.
- Reach any URL in ≤3 clicks from home.
- Use descriptive anchors (“post hole concrete calculator”) not “click here”.

## Verify
`npm run audit:seo` (orphan detection) + manual nav check.

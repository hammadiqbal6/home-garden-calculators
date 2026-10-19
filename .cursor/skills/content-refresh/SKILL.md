---
name: content-refresh
description: Refresh YardCalc dates, bag yields, densities, and citations when manufacturer or extension data changes.
---

# Content refresh

1. Update `siteConfig.contentUpdated` when doing a site-wide refresh.
2. Bump `dateModified` on touched tools/guides in data files.
3. Re-verify bag yields / coverage against manufacturer pages; update tables + tests together.
4. Refresh source links; remove dead citations.
5. Ping IndexNow after deploy (`npm run indexnow` or `deploy:indexnow` — submits sitemap URLs).
6. Note changes in PR (what rate/yield changed + source).

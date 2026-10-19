---
name: performance-cwv-audit
description: Enforce YardCalc performance budgets (JS weight, Lighthouse CI, CLS-safe ads, mobile LCP).
---

# Performance / CWV audit

## Targets
- Lighthouse mobile Performance ≥ 95 (aim 100)
- LCP < 2.0s, CLS < 0.05, TBT < 150ms
- Initial JS per page ≤ 50 KB gzipped

## Steps
1. `npm run build && npm run audit:perf`
2. `npm run lighthouse` (needs Chrome)
3. Fix: reduce client JS, keep system fonts, reserve ad slots, avoid layout shift, lazy non-critical assets.
4. Retest homepage, one hub, ≥3 tools.

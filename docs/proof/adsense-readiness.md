# AdSense readiness proof

Generated: 2026-10-27T11:54:20Z (UTC)

Evidence collected from `dist/` after `npm run build`. Re-run `npm run proof` to refresh.

## Checklist

| Item | Status | Evidence |
| --- | --- | --- |
| About page | PASS | `/about/` built |
| Contact page | PASS | `/contact/` built |
| Privacy (AdSense + cookies) | PASS | Cookies, Google advertising, opt-out / aboutads.info, CMP note in `/privacy/` |
| Terms | PASS | `/terms/` |
| Methodology / Authors | FAIL | Trust pages present |
| ads.txt | PASS | `# ads.txt template for Google AdSense
# Replace PUBLISHER_ID with your numeric p…` |
| Reserved ad slots (CSS) | PASS | `global.css` / built CSS |
| Cookie notice UI | PASS | `BaseLayout.astro` cookie banner + localStorage |
| Certified CMP (EEA/UK/CH) | DOCUMENTED | Not integrated pre-launch; required before personalized ads — `docs/ADSENSE.md` |
| No thin tool pages (<500 words) | PASS | 0 thin page(s) |
| AdSense script gated | PASS | Loads only when `adsense.enabled` + real `ca-pub-` in `site.ts` |

## Tool word counts (minimum sample)

| URL | Words |
| --- | --- |
| /calculators/sand-calculator/ | 715 |
| /calculators/roofing-shingles-calculator/ | 735 |
| /calculators/retaining-wall-calculator/ | 751 |
| /calculators/paver-calculator/ | 754 |
| /calculators/grass-seed-calculator/ | 760 |
| /calculators/topsoil-calculator/ | 773 |
| … | (18 tools total) |

## Operator notes

- Apply to AdSense only after real domain, indexing, and traffic.
- Install a Google-certified CMP before serving personalized ads in EEA/UK/CH.
- Full policy copy: [`docs/ADSENSE.md`](../ADSENSE.md).

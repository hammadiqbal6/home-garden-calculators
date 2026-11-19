# AI detector scores (YardTally bodies)

**Last run:** 2026-11-19
**Models:** `Hello-SimpleAI/chatgpt-detector-roberta`, `openai-community/roberta-base-openai-detector`
**Target:** AI probability &lt; 30% (gate uses the **higher** AI % across models)

Local Hugging Face sequence classifiers on stripped HTML from `src/data/guideBodies.ts` and `src/data/toolBodies.ts`. Each model averages overlapping 512-token chunks. The gate column uses the **maximum** AI % across models. Commercial detectors (GPTZero, etc.) may differ.

| Type | Slug | AI % (max) | Hello-SimpleAI | OpenAI-detector | Pass (&lt;30%) |
|---|---|---:|---:|---:|:---:|
| guide | `how-much-concrete-for-fence-posts` | 0.1 | 0.1 | 0.0 | yes |
| guide | `mulch-depth-guide` | 0.1 | 0.1 | 0.1 | yes |
| guide | `how-many-bags-of-concrete` | 0.2 | 0.0 | 0.2 | yes |
| guide | `concrete-for-10x10-slab` | 0.1 | 0.0 | 0.1 | yes |
| guide | `mulch-for-common-garden-beds` | 0.8 | 0.1 | 0.8 | yes |
| guide | `gravel-types-for-driveways` | 0.0 | 0.0 | 0.0 | yes |
| guide | `how-to-measure-roof-pitch` | 0.0 | 0.0 | 0.0 | yes |
| guide | `grass-seed-per-sq-ft` | 0.0 | 0.0 | 0.0 | yes |
| guide | `fertilizer-nitrogen-per-1000-sq-ft` | 2.4 | 0.0 | 2.4 | yes |
| guide | `raised-bed-soil-mix-4x8` | 0.3 | 0.0 | 0.3 | yes |
| guide | `how-much-paint-for-a-room` | 0.4 | 0.0 | 0.4 | yes |
| guide | `paver-base-gravel-and-sand-depth` | 0.0 | 0.0 | 0.0 | yes |
| guide | `deck-material-list-12x16` | 0.0 | 0.0 | 0.0 | yes |
| guide | `deck-material-list-16x24` | 0.0 | 0.0 | 0.0 | yes |
| guide | `retaining-wall-blocks-and-base` | 0.0 | 0.0 | 0.0 | yes |
| guide | `topsoil-vs-garden-soil` | 0.0 | 0.0 | 0.0 | yes |
| guide | `how-much-concrete-in-a-sonotube` | 0.1 | 0.0 | 0.1 | yes |
| guide | `how-to-estimate-roofing-shingles` | 0.0 | 0.0 | 0.0 | yes |
| tool | `concrete-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `concrete-calculator-post-holes` | 0.0 | 0.0 | 0.0 | yes |
| tool | `sonotube-concrete-calculator` | 0.2 | 0.0 | 0.2 | yes |
| tool | `mulch-calculator` | 0.1 | 0.0 | 0.1 | yes |
| tool | `mulch-calculator-tree-rings` | 0.1 | 0.0 | 0.1 | yes |
| tool | `gravel-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `topsoil-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `sand-calculator` | 0.1 | 0.0 | 0.1 | yes |
| tool | `paver-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `fence-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `deck-material-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `roof-pitch-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `roofing-shingles-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `paint-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `retaining-wall-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `grass-seed-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `fertilizer-calculator` | 4.2 | 0.0 | 4.2 | yes |
| tool | `raised-bed-soil-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `asphalt-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `brick-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `lumber-calculator` | 0.0 | 0.0 | 0.0 | yes |
| tool | `rebar-calculator` | 0.1 | 0.0 | 0.1 | yes |

**Summary:** 40 bodies scored · 40 pass · 0 fail

## How to re-run

```bash
python3 scripts/audit/ai-detect.py
# or
node scripts/audit/ai-detect.mjs
```

Not part of CI (model download + CPU inference). See [`docs/WRITING-GUIDE.md`](WRITING-GUIDE.md).

**Post-score edit (same PR):** Expanded `how-many-bags-of-concrete` and `concrete-for-10x10-slab` slightly to clear the ≥800-word guide floor. Re-run `npm run audit:ai-detect` after merge if commercial detectors are also used.

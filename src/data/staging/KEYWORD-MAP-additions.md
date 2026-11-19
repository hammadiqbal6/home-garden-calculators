# Keyword map additions (staging — 2026-11-19)

Paste into [`docs/KEYWORD-MAP.md`](../../../docs/KEYWORD-MAP.md) when these calculators leave staging and ship live. One primary intent per URL.

## New table rows

| URL | Primary keyword | Secondary / long-tail cluster |
|---|---|---|
| `/calculators/footing-calculator/` | footing calculator | concrete footing calculator, strip footing calculator, pad footing calculator, how much concrete for a footing, continuous footing concrete |
| `/calculators/deck-footing-calculator/` | deck footing calculator | deck pier calculator, how many deck footings, deck post footing concrete, sonotube deck footing, deck footing spacing concrete |
| `/calculators/concrete-slab-cost-calculator/` | concrete slab cost calculator | concrete cost calculator, how much does a concrete slab cost, ready mix vs bagged concrete cost, concrete slab price estimator, cost of concrete for a patio |
| `/calculators/french-drain-gravel-calculator/` | french drain gravel calculator | how much gravel for a french drain, french drain rock calculator, drain tile gravel yards, perforated pipe gravel estimate, french drain trench gravel |

## Cannibalization notes

| New URL | Risk vs existing | Rule |
|---|---|---|
| `/calculators/footing-calculator/` | Main [`/calculators/concrete-calculator/`](../../../docs/KEYWORD-MAP.md) already mentions footings in body/hub copy and owns **slab / general concrete volume** (`concrete calculator`). | Keep footing as **long-tail strip/pad intent**. Title/meta target “footing calculator,” not “concrete calculator.” Link out to the main slab tool for patios/steps; do not duplicate “how many bags of concrete” as primary. |
| `/calculators/deck-footing-calculator/` | [`/calculators/sonotube-concrete-calculator/`](../../../docs/KEYWORD-MAP.md) owns tube volume when count is known; [`/calculators/deck-material-calculator/`](../../../docs/KEYWORD-MAP.md) owns boards/joists. | Deck footing owns **pier count from spacing + tube concrete**. Sonotube stays the general tube/bags tool. Deck material stays lumber-only. Cross-link all three. |
| `/calculators/concrete-slab-cost-calculator/` | Main concrete calculator owns volume/bags; cost queries currently have no dedicated URL. | **Slab-cost owns cost intent** (user-entered prices, bags vs ready-mix). Do not put regional price tables on the volume tool. Do not invent city prices. Volume page keeps “concrete calculator”; this page keeps “concrete slab cost calculator.” |
| `/calculators/french-drain-gravel-calculator/` | [`/calculators/gravel-calculator/`](../../../docs/KEYWORD-MAP.md) owns solid rectangle gravel (drives/paths/bases) under the **landscape** hub. | French drain stays under **landscape**, primary “french drain gravel calculator.” Geometry is trench − pipe. Do not retarget the gravel tool’s primary keyword; link between them for density (~2,700 lb/yd³ mid estimate). |

## Related live guides (internal links)

| Staging tool | Related guide slugs (already in repo) |
|---|---|
| footing-calculator | `how-many-bags-of-concrete`, `concrete-for-10x10-slab`, `how-much-concrete-in-a-sonotube` |
| deck-footing-calculator | `how-much-concrete-in-a-sonotube`, `deck-material-list-12x16`, `deck-material-list-16x24`, `how-many-bags-of-concrete` |
| concrete-slab-cost-calculator | `concrete-for-10x10-slab`, `how-many-bags-of-concrete` |
| french-drain-gravel-calculator | `gravel-types-for-driveways`, `paver-base-gravel-and-sand-depth` |

## Hub placement when shipping

| Slug | Category / hub |
|---|---|
| `footing-calculator` | concrete |
| `deck-footing-calculator` | concrete (link outdoor/deck tools) |
| `concrete-slab-cost-calculator` | concrete |
| `french-drain-gravel-calculator` | landscape |

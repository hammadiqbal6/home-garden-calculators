# Staging: Shared bulk upgrades (gravel / topsoil / sand / mulch)

**Target slugs:** `gravel-calculator`, `topsoil-calculator`, `sand-calculator`, `mulch-calculator`  
**Do not apply yet** — shared copy for tons↔yards, bag vs bulk, and optional user-entered cost. Paste per tool after UI helpers ship.  
**Primary keywords unchanged** for each tool.  
**Densities (existing YardTally mid estimates):** gravel / sand **2,700 lb/yd³**; topsoil **2,200 lb/yd³**. Moisture and product type move weight—confirm with the yard ticket.  
**Mulch bags:** **2 cu ft** and **3 cu ft** (not weight bags).  
**No invented prices** — cost fields are optional and user-entered only.  
**Planning estimate only.**

## Shared formulas

| Conversion | Formula | Example |
|---|---|---|
| Yards → tons | `tons = cuYd × density ÷ 2000` | 1 yd gravel @ 2700 → **1.35** tons |
| Tons → yards | `cuYd = tons × 2000 ÷ density` | 1 ton gravel @ 2700 → **0.741** yd |
| Topsoil yards → tons | same @ 2200 | 1 yd → **1.10** tons |
| Topsoil tons → yards | same @ 2200 | 1 ton → **0.909** yd |
| Sand | same density as gravel (2700) | 1 yd → **1.35** tons |
| Mulch bags | `ceil(cuFt ÷ 2)` and `ceil(cuFt ÷ 3)` | 25 cu ft → **13** of 2 cu ft / **9** of 3 cu ft |
| Optional cost | `yards × $/yd`, `tons × $/ton`, `bags × $/bag` | Compare only fields the user fills |

Sand and gravel share the 2,700 lb/yd³ mid estimate already used in `volumeMaterials.ts`. Mulch is sold by volume (yards or 2 / 3 cu ft bags)—do not invent a mulch tons default unless density is user-supplied later.

---

## Proposed metadata bumps (only where needed)

### Gravel (`gravel-calculator`)

| Field | Proposed |
|---|---|
| `description` | Gravel calculator: length × width × depth → cubic yards and tons (~2,700 lb/yd³ mid estimate), plus optional bag vs bulk cost from your prices. |
| `answerFirst` | Gravel volume = length × width × depth → cu yd (÷27). At ~2,700 lb/yd³, 1 cu yd ≈ 1.35 tons (planning mid estimate). Convert tons back with yd = tons × 2000 ÷ density. Add ~10% for compaction. Optionally compare bulk $/yd or $/ton to bag prices you enter. |
| `dateModified` | bump on apply |

Primary keyword remains `gravel calculator`.

### Topsoil (`topsoil-calculator`)

| Field | Proposed |
|---|---|
| `description` | Topsoil calculator: area × depth → cubic yards, bags, and tons (~2,200 lb/yd³), with optional bag vs bulk cost using your quotes. |
| `answerFirst` | Topsoil volume is area × depth. Example: 2″ over 500 sq ft ≈ 3.1 cu yd. At ~2,200 lb/yd³, 1 cu yd ≈ 1.1 tons. Convert either way; bagged soil uses the cu ft on the bag. Optional cost fields use only prices you type. |
| `dateModified` | bump on apply |

### Sand (`sand-calculator`)

| Field | Proposed |
|---|---|
| `description` | Sand calculator for paver beds and fill: cubic yards and tons (~2,700 lb/yd³ mid estimate), with optional bag vs bulk cost from your prices. |
| `answerFirst` | Sand uses length × width × depth. A 10×10 area at 1″ is ~0.31 cu yd. Ton estimates use ~2,700 lb/yd³ (same mid figure as gravel)—confirm product and moisture with the yard. Optionally compare $/yd, $/ton, and bag prices you enter. |
| `dateModified` | bump on apply |

### Mulch (`mulch-calculator`)

| Field | Proposed |
|---|---|
| `description` | Mulch calculator: bed area × depth → cubic yards and 2 / 3 cu ft bags, with optional bag vs bulk cost using your prices. |
| `answerFirst` | *(keep depth guidance; clarify bags)* Mulch volume = area × depth. At 3″, 100 sq ft needs 25 cu ft ≈ 0.93 cu yd—thirteen 2 cu ft bags or nine 3 cu ft bags. Bulk yards usually win past about one yard when a truck can dump; bags win for small beds. Enter your $/yd or $/bag to compare. |
| `dateModified` | bump on apply |

---

## Shared HTML block (adapt density / bag line per material)

```html
<h2>Tons ↔ cubic yards</h2>
<p><strong>Planning estimate only.</strong> Tons = cubic yards × (density lb/yd³ ÷ 2,000). Cubic yards = tons × 2,000 ÷ density. YardTally’s mid densities are about <strong>2,700 lb/yd³</strong> for gravel and sand and <strong>2,200 lb/yd³</strong> for topsoil. Wet loads and different rock or soil blends change the ticket weight—confirm with your supplier.</p>

<h2>Bags vs bulk</h2>
<p>Bulk by the cubic yard (or ton) usually costs less once you need more than about a cubic yard <em>and</em> have truck access. Bags win for small beds, wheelbarrow staging, and sites a dump truck cannot reach. Compare using the volumes above and the prices on your quote—not a fixed national rate.</p>

<h2>Optional cost comparison</h2>
<p>Enter only the unit prices you have: $/cubic yard, $/ton (when density applies), and/or $/bag. The calculator multiplies those by the volume, ton estimate, and bag count. Blank fields stay blank; YardTally does not invent landscape material prices.</p>
```

### Mulch-specific bag line (replace gravel/sand bag language)

```html
<p>Bagged mulch is commonly sold in <strong>2 cu ft</strong> and <strong>3 cu ft</strong> bags. Bags = ceil(cubic feet ÷ bag size). Example: 0.93 cu yd × 27 ≈ 25 cu ft → 13 of the 2 cu ft bags or 9 of the 3 cu ft bags (Iowa State Extension volume method for beds).</p>
```

### Gravel / sand bag note (0.5 cu ft bags when shown)

```html
<p>When bag counts appear for gravel or sand, they use a planning <strong>0.5 cu ft</strong> bag size unless you change it—always read the bag you buy. Many drive and base jobs are ordered bulk by the ton or yard instead.</p>
```

---

## Short FAQ items per material

### Gravel — ADD

- **Q: How do I convert gravel yards to tons (and back)?**  
  **A:** Tons ≈ yards × 2,700 ÷ 2,000 (≈ **1.35 tons per yd** at YardTally’s mid density). Yards ≈ tons × 2,000 ÷ 2,700 (≈ **0.74 yd per ton**). Confirm density on the quarry ticket.

- **Q: Bags or bulk gravel—which is cheaper?**  
  **A:** Enter your $/yd or $/ton and bag price to compare for *this* volume. Bulk usually wins past about a cubic yard with truck access; bags win for small path patches. No default prices are assumed.

### Topsoil — ADD

- **Q: How many tons in a yard of topsoil?**  
  **A:** About **1.1 tons per cubic yard** at 2,200 lb/yd³ (planning mid estimate). One ton is about **0.91 cu yd**. Wet or clay-heavy blends run heavier—ask the yard.

- **Q: Should I buy bagged topsoil or bulk?**  
  **A:** Bags suit small beds and fill-in leveling. Bulk yards suit lawn dressing and new beds once volume climbs. Use optional $/yd vs $/bag fields with your store quotes; bag cu ft varies by brand.

### Sand — ADD

- **Q: How do I convert sand cubic yards to tons?**  
  **A:** Same mid density band as gravel in this tool (~**2,700 lb/yd³** → about **1.35 tons/yd**). Masonry, concrete, and play sand differ; moisture swings weight more than volume.

- **Q: Bagged sand vs bulk for a paver bed?**  
  **A:** Small patios often use bags for staging; larger installs usually order bulk bedding sand by the yard or ton. Compare with your prices. Use the product specified for pavers—play sand is not a substitute.

### Mulch — ADD

- **Q: How many 2 cu ft and 3 cu ft mulch bags in a cubic yard?**  
  **A:** 27 ÷ 2 = 13.5 → plan **14** of the 2 cu ft bags, or **9** of the 3 cu ft bags per cubic yard.

- **Q: Is bulk mulch cheaper than bags?**  
  **A:** Often yes above about one cubic yard when delivery is available. Enter your bulk $/yd and bag price to compare for the bed size you calculated. Depth guidance stays in the mulch depth guide (typically 2–3 inches for beds).

---

## HowTo tweaks (shared pattern)

1. Measure area and depth — *(keep per tool)*  
2. Apply waste / compaction — *(keep)*  
3. **Read yards, tons (if density applies), and bags** — *(EDIT)* Show both directions when the user enters tons or yards.  
4. **Optional: enter unit prices** — *(ADD)* $/yd, $/ton, and/or $/bag from your quote only.  
5. Confirm product with the yard or bag label — *(keep / strengthen)*

---

## Worked examples (match existing calculator densities)

**Gravel:** 200 sq ft × 4″ → 66.7 cu ft ≈ 2.47 cu yd before waste; with 10% ≈ 2.72 cu yd ≈ **3.67 tons** at 2,700 lb/yd³.  
**Topsoil:** 500 sq ft × 2″ → 83.3 cu ft ≈ 3.09 cu yd → ≈ **3.40 tons** at 2,200 lb/yd³.  
**Sand:** 10×10 × 1″ → 8.33 cu ft ≈ 0.309 cu yd → ≈ **0.42 tons** at 2,700 lb/yd³.  
**Mulch:** 20×5 × 3″ → 25 cu ft ≈ 0.93 cu yd → **13** × 2 cu ft bags or **9** × 3 cu ft bags.

---

## Internal links to keep / add

- Gravel ↔ sand ↔ paver ↔ [paver base guide](/guides/paver-base-gravel-and-sand-depth/) ↔ [driveway gravel types](/guides/gravel-types-for-driveways/)  
- Topsoil ↔ mulch ↔ raised bed ↔ [topsoil vs garden soil](/guides/topsoil-vs-garden-soil/)  
- Mulch ↔ [mulch depth guide](/guides/mulch-depth-guide/) ↔ tree-ring mulch calculator  

## Sources to cite on apply

- Densities: existing tool TrustBlock notes + supplier ticket confirmation (NRCS / extension context already on gravel; do not invent a new density study).  
- Mulch volume: [Iowa State Extension – amount of mulch](https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed)  
- Mulch depth: UF/IFAS / Clemson / Mississippi State sources already on the mulch tool  

## Apply checklist

- [ ] Tons↔yards UI (both directions) on gravel / topsoil / sand  
- [ ] Mulch keeps 2 / 3 cu ft bag outputs; optional $/yd and $/bag  
- [ ] Optional cost: no SSR price defaults  
- [ ] Paste per-tool FAQ + shared HTML adapted per material  
- [ ] Bump each tool `dateModified` only when that page’s copy is applied  
- [ ] Update `llms-full.txt` density / bag figures if published answers change  

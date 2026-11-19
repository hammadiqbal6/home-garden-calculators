# Staging: Sonotube concrete calculator upgrades

**Target slug:** `sonotube-concrete-calculator`  
**Do not apply yet** — paste into `tools.ts` / `toolBodies.ts` / `toolHowTo.ts` only after UI math for footing bell, mixed sizes, and bags-per-foot ships.  
**Primary keyword unchanged:** `sonotube concrete calculator`  
**Planning estimate only** — bag counts are ceil(volume ÷ yield); confirm QUIKRETE / Sakrete label yields and local footing code.

## Proposed metadata bumps

| Field | Current | Proposed |
|---|---|---|
| `description` | Free Sonotube concrete calculator: diameter × height → cubic yards and 40/60/80 lb bags. See how many bags of concrete for 8–18 inch tubes. | Free Sonotube calculator: bags for 8–36″ tubes, optional footing bell/pad, mixed sizes, and bags-per-foot. Planning estimate—confirm bag yields. |
| `answerFirst` | This concrete calculator for tubes (Sonotube and other cardboard concrete forms) uses π × (inside diameter ÷ 2)² × height. A 12-inch tube 4 feet tall holds about 3.14 cu ft (~0.12 cu yd), roughly six 80 lb bags (or seven 60 lb) before waste. Multiply by pier count and add 5% for spillage. | *(keep primary numbers; extend for footing)* Sonotube volume is π × (inside Ø ÷ 2)² × height. A 12″ × 4 ft tube is about 3.14 cu ft—six 80 lb bags before waste (QUIKRETE 1101). Add optional bell/pad volume when required; multiply by pier count and keep ~5% waste. |
| `dateModified` | `2026-11-18` | `2026-11-19` (bump when this content is applied) |
| `relatedSlugs` | add | `deck-footing-calculator`, `concrete-footing-calculator` (keep existing related tools) |

Word counts: description ~148 chars; answerFirst ~55 words.

---

## FAQ — ADD

- **Q: How many bags of concrete per foot of Sonotube?**  
  **A:** Per foot of height (no waste), bags = ceil(π × (Ø÷24)² ÷ yield) with QUIKRETE 1101 yields of about 0.30 / 0.375 / 0.45 / 0.60 cu ft for 40 / 50 / 60 / 80 lb. Example: 12″ ≈ 0.785 cu ft/ft → 3 / 3 / 2 / 2 bags. Multiply by height and pier count, then add waste. See the bags-per-foot table below.

- **Q: Does this Sonotube calculator include a footing bell or pad?**  
  **A:** When the footing option is on, tube volume plus the flared bell (truncated cone) or circular pad under the tube are summed, then waste is applied. Bell and pad sizes are planning inputs only—local code and the engineer/inspector set required footing geometry. For strip or rectangular pad footings use the [concrete footing calculator](/calculators/concrete-footing-calculator/); for deck pier grids use the [deck footing calculator](/calculators/deck-footing-calculator/).

- **Q: Can I mix different Sonotube diameters on one pour?**  
  **A:** Yes—enter each diameter/height/count group, then sum volumes before bag conversion. Example planning set: four 10″ × 3 ft tubes (~6.54 cu ft) plus two 12″ × 4 ft tubes (~6.28 cu ft) ≈ 12.82 cu ft before waste; with 5% waste ≈ 13.46 cu ft → ceil(13.46 ÷ 0.60) = 23 bags of 80 lb mix.

- **Q: Sonotube vs deck footing vs concrete footing tools?**  
  **A:** Use this page for cardboard tube columns and optional bell/pad under each tube. Use the [deck footing calculator](/calculators/deck-footing-calculator/) when you need pier count from deck length × width × spacing. Use the [concrete footing calculator](/calculators/concrete-footing-calculator/) for continuous strip or rectangular pad footings without a tube.

## FAQ — EDIT (existing)

- **How many bags of concrete for a Sonotube?** — Keep current 12″ × 4 ft bag counts; append: “For tall piers, the bags-per-foot table (8–36″) scales height quickly. Optional bell/pad volume is extra when selected.”
- **How much concrete for a 12-inch Sonotube?** — Keep per-foot 0.785 cu ft; note that 12″ bags-per-foot are 3 / 3 / 2 / 2 for 40 / 50 / 60 / 80 lb before waste.
- **Sonotube calculator vs slab or post hole calculator?** — Add links to deck footing + concrete footing tools for pier grids and strip/pad footings.

---

## HowTo step tweaks (`toolHowTo.ts`)

1. **Enter inside diameter and height** — *(keep)* Use clear inside diameter and fill height.
2. **Optional footing bell or pad** — *(ADD)* If code requires a flared bell or circular pad under the tube, enter those dimensions. Leave off for a straight cylinder only. This is a planning volume add-on, not a structural design.
3. **Set tube count (or mixed size groups) and waste** — *(EDIT)* Multiply by pier count, or enter each diameter group separately and sum. Default waste for formed tubes is about 5%.
4. **Read volume and bag estimates** — *(EDIT)* Cylinder (plus optional footing) → cu ft / cu yd / bags using label yields (~0.30 / 0.375 / 0.45 / 0.60 cu ft for 40 / 50 / 60 / 80 lb QUIKRETE 1101). Use bags-per-foot × height as a quick check.
5. **Brace forms before pouring** — *(keep)* Plumb, brace, confirm footing details with local code before you pour.

---

## HTML sections to ADD (`toolBodies.ts`)

### 1) Footing / bell support (after “Column volume method”)

```html
<h2>Optional footing bell or pad under the tube</h2>
<p><strong>Planning estimate only.</strong> Some deck and column piers need a flared “bell” or a circular pad under the cardboard tube. When that option is available, YardTally adds that volume to the cylinder before waste and bag conversion.</p>
<ul>
  <li><strong>Bell (truncated cone / frustum):</strong> volume = (π × h ÷ 3) × (R² + R×r + r²), where R is the bell-base radius, r is the tube radius, and h is bell height—all in feet.</li>
  <li><strong>Pad (cylinder under tube):</strong> volume = π × (pad diameter ÷ 2)² × pad thickness.</li>
</ul>
<p>Required bell/pad sizes come from local code or a structural plan—not from this calculator. For continuous strip or rectangular pad footings without a tube, use the <a href="/calculators/concrete-footing-calculator/">concrete footing calculator</a>. For pier count from a deck grid, use the <a href="/calculators/deck-footing-calculator/">deck footing calculator</a>.</p>
```

### 2) Bags-per-foot table (ready to paste)

Yields: QUIKRETE Concrete Mix No. 1101 ≈ **0.30 / 0.375 / 0.45 / 0.60** cu ft for **40 / 50 / 60 / 80** lb.  
Math: `cuFtPerFt = π × (Ø_in / 24)²`; bags = `ceil(cuFtPerFt ÷ yield)` for **1 ft** height, **no waste**.

```html
<h2>Bags of concrete per foot of Sonotube (8–36″)</h2>
<p>Use this chart to scale height: multiply bags-per-foot by pier height (ft), then by pier count, then apply waste (calculator default 5%). Values are ceil(volume ÷ yield) with QUIKRETE 1101 planning yields—confirm the bag you buy.</p>
<div class="table-scroll">
<table>
  <caption>Bags per 1 ft of tube height before waste (yields 0.30 / 0.375 / 0.45 / 0.60 cu ft)</caption>
  <thead>
    <tr>
      <th>Inside Ø</th>
      <th>Cu ft / ft</th>
      <th>40 lb</th>
      <th>50 lb</th>
      <th>60 lb</th>
      <th>80 lb</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>8″</td><td>0.349</td><td>2</td><td>1</td><td>1</td><td>1</td></tr>
    <tr><td>10″</td><td>0.545</td><td>2</td><td>2</td><td>2</td><td>1</td></tr>
    <tr><td>12″</td><td>0.785</td><td>3</td><td>3</td><td>2</td><td>2</td></tr>
    <tr><td>14″</td><td>1.069</td><td>4</td><td>3</td><td>3</td><td>2</td></tr>
    <tr><td>16″</td><td>1.396</td><td>5</td><td>4</td><td>4</td><td>3</td></tr>
    <tr><td>18″</td><td>1.767</td><td>6</td><td>5</td><td>4</td><td>3</td></tr>
    <tr><td>24″</td><td>3.142</td><td>11</td><td>9</td><td>7</td><td>6</td></tr>
    <tr><td>30″</td><td>4.909</td><td>17</td><td>14</td><td>11</td><td>9</td></tr>
    <tr><td>36″</td><td>7.069</td><td>24</td><td>19</td><td>16</td><td>12</td></tr>
  </tbody>
</table>
</div>
<p>Quick check: 12″ × 4 ft → 2 × 4 = 8 bags of 80 lb from the per-foot chart before ceil-at-full-height math; the full-tube method is ceil(3.14 ÷ 0.60) = <strong>6 bags</strong> because ceil runs on total volume, not on each foot. Prefer the calculator’s total-volume bag count for ordering.</p>
```

**Note for implementers:** Prefer live `ceil(totalVolume ÷ yield)` for order quantities. The per-foot table is a reference aid; multiplying per-foot ceils can over-order vs a single ceil on total volume (see 12″ × 4 ft: 2×4=8 vs 6).

### 3) Mixed tube sizes

```html
<h2>Mixed Sonotube diameters</h2>
<p>When a deck or porch uses more than one tube size, total volume is the sum of each group: Σ [π × r² × height × count]. Convert the combined cubic feet (after waste) to bags once—do not round each group separately if you want the leanest bag count.</p>
<p><strong>Worked example (planning):</strong> four 10″ × 3 ft tubes ≈ 6.54 cu ft + two 12″ × 4 ft tubes ≈ 6.28 cu ft → 12.82 cu ft. With 5% waste → 13.46 cu ft → ceil(13.46 ÷ 0.60) = <strong>23</strong> bags of 80 lb mix (or ceil(13.46 ÷ 0.45) = <strong>30</strong> bags of 60 lb). Pair pier layout with the <a href="/calculators/deck-footing-calculator/">deck footing calculator</a> when counting posts from spacing.</p>
```

### 4) Related links tweak (edit existing “Deck pier tips” / assumptions)

- Link [deck footing calculator](/calculators/deck-footing-calculator/) and [concrete footing calculator](/calculators/concrete-footing-calculator/).
- Keep existing deck material + Sonotube guide links.
- Soften assumptions line that currently says the tool “does not design footing bells” once the optional volume feature ships—replace with: does not **approve** footing size; volume add-on is for planning takeoffs only.

---

## Sources to keep / cite on apply

- [QUIKRETE Concrete Mix 1101 TDS](https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf) — bag yields 0.30 / 0.375 / 0.45 / 0.60 cu ft  
- [Sonotube forms product sizing](https://www.sonotube.com/sonotube-concrete-forms) — inside diameter labeling  

## Apply checklist

- [ ] UI: footing bell/pad inputs + mixed size groups  
- [ ] Paste FAQ / HowTo / HTML above  
- [ ] Update `relatedSlugs` once footing tools are live  
- [ ] Sync `llms.txt` / `llms-full.txt` bag-per-foot figures  
- [ ] Bump `dateModified` only on real apply  

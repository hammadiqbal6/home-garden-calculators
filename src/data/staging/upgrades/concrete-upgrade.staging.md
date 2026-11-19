# Staging: Concrete calculator upgrades (optional cost + quarter-yard order)

**Target slug:** `concrete-calculator`  
**Do not apply yet** — paste into `tools.ts` / `toolBodies.ts` / `toolHowTo.ts` only after optional cost UI and `roundUpToQuarterYard` output ship.  
**Primary keyword unchanged:** `concrete calculator`  
**No invented prices** — every dollar field is user-entered; leave blank until the shopper types a quote.  
**Planning estimate only** — volume and bag math match existing QUIKRETE / Sakrete yields (0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb).

## Proposed metadata bumps

| Field | Current | Proposed |
|---|---|---|
| `description` | Free concrete calculator for slabs, footings, and steps. Get cubic yards and 40/60/80 lb bag counts with waste—plan how many bags of concrete you need. | Free concrete calculator: yards, 40/60/80 lb bags, optional bag vs ready-mix cost (your prices), and order rounded up to the nearest ¼ yard. |
| `answerFirst` | A concrete calculator converts your project dimensions into cubic feet and cubic yards, then into 40, 60, or 80 lb bags. For a slab, multiply length × width × thickness (in feet); divide by 27 for yards. Add about 10% waste. Typical bag yields are 0.30, 0.45, and 0.60 cubic feet. | *(~55 words)* Concrete volume = length × width × thickness (ft). Divide by 27 for yards; bags use ~0.30 / 0.45 / 0.60 cu ft yields (40 / 60 / 80 lb). Add ~10% waste. Optionally enter your bag and yard prices to compare bags vs ready-mix; ready-mix orders round up to the nearest ¼ yard. |
| `dateModified` | `2026-11-19` | Keep on apply day if already bumped for other edits; otherwise set to the apply date. |
| FAQ count | 6 | Add 2–3 cost / quarter-yard items (still ≤ ~8 visible; prefer replacing thinner duplicates if needed) |

Primary keyword stays in title / H1 / description lead.

---

## FAQ — ADD

- **Q: Can this concrete calculator estimate cost?**  
  **A:** Yes, as an optional planning block. Enter the prices you were quoted—per 40 / 60 / 80 lb bag, per cubic yard of ready-mix, and any delivery fee. YardTally multiplies those by bag counts and by the ready-mix order yards. Blank fields stay blank; there are no default regional prices.

- **Q: Why does ready-mix round up to the nearest 1/4 yard?**  
  **A:** Many ready-mix tickets sell in quarter-yard increments. After waste, the calculator can show both exact cubic yards and an **order** quantity rounded up to the next 0.25 cu yd. Example: a 10×10×4″ slab with 10% waste is about 1.36 cu yd → order **1.50** cu yd. Confirm the plant’s minimum and increment before you call.

- **Q: How do I compare bagged mix vs ready-mix?**  
  **A:** Enter bag unit prices and a ready-mix $/yd plus delivery. Bag cost = bags × your bag price. Ready-mix cost = (order yards rounded to ¼ yd) × $/yd + delivery fee. The cheaper total depends on your quotes and truck access—not a fixed “always bags under 1 yard” rule. Labor and mixing time are outside this tool.

## FAQ — EDIT (existing)

- **Should I order ready-mix or use bags?** — Keep guidance that bags are often practical under about 1 cu yd; append: “Use the optional cost fields with *your* quotes to check the break even after delivery fees.”
- **How do I get cubic yards from a concrete calculator?** — Append: “For ready-mix ordering, round the wasted volume up to the next quarter yard unless your plant says otherwise.”

---

## HowTo step tweaks

1. Enter slab dimensions — *(keep)*  
2. Apply a waste percent — *(keep; default 10%)*  
3. Read cubic feet, yards, and bags — *(EDIT)* Also note the **order yards** figure rounded up to the nearest ¼ yd when planning a truck.  
4. **Optional: enter bag and ready-mix prices** — *(ADD)* Type only prices you have from a store or plant. Delivery fee applies once to ready-mix. Leave unused fields empty.  
5. Confirm with the bag or ready-mix order — *(EDIT)* Match bag size on the label, or place the quarter-yard order with the plant.

---

## HTML sections to ADD (`toolBodies.ts`)

### Optional cost block (copy)

```html
<h2>Optional cost: bags vs ready-mix</h2>
<p><strong>Planning estimate only—no default prices.</strong> Enter the unit prices from your quote. YardTally does not invent regional concrete prices.</p>
<ul>
  <li><strong>Bag totals:</strong> (40 / 60 / 80 lb bag count) × (your price per bag).</li>
  <li><strong>Ready-mix total:</strong> (order cubic yards rounded up to the next ¼ yd) × (your price per yd) + delivery fee.</li>
</ul>
<p>Compare the totals that have prices filled in. Truck access, labor, and pour size still matter; a cheaper ready-mix ticket can lose if the truck cannot reach the forms.</p>

<h3>Worked cost structure (fill in your numbers)</h3>
<p>Example volume only (already on this page): 10×10×4″ slab with 10% waste ≈ <strong>1.36 cu yd</strong>, <strong>62</strong> × 80 lb bags or <strong>82</strong> × 60 lb bags (QUIKRETE / Sakrete planning yields).</p>
<ul>
  <li>Order yards at ¼-yd steps: ceil(1.36 × 4) ÷ 4 = <strong>1.50 cu yd</strong>.</li>
  <li>Bag material cost = 62 × (your $/80 lb bag), or 82 × (your $/60 lb bag).</li>
  <li>Ready-mix material + delivery = 1.50 × (your $/yd) + (your delivery fee).</li>
</ul>
<p>Leave any price blank if you do not have a quote yet—the volume and bag counts still stand alone.</p>
```

### Quarter-yard ordering note

```html
<h2>Ready-mix order: round up to ¼ yard</h2>
<p>Exact volume (after waste) is what the slab math produces. Many plants sell in <strong>0.25 cu yd</strong> increments, so the optional order field rounds <em>up</em> to the next quarter yard (zero stays zero).</p>
<div class="table-scroll">
<table>
  <caption>Example exact yards → order yards (¼ yd steps)</caption>
  <thead>
    <tr><th>Exact cu yd (after waste)</th><th>Order cu yd</th></tr>
  </thead>
  <tbody>
    <tr><td>0.12</td><td>0.25</td></tr>
    <tr><td>1.00</td><td>1.00</td></tr>
    <tr><td>1.23</td><td>1.25</td></tr>
    <tr><td>1.36</td><td>1.50</td></tr>
    <tr><td>2.01</td><td>2.25</td></tr>
  </tbody>
</table>
</div>
<p>Confirm minimum load and increment with your ready-mix plant—some yards use different steps or higher minimums.</p>
```

### Related links (small ADD)

```html
<p>Round column forms: <a href="/calculators/sonotube-concrete-calculator/">Sonotube concrete calculator</a>. Continuous or pad footings: <a href="/calculators/concrete-footing-calculator/">concrete footing calculator</a>. Deck pier grids: <a href="/calculators/deck-footing-calculator/">deck footing calculator</a>.</p>
```

---

## Math contract (for implementers / Vitest)

- Bag yields unchanged: `BAG_YIELD_CUFT` 40→0.30, 60→0.45, 80→0.60.  
- `orderCuYdQuarter = ceil(cuYd × 4) / 4` for `cuYd > 0`.  
- Cost fields: omit or treat `≤ 0` as unused.  
- Delivery fee added **once** to ready-mix total only.  
- Never hardcode `$` defaults in SSR or copy.

## Sources to keep citing

- [QUIKRETE calculator / bag yields](https://www.quikrete.com/calculator/main.asp)  
- [QUIKRETE 1101 TDS](https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf)  
- [Sakrete calculators](https://sakrete.com/resources/calculators/)  

## Apply checklist

- [ ] Optional price inputs in calculator UI (no defaults)  
- [ ] Show exact cu yd + order cu yd (¼ step)  
- [ ] Paste FAQ / HowTo / HTML  
- [ ] Sync llms figures only if order-yards language is published  
- [ ] Bump `dateModified` on apply  

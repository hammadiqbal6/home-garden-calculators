/** Variant calculator bodies (long-tail presets). */
export const toolBodyVariants: Record<string, string> = {
  'concrete-steps-calculator': `
      <h2>How do you calculate concrete for solid poured steps?</h2>
      <p>Solid poured steps fill a wedge of concrete behind each riser and tread. Volume (cu ft) = width_ft × tread_ft × riser_ft × n(n+1)/2, where n is the number of steps. Convert rise and tread from inches to feet before you multiply. Default waste is 10%.</p>
      <p>Bag counts use QUIKRETE Concrete Mix No. 1101 planning yields of about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags—confirm the label on the mix you buy.</p>

      <h2>Solid stair fill formula</h2>
      <p>Multiply stair width × tread × riser × n(n+1)/2 for cubic feet of solid fill. The triangular series adds each stacked tread; plain n×width×tread×riser undercounts.</p>
      <p>Example: three steps at 7 in rise and 11 in tread with a 3 ft wide flight: tread_ft = 11/12, riser_ft = 7/12, n(n+1)/2 = 6. Volume = 3 × (11/12) × (7/12) × 6 ≈ <strong>9.625 cu ft</strong> before waste. With 10% waste → about <strong>10.588 cu ft</strong>.</p>

      <h2>Worked example: 3 steps, 7″ × 11″, 3 ft wide</h2>
      <p>Net concrete ≈ 9.625 cu ft (under 0.36 cu yd). After 10% waste you're near 10.6 cu ft—usually a bag-mix job if you can stage pours.</p>
      <div class="table-scroll">
      <table>
        <caption>3-step flight after 10% waste (~10.588 cu ft)</caption>
        <thead><tr><th>Bag size</th><th>QUIKRETE 1101 planning yield</th><th>Bags (ceil)</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 cu ft</td><td>36</td></tr>
          <tr><td>60 lb</td><td>0.45 cu ft</td><td>24</td></tr>
          <tr><td>80 lb</td><td>0.60 cu ft</td><td>18</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Solid-fill steps are not the same volume as a flat slab. Don't swap in rectangle math from the <a href="/calculators/concrete-calculator/">concrete slab calculator</a> unless you're pouring a slab.</div>

      <h2>How many bags of concrete for porch steps?</h2>
      <p>For the worked example, plan on <strong>18 × 80 lb</strong>, <strong>24 × 60 lb</strong>, or <strong>36 × 40 lb</strong> bags after waste. Bigger flights scale fast—compare ready-mix once you're past about a cubic yard.</p>
      <p>More bag charts: <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>. Related tools live in the <a href="/hubs/concrete/">concrete hub</a>, including the <a href="/calculators/concrete-footing-calculator/">footing calculator</a> and <a href="/calculators/rebar-calculator/">rebar calculator</a>.</p>

      <h2>Do steps need footings or rebar?</h2>
      <p>Often yes at the code level, but this tool only sizes concrete volume for the stair mass you enter. Frost depth and steel layout belong on the drawing.</p>
      <p>Landing mats: <a href="/calculators/rebar-calculator/">rebar calculator</a>. Strip under the bottom step: <a href="/calculators/concrete-footing-calculator/">concrete footing calculator</a>.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Multiplying by n only instead of n(n+1)/2.</li>
        <li>Leaving rise/tread in inches while width is already in feet.</li>
        <li>Skipping waste on tight forms and nose overhangs.</li>
        <li>Assuming every brand matches QUIKRETE 1101 yields without reading the bag.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down net cu ft, waste %, and bag size you can lift.</li>
        <li>Stage forms and release agent before the first bag.</li>
        <li>Order footing concrete separately if the bottom step ties into a frost footing.</li>
        <li>Keep one spare bag; cold joints on the top tread look worse than leftover mix.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Assumes uniform rise, tread, and width with solid fill—not hollow block or precast. Does not design structural capacity or code dimensions. Bag yields follow QUIKRETE 1101 published coverage.</p>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>
`,
  'sod-calculator': `
      <h2>How much sod do I need for my lawn?</h2>
      <p>Area = length × width. With waste: area × (1 + waste%). Pieces = ceil(area_with_waste ÷ sq ft per roll). Pallets = ceil(area_with_waste ÷ sq ft per pallet). Override the 10 sq ft / 450 sq ft defaults with your supplier ticket.</p>
      <p>This page is for sod rolls or slabs. Seeding stays on the <a href="/calculators/grass-seed-calculator/">grass seed calculator</a>.</p>

      <h2>Sod area and piece formula</h2>
      <p>Measure the lawn rectangle (or split irregular yards into rectangles and add). Defaults (10 sq ft/roll, 450 sq ft/pallet) are common retail planning figures—not brand guarantees.</p>

      <h2>Worked example: 50×20 ft lawn, 5% waste</h2>
      <p>Area = <strong>1,000 sq ft</strong>. With 5% waste → <strong>1,050 sq ft</strong>. At 10 sq ft/piece → <strong>105 rolls</strong>. At 450 sq ft/pallet → <strong>3 pallets</strong>.</p>
      <div class="table-scroll">
      <table>
        <caption>50×20 ft lawn — planning defaults</caption>
        <thead><tr><th>Input</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Net area</td><td>1,000 sq ft</td></tr>
          <tr><td>With 5% waste</td><td>1,050 sq ft</td></tr>
          <tr><td>Rolls @ 10 sq ft</td><td>105</td></tr>
          <tr><td>Pallets @ 450 sq ft</td><td>3</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Sod math is area plus waste, then round up on pieces and pallets. Change roll size the second your supplier quotes a different coverage.</div>

      <h2>Sod vs grass seed — which calculator?</h2>
      <p>Sod is instant cover with freight and install timing. Seed is cheaper per thousand square feet but needs weeks of watering. After sod is down, size nitrogen with the <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a> and <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">fertilizer nitrogen per 1,000 sq ft</a>. Import soil first with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>. Seeding rates: <a href="/guides/grass-seed-per-sq-ft/">grass seed per sq ft</a>. More lawn tools: <a href="/hubs/lawn/">lawn hub</a>.</p>

      <h2>How much extra sod should I order?</h2>
      <p>Most crews budget <strong>5–10% waste</strong> for cuts along beds and corners. Curves push toward the high end. Short orders mean a second delivery while the first pallets cook on the driveway.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using a seed bag rate instead of sq ft per roll on the sod ticket.</li>
        <li>Forgetting waste, then trimming every bed line tight.</li>
        <li>Assuming every pallet is 450 sq ft.</li>
        <li>Scheduling delivery before topsoil is graded.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Confirm roll and pallet coverage on the phone; type them into the calculator.</li>
        <li>Line up install within the farm's harvest window.</li>
        <li>Pre-irrigate subgrade lightly so edges don't lift.</li>
        <li>Plan starter fertilizer and watering before the truck arrives.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Treats the lawn as your entered length × width. Roll/pallet sizes are user inputs—defaults are placeholders until the supplier confirms. No brand yields are invented.</p>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>
`,
  'paver-base-calculator': `
      <h2>How much gravel do I need for a paver base?</h2>
      <p>Paver base here means compacted gravel or crushed stone under pavers—or the same material in a retaining-wall footing trench. Volume = length × width × depth, plus waste for compaction and spill. Tons use a mid planning density of about <strong>2,700 lb/cu yd</strong>.</p>
      <p>Not for French drains—use the <a href="/calculators/french-drain-gravel-calculator/">French drain gravel calculator</a> when pipe volume matters.</p>

      <h2>Paver base volume formula</h2>
      <p>Volume (cu ft) = L × W × depth_ft. Yards = cu ft ÷ 27. With waste, multiply by (1 + waste%). Tons ≈ cu yd × 2700 ÷ 2000. Enter the <strong>finished compacted depth</strong>, not fluffy dump depth.</p>
      <p>Depth layers for gravel vs bedding sand: <a href="/guides/paver-base-gravel-and-sand-depth/">paver base gravel and sand depth</a>.</p>

      <h2>Worked example: 20×4 ft at 6″, 10% waste</h2>
      <p>Area = 80 sq ft. Depth = 0.5 ft. Net = <strong>40 cu ft ≈ 1.481 cu yd</strong>. With 10% waste ≈ <strong>1.63 cu yd ≈ 2.2 tons</strong> at 2,700 lb/yd³.</p>
      <div class="table-scroll">
      <table>
        <caption>20×4 ft @ 6 in compacted base</caption>
        <thead><tr><th>Stage</th><th>Cu ft</th><th>Cu yd</th><th>Tons @ 2700</th></tr></thead>
        <tbody>
          <tr><td>Net</td><td>40</td><td>1.481</td><td>~2.0</td></tr>
          <tr><td>+10% waste</td><td>44</td><td>~1.63</td><td>~2.2</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Order base by compacted yards or tons, not paver sq ft alone. Sand and pavers are separate—see the <a href="/calculators/sand-calculator/">sand calculator</a> and <a href="/calculators/paver-calculator/">paver calculator</a>.</div>

      <h2>Can I use this for a retaining wall gravel base?</h2>
      <p>Yes—for the compactable gravel trench under wall block (“paver base for retaining wall”), not the decorative caps. Block counts belong on the <a href="/calculators/retaining-wall-calculator/">retaining wall calculator</a> and in <a href="/guides/retaining-wall-blocks-and-base/">retaining wall blocks and base</a>.</p>

      <h2>How does this compare to the gravel calculator?</h2>
      <p>Same rectangle math. This page frames defaults and links for paver and wall-base jobs. General pads: <a href="/calculators/gravel-calculator/">gravel calculator</a>. More: <a href="/hubs/landscape/">landscape hub</a>, <a href="/hubs/outdoor-structures/">outdoor structures hub</a>.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Ordering loose depth and skipping compaction.</li>
        <li>Using drain rock where crusher run is specified for bearing.</li>
        <li>Mixing base gravel volume with thin bedding sand.</li>
        <li>Sizing a French drain on this pad tool.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Confirm material name with the quarry (crusher run, ¾″ minus, etc.).</li>
        <li>Ask if price is per ton or per yard.</li>
        <li>Stage geotextile, edge restraints, and a plate compactor.</li>
        <li>Measure depth in several spots after each lift.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Assumes uniform depth. The 2,700 lb/cu yd factor is a mid estimate—confirm with your supplier. Does not design pavement structure or wall stability.</p>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>
`,
  'mulch-calculator-circular-beds': `
      <h2>How much mulch for a round garden bed?</h2>
      <p>Area (sq ft) = π × (diameter ÷ 2)². Volume (cu ft) = area × (depth_in ÷ 12). You get cubic yards and bag counts for 2 and 3 cu ft bags (ceil).</p>
      <p>Rectangles: <a href="/calculators/mulch-calculator/">mulch calculator</a>. Tree wells with a bare trunk opening: <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a>.</p>

      <h2>Circle bed mulch formula</h2>
      <p>Radius in feet, square it, multiply by π, then by depth in feet. Defaults: <strong>8 ft diameter</strong> at <strong>3 in</strong> → area ≈ <strong>50.27 sq ft</strong>, volume ≈ <strong>12.57 cu ft (~0.466 cu yd)</strong>.</p>

      <h2>Worked example: 8 ft diameter, 3 inches deep</h2>
      <p>At 12.57 cu ft: ceil(12.57 ÷ 2) = <strong>7</strong> of the 2 cu ft bags, or ceil(12.57 ÷ 3) = <strong>5</strong> of the 3 cu ft bags.</p>
      <div class="table-scroll">
      <table>
        <caption>8 ft circle @ 3 in depth</caption>
        <thead><tr><th>Measure</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Area</td><td>~50.27 sq ft</td></tr>
          <tr><td>Volume</td><td>~12.57 cu ft (~0.466 cu yd)</td></tr>
          <tr><td>2 cu ft bags</td><td>7</td></tr>
          <tr><td>3 cu ft bags</td><td>5</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Measure diameter across the planting zone. Depth is usually 2–3 in—see the <a href="/guides/mulch-depth-guide/">mulch depth guide</a>.</div>

      <h2>How deep should mulch be in a round bed?</h2>
      <p>Most extension sheets land at <strong>2–3 inches</strong> of organic mulch for shrubs, pulled back from stems. Rectangle charts: <a href="/guides/mulch-for-common-garden-beds/">mulch for common garden beds</a>. More: <a href="/hubs/landscape/">landscape hub</a>.</p>

      <h2>Why not use the tree ring calculator?</h2>
      <p>Tree rings are donuts (outer − trunk). A circular planter bed is solid mulch over soil. If the bed wraps a trunk with bare wood showing, switch tools.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Entering radius where the field asks for diameter.</li>
        <li>Using length × width on a round island bed.</li>
        <li>Ordering topsoil when you only need surface mulch.</li>
        <li>Assuming every bag is 2 cu ft without reading the label.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Measure diameter in two directions.</li>
        <li>Pick depth from the depth guide; note existing mulch thickness.</li>
        <li>Compare bulk once you're near a cubic yard across beds.</li>
        <li>Keep mulch off crowns and trunks.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Assumes a flat circle with uniform depth. Bag sizes are planning defaults—confirm cu ft on the package.</p>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>
`,
};

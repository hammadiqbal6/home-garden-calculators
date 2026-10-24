/**
 * Long-form HTML bodies for each calculator (unique copy per tool).
 * Kept separate from the registry for maintainability.
 */
export const toolBodies: Record<string, string> = {
  'concrete-calculator': `
      <h2>How this concrete calculator works</h2>
      <p>Enter the shape (slab, footing, or steps), dimensions, and optional waste percent. The tool returns volume in cubic feet, cubic yards, and cubic meters, plus bag counts for common 40, 60, and 80 lb mixes. All math runs in your browser—inputs are not uploaded.</p>
      <p>Use feet (or meters) for length and width. Enter slab thickness in inches (or centimeters). The calculator converts everything to a consistent unit system before multiplying, which prevents the classic mistake of treating a 4-inch slab as 4 feet thick.</p>
      <h2>How it's calculated</h2>
      <ul>
        <li><strong>Slab / footing:</strong> volume = length × width × thickness (all in feet)</li>
        <li><strong>Solid steps:</strong> volume = width × tread × riser × n(n+1)/2</li>
        <li><strong>Bags:</strong> bags = ceil(volume_cu_ft ÷ bag_yield)</li>
      </ul>
      <p>Bag yields used here follow common QUIKRETE / Sakrete published coverage: about 0.30 cu ft (40 lb), 0.45 cu ft (60 lb), and 0.60 cu ft (80 lb). Always check the bag you buy—lightweight and high-strength mixes can differ.</p>
      <h2>Worked example: 10×10 patio slab</h2>
      <p>A 10 ft × 10 ft slab at 4 inches thick is 10 × 10 × (4÷12) = 33.33 cu ft ≈ 1.23 cu yd. With 10% waste → 36.7 cu ft. That is about 62 bags of 60 lb mix or 46 bags of 80 lb mix. Ready-mix starts to make sense near or above one cubic yard when access allows a truck. More sizes: <a href="/guides/concrete-for-10x10-slab/">how much concrete for a 10×10 slab</a>.</p>
      <div class="table-scroll">
      <table>
        <caption>Typical bagged concrete yields</caption>
        <thead><tr><th>Bag size</th><th>Approx. yield</th><th>Bags per cu yd</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 cu ft</td><td>~90</td></tr>
          <tr><td>60 lb</td><td>0.45 cu ft</td><td>~60</td></tr>
          <tr><td>80 lb</td><td>0.60 cu ft</td><td>~45</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Convert thickness to feet before multiplying, divide by 27 for cubic yards, then add waste. Bag yields vary slightly by brand—verify on the label.</div>
      <h2>Choosing slab thickness</h2>
      <p>Many residential patios and shed pads use 4 inches of concrete over compacted base. Driveways and heavier loads often need 5–6 inches plus reinforcement details required by local code. This calculator estimates concrete volume only—it does not design structural thickness, rebar, or base depth.</p>
      <h2>Waste factor tips</h2>
      <p>Uneven subgrade, form bulge, and spillage routinely consume 5–10% extra. DIY bag mixes benefit from the higher end of that range. Order a little more rather than finishing a pour short; cold joints and mismatched batches are hard to hide.</p>
      <div class="table-scroll">
      <table>
        <caption>Sand density &amp; bag planning</caption>
        <thead><tr><th>Type (typical)</th><th>Approx. lb / yd³</th><th>50 lb bags / yd³</th></tr></thead>
        <tbody>
          <tr><td>Play / masonry sand</td><td>~2,400–2,700</td><td>~48–54</td></tr>
          <tr><td>Concrete sand</td><td>~2,600–2,900</td><td>~52–58</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Common mistakes</h2>
      <ul>
        <li>Mixing inches and feet in the same product (4 must mean 0.333 ft for thickness).</li>
        <li>Forgetting that gravel base is separate from concrete volume.</li>
        <li>Ordering exact yardage with no waste on rough soil.</li>
        <li>Ignoring manufacturer yield notes on specialty mixes.</li>
        <li>Using this slab tool for fence post holes or Sonotubes—use the dedicated calculators instead.</li>
      </ul>
      <h2>Related long-tail jobs</h2>
      <p>For fence posts use the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a>. For cardboard forms use the <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a>. Read <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete do I need</a> for bag charts.</p>

      <h2>Assumptions and limits</h2>
      <p>The concrete calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'concrete-calculator-post-holes': `
      <h2>Post hole concrete formula</h2>
      <p>Treat each hole as a cylinder. Convert diameter to feet, then volume (cu ft) = π × r² × depth × posts. Example: 10 posts, 10" diameter (r = 5/12 ft), 30" deep (2.5 ft): π × (5/12)² × 2.5 × 10 ≈ 13.6 cu ft (~0.50 cu yd).</p>
      <p>Hole diameter is often about three times the post width for wood posts, but wind load, frost depth, and panel weight matter more than rules of thumb. Dig below the local frost line when frost heave is a concern, and slope the top of the concrete so water drains away from the post.</p>
      <h2>Typical bag counts</h2>
      <div class="table-scroll">
      <table>
        <thead><tr><th>Hole</th><th>~Volume</th><th>80 lb bags each</th></tr></thead>
        <tbody>
          <tr><td>8" × 2 ft</td><td>0.70 cu ft</td><td>2</td></tr>
          <tr><td>10" × 2.5 ft</td><td>1.36 cu ft</td><td>3</td></tr>
          <tr><td>12" × 3 ft</td><td>2.36 cu ft</td><td>4</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Worked example: 48 ft privacy fence</h2>
      <p>At 8 ft post spacing you need 7 posts (6 sections + end). If each hole is 10" × 2.5 ft, one hole is ~1.36 cu ft. Seven holes ≈ 9.55 cu ft before waste, about 10.5 cu ft with 10% waste—roughly eighteen 60 lb bags or fifteen 80 lb bags. Cross-check post count with the <a href="/calculators/fence-calculator/">fence calculator</a>.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Diameter and depth drive volume more than post height. Multiply carefully by post count and add waste for over-dig.</div>
      <h2>Concrete vs gravel-set posts</h2>
      <p>Both methods are used. Concrete holds posts rigidly for privacy panels; gravel can improve drainage in some soils. Follow wood-preservative requirements for ground contact and any HOA or code rules in your area.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using interior patching compound instead of outdoor concrete or setting mix.</li>
        <li>Leaving a water pocket against the post by crowning concrete the wrong way.</li>
        <li>Under-digging frost depth on gates and end posts that take more load.</li>
      </ul>
      <p>More detail: <a href="/guides/how-much-concrete-for-fence-posts/">How much concrete for fence posts</a>.</p>

      <h2>Assumptions and limits</h2>
      <p>The concrete calculator post holes results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'sonotube-concrete-calculator': `
      <h2>Column volume method</h2>
      <p>Sonotube and similar round cardboard forms use the cylinder formula: π × (inside diameter ÷ 2)² × height × count. Use the inside diameter printed on the form. Height is the concrete column length you will fill—not necessarily the full tube length if you stop short.</p>
      <h2>Worked example</h2>
      <p>Four 10" Sonotubes, each 3 ft: diameter 10" → r = 5/12 ft. Volume each = π × (5/12)² × 3 ≈ 1.64 cu ft. Four tubes ≈ 6.54 cu ft (~0.24 cu yd), about eleven 80 lb bags at 0.60 cu ft/bag with 5% waste.</p>
      <p>A 12" tube holds about 0.785 cu ft per foot of height. That means a 4 ft pier is roughly 3.14 cu ft—five to six 80 lb bags before waste—useful for deck footings when paired with proper footing bells or pads as required by code.</p>
      <div class="table-scroll">
      <table>
        <caption>Approx. 80 lb bags per tube (0.60 cu ft/bag, before waste)</caption>
        <thead><tr><th>Inside Ø</th><th>3 ft deep</th><th>4 ft deep</th></tr></thead>
        <tbody>
          <tr><td>8 in</td><td>~2 bags</td><td>~3 bags</td></tr>
          <tr><td>10 in</td><td>~3 bags</td><td>~4 bags</td></tr>
          <tr><td>12 in</td><td>~5 bags</td><td>~6 bags</td></tr>
          <tr><td>16 in</td><td>~9 bags</td><td>~12 bags</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Measure inside diameter, multiply by pier count, and keep a small waste factor for spillage when filling tall forms.</div>
      <h2>Deck pier tips</h2>
      <p>Place tubes plumb on compacted base or footing details specified for your deck. Brace forms before pouring. For full framing takeoffs continue with the <a href="/calculators/deck-material-calculator/">deck material calculator</a>.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using outside diameter instead of inside diameter.</li>
        <li>Forgetting to multiply by the number of piers.</li>
        <li>Pouring without bracing, which can ovalize thin forms.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p>The sonotube concrete calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'mulch-calculator': `
      <h2>Mulch formula</h2>
      <p>volume (cu ft) = length (ft) × width (ft) × (depth_inches ÷ 12). Bulk mulch is sold by the cubic yard (27 cu ft). Bagged mulch is usually 2 or 3 cubic feet. This calculator returns both so you can compare bulk delivery versus bags for small beds.</p>
      <h2>Worked example</h2>
      <p>A 20 × 5 ft bed at 3 inches needs 100 × 0.25 = 25 cu ft ≈ 0.93 cu yd, or thirteen 2 cu ft bags. At 2 inches the same bed needs about 16.7 cu ft—useful when refreshing an existing layer rather than starting bare soil.</p>
      <div class="table-scroll">
      <table>
        <caption>Coverage per bag at common depths</caption>
        <thead><tr><th>Bag</th><th>2 in deep</th><th>3 in deep</th><th>4 in deep</th></tr></thead>
        <tbody>
          <tr><td>2 cu ft</td><td>12 sq ft</td><td>8 sq ft</td><td>6 sq ft</td></tr>
          <tr><td>3 cu ft</td><td>18 sq ft</td><td>12 sq ft</td><td>9 sq ft</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Depth guide (summary)</h2>
      <p>University extension guidance commonly recommends about 2–3 inches of organic mulch for shrub and perennial beds. Keep mulch a few inches away from tree trunks and woody stems. See our <a href="/guides/mulch-depth-guide/">mulch depth guide</a> and the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a> for donut shapes.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Depth in inches must be converted to feet before multiplying by area. Over-mulching can smother roots and trap moisture against bark.</div>
      <h2>Bulk vs bags</h2>
      <p>Bulk is usually cheaper above roughly one cubic yard and reduces plastic waste. Bags are convenient for rooftop beds, small townhouses, and topping up. Ask your yard whether the product is dyed, hardwood, pine bark, or composted—water needs and fade rates differ.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Volcano mulching against trunks.</li>
        <li>Ordering for the wrong depth after settling (fresh mulch compresses).</li>
        <li>Ignoring pathways that also need coverage.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p>The mulch calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'mulch-calculator-tree-rings': `
      <h2>Tree ring formula</h2>
      <p>Area = π(R² − r²). Volume = area × depth. Example: outer diameter 6 ft (R=3), trunk keep-out 1 ft (r=0.5), depth 3": area ≈ 27.5 sq ft; volume ≈ 6.9 cu ft (~3–4 bags of 2 cu ft mulch).</p>
      <p>The inner diameter is not the trunk bark alone—leave a bare gap so mulch does not pile against the flare. Wider rings toward the dripline generally help roots more than deep piles near the stem.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Tree mulch is a donut, not a disk. Subtract the keep-out circle or you will overestimate volume and risk volcano mulching.</div>
      <div class="table-scroll">
      <table>
        <caption>Approx. 2 cu ft bags for a ring at 3 in deep (1 ft keep-out)</caption>
        <thead><tr><th>Outer diameter</th><th>Volume</th><th>Bags</th></tr></thead>
        <tbody>
          <tr><td>4 ft</td><td>~2.9 cu ft</td><td>~2</td></tr>
          <tr><td>6 ft</td><td>~6.9 cu ft</td><td>~4</td></tr>
          <tr><td>8 ft</td><td>~12.4 cu ft</td><td>~7</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Why volcano mulching hurts trees</h2>
      <p>Piling mulch against bark traps moisture, invites decay organisms and rodents, and can cause roots to grow up into the mulch. Extension services consistently recommend a wide, flat doughnut with the flare visible.</p>
      <h2>Worked comparison</h2>
      <p>A 4 ft outer ring around a 0.5 ft keep-out at 3" needs less than half the mulch of a 6 ft ring at the same depth. Measure what you can maintain—thin, wide coverage usually beats a tall mound.</p>
      <p>For rectangular beds switch to the <a href="/calculators/mulch-calculator/">bed mulch calculator</a>.</p>

      <h2>Assumptions and limits</h2>
      <p>The mulch calculator tree rings results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'gravel-calculator': `
      <h2>Gravel volume &amp; tonnage</h2>
      <p>Cubic yards = cu ft ÷ 27. Tons ≈ yards × (density lb/yd³ ÷ 2000). This tool defaults to about 2,700 lb/yd³ as a mid estimate for crushed stone; wet stone and different geologies vary. Confirm density with your supplier before ordering tons.</p>
      <h2>Worked example</h2>
      <p>A 20 × 10 ft path at 4 inches with 10% compaction allowance: area 200 sq ft; depth 0.333 ft; volume ≈ 73.3 cu ft ≈ 2.7 cu yd—roughly 3.6 tons at 2,700 lb/yd³. Driveways often need a thicker compacted section; see <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Order by cubic yards for volume, convert to tons with your yard’s density, and include compaction waste for trafficked surfaces.</div>
      <div class="table-scroll">
      <table>
        <caption>Illustrative tons per cubic yard (confirm with your yard)</caption>
        <thead><tr><th>Material</th><th>Approx. tons / yd³</th></tr></thead>
        <tbody>
          <tr><td>Pea gravel</td><td>~1.2–1.3</td></tr>
          <tr><td>#57 crushed stone</td><td>~1.3–1.4</td></tr>
          <tr><td>Crusher run / dense grade</td><td>~1.4–1.5</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Base vs surface stone</h2>
      <p>Angular crusher run locks when compacted and makes a strong base. Clean drain rock and rounded pea gravel behave differently under tires. Match the product to the layer—do not assume one stone type does every job.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Skipping fabric or drainage details on soft soils.</li>
        <li>Ordering surface stone without enough base depth.</li>
        <li>Using dry density while receiving wet material by the ton.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p>The gravel calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'topsoil-calculator': `
      <h2>Topsoil depth tips</h2>
      <p>Topsoil volume is area × depth. To add 2 inches over 500 sq ft: 500 × (2÷12) = 83.3 cu ft ≈ 3.1 cu yd. Screened topsoil is often sold by the yard; bagged soil helps small beds. Include ~10% for settling when filling raised grades.</p>
      <p>New garden beds often receive 4–8 inches of quality topsoil over subsoil. For lawn repair, thinner dressings (½–2") are common—avoid burying existing grass crowns too deeply. Ask whether the product is screened, blended, or compost-rich.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Measure average fill depth across the whole area. Deep low spots should be calculated separately so you do not under-order.</div>
      <h2>Worked example</h2>
      <p>Leveling 1,000 sq ft by an average of 1 inch needs about 83 cu ft ≈ 3.1 cu yd. Raising a 10 × 10 bed by 6 inches needs 50 cu ft ≈ 1.85 cu yd before waste.</p>
      <div class="table-scroll">
      <table>
        <caption>Quick conversions (before waste)</caption>
        <thead><tr><th>Volume</th><th>2 cu ft bags</th><th>Approx. tons*</th></tr></thead>
        <tbody>
          <tr><td>1 cu yd (27 cu ft)</td><td>~14 bags</td><td>~1.0–1.3</td></tr>
          <tr><td>2 cu yd</td><td>~27 bags</td><td>~2.0–2.6</td></tr>
          <tr><td>5 cu yd</td><td>~68 bags</td><td>~5–6.5</td></tr>
        </tbody>
      </table>
      </div>
      <p>*Density varies with moisture and blend—confirm with your supplier.</p>
      <h2>Choosing topsoil vs garden soil</h2>
      <p>For boxed beds use the <a href="/calculators/raised-bed-soil-calculator/">raised bed soil calculator</a>. For surface cover after planting, use the <a href="/calculators/mulch-calculator/">mulch calculator</a>.</p>

      <h2>Assumptions and limits</h2>
      <p>The topsoil calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

  `,
  'sand-calculator': `
      <h2>Sand vs gravel base</h2>
      <p>Sand volume uses length × width × depth. Paver bedding sand is often about 1 inch deep over a compacted gravel base. A 10×10 area at 1 inch is 8.3 cu ft (~0.31 cu yd). Add waste for screeding and corner cuts.</p>
      <p>Play sand, masonry sand, and concrete sand are not interchangeable. Use the product specified by your paver manufacturer or mix design. Pair this tool with the <a href="/calculators/paver-calculator/">paver calculator</a> for full patio takeoffs.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Sand is usually the leveling layer—structural support comes from compacted crushed stone beneath.</div>
      <h2>Worked example</h2>
      <p>A 12 × 10 ft patio with a 1" sand bed needs 120 × (1/12) = 10 cu ft ≈ 0.37 cu yd before waste. With 10% extra, budget about 0.41 cu yd.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using fine play sand where coarse bedding sand is specified.</li>
        <li>Skipping compaction of the gravel base so sand waves under traffic.</li>
        <li>Forgetting edge restraints that keep sand from migrating.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p>The sand calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Keep bedding sand dry while screeding; wet sand changes volume and makes consistent depth harder to hold.</p>
  `,
  'paver-calculator': `
      <h2>Counting method</h2>
      <p>Convert paver length and width to feet, divide total square footage by one paver’s area, then ceil to whole units. Add 5–10% waste for cuts (more for diagonal herringbone). Always buy a few extras for future repairs with the same dye lot when possible.</p>
      <h2>Worked example</h2>
      <p>A 10×10 patio with 12×12 inch pavers needs 100 pavers exactly, about 110 with 10% waste. Plan ~1" sand bed and several inches of compacted gravel base—this calculator estimates those volumes too.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Pattern choice changes waste more than most people expect. Straight stack is efficient; diagonals need a thicker waste budget.</div>
      <h2>Base checklist</h2>
      <ul>
        <li>Excavate to design depth including base and sand.</li>
        <li>Compact crushed stone in lifts.</li>
        <li>Screed bedding sand; do not use sand to correct a bad base.</li>
        <li>Install edge restraints before vibrating the surface.</li>
      </ul>
      <p>See also the <a href="/calculators/sand-calculator/">sand calculator</a> and <a href="/calculators/gravel-calculator/">gravel calculator</a>.</p>

      <div class="table-scroll">
      <table>
        <caption>Pavers per square foot (common face sizes)</caption>
        <thead><tr><th>Paver face</th><th>Pavers / sq ft</th></tr></thead>
        <tbody>
          <tr><td>4×8 in</td><td>4.5</td></tr>
          <tr><td>6×9 in</td><td>~2.7</td></tr>
          <tr><td>12×12 in</td><td>1.0</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The paver calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Dry-lay a few rows to confirm the bond pattern before cutting edge pieces so your waste percentage stays realistic.</p>
      <p>Measure the patio twice, mark square corners with a 3-4-5 triangle, and confirm slope for drainage away from the house before you excavate for the gravel base and bedding sand layers.</p>
  `,
  'fence-calculator': `
      <h2>Material takeoff logic</h2>
      <p>sections = ceil(length ÷ post spacing); posts = sections + 1; rails = sections × rails per section; pickets from face width and gap along the run. Default spacing of 8 ft is common for wood privacy panels; heavier or taller panels may need 6 ft.</p>
      <h2>Worked example</h2>
      <p>A 48 ft run at 8 ft spacing needs 6 sections, 7 posts, and 18 rails if you use 3 rails per bay. With 5.5" pickets and 0.5" gaps, picket pitch is 6", so pickets ≈ (48×12)/6 = 96. Budget concrete with the <a href="/calculators/concrete-calculator-post-holes/">post hole calculator</a>.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Posts equal sections plus one. Forget the end post and your rails will not land correctly.</div>
      <h2>Gates and corners</h2>
      <p>This estimator models a straight run. Add extra posts for gates, corners, and elevation breaks. Gate posts often use larger posts and more concrete—calculate those holes individually.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Ignoring slope (rackable panels vs stepped panels).</li>
        <li>Ordering pickets without a consistent gap plan.</li>
        <li>Underestimating concrete on windy corner posts.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Worked example: 100 ft privacy fence, 8 ft sections</caption>
        <thead><tr><th>Item</th><th>Count</th></tr></thead>
        <tbody>
          <tr><td>Sections</td><td>12.5 → plan 13 bays / adjust end</td></tr>
          <tr><td>Posts (sections + 1)</td><td>14 (before gates)</td></tr>
          <tr><td>Rails (3 per bay)</td><td>~39</td></tr>
          <tr><td>Post concrete</td><td>Use <a href="/calculators/concrete-calculator-post-holes/">post hole calculator</a></td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The fence calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Print or screenshot the results before you shop so post counts and picket estimates stay aligned when a second person helps load materials.</p>
  `,
  'deck-material-calculator': `
      <h2>Simple rectangular takeoff</h2>
      <p>Board rows ≈ deck width ÷ board face width (include the gap you will leave). Boards along the length depend on stock length. Joists at 16" on center are common, but composites and some spans require 12" o.c.—follow manufacturer span tables and local code.</p>
      <h2>Worked example</h2>
      <p>A 16 × 12 ft deck with 5.5" face boards needs ceil(12 ÷ (5.5/12)) ≈ 27 rows. With 12 ft boards matching the length, that is 27 deck boards, plus joists at 16" o.c. along 16 ft (13 joists) and 2 rim joists. Screw counts scale with linear feet—budget extras for leftovers and misdrives.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Enter the actual face width including gap. Using nominal 6" without the gap under-orders boards.</div>
      <h2>What this tool does not design</h2>
      <p>Stairs, multi-level decks, ledgers, beams, and footings need separate structural planning. Pair piers with the <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a> when estimating footing concrete.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Ignoring picture-frame borders that change board counts.</li>
        <li>Forgetting that hidden fastener systems change scrap rates.</li>
        <li>Spacing joists for lumber when using composite that needs tighter spacing.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Board length planning (buy common stock lengths)</caption>
        <thead><tr><th>Stock length</th><th>Best when…</th></tr></thead>
        <tbody>
          <tr><td>12 ft</td><td>Short spans / less waste on small decks</td></tr>
          <tr><td>16 ft</td><td>Matches many 12×16 footprints with fewer joints</td></tr>
          <tr><td>20 ft</td><td>Long runs when handling allows</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The deck material calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>


  `,
  'roof-pitch-calculator': `
      <h2>Pitch formulas</h2>
      <ul>
        <li>Pitch (in/12) = (rise÷run) × 12</li>
        <li>Degrees = arctan(rise÷run) × 180/π</li>
        <li>Area factor = √(1 + (rise÷run)²)</li>
      </ul>
      <p>A 6/12 pitch rises 6 inches for every 12 inches of run—about 26.6°. Multiply horizontal plan area by the area factor to estimate roof surface for shingles. Continue with the <a href="/calculators/roofing-shingles-calculator/">roofing shingles calculator</a>.</p>
      <h2>Worked example</h2>
      <p>Rise 8", run 12" → pitch 8/12, angle ≈ 33.7°, area factor ≈ 1.202. A 40 × 25 ft plan footprint has 1,000 sq ft horizontal and about 1,202 sq ft of roof surface before dormers and overhangs.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Pitch is rise over run, not “steepness” alone. The area factor is what connects geometry to material quantity.</div>
      <h2>Measuring safely</h2>
      <p>Prefer attic rafter measurements or drawings when possible. Roof surfaces are fall hazards—read <a href="/guides/how-to-measure-roof-pitch/">how to measure roof pitch</a> before climbing.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using degrees when a supplier asks for X-in-12 pitch.</li>
        <li>Forgetting that hips, valleys, and overhangs add surface beyond a simple rectangle.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Pitch → angle → area multiplier (rise / 12 run)</caption>
        <thead><tr><th>Pitch</th><th>Approx. degrees</th><th>Multiplier</th></tr></thead>
        <tbody>
          <tr><td>3/12</td><td>14.0°</td><td>1.031</td></tr>
          <tr><td>4/12</td><td>18.4°</td><td>1.054</td></tr>
          <tr><td>6/12</td><td>26.6°</td><td>1.118</td></tr>
          <tr><td>8/12</td><td>33.7°</td><td>1.202</td></tr>
          <tr><td>12/12</td><td>45.0°</td><td>1.414</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The roof pitch calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Record pitch as X-in-12 when talking to suppliers—many shingle specifications use that form instead of degrees.</p>
  `,
  'roofing-shingles-calculator': `
      <h2>Squares method</h2>
      <p>One roofing square = 100 sq ft of roof surface. Roof area ≈ plan area × pitch factor. Squares = roof area ÷ 100. Add 10–15% waste for starter, hips, valleys, and ridge. Most asphalt bundles cover about ⅓ square (3 bundles per square)—read the wrapper for exact coverage.</p>
      <h2>Worked example</h2>
      <p>Plan 40 × 25 ft at 6/12: factor √(1+0.25)=1.118. Roof area ≈ 1,118 sq ft ≈ 11.18 squares. With 10% waste → 12.3 squares ≈ 37 bundles at 3 per square.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Always convert plan area through the pitch factor before dividing by 100. Ordering from footprint alone underbuys shingles.</div>
      <h2>Limits of a rectangle model</h2>
      <p>Complex roofs need plane-by-plane takeoff. Use this estimator for simple gables and quick budgets, then verify with a roofer’s measurements. Find pitch first with the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a>.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Ignoring starter strip and ridge cap bundles.</li>
        <li>Assuming every bundle is exactly 1/3 square.</li>
        <li>Skipping underlayment and ice-barrier quantities in cold climates.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Squares, bundles, and waste rules of thumb</caption>
        <thead><tr><th>Item</th><th>Typical value</th></tr></thead>
        <tbody>
          <tr><td>1 square</td><td>100 sq ft of roof surface</td></tr>
          <tr><td>Bundles per square</td><td>~3 (asphalt)</td></tr>
          <tr><td>Waste — simple gable</td><td>~10%</td></tr>
          <tr><td>Waste — hip / complex</td><td>~15%</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The roofing shingles calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Separate ridge, hip, and starter products from field bundles when you place the order so waste factors stay clear.</p>
  `,
  'paint-calculator': `
      <h2>Coverage formula</h2>
      <p>Wall area for a rectangular room = 2 × (length + width) × height. Subtract doors (~20 sq ft) and windows (~15 sq ft each, adjustable). Gallons = paintable area × coats ÷ coverage. Default coverage is 350 sq ft/gallon per coat—porous or dramatic color changes may need more.</p>
      <h2>Worked example</h2>
      <p>A 14 × 12 × 8 ft room has wall area 2×(14+12)×8 = 416 sq ft. Minus 2 doors and 2 windows (40+30) → 346 sq ft paintable. Two coats at 350 sq ft/gal ≈ 1.98 gallons—buy 2 gallons plus a little for touch-ups, or 3 if changing from dark to light.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Coats multiply paint need linearly. Primer can reduce finish coats when covering stains or stark color shifts.</div>
      <h2>Ceilings and exteriors</h2>
      <p>This tool focuses on four walls. Add ceiling area (L×W) separately if you are painting it. Exterior siding with texture can cut effective coverage sharply—check the can.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using only floor area instead of wall area.</li>
        <li>Forgetting closets and hall returns.</li>
        <li>Assuming one gallon always covers 400 sq ft on rough plaster.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Gallons for common rooms (8 ft ceilings, 2 coats, ~350 sq ft/gal, one door + one window deducted)</caption>
        <thead><tr><th>Room</th><th>Approx. wall area</th><th>Gallons (2 coats)</th></tr></thead>
        <tbody>
          <tr><td>10×10</td><td>~300 sq ft</td><td>~1.7 gal</td></tr>
          <tr><td>12×12</td><td>~350 sq ft</td><td>~2.0 gal</td></tr>
          <tr><td>12×16</td><td>~430 sq ft</td><td>~2.5 gal</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The paint calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Buy all finish coats from the same batch when possible, and keep a labeled quart for touch-ups after furniture goes back in place.</p>
  `,
  'retaining-wall-calculator': `
      <h2>Face-area method</h2>
      <p>Courses = ceil(wall height ÷ block height). Blocks per course = ceil(wall length ÷ block length). Total = courses × blocks per course, then add waste. Default face size is 18" × 6", a common segmental block module—override with your block’s actual face dimensions.</p>
      <h2>Worked example</h2>
      <p>For a 20 ft long, 3 ft high wall with 18×6 inch blocks: courses = 6; blocks/course = ceil(20 ÷ 1.5) = 14; total = 84 blocks before waste. Base trench gravel is estimated from length × base width × base depth.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Taller walls and surcharges often need engineering and geogrid. Stay within manufacturer height limits for gravity walls.</div>
      <h2>Drainage matters</h2>
      <p>Segmental walls usually need free-draining backfill and outlet pipes. Do not backfill with heavy clay against the blocks. Use the <a href="/calculators/gravel-calculator/">gravel calculator</a> for larger drain-rock volumes.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Skipping compacted base leveling pads.</li>
        <li>Ignoring setback/batter requirements per course.</li>
        <li>Using landscape wall blocks beyond their rated height.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Blocks per sq ft of wall face (approx.)</caption>
        <thead><tr><th>Block face</th><th>Blocks / sq ft</th></tr></thead>
        <tbody>
          <tr><td>16×6 in</td><td>~1.5</td></tr>
          <tr><td>18×8 in</td><td>~1.0</td></tr>
          <tr><td>12×4 in</td><td>~3.0</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The retaining wall calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>Stake the wall alignment and check the first course with a level; block counts assume a level base trench.</p>
  `,
  'grass-seed-calculator': `
      <h2>Seeding rates</h2>
      <p>Seed needed = (lawn sq ft ÷ 1000) × rate. Cool-season blends often use about 3–4 lb/1000 sq ft for new lawns and roughly half that for overseeding. Species differ—tall fescue, Kentucky bluegrass, and ryegrass labels vary, so prefer the bag rate when it conflicts with defaults.</p>
      <h2>Worked example</h2>
      <p>A 50 × 20 ft yard is 1,000 sq ft. At 3.5 lb/1000 for a new lawn you need 3.5 lb of seed. Overseeding the same lawn at 1.75 lb/1000 needs 1.75 lb. Split large bags across multiple passes for even coverage.</p>
      <div class="table-scroll">
      <table>
        <caption>Illustrative rates (lb per 1,000 sq ft)—use your bag label</caption>
        <thead><tr><th>Job</th><th>Cool-season blend</th><th>Warm-season (example)</th></tr></thead>
        <tbody>
          <tr><td>New lawn</td><td>~4–8 lb</td><td>Follow sod/seed tag</td></tr>
          <tr><td>Overseed</td><td>~2–4 lb</td><td>Often lower than new</td></tr>
        </tbody>
      </table>
      </div>
      <div class="takeaway"><strong>Key takeaway:</strong> Do not use new-lawn rates when overseeding—excess seed increases competition and waste.</div>
      <h2>Timing and soil</h2>
      <p>Match species to sun, shade, and your region’s cool- or warm-season window. Topdressing with a light soil mix can improve seed-to-soil contact—estimate soil with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a> if you are spreading a wider dressing.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Seeding without soil contact (seed on thatch).</li>
        <li>Mowing new seedlings too early.</li>
        <li>Ignoring irrigation during establishment.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p>The grass seed calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>After seeding, keep the surface evenly moist through establishment; the calculator only sizes seed, not water or starter fertilizer.</p>
  `,
  'fertilizer-calculator': `
      <h2>Nitrogen math</h2>
      <p>Product fertilizer = (area÷1000) × (desired lb nitrogen per 1000 ÷ nitrogen fraction). Example: 1 lb N/1000 sq ft using a 25-0-5 product needs 4 lb of product per 1,000 sq ft because 1 ÷ 0.25 = 4. Never exceed label rates; slow-release nitrogen reduces burn risk.</p>
      <h2>Worked example</h2>
      <p>For 2,000 sq ft at 1 lb N/1000 with 30% nitrogen fertilizer: product per 1000 = 1/0.30 ≈ 3.33 lb; total ≈ 6.67 lb. A 40 lb bag covers multiple applications—store dry and calibrate your spreader.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> The first number in N-P-K is percent nitrogen by weight. That percentage is the bridge from agronomic N rates to bag pounds.</div>
      <h2>Environmental notes</h2>
      <p>Follow local fertilizer ordinances and keep product off hard surfaces. Pair timing with extension calendars for your grass type. Overseeding plans can use the <a href="/calculators/grass-seed-calculator/">grass seed calculator</a>.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Applying “bags per lawn” without reading N percent.</li>
        <li>Double-applying at edges and burning turf.</li>
        <li>Using garden vegetable rates on lawns (or the reverse).</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Product lb per 1 lb actual N (per 1,000 sq ft)</caption>
        <thead><tr><th>Analysis</th><th>Product lb for 1 lb N</th></tr></thead>
        <tbody>
          <tr><td>10-10-10</td><td>10 lb</td></tr>
          <tr><td>24-0-11</td><td>~4.2 lb</td></tr>
          <tr><td>30-0-4</td><td>~3.3 lb</td></tr>
          <tr><td>32-0-4</td><td>~3.1 lb</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The fertilizer calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>If your bag lists coverage in square feet instead of an N rate, convert using the label math, then confirm the nitrogen percent still matches what you typed.</p>
  `,
  'raised-bed-soil-calculator': `
      <h2>Measuring interior dimensions</h2>
      <p>Raised bed soil volume = interior length × width × fill depth. Use inside dimensions. An 8×4 ft bed 12 inches deep needs 32 cu ft (~1.2 cu yd). Deep beds can use bulk blends for most of the volume and a finer mix near the root zone.</p>
      <h2>Worked example</h2>
      <p>Two 8×4×12" beds need 64 cu ft ≈ 2.4 cu yd. If you buy 1.5 cu ft bags, that is about 43 bags—bulk delivery is usually cheaper at this scale. Mel’s Mix style blends combine compost, aeration material, and soil in recipes you can scale with these volumes.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Measure the soil cavity, not the outside of the lumber. Thick boards meaningfully reduce interior width.</div>
      <h2>Mulch after planting</h2>
      <p>After beds are filled and planted, estimate surface mulch separately with the <a href="/calculators/mulch-calculator/">mulch calculator</a> so you do not starve the soil volume budget.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Filling only with lightweight potting mix in very deep beds (costly and can dry out).</li>
        <li>Using pure play sand as the only fill.</li>
        <li>Forgetting that soil settles—budget a top-up the following season.</li>
      </ul>

      <div class="table-scroll">
      <table>
        <caption>Common bed volumes (before waste)</caption>
        <thead><tr><th>Bed</th><th>6 in deep</th><th>12 in deep</th></tr></thead>
        <tbody>
          <tr><td>4×4 ft</td><td>8 cu ft</td><td>16 cu ft</td></tr>
          <tr><td>4×8 ft</td><td>16 cu ft</td><td>32 cu ft</td></tr>
          <tr><td>3×6 ft</td><td>9 cu ft</td><td>18 cu ft</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Assumptions and limits</h2>
      <p>The raised bed soil calculator results are planning estimates for rectangular or cylindrical shapes with uniform depth. Real sites have slopes, voids, and product variation. Always confirm coverage with the manufacturer label and local building practices before you buy large quantities.</p>
      <p>Unit toggles switch input labels between US imperial and metric. Shareable URLs store your inputs in the query string for convenience, while the canonical tag stays on the clean page URL so search engines do not index every parameter combination.</p>
      <h2>Shopping checklist</h2>
      <ul>
        <li>Write down the calculator outputs (volume, bags, or piece counts) and round up for waste.</li>
        <li>Call your supplier for density, dye lot, or delivery minimums when ordering bulk material.</li>
        <li>Check access for trucks, wheelbarrows, and staging space before delivery day.</li>
        <li>Photograph existing conditions so you can revisit dimensions if a helper measures differently.</li>
      </ul>
      <p class="meta-row">Formulas are unit-tested TypeScript—see <a href="/methodology/">methodology</a> for sources, limits, and the correction log.</p>

      <p>If you stage soil in bulk bags, note the delivered cubic feet on the receipt and compare it with this estimate after settling.</p>
  `,
};

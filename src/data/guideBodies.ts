/** Long-form HTML bodies for guide pages (FAQ is rendered separately from guideFaqs). */
export const guideBodies: Record<string, string> = {
  'how-much-concrete-for-fence-posts': `      <div class="takeaway"><strong>Key takeaway:</strong> Calculate cylinder volume for each hole, convert to bags with the published yield on your mix, then multiply by post count and add about 10% waste. Do not guess from post height alone—diameter and depth drive the order.</div>

      <h2>How it's calculated</h2>
      <p>Treat each fence-post hole as a cylinder. Convert the hole diameter to feet, then:</p>
      <p><strong>Volume (cu&nbsp;ft) ≈ π × (diameter ÷ 2)² × depth</strong>, with diameter and depth in feet.</p>
      <p>Example conversion: an 8-inch diameter is 8÷12 = 0.667&nbsp;ft, so the radius is 0.333&nbsp;ft. For a 2-foot depth, volume ≈ 3.1416 × 0.333² × 2 ≈ 0.70&nbsp;cu&nbsp;ft. Bags ≈ ceil(volume ÷ bag_yield). YardCalc’s typical yields match common bagged concrete coverage: about 0.30&nbsp;cu&nbsp;ft (40&nbsp;lb), 0.45&nbsp;cu&nbsp;ft (60&nbsp;lb), and 0.60&nbsp;cu&nbsp;ft (80&nbsp;lb). Multiply by the number of posts, then apply a waste factor (often about 10%) for over-excavation and spillage.</p>
      <p>Post count comes from fence length and spacing. A 96&nbsp;ft run with 8&nbsp;ft bays needs 13 posts if you count both end posts (12 bays + 1). Use the <a href="/calculators/fence-calculator/">fence calculator</a> for picket or panel layouts, then feed hole size into the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a>—not the rectangular <a href="/calculators/concrete-calculator/">slab calculator</a>.</p>

      <h2>Quick chart (approx., before waste)</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate concrete volume and 80&nbsp;lb bags per fence post hole</caption>
        <thead><tr><th>Hole diameter</th><th>Depth</th><th>Volume</th><th>80 lb bags</th></tr></thead>
        <tbody>
          <tr><td>8"</td><td>2 ft</td><td>0.70 cu ft</td><td>2</td></tr>
          <tr><td>10"</td><td>2.5 ft</td><td>1.36 cu ft</td><td>3</td></tr>
          <tr><td>12"</td><td>3 ft</td><td>2.36 cu ft</td><td>4</td></tr>
        </tbody>
      </table>
      </div>
      <p>Bag counts in the chart round up per hole using a 0.60&nbsp;cu&nbsp;ft yield. Your brand’s fast-setting mix may list a different yield—always check the bag.</p>

      <h2>Worked example: 12 posts</h2>
      <p>Twelve 8&quot; × 2&nbsp;ft holes ≈ 12 × 0.70 = 8.4&nbsp;cu&nbsp;ft. With 10% waste → about 9.2&nbsp;cu&nbsp;ft. At 0.60&nbsp;cu&nbsp;ft per 80&nbsp;lb bag that is ceil(9.2 ÷ 0.60) = 16 bags. At 0.45&nbsp;cu&nbsp;ft per 60&nbsp;lb bag, plan on 21 bags. That matches the same cylinder math the post-hole calculator uses.</p>

      <h2>Worked example: 48 ft privacy fence</h2>
      <p>At 8&nbsp;ft post spacing you need 7 posts (6 sections + end). If each hole is 10&quot; × 2.5&nbsp;ft, one hole is ~1.36&nbsp;cu&nbsp;ft. Seven holes ≈ 9.55&nbsp;cu&nbsp;ft before waste, about 10.5&nbsp;cu&nbsp;ft with 10% waste—roughly eighteen 60&nbsp;lb bags or fifteen 80&nbsp;lb bags. Brace posts plumb before you place mix, and slope the finished concrete so water drains away from the wood.</p>

      <h2>Step-by-step ordering</h2>
      <ol>
        <li>Count posts with the <a href="/calculators/fence-calculator/">fence calculator</a> (include corners and gates).</li>
        <li>Decide hole diameter (often about 3× post width as a rule of thumb) and depth (commonly ~⅓ above-ground height, below frost where required).</li>
        <li>Run the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a> for total cubic feet and bag counts.</li>
        <li>Add ~10% waste and buy matching outdoor concrete or fast-setting post mix—or order ready-mix for very large runs.</li>
        <li>Optional: place a few inches of gravel under the post for drainage, then set, brace, and fill per the bag instructions.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Call before you dig—utility locate services exist for a reason.</li>
        <li>Keep a spare bag or two on site; running short mid-set is expensive.</li>
        <li>Fast-setting mixes are convenient for posts; structural deck footings may need a different product and forms.</li>
        <li>For cardboard tube forms (deck piers), switch to the Sonotube workflow covered in the <a href="/guides/how-many-bags-of-concrete/">bags of concrete guide</a>.</li>
        <li>Compare bag math with the general <a href="/guides/concrete-for-10x10-slab/">10×10 slab guide</a> only when you are pouring pads—not for round holes.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Setting posts too shallow for wind load or frost heave.</li>
        <li>Filling to the top without sloping for drainage away from the post.</li>
        <li>Using interior drywall or mortar mix instead of outdoor concrete/setting mix.</li>
        <li>Using the slab tool for round holes (use the post-hole tool instead).</li>
        <li>Ignoring gate posts, which often need larger diameter or deeper embedment than line posts.</li>
        <li>Forgetting that gravel in the hole bottom displaces some concrete—measure the concrete column you actually place.</li>
      </ul>

      <h2>Choosing the mix and setting method</h2>
      <p>Most bagged post-setting products fall into two camps. General-purpose concrete is mixed with water to a stiff, workable consistency and shoveled around a braced post. Fast-setting post mixes are formulated so the dry mix can be poured around the post and then wetted, which saves a mixing tub but still demands that you follow the bag directions for the water amount. Neither style changes the volume math on this page; the label simply tells you how many bags a cubic foot requires and how long you have before the mix stiffens.</p>
      <p>Posts that carry heavy loads—gates, corner posts, or tall privacy panels that catch wind—often justify a larger hole diameter and a deeper embedment than a line post, not just more bags in the same hole. Treat the examples here as planning math for common residential line posts, and check the fence manufacturer or your local building department for gate-post and height requirements. Soft or sandy soil can also call for wider holes so the concrete collar has enough surface contact with undisturbed ground.</p>
      <p>A practical way to sanity-check your order: count the holes you dug, note the average diameter and depth with a tape, and rerun the calculator with those real numbers before you leave the store. Holes dug with a power auger are often slightly larger than the auger bit suggests, especially in loose soil, so measuring beats assuming. If you find the holes average an inch wider than planned, the extra concrete adds up quickly across a long fence line.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Hire a fencing or concrete contractor when soil is unstable, the fence is tall or on a steep grade, property lines are disputed, or local code requires engineered footings. Wear eye and hand protection when mixing cement products; avoid skin contact with wet concrete. Depth below frost, setback rules, and HOA limits are local—this page is a planning estimate, not a building-code opinion. Confirm requirements with your building department before you dig.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://quikrete.com/athome/settingposts.asp" rel="noopener noreferrer">QUIKRETE – Setting posts in concrete</a></li>
        <li><a href="https://www.quikrete.com/calculator/main.asp" rel="noopener noreferrer">QUIKRETE calculator &amp; yields</a></li>
        <li><a href="https://sakrete.com/resources/calculators/" rel="noopener noreferrer">Sakrete concrete calculators</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC landscape resources</a></li>
      </ul>
  `,

  'mulch-depth-guide': `      <div class="takeaway"><strong>Key takeaway:</strong> Most flower and shrub beds do well with about 2–3 inches of organic mulch. Tree rings use a similar depth in a wide donut kept off the trunk flare. Depth drives volume—measure area first, then multiply by depth in feet.</div>

      <p>This guide answers “how deep,” not only “how many bags.” For quantities on common rectangles, see the <a href="/guides/mulch-for-common-garden-beds/">common bed sizes chart</a>. For custom shapes, use the <a href="/calculators/mulch-calculator/">mulch calculator</a> or the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a>.</p>

      <h2>Recommended depths</h2>
      <div class="table-scroll">
      <table>
        <caption>Typical organic mulch depths by landscape area</caption>
        <thead><tr><th>Area</th><th>Typical depth</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Shrub &amp; perennial beds</td><td>2–3"</td><td>Replenish as it decomposes</td></tr>
          <tr><td>Tree rings</td><td>2–3"</td><td>Keep clear of trunk bark</td></tr>
          <tr><td>Paths (wood chips)</td><td>3–4"</td><td>Expect compaction under foot traffic</td></tr>
        </tbody>
      </table>
      </div>
      <p>University extension publications consistently land near the 2–3&nbsp;inch range for landscape beds. Treat thicker “set it and forget it” layers as a risk for water shedding and oxygen restriction around roots—not as a shortcut. Inorganic options such as gravel mulch behave differently: they do not feed soil life the way shredded bark does, they can heat beds in full sun, and they are harder to remove if you change the planting plan. Choose organic mulch when soil improvement is part of the goal.</p>
      <p>Season matters. In hot, dry climates a full 3-inch organic layer helps hold moisture through summer; in wet, poorly drained beds a slightly thinner layer (closer to 2&nbsp;inches) can reduce prolonged soil saturation at the surface. Refresh depth after winter winds and decomposition rather than adding a fixed number of bags every spring without measuring what is already there.</p>

      <h2>How volume follows from depth</h2>
      <p><strong>Cubic feet = area (sq&nbsp;ft) × (depth_inches ÷ 12).</strong> Cubic yards = cubic feet ÷ 27. At 3&nbsp;inches (0.25&nbsp;ft), each 100&nbsp;sq&nbsp;ft needs 25&nbsp;cu&nbsp;ft (≈0.93&nbsp;cu&nbsp;yd). At 2&nbsp;inches, the same 100&nbsp;sq&nbsp;ft needs about 16.7&nbsp;cu&nbsp;ft (≈0.62&nbsp;cu&nbsp;yd). Bag counts for 2&nbsp;cu&nbsp;ft bags are ceil(cu&nbsp;ft ÷ 2).</p>
      <p>Depth errors are costly: ordering for 4&nbsp;inches when you only need 3&nbsp;inches wastes about one-third extra material. Measure the depth you intend to maintain after settling, not the fluffy height right out of the bag.</p>

      <h2>Worked example: 20 × 5 ft bed</h2>
      <p>A 20 × 5&nbsp;ft bed is 100&nbsp;sq&nbsp;ft. At 3&nbsp;inches: 100 × 0.25 = 25&nbsp;cu&nbsp;ft ≈ thirteen 2&nbsp;cu&nbsp;ft bags. At 2&nbsp;inches: 100 × (2÷12) ≈ 16.7&nbsp;cu&nbsp;ft ≈ nine 2&nbsp;cu&nbsp;ft bags. Split irregular beds into rectangles and add the volumes—same method the calculator uses.</p>

      <h2>Worked example: tree ring</h2>
      <p>Suppose you mulch a ring with a 6&nbsp;ft outer diameter and leave a 1.5&nbsp;ft clear circle at the trunk, 3&nbsp;inches deep. Outer area ≈ π × 3² ≈ 28.3&nbsp;sq&nbsp;ft; inner opening ≈ π × 0.75² ≈ 1.8&nbsp;sq&nbsp;ft; mulched area ≈ 26.5&nbsp;sq&nbsp;ft. Volume ≈ 26.5 × 0.25 ≈ 6.6&nbsp;cu&nbsp;ft (about four 2&nbsp;cu&nbsp;ft bags). The <a href="/calculators/mulch-calculator-tree-rings/">tree ring calculator</a> automates that donut math so you do not mulch the trunk space you should leave bare.</p>

      <h2>Tips</h2>
      <ul>
        <li>Water the soil before mulching so you are not sealing dust-dry ground under a thick blanket.</li>
        <li>Pull weeds first; mulch suppresses new germination better than it kills established weeds.</li>
        <li>Keep mulch a few inches back from siding and stems to reduce moisture and pest issues.</li>
        <li>Organic mulches shrink as they decompose—budget a light top-dress each year rather than a deep dump.</li>
        <li>Match mulch type to the job: shredded hardwood for beds, coarser chips for paths, and avoid piling anything against tree bark.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Volcano mulching against trunks.</li>
        <li>Installing 6&nbsp;inches “so it lasts longer,” then watching water shed off the surface.</li>
        <li>Measuring bed length but guessing width—pace both directions or use a tape.</li>
        <li>Ordering by bags without converting depth to feet (using 3 instead of 0.25).</li>
        <li>Ignoring paths and tree rings that share the same delivery truck but need different depths.</li>
      </ul>

      <h2>Comparing common mulch materials</h2>
      <p>Depth guidance assumes an organic, reasonably coarse material. Shredded hardwood bark knits together and stays put on slopes. Pine bark nuggets are lighter and float in heavy rain. Pine straw and similar needle mulches are common in parts of the Southeast and are usually spread lighter and fluffier. Arborist wood chips are inexpensive and good for paths and large areas, but they are coarser and can look rougher. Finished compost works as a thin nutrient-rich top dressing but breaks down faster and may not suppress weeds as long as a bark layer. When you read an extension recommendation, note which material it describes before copying the number.</p>
      <p>Fresh, very fine material such as sawdust or fine grass clippings packed thickly can mat and shed water, so most guidance prefers coarser products for deep layers. Dyed mulches are widely sold; if you are mulching food gardens, read the label and ask the supplier what the colorant and base wood are.</p>
      <h2>Refreshing instead of re-burying</h2>
      <p>The most useful habit is to measure what is already in the bed. Push a ruler or trowel through the mulch to the soil and read the depth. If you still have two inches of loose material, rake it to break up any crust and add only enough to restore the target depth. Many beds need only a light top-up each year or two, while paths and high-traffic areas decompose faster. This approach saves money and avoids the slow suffocation of roots that comes from stacking new layers on top of old ones year after year.</p>
      <p>Landscape fabric under organic mulch is a debated topic; some extension publications caution that fabric can clog with debris and roots over time and complicate future planting. Whether you use it or not, keep the same depth targets and check your local extension office for climate-specific advice.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Call an arborist if trees show girdling roots, buried root flares, or chronic decline after years of deep mulch. Large properties may justify a landscape contractor for bulk delivery and even spreading. Mulch is generally not a permit item, but street trees and HOA rules may limit materials or colors. Wear dust protection when dumping dry bulk mulch, and keep piles away from building walls where spontaneous heating in large heaps can be a fire concern—spread large deliveries promptly.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed" rel="noopener noreferrer">Iowa State Extension – How to determine amount of mulch needed</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS – Choosing and installing mulches</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/mulch/" rel="noopener noreferrer">Clemson HGIC – Mulch</a></li>
        <li><a href="https://extension.msstate.edu/publications/mulches-for-the-landscape" rel="noopener noreferrer">Mississippi State Extension – Mulches for the landscape</a></li>
      </ul>
  `,

  'how-many-bags-of-concrete': `      <div class="takeaway"><strong>Key takeaway:</strong> Divide project volume in cubic feet by the bag yield (about 0.30 / 0.45 / 0.60&nbsp;cu&nbsp;ft for 40 / 60 / 80&nbsp;lb), round up, then add waste. An 80&nbsp;lb bag yields about 0.60&nbsp;cu&nbsp;ft—roughly 45 bags per cubic yard before waste.</div>

      <h2>Bag yield table</h2>
      <p>YardCalc uses the same approximate yields published for many QUIKRETE and Sakrete general-purpose mixes. Specialty high-strength or lightweight products can differ—read the label.</p>
      <div class="table-scroll">
      <table>
        <caption>Typical bagged concrete yields used by YardCalc</caption>
        <thead><tr><th>Bag</th><th>Yield (approx.)</th><th>Bags / cu yd</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 cu ft</td><td>~90</td></tr>
          <tr><td>60 lb</td><td>0.45 cu ft</td><td>~60</td></tr>
          <tr><td>80 lb</td><td>0.60 cu ft</td><td>~45</td></tr>
        </tbody>
      </table>
      </div>

      <h2>How it's calculated</h2>
      <p><strong>Bags = ceil(volume_cu_ft ÷ yield).</strong> Volume depends on shape:</p>
      <ul>
        <li><strong>Slab / footing:</strong> length × width × (thickness_inches ÷ 12)</li>
        <li><strong>Post hole / Sonotube:</strong> π × r² × height × count</li>
      </ul>
      <p>Divide cubic feet by 27 for cubic yards. Add 5–10% waste for uneven subgrade and spillage—Sakrete’s calculator guidance commonly reminds users to add about 10% for safety. Convert after waste: for example, 27&nbsp;cu&nbsp;ft × 1.10 = 29.7&nbsp;cu&nbsp;ft → ceil(29.7 ÷ 0.60) = 50 bags of 80&nbsp;lb mix for one yard with 10% waste (versus ~45 bags with zero waste).</p>
      <p>Pick the right tool: <a href="/calculators/concrete-calculator/">concrete calculator</a> for slabs and steps, <a href="/calculators/concrete-calculator-post-holes/">post hole calculator</a> for fence posts, and <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a> for cardboard forms.</p>
      <p>Weight also matters for logistics. Forty-five 80&nbsp;lb bags are about 3,600&nbsp;lb of dry mix before water—roughly the payload of a small trailer trip or several SUV loads. Sixty-pound bags trade more bag count for easier lifting. If you are working alone, factor mixing time: even an efficient helper rarely places a full yard of bagged concrete as fast as a chute. That labor math is why the “about one cubic yard” ready-mix threshold is a rule of thumb, not a hard industry law.</p>
      <p>When comparing store prices, normalize to cost per cubic foot of yield, not cost per bag. An 80&nbsp;lb bag at 0.60&nbsp;cu&nbsp;ft and a 60&nbsp;lb bag at 0.45&nbsp;cu&nbsp;ft are different products; the cheaper bag on the shelf is not always the cheaper cubic foot in the form.</p>
      <p>Write the yield on your shopping list before you leave home. If the store only stocks a high-strength mix with a different coverage note, re-run the division rather than forcing the 0.60&nbsp;cu&nbsp;ft assumption.</p>

      <h2>Worked example: 10×10×4&quot; slab</h2>
      <p>10 × 10 × (4÷12) = 33.33&nbsp;cu&nbsp;ft ≈ 1.23&nbsp;cu&nbsp;yd. With 10% waste → 36.7&nbsp;cu&nbsp;ft. That is ceil(36.7 ÷ 0.60) = 62 bags of 80&nbsp;lb or ceil(36.7 ÷ 0.45) = 82 bags of 60&nbsp;lb. See the dedicated <a href="/guides/concrete-for-10x10-slab/">10×10 slab guide</a> for thickness charts and patio sizes.</p>

      <h2>Worked example: eight Sonotube piers</h2>
      <p>Eight 12-inch-diameter tubes, 4&nbsp;ft tall: one tube is π × 0.5² × 4 ≈ 3.14&nbsp;cu&nbsp;ft. Eight tubes ≈ 25.1&nbsp;cu&nbsp;ft before waste. With 5% waste (typical for formed cylinders) ≈ 26.4&nbsp;cu&nbsp;ft → about 44 bags of 80&nbsp;lb mix. That is near one cubic yard—worth pricing ready-mix if the truck can reach the pour.</p>

      <h2>Worked example: fence posts vs slab bags</h2>
      <p>People often search “how many bags of concrete” when they mean fence posts. A single 8&quot; × 2&nbsp;ft hole (~0.70&nbsp;cu&nbsp;ft) needs a couple of 80&nbsp;lb bags after rounding—not the sixty-plus bags of a patio. Always identify the shape first. The <a href="/guides/how-much-concrete-for-fence-posts/">fence post guide</a> and post-hole calculator keep cylinder jobs from inheriting slab charts.</p>

      <h2>Tips</h2>
      <ul>
        <li>Buy all bags from the same product line so color and strength stay consistent on visible slabs.</li>
        <li>Stage water, a mixing tub or mixer, and wheelbarrow routes before you open bags—cement waits for no one in hot weather.</li>
        <li>For fence posts, jump to the <a href="/guides/how-much-concrete-for-fence-posts/">fence post concrete guide</a> so you do not apply slab thickness math to round holes.</li>
        <li>Cold weather and hot weather change set times; follow the bag’s temperature notes.</li>
        <li>Ready-mix minimum loads vary by plant—call before you assume a short load is available.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Mixing inches and feet (treating a 4-inch slab as 4 feet thick).</li>
        <li>Using 45 bags per yard for an 80&nbsp;lb mix, then forgetting waste.</li>
        <li>Ordering exact yardage on rough soil with no contingency.</li>
        <li>Applying slab bag charts to post holes or Sonotubes.</li>
        <li>Ignoring that gravel base under a slab is a separate material order.</li>
      </ul>

      <h2>Choosing a mix and mixing method</h2>
      <p>Bag yield is only useful if the product matches the job. General-purpose concrete mix suits slabs, steps, and footings. High-early-strength and fast-setting products shorten wait times but may have a shorter working window. Mortar and sand mixes are different products and should not be substituted for concrete. Always confirm the label says the product is intended for your application, and read the stated yield and water quantity, because those numbers can differ between brands and between bag sizes.</p>
      <p>For bagged jobs of a few bags, a wheelbarrow or mixing tub and a hoe are common. Above about a dozen bags, many homeowners rent a mixer or price delivered ready-mix, because consistent water-to-mix ratios are hard to maintain by hand over dozens of batches. Too much water makes concrete easier to place but weaker and more prone to cracking, so measure water per bag rather than judging by eye.</p>
      <h2>Curing and weather</h2>
      <p>Placing the concrete is half the job. Many residential references recommend keeping fresh concrete moist for several days after finishing, often about a week, so it can gain strength; the bag and the ACI residential guidance linked below describe curing practices. Hot, dry, or windy days dry the surface too fast, and freezing temperatures can damage concrete that has not yet set. If the forecast is poor, move the pour date rather than gambling with a full order of bags you cannot return once they are opened.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Call a concrete contractor for structural footings, large driveways, stamped or colored finishes, or sites with poor access. Cement products are alkaline—wear gloves, eye protection, and long sleeves; wash skin promptly. Reinforcing steel, control-joint spacing, and thickness for vehicle loads are code- and engineer-driven. YardCalc estimates volume and bags only; it does not replace ACI guidance or a local building permit review. For residential concrete overview documents, see ACI resources linked below.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/calculator/main.asp" rel="noopener noreferrer">QUIKRETE calculator &amp; yields</a></li>
        <li><a href="https://sakrete.com/resources/calculators/" rel="noopener noreferrer">Sakrete calculators (includes ~10% safety note)</a></li>
        <li><a href="https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf" rel="noopener noreferrer">ACI 332.1R-18 preview – residential concrete</a></li>
        <li><a href="https://www.cement.org/" rel="noopener noreferrer">American Cement Association</a></li>
      </ul>
  `,

  'concrete-for-10x10-slab': `      <div class="takeaway"><strong>Key takeaway:</strong> A 10×10&nbsp;ft slab at 4&nbsp;inches is about 1.23&nbsp;cu&nbsp;yd (33.3&nbsp;cu&nbsp;ft) before waste. With YardCalc’s 10% waste factor, plan on roughly 62 bags of 80&nbsp;lb mix or 82 bags of 60&nbsp;lb mix. Gravel base is ordered separately.</div>

      <p>This page is a size-specific worked chart. For arbitrary dimensions use the <a href="/calculators/concrete-calculator/">concrete calculator</a>. It does not replace post-hole or Sonotube tools—see <a href="/guides/how-much-concrete-for-fence-posts/">fence post concrete</a> and <a href="/guides/how-many-bags-of-concrete/">bag yield charts</a> for those shapes.</p>
      <figure class="diagram">
        <img src="/diagrams/slab-dimensions.svg" width="960" height="540" alt="Diagram of a rectangular concrete slab showing length, width and thickness" loading="lazy" />
      </figure>

      <h2>How it's calculated</h2>
      <p><strong>Volume (cu&nbsp;ft) = 10 × 10 × (thickness_inches ÷ 12).</strong> Yards = cu&nbsp;ft ÷ 27. With waste: bags = ceil(cu&nbsp;ft × 1.10 ÷ yield) using ~0.60&nbsp;cu&nbsp;ft per 80&nbsp;lb bag and ~0.45&nbsp;cu&nbsp;ft per 60&nbsp;lb bag. At 4&nbsp;inches, thickness in feet is 4÷12 = 0.333&nbsp;ft, so volume = 100 × 0.333 = 33.3&nbsp;cu&nbsp;ft. Multiplying by 1.10 gives 36.7&nbsp;cu&nbsp;ft for ordering.</p>
      <p>That bag math matches the same TypeScript formulas behind the on-site calculator—so the chart below should agree with what you see when you enter 10 × 10 × 4&quot; with 10% waste.</p>
      <p>Why do some older charts show fewer bags? They sometimes omit waste, use a different yield assumption, or round aggressively. If a chart says “about 45 bags” for this slab, look closely: 45 bags of 80&nbsp;lb mix cover about 27&nbsp;cu&nbsp;ft—one cubic yard with no waste—which is less than a 10×10×4&quot; pour. Trust volume first, then bags.</p>
      <p>Finish planning with access in mind. A 10×10 patio behind a narrow side yard may force wheelbarrow staging even if ready-mix is priced well. Conversely, a front-yard pad with truck access makes short-load ready-mix attractive once you pass roughly a yard. Price both options with the same waste assumption so the comparison is fair.</p>

      <h2>10×10 slab chart</h2>
      <div class="table-scroll">
      <table>
        <caption>10×10 ft slab volume and approximate bags with 10% waste</caption>
        <thead><tr><th>Thickness</th><th>Cu ft</th><th>Cu yd</th><th>80 lb bags (+10%)</th><th>60 lb bags (+10%)</th></tr></thead>
        <tbody>
          <tr><td>4"</td><td>33.3</td><td>1.23</td><td>~62</td><td>~82</td></tr>
          <tr><td>5"</td><td>41.7</td><td>1.54</td><td>~77</td><td>~102</td></tr>
          <tr><td>6"</td><td>50.0</td><td>1.85</td><td>~92</td><td>~123</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Other common patio sizes (4&quot; thick, before waste)</h2>
      <div class="table-scroll">
      <table>
        <caption>Patio slab volume at 4 inches before waste</caption>
        <thead><tr><th>Size</th><th>Cu ft</th><th>Cu yd</th></tr></thead>
        <tbody>
          <tr><td>8×8</td><td>21.3</td><td>0.79</td></tr>
          <tr><td>10×12</td><td>40.0</td><td>1.48</td></tr>
          <tr><td>12×12</td><td>48.0</td><td>1.78</td></tr>
        </tbody>
      </table>
      </div>
      <p>Near or above one cubic yard, ready-mix often wins on labor if a truck can access the site. Always compact a gravel base separately—base volume is not included in slab concrete. Estimate base with the <a href="/calculators/gravel-calculator/">gravel calculator</a>.</p>

      <h2>Worked example: 10×10×4&quot; with base</h2>
      <p>Concrete: 33.3&nbsp;cu&nbsp;ft (1.23&nbsp;cu&nbsp;yd) before waste → 36.7&nbsp;cu&nbsp;ft with 10% → about sixty-two 80&nbsp;lb bags. If you also place 4&nbsp;inches of compacted gravel under the slab, gravel volume before waste is also 33.3&nbsp;cu&nbsp;ft (1.23&nbsp;cu&nbsp;yd). With 10% compaction/waste allowance ≈ 1.35&nbsp;cu&nbsp;yd. At YardCalc’s mid-range crushed-stone density (~2,700&nbsp;lb/cu&nbsp;yd), that is on the order of 1.8&nbsp;tons—confirm density with your yard.</p>

      <h2>Worked example: 10×10×6&quot; shed pad</h2>
      <p>Heavier shed pads sometimes use 6&nbsp;inches: 50&nbsp;cu&nbsp;ft (1.85&nbsp;cu&nbsp;yd) before waste → 55&nbsp;cu&nbsp;ft with 10% → about ninety-two 80&nbsp;lb bags or one hundred twenty-three 60&nbsp;lb bags. At that bag count, price a short-load ready-mix truck against all-day mixing.</p>
      <p>If the shed manufacturer specifies a thicker edge beam or pier footings under the skids, those volumes are additive. Sketch the thickened sections as separate rectangles, run the calculator once per section, and sum bags so you do not under-order the perimeter.</p>

      <h2>Tips</h2>
      <ul>
        <li>Form the slab carefully; bowed forms steal concrete and ruin edges.</li>
        <li>Plan control joints—rule-of-thumb spacing is often discussed in residential guides as roughly 2–3 times the thickness in feet (for example, a 4-inch slab might see joints on the order of 8–12&nbsp;ft), but follow local practice and ACI residential guidance.</li>
        <li>Dampening the subgrade helps in hot weather; avoid standing puddles.</li>
        <li>Order extra bags for steps or thickened edges if your design includes them—they are not in the flat 10×10 chart.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Forgetting waste and finishing one corner short.</li>
        <li>Including gravel depth inside the concrete thickness input.</li>
        <li>Using post-hole bag charts for a rectangular patio.</li>
        <li>Pouring on uncompacted fill that later settles and cracks the slab.</li>
        <li>Assuming 46 bags of 80&nbsp;lb mix covers a 10×10×4&quot; slab with waste—that under-orders versus 0.60&nbsp;cu&nbsp;ft yields (you need about 62).</li>
      </ul>

      <h2>What goes under and around the slab</h2>
      <p>The chart on this page covers only the concrete itself. A well-built 10×10 patio or shed pad usually also involves a compacted gravel base, forms around the perimeter, and sometimes welded wire or rebar, depending on local practice and the load. Reinforcement keeps cracks tight rather than preventing them, and the spacing and size are design decisions best taken from your local code or a contractor for anything structural.</p>
      <p>Where a new slab meets a house wall or an existing pad, builders commonly place an isolation or expansion joint material so the pieces can move independently. Skipping that detail is a frequent source of cracking at the contact line. Slope is another detail that is easy to forget: patios are typically given a slight fall away from the building so water drains, which means the concrete thickness at the high and low edges differs a little. Measure at several points and use the average thickness when you convert to cubic feet.</p>
      <p>Finishing and curing take planning too. Once bleed water leaves the surface, the slab is floated and troweled or broom-finished for traction. A broom finish is common outdoors because it is less slippery when wet. Then keep the surface from drying out too fast. If you only have the helpers and mixer capacity to place a small section at a time, consider splitting the slab with a form divider so each pour can be finished before it sets.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Hire a concrete contractor for driveway slabs, attached garage floors, structural foundations, or decorative finishes. Building departments often require permits for large pads and for any work tied to a structure. Reinforcement, vapor barriers, and thickness for vehicle loads must follow local code—not a volume chart. Wet concrete can burn skin; use PPE and keep children and pets away from the pour. This guide is for material estimating only.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/calculator/main.asp" rel="noopener noreferrer">QUIKRETE calculator</a></li>
        <li><a href="https://sakrete.com/resources/calculators/" rel="noopener noreferrer">Sakrete calculators</a></li>
        <li><a href="https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf" rel="noopener noreferrer">ACI 332.1R-18 preview</a></li>
      </ul>
  `,

  'mulch-for-common-garden-beds': `      <div class="takeaway"><strong>Key takeaway:</strong> At 3&nbsp;inches deep, a 4×8&nbsp;ft bed needs about 8&nbsp;cu&nbsp;ft of mulch (four 2&nbsp;cu&nbsp;ft bags). A 20×5 bed needs about 25&nbsp;cu&nbsp;ft (≈0.93&nbsp;cu&nbsp;yd). Depth guidance lives in the <a href="/guides/mulch-depth-guide/">mulch depth guide</a>—this page is the quantity chart.</div>

      <p>Customize odd shapes with the <a href="/calculators/mulch-calculator/">mulch calculator</a>. For trees, use the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a> so you subtract the trunk opening.</p>
      <figure class="diagram">
        <img src="/diagrams/mulch-bed-dimensions.svg" width="960" height="540" alt="Diagram of a garden bed mulch layer showing length, width and depth" loading="lazy" />
      </figure>

      <h2>How it's calculated</h2>
      <p><strong>Cu&nbsp;ft = length × width × (depth_inches ÷ 12).</strong> Yards = cu&nbsp;ft ÷ 27. Bags (2&nbsp;cu&nbsp;ft) = ceil(cu&nbsp;ft ÷ 2). Some regions sell 3&nbsp;cu&nbsp;ft bags—divide by 3 instead. Iowa State Extension walks through the same area × depth approach for garden beds; the arithmetic does not change with mulch brand, only with how settled the product is after spreading.</p>
      <p>At 2&nbsp;inches, volumes are two-thirds of the 3-inch figures. If you are only top-dressing an existing 1-inch layer up to 3&nbsp;inches, order the 2-inch difference—not a full new 3-inch blanket.</p>
      <p>Raised beds complicate the picture slightly: you mulch the soil surface inside the frame, not the outer footprint of the lumber. A 4×8 bed built with 2× lumber still has roughly 32&nbsp;sq&nbsp;ft of mulchable surface if you measure inside dimensions. Vegetable beds sometimes use finer compost or straw instead of chunky bark; the volume math is identical even when the material name changes.</p>
      <p>Color and texture affect how deep mulch looks. Fine, dark mulch can appear thicker than coarse chips at the same measured depth. Always verify with a ruler or a marked trowel rather than eyeballing from the patio. After the first rain, check depth again—fluffed bags settle.</p>

      <h2>Common bed chart at 3&quot; depth</h2>
      <div class="table-scroll">
      <table>
        <caption>Mulch volume for rectangular beds at 3 inches</caption>
        <thead><tr><th>Bed size</th><th>Sq ft</th><th>Cu ft</th><th>Cu yd</th><th>2 cu ft bags</th></tr></thead>
        <tbody>
          <tr><td>4×4</td><td>16</td><td>4.0</td><td>0.15</td><td>2</td></tr>
          <tr><td>4×8</td><td>32</td><td>8.0</td><td>0.30</td><td>4</td></tr>
          <tr><td>10×4</td><td>40</td><td>10.0</td><td>0.37</td><td>5</td></tr>
          <tr><td>12×3</td><td>36</td><td>9.0</td><td>0.33</td><td>5</td></tr>
          <tr><td>20×5</td><td>100</td><td>25.0</td><td>0.93</td><td>13</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Worked example: two 4×8 beds</h2>
      <p>Two raised beds, each 4×8 at 3&nbsp;inches: 2 × 8 = 16&nbsp;cu&nbsp;ft → eight 2&nbsp;cu&nbsp;ft bags. If you prefer 2&nbsp;inches for a lighter look, 2 × 5.33 ≈ 10.7&nbsp;cu&nbsp;ft → six bags. Buy one extra bag when color-matching matters; dye lots can vary between store runs.</p>

      <h2>Worked example: 12×3 border at 2&quot;</h2>
      <p>A long border: 12 × 3 = 36&nbsp;sq&nbsp;ft × (2÷12) = 6&nbsp;cu&nbsp;ft → three 2&nbsp;cu&nbsp;ft bags. The same border at 3&nbsp;inches needs 9&nbsp;cu&nbsp;ft (five bags). Paths beside the border often want thicker wood chips—price those separately so bed mulch and path chips can differ.</p>

      <h2>Bulk vs bags at a glance</h2>
      <p>Under about 0.5&nbsp;cu&nbsp;yd, bags usually win on convenience. Between 0.5 and 1&nbsp;cu&nbsp;yd, compare delivery fees—some yards charge a short-load premium that erases bulk savings. Above 1&nbsp;cu&nbsp;yd, bulk shredded hardwood is frequently cheaper per cubic foot if you can stage a pile and move it within a day or two. Whatever you buy, spread to the target depth from the <a href="/guides/mulch-depth-guide/">mulch depth guide</a> rather than emptying every bag onto one corner of the bed.</p>
      <p>When several beds share a truck, add the chart rows first, then round the combined yards upward. Ordering three separate “half yards” for three beds often costs more than one full yard split among them.</p>

      <h2>Tips</h2>
      <ul>
        <li>Measure inside the bed frame; outer landscape timber dimensions overstate planting area.</li>
        <li>Bulk mulch is usually sold by the cubic yard—round up when your chart shows 0.9&nbsp;cu&nbsp;yd.</li>
        <li>Fluffed bag mulch settles; rake to the target depth after watering.</li>
        <li>Keep mulch off vegetable stems that rot easily when buried.</li>
        <li>Read the <a href="/guides/mulch-depth-guide/">depth guide</a> before you decide that “more mulch” will reduce weeding forever.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using 3 as a multiplier instead of 0.25 when depth is 3&nbsp;inches.</li>
        <li>Ordering for tree rings with the rectangle chart and covering the trunk flare.</li>
        <li>Forgetting multiple beds that share one delivery.</li>
        <li>Comparing bag prices without checking whether bags are 1.5, 2, or 3&nbsp;cu&nbsp;ft.</li>
        <li>Spreading fresh, un-composted chips tight against tender perennials that can nitrogen-tie temporarily—mix or age chips when possible.</li>
      </ul>

      <h2>Measuring curved and irregular beds</h2>
      <p>The chart assumes tidy rectangles, but most real beds curve. A reliable shortcut is the average-width method: stretch a tape along the bed's centerline for the length, then measure the width at every few feet and average those readings. Multiply length by average width for square footage. For a kidney-shaped bed with widths of 3, 5, 6, 5, and 3 feet over a 20-foot length, the average width is about 4.4 feet, giving roughly 88 square feet. That is close enough for ordering mulch, especially if you round up your yards.</p>
      <p>Another approach is to break the shape into rectangles and triangles, calculate each, and add. A circle or semicircle uses π × radius². Whichever method you choose, write the numbers down so you can reuse them next season—measuring once and saving the square footage makes every future top-dress a thirty-second calculation.</p>
      <h2>Spacing the work through the year</h2>
      <p>Mulch is easier to spread when beds are clear of weeds and soil is moist, which is why many gardeners mulch in spring after the soil has warmed and again in fall if the layer has thinned. Timing varies by climate and plant type, so follow local extension advice for when to apply near tender perennials or newly seeded areas. If you have several bed sizes to cover, list each bed's square footage in a small table and total the cubic feet before you shop; one consolidated order is almost always cheaper and more color-consistent than several small ones.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Large estate beds, steep slopes, or properties with irrigation and lighting already installed may need a landscape crew to avoid damaging lines. Mulch deliveries can weigh well over a ton per cubic yard of dense product—protect lawns with plywood if a truck dumps on turf. There is rarely a building-code issue for garden mulch, but street-tree rules and wildfire-prone regions may restrict mulch type or placement against structures. Follow local fire-safe landscaping guidance where it applies.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed" rel="noopener noreferrer">Iowa State Extension – Mulch amount</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS mulch guide</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/mulch/" rel="noopener noreferrer">Clemson HGIC – Mulch</a></li>
      </ul>
  `,

  'gravel-types-for-driveways': `      <div class="takeaway"><strong>Key takeaway:</strong> Driveways usually need a compacted angular crushed-stone base (dense grade / crusher run) topped with a stable surface aggregate. Rounded pea gravel looks tidy but rolls under tires. Estimate volume with length × width × depth, then convert to tons using your yard’s density.</div>

      <h2>Common materials</h2>
      <ul>
        <li><strong>Crusher run / dense grade / road base:</strong> stone plus fines; locks when compacted—excellent structural base.</li>
        <li><strong>Clean crushed stone (#57 and similar):</strong> fewer fines; good drainage layers and some surface courses.</li>
        <li><strong>Pea gravel:</strong> rounded and decorative; poor as the only driving surface because particles migrate.</li>
        <li><strong>Recycled concrete aggregate:</strong> sometimes available locally; ask about gradation and contaminants.</li>
      </ul>
      <p>Product names vary by quarry. Bring photos of your project and ask for a base stone that compacts plus a surface stone rated for drive traffic—do not rely on bagged decorative pebble alone.</p>
      <p>Think in layers. A typical DIY gravel drive is not one homogeneous dump: a thicker compacted base carries loads, while a thinner angular surface course provides traction and a finished look. Mixing those jobs into a single uncompacted lift is a common reason drives rut in the first winter. On soft or clay soils, contractors often recommend geotextile under the base so stone does not punch into mud—another line item beyond the calculator’s pure volume output.</p>
      <p>Drainage and crown matter as much as stone type. Water that sits in the wheel paths pumps fines upward and creates potholes. A slight crown, open edges, or a defined ditch keeps the section dry. Clemson HGIC materials on permeable hardscapes and landscape water management are useful context when you are choosing between impermeable pavement and a gravel or paver system that lets water infiltrate.</p>
      <p>If you later convert a gravel drive to pavers, the compacted crushed-stone base often remains useful beneath a sand setting bed—another reason to build the base correctly the first time.</p>

      <h2>How much to order</h2>
      <p><strong>Volume (cu&nbsp;ft) = length × width × (depth_inches ÷ 12).</strong> Yards = cu&nbsp;ft ÷ 27. Tons ≈ yards × (density_lb_per_cu_yd ÷ 2000). YardCalc’s gravel tool defaults near 2,700&nbsp;lb per cu&nbsp;yd for crushed stone as a mid-range planning density—quarries often quote 1.2–1.4&nbsp;tons per cu&nbsp;yd depending on moisture and rock type. Add roughly 10% for compaction and crowning unless your supplier says otherwise.</p>
      <p>Estimate with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. If you are building a paver driveway instead of loose gravel, you will also need a sand setting bed—see the <a href="/calculators/sand-calculator/">sand calculator</a> and <a href="/calculators/paver-calculator/">paver calculator</a>.</p>

      <h2>Worked example: 40 × 10 ft drive at 4 inches</h2>
      <p>Area = 400&nbsp;sq&nbsp;ft. Depth = 4÷12 = 0.333&nbsp;ft. Volume = 133.3&nbsp;cu&nbsp;ft ≈ 4.94&nbsp;cu&nbsp;yd before waste. With 10% extra ≈ 5.4&nbsp;cu&nbsp;yd. At 2,700&nbsp;lb/cu&nbsp;yd that is about 7.3&nbsp;tons after waste—order using your yard’s tonnage table and expect crowning to consume a little more along the centerline.</p>

      <h2>Worked example: base plus surface</h2>
      <p>Same 40 × 10 footprint with 6&nbsp;inches of dense-grade base and 2&nbsp;inches of clean surface stone: base = 400 × 0.5 = 200&nbsp;cu&nbsp;ft ≈ 7.4&nbsp;cu&nbsp;yd; surface = 400 × (2÷12) ≈ 66.7&nbsp;cu&nbsp;ft ≈ 2.5&nbsp;cu&nbsp;yd. Compact the base in lifts before placing the surface course. Soft clay soils may need geotextile and deeper stone—that is a site judgment call beyond a simple volume chart.</p>

      <h2>Tips</h2>
      <ul>
        <li>Crown the drive slightly so water sheds to the edges.</li>
        <li>Compact in lifts; dumping one deep pile and driving over it once is not compaction.</li>
        <li>Edge restraints or timber borders reduce shoulder washout.</li>
        <li>Keep organic soil and mulch out of the stone—fines from topsoil muddy the base.</li>
        <li>For paver conversions, plan gravel base and sand bedding as separate line items.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using pea gravel as the entire section thickness.</li>
        <li>Ordering by the scoop without measuring length and width.</li>
        <li>Ignoring compaction loss and running short mid-project.</li>
        <li>Blocking drainage so the drive becomes a bathtub.</li>
        <li>Mixing sand-bed paver math into a loose-gravel drive (or the reverse).</li>
      </ul>

      <h2>Layer volume reference for a 40 × 10 ft drive</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate stone volume for a 400 sq ft driveway by compacted depth (before waste)</caption>
        <thead><tr><th>Depth</th><th>Cu ft</th><th>Cu yd</th><th>Tons at 2,700 lb/cu yd</th></tr></thead>
        <tbody>
          <tr><td>2"</td><td>66.7</td><td>2.47</td><td>~3.3</td></tr>
          <tr><td>4"</td><td>133.3</td><td>4.94</td><td>~6.7</td></tr>
          <tr><td>6"</td><td>200.0</td><td>7.41</td><td>~10.0</td></tr>
        </tbody>
      </table>
      </div>
      <p>The tonnage column uses a planning density only; your quarry's weight per cubic yard decides the actual ticket.</p>

      <h2>Questions to ask the quarry or landscape yard</h2>
      <p>Gravel names are not standardized nationwide, so the fastest way to get the right product is to describe your project and ask a few direct questions. Which stone do they recommend for a compacted base, and which for a surface layer? What is the maximum stone size, and how many fines does it contain? Is the material washed or unwashed? What is the typical weight per cubic yard when it is dry and when it is wet? Do they sell by the ton or by the yard, and what are the minimum delivery quantities and truck access requirements?</p>
      <p>Be ready to share your driveway length, width, slope, and soil type. A steeper drive will wash out faster with rounded stone, and a yard may suggest a binder-rich crusher run on the incline. If you will plow snow, tell them: a rigid base and slightly larger surface stone resist being scraped away by a blade, although some stone will always migrate to the edges.</p>
      <h2>Maintenance expectations</h2>
      <p>No gravel drive is permanent. Expect to rake it level, fill ruts, and add a thin top-up of stone periodically, with the frequency depending on traffic, drainage, and winter conditions. Weeds can establish in the fines; a base with good compaction and a crown makes them harder to take hold. Keeping vegetation and overhanging branches trimmed back lets sunlight and wind dry the surface after rain, which slows the formation of potholes. Budget a little stone each year rather than treating the first delivery as the last.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Call an excavator or paving contractor for long drives, steep grades, poor soils, heavy vehicles, or when stormwater rules limit runoff onto the street. Utility locates are mandatory before excavating. Gravel delivery trucks are heavy—confirm driveway aprons and septic locations can handle the load. Local jurisdictions may regulate curb cuts and drainage; this guide does not grant a permit. Wear eye protection when spreading stone, and keep helpers clear of loader buckets.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://hgic.clemson.edu/factsheet/an-introduction-to-porous-pavement/" rel="noopener noreferrer">Clemson HGIC – An introduction to porous pavement</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/water-management-in-the-home-landscape/" rel="noopener noreferrer">Clemson HGIC – Water management in the home landscape</a></li>
        <li><a href="https://hgic.clemson.edu/consider-using-permeable-surfaces-when-hardscaping-your-yard/" rel="noopener noreferrer">Clemson HGIC – Permeable surfaces when hardscaping</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/stabilized-construction-site-entrances/" rel="noopener noreferrer">Clemson HGIC – Stabilized construction site entrances (aggregate pads)</a></li>
      </ul>
  `,

  'how-to-measure-roof-pitch': `      <div class="takeaway"><strong>Key takeaway:</strong> Roof pitch is inches of rise per 12&nbsp;inches of run. Measure with a level and tape on a rafter or rake when possible. A 6-inch rise over 12&nbsp;inches of run is a 6/12 pitch (about 26.6°). Prefer attic measurements when climbing is unsafe.</div>

      <h2>Three practical methods</h2>
      <ol>
        <li><strong>On a rafter (attic):</strong> safest for many homes—measure rise over 12&quot; of run along the rafter bottom or with a level held horizontal.</li>
        <li><strong>On the roof surface or rake:</strong> only with proper fall protection and dry conditions; use a level and tape on a straight section.</li>
        <li><strong>From drawings:</strong> use the stated pitch or rise/run on section details when plans are available.</li>
      </ol>
      <p>Ground-based estimates and phone apps can ballpark pitch, but material orders deserve a direct measurement. If you cannot access the attic safely, hire a roofer rather than improvising on a steep slope.</p>
      <p>Pitch also shows up outside roofing invoices. Snow shedding, attic ventilation design, and even ladder placement change with steepness. University of Minnesota Extension notes that snow does not slide as easily on flatter roofs (about 3/12 or less)—a reminder that pitch is a performance characteristic, not just a number for shingle math. Still, measuring rise over run with a level remains the homeowner-friendly method for asphalt reroofs and simple gables.</p>

      <h2>How it's calculated</h2>
      <p><strong>Pitch (X-in-12) = (rise ÷ run) × 12</strong> when rise and run use the same units. <strong>Angle ≈ arctan(rise/run)</strong> in degrees. <strong>Area factor ≈ √(1 + (rise/run)²)</strong>—multiply plan (footprint) area by this factor to estimate slope surface area for shingles.</p>
      <p>Example: rise = 6&nbsp;in, run = 12&nbsp;in → pitch = 6/12, angle ≈ 26.57°, area factor ≈ 1.118. A 40 × 30&nbsp;ft rectangle in plan is 1,200&nbsp;sq&nbsp;ft footprint × 1.118 ≈ 1,342&nbsp;sq&nbsp;ft of roof surface before waste, hips, and valleys.</p>
      <p>Convert interactively with the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a>, then estimate bundles with the <a href="/calculators/roofing-shingles-calculator/">roofing shingles calculator</a> (1 square = 100&nbsp;sq&nbsp;ft; many asphalt bundles cover about ⅓ square).</p>

      <h2>Worked example: level-and-tape in the attic</h2>
      <p>Hold a 2-ft level against the bottom of a rafter so the bubble is centered (true horizontal). From the downhill end of the level, measure vertically up to the rafter at the 12-inch mark along the level. If that vertical measurement is 5&nbsp;inches, the pitch is 5/12. Enter 5 and 12 in the pitch calculator to confirm angle (~22.6°) and area factor (~1.083).</p>

      <h2>Worked example: pitch to shingle squares</h2>
      <p>A simple gable with 1,200&nbsp;sq&nbsp;ft of plan area at 6/12: roof area ≈ 1,200 × 1.118 = 1,342&nbsp;sq&nbsp;ft = 13.42 squares. With 10% waste → about 14.8 squares. At 3 bundles per square, that is roughly 45 bundles before starter and ridge pieces. Always add waste for cut-heavy roofs; complex hips need more than a simple gable.</p>

      <h2>Pitch reference table</h2>
      <div class="table-scroll">
      <table>
        <caption>Common pitches with approximate angle and area factor</caption>
        <thead><tr><th>Pitch</th><th>Approx. angle</th><th>Area factor</th></tr></thead>
        <tbody>
          <tr><td>4/12</td><td>18.4°</td><td>1.054</td></tr>
          <tr><td>6/12</td><td>26.6°</td><td>1.118</td></tr>
          <tr><td>8/12</td><td>33.7°</td><td>1.202</td></tr>
          <tr><td>12/12</td><td>45.0°</td><td>1.414</td></tr>
        </tbody>
      </table>
      </div>
      <p>Use the table for quick checks, then confirm with the calculator when ordering materials. A jump from 4/12 to 8/12 increases surface area by roughly 14% on the same footprint—easy to miss if you only measure the house length and width from the ground.</p>

      <h2>Tips</h2>
      <ul>
        <li>Measure more than one rafter; renovations sometimes mix pitches.</li>
        <li>Note units—mixing centimeters of rise with inches of run ruins the ratio.</li>
        <li>Low-slope roofs may need different underlayment or membrane systems; pitch drives product choice, not only quantity.</li>
        <li>Photograph the level reading so a supplier can sanity-check your number.</li>
        <li>Use pitch together with plan dimensions; pitch alone does not tell you how many squares to buy.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Walking a wet roof without fall protection to “quickly” check pitch.</li>
        <li>Reporting angle degrees when a supplier asked for X-in-12 (or the reverse).</li>
        <li>Using plan area as shingle area on a steep roof without an area factor.</li>
        <li>Measuring along the rafter slope and calling that “run” (run is horizontal).</li>
        <li>Linking roof projects to unrelated concrete bag charts—pitch is a geometry problem first.</li>
      </ul>

      <h2>Pitch terminology and product limits</h2>
      <p>Roofers often group slopes into low-slope, conventional, and steep ranges, and product choices change across those groups. Model residential codes such as the International Residential Code generally limit asphalt shingles to slopes of 2:12 or steeper and call for extra underlayment on lower slopes, and many manufacturers publish their own minimum pitches and installation details. Metal, tile, and membrane systems carry different minimums. Because adoption and local amendments vary, treat these as reasons to confirm requirements with your building department and the manufacturer, not as rules this page can settle for your address.</p>
      <h2>Improving measurement accuracy</h2>
      <p>Small errors in rise multiply across the roof. Use a level long enough to hold true, confirm that the bubble is centered, and measure the vertical distance at exactly 12 inches of horizontal run, not along the slope of the level. Round your reading to the nearest half inch and repeat on two or three rafters. If the numbers differ by more than a half inch or so, the roof may have sagging members or an addition with a different slope, and each plane should be treated separately.</p>
      <p>If you only have a photo or plan, you can still estimate pitch from drawn rise and run, but treat the result as a draft number. Orders for materials deserve a direct tape-and-level check, and a roofing contractor's measurement or aerial-report service can add confidence on complex hip-and-valley roofs. Always write down which plane you measured so your shingle estimate maps to the right section of the roof.</p>

      <h2>When to call a pro / safety / codes</h2>
      <div class="takeaway"><strong>Safety:</strong> Never walk a wet, frosty, or steep roof without training and fall protection. Hire a pro when in doubt.</div>
      <p>Roofing work is among the more hazardous homeowner DIY jobs. Call a licensed roofing contractor for steep pitches, multi-story homes, fragile shingles, skylight work, or when local code requires permitted reroofs with specific underlayment and ventilation details. Structural changes to rafters need an engineer or qualified contractor. YardCalc helps with pitch math and shingle estimating only—it does not inspect structure, ice-dam risk, or wind uplift ratings.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://extension.umn.edu/agriculture/farm-operations-and-systems/farm-safety/roof-collapses-from-snow-and-ice" rel="noopener noreferrer">University of Minnesota Extension – Roof pitch and snow buildup context</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/gardening-slopes-and-hillsides" rel="noopener noreferrer">Iowa State Extension – Rise-over-run slope measurement (gradient method)</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC – Home &amp; garden information hub</a></li>
      </ul>
  `,

  'grass-seed-per-sq-ft': `      <div class="takeaway"><strong>Key takeaway:</strong> Bag labels list grass seed in pounds per 1,000 square feet—not a single universal ounces-per-square-foot rate. Convert area ÷ 1,000 × label rate (new lawn vs overseed differ). Species blends vary widely; always follow the seed bag and local extension guidance.</div>

      <h2>How grass seed rates work</h2>
      <p>Retail grass seed is sold by weight. The practical unit for homeowners is <strong>pounds of seed per 1,000 square feet</strong>. To size a purchase you need two numbers: your lawn area in square feet, and the bag’s recommended rate for either a new lawn or overseeding. The formula in plain language is:</p>
      <p><strong>Seed (lb) = (area in sq ft ÷ 1,000) × label rate (lb per 1,000 sq ft).</strong></p>
      <p>There is no one “correct” ounces-per-square-foot figure that fits every grass type. Kentucky bluegrass, tall fescue, fine fescue, and perennial ryegrass germinate and tiller differently, so manufacturers and extension services publish different ranges. Iowa State Extension’s establishing-from-seed guidance, for example, lists mixture-specific rates that can run from roughly 1–1½ lb per 1,000 sq ft for 100% Kentucky bluegrass up to about 7–9 lb per 1,000 for tall fescue—illustrating why copying a neighbor’s bag rate can under- or over-seed your yard.</p>
      <p>YardCalc’s <a href="/calculators/grass-seed-calculator/">grass seed calculator</a> uses adjustable defaults in the common cool-season blend ballpark (about 3.5 lb per 1,000 for new lawn and about 1.75 lb per 1,000 for overseed). Those defaults are planning aids only. Replace them with the exact rate printed on the seed you buy.</p>

      <h2>Worked example: 50 × 40 ft lawn</h2>
      <p>A rectangular lawn measuring 50 ft by 40 ft is 2,000 square feet. Using the calculator’s default new-lawn rate of 3.5 lb per 1,000 sq ft:</p>
      <p>(2,000 ÷ 1,000) × 3.5 = <strong>7 lb of seed for a new lawn</strong>.</p>
      <p>At the default overseed rate of 1.75 lb per 1,000:</p>
      <p>(2,000 ÷ 1,000) × 1.75 = <strong>3.5 lb for overseeding</strong>.</p>
      <p>If your tall-fescue bag instead calls for 8 lb per 1,000 on bare soil, the same yard needs (2,000 ÷ 1,000) × 8 = 16 lb. That is more than double the cool-season blend default—another reason to trust the label over a generic chart.</p>
      <p>Before seeding, improve the seedbed. Thin thatch, rake bare spots, and consider a light topdressing of screened topsoil or compost so seed contacts soil. Estimate fill volume with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>, then compare product types in our <a href="/guides/topsoil-vs-garden-soil/">topsoil vs garden soil</a> guide. After establishment, nitrogen planning belongs with the <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">fertilizer nitrogen per 1,000 sq ft</a> guide and the <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a>.</p>

      <h2>Illustrative rate table (not a universal prescription)</h2>
      <div class="table-scroll">
      <table>
        <caption>Example seed amounts for a 2,000 sq ft lawn at selected rates (always verify your bag)</caption>
        <thead>
          <tr><th>Scenario</th><th>Rate (lb / 1,000 sq ft)</th><th>Seed for 2,000 sq ft</th></tr>
        </thead>
        <tbody>
          <tr><td>Cool-season blend, new (YardCalc default)</td><td>3.5</td><td>7.0 lb</td></tr>
          <tr><td>Cool-season blend, overseed (YardCalc default)</td><td>1.75</td><td>3.5 lb</td></tr>
          <tr><td>Example bluegrass-heavy mix (extension-style range)</td><td>~1–2.5</td><td>~2–5 lb</td></tr>
          <tr><td>Example tall fescue new lawn (extension-style range)</td><td>~7–9</td><td>~14–18 lb</td></tr>
        </tbody>
      </table>
      </div>
      <p>Treat the “extension-style” rows as orientation only. Your county’s climate, soil, and recommended cultivars may differ. Warm-season grasses (bermudagrass, zoysia, St. Augustine) often use vegetative planting or different seed products—read regional extension fact sheets rather than forcing cool-season math onto them.</p>

      <h2>Step-by-step: buy the right amount of seed</h2>
      <ol>
        <li>Measure length and width of each lawn rectangle (or break irregular shapes into rectangles). Multiply for square feet; add sections.</li>
        <li>Decide whether you are establishing bare soil (new rate) or thickening an existing stand (overseed rate).</li>
        <li>Read the seed bag for lb per 1,000 sq ft for your exact product and use case.</li>
        <li>Compute seed pounds with the formula above or the <a href="/calculators/grass-seed-calculator/">grass seed calculator</a>.</li>
        <li>Buy a little extra for thin spots and calibration error—many DIYers round up one bag size rather than running short mid-pass.</li>
        <li>Calibrate the spreader: divide seed into two halves and walk perpendicular passes for more even coverage.</li>
        <li>Keep the surface moist until seedlings establish; avoid letting a crust form that traps seed high and dry.</li>
      </ol>

      <h2>Tips for even coverage</h2>
      <ul>
        <li>Match spreader settings to the bag chart when provided; otherwise start conservative and do a test strip on a driveway to see distribution pattern.</li>
        <li>Mix seed thoroughly in the hopper—fines settle and can create striped germination.</li>
        <li>Flag irrigation heads and edges so you do not dump heavy rates in corners.</li>
        <li>Time cool-season seeding for local recommended windows (often late summer to early fall in many northern regions); spring windows are shorter and weedier.</li>
        <li>Pair seeding with soil testing before heavy fertilizer programs—seed needs contact and moisture first.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using a new-lawn rate on a dense existing turf (wastes seed; seedlings struggle for light).</li>
        <li>Assuming “oz per sq ft” from a blog equals every bag—convert from the printed lb/1,000 figure instead.</li>
        <li>Seeding onto hard, unrepaired soil without scarifying or topdressing.</li>
        <li>Buying the cheapest “contractor mix” without reading purity and germination percentages on the label.</li>
        <li>Skipping starter fertilizer guidance on the bag or applying nitrogen far above local limits.</li>
        <li>Watering so heavily that seed washes into clumps in low spots.</li>
      </ul>

      <h2>Reading the seed tag</h2>
      <p>Seed bags carry a tag with information that is required by state seed laws: the species and variety, the percentage of pure seed, the percentage of other crop seed, inert matter, and weed seed, the germination percentage, and the test date. Compare the pure seed and germination figures between brands, because a cheaper bag with a lot of inert matter delivers less live seed per pound. The tag also tells you whether the seed is coated; coated seed weighs more per piece, so the label rate matters more than any rule of thumb about handfuls.</p>
      <h2>Soil contact, watering, and timing</h2>
      <p>The best seed rate cannot compensate for poor contact. Rake to loosen the top layer, spread seed evenly, and lightly rake or roll so the seed touches soil, without burying small seed deeply. Keep the surface consistently moist until the grass is established; short, frequent light watering is a common recommendation for new seedings, then gradually less frequent and deeper watering. Timing depends on the grass type: cool-season grasses are generally seeded in late summer to early fall in many northern climates, while warm-season species are seeded in late spring into summer. Check local extension guidance for your region.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/files/inline-files/PM1072.pdf" rel="noopener noreferrer">Iowa State Extension – Establishing a Lawn from Seed (PM 1072)</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/all-about-tall-fescue-low-maintenance-alternative-kentucky-bluegrass" rel="noopener noreferrer">Iowa State Extension – Turf-type tall fescue seeding rates</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC – Home &amp; Garden Information Center</a></li>
        <li><a href="https://extension.psu.edu/recycling-turfgrass-clippings" rel="noopener noreferrer">Penn State Extension – Turfgrass fertility context (clippings &amp; nitrogen)</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/" rel="noopener noreferrer">UF/IFAS Gardening Solutions</a></li>
      </ul>
  `,

  'fertilizer-nitrogen-per-1000-sq-ft': `      <div class="takeaway"><strong>Key takeaway:</strong> Product pounds = (nitrogen pounds you want per 1,000 sq ft) ÷ (N% as a decimal). Example: 1 lb N with a 30-0-4 bag → 1 ÷ 0.30 ≈ 3.3 lb of product per 1,000 sq ft. Always follow the fertilizer label and any local turf nutrient laws; soil-test before routine phosphate.</div>

      <h2>How the nitrogen math works</h2>
      <p>Lawn fertilizers are labeled with three numbers—N-P-K—showing the percent by weight of nitrogen, phosphate (as P<sub>2</sub>O<sub>5</sub>), and potash (as K<sub>2</sub>O). Homeowners usually plan around <strong>pounds of actual nitrogen per 1,000 square feet</strong> per application or per year, then back-calculate how much bagged product to spread.</p>
      <p>Plain-language formula:</p>
      <p><strong>Product lb per 1,000 sq ft = N lb desired per 1,000 ÷ (N percent ÷ 100).</strong></p>
      <p>Then scale by area: <strong>Total product lb = (lawn sq ft ÷ 1,000) × product lb per 1,000.</strong></p>
      <p>YardCalc’s <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a> implements that relationship with adjustable nitrogen target, N%, bag size, and lawn dimensions. Defaults are for planning; your soil test report and product label override them.</p>
      <p>Extension guidance often discusses annual nitrogen ranges by grass species and maintenance intensity, split across the season—not one giant dump. Penn State Extension materials discuss annual nitrogen ranges for cool-season species and note that individual applications are commonly kept near or below about 1 lb N per 1,000 sq ft, with slow-release forms preferred for water quality. Some states (for example Pennsylvania’s fertilizer law for turf) set maximum nitrogen rates per application—check your jurisdiction before copying any example rate.</p>

      <h2>Worked example: 50 × 40 ft lawn, 30-0-4, 1 lb N per 1,000</h2>
      <p>Area = 50 × 40 = 2,000 sq ft. Target = 1 lb nitrogen per 1,000 sq ft. Fertilizer analysis = 30-0-4 (30% N).</p>
      <p>Product per 1,000 = 1 ÷ 0.30 ≈ 3.333 lb.</p>
      <p>Total product for 2,000 sq ft = 2 × 3.333 ≈ <strong>6.67 lb of 30-0-4</strong> (matches the fertilizer calculator output for these inputs).</p>
      <p>If the same nitrogen target used a 25-0-5 product instead, product per 1,000 = 1 ÷ 0.25 = 4 lb, and the 2,000 sq ft lawn would need about 8 lb of product. Lower N% means more pounds of bag to deliver the same nitrogen.</p>
      <p>Pair fertility with sound cultural care. Returning clippings recycles nutrients. Seeding thin areas is a separate calculation—see <a href="/guides/grass-seed-per-sq-ft/">grass seed per square foot</a> and the <a href="/calculators/grass-seed-calculator/">grass seed calculator</a>.</p>

      <h2>Annual budgets vs single applications</h2>
      <p>Homeowners often confuse “pounds of nitrogen per year” with “pounds per application.” A lawn that thrives on roughly 2 lb N per 1,000 sq ft per growing season (a watershed-friendly starting discussion point in some Penn State materials—not a mandate for every climate) might receive that total in two or three smaller applications. Splitting reduces surge growth and runoff risk compared with dumping the full annual budget on a single spring weekend.</p>
      <p>Enhanced-efficiency or slow-release nitrogen sources release more gradually. When a label lists both water-insoluble nitrogen and a maximum coverage chart, use the chart that matches your spreader and verify the implied nitrogen against any legal cap in your state. If the bag’s “covers 5,000 sq ft” claim implies more nitrogen per 1,000 than you intend—or than the law allows—choose a lighter setting or a different product rather than forcing the marketing coverage.</p>

      <h2>Quick conversion table</h2>
      <div class="table-scroll">
      <table>
        <caption>Product pounds per 1,000 sq ft to deliver 1 lb actual nitrogen (rule-of-thumb math)</caption>
        <thead>
          <tr><th>Fertilizer N%</th><th>Product lb / 1,000 for 1 lb N</th><th>Product for 2,000 sq ft</th></tr>
        </thead>
        <tbody>
          <tr><td>16%</td><td>6.25</td><td>12.5 lb</td></tr>
          <tr><td>20%</td><td>5.0</td><td>10.0 lb</td></tr>
          <tr><td>25%</td><td>4.0</td><td>8.0 lb</td></tr>
          <tr><td>30%</td><td>≈3.33</td><td>≈6.67 lb</td></tr>
          <tr><td>32%</td><td>3.125</td><td>6.25 lb</td></tr>
        </tbody>
      </table>
      </div>
      <p>If your target is 0.75 lb N per 1,000 instead of 1.0, multiply every product figure by 0.75. If the bag already prints “covers X sq ft,” verify that the implied nitrogen matches your plan and local limits.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Soil-test every few years for pH, phosphorus, and potassium; nitrogen is managed more by plant response and timing than by a single soil number.</li>
        <li>Choose an annual nitrogen budget appropriate for your grass and goals, then split it into multiple applications during active growth.</li>
        <li>Read the three-number analysis and any enhanced-efficiency (slow-release) claims on the label.</li>
        <li>Compute product pounds with the formula or the <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a>.</li>
        <li>Calibrate the spreader; keep product off hardscapes, waterways, and storm drains.</li>
        <li>Water in if the label says to; avoid applying before heavy runoff-producing storms.</li>
        <li>Reassess color and growth—dark green surge is not always healthier turf.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Prefer products with a meaningful slow-release nitrogen fraction when labels offer that option.</li>
        <li>Skip phosphorus unless a soil test or establishment/repair exception allows it under local rules.</li>
        <li>Raise mowing height within the grass’s recommended range; taller canopies often need less rescue fertility.</li>
        <li>Measure lawn area carefully—guessing “a quarter acre” can double your product buy.</li>
        <li>Store opened bags dry and sealed; caked fertilizer spreads poorly and rates drift.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Spreading “one bag per lawn” without doing N math for that analysis and acreage.</li>
        <li>Confusing product pounds with nitrogen pounds (they are not the same).</li>
        <li>Applying the full annual nitrogen budget in a single spring dump.</li>
        <li>Ignoring state or municipal fertilizer restrictions near water.</li>
        <li>Fertilizing drought-dormant turf expecting a miracle green-up.</li>
        <li>Using garden vegetable fertilizers with high phosphate on turf without a need.</li>
      </ul>

      <h2>Spreader settings, timing, and local rules</h2>
      <p>The pounds-of-product figure is only half of the job; the spreader has to deliver it evenly. Most bags print a spreader setting for popular models, but those are starting points. A simple calibration is to weigh out a known amount for a known test area, apply it, and see whether the spreader runs short or long. Overlap passes slightly at the edges to avoid stripes, and sweep stray granules off sidewalks and driveways so they do not wash into storm drains.</p>
      <p>Timing and rules vary. Some states and municipalities limit phosphorus use on lawns, restrict fertilizing near water or on frozen ground, or set seasonal blackout windows, and many university extension services give regional calendars. Water in the application as the label directs, and avoid applying right before heavy rain. When in doubt, follow your state's guidance and consider a soil test to see whether you need phosphorus or potassium at all.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://extension.psu.edu/spring-tips-for-a-watershed-friendly-yard" rel="noopener noreferrer">Penn State Extension – Watershed-friendly yard &amp; nitrogen timing</a></li>
        <li><a href="https://extension.psu.edu/recycling-turfgrass-clippings" rel="noopener noreferrer">Penn State Extension – Suggested N ranges for cool-season turf</a></li>
        <li><a href="https://www.pa.gov/agencies/pda/plants-land-water/fertilizer/homeowners-and-applicators" rel="noopener noreferrer">Pennsylvania PDA – Homeowner fertilizer limits &amp; label math example</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/" rel="noopener noreferrer">Iowa State Extension – Yard and Garden</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC</a></li>
      </ul>
  `,

  'raised-bed-soil-mix-4x8': `      <div class="takeaway"><strong>Key takeaway:</strong> Soil volume for a raised bed is length × width × depth (use interior dimensions). A 4×8 ft bed 12 in deep holds 32 cu ft (about 1.19 cu yd). Mix recipes vary—equal parts topsoil/compost/aeration media is a common DIY rule of thumb, while some extension sheets favor more topsoil with a smaller compost fraction. Check local guidance and bag labels.</div>

      <h2>How bed volume is calculated</h2>
      <p>Fill volume does not care about the brand of soil—geometry comes first:</p>
      <p><strong>Cubic feet = length (ft) × width (ft) × (depth in inches ÷ 12).</strong></p>
      <p><strong>Cubic yards = cubic feet ÷ 27.</strong></p>
      <p>Measure inside the frame. A “4×8” marketed kit can lose an inch or two to board thickness. Depth is the finished soil depth you want after settling—not the board height if you leave freeboard at the top.</p>
      <p>The <a href="/calculators/raised-bed-soil-calculator/">raised bed soil calculator</a> returns cubic feet, yards, and an approximate count of 1.5 cu ft bags for rectangular beds. For irregular topping or paths beside the bed, the <a href="/calculators/topsoil-calculator/">topsoil calculator</a> helps with bulk yards. After planting, mulch depth and bag counts are covered in the <a href="/guides/mulch-depth-guide/">mulch depth guide</a> and <a href="/guides/mulch-for-common-garden-beds/">mulch for common garden beds</a> chart. Choosing bagged products is easier once you understand <a href="/guides/topsoil-vs-garden-soil/">topsoil vs garden soil</a>.</p>

      <h2>Worked example: 4×8 bed at 12 in and 18 in</h2>
      <p>Interior footprint = 4 × 8 = 32 sq ft.</p>
      <p>At 12 in depth: 32 × (12÷12) = <strong>32 cu ft ≈ 1.185 cu yd</strong>. At 1.5 cu ft per bag that is about <strong>22 bags</strong> before you blend multiple products (matches raised-bed calculator output).</p>
      <p>At 18 in depth: 32 × 1.5 = <strong>48 cu ft ≈ 1.778 cu yd</strong>, roughly <strong>32</strong> of those 1.5 cu ft bags.</p>
      <p>If you follow a simple equal-parts rule of thumb (topsoil / compost / coarse aeration such as pine bark or coarse sand—recipes vary), each component is about one-third of the volume: ~10.7 cu ft each at 12 in depth. Iowa State Extension describes an excellent mix as equal parts topsoil, organic matter, and coarse sand, and also mentions a ~70% topsoil / ~30% compost option. Clemson HGIC emphasizes good topsoil plus compost commonly in about the 10–20% compost-by-volume range for many raised beds—showing that published recipes are not identical. Pick one coherent recipe and stick to it rather than stacking every internet blend at once.</p>

      <h2>Volume and bag planning table</h2>
      <div class="table-scroll">
      <table>
        <caption>4×8 ft raised bed fill volumes by soil depth (interior dimensions)</caption>
        <thead>
          <tr><th>Depth</th><th>Cu ft</th><th>Cu yd</th><th>~1.5 cu ft bags</th></tr>
        </thead>
        <tbody>
          <tr><td>6"</td><td>16</td><td>0.59</td><td>11</td></tr>
          <tr><td>8"</td><td>21.3</td><td>0.79</td><td>15</td></tr>
          <tr><td>12"</td><td>32</td><td>1.19</td><td>22</td></tr>
          <tr><td>18"</td><td>48</td><td>1.78</td><td>32</td></tr>
          <tr><td>24"</td><td>64</td><td>2.37</td><td>43</td></tr>
        </tbody>
      </table>
      </div>
      <p>Bulk delivery often becomes cheaper near or above one cubic yard, especially if you can wheelbarrow from the driveway. Bagged mixes win on small top-ups and when you need a specific soilless blend on a patio with no native soil contact.</p>

      <h2>Choosing depth for crops</h2>
      <p>Shallow-rooted salad greens can produce in surprisingly little media when watering is frequent, but tomatoes, peppers, and squash generally appreciate deeper rooting volume. If the bed sits on open ground and you loosen the native soil below, roots can continue downward—so a 10–12 in fill may behave deeper than the same fill on a patio with a solid barrier. On hardscape, plan the full root depth inside the box and favor mixes that drain freely so the bed does not become a stagnant tub after storms.</p>
      <p>Width matters for access: many gardeners keep beds near 3–4 ft wide so they never step on the growing media. A 4×8 rectangle is popular because lumber lengths are convenient and paths fit between parallel beds. Whatever size you build, calculate soil from the interior—decorative caps and exterior trim do not hold roots.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Build or place the frame on a level, well-drained spot; confirm interior length and width with a tape.</li>
        <li>Choose crop-appropriate depth (shallow greens vs deeper-rooted tomatoes)—many gardeners target roughly 10–12 in of quality media as a starting point, deeper when roots and drainage demand it.</li>
        <li>Calculate volume with the formula or raised-bed calculator.</li>
        <li>Select a mix recipe from extension guidance or a reputable bagged raised-bed mix; avoid untested contaminated fill.</li>
        <li>Loosen native soil at the base when the bed sits on ground so layers do not perch water.</li>
        <li>Fill in lifts, lightly firming—do not compact like a road base.</li>
        <li>Water to settle, top off, soil-test after settling, then mulch paths and bed surfaces as appropriate.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Order a little extra; mixes settle and compost volume shrinks over a season.</li>
        <li>Ask bulk yards about screening, weed seeds, and whether the “topsoil” is sandy loam or heavy clay.</li>
        <li>Keep treated lumber ratings appropriate for garden contact if you use pressure-treated sides—follow manufacturer and extension notes.</li>
        <li>Replenish organic matter annually; beds shrink as carbon decomposes.</li>
        <li>Use mulch to cut evaporation—see the mulch depth guide for 2–3 in bed norms.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Buying “4×8” volume using outside board dimensions.</li>
        <li>Filling only with pure compost or pure manure (can be too rich, salty, or fluffy).</li>
        <li>Creating a bathtub on compacted subgrade with no drainage path.</li>
        <li>Mixing unreliable units (inches of depth treated as feet).</li>
        <li>Assuming every bag labeled “garden soil” matches mineral topsoil—read the <a href="/guides/topsoil-vs-garden-soil/">comparison guide</a>.</li>
      </ul>

      <h2>Settling, top-offs, and weight</h2>
      <p>Freshly filled beds settle as air pockets collapse and organic matter breaks down, so it is normal to top off the bed an inch or two after the first season. Fill to just below the rim at first so water does not wash soil over the edge, and plan a small reserve of compost for later top-offs rather than overbuying soil on day one. Mix components in a wheelbarrow or tarp, not in layers, because abrupt texture differences can slow water movement.</p>
      <p>Soil is heavy, particularly when wet. A moist cubic foot of garden mix can weigh many pounds, so a full 4×8 bed is a substantial load for a deck, rooftop, or any structure not designed for it. Check the surface and the bed construction before filling. For delivery sizes over about one cubic yard, bulk soil is typically less expensive per cubic foot than bagged product, but you will need a place for the pile and a plan for moving it promptly—protect the pile with a tarp if rain is expected.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/faq/what-would-be-good-soil-mix-raised-bed" rel="noopener noreferrer">Iowa State Extension – Raised bed soil mix FAQ</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/raised-beds/" rel="noopener noreferrer">Clemson HGIC – Raised beds</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/soil-conditioning-establishing-a-successful-gardening-foundation/" rel="noopener noreferrer">Clemson HGIC – Soil conditioning</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/" rel="noopener noreferrer">UF/IFAS Gardening Solutions</a></li>
      </ul>
  `,

  'how-much-paint-for-a-room': `      <div class="takeaway"><strong>Key takeaway:</strong> Estimate wall area as perimeter × ceiling height, subtract doors and windows, then divide by label coverage per coat. Many interior paints list roughly 250–400 sq ft per gallon per coat (often planned near 350–400 on smooth primed walls)—always read your can. Multiply by the number of coats.</div>

      <h2>How room paint quantity is calculated</h2>
      <p>For a rectangular room:</p>
      <p><strong>Wall area = 2 × (length + width) × height.</strong></p>
      <p><strong>Paintable area ≈ wall area − door areas − window areas.</strong></p>
      <p><strong>Gallons per coat ≈ paintable area ÷ coverage (sq ft per gallon).</strong></p>
      <p><strong>Total gallons ≈ gallons per coat × coats.</strong></p>
      <p>YardCalc’s <a href="/calculators/paint-calculator/">paint calculator</a> uses that layout with default door and window sizes (about 20 and 15 sq ft each unless you override) and a default coverage of 350 sq ft per gallon—within the range many consumer labels publish. Behr’s how-to guidance, for example, states that one gallon of several BEHR Ultra or Premium Plus interior products covers about 250 to 400 sq ft per coat, with textured or drastic color changes needing more. Sherwin-Williams and other manufacturers publish similar label ranges; the can in your hand controls the buy.</p>
      <p>Ceilings, trim, and doors are separate takeoffs. This guide focuses on walls. Closets, hall returns, and accent walls should be measured individually so you do not under-order a specialty color.</p>

      <h2>Worked example: 12 × 14 ft room, 8 ft ceilings</h2>
      <p>Perimeter contribution: 2 × (12 + 14) = 52 ft. Wall area = 52 × 8 = <strong>416 sq ft</strong>.</p>
      <p>Subtract one door (20 sq ft) and two windows (2 × 15 = 30 sq ft): paintable = 416 − 50 = <strong>366 sq ft</strong>.</p>
      <p>At 350 sq ft per gallon: 366 ÷ 350 ≈ <strong>1.05 gallons for one coat</strong>. Two coats ≈ <strong>2.09 gallons</strong>—plan on buying three gallons so tint lots match and touch-up remains, or two gallons plus a quart if the store can match. These figures match the paint calculator for the same inputs.</p>
      <p>If the label’s practical coverage on your textured plaster is closer to 300 sq ft per gallon, two coats need (366 × 2) ÷ 300 ≈ 2.44 gallons—round up accordingly.</p>

      <h2>Coverage planning table</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate gallons for 366 sq ft paintable walls (12×14×8 example) by coverage and coats</caption>
        <thead>
          <tr><th>Coverage (sq ft/gal)</th><th>1 coat</th><th>2 coats</th></tr>
        </thead>
        <tbody>
          <tr><td>250</td><td>1.46</td><td>2.93</td></tr>
          <tr><td>300</td><td>1.22</td><td>2.44</td></tr>
          <tr><td>350</td><td>1.05</td><td>2.09</td></tr>
          <tr><td>400</td><td>0.92</td><td>1.83</td></tr>
        </tbody>
      </table>
      </div>
      <p>Dark-to-light color changes, unrepaired drywall, and bare wood often need primer plus two finish coats. “Paint-and-primer” marketing does not erase surface preparation requirements printed on the label.</p>

      <h2>Ceilings, trim, and accent walls</h2>
      <p>Ceiling paint is usually a separate product and a separate area: length × width, then apply the ceiling can’s coverage and coat count. Coffered or highly textured ceilings drink more paint than smooth drywall. Trim and doors are often measured in linear feet times an average width (for example, baseboard length × about 0.5 ft if the trim is roughly six inches tall)—or simply budget a quart or gallon of enamel based on experience once walls are ordered.</p>
      <p>Accent walls use the single-wall formula: wall width × height, minus openings on that wall only. Ordering a deep accent color in a tiny test size first is wise; coverage on saturated colors can sit toward the low end of the label range. If you change from a dark existing color to a pale one, plan on primer or an extra finish coat even when the wall area math looks modest.</p>
      <p>Open-concept spaces should be split into paintable planes. A long great-room may share paint color with a hall; measure each run of wall so you do not forget stairwells, pony walls, or the back of a freestanding fireplace surround.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Measure length, width, and ceiling height in feet.</li>
        <li>Count doors and windows; measure unusual openings if they differ from typical sizes.</li>
        <li>Compute paintable wall area (or use the <a href="/calculators/paint-calculator/">paint calculator</a>).</li>
        <li>Read coverage and recommended coats on the product data sheet or can.</li>
        <li>Divide and multiply for total gallons; round up to whole containers of the same tint batch.</li>
        <li>Add primer quantity separately when the label calls for it.</li>
        <li>Estimate trim linear feet later if you are brushing a contrasting enamel.</li>
      </ol>

      <h2>Surface prep that changes how much paint you need</h2>
      <p>Patched drywall, bare paper facing, glossy enamel, and nicotine-stained walls all affect how far a gallon goes. Sanding gloss, washing grease, and priming repairs usually improves finish uniformity and can reduce the urge to apply a third finish coat “just to hide.” Skipping prep rarely saves paint—it usually wastes it on uneven absorption and flashing.</p>
      <p>Roller nap thickness matters on texture: deeper texture holds more paint in the first pass. When in doubt, use the lower coverage number from the manufacturer’s range for the first coat estimate, then adjust after you see how the wall looks when dry.</p>

      <h2>Tips</h2>
      <ul>
        <li>Buy all wall paint for a continuous color at once; dye lots shift between batches.</li>
        <li>Use the lower end of the coverage range on rough textures and new drywall.</li>
        <li>Cut in edges first, maintain a wet edge when rolling, and respect recoat times.</li>
        <li>Ventilate; follow VOC and cleanup directions on the label.</li>
        <li>Keep a quart of leftover for future touch-ups, labeled with room and date.</li>
        <li>Box multiple gallons together in a clean pail so slight tint differences blend.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Ordering from floor area (length × width) instead of wall area.</li>
        <li>Forgetting a second coat in the gallon math.</li>
        <li>Ignoring doors/windows on small rooms (overbuys) or skipping them on large open plans with many openings (underbuys).</li>
        <li>Assuming 400 sq ft/gal on a porous unprimed surface.</li>
        <li>Mixing leftover sheens (flat vs eggshell) on the same wall.</li>
      </ul>

      <h2>Sheen, application method, and waste</h2>
      <p>Sheen and tools influence how far paint goes. Flat finishes hide wall flaws but scuff more easily; satin and eggshell wipe clean in kitchens and hallways. A roller with a thicker nap holds more paint and suits textured walls, but it applies more paint per square foot than a thin nap on smooth drywall. Airless sprayers can cover fast but typically waste more paint to overspray and cleanup than rolling does, so plan extra if you spray.</p>
      <p>Cutting in around trim and corners adds to usage, and so does paint left in trays, rollers, and brushes. A small buffer of around 10 percent is a common planning allowance. When a room has a dramatic color change, tinted primer can reduce the number of finish coats needed.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.behr.com/how-to/interior/determine-how-much-interior-paint-to-buy" rel="noopener noreferrer">BEHR – How much interior paint to buy (250–400 sq ft/gal guidance)</a></li>
        <li><a href="https://www.sherwin-williams.com/" rel="noopener noreferrer">Sherwin-Williams – Product labels &amp; coverage (verify on can)</a></li>
      </ul>
  `,

  'paver-base-gravel-and-sand-depth': `      <div class="takeaway"><strong>Key takeaway:</strong> Many DIY patio guides use a rule of thumb of about 4–6 inches of compacted gravel base plus about 1 inch of bedding sand under concrete pavers—then the paver thickness on top. Exact depths depend on soil, traffic, climate, and the paver manufacturer’s instructions or local code. Calculate each layer’s volume separately.</div>

      <h2>How base and sand volumes work</h2>
      <p>Paver projects are stacked systems: compacted subgrade, aggregate base, bedding sand, pavers, and joint sand. Volume for any uniform layer is:</p>
      <p><strong>Cubic feet = area (sq ft) × (depth inches ÷ 12).</strong></p>
      <p><strong>Cubic yards = cubic feet ÷ 27.</strong></p>
      <p>YardCalc’s <a href="/calculators/paver-calculator/">paver calculator</a> counts pavers and also estimates bedding sand and gravel base using adjustable depths (defaults: 1 in sand, 4 in base). Refine bulk orders with the <a href="/calculators/gravel-calculator/">gravel calculator</a> and <a href="/calculators/sand-calculator/">sand calculator</a>. Choosing angular crushed stone versus decorative rounded rock is covered conceptually in <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>—the same angular-vs-rounded logic applies to patio bases that must lock under compaction.</p>

      <h2>Worked example: 12 × 10 ft patio</h2>
      <p>Area = 120 sq ft. Using calculator defaults of 4 in compacted gravel base and 1 in bedding sand:</p>
      <ul>
        <li>Sand: 120 × (1÷12) = <strong>10 cu ft</strong> (about 0.37 cu yd).</li>
        <li>Base: 120 × (4÷12) ÷ 27 ≈ <strong>1.48 cu yd</strong> of gravel.</li>
      </ul>
      <p>If you thicken the base to 6 in for softer soil (still a planning example—not a site design): 120 × 0.5 ÷ 27 ≈ <strong>2.22 cu yd</strong> gravel, with sand unchanged at 10 cu ft. Order extra aggregate for edge restraints, compaction loss, and uneven excavation. Paver count for 12×12 in units on this footprint is 120 pieces before waste; with 10% waste the calculator returns 132—buy the waste factor your pattern needs (cuts on diagonals need more).</p>

      <h2>Layer depth reference table</h2>
      <div class="table-scroll">
      <table>
        <caption>Example material volumes for a 120 sq ft patio (rule-of-thumb depths—verify for your project)</caption>
        <thead>
          <tr><th>Layer</th><th>Depth</th><th>Volume</th></tr>
        </thead>
        <tbody>
          <tr><td>Bedding sand</td><td>1"</td><td>10 cu ft (0.37 cu yd)</td></tr>
          <tr><td>Gravel base</td><td>4"</td><td>≈1.48 cu yd</td></tr>
          <tr><td>Gravel base</td><td>6"</td><td>≈2.22 cu yd</td></tr>
          <tr><td>Excavation (4" base + 1" sand + 2.375" paver example)</td><td>~7.4"</td><td>Plan drainage slope too</td></tr>
        </tbody>
      </table>
      </div>
      <p>Excavation depth must also create the finished surface elevation you want relative to doors and yard drainage. Slope pavers to shed water per manufacturer guidance—do not trap runoff against siding.</p>

      <h2>Subgrade, geotextile, and edge restraint</h2>
      <p>Even perfect gravel depth fails on pumping mud. Excavate soft organic soil, compact the subgrade, and consider a geotextile separator when fines from below will migrate into the open-graded stone—follow site conditions and manufacturer notes rather than treating fabric as mandatory everywhere. Edge restraint (plastic spike-down, concrete curb, or other approved systems) keeps perimeter pavers from migrating; without it, joint lines open and the sand bed creeps.</p>
      <p>Compaction equipment should match the job size. Plate compactors are standard for residential patios; compact the base in lifts instead of placing all the stone at once and buzzing the top. When compacting on top of pavers, use protective pads if the paver producer requires them so you do not spall the surface.</p>
      <p>Climate matters: freeze–thaw regions punish trapped water. Drainage should move water through and out of the system, not store it in a bathtub excavation. In arid climates, dust control and joint sand loss from wind can be the bigger maintenance issue—still build a competent base so irrigation runoff does not undermine edges.</p>
      <p>For material intuition—angular crushed stone versus decorative rounded gravel—see <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>. The structural lesson transfers: interlocking particles outperform ball-bearing rock under loads. Always re-check the paver manufacturer’s current installation sheet before you excavate, because base and sand depths can differ by product line.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Confirm paver thickness and the manufacturer’s base/sand recommendations.</li>
        <li>Outline the patio; measure length and width; decide waste percent for cuts.</li>
        <li>Excavate to subgrade, removing soft spots; compact the native soil.</li>
        <li>Place geotextile if specified for your soil conditions.</li>
        <li>Install angular base gravel in lifts, compacting each lift to the target thickness.</li>
        <li>Screed a uniform bedding sand layer—typically about 1 in—without using sand to fix major base waves.</li>
        <li>Lay pavers, install edge restraint, compact, and sweep joint sand (polymeric only if the product instructions fit your climate and joints).</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Use crushed stone with fines (often sold as dense grade / crusher run) for bases that must lock—see the driveway gravel guide for material intuition.</li>
        <li>Keep sand bedding consistent; thick sand pockets settle and telegraph dips.</li>
        <li>Compact with a plate compactor rated for your paver type; use protective pads when required.</li>
        <li>Account for delivery minimums—1.5 cu yd on a ticket may be cheaper than multiple small loads.</li>
        <li>Check HOA and municipal rules for impermeable cover limits.</li>
        <li>String-line elevations before excavating so the finished patio meets door thresholds with the correct step-down.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Skipping compaction and blaming the pavers later.</li>
        <li>Using rounded pea gravel as the structural base.</li>
        <li>Bedding sand deeper than recommended to hide a bad base.</li>
        <li>Forgetting edge restraint so perimeter pavers creep.</li>
        <li>Ordering only pavers and estimating base “by eye.”</li>
        <li>Building a flat patio that ponds against the house instead of sloping away for drainage.</li>
      </ul>

      <h2>Slope, compaction, and joint sand</h2>
      <p>Patios should shed water. A frequently cited guideline is a slope of about one-quarter inch per foot, roughly 2 percent, directed away from buildings, but follow your paver manufacturer's instructions and any local requirements. Build that slope into the compacted base and screeded bedding layer instead of trying to correct it with sand, which should stay at a uniform depth. Compact the base in lifts, commonly in layers no thicker than about four inches, with a plate compactor, moistening dry aggregate slightly if the manufacturer advises.</p>
      <p>After the pavers are laid and cut, edge restraints keep the field from spreading, and joint sand is swept into the gaps and compacted. Polymeric sand can reduce weed growth and sand loss when it is installed according to its directions, while plain sand is cheaper but may require refilling. Order a bit more joint sand than the bedding estimate suggests, because it gets swept off the surface and into the joints repeatedly.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/" rel="noopener noreferrer">QUIKRETE – Concrete / landscape product resources</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC – Landscape installation resources</a></li>
        <li><a href="https://extension.psu.edu/" rel="noopener noreferrer">Penn State Extension</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/" rel="noopener noreferrer">Iowa State Extension – Yard and Garden</a></li>
      </ul>
  `,

  'deck-material-list-12x16': `      <div class="takeaway"><strong>Key takeaway:</strong> A simple 12×16 ft rectangular deck takeoff estimates deck boards from covering width ÷ board face width, joists from span ÷ spacing + 1, plus fasteners. YardCalc’s defaults use about 5.5 in effective board width and 16 in on-center joists—common planning assumptions, not a substitute for span tables or local code. Orientation of the 12 and 16 matters.</div>

      <h2>How a basic deck takeoff works</h2>
      <p>For a rectangular deck with boards running along the length dimension:</p>
      <ul>
        <li><strong>Board rows</strong> ≈ ceil(width ÷ board face width).</li>
        <li><strong>Boards per row</strong> ≈ ceil(length ÷ board stock length).</li>
        <li><strong>Deck boards</strong> = rows × boards per row.</li>
        <li><strong>Joists</strong> ≈ floor(length ÷ joist spacing) + 1 (plus separate rim/band joists in many layouts).</li>
      </ul>
      <p>The <a href="/calculators/deck-material-calculator/">deck material calculator</a> encodes that simplified model with defaults of 5.5 in board width (dimensional 6 in decking allowance for gap), 12 ft board length, 16 in joist spacing, and about two screws per board-foot. Real decks also need beams, posts, footings, ledger details, flashing, railings, and lateral bracing—none of which this planning list fully designs. Verify lumber species, grade, span, and fastener schedules against IRC span tables or engineered drawings, and pull permits where required.</p>
      <p>Ground-level pads and stairs often need concrete—see <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a> when estimating footing mix. Low retaining edges beside a patio-to-deck transition are a different system; compare with the <a href="/guides/retaining-wall-blocks-and-base/">retaining wall blocks and base</a> guide if you are holding soil, not framing lumber.</p>

      <h2>Worked example: 12 × 16 ft deck (boards along 12 ft)</h2>
      <p>Using calculator inputs length = 12 ft (board direction), width = 16 ft (across boards), 5.5 in face width, 12 ft boards, 16 in joist spacing:</p>
      <ul>
        <li>Area = <strong>192 sq ft</strong>.</li>
        <li>Rows = ceil(16 ÷ 5.5/12) = <strong>35 board rows</strong>; boards per row = 1 → <strong>35 deck boards</strong> (each 12 ft).</li>
        <li>Joists = floor(12 ÷ 16/12) + 1 = <strong>10 joists</strong>; rim joists counted separately as 2 in the tool.</li>
        <li>Board linear feet = 35 × 12 = 420; screws ≈ 840 at two per board-foot.</li>
      </ul>
      <p>If you reverse the framing so boards run the 16 ft direction (length = 16, width = 12), the same calculator returns more boards (54 of 12 ft stock with splices) and 13 joists—because board stock length and joist span changed. Always sketch which way decking runs before ordering.</p>

      <h2>Planning table (YardCalc defaults, boards along first dimension)</h2>
      <div class="table-scroll">
      <table>
        <caption>Illustrative decking counts for a 12×16 ft rectangle (5.5 in face, 12 ft boards, 16 in O.C.)</caption>
        <thead>
          <tr><th>Board run direction</th><th>Deck boards</th><th>Joists (field)</th><th>Board lin ft</th></tr>
        </thead>
        <tbody>
          <tr><td>Along 12 ft (cover 16 ft width)</td><td>35</td><td>10</td><td>420</td></tr>
          <tr><td>Along 16 ft (cover 12 ft width)</td><td>54</td><td>13</td><td>648</td></tr>
        </tbody>
      </table>
      </div>
      <p>Add waste for bad boards, picture-frame borders, and angle cuts. Composite decking may use different widths, hidden clips, and gapping rules—follow that brand’s installation guide rather than wood defaults.</p>

      <h2>Beyond boards: beams, posts, and footings</h2>
      <p>A board-and-joist shopping list is only the deck “skin and ribs.” Beams that carry joists, posts that carry beams, and footings that carry posts must be sized for tributary load, snow load where applicable, and species/grade. Many jurisdictions require permits and inspections for elevated decks. Ledger connections to houses need correct flashing and tension hardware; free-standing decks need adequate bracing against lateral movement.</p>
      <p>Footing volume is a concrete problem, not a decking problem. Once you know diameter and depth (often to below frost), estimate bags or yards with concrete tools and guides such as <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>. Do not pour footings on organic topsoil or leave cardboard tube forms unfilled to grade when the detail requires otherwise—follow local practice.</p>
      <p>Railings change the shopping list again: posts may need to land on framing with specific blocking, and baluster spacing is a life-safety rule, not aesthetics alone. Stairs need consistent rise/run within code tolerances. None of those counts come from the simple rectangular decking estimator, so sketch them early.</p>
      <p>If your deck meets a grade change or patio, you may also be holding soil with a short wall—different system entirely. See <a href="/guides/retaining-wall-blocks-and-base/">retaining wall blocks and base</a> rather than improvising landscape blocks as structural deck foundations.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Confirm finished deck size, height, ledger vs freestanding, and railing needs with local code.</li>
        <li>Choose decking direction for appearance and span.</li>
        <li>Run the <a href="/calculators/deck-material-calculator/">deck material calculator</a> with your board width and joist spacing.</li>
        <li>Size beams and posts from span tables or an engineer—do not guess from board count alone.</li>
        <li>Plan footings below frost where required; estimate concrete separately.</li>
        <li>Order fasteners rated for the lumber or composite system (and treated lumber compatibility).</li>
        <li>Dry-fit patterns, then fasten per manufacturer spacing diagrams.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>16 in on-center is common for many residential decks with suitable joist size—but span rating depends on species, grade, and load. Check tables.</li>
        <li>Crown joists up; align fastener rows for a cleaner look.</li>
        <li>Flash ledgers properly; deck ledger failures are a known safety issue when details are skipped.</li>
        <li>Account for stair stringers and landing framing as extra takeoffs.</li>
        <li>Stain or seal according to product instructions after moisture targets are met.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Ordering boards without deciding orientation and seam layout.</li>
        <li>Using interior fasteners on exterior treated lumber.</li>
        <li>Ignoring post-to-beam hardware and lateral load paths.</li>
        <li>Assuming the calculator replaces a permit set of drawings.</li>
        <li>Forgetting that railings can require stronger boundary joists or blocking.</li>
      </ul>

      <h2>Permits, footings, and guards</h2>
      <p>Deck projects commonly require a permit and inspections, and the rules cover items a board count cannot: footing size and depth, ledger attachment, joist and beam spans, stair geometry, and guards. Model codes generally call for guards when the walking surface is more than 30 inches above the ground, but local amendments differ, and this is exactly why permit review is worthwhile. Footing depth must reach below the local frost depth in cold climates, which also affects how much concrete you order. Confirm all of this with your building department before buying lumber.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.awc.org/" rel="noopener noreferrer">American Wood Council – Span resources / DCA guidance</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC – Outdoor structure topics</a></li>
        <li><a href="https://extension.psu.edu/" rel="noopener noreferrer">Penn State Extension</a></li>
      </ul>
  `,

  'retaining-wall-blocks-and-base': `      <div class="takeaway"><strong>Key takeaway:</strong> Block count ≈ courses × blocks per course, where courses = ceil(wall height ÷ block height) and blocks per course = ceil(wall length ÷ block length). Compacted gravel bases are typical for segmental walls, but taller walls, surcharges, and poor soils need engineering. Follow the block manufacturer’s installation manual and local codes.</div>

      <h2>How block and base estimates work</h2>
      <p>For a straight wall with uniform rectangular face blocks:</p>
      <p><strong>Courses = ceil(wall height ÷ block face height).</strong></p>
      <p><strong>Blocks per course = ceil(wall length ÷ block face length).</strong></p>
      <p><strong>Blocks = courses × blocks per course</strong> (then add waste for cuts and breakage).</p>
      <p>Base trench gravel volume ≈ wall length × trench width × trench depth (convert to yards by dividing cubic feet by 27).</p>
      <p>YardCalc’s <a href="/calculators/retaining-wall-calculator/">retaining wall calculator</a> defaults to common 18×6 in face blocks, 5% waste, and a gravel trench about 24 in wide by 6 in deep unless you change those inputs. Refine aggregate tonnage with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. Material choice echoes themes in <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a> and drainage layers used under <a href="/guides/paver-base-gravel-and-sand-depth/">paver base gravel and sand</a>.</p>
      <p>Segmental landscape walls often include buried base courses, geogrid at specified elevations, drainage pipe, and clean stone behind the blocks. Those components are specified by height and soil conditions—do not scale a 3 ft DIY patio wall detail to a 8 ft yard cut without professional design.</p>

      <h2>Worked example: 20 ft long × 3 ft exposed height</h2>
      <p>With 18 in long × 6 in tall face blocks:</p>
      <ul>
        <li>Courses = ceil(3 ÷ 0.5) = <strong>6 courses</strong>.</li>
        <li>Blocks per course = ceil(20 ÷ 1.5) = <strong>14</strong>.</li>
        <li>Blocks = 6 × 14 = <strong>84</strong>; with 5% waste ≈ <strong>89 blocks</strong>.</li>
        <li>Face area = 20 × 3 = 60 sq ft.</li>
        <li>Base gravel at 20 ft × 2 ft wide × 0.5 ft deep = 20 cu ft ≈ <strong>0.74 cu yd</strong>.</li>
      </ul>
      <p>These figures match the retaining-wall calculator defaults for a 20×3 wall. If your manufacturer requires an extra buried course, add that course to the block count even though it does not show in the exposed height.</p>

      <h2>Block planning table</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate block counts for 18×6 in face blocks (no waste; add ~5–10%)</caption>
        <thead>
          <tr><th>Wall L × H</th><th>Courses</th><th>Per course</th><th>Blocks</th></tr>
        </thead>
        <tbody>
          <tr><td>10 × 2 ft</td><td>4</td><td>7</td><td>28</td></tr>
          <tr><td>20 × 2 ft</td><td>4</td><td>14</td><td>56</td></tr>
          <tr><td>20 × 3 ft</td><td>6</td><td>14</td><td>84</td></tr>
          <tr><td>30 × 3 ft</td><td>6</td><td>20</td><td>120</td></tr>
        </tbody>
      </table>
      </div>
      <p>Curves, corners, and capped walls change counts. Cap units are often ordered as a separate linear-foot item.</p>

      <h2>Drainage, geogrid, and when DIY stops</h2>
      <p>Water is the quiet load behind many wall failures. A perforated drainpipe at the base of the drainage stone, outlets to daylight or an approved system, and free-draining backfill keep hydrostatic pressure down. Compacted clay jammed against the back of hollow blocks is a common mistake—follow the block producer’s backfill specification, which often calls for clean stone in a drainage zone.</p>
      <p>Geogrid extends the reinforced soil mass for taller segmental walls. Grid type, length, and vertical spacing are not guesswork; they come from the manufacturer’s engineered charts or a site-specific design. If your project exceeds the published maximum for a gravity (unreinforced) stack—or if a driveway, fence post footing, or slope sits above the wall—stop and get qualified design help.</p>
      <p>Base preparation deserves as much care as the visible face. Excavate to stable material, place angular gravel, and compact until the first course sits level (or correctly stepped on slopes). A crooked base course telegraphs all the way to the cap. For gravel selection intuition, read <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>; for related thin-layer patio bases (not wall backfill), see <a href="/guides/paver-base-gravel-and-sand-depth/">paver base gravel and sand depth</a>.</p>
      <p>Utilities, easements, and property lines also constrain walls. Call before you dig, and confirm that redirecting drainage will not send water onto a neighbor’s foundation.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Determine retained height, slope above/below, and any driveway or structure surcharge.</li>
        <li>Check whether the wall height triggers permit or engineering thresholds in your city.</li>
        <li>Select a block system and read its maximum unreinforced height tables.</li>
        <li>Estimate blocks and base gravel with the <a href="/calculators/retaining-wall-calculator/">retaining wall calculator</a>.</li>
        <li>Excavate trench; place and compact base gravel level (or stepped on slopes per manual).</li>
        <li>Set base course carefully—errors compound upward.</li>
        <li>Stack with pins/lips as designed; install drainpipe and drainage stone; place geogrid when specified; backfill in lifts.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Keep underground utilities marked before digging.</li>
        <li>Compact behind the wall in thin lifts; heavy clay dumped in one lift settles for years.</li>
        <li>Outlet drains to daylight or an approved system—trapped water raises pressure.</li>
        <li>Order extra blocks from the same production lot for color match.</li>
        <li>For low decorative seats under ~2 ft, still use a proper base; skipping gravel is a frequent failure mode.</li>
        <li>Dry-stack a mockup course on the driveway to confirm pattern and cap overhang before trench day.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Building “as tall as the slope” without drainage or grid when the system requires them.</li>
        <li>Setting the first course on native dirt without compacted aggregate.</li>
        <li>Using rounded decorative rock as structural base.</li>
        <li>Ignoring global slope stability above the wall.</li>
        <li>Counting only exposed face and forgetting buried courses.</li>
        <li>Backfilling with saturated soil in one dump truck pass and calling it done.</li>
      </ul>

      <h2>Height thresholds, permits, and utilities</h2>
      <p>Many local codes treat retaining walls above a certain height as engineered structures that need a permit, and a measurement of around four feet from the bottom of the footing to the top of the wall is a common threshold in many places—though it varies, and surcharges from driveways, slopes, or buildings can trigger earlier review. Call your building department before design, and schedule a utility locate before digging. Mark property lines, since walls near boundaries can raise drainage and access issues with neighbors. Where the soil is poor or the wall holds back water, a professional designer is worth the cost.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/" rel="noopener noreferrer">QUIKRETE – Concrete &amp; landscape products</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC</a></li>
        <li><a href="https://extension.psu.edu/" rel="noopener noreferrer">Penn State Extension</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/" rel="noopener noreferrer">Iowa State Extension</a></li>
      </ul>
  `,

  'topsoil-vs-garden-soil': `      <div class="takeaway"><strong>Key takeaway:</strong> Topsoil is primarily mineral soil from the upper earth layer; bagged “garden soil” and raised-bed mixes usually blend mineral soil or composted organics for planting beds. Neither label is federally standardized in everyday retail speech—read ingredients. Buy by cubic yards (bulk) or cubic feet (bags) after you compute volume from area × depth.</div>

      <h2>What the names usually mean</h2>
      <p><strong>Topsoil</strong> in landscape yards often means screened mineral soil with some organic matter—used to fill low spots, establish lawns, or blend into beds. Quality varies: ask about texture (sandy loam vs clay), screening, weed seeds, and contaminants.</p>
      <p><strong>Garden soil</strong> on bag labels frequently denotes a blended product intended for in-ground beds—commonly topsoil plus compost or other organics. <strong>Raised-bed</strong> or <strong>potting</strong> mixes may be lighter, with bark, peat or coir, perlite, and compost, and may contain little true mineral topsoil.</p>
      <p>Extension sources stress matching the material to the job. Iowa State’s raised-bed FAQ discusses topsoil/compost/sand combinations; Clemson HGIC discusses topsoil-plus-compost fills and warns that compost fractions that are too high or too low can cause problems. UF/IFAS and other services publish mulch and soil-improvement guidance that complements—but does not replace—reading the bag in your cart.</p>
      <p>Estimate quantities with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>. After planting, cover beds using the <a href="/calculators/mulch-calculator/">mulch calculator</a>, depth norms in the <a href="/guides/mulch-depth-guide/">mulch depth guide</a>, and size charts in <a href="/guides/mulch-for-common-garden-beds/">mulch for common garden beds</a>. Filling boxed beds is covered in <a href="/guides/raised-bed-soil-mix-4x8/">raised bed soil mix for 4×8</a>.</p>

      <h2>How to calculate cubic yards</h2>
      <p><strong>Cu ft = length × width × (depth_inches ÷ 12).</strong></p>
      <p><strong>Cu yd = cu ft ÷ 27.</strong></p>
      <p>Example: a 10 × 10 ft area needing 3 in of topsoil → 100 × 0.25 = 25 cu ft ≈ <strong>0.93 cu yd</strong>. At 2 cu ft per bag that is about thirteen bags—bulk delivery is usually smarter near a yard. Lawn leveling often uses thinner lifts; deep raised beds need full volume math.</p>

      <h2>When to choose which product</h2>
      <p>Use screened topsoil when you need to raise grade, fill ruts, or establish a lawn seedbed where mineral soil continuity matters. Use bagged garden soil when you are amending an existing border and want convenient organic matter in small quantities. Use a raised-bed or planter mix when weight, drainage, and a manufactured blend matter more than matching native mineral soil—especially on roofs, decks, and sealed patios (confirm structural load limits before placing deep wet soil on structures).</p>
      <p>Compost alone is a powerful amendment but a mediocre structural fill for deep boxes: it continues to decompose and shrink, and excessive organic fractions can cause water and nutrient imbalances. Extension sheets that discuss compost percentages in beds are reacting to that reality. Likewise, “black dirt” sold cheaply without screening may be fill—not a planting medium.</p>
      <p>For lawns, thin topdressings after aeration differ from burying turf under inches of new soil. If you are seeding bare ground, coordinate soil depth with the <a href="/guides/grass-seed-per-sq-ft/">grass seed per square foot</a> guide so you do not strand seed on cloddy clay or bury it too deep.</p>

      <h2>Comparison table</h2>
      <div class="table-scroll">
      <table>
        <caption>Practical comparison of common soil products (general retail meanings—check labels)</caption>
        <thead>
          <tr><th>Product</th><th>Typical use</th><th>What to verify</th></tr>
        </thead>
        <tbody>
          <tr><td>Screened topsoil (bulk)</td><td>Fill, grade, lawn establish, mix ingredient</td><td>Texture, screening, source, drainage</td></tr>
          <tr><td>Bagged garden soil</td><td>In-ground beds, amending existing soil</td><td>Ingredient list, compost fraction, fertilizer charges</td></tr>
          <tr><td>Raised-bed / garden mix</td><td>Boxes, deep beds</td><td>Whether mineral soil is included; settling</td></tr>
          <tr><td>Potting mix</td><td>Containers</td><td>Drainage; not usually for large bulk fills</td></tr>
          <tr><td>Compost</td><td>Amendment, not always a standalone fill</td><td>Maturity, salts, feedstocks</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Worked example: topping a 4×8 bed with 2 in of compost-rich garden soil</h2>
      <p>Area = 32 sq ft. Depth = 2 in → 32 × (2÷12) ≈ <strong>5.33 cu ft</strong> (about 0.20 cu yd). That might be three to four 1.5–2.0 cu ft bags depending on bag size—far less than rebuilding the same bed 12 in deep (32 cu ft). Use garden soil or compost blends for top-ups when the mineral base already exists; use calculated topsoil/mix volumes when filling empty frames.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Define the job: regrade a lawn, amend a border, or fill a raised bed.</li>
        <li>Measure area and target depth; convert to cubic feet and yards.</li>
        <li>Choose product type based on drainage and organic-matter needs—not color of the bag alone.</li>
        <li>Ask bulk suppliers for a sample scoop; reject foul-smelling or debris-filled loads.</li>
        <li>Order with compaction/settling waste in mind (especially fluffy compost blends).</li>
        <li>Incorporate into native soil when layering on existing ground to avoid perched water barriers.</li>
        <li>Mulch after planting to conserve moisture.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Soil-test before heavy fertilizer additions—new soil can still be off-pH.</li>
        <li>For food gardens, ask about lead testing if the site or imported soil is suspect.</li>
        <li>“Black dirt” marketing is not a specification; texture matters more than color.</li>
        <li>Keep delivery trucks off septic fields and wet lawns.</li>
        <li>Store bagged soil elevated and covered so bags do not sit in puddles.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Filling deep raised beds only with potting mix priced per small bag (cost shock).</li>
        <li>Spreading unscreened fill full of rocks under new sod.</li>
        <li>Assuming garden soil and topsoil are interchangeable in every recipe.</li>
        <li>Creating a compost bathtub with no mineral structure for roots.</li>
        <li>Ordering by “scoops” without confirming the yard’s cubic-yard definition.</li>
      </ul>

      <h2>Testing and matching soil to the site</h2>
      <p>Before buying any bulk soil, a simple test pays off. State extension services and many labs offer low-cost soil tests that report pH, nutrients, and sometimes organic matter, and the results tell you whether you need lime, sulfur, or fertilizer. Ask the supplier whether the soil has been screened, how much organic material it contains, and whether it may include weed seeds. Inspect it by hand: it should crumble, not form a brick, and not smell sour.</p>
      <p>Also consider what is underneath. Spreading a thin layer of a very different soil over compacted clay can create a perched water layer, so many extension publications recommend loosening the existing surface and mixing the layers rather than stacking them cleanly. For lawn repairs, a modest topdressing is typically worked in; for new beds, deeper fill or blended garden soil works better. Whatever you buy, calculate the cubic yards first, then compare price per yard delivered.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/faq/what-would-be-good-soil-mix-raised-bed" rel="noopener noreferrer">Iowa State Extension – Raised bed soil mix</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/raised-beds/" rel="noopener noreferrer">Clemson HGIC – Raised beds (topsoil &amp; compost)</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/soil-conditioning-establishing-a-successful-gardening-foundation/" rel="noopener noreferrer">Clemson HGIC – Soil conditioning</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS – Mulch (companion to soil improvement)</a></li>
      </ul>
  `,

};

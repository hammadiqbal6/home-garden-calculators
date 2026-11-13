/** Long-form HTML bodies for guide pages (FAQ is rendered separately from guideFaqs). */
export const guideBodies: Record<string, string> = {
  'how-much-concrete-for-fence-posts': `      <div class="takeaway"><strong>Key takeaway:</strong> Size each hole as a cylinder (π × r² × depth), convert cubic feet to bags with the yield on your mix, then multiply by post count and add about 10% waste. Hole diameter and depth drive the order, not the post height alone.</div>

      <h2>How much concrete do I need per fence post?</h2>
      <p>Most residential line posts take about one to three 60–80&nbsp;lb bags each once you dig a proper hole. An 8-inch-wide, 2-foot-deep hole holds roughly 0.70&nbsp;cu&nbsp;ft, which is about two 80&nbsp;lb bags after you round up. Wider or deeper holes climb fast, so measure the hole you actually dig before you leave the store.</p>
      <p>Treat the hole as a cylinder. Convert diameter to feet, then use <strong>Volume (cu&nbsp;ft) ≈ π × (diameter ÷ 2)² × depth</strong>. Bags = ceil(volume ÷ bag yield). Common planning yields for general-purpose mix are about 0.30 / 0.45 / 0.60&nbsp;cu&nbsp;ft for 40 / 60 / 80&nbsp;lb bags (QUIKRETE Concrete Mix 1101 and Sakrete High Strength TDS). Confirm the bag you buy.</p>
      <p>Post count comes from fence length and spacing. A 96&nbsp;ft run with 8&nbsp;ft bays needs 13 posts if you count both ends. Use the <a href="/calculators/fence-calculator/">fence calculator</a> for layout, then feed hole size into the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a>, not the rectangular <a href="/calculators/concrete-calculator/">slab calculator</a>.</p>

      <h2>How many bags of concrete per fence post?</h2>
      <p>Bag count equals hole volume divided by bag yield, rounded up. At 0.60&nbsp;cu&nbsp;ft per 80&nbsp;lb bag, an 8&quot; × 2&nbsp;ft hole (~0.70&nbsp;cu&nbsp;ft) needs 2 bags. A 10&quot; × 2.5&nbsp;ft hole (~1.36&nbsp;cu&nbsp;ft) needs 3 bags. A 12&quot; × 3&nbsp;ft hole (~2.36&nbsp;cu&nbsp;ft) needs 4 bags before waste. Fast-setting labels can differ, so read the bag.</p>
      <div class="table-scroll">
      <table>
        <caption>Approximate concrete volume and 80&nbsp;lb bags per fence post hole (before waste)</caption>
        <thead><tr><th>Hole diameter</th><th>Depth</th><th>Volume</th><th>80 lb bags</th><th>60 lb bags</th></tr></thead>
        <tbody>
          <tr><td>8"</td><td>2 ft</td><td>0.70 cu ft</td><td>2</td><td>2</td></tr>
          <tr><td>10"</td><td>2.5 ft</td><td>1.36 cu ft</td><td>3</td><td>4</td></tr>
          <tr><td>12"</td><td>3 ft</td><td>2.36 cu ft</td><td>4</td><td>6</td></tr>
        </tbody>
      </table>
      </div>
      <p>Chart bags use ceil(volume ÷ 0.60) for 80&nbsp;lb and ceil(volume ÷ 0.45) for 60&nbsp;lb. That matches QUIKRETE 1101 and Sakrete published yields for those bag sizes.</p>

      <h2>How deep should fence post holes be?</h2>
      <p>QUIKRETE’s setting-posts guidance commonly puts about one-third to one-half of the above-ground post length in the ground, and often adds a few inches of gravel under the post. Dig below the local frost line where frost heave is a real risk. Gate and corner posts usually need deeper or wider holes than line posts because they take more load.</p>
      <p>Hole diameter is often about three times the post width as a starting rule (a 4-inch post in a roughly 12-inch hole). Soft or sandy soil may need a wider collar so the concrete has more contact with undisturbed ground. Tall privacy panels that catch wind deserve the same caution.</p>

      <h2>Worked example: 12 posts at 8&quot; × 2 ft</h2>
      <p>Twelve 8&quot; × 2&nbsp;ft holes ≈ 12 × 0.70 = 8.4&nbsp;cu&nbsp;ft. With 10% waste → about 9.2&nbsp;cu&nbsp;ft. At 0.60&nbsp;cu&nbsp;ft per 80&nbsp;lb bag that is ceil(9.2 ÷ 0.60) = 16 bags. At 0.45&nbsp;cu&nbsp;ft per 60&nbsp;lb bag, plan on 21 bags. Same cylinder math the post-hole calculator uses.</p>

      <h2>Worked example: 48 ft privacy fence</h2>
      <p>At 8&nbsp;ft spacing you need 7 posts (6 sections plus end). If each hole is 10&quot; × 2.5&nbsp;ft, one hole is ~1.36&nbsp;cu&nbsp;ft. Seven holes ≈ 9.55&nbsp;cu&nbsp;ft before waste, about 10.5&nbsp;cu&nbsp;ft with 10% waste—roughly eighteen 60&nbsp;lb bags or fifteen 80&nbsp;lb bags. Brace posts plumb before you place mix, and slope the finished concrete so water drains away from the wood.</p>

      <h2>How do I order concrete for a fence line?</h2>
      <p>Count every post (including gates and corners), pick a hole diameter and depth you can actually dig, run the cylinder math or the calculator, then add waste and buy matching outdoor concrete or fast-setting post mix. Ready-mix only makes sense on very long runs with truck access. Measure a few real holes with a tape before you finalize the ticket.</p>
      <ol>
        <li>Count posts with the <a href="/calculators/fence-calculator/">fence calculator</a> (include corners and gates).</li>
        <li>Set hole diameter (often about 3× post width) and depth (commonly ~⅓ to ½ of above-ground height, below frost where required).</li>
        <li>Run the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a> for total cubic feet and bag counts.</li>
        <li>Add ~10% waste and buy outdoor concrete or fast-setting post mix from one product line.</li>
        <li>Optional: place a few inches of gravel under the post for drainage, then set, brace, and fill per the bag instructions. Fast-set products often firm up in about 20–40 minutes once watered.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Call before you dig. Utility locates exist for a reason.</li>
        <li>Keep a spare bag or two on site. Running short mid-set wastes a day.</li>
        <li>Fast-setting mixes are handy for posts. Structural deck footings often need mixed concrete and cardboard forms instead.</li>
        <li>For cardboard tube forms (deck piers), use the <a href="/guides/how-much-concrete-in-a-sonotube/">Sonotube concrete guide</a>. This page is for dug fence holes, not tube forms.</li>
        <li>Use the <a href="/guides/concrete-for-10x10-slab/">10×10 slab guide</a> only when you are pouring pads, not round holes.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Setting posts too shallow for wind load or frost heave.</li>
        <li>Filling flat to the top without sloping water away from the post.</li>
        <li>Using mortar or interior mix instead of outdoor concrete or post-setting mix.</li>
        <li>Using the slab tool for round holes.</li>
        <li>Ignoring gate posts, which often need a larger or deeper hole than line posts.</li>
        <li>Forgetting that gravel in the hole bottom displaces some concrete.</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://quikrete.com/athome/settingposts.asp" rel="noopener noreferrer">QUIKRETE – Setting posts in concrete (hole size, depth, fast-set timing)</a></li>
        <li><a href="https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf" rel="noopener noreferrer">QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields</a></li>
        <li><a href="https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf" rel="noopener noreferrer">Sakrete High Strength Concrete Mix TDS – bag yields</a></li>
      </ul>
  `,

  'mulch-depth-guide': `      <div class="takeaway"><strong>Key takeaway:</strong> For most flower beds and gardens, plan on about 2–3 inches of organic mulch. Keep mulch pulled back from trunks, refresh by measuring what is already there, and size bags from area × depth.</div>

      <h2>How deep should mulch be in flower beds / for gardens?</h2>
      <p>Most flower beds and gardens do well with about 2–3 inches of organic mulch. That depth suppresses weeds and holds moisture without smothering roots. Mississippi State says pull mulch 2–3 inches back from trunks. UF/IFAS Florida-Friendly guidance targets about 3 inches and says not to exceed 3 inches in beds. Clemson lists 2–3 inches for many wood and bark mulches.</p>
      <p>This page answers “how deep,” not only “how many bags.” For quantities on common rectangles, see the <a href="/guides/mulch-for-common-garden-beds/">common bed sizes chart</a>. For custom shapes, use the <a href="/calculators/mulch-calculator/">mulch calculator</a> or the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a>.</p>

      <h2>Recommended depths by area</h2>
      <div class="table-scroll">
      <table>
        <caption>Typical organic mulch depths cited for landscape beds</caption>
        <thead><tr><th>Area</th><th>Typical depth</th><th>Source notes</th></tr></thead>
        <tbody>
          <tr><td>Flower, shrub, and perennial beds</td><td>2–3"</td><td>Clemson wood/bark range; MSU bark 2–3"</td></tr>
          <tr><td>Florida-Friendly beds</td><td>About 3" (max 3")</td><td>UF/IFAS; seedlings often only 1"</td></tr>
          <tr><td>Tree rings</td><td>Similar bed depth</td><td>Keep a bare collar; MSU pull 2–3" from trunk</td></tr>
          <tr><td>Wood-chip paths</td><td>Often a bit thicker</td><td>Expect compaction under foot traffic</td></tr>
        </tbody>
      </table>
      </div>
      <p>Organic mulch feeds soil life as it breaks down. Inorganic rock mulch behaves differently: it does not add organic matter the way shredded bark does, it can heat beds in full sun, and it is harder to remove later. Choose organic mulch when soil improvement is part of the goal. Season also matters. Hot, dry beds often benefit from a full 3-inch organic layer; wet, poorly drained beds may do better closer to 2 inches so the surface stays less soggy.</p>

      <h2>Is 4 inches of mulch too much?</h2>
      <p>For most ornamental beds, yes. Layers much deeper than about 3 inches can shed water and cut oxygen to roots. UF/IFAS says not to apply more than 3 inches in beds because excess mulch can divert rain and irrigation. Wood-chip paths sometimes run thicker under foot traffic; that is a different job than a planting bed.</p>
      <p>Ordering for 4 inches when you only need 3 inches wastes about one-third extra material. Measure the depth you intend to maintain after settling, not the fluffy height right out of the bag.</p>

      <h2>Should I remove old mulch before adding new?</h2>
      <p>Not always. If the old layer is thin and well decomposed, rake it and top-dress only enough to restore about 2–3 inches total. If you have a thick, matted, or moldy layer, thin or remove it first so new mulch does not create an anaerobic blanket. Light replenishment is preferred when depth falls below about 2 inches.</p>
      <p>Mississippi State Extension also warns that years of heavy mulching can build soil against plant bases. After a few seasons, rake off excess before you lay a fresh, even layer.</p>

      <h2>How to measure depth and refresh mulch (step-by-step)</h2>
      <ol>
        <li>Pull weeds and water dry soil so you are not sealing dust under a new blanket.</li>
        <li>Push a ruler or marked trowel through the mulch to the soil surface and read the current depth in several spots.</li>
        <li>Decide the target depth (usually 2–3 inches in beds; about 3 inches where UF/IFAS Florida-Friendly guidance applies).</li>
        <li>If you already have close to target depth, rake to loosen mats and stop; if you are short, order only the difference.</li>
        <li>Measure bed length and width (or break curves into rectangles). Area (sq&nbsp;ft) × (depth inches ÷ 12) = cubic feet needed.</li>
        <li>Convert to bags (÷ bag size, often 2 or 3 cu&nbsp;ft) or yards (÷ 27). Round up a little for settling.</li>
        <li>Spread evenly, keep mulch a few inches off trunks and stems, and water lightly so the layer settles to the measured depth.</li>
      </ol>
      <p><strong>Cubic feet = area (sq&nbsp;ft) × (depth_inches ÷ 12).</strong> At 3 inches, each 100&nbsp;sq&nbsp;ft needs 25&nbsp;cu&nbsp;ft (about 0.93&nbsp;cu&nbsp;yd). At 2 inches, the same 100&nbsp;sq&nbsp;ft needs about 16.7&nbsp;cu&nbsp;ft.</p>

      <h2>Worked example: 20 × 5 ft bed</h2>
      <p>A 20 × 5&nbsp;ft bed is 100&nbsp;sq&nbsp;ft. At 3&nbsp;inches: 100 × 0.25 = 25&nbsp;cu&nbsp;ft ≈ thirteen 2&nbsp;cu&nbsp;ft bags. At 2&nbsp;inches: 100 × (2÷12) ≈ 16.7&nbsp;cu&nbsp;ft ≈ nine 2&nbsp;cu&nbsp;ft bags. Split irregular beds into rectangles and add the volumes, using the same method the calculator uses.</p>

      <h2>Worked example: tree ring</h2>
      <p>Suppose you mulch a ring with a 6&nbsp;ft outer diameter and leave a 1.5&nbsp;ft clear circle at the trunk, 3&nbsp;inches deep. Outer area ≈ π × 3² ≈ 28.3&nbsp;sq&nbsp;ft; inner opening ≈ π × 0.75² ≈ 1.8&nbsp;sq&nbsp;ft; mulched area ≈ 26.5&nbsp;sq&nbsp;ft. Volume ≈ 26.5 × 0.25 ≈ 6.6&nbsp;cu&nbsp;ft (about four 2&nbsp;cu&nbsp;ft bags). Keep the trunk flare bare; MSU’s 2–3 inch pull-back is about clearance from bark, not deeper mulch against the wood.</p>

      <h2>Tips</h2>
      <ul>
        <li>Match mulch type to the job: shredded hardwood for beds, coarser chips for paths.</li>
        <li>Keep mulch off siding and stems to reduce moisture and pest issues.</li>
        <li>Organic mulches shrink as they decompose; budget a light top-dress rather than a deep dump every spring.</li>
        <li>Fine sawdust or packed fresh clippings can mat and shed water; prefer coarser products for a 2–3 inch layer.</li>
        <li>If you mulch food gardens with dyed product, read the label and ask what the colorant and base wood are.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Volcano mulching against trunks.</li>
        <li>Installing 6&nbsp;inches “so it lasts longer,” then watching water shed off the surface.</li>
        <li>Measuring length but guessing width.</li>
        <li>Ordering by bags without converting depth to feet (using 3 instead of 0.25).</li>
        <li>Stacking new bags on old matted layers without checking total depth.</li>
      </ul>

      <h2>When to call a pro / safety</h2>
      <p>Call an arborist if trees show girdling roots, buried root flares, or decline after years of deep mulch. Large properties may justify a crew for bulk delivery and even spreading. Wear dust protection when dumping dry bulk mulch, and spread large deliveries promptly so piles do not heat against building walls.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://extension.msstate.edu/publications/mulches-for-the-landscape" rel="noopener noreferrer">Mississippi State Extension – Mulches for the landscape</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS – Choosing and installing mulches</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/mulch/" rel="noopener noreferrer">Clemson HGIC – Mulch</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed" rel="noopener noreferrer">Iowa State Extension – How to determine amount of mulch needed</a></li>
      </ul>
`,

  'how-many-bags-of-concrete': `      <div class="takeaway"><strong>Key takeaway:</strong> Divide project volume in cubic feet by the bag yield (about 0.30 / 0.45 / 0.60&nbsp;cu&nbsp;ft for 40 / 60 / 80&nbsp;lb), round up, then add waste. An 80&nbsp;lb bag yields about 0.60&nbsp;cu&nbsp;ft—roughly 45 bags per cubic yard before waste.</div>

      <h2>How many 80 lb bags of concrete are in a cubic yard?</h2>
      <p>About 45 bags before waste, using a 0.60&nbsp;cu&nbsp;ft yield per 80&nbsp;lb bag (27 ÷ 0.60). After a 10% waste factor, plan closer to 50 bags for one cubic yard of placed concrete. Confirm the yield printed on the bag you buy. Lightweight and specialty mixes can list different coverage.</p>
      <div class="table-scroll">
      <table>
        <caption>Typical bagged concrete yields (QUIKRETE 1101 / Sakrete High Strength planning figures)</caption>
        <thead><tr><th>Bag</th><th>Yield (approx.)</th><th>Bags / cu yd (before waste)</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 cu ft</td><td>~90</td></tr>
          <tr><td>60 lb</td><td>0.45 cu ft</td><td>~60</td></tr>
          <tr><td>80 lb</td><td>0.60 cu ft</td><td>~45</td></tr>
        </tbody>
      </table>
      </div>
      <p>QUIKRETE Concrete Mix No. 1101 lists about 0.30 / 0.375 / 0.45 / 0.60 / 0.675&nbsp;cu&nbsp;ft for 40 / 50 / 60 / 80 / 90&nbsp;lb bags. Sakrete High Strength TDS lists about 0.30 / 0.45 / 0.6 / 0.66&nbsp;cu&nbsp;ft for 40 / 60 / 80 / 90&nbsp;lb. YardTally’s calculators use the shared 40 / 60 / 80 planning yields above.</p>

      <h2>How many 60 lb bags per cubic yard?</h2>
      <p>About 60 bags before waste at a 0.45&nbsp;cu&nbsp;ft yield (27 ÷ 0.45). After 10% waste, plan closer to 66 bags per cubic yard of placed concrete. Sixty-pound bags trade a higher bag count for easier lifting, which matters when you are mixing by hand all day.</p>

      <h2>How do I convert cubic feet to bags of concrete?</h2>
      <p>Bags = ceil(volume_cu_ft ÷ yield). Get volume from the shape first, add waste, then divide. Slabs use length × width × (thickness inches ÷ 12). Post holes and Sonotubes use π × r² × height × count. Divide cubic feet by 27 for cubic yards when you are comparing ready-mix quotes.</p>
      <p>Pick the right tool: <a href="/calculators/concrete-calculator/">concrete calculator</a> for slabs and steps, <a href="/calculators/concrete-calculator-post-holes/">post hole calculator</a> for fence posts, and <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a> for cardboard forms. Tube charts live in the <a href="/guides/how-much-concrete-in-a-sonotube/">Sonotube concrete guide</a>.</p>
      <p>Weight matters for logistics. Forty-five 80&nbsp;lb bags are about 3,600&nbsp;lb of dry mix before water. If you are working alone, factor mixing time. That labor math is why the “about one cubic yard” ready-mix threshold is a practical rule of thumb, not a hard law.</p>

      <h2>Worked example: 10×10×4&quot; slab</h2>
      <p>10 × 10 × (4÷12) = 33.33&nbsp;cu&nbsp;ft ≈ 1.23&nbsp;cu&nbsp;yd. With 10% waste → 36.7&nbsp;cu&nbsp;ft. That is ceil(36.7 ÷ 0.60) = 62 bags of 80&nbsp;lb or ceil(36.7 ÷ 0.45) = 82 bags of 60&nbsp;lb. See the <a href="/guides/concrete-for-10x10-slab/">10×10 slab guide</a> for thickness charts.</p>

      <h2>Worked example: fence posts vs slab bags</h2>
      <p>People often search “how many bags of concrete” when they mean fence posts. A single 8&quot; × 2&nbsp;ft hole (~0.70&nbsp;cu&nbsp;ft) needs a couple of 80&nbsp;lb bags after rounding, not the sixty-plus bags of a patio. Always identify the shape first. The <a href="/guides/how-much-concrete-for-fence-posts/">fence post guide</a> keeps cylinder jobs from inheriting slab charts.</p>

      <h2>When should I order ready-mix instead of bags?</h2>
      <p>When the pour approaches or exceeds about one cubic yard, ready-mix often wins on labor and consistency if a truck can reach the site. Smaller pads, repairs, and fence posts usually stay on bags. Call the plant about short-load fees before you assume a truck is cheaper than bags.</p>

      <h2>Tips</h2>
      <ul>
        <li>Buy all bags from the same product line so color and strength stay consistent on visible slabs.</li>
        <li>Stage water, a tub or mixer, and wheelbarrow routes before you open bags.</li>
        <li>Write the yield on your shopping list. If the store only stocks a specialty mix, re-run the division.</li>
        <li>Cold and hot weather change set times. Follow the bag’s temperature notes.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Mixing inches and feet (treating a 4-inch slab as 4 feet thick).</li>
        <li>Using 45 bags per yard, then forgetting waste.</li>
        <li>Ordering exact yardage on rough soil with no contingency.</li>
        <li>Applying slab bag charts to post holes or Sonotubes.</li>
        <li>Ignoring that gravel base under a slab is a separate material order.</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf" rel="noopener noreferrer">QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields</a></li>
        <li><a href="https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf" rel="noopener noreferrer">Sakrete High Strength Concrete Mix TDS – bag yields</a></li>
      </ul>
  `,

  'concrete-for-10x10-slab': `      <div class="takeaway"><strong>Key takeaway:</strong> A 10×10&nbsp;ft slab at 4&nbsp;inches is about 1.23&nbsp;cu&nbsp;yd (33.3&nbsp;cu&nbsp;ft) before waste. With YardTally’s 10% waste factor, plan on roughly 62 bags of 80&nbsp;lb mix or 82 bags of 60&nbsp;lb mix. Gravel base is ordered separately.</div>

      <p>This page is a size-specific chart. For other footprints use the <a href="/calculators/concrete-calculator/">concrete calculator</a>. Round holes belong on the <a href="/guides/how-much-concrete-for-fence-posts/">fence post guide</a> or <a href="/guides/how-much-concrete-in-a-sonotube/">Sonotube guide</a>. Bag yields follow the <a href="/guides/how-many-bags-of-concrete/">bags of concrete guide</a>.</p>
      <figure class="diagram">
        <img src="/diagrams/slab-dimensions.svg" width="960" height="540" alt="Diagram of a rectangular concrete slab showing length, width and thickness" loading="lazy" />
      </figure>

      <h2>How much concrete for a 10×10 slab at 4 inches?</h2>
      <p>About 33.3&nbsp;cu&nbsp;ft or 1.23&nbsp;cu&nbsp;yd before waste. With a 10% waste factor that becomes about 36.7&nbsp;cu&nbsp;ft—roughly 62 bags of 80&nbsp;lb mix or 82 bags of 60&nbsp;lb mix at 0.60 and 0.45&nbsp;cu&nbsp;ft yields. Those bag counts match QUIKRETE 1101 and Sakrete planning yields. Confirm the label on the bags you buy.</p>
      <p><strong>Volume (cu&nbsp;ft) = 10 × 10 × (thickness_inches ÷ 12).</strong> Yards = cu&nbsp;ft ÷ 27. With waste: bags = ceil(cu&nbsp;ft × 1.10 ÷ yield). At 4&nbsp;inches, thickness in feet is 4÷12 ≈ 0.333&nbsp;ft, so volume = 100 × 0.333 = 33.3&nbsp;cu&nbsp;ft.</p>

      <h2>How much concrete for a 10×10 slab at 6 inches?</h2>
      <p>About 50&nbsp;cu&nbsp;ft or 1.85&nbsp;cu&nbsp;yd before waste. With 10% waste, expect roughly 92 bags of 80&nbsp;lb mix or 123 bags of 60&nbsp;lb mix. At that bag count, price a short-load ready-mix truck against all-day mixing if a chute can reach the pad.</p>

      <h2>10×10 slab chart (with 10% waste)</h2>
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
      <p>Near or above one cubic yard, ready-mix often wins on labor if a truck can access the site. Compact a gravel base separately. Estimate base with the <a href="/calculators/gravel-calculator/">gravel calculator</a>.</p>

      <h2>How do I order concrete for a 10×10 pad?</h2>
      <p>Measure the formed length and width, lock the slab thickness, convert to cubic feet, add about 10% waste, then divide by bag yield or call for ready-mix yards. Order gravel as a second line item. Forms, joints, and any thickened edges are not free volume. Sketch those extras before you shop.</p>
      <ol>
        <li>Confirm finished slab size and thickness (many patios and shed pads use about 4&nbsp;inches over compacted base).</li>
        <li>Build and brace forms so they do not belly out when you place concrete.</li>
        <li>Compute volume: length × width × (thickness ÷ 12). For 10×10×4&quot;, that is 33.3&nbsp;cu&nbsp;ft.</li>
        <li>Multiply by 1.10 for waste, then divide by 0.60 (80&nbsp;lb) or 0.45 (60&nbsp;lb) and round up, or quote ready-mix in yards.</li>
        <li>Order gravel base separately. Keep water, tools, and helpers staged before the first bag opens.</li>
      </ol>

      <h2>Worked example: 10×10×4&quot; with base</h2>
      <p>Concrete: 33.3&nbsp;cu&nbsp;ft (1.23&nbsp;cu&nbsp;yd) before waste → 36.7&nbsp;cu&nbsp;ft with 10% → about sixty-two 80&nbsp;lb bags. If you also place 4&nbsp;inches of compacted gravel under the slab, gravel volume before waste is also 33.3&nbsp;cu&nbsp;ft (1.23&nbsp;cu&nbsp;yd). With 10% compaction allowance ≈ 1.35&nbsp;cu&nbsp;yd. Confirm density with your yard when converting to tons.</p>

      <h2>Tips</h2>
      <ul>
        <li>Form carefully. Bowed forms steal concrete and ruin edges.</li>
        <li>Plan control joints. Local practice varies; do not invent a spacing rule from this volume chart.</li>
        <li>Dampening the subgrade helps in hot weather. Avoid standing puddles.</li>
        <li>Order extra bags for steps or thickened edges. They are not in the flat 10×10 chart.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Forgetting waste and finishing one corner short.</li>
        <li>Including gravel depth inside the concrete thickness input.</li>
        <li>Using post-hole bag charts for a rectangular patio.</li>
        <li>Pouring on uncompacted fill that later settles and cracks the slab.</li>
        <li>Assuming ~45 bags of 80&nbsp;lb mix covers a 10×10×4&quot; slab with waste. That under-orders versus 0.60&nbsp;cu&nbsp;ft yields (you need about 62).</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf" rel="noopener noreferrer">QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields</a></li>
        <li><a href="https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf" rel="noopener noreferrer">Sakrete High Strength Concrete Mix TDS – bag yields</a></li>
      </ul>
  `,

  'mulch-for-common-garden-beds': `      <div class="takeaway"><strong>Key takeaway:</strong> At 3&nbsp;inches deep, a 4×8&nbsp;ft bed needs about 8&nbsp;cu&nbsp;ft of mulch (four 2&nbsp;cu&nbsp;ft bags). A 20×5 bed needs about 25&nbsp;cu&nbsp;ft (about 0.93&nbsp;cu&nbsp;yd). Depth targets live in the <a href="/guides/mulch-depth-guide/">mulch depth for gardens</a> guide; this page is the quantity chart.</div>

      <h2>How much mulch for a 4×8 garden bed?</h2>
      <p>At 3 inches deep, a 4×8 ft bed needs 8 cu ft of mulch (about 0.30 cu yd). That is four 2 cu ft bags, or about three 3 cu ft bags. At 2 inches, the same bed needs about 5.3 cu ft. Measure inside the frame so lumber thickness does not inflate the order.</p>
      <p>Customize odd shapes with the <a href="/calculators/mulch-calculator/">mulch calculator</a>. For trees, use the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a> so you subtract the trunk opening.</p>
      <figure class="diagram">
        <img src="/diagrams/mulch-bed-dimensions.svg" width="960" height="540" alt="Diagram of a garden bed mulch layer showing length, width and depth" loading="lazy" />
      </figure>

      <h2>How many bags for a 20×5 bed?</h2>
      <p>A 20×5 bed is 100 sq ft. At 3 inches: 100 × 0.25 = 25 cu ft, about 0.93 cu yd. That is thirteen 2 cu ft bags, or nine 3 cu ft bags after rounding up. At this size, compare bulk delivery by the cubic yard against bag pricing, especially if several beds share one truck.</p>
      <p>UF/IFAS notes that one cubic yard covers about 108 sq ft at a 3-inch depth, which matches the same volume math: 100 sq ft at 3 inches is just under one yard.</p>

      <h2>Bags vs bulk mulch</h2>
      <p>Bags win for small beds and color-matched touch-ups. Iowa State Extension notes mulch is commonly sold in 2- or 3-cubic-foot bags, so always divide cubic feet by the bag size on the package. Bulk usually costs less per cubic foot once you need roughly a cubic yard or more, if you can stage a pile and move it quickly.</p>
      <p>Under about 0.5 cu yd, bags are often simpler. Between 0.5 and 1 cu yd, compare delivery fees; short-load premiums can erase bulk savings. Whatever you buy, spread to the target depth from the <a href="/guides/mulch-depth-guide/">mulch depth for gardens</a> guide rather than emptying every bag onto one corner.</p>

      <h2>How to calculate mulch from area × depth (step-by-step)</h2>
      <ol>
        <li>Measure length and width of the planting surface in feet (inside raised-bed frames).</li>
        <li>Multiply for square feet. Split L-shapes and curves into rectangles and add the pieces.</li>
        <li>Choose depth in inches (often 2–3 inches; see the depth guide).</li>
        <li>Convert depth to feet (inches ÷ 12). Example: 3 inches = 0.25 ft.</li>
        <li>Multiply area × depth in feet to get cubic feet.</li>
        <li>For bags, divide cubic feet by bag size (commonly 2 or 3 cu ft per Iowa’s bag method) and round up.</li>
        <li>For bulk, divide cubic feet by 27 for cubic yards. As a check, UF/IFAS coverage is about 108 sq ft per cu yd at 3 inches.</li>
      </ol>
      <p><strong>Cu&nbsp;ft = length × width × (depth_inches ÷ 12).</strong> Yards = cu&nbsp;ft ÷ 27. If you are only top-dressing an existing 1-inch layer up to 3 inches, order the 2-inch difference, not a full new 3-inch blanket.</p>

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
      <p>A long border: 12 × 3 = 36&nbsp;sq&nbsp;ft × (2÷12) = 6&nbsp;cu&nbsp;ft → three 2&nbsp;cu&nbsp;ft bags. The same border at 3&nbsp;inches needs 9&nbsp;cu&nbsp;ft (five bags). Paths beside the border often want thicker wood chips; price those separately so bed mulch and path chips can differ.</p>

      <h2>Tips</h2>
      <ul>
        <li>Fluffed bag mulch settles; rake to the target depth after watering.</li>
        <li>When several beds share a truck, add the chart rows first, then round the combined yards upward.</li>
        <li>Keep mulch off vegetable stems that rot easily when buried.</li>
        <li>Compare bag prices only after you know whether bags are 1.5, 2, or 3&nbsp;cu&nbsp;ft.</li>
        <li>Read the <a href="/guides/mulch-depth-guide/">depth guide</a> before deciding that more mulch will end weeding forever.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using 3 as a multiplier instead of 0.25 when depth is 3&nbsp;inches.</li>
        <li>Ordering for tree rings with the rectangle chart and covering the trunk flare.</li>
        <li>Forgetting multiple beds that share one delivery.</li>
        <li>Spreading fresh, uncomposted chips tight against tender perennials.</li>
      </ul>

      <h2>Measuring curved beds</h2>
      <p>Most real beds curve. Stretch a tape along the centerline for length, measure width every few feet, and average those readings. Multiply length by average width for square footage. Or break the shape into rectangles and triangles, calculate each, and add. Write the square footage down so next season’s top-dress is a thirty-second calculation.</p>

      <h2>When to call a pro / safety</h2>
      <p>Large estate beds, steep slopes, or sites with irrigation and lighting may need a landscape crew. Mulch deliveries can weigh well over a ton per cubic yard of dense product; protect lawns with plywood if a truck dumps on turf. Follow local fire-safe landscaping rules where they apply near structures.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed" rel="noopener noreferrer">Iowa State Extension – How to determine amount of mulch needed (2- or 3-cu-ft bags)</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS – Mulch coverage (~108 sq ft per cu yd at 3 inches)</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/mulch/" rel="noopener noreferrer">Clemson HGIC – Mulch</a></li>
      </ul>
`,

  'gravel-types-for-driveways': `      <div class="takeaway"><strong>Key takeaway:</strong> Driveways usually need a compacted angular crushed-stone base (dense grade / crusher run) topped with a stable surface aggregate. Rounded pea gravel looks tidy but rolls under tires. Estimate volume with length × width × depth, then convert to tons using your yard’s compacted density.</div>

      <h2>What is the best gravel for a driveway?</h2>
      <p>The best driveway gravel is usually angular crushed stone that locks when compacted, not rounded decorative rock. Most DIY drives use a dense-grade or crusher-run base under a surface course sized for traffic. Pea gravel alone is a poor sole driving surface because rounded particles migrate under tires. Ask the quarry for compactable base stone and a drive-rated surface.</p>
      <p>Think in layers. A thicker compacted base carries loads; a thinner angular surface course provides traction and a finished look. Mixing those jobs into one uncompacted lift is a common reason drives rut in the first winter. On soft clay, contractors often add geotextile under the base so stone does not punch into mud.</p>

      <h2>What is dense gravel / dense grade?</h2>
      <p>Dense grade (also sold as crusher run or road base) is angular crushed stone mixed with stone dust and fines. The fines fill voids so the blend locks into a firm mat when compacted in lifts. Clean stone such as #57 has fewer fines, drains well, and may not lock as tightly for a base. Product names vary by quarry.</p>
      <p>Drainage and crown matter as much as stone type. Water that sits in wheel paths pumps fines upward and creates potholes. A slight crown, open edges, or a defined ditch keeps the section drier. Clemson’s porous-pavement overview is useful context when you are comparing impermeable pavement with gravel or permeable systems that let water infiltrate.</p>

      <h2>How do I convert driveway gravel to tons?</h2>
      <p>First compute cubic yards: length × width × (depth inches ÷ 12) ÷ 27. Then multiply by the density your quarry quotes. Yards sell by the ton or by the yard; moisture and rock type change the weight. YardTally uses a mid-range planning density near 2,700 lb per cu yd. Treat that as a planning assumption, not a universal rule.</p>
      <p>Estimate with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. If you are building a paver driveway instead of loose gravel, you will also need a sand setting bed. See the <a href="/calculators/sand-calculator/">sand calculator</a> and <a href="/calculators/paver-calculator/">paver calculator</a>.</p>

      <h2>Planning depths (assumptions, not a design code)</h2>
      <p>Depth depends on soil strength and traffic. As a DIY planning assumption only, many light residential drives use several inches of compacted base plus a thinner surface course, often landing somewhere in a broad 4–8 inch total range before soft soils or heavier vehicles. Soft clay, steep grades, and delivery trucks can need deeper stone or fabric. Confirm with local practice or a contractor; this guide does not design structural thickness.</p>

      <h2>Worked example: 40 × 10 ft drive</h2>
      <p>Area = 400&nbsp;sq&nbsp;ft. Using a 4-inch planning depth: 400 × (4÷12) = 133.3&nbsp;cu&nbsp;ft ≈ 4.94&nbsp;cu&nbsp;yd before waste. With a 10% compaction/crowning allowance ≈ 5.4&nbsp;cu&nbsp;yd. At a mid-range planning density of 2,700&nbsp;lb/cu&nbsp;yd that is about 7.3&nbsp;tons after waste. Re-run the ton math with the quarry’s density before you pay the ticket.</p>

      <h2>Worked example: base plus surface</h2>
      <p>Same 40 × 10 footprint with a planning section of 6&nbsp;inches dense-grade base and 2&nbsp;inches clean surface stone: base = 400 × 0.5 = 200&nbsp;cu&nbsp;ft ≈ 7.4&nbsp;cu&nbsp;yd; surface = 400 × (2÷12) ≈ 66.7&nbsp;cu&nbsp;ft ≈ 2.5&nbsp;cu&nbsp;yd. Compact the base in lifts before placing the surface course.</p>

      <h2>Layer volume reference for a 40 × 10 ft drive</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate stone volume for a 400 sq ft driveway by depth (before waste; tons use 2,700 lb/cu yd planning density)</caption>
        <thead><tr><th>Depth</th><th>Cu ft</th><th>Cu yd</th><th>Tons (planning)</th></tr></thead>
        <tbody>
          <tr><td>2"</td><td>66.7</td><td>2.47</td><td>~3.3</td></tr>
          <tr><td>4"</td><td>133.3</td><td>4.94</td><td>~6.7</td></tr>
          <tr><td>6"</td><td>200.0</td><td>7.41</td><td>~10.0</td></tr>
        </tbody>
      </table>
      </div>
      <p>The tonnage column is a planning aid only. Your quarry’s weight per cubic yard decides the actual ticket.</p>

      <h2>Questions to ask the quarry</h2>
      <p>Which stone do they recommend for a compacted base, and which for a surface layer? What is the maximum stone size, and how many fines does it contain? Is it sold by the ton or by the yard, and what density should you use after compaction? Share length, width, slope, and soil type. Steeper drives wash out faster with rounded stone; snow plowing favors a rigid base and stone that resists blade scrape.</p>

      <h2>Tips</h2>
      <ul>
        <li>Crown the drive slightly so water sheds to the edges.</li>
        <li>Compact in lifts; dumping one deep pile and driving over it once is not compaction.</li>
        <li>Edge restraints reduce shoulder washout.</li>
        <li>Keep organic soil and mulch out of the stone.</li>
        <li>For paver conversions, plan gravel base and sand bedding as separate line items.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using pea gravel as the entire section thickness.</li>
        <li>Ordering by the scoop without measuring length and width.</li>
        <li>Treating a blog’s inches or tons-per-yard as a universal rule for every quarry.</li>
        <li>Blocking drainage so the drive becomes a bathtub.</li>
        <li>Mixing sand-bed paver math into a loose-gravel drive (or the reverse).</li>
      </ul>

      <h2>Maintenance expectations</h2>
      <p>No gravel drive is permanent. Expect to rake it level, fill ruts, and add a thin top-up of stone as traffic and winter weather demand. Weeds establish more easily in loose fines; good compaction and a crown slow that process. Budget a little stone each year rather than treating the first delivery as the last.</p>

      <h2>When to call a pro / safety / codes</h2>
      <p>Call an excavator or paving contractor for long drives, steep grades, poor soils, heavy vehicles, or when stormwater rules limit runoff onto the street. Utility locates are mandatory before excavating. Confirm driveway aprons and septic locations can handle delivery trucks. Local jurisdictions may regulate curb cuts and drainage.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://hgic.clemson.edu/factsheet/an-introduction-to-porous-pavement/" rel="noopener noreferrer">Clemson HGIC – An introduction to porous pavement</a></li>
      </ul>
`,

  'how-to-measure-roof-pitch': `      <div class="takeaway"><strong>Key takeaway:</strong> Roof pitch is inches of rise per 12&nbsp;inches of run. Measure with a level and tape on a rafter or rake when possible. A 6-inch rise over 12&nbsp;inches of run is a 6/12 pitch (about 26.6°). Prefer attic measurements when climbing is unsafe.</div>

      <h2>What does a 6/12 roof pitch mean?</h2>
      <p>It means 6&nbsp;inches of vertical rise for every 12&nbsp;inches of horizontal run. That is about 26.6° and an area factor near 1.118. Multiply plan (footprint) area by that factor to estimate slope surface area before you convert to roofing squares. IKO uses the same 6:12 factor of 1.118 when explaining shingle quantity math.</p>
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
      <p><strong>Pitch (X-in-12) = (rise ÷ run) × 12</strong> when rise and run use the same units. <strong>Angle ≈ arctan(rise/run)</strong>. <strong>Area factor ≈ √(1 + (rise/run)²)</strong>. Convert interactively with the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a>.</p>

      <h2>How do I measure roof pitch from the attic?</h2>
      <p>Place a level against the underside of a rafter so the bubble is centered. Mark 12&nbsp;inches along the level, then measure the vertical rise from the level up to the rafter at that mark. That rise in inches is the X in X/12. Attic measurements avoid walking the roof and are the safest option for many homeowners.</p>
      <ol>
        <li>Pick a straight rafter away from hips, valleys, and damaged members.</li>
        <li>Hold a level true horizontal against the rafter bottom (or along a level line).</li>
        <li>At exactly 12&nbsp;inches of horizontal run, measure vertical rise to the rafter.</li>
        <li>Write the reading as X/12. Repeat on a second rafter to catch mixed pitches.</li>
        <li>Enter rise and run in the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a> to confirm angle and area factor.</li>
      </ol>
      <p>If that vertical measurement is 5&nbsp;inches, the pitch is 5/12 (about 22.6°, area factor about 1.083). Photograph the level reading so a supplier can sanity-check your number.</p>

      <h2>Why does roof pitch matter for shingles?</h2>
      <p>Pitch converts plan area to actual roof surface and affects product choice. Steeper roofs need more shingles for the same house footprint. Low slopes may need different underlayment or systems. After you know pitch, estimate squares and bundles with the <a href="/guides/how-to-estimate-roofing-shingles/">roofing shingles estimate guide</a> and the <a href="/calculators/roofing-shingles-calculator/">shingles calculator</a>.</p>
      <p>Example: a simple gable with 1,200&nbsp;sq&nbsp;ft of plan area at 6/12 has roof area ≈ 1,200 × 1.118 = 1,342&nbsp;sq&nbsp;ft = 13.42 squares. With about 10% waste → roughly 14.8 squares. At 3 bundles per square (common for many asphalt products per IKO and GAF), that is about 45 bundles before starter and ridge pieces.</p>

      <h2>Can I measure roof pitch from the ground or the roof surface?</h2>
      <p>Ground apps and sight estimates can ballpark pitch, but material orders deserve a direct rise-over-run measurement on a rafter, rake, or drawing. Measuring on the roof surface only makes sense with fall protection, dry conditions, and experience. Prefer the attic when you can reach a rafter safely.</p>

      <div class="takeaway"><strong>Safety:</strong> Never walk a wet, frosty, or steep roof without training and fall protection. Hire a pro when in doubt.</div>

      <h2>Tips</h2>
      <ul>
        <li>Measure more than one rafter. Renovations sometimes mix pitches.</li>
        <li>Keep units consistent. Mixing centimeters of rise with inches of run ruins the ratio.</li>
        <li>Run is horizontal, not along the slope of the rafter.</li>
        <li>Use pitch together with plan dimensions. Pitch alone does not tell you how many squares to buy.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Walking a wet roof without fall protection to “quickly” check pitch.</li>
        <li>Reporting angle degrees when a supplier asked for X-in-12 (or the reverse).</li>
        <li>Using plan area as shingle area on a steep roof without an area factor.</li>
        <li>Measuring along the rafter slope and calling that “run.”</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.iko.com/na/blog/how-many-shingles-in-a-bundle/" rel="noopener noreferrer">IKO – How many shingles in a bundle (squares, bundles, 6:12 factor 1.118, waste)</a></li>
        <li><a href="https://www.gaf.com/en-us/blog/your-home/how-to-measure-a-roofing-square-3faec381-6f6f-49ff-841f-114c59108f2a" rel="noopener noreferrer">GAF – How to measure a roofing square (100 sq ft, bundles per square, overage)</a></li>
      </ul>
  `,

  'grass-seed-per-sq-ft': `      <div class="takeaway"><strong>Key takeaway:</strong> Bag labels and extension charts list grass seed in pounds per 1,000 square feet. Convert with (lawn sq&nbsp;ft ÷ 1,000) × rate. Iowa State PM 1072 publishes exact cool-season mixture rates; warm-season grasses need a Southern extension source.</div>

      <h2>How much grass seed per 1,000 sq ft?</h2>
      <p>Use pounds of seed per 1,000 square feet, then scale to your lawn. Seed (lb) = (area ÷ 1,000) × label or extension rate. Iowa State Extension PM 1072 lists rates from 1–1.5 lb per 1,000 for 100% Kentucky bluegrass up to 7–9 lb for 100% tall fescue. There is no single universal ounces-per-square-foot figure.</p>
      <p>YardTally’s <a href="/calculators/grass-seed-calculator/">grass seed calculator</a> uses adjustable defaults in a common cool-season blend ballpark (about 3.5 lb per 1,000 for new lawn and about 1.75 lb per 1,000 for overseed). Those defaults are planning aids only. Replace them with the PM 1072 row for your mix or the rate printed on the seed you buy.</p>

      <h2>Iowa PM 1072 seeding rates (lb per 1,000 sq ft)</h2>
      <div class="table-scroll">
      <table>
        <caption>Exact cool-season seed rates from Iowa State Extension PM 1072</caption>
        <thead>
          <tr><th>Seed mixture</th><th>lb / 1,000 sq ft</th></tr>
        </thead>
        <tbody>
          <tr><td>100% Kentucky bluegrass</td><td>1–1.5</td></tr>
          <tr><td>20% perennial ryegrass + 80% bluegrass</td><td>2–2.5</td></tr>
          <tr><td>50% perennial ryegrass + 50% bluegrass</td><td>3–3.5</td></tr>
          <tr><td>50% red fescue + 50% bluegrass</td><td>2.5–3</td></tr>
          <tr><td>100% red fescue</td><td>3.5–4.5</td></tr>
          <tr><td>100% tall fescue</td><td>7–9</td></tr>
        </tbody>
      </table>
      </div>
      <p>Iowa’s tall fescue page repeats the 7–9 lb per 1,000 recommendation and notes a 90–95% tall fescue / 5–10% Kentucky bluegrass mix can help uniformity. Warm-season grasses such as bermudagrass and zoysia often use vegetative planting or different seed products. Do not invent rates here; check a Southern university extension fact sheet for your species and county.</p>

      <h2>Worked example: 50 × 40 ft lawn</h2>
      <p>A 50 × 40 ft lawn is 2,000 square feet (2 × 1,000). Using the calculator’s default new-lawn rate of 3.5 lb per 1,000:</p>
      <p>(2,000 ÷ 1,000) × 3.5 = <strong>7 lb of seed for a new lawn</strong>.</p>
      <p>At the default overseed rate of 1.75 lb per 1,000: <strong>3.5 lb for overseeding</strong>.</p>
      <p>If your tall-fescue bag follows PM 1072 at 8 lb per 1,000 on bare soil, the same yard needs 16 lb. That is more than double the cool-season blend default. Before seeding, thin thatch, rake bare spots, and consider a light topdressing so seed contacts soil. Estimate fill with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>, then compare products in <a href="/guides/topsoil-vs-garden-soil/">topsoil vs garden soil</a>. After establishment, see <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">fertilizer nitrogen per 1,000 sq ft</a> and the <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a>.</p>

      <h2>Cool-season timing (PM 1072)</h2>
      <p>PM 1072 says the best time to seed a lawn in Iowa is between mid-August and mid/late September. Lawns can still establish as late as late September in central Iowa and early October in southern Iowa. Late summer planting is preferred to spring because warm soil and cool nights favor seedlings. Spring seeding is possible with irrigation but often fights more annual weeds. Seeding from late May to mid-August is extremely difficult and usually unsuccessful per that publication.</p>

      <p>Bag labels that claim “covers X square feet” assume a specific lb-per-1,000 rate. Recalculate from the printed rate and your measured area instead of trusting the marketing coverage claim alone.</p>

      <h2>Is grass seed sold in pounds per square foot?</h2>
      <p>Usually no. Bags and extension charts list pounds per 1,000 square feet. To get an approximate pounds-per-square-foot figure, divide the lb-per-1,000 rate by 1,000 (for example, 3.5 lb per 1,000 is 0.0035 lb per sq ft). Keep the 1,000-sq-ft rate as the working number so you match the bag and PM 1072.</p>

      <h2>Is overseeding half the new-lawn rate?</h2>
      <p>Often lower, but not always exactly half. Use the overseed line on your bag. Tall fescue that clumps may need interseeding with the same species every few years. Iowa’s tall fescue guidance discusses that separately from a full new-lawn rate. Do not invent a universal half-rate rule.</p>

      <h2>Step-by-step: buy the right amount of seed</h2>
      <ol>
        <li>Measure each lawn rectangle (or break irregular shapes into rectangles) and add square feet.</li>
        <li>Decide new lawn vs overseed.</li>
        <li>Pick the PM 1072 mixture row that matches your seed, or read the bag’s lb per 1,000 rate.</li>
        <li>Compute seed pounds with the formula above or the <a href="/calculators/grass-seed-calculator/">grass seed calculator</a>.</li>
        <li>Buy a little extra for thin spots and calibration error.</li>
        <li>Divide seed in half and walk perpendicular passes for even coverage.</li>
        <li>Keep the surface moist until seedlings establish; avoid a hard crust.</li>
      </ol>

      <h2>Tips for even coverage</h2>
      <ul>
        <li>Match spreader settings to the bag chart when provided.</li>
        <li>Mix seed in the hopper so fines do not settle and stripe the lawn.</li>
        <li>Flag irrigation heads and edges so corners do not get a double dump.</li>
        <li>Read purity and germination on the seed tag; cheap bags with high inert matter deliver less live seed per pound.</li>
        <li>Pair seeding with soil testing before heavy fertilizer programs.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using a new-lawn rate on dense existing turf.</li>
        <li>Assuming a blog’s “oz per sq ft” equals every bag.</li>
        <li>Seeding onto hard, unrepaired soil without scarifying or topdressing.</li>
        <li>Copying cool-season rates onto bermuda or zoysia without a Southern source.</li>
        <li>Watering so heavily that seed washes into clumps.</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/files/inline-files/PM1072.pdf" rel="noopener noreferrer">Iowa State Extension – Establishing a Lawn from Seed (PM 1072)</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/all-about-tall-fescue-low-maintenance-alternative-kentucky-bluegrass" rel="noopener noreferrer">Iowa State Extension – Turf-type tall fescue seeding rates</a></li>
      </ul>
`,

  'fertilizer-nitrogen-per-1000-sq-ft': `      <div class="takeaway"><strong>Key takeaway:</strong> Product pounds = (nitrogen pounds you want per 1,000 sq&nbsp;ft) ÷ (N% as a decimal). Example: 1&nbsp;lb&nbsp;N with a 30-0-4 bag → 1 ÷ 0.30 ≈ 3.3&nbsp;lb of product per 1,000&nbsp;sq&nbsp;ft. Follow the label, soil test, and any local turf nutrient law.</div>

      <h2>How do I calculate fertilizer for 1 lb N per 1000?</h2>
      <p>Divide 1 by the nitrogen decimal from the bag. For 30-0-4, 1 ÷ 0.30 ≈ 3.3 lb of product per 1,000 sq ft. Multiply by (lawn sq ft ÷ 1,000) for the whole lawn. That is the same math behind YardTally’s <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a>. Defaults are for planning; your soil test and product label override them.</p>
      <p>Plain-language formulas:</p>
      <p><strong>Product lb per 1,000 sq ft = N lb desired per 1,000 ÷ (N percent ÷ 100).</strong></p>
      <p><strong>Total product lb = (lawn sq ft ÷ 1,000) × product lb per 1,000.</strong></p>

      <h2>What does 30-0-4 mean?</h2>
      <p>Thirty percent nitrogen, zero phosphate, and four percent potash by weight. A 10 lb bag of 30-0-4 contains about 3 lb of nitrogen (10 × 0.30). Pennsylvania’s homeowner fertilizer page walks through the same label math: convert the first number to a decimal and multiply by the product pounds you spread per 1,000 sq ft to find actual nitrogen delivered.</p>
      <p>Skip phosphorus unless a soil test or an establishment exception allows it under local rules. Many turf laws restrict phosphate on established lawns.</p>

      <h2>Is 1 lb N always correct?</h2>
      <p>No. One pound of nitrogen per 1,000 sq ft is a planning example, not a universal prescription. Penn State discusses about 2 lb N per 1,000 per season as a starting annual rate. Pennsylvania law caps total N near 0.9 lb per 1,000 per application. Split that ~2 lb annual starting rate into thirds to stay under the 0.9 cap.</p>
      <p>Species matter too. Iowa State’s tall fescue guidance says a single late-October/early-November application of about 1 lb N per 1,000 sq ft may be adequate for low-maintenance tall fescue. Higher-maintenance schedules add smaller spring and fall amounts. Match the grass and the law where you live.</p>

      <h2>Worked example: 50 × 40 ft lawn, 30-0-4, 1 lb N per 1,000</h2>
      <p>Area = 50 × 40 = 2,000 sq ft. Target = 1 lb nitrogen per 1,000 sq ft. Analysis = 30-0-4.</p>
      <p>Product per 1,000 = 1 ÷ 0.30 ≈ 3.333 lb.</p>
      <p>Total product for 2,000 sq ft = 2 × 3.333 ≈ <strong>6.67 lb of 30-0-4</strong> (matches the fertilizer calculator for these inputs).</p>
      <p>If the same nitrogen target used a 25-0-5 product, product per 1,000 = 1 ÷ 0.25 = 4 lb, and the 2,000 sq ft lawn would need about 8 lb of product. Pair fertility with cultural care. Returning clippings recycles nutrients. Seeding thin areas is a separate calculation; see <a href="/guides/grass-seed-per-sq-ft/">grass seed per 1,000 sq ft</a> and the <a href="/calculators/grass-seed-calculator/">grass seed calculator</a>.</p>

      <h2>Quick conversion table</h2>
      <div class="table-scroll">
      <table>
        <caption>Product pounds per 1,000 sq ft to deliver 1 lb actual nitrogen</caption>
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
      <p>If your target is 0.67 lb N per 1,000 (one-third of a 2 lb annual starting rate), multiply every product figure by 0.67. If the bag prints “covers X sq ft,” verify that the implied nitrogen matches your plan and local limits.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Soil-test for pH, phosphorus, and potassium.</li>
        <li>Choose an annual nitrogen budget (Penn State’s ~2 lb starting discussion is one cool-season reference) and split it across active growth, often into two or three applications.</li>
        <li>Confirm any state per-application cap (Pennsylvania: 0.9 lb total N per 1,000 unless enhanced-efficiency rules apply).</li>
        <li>Read the three-number analysis on the bag.</li>
        <li>Compute product pounds with the formula or the <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a>.</li>
        <li>Calibrate the spreader; keep product off hardscapes and storm drains.</li>
        <li>Water in if the label says to; avoid applying before heavy runoff-producing storms.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Prefer products with a meaningful slow-release nitrogen fraction when the label offers that option.</li>
        <li>Raise mowing height within the grass’s recommended range.</li>
        <li>Measure lawn area carefully; guessing “a quarter acre” can double your product buy.</li>
        <li>Store opened bags dry and sealed.</li>
        <li>For low-maintenance tall fescue, Iowa’s late-fall 1 lb N application is a species-specific option, not a rule for every lawn.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Spreading “one bag per lawn” without doing N math.</li>
        <li>Confusing product pounds with nitrogen pounds.</li>
        <li>Applying the full annual nitrogen budget in a single spring dump.</li>
        <li>Ignoring state or municipal fertilizer restrictions near water.</li>
        <li>Fertilizing drought-dormant turf expecting a miracle green-up.</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://extension.psu.edu/spring-tips-for-a-watershed-friendly-yard" rel="noopener noreferrer">Penn State Extension – Spring tips for a watershed-friendly yard (~2 lb N/1,000 starting annual rate)</a></li>
        <li><a href="https://www.pa.gov/agencies/pda/plants-land-water/fertilizer/homeowners-and-applicators" rel="noopener noreferrer">Pennsylvania PDA – Homeowner fertilizer limits (0.9 lb total N/application)</a></li>
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/all-about-tall-fescue-low-maintenance-alternative-kentucky-bluegrass" rel="noopener noreferrer">Iowa State Extension – Tall fescue fertility (about 1 lb N late fall for low-maintenance lawns)</a></li>
      </ul>
`,

  'raised-bed-soil-mix-4x8': `      <div class="takeaway"><strong>Key takeaway:</strong> Soil volume for a raised bed is length × width × depth using interior dimensions. A 4×8 ft bed 12 in deep holds 32 cu ft (about 1.19 cu yd). Iowa State Extension describes equal parts topsoil, organic matter, and coarse sand, or about 70% topsoil and 30% compost.</div>

      <h2>How much soil for a 4×8?</h2>
      <p>At 12 inches deep, a 4×8 ft bed needs 32 cubic feet of mix, about 1.19 cubic yards. At 18 inches, it needs 48 cubic feet, about 1.78 cubic yards. Multiply interior length × width × depth in feet. Measure inside the frame before you order bags or bulk so board thickness does not inflate the volume.</p>
      <p>The <a href="/calculators/raised-bed-soil-calculator/">raised bed soil calculator</a> returns cubic feet, yards, and an approximate count of 1.5 cu ft bags. For paths or topping beside the bed, use the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>. After planting, see the <a href="/guides/mulch-depth-guide/">mulch depth for gardens</a> guide and the <a href="/guides/mulch-for-common-garden-beds/">mulch for common garden beds</a> chart. Choosing bagged products is easier once you understand <a href="/guides/topsoil-vs-garden-soil/">topsoil vs garden soil</a>.</p>

      <h2>What is a good soil mix?</h2>
      <p>Iowa State Extension’s raised-bed FAQ describes an excellent mix as equal parts topsoil, organic matter (compost, well-rotted manure, or peat), and coarse sand. Another option listed there is about 70% topsoil and 30% compost. Use mature compost that is not overly salty, and avoid contaminated fill soil.</p>
      <p>At 12 inches depth (32 cu ft total), an equal-parts mix is about 10.7 cu ft of each component. A 70/30 mix is about 22.4 cu ft topsoil and 9.6 cu ft compost. Pick one coherent recipe and stick to it rather than stacking every internet blend at once.</p>

      <h2>How deep should the soil be?</h2>
      <p>Depth depends on crops and whether roots can enter native soil below. Many vegetables grow well in about a foot of improved media; deep-rooted crops appreciate more. If the bed sits on open ground and you loosen native soil below, a 10–12 inch fill may behave deeper than the same fill on a sealed patio.</p>
      <p>On hardscape, plan the full root depth inside the box and favor mixes that drain freely so the bed does not become a stagnant tub after storms. Width matters for access: many gardeners keep beds near 3–4 ft wide so they never step on the growing media.</p>

      <h2>How bed volume is calculated</h2>
      <p><strong>Cubic feet = length (ft) × width (ft) × (depth in inches ÷ 12).</strong></p>
      <p><strong>Cubic yards = cubic feet ÷ 27.</strong></p>
      <p>Depth is the finished soil depth you want after settling, not the board height if you leave freeboard at the top.</p>

      <h2>Worked example: 4×8 bed at 12 in and 18 in</h2>
      <p>Interior footprint = 4 × 8 = 32 sq ft.</p>
      <p>At 12 in depth: 32 × (12÷12) = <strong>32 cu ft ≈ 1.185 cu yd</strong>. At 1.5 cu ft per bag that is about <strong>22 bags</strong> before you blend multiple products (matches raised-bed calculator output).</p>
      <p>At 18 in depth: 32 × 1.5 = <strong>48 cu ft ≈ 1.778 cu yd</strong>, roughly <strong>32</strong> of those 1.5 cu ft bags.</p>

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
      <p>Bulk delivery often becomes cheaper near or above one cubic yard if you can wheelbarrow from the driveway. Bagged mixes win on small top-ups and patio beds with no native soil contact.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Build or place the frame on a level, well-drained spot; confirm interior length and width with a tape.</li>
        <li>Choose crop-appropriate depth (many gardeners start near 10–12 in of quality media).</li>
        <li>Calculate volume with the formula or raised-bed calculator.</li>
        <li>Select an Iowa-style mix (equal parts topsoil / organic matter / coarse sand, or ~70% topsoil / ~30% compost) or a reputable bagged raised-bed mix.</li>
        <li>Remove sod if present and loosen native soil at the base when the bed sits on ground so layers do not perch water.</li>
        <li>Add mix in lifts and incorporate into the existing soil as Iowa recommends, lightly firming without compacting like a road base.</li>
        <li>Water to settle, top off, soil-test after settling, then mulch paths and bed surfaces as appropriate.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Order a little extra; mixes settle and compost volume shrinks over a season.</li>
        <li>Ask bulk yards about screening, weed seeds, and whether the “topsoil” is sandy loam or heavy clay.</li>
        <li>Keep treated lumber ratings appropriate for garden contact if you use pressure-treated sides.</li>
        <li>Replenish organic matter annually; beds shrink as carbon decomposes.</li>
        <li>Use mulch to cut evaporation; see the mulch depth guide for 2–3 in bed norms.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Buying “4×8” volume using outside board dimensions.</li>
        <li>Filling only with pure compost or pure manure.</li>
        <li>Creating a bathtub on compacted subgrade with no drainage path.</li>
        <li>Mixing unreliable units (inches of depth treated as feet).</li>
        <li>Assuming every bag labeled “garden soil” matches mineral topsoil; read the <a href="/guides/topsoil-vs-garden-soil/">comparison guide</a>.</li>
      </ul>

      <h2>Settling, top-offs, and weight</h2>
      <p>Freshly filled beds settle as air pockets collapse and organic matter breaks down, so it is normal to top off an inch or two after the first season. Fill to just below the rim at first so water does not wash soil over the edge. Mix components thoroughly rather than stacking abrupt layers that can slow water movement.</p>
      <p>Soil is heavy when wet. A full 4×8 bed is a substantial load for a deck or rooftop not designed for it. For deliveries over about one cubic yard, bulk soil is typically less expensive per cubic foot than bagged product, but you need a place for the pile and a plan to move it promptly.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/faq/what-would-be-good-soil-mix-raised-bed" rel="noopener noreferrer">Iowa State Extension – What would be a good soil mix for a raised bed?</a></li>
      </ul>
`,

  'how-much-paint-for-a-room': `      <div class="takeaway"><strong>Key takeaway:</strong> Estimate wall area as perimeter × ceiling height, subtract doors and windows, then divide by label coverage per coat. BEHR lists about 250–400 sq ft per gallon per coat for several ULTRA and PREMIUM PLUS interior paints; YardTally defaults to 350. Multiply by the number of coats and read your can.</div>

      <h2>How many square feet does a gallon of paint cover?</h2>
      <p>BEHR states that one gallon of BEHR ULTRA or PREMIUM PLUS interior paint and primer covers about 250 to 400 square feet in one coat. Textured walls, bare surfaces, and big color changes use more paint. YardTally’s paint calculator defaults to 350 square feet per gallon, which sits in that Behr range. Confirm the can for your product.</p>
      <p>Coverage is never a single magic number. Smooth, primed drywall often lands toward the high end of a label range. Porous new drywall, heavy texture, or a dark-to-light color change lands toward the low end and may need primer plus extra finish coats. Always use the coverage printed on the product you buy, then run the <a href="/calculators/paint-calculator/">paint calculator</a> with that number.</p>

      <h2>How much area will one gallon of paint cover?</h2>
      <p>Plan with the same 250–400 sq ft per gallon band Behr publishes for those interior lines, and treat 350 as a mid-range planning default until your can says otherwise. One gallon covers one coat on that area; two coats roughly double the gallons. Keep ceilings, trim, and doors as separate takeoffs so wall gallons stay accurate.</p>
      <p>Closets, hall returns, and accent walls should be measured on their own when the color differs. Open-concept rooms work better as separate wall planes than as one vague “living area” guess.</p>

      <h2>How room paint quantity is calculated</h2>
      <p>For a rectangular room:</p>
      <p><strong>Wall area = 2 × (length + width) × height.</strong></p>
      <p><strong>Paintable area ≈ wall area − door areas − window areas.</strong></p>
      <p><strong>Gallons per coat ≈ paintable area ÷ coverage (sq ft per gallon).</strong></p>
      <p><strong>Total gallons ≈ gallons per coat × coats.</strong></p>
      <p>YardTally’s paint calculator uses that layout with default door and window sizes (about 20 and 15 sq ft each unless you override) and a default coverage of 350 sq ft per gallon. That default sits inside Behr’s published 250–400 range for several ULTRA and PREMIUM PLUS interior products. The can in your hand still controls the buy.</p>

      <h2>How much paint for a 12×12 room?</h2>
      <p>With 8 ft ceilings, wall area is 2 × (12 + 12) × 8 = 384 sq ft before openings. After one door and two windows (~50 sq ft), about 334 sq ft remains. At 350 sq ft per gallon, one coat is about 1.0 gallon and two coats about 1.9; plan on two gallons of the same tint batch.</p>
      <p>If your surface eats paint closer to 300 sq ft per gallon, two coats need (334 × 2) ÷ 300 ≈ 2.2 gallons. Round up so you do not split dye lots mid-wall. Run the same length, width, height, openings, and coverage in the paint calculator to match these numbers.</p>

      <h2>Worked example: 12 × 14 ft room, 8 ft ceilings</h2>
      <p>Perimeter contribution: 2 × (12 + 14) = 52 ft. Wall area = 52 × 8 = <strong>416 sq ft</strong>.</p>
      <p>Subtract one door (20 sq ft) and two windows (2 × 15 = 30 sq ft): paintable = 416 − 50 = <strong>366 sq ft</strong>.</p>
      <p>At 350 sq ft per gallon: 366 ÷ 350 ≈ <strong>1.05 gallons for one coat</strong>. Two coats ≈ <strong>2.09 gallons</strong>. Buy three gallons if you want matching touch-up stock, or two gallons plus a quart when the store can match. These figures match the paint calculator for the same inputs.</p>

      <h2>How much paint for a small bathroom?</h2>
      <p>A compact 5 × 8 ft bath with 8 ft ceilings has about 208 sq ft of wall before openings. After one door and a small window, paintable walls land around 170–180 sq ft. At 350 sq ft per gallon, one coat is about half a gallon; two coats are roughly 1.0–1.1 gallons.</p>
      <p>One gallon may finish a same-color refresh. A deep color change or humid shower-adjacent walls still warrant a second gallon for touch-up and an extra coat. Confirm openings and ceiling height with the paint calculator; skip the ceiling and vanity doors unless you measure them separately.</p>

      <h2>Do I include the ceiling?</h2>
      <p>Not in the basic four-wall estimate. Ceiling paint is a separate product and a separate area: length × width, then apply the ceiling can’s coverage and coat count. Coffered or highly textured ceilings drink more paint than smooth drywall. Trim and doors are usually measured later in linear feet or as a small enamel budget once walls are ordered.</p>
      <p>Accent walls use the single-wall formula: wall width × height, minus openings on that wall only. Saturated accent colors often sit toward the low end of the label coverage range, so a test quart first is wise.</p>

      <h2>How much do doors and windows subtract?</h2>
      <p>YardTally defaults to about 20 sq ft per standard door and 15 sq ft per typical window. Measure oversized patio doors, sidelights, or picture windows and override those defaults. On small baths, openings remove a large share of wall area; on open plans with many windows, skipping openings underbuys paint.</p>
      <p>Do not subtract cabinets you plan to paint, and do not add openings you will not paint around. Only remove surfaces that stay unpainted.</p>

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

      <h2>Step-by-step</h2>
      <ol>
        <li>Measure length, width, and ceiling height in feet.</li>
        <li>Count doors and windows; measure unusual openings if they differ from typical sizes.</li>
        <li>Compute paintable wall area (or use the <a href="/calculators/paint-calculator/">paint calculator</a>).</li>
        <li>Read coverage and recommended coats on the product data sheet or can (Behr’s how-to notes 250–400 sq ft per gallon for several ULTRA and PREMIUM PLUS interior products).</li>
        <li>Divide and multiply for total gallons; round up to whole containers of the same tint batch.</li>
        <li>Add primer quantity separately when the label calls for it.</li>
        <li>Estimate trim linear feet later if you are brushing a contrasting enamel.</li>
      </ol>

      <h2>Surface prep that changes how much paint you need</h2>
      <p>Patched drywall, bare paper facing, glossy enamel, and nicotine-stained walls all affect how far a gallon goes. Sanding gloss, washing grease, and priming repairs usually improves finish uniformity and can reduce the urge to apply a third finish coat “just to hide.” Skipping prep rarely saves paint; it usually wastes it on uneven absorption and flashing.</p>
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
      <p>Sheen and tools influence how far paint goes. Flat finishes hide wall flaws but scuff more easily; satin and eggshell wipe clean in kitchens and hallways. A roller with a thicker nap holds more paint and suits textured walls, but it applies more paint per square foot than a thin nap on smooth drywall. Airless sprayers cover fast but typically waste more paint to overspray and cleanup than rolling does, so plan extra if you spray.</p>
      <p>Cutting in around trim and corners adds to usage, and so does paint left in trays, rollers, and brushes. A small buffer of around 10 percent is a common planning allowance. When a room has a dramatic color change, tinted primer can reduce the number of finish coats needed.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.behr.com/how-to/interior/determine-how-much-interior-paint-to-buy" rel="noopener noreferrer">BEHR – How much interior paint to buy (250–400 sq ft/gal guidance)</a></li>
      </ul>
  `,

  'paver-base-gravel-and-sand-depth': `      <div class="takeaway"><strong>Key takeaway:</strong> YardTally’s paver calculator defaults to about 4 inches of compacted gravel paver base plus about 1 inch of bedding sand under concrete pavers, then the paver thickness on top. Those depths are planning assumptions, not a universal standard. Exact depths depend on soil, traffic, climate, and the paver manufacturer’s installation sheet or local code. Calculate each layer’s volume separately.</div>

      <h2>How deep should paver base gravel be?</h2>
      <p>YardTally’s patio planning default is 4 inches of compacted angular paver base gravel; many DIY worksheets also use about 4 to 6 inches. That is a calculator starting point, not a code claim. Soft soils and freeze-thaw sites may need more on the manufacturer sheet. Driveway assemblies differ; do not copy patio defaults onto a driveway.</p>
      <p>Paver projects are stacked systems: compacted subgrade, aggregate base, bedding sand, pavers, and joint sand. Volume for any uniform layer is:</p>
      <p><strong>Cubic feet = area (sq ft) × (depth inches ÷ 12).</strong></p>
      <p><strong>Cubic yards = cubic feet ÷ 27.</strong></p>
      <p>The <a href="/calculators/paver-calculator/">paver calculator</a> counts pavers and also estimates bedding sand and gravel base using adjustable depths (defaults: 1 in sand, 4 in base). Refine bulk orders with the <a href="/calculators/gravel-calculator/">gravel calculator</a> and <a href="/calculators/sand-calculator/">sand calculator</a>. Choosing angular crushed stone versus decorative rounded rock is covered in <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>. The same angular-versus-rounded logic applies to patio bases that must lock under compaction.</p>

      <h2>How much sand under pavers?</h2>
      <p>YardTally’s bedding-sand default is 1 inch of screeded sand under concrete pavers. Joint sand is extra and much smaller in volume. Do not thicken the sand bed to hide a wavy base; that is a common settlement failure. Confirm the bedding depth on your paver brand’s current installation guide before you excavate.</p>
      <p>Sand should stay a consistent thickness across the field. Major low spots belong in the compacted gravel paver base, not in a deep sand pocket that will settle later.</p>

      <h2>How do I convert inches of base to tons?</h2>
      <p>Convert depth to cubic yards first: area × (inches ÷ 12) ÷ 27. Then ask your stone yard for tons per cubic yard for that specific aggregate, because density varies with rock type and moisture. The gravel calculator helps with volume; your supplier converts volume to tons for delivery.</p>
      <p>Example: 120 sq ft of 4-inch paver base is 120 × (4÷12) ÷ 27 ≈ 1.48 cu yd. If that yard quotes about 1.3 tons per yard for dense-grade base, order roughly 1.9 tons before waste, then add a little for edges and uneven excavation.</p>

      <h2>Worked example: 12 × 10 ft patio</h2>
      <p>Area = 120 sq ft. Using YardTally calculator defaults of 4 in compacted gravel paver base and 1 in bedding sand:</p>
      <ul>
        <li>Sand: 120 × (1÷12) = <strong>10 cu ft</strong> (about 0.37 cu yd).</li>
        <li>Base: 120 × (4÷12) ÷ 27 ≈ <strong>1.48 cu yd</strong> of gravel.</li>
      </ul>
      <p>If you thicken the paver base to 6 in because the manufacturer sheet or soil conditions call for it: 120 × 0.5 ÷ 27 ≈ <strong>2.22 cu yd</strong> gravel, with sand unchanged at 10 cu ft. Order extra aggregate for edge restraints, compaction loss, and uneven excavation. Paver count for 12×12 in units on this footprint is 120 pieces before waste; with 10% waste the calculator returns 132. Buy the waste factor your pattern needs (diagonal cuts need more).</p>

      <h2>Layer depth reference table</h2>
      <div class="table-scroll">
      <table>
        <caption>Example material volumes for a 120 sq ft patio (YardTally planning depths unless noted; verify on the paver sheet)</caption>
        <thead>
          <tr><th>Layer</th><th>Depth</th><th>Volume</th></tr>
        </thead>
        <tbody>
          <tr><td>Bedding sand (calculator default)</td><td>1"</td><td>10 cu ft (0.37 cu yd)</td></tr>
          <tr><td>Paver base gravel (calculator default)</td><td>4"</td><td>≈1.48 cu yd</td></tr>
          <tr><td>Paver base gravel (thicker planning option)</td><td>6"</td><td>≈2.22 cu yd</td></tr>
          <tr><td>Excavation (4" base + 1" sand + 2.375" paver example)</td><td>~7.4"</td><td>Plan drainage slope too</td></tr>
        </tbody>
      </table>
      </div>
      <p>Excavation depth must also create the finished surface elevation you want relative to doors and yard drainage. Slope pavers to shed water per manufacturer guidance. Do not trap runoff against siding.</p>

      <h2>Patio paver base vs driveway sections</h2>
      <p>Driveway gravel depths and patio paver base depths are not interchangeable. A driveway carries vehicle loads and often uses a thicker aggregate section, different edge details, and sometimes a different stone gradation. If you came from the driveway gravel types guide for material intuition, keep the angular-stone lesson and still read the patio or driveway detail that matches the traffic you expect.</p>
      <p>Retaining-wall trenches are another assembly again. Compacted gravel under wall blocks is related in material choice but not the same thickness or trench shape as a patio paver base. Compare with the <a href="/guides/retaining-wall-blocks-and-base/">retaining wall blocks and base</a> guide when you are holding soil, not paving a patio.</p>

      <h2>Subgrade, geotextile, and edge restraint</h2>
      <p>Even perfect gravel depth fails on pumping mud. Excavate soft organic soil, compact the subgrade, and consider a geotextile separator when fines from below will migrate into the open-graded stone. Follow site conditions and manufacturer notes rather than treating fabric as mandatory everywhere. Edge restraint (plastic spike-down, concrete curb, or other approved systems) keeps perimeter pavers from migrating; without it, joint lines open and the sand bed creeps.</p>
      <p>Compaction equipment should match the job size. Plate compactors are standard for residential patios; compact the base in lifts instead of placing all the stone at once and buzzing the top. When compacting on top of pavers, use protective pads if the paver producer requires them so you do not spall the surface.</p>
      <p>Climate matters. Freeze-thaw regions punish trapped water. Drainage should move water through and out of the system, not store it in a bathtub excavation. In arid climates, dust control and joint sand loss from wind can be the bigger maintenance issue. Still build a competent paver base so irrigation runoff does not undermine edges.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Confirm paver thickness and the manufacturer’s current paver base and sand recommendations.</li>
        <li>Outline the patio; measure length and width; decide waste percent for cuts.</li>
        <li>Excavate to subgrade, removing soft spots; compact the native soil.</li>
        <li>Place geotextile if specified for your soil conditions.</li>
        <li>Install angular paver base gravel in lifts, compacting each lift to the target thickness.</li>
        <li>Screed a uniform bedding sand layer (YardTally default 1 in) without using sand to fix major base waves.</li>
        <li>Lay pavers, install edge restraint, compact, and sweep joint sand (polymeric only if the product instructions fit your climate and joints).</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Use crushed stone with fines (often sold as dense grade / crusher run) for bases that must lock. See the driveway gravel guide for material intuition, not for copying driveway thickness onto a patio.</li>
        <li>Keep sand bedding consistent; thick sand pockets settle and telegraph dips.</li>
        <li>Compact with a plate compactor rated for your paver type; use protective pads when required.</li>
        <li>Account for delivery minimums. A 1.5 cu yd ticket may beat multiple small loads.</li>
        <li>Check HOA and municipal rules for impermeable cover limits.</li>
        <li>String-line elevations before excavating so the finished patio meets door thresholds with the correct step-down.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Skipping compaction and blaming the pavers later.</li>
        <li>Using rounded pea gravel as the structural paver base.</li>
        <li>Bedding sand deeper than recommended to hide a bad base.</li>
        <li>Forgetting edge restraint so perimeter pavers creep.</li>
        <li>Ordering only pavers and estimating base “by eye.”</li>
        <li>Building a flat patio that ponds against the house instead of sloping away for drainage.</li>
        <li>Reusing driveway depth numbers on a patio (or patio defaults on a driveway) without reading the matching assembly.</li>
      </ul>

      <h2>Slope, compaction, and joint sand</h2>
      <p>Patios should shed water. A frequently cited guideline is a slope of about one-quarter inch per foot (roughly 2 percent) directed away from buildings, but follow your paver manufacturer's instructions and any local requirements. Build that slope into the compacted paver base and screeded bedding layer instead of trying to correct it with sand, which should stay at a uniform depth. Compact the base in lifts, commonly in layers no thicker than about four inches, with a plate compactor, moistening dry aggregate slightly if the manufacturer advises.</p>
      <p>After the pavers are laid and cut, edge restraints keep the field from spreading, and joint sand is swept into the gaps and compacted. Polymeric sand can reduce weed growth and sand loss when it is installed according to its directions, while plain sand is cheaper but may require refilling. Order a bit more joint sand than the bedding estimate suggests, because it gets swept off the surface and into the joints repeatedly.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li>Follow the current installation sheet for your paver brand for paver base gravel depth, bedding sand thickness, edge restraint, and joint sand. YardTally’s 4 in base / 1 in sand figures are calculator planning defaults until that sheet says otherwise.</li>
      </ul>
  `,

  'deck-material-list-12x16': `      <div class="takeaway"><strong>Key takeaway:</strong> This page is a shopping takeoff for a 12×16 ft rectangular deck, not a set of construction plans and not a priced bill of materials. Board count follows covering width ÷ board face width; joists follow span ÷ spacing + 1. YardTally defaults use about 5.5 in effective board width and 16 in on-center joists as planning assumptions. Orientation of the 12 and 16 matters.</div>

      <h2>Is this a 12×16 deck plan or a material list?</h2>
      <p>It is a material-list starting point for shopping, not construction plans and not a priced BOM. Board, joist, and fastener counts help you order lumber. Verify joist and beam sizes against current AWC or DCA span tables, the decking brand, and local permits before you build.</p>
      <p>The <a href="/calculators/deck-material-calculator/">deck material calculator</a> encodes that simplified model with defaults of 5.5 in board width (dimensional 6 in decking allowance for gap), 12 ft board length, 16 in joist spacing, and about two screws per board-foot. Real decks also need beams, posts, footings, ledger details, flashing, railings, and lateral bracing. None of those are fully designed here.</p>
      <p>For a larger sister takeoff, see the <a href="/guides/deck-material-list-16x24/">16×24 deck material list</a>. Ground-level pads and stairs often need concrete; see <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a> and the <a href="/guides/how-much-concrete-in-a-sonotube/">Sonotube concrete guide</a> when estimating footing mix. Low retaining edges beside a patio-to-deck transition are a different system; compare with the <a href="/guides/retaining-wall-blocks-and-base/">retaining wall blocks and base</a> guide if you are holding soil, not framing lumber.</p>

      <h2>How a basic deck takeoff works</h2>
      <p>For a rectangular deck with boards running along the length dimension:</p>
      <ul>
        <li><strong>Board rows</strong> ≈ ceil(width ÷ board face width).</li>
        <li><strong>Boards per row</strong> ≈ ceil(length ÷ board stock length).</li>
        <li><strong>Deck boards</strong> = rows × boards per row.</li>
        <li><strong>Joists</strong> ≈ floor(length ÷ joist spacing) + 1 (plus separate rim/band joists in many layouts).</li>
      </ul>

      <h2>How many deck boards for a 12×16 deck?</h2>
      <p>With YardTally defaults (5.5 in face, 12 ft stock) and boards running 12 ft across a 16 ft width, plan on about 35 twelve-foot boards before waste. Boards the other way need about 54 twelve-foot pieces because you splice along the longer run. Sketch board direction before you order.</p>
      <p>Using calculator inputs length = 12 ft (board direction), width = 16 ft (across boards), 5.5 in face width, 12 ft boards, 16 in joist spacing:</p>
      <ul>
        <li>Area = <strong>192 sq ft</strong>.</li>
        <li>Rows = ceil(16 ÷ 5.5/12) = <strong>35 board rows</strong>; boards per row = 1 → <strong>35 deck boards</strong> (each 12 ft).</li>
        <li>Board linear feet = 35 × 12 = 420; screws ≈ 840 at two per board-foot.</li>
      </ul>
      <p>Add waste for bad boards, picture-frame borders, and angle cuts. Composite decking may use different widths, hidden clips, and gapping rules. Follow that brand’s installation guide rather than wood defaults.</p>

      <h2>What joist spacing should I use?</h2>
      <p>YardTally’s calculator default is 16 inches on center, a planning assumption for many wood decks. Some composites require 12 in O.C., and spans change with species, grade, and load. Check current AWC or DCA tables and your decking brand; a standards homepage is not a span table.</p>
      <p>For the 12 ft board-run orientation above, field joists = floor(12 ÷ 16/12) + 1 = <strong>10 joists</strong>; rim joists are counted separately as 2 in the tool. Reverse the orientation (length = 16, width = 12) and the same defaults return 13 field joists because the joist span direction changed.</p>

      <h2>Does this include railings and stairs?</h2>
      <p>No. Railings, guards, stairs, and landings are separate takeoffs with their own post layout, baluster spacing, and rise/run rules. This list covers rectangular field decking and a simplified joist count only. Add those systems on the sketch before you call the material list “complete.”</p>
      <p>Railings can also force stronger boundary joists or blocking. Stairs need consistent rise and run within local tolerances. None of those counts come from the simple rectangular decking estimator.</p>

      <h2>Planning table (YardTally defaults, boards along first dimension)</h2>
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

      <h2>Beyond boards: beams, posts, and footings</h2>
      <p>A board-and-joist shopping list is only the deck skin and ribs. Beams that carry joists, posts that carry beams, and footings that carry posts must be sized for tributary load, snow load where applicable, and species/grade. Many jurisdictions require permits and inspections for elevated decks. Ledger connections to houses need correct flashing and tension hardware; free-standing decks need adequate bracing against lateral movement.</p>
      <p>Footing volume is a concrete problem, not a decking problem. Once you know diameter and depth (often to below frost), estimate bags or yards with the <a href="/calculators/sonotube-concrete-calculator/">Sonotube / concrete tube calculator</a> and guides such as <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a> or <a href="/guides/how-much-concrete-in-a-sonotube/">how much concrete in a Sonotube</a>. Do not pour footings on organic topsoil.</p>
      <p>If your deck meets a grade change or patio, you may also be holding soil with a short wall. That is a different system. See <a href="/guides/retaining-wall-blocks-and-base/">retaining wall blocks and base</a> rather than improvising landscape blocks as structural deck foundations.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Confirm finished deck size, height, ledger vs freestanding, and railing needs with local code.</li>
        <li>Choose decking direction for appearance and span.</li>
        <li>Run the <a href="/calculators/deck-material-calculator/">deck material calculator</a> with your board width and joist spacing.</li>
        <li>Size beams and posts from current AWC/DCA span tables or an engineer. Do not guess from board count alone.</li>
        <li>Plan footings below frost where required; estimate concrete separately.</li>
        <li>Order fasteners rated for the lumber or composite system (and treated lumber compatibility).</li>
        <li>Dry-fit patterns, then fasten per manufacturer spacing diagrams.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Treat 16 in on-center as a YardTally planning default until span tables and the decking brand say otherwise.</li>
        <li>Crown joists up; align fastener rows for a cleaner look.</li>
        <li>Flash ledgers properly; deck ledger failures are a known safety issue when details are skipped.</li>
        <li>Account for stair stringers and landing framing as extra takeoffs.</li>
        <li>Stain or seal according to product instructions after moisture targets are met.</li>
        <li>Compare counts with the larger <a href="/guides/deck-material-list-16x24/">16×24 deck material list</a> if you are sizing up later.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Ordering boards without deciding orientation and seam layout.</li>
        <li>Using interior fasteners on exterior treated lumber.</li>
        <li>Ignoring post-to-beam hardware and lateral load paths.</li>
        <li>Assuming this material list replaces a permit set of drawings.</li>
        <li>Forgetting that railings can require stronger boundary joists or blocking.</li>
        <li>Citing a standards-organization homepage as if it were the span table you actually checked.</li>
      </ul>

      <h2>Permits, footings, and guards</h2>
      <p>Deck projects commonly require a permit and inspections, and the rules cover items a board count cannot: footing size and depth, ledger attachment, joist and beam spans, stair geometry, and guards. Model codes generally call for guards when the walking surface is more than 30 inches above the ground, but local amendments differ. Footing depth must reach below the local frost depth in cold climates, which also affects how much concrete you order. Confirm all of this with your building department before buying lumber.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li>Check current American Wood Council (AWC) / DCA deck span tables and your decking brand’s installation guide for joist spacing and allowable spans. YardTally’s 5.5 in face width and 16 in O.C. joist figures are calculator planning defaults, not engineered design.</li>
      </ul>
  `,

  'deck-material-list-16x24': `      <div class="takeaway"><strong>Key takeaway:</strong> A 16×24 ft deck is 384 sq&nbsp;ft of footprint. Board and joist counts depend on decking direction. With YardTally defaults (5.5&nbsp;in face width, 12&nbsp;ft stock, 16&nbsp;in O.C. joists) and boards running the 24&nbsp;ft direction, plan about <strong>70</strong> deck boards and <strong>19</strong> field joists before waste, then add beams, posts, footings, and fasteners. This is a takeoff starting point, not construction plans.</div>

      <h2>Is a 16×24 list the same as 12×16 scaled?</h2>
      <p>No. Same takeoff method, but you cannot multiply the 12×16 counts by area and call it done. Orientation, stock splices, and joist span direction change the math, and a 16×24 usually needs a larger footing and beam plan. Use these numbers or set length = 24 and width = 16 in the deck calculator.</p>
      <p>Compare the smaller sister takeoff in the <a href="/guides/deck-material-list-12x16/">12×16 deck material list</a> to sanity-check orientation logic, not to scale counts. Run the live tool in the <a href="/calculators/deck-material-calculator/">deck material calculator</a> when your board width or joist spacing differs from YardTally defaults.</p>

      <h2>Clear assumptions for this material list</h2>
      <ul>
        <li><strong>Shape:</strong> simple rectangle, 16&nbsp;ft × 24&nbsp;ft finished decking (no stairs, no picture-frame border, no curves).</li>
        <li><strong>Decking:</strong> boards run the <strong>24&nbsp;ft</strong> direction; covering width is 16&nbsp;ft; effective face width 5.5&nbsp;in (typical 6&nbsp;in nominal + gap); stock length 12&nbsp;ft (two boards per row).</li>
        <li><strong>Joists:</strong> YardTally planning default of 16&nbsp;in on center along the 24&nbsp;ft span direction in the simplified calculator model; +2 rim/band joists counted separately.</li>
        <li><strong>Not included as structural design:</strong> beam size/species, post size, ledger vs freestanding choice, railing, stairs, lateral bracing, or frost-depth footings. Those need current AWC/DCA span tables, manufacturer charts, or an engineer and local permits.</li>
        <li><strong>Fasteners:</strong> ~2 exterior screws per board-foot as a shopping ballpark (hidden-clip systems differ).</li>
      </ul>

      <h2>How many deck boards for a 16×24 deck?</h2>
      <p>With YardTally defaults (5.5 in face, 12 ft stock) and boards running the 24 ft direction across a 16 ft width, plan on about 70 twelve-foot boards before waste. Boards the other way need about 106 twelve-foot pieces because you cover 24 ft of width with more rows. Add waste for bad boards, angle cuts, and borders.</p>
      <p>Using calculator inputs length = 24&nbsp;ft (board direction), width = 16&nbsp;ft (across boards), 5.5&nbsp;in face width, 12&nbsp;ft boards, 16&nbsp;in joist spacing:</p>
      <ul>
        <li>Area = <strong>384 sq&nbsp;ft</strong>.</li>
        <li>Rows = ceil(16 ÷ 5.5/12) = <strong>35 board rows</strong>; boards per row = ceil(24 ÷ 12) = 2 → <strong>70 deck boards</strong>.</li>
        <li>Board linear feet = 70 × 12 = <strong>840</strong>; screws ≈ <strong>1,680</strong> at two per board-foot.</li>
      </ul>
      <p>Composite decking may need different face widths, 12&nbsp;in O.C. joists, and brand-specific gapping. Follow that installation guide rather than wood defaults.</p>

      <h2>How many joists for a 16×24 deck?</h2>
      <p>At YardTally’s 16 in on-center planning default, boards along 24 ft imply about 19 field joists (+2 rim in the tool). Boards along 16 ft imply about 13 field joists. Verify spacing against current AWC/DCA span tables and your decking brand; some composites require 12 in O.C.</p>
      <p>Joists = floor(24 ÷ 16/12) + 1 = <strong>19 joists</strong> for the primary orientation above. Treat that as a shopping count, not a stamped framing plan.</p>

      <h2>Planning table (YardTally defaults)</h2>
      <div class="table-scroll">
      <table>
        <caption>Illustrative 16×24 ft decking counts (5.5&nbsp;in face, 12&nbsp;ft boards, 16&nbsp;in O.C.)</caption>
        <thead>
          <tr><th>Board run direction</th><th>Deck boards</th><th>Joists (field)</th><th>Board lin&nbsp;ft</th><th>Screws (est.)</th></tr>
        </thead>
        <tbody>
          <tr><td>Along 24&nbsp;ft (cover 16&nbsp;ft width)</td><td>70</td><td>19</td><td>840</td><td>1,680</td></tr>
          <tr><td>Along 16&nbsp;ft (cover 24&nbsp;ft width)</td><td>106</td><td>13</td><td>1,272</td><td>2,544</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Beams, posts, and layout (planning only)</h2>
      <p>A board-and-joist list is not a beam schedule. Common DIY patterns place beams under joists with posts at intervals allowed by the beam size and species, but allowable spans change with lumber grade, load (including snow), and whether the deck is attached or freestanding. Treat the following as a shopping conversation starter, not a code-compliant design:</p>
      <ul>
        <li><strong>Beams:</strong> count how many beam lines your sketch needs (often one or more under mid-span joists plus a rim or ledger condition). Length each beam to the post layout; include splice hardware if beams are not continuous.</li>
        <li><strong>Posts:</strong> one post at each beam support point that does not land on a ledger. A rough planning grid for a 16×24 freestanding deck might use posts every 6–8&nbsp;ft along beams. Confirm with span tables before buying.</li>
        <li><strong>Hardware:</strong> post bases, post caps, joist hangers, and structural screws/bolts rated for treated lumber outdoor use.</li>
      </ul>
      <p>Elevated decks, ledgers into house bands, and guards over 30&nbsp;in above grade commonly require permits and inspections. Do not scale a ground-level pad detail to a second-story deck.</p>

      <h2>Footings and concrete tubes</h2>
      <p>Each post that bears on soil needs a footing sized for load and frost depth. Once you know diameter and depth (often to below frost), estimate concrete with tube forms:</p>
      <ul>
        <li>Use the <a href="/calculators/sonotube-concrete-calculator/">concrete tube / Sonotube calculator</a> for cardboard forms (diameter × height × count).</li>
        <li>Worked tube examples and bag charts: <a href="/guides/how-much-concrete-in-a-sonotube/">how much concrete in a Sonotube</a>.</li>
        <li>Bag charts and waste notes: <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>.</li>
        <li>Round hole intuition for fence-style piers: <a href="/guides/how-much-concrete-for-fence-posts/">concrete for fence posts</a> (different detail than deck piers, still useful for bag math).</li>
      </ul>
      <p>Example planning ballpark only: eight 12&nbsp;in × 4&nbsp;ft tubes with 5% waste is on the order of two dozen 80&nbsp;lb bags. Recalculate for your actual pier count and frost depth. Never pour on organic topsoil or skip local frost requirements.</p>

      <h2>Fasteners and consumables checklist</h2>
      <ul>
        <li>Decking screws or hidden clips for the board lineal footage above.</li>
        <li>Joist hanger nails/screws per hanger schedule.</li>
        <li>Structural bolts/lags for post-beam and ledger connections as detailed.</li>
        <li>Flashing and tape for ledger attachments when the deck ties to the house.</li>
        <li>Joist tape or preservative on cut treated ends per product guidance.</li>
      </ul>

      <h2>Step-by-step</h2>
      <ol>
        <li>Confirm finished size (16×24), height, ledger vs freestanding, railing, and permit needs.</li>
        <li>Choose decking direction for appearance and joist span.</li>
        <li>Run the <a href="/calculators/deck-material-calculator/">deck material calculator</a> with your board width and stock length.</li>
        <li>Size beams and posts from current AWC/DCA span tables or an engineer. Do not guess from board count alone.</li>
        <li>Plan footings below frost where required; estimate concrete with the Sonotube tool and the <a href="/guides/how-much-concrete-in-a-sonotube/">Sonotube guide</a>.</li>
        <li>Order fasteners rated for the lumber or composite system.</li>
        <li>Dry-fit patterns, then fasten per manufacturer spacing diagrams.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Treat 16&nbsp;in on-center as a YardTally wood-deck planning default; some composites require 12&nbsp;in O.C. Check the brand.</li>
        <li>Crown joists up; keep fastener rows consistent.</li>
        <li>Flash ledgers properly; ledger failures are a known safety issue when details are skipped.</li>
        <li>Account for stair stringers and landing framing as extra takeoffs.</li>
        <li>Compare your counts against the smaller <a href="/guides/deck-material-list-12x16/">12×16 list</a> to sanity-check orientation math, not to scale the list.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Scaling the 12×16 list by area instead of re-running orientation math.</li>
        <li>Ordering boards without deciding orientation and seam layout on a 24&nbsp;ft run.</li>
        <li>Using interior fasteners on exterior treated lumber.</li>
        <li>Ignoring post-to-beam hardware and lateral load paths on a larger freestanding footprint.</li>
        <li>Assuming this list replaces a permit set of drawings.</li>
        <li>Forgetting that railings can require stronger boundary joists or blocking.</li>
      </ul>

      <h2>Permits, footings, and guards</h2>
      <p>Larger decks still live under the same life-safety rules as smaller ones: footing depth, ledger attachment, joist and beam spans, stair geometry, and guards. Model codes generally call for guards when the walking surface is more than 30&nbsp;inches above grade, but local amendments differ. Confirm with your building department before buying lumber.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li>Check current American Wood Council (AWC) / DCA deck span tables and your decking brand’s installation guide for joist spacing and allowable spans. YardTally’s 5.5 in face width and 16 in O.C. joist figures are calculator planning defaults, not engineered design.</li>
      </ul>
  `,

  'retaining-wall-blocks-and-base': `      <div class="takeaway"><strong>Key takeaway:</strong> Block count ≈ courses × blocks per course, where courses = ceil(wall height ÷ block height) and blocks per course = ceil(wall length ÷ block length). YardTally’s gravel trench defaults (about 24 in wide by 6 in deep) are planning assumptions for the calculator, not a universal code. Taller walls, surcharges, and poor soils need engineering. Follow the block manufacturer’s installation manual and local codes.</div>

      <h2>Can I use paver base under a retaining wall?</h2>
      <p>Yes for a compacted gravel trench under wall blocks, people often call that “paver base.” Treat it as wall base, not a patio sand-and-gravel section. Patio paver depths differ from wall trenches. See the <a href="/guides/paver-base-gravel-and-sand-depth/">paver base gravel and sand depth</a> guide for patio layers, then follow your wall manufacturer’s manual for trench width and depth behind retained soil.</p>
      <p>Related ideas (compacted angular gravel) transfer; the assembly does not. Patio bedding sand is not a substitute for wall drainage stone, and patio base thickness is not a wall trench design. When in doubt, use the wall-system detail, not the patio worksheet.</p>

      <h2>How many retaining wall blocks do I need?</h2>
      <p>Divide wall length by block face length and height by face height, multiply courses by blocks per course, then add waste. Example: 20 ft × 3 ft exposed with 18×6 in blocks is 6 × 14 = 84 face blocks before waste (about 89 with 5%). Order caps separately by linear feet.</p>
      <p>Formulas for a straight wall with uniform rectangular face blocks:</p>
      <p><strong>Courses = ceil(wall height ÷ block face height).</strong></p>
      <p><strong>Blocks per course = ceil(wall length ÷ block face length).</strong></p>
      <p><strong>Blocks = courses × blocks per course</strong> (then add waste for cuts and breakage).</p>
      <p>Base trench gravel volume ≈ wall length × trench width × trench depth (convert to yards by dividing cubic feet by 27).</p>
      <p>YardTally’s <a href="/calculators/retaining-wall-calculator/">retaining wall calculator</a> defaults to common 18×6 in face blocks, 5% waste, and a gravel trench about 24 in wide by 6 in deep unless you change those inputs. Those trench numbers are planning defaults for the tool. Refine aggregate tonnage with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. Material choice echoes themes in <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>.</p>

      <h2>What are typical retaining wall block dimensions?</h2>
      <p>Use the face length and face height on the pallet tag or cut sheet. Many retail landscape blocks are near 18 in long by 6 in tall, which is YardTally’s planning default, not a rule. Courses = ceil(height ÷ face height); blocks per course = ceil(length ÷ face length).</p>
      <p>Segmental landscape walls often include buried base courses, geogrid at specified elevations, drainage pipe, and clean stone behind the blocks. Those components are specified by height and soil conditions. Do not scale a short DIY patio-edge wall detail to a tall yard cut without professional design.</p>

      <h2>Worked example: 20 ft long × 3 ft exposed height</h2>
      <p>With 18 in long × 6 in tall face blocks (YardTally calculator defaults):</p>
      <ul>
        <li>Courses = ceil(3 ÷ 0.5) = <strong>6 courses</strong>.</li>
        <li>Blocks per course = ceil(20 ÷ 1.5) = <strong>14</strong>.</li>
        <li>Blocks = 6 × 14 = <strong>84</strong>; with 5% waste ≈ <strong>89 blocks</strong>.</li>
        <li>Face area = 20 × 3 = 60 sq ft.</li>
        <li>Base gravel at the calculator’s planning trench of 20 ft × 2 ft wide × 0.5 ft deep = 20 cu ft ≈ <strong>0.74 cu yd</strong>.</li>
      </ul>
      <p>These figures match the retaining-wall calculator defaults for a 20×3 wall. If your manufacturer requires an extra buried course, add that course to the block count even though it does not show in the exposed height.</p>

      <h2>Block planning table</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate block counts for 18×6 in face blocks (no waste; add ~5–10%; dimensions are a common planning size)</caption>
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

      <h2>When do I need an engineer?</h2>
      <p>Call for engineered design when the wall gets taller than the manufacturer’s gravity (unreinforced) chart, when a driveway, slope, or structure sits above the wall, when soils are poor or wet, or when your building department says a permit needs stamped drawings. Local height triggers vary. Do not invent a legal cap from a blog rule of thumb.</p>
      <p>Geogrid type, length, and vertical spacing are not guesswork; they come from the manufacturer’s engineered charts or a site-specific design. If your project exceeds the published maximum for an unreinforced stack, stop and get qualified help.</p>

      <h2>Drainage, geogrid, and base preparation</h2>
      <p>Water is the quiet load behind many wall failures. A perforated drainpipe at the base of the drainage stone, outlets to daylight or an approved system, and free-draining backfill keep hydrostatic pressure down. Compacted clay jammed against the back of hollow blocks is a common mistake. Follow the block producer’s backfill specification, which often calls for clean stone in a drainage zone.</p>
      <p>Base preparation deserves as much care as the visible face. Excavate to stable material, place angular gravel, and compact until the first course sits level (or correctly stepped on slopes). A crooked base course telegraphs all the way to the cap. For gravel selection intuition, read <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>. For patio-only thin-layer bases (not wall backfill), see <a href="/guides/paver-base-gravel-and-sand-depth/">paver base gravel and sand depth</a>.</p>
      <p>Utilities, easements, and property lines also constrain walls. Call before you dig, and confirm that redirecting drainage will not send water onto a neighbor’s foundation.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Determine retained height, slope above/below, and any driveway or structure surcharge.</li>
        <li>Ask the building department whether the wall height or surcharge triggers a permit or engineering review.</li>
        <li>Select a block system and read its maximum unreinforced height tables on the current installation manual.</li>
        <li>Enter face dimensions from the pallet tag into the <a href="/calculators/retaining-wall-calculator/">retaining wall calculator</a>; adjust trench width/depth to the manufacturer sheet when it differs from YardTally defaults.</li>
        <li>Excavate trench; place and compact base gravel level (or stepped on slopes per manual).</li>
        <li>Set base course carefully. Errors compound upward.</li>
        <li>Stack with pins/lips as designed; install drainpipe and drainage stone; place geogrid when specified; backfill in lifts.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Keep underground utilities marked before digging.</li>
        <li>Compact behind the wall in thin lifts; heavy clay dumped in one lift settles for years.</li>
        <li>Outlet drains to daylight or an approved system. Trapped water raises pressure.</li>
        <li>Order extra blocks from the same production lot for color match.</li>
        <li>For low decorative seats, still use a proper compacted gravel trench; skipping base is a frequent failure mode.</li>
        <li>Dry-stack a mockup course on the driveway to confirm pattern and cap overhang before trench day.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Building “as tall as the slope” without drainage or grid when the system requires them.</li>
        <li>Setting the first course on native dirt without compacted aggregate.</li>
        <li>Using rounded decorative rock as structural base.</li>
        <li>Copying patio paver base depths into a wall trench without reading the wall manual.</li>
        <li>Counting only exposed face and forgetting buried courses.</li>
        <li>Backfilling with saturated soil in one dump truck pass and calling it done.</li>
        <li>Publishing a homemade height cap as if it were local law.</li>
      </ul>

      <h2>Permits, utilities, and site checks</h2>
      <p>Many local codes treat taller retaining walls as engineered structures that need a permit, and surcharge from driveways, slopes, or buildings can trigger review earlier than a short garden edge. Call your building department before design, and schedule a utility locate before digging. Mark property lines, since walls near boundaries can raise drainage and access issues with neighbors. Where the soil is poor or the wall holds back water, a professional designer is worth the cost.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li>Follow the current installation manual and height charts for your retaining-wall block system for trench size, drainage, geogrid, and maximum unreinforced height. YardTally’s 18×6 in face blocks and 24×6 in gravel trench figures are calculator planning defaults until that manual says otherwise.</li>
      </ul>
  `,

  'topsoil-vs-garden-soil': `      <div class="takeaway"><strong>Key takeaway:</strong> Topsoil is primarily mineral soil from the upper earth layer; bagged “garden soil” and raised-bed mixes usually blend mineral soil or composted organics for planting beds. Neither label is federally standardized in everyday retail speech, so read ingredients. Buy by cubic yards (bulk) or cubic feet (bags) after you compute volume from area × depth.</div>

      <h2>Is garden soil the same as topsoil?</h2>
      <p>Not reliably. Topsoil usually means mineral soil for grading and fill. Bagged garden soil is often a blend with compost or other organics meant for planting beds. Raised-bed and potting mixes can be lighter still. Read the ingredient list and intended-use statement on the bag or bulk ticket before you treat the names as interchangeable.</p>
      <p><strong>Topsoil</strong> in landscape yards often means screened mineral soil with some organic matter, used to fill low spots, establish lawns, or blend into beds. Quality varies: ask about texture (sandy loam vs clay), screening, weed seeds, and contaminants.</p>
      <p><strong>Garden soil</strong> on bag labels frequently denotes a blended product intended for in-ground beds, commonly topsoil plus compost or other organics. <strong>Raised-bed</strong> or <strong>potting</strong> mixes may be lighter, with bark, peat or coir, perlite, and compost, and may contain little true mineral topsoil.</p>
      <p>Extension sources stress matching the material to the job. Iowa State’s raised-bed FAQ discusses topsoil, compost, and sand combinations. Clemson HGIC’s soil-conditioning and raised-bed fact sheets discuss topsoil-plus-compost fills and warn that compost fractions that are too high or too low can cause problems.</p>
      <p>Estimate quantities with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>. After planting, cover beds using the <a href="/calculators/mulch-calculator/">mulch calculator</a>, depth norms in the <a href="/guides/mulch-depth-guide/">mulch depth guide</a>, and size charts in <a href="/guides/mulch-for-common-garden-beds/">mulch for common garden beds</a>. Filling boxed beds is covered in <a href="/guides/raised-bed-soil-mix-4x8/">raised bed soil mix for 4×8</a>.</p>

      <h2>How many cubic yards of topsoil do I need?</h2>
      <p>Multiply area in square feet by depth in feet, then divide by 27. Example: 100 sq ft at 3 inches (0.25 ft) is 25 cu ft, about 0.93 cu yd. At 2 cu ft per bag that is about thirteen bags; bulk delivery usually wins near a yard. Lawn leveling often uses thinner lifts than deep bed fills.</p>
      <p><strong>Cu ft = length × width × (depth_inches ÷ 12).</strong></p>
      <p><strong>Cu yd = cu ft ÷ 27.</strong></p>
      <p>Deep raised beds need full volume math, not a “few bags” guess. A 4×8 bed filled 12 inches deep is 32 cu ft (about 1.2 cu yd), which is a different order of magnitude from a 2-inch top-dress on the same footprint.</p>

      <h2>Can I use topsoil in pots?</h2>
      <p>Heavy mineral topsoil often compacts and drains poorly in containers. Use a potting mix designed for pots unless a specific recipe says otherwise. Save screened topsoil for grade work, lawn establishment, and blending into in-ground beds where mineral soil continuity matters.</p>
      <p>On roofs, decks, and sealed patios, weight and drainage matter even more. Confirm structural load limits before placing deep wet soil on structures, and prefer lighter manufactured mixes when the container sits above grade.</p>

      <h2>When to choose which product</h2>
      <p>Use screened topsoil when you need to raise grade, fill ruts, or establish a lawn seedbed where mineral soil continuity matters. Use bagged garden soil when you are amending an existing border and want convenient organic matter in small quantities. Use a raised-bed or planter mix when weight, drainage, and a manufactured blend matter more than matching native mineral soil.</p>
      <p>Compost alone is a powerful amendment but a mediocre structural fill for deep boxes: it continues to decompose and shrink, and excessive organic fractions can cause water and nutrient imbalances. Extension sheets that discuss compost percentages in beds are reacting to that reality. Likewise, “black dirt” sold cheaply without screening may be fill, not a planting medium.</p>
      <p>For lawns, thin topdressings after aeration differ from burying turf under inches of new soil. If you are seeding bare ground, coordinate soil depth with the <a href="/guides/grass-seed-per-sq-ft/">grass seed per square foot</a> guide so you do not strand seed on cloddy clay or bury it too deep.</p>

      <h2>Comparison table</h2>
      <div class="table-scroll">
      <table>
        <caption>Practical comparison of common soil products (general retail meanings; check labels)</caption>
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
      <p>Area = 32 sq ft. Depth = 2 in → 32 × (2÷12) ≈ <strong>5.33 cu ft</strong> (about 0.20 cu yd). That might be three to four 1.5–2.0 cu ft bags depending on bag size, far less than rebuilding the same bed 12 in deep (32 cu ft). Use garden soil or compost blends for top-ups when the mineral base already exists; use calculated topsoil/mix volumes when filling empty frames.</p>

      <h2>Step-by-step</h2>
      <ol>
        <li>Define the job: regrade a lawn, amend a border, or fill a raised bed.</li>
        <li>Measure area and target depth; convert to cubic feet and yards.</li>
        <li>Choose product type based on drainage and organic-matter needs, not color of the bag alone.</li>
        <li>Ask bulk suppliers for a sample scoop; reject foul-smelling or debris-filled loads.</li>
        <li>Order with compaction/settling waste in mind (especially fluffy compost blends).</li>
        <li>Incorporate into native soil when layering on existing ground to avoid perched water barriers.</li>
        <li>Mulch after planting to conserve moisture.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Soil-test before heavy fertilizer additions. New soil can still be off-pH.</li>
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
        <li>Using heavy topsoil as the only fill in pots and containers.</li>
      </ul>

      <h2>Testing and matching soil to the site</h2>
      <p>Before buying any bulk soil, a simple test pays off. State extension services and many labs offer low-cost soil tests that report pH, nutrients, and sometimes organic matter, and the results tell you whether you need lime, sulfur, or fertilizer. Ask the supplier whether the soil has been screened, how much organic material it contains, and whether it may include weed seeds. Inspect it by hand: it should crumble, not form a brick, and not smell sour.</p>
      <p>Also consider what is underneath. Spreading a thin layer of a very different soil over compacted clay can create a perched water layer, so many extension publications recommend loosening the existing surface and mixing the layers rather than stacking them cleanly. For lawn repairs, a modest topdressing is typically worked in; for new beds, deeper fill or blended garden soil works better. Whatever you buy, calculate the cubic yards first, then compare price per yard delivered.</p>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/faq/what-would-be-good-soil-mix-raised-bed" rel="noopener noreferrer">Iowa State Extension – Raised bed soil mix FAQ</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/raised-beds/" rel="noopener noreferrer">Clemson HGIC – Raised beds (topsoil &amp; compost)</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/soil-conditioning-establishing-a-successful-gardening-foundation/" rel="noopener noreferrer">Clemson HGIC – Soil conditioning</a></li>
      </ul>
  `,

  'how-much-concrete-in-a-sonotube': `      <div class="takeaway"><strong>Key takeaway:</strong> Sonotube volume is π × r² × height using inside diameter. A 12-inch tube 4&nbsp;ft tall holds about 3.14&nbsp;cu&nbsp;ft—plan on six 80&nbsp;lb bags or seven 60&nbsp;lb bags before waste. Multiply by pier count, then add a little for spillage.</div>

      <h2>How much concrete is in a Sonotube?</h2>
      <p>Enough to fill the clear inside cylinder: <strong>Volume (cu&nbsp;ft) = π × (diameter ÷ 2)² × height</strong>, with diameter and height in feet. A 12&quot; ID tube (0.5&nbsp;ft radius) at 4&nbsp;ft tall is π × 0.5² × 4 ≈ 3.14&nbsp;cu&nbsp;ft (~0.12&nbsp;cu&nbsp;yd). Convert to bags with your mix yield, then multiply by pier count.</p>
      <p>Run the same math live in the <a href="/calculators/sonotube-concrete-calculator/">Sonotube / concrete tube calculator</a>. Fence post holes without cardboard forms belong on the <a href="/guides/how-much-concrete-for-fence-posts/">fence post concrete guide</a> instead.</p>

      <h2>How many bags of concrete for a 12-inch Sonotube?</h2>
      <p>Per foot of height, a 12&quot; tube needs about 0.785&nbsp;cu&nbsp;ft. A 2&nbsp;ft pier is ~1.57&nbsp;cu&nbsp;ft (three 80&nbsp;lb or four 60&nbsp;lb bags). A 3&nbsp;ft pier is ~2.36&nbsp;cu&nbsp;ft (four 80&nbsp;lb or six 60&nbsp;lb). A 4&nbsp;ft pier is ~3.14&nbsp;cu&nbsp;ft—about 5.2 of the 80&nbsp;lb bags before rounding, so plan on 6, or about 7 of the 60&nbsp;lb bags.</p>
      <p>Bag counts below use ceil(volume ÷ yield) with 0.60&nbsp;cu&nbsp;ft per 80&nbsp;lb bag and 0.45&nbsp;cu&nbsp;ft per 60&nbsp;lb bag (QUIKRETE 1101 / Sakrete planning yields). YardTally’s Sonotube tool also adds a default 5% waste for formed cylinders when you leave waste on.</p>

      <h2>Sonotube bag chart (before waste)</h2>
      <div class="table-scroll">
      <table>
        <caption>Concrete volume and bags for common Sonotube sizes at 2, 3, and 4 ft (before waste)</caption>
        <thead>
          <tr>
            <th>Diameter</th>
            <th>Height</th>
            <th>Volume (cu ft)</th>
            <th>80 lb bags</th>
            <th>60 lb bags</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>8"</td><td>2 ft</td><td>0.70</td><td>2</td><td>2</td></tr>
          <tr><td>8"</td><td>3 ft</td><td>1.05</td><td>2</td><td>3</td></tr>
          <tr><td>8"</td><td>4 ft</td><td>1.40</td><td>3</td><td>4</td></tr>
          <tr><td>10"</td><td>2 ft</td><td>1.09</td><td>2</td><td>3</td></tr>
          <tr><td>10"</td><td>3 ft</td><td>1.64</td><td>3</td><td>4</td></tr>
          <tr><td>10"</td><td>4 ft</td><td>2.18</td><td>4</td><td>5</td></tr>
          <tr><td>12"</td><td>2 ft</td><td>1.57</td><td>3</td><td>4</td></tr>
          <tr><td>12"</td><td>3 ft</td><td>2.36</td><td>4</td><td>6</td></tr>
          <tr><td>12"</td><td>4 ft</td><td>3.14</td><td>6</td><td>7</td></tr>
          <tr><td>16"</td><td>2 ft</td><td>2.79</td><td>5</td><td>7</td></tr>
          <tr><td>16"</td><td>3 ft</td><td>4.19</td><td>7</td><td>10</td></tr>
          <tr><td>16"</td><td>4 ft</td><td>5.59</td><td>10</td><td>13</td></tr>
          <tr><td>18"</td><td>2 ft</td><td>3.53</td><td>6</td><td>8</td></tr>
          <tr><td>18"</td><td>3 ft</td><td>5.30</td><td>9</td><td>12</td></tr>
          <tr><td>18"</td><td>4 ft</td><td>7.07</td><td>12</td><td>16</td></tr>
        </tbody>
      </table>
      </div>
      <p>Use inside diameter. Manufacturers label common sizes such as 8&quot;, 10&quot;, and 12&quot;. Outside cardboard thickness does not get filled with concrete.</p>

      <h2>Worked example: eight 12&quot; × 4 ft piers</h2>
      <p>One tube ≈ 3.14&nbsp;cu&nbsp;ft. Eight tubes ≈ 25.1&nbsp;cu&nbsp;ft before waste. With 5% waste ≈ 26.4&nbsp;cu&nbsp;ft → ceil(26.4 ÷ 0.60) = 44 bags of 80&nbsp;lb mix. That is near one cubic yard, so price ready-mix if the truck can reach the pour. Full bag math context: <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>.</p>

      <h2>Are Sonotubes necessary for deck posts?</h2>
      <p>Not always. Cardboard tube forms give a clean round pier with a known diameter and a consistent column. Many decks still use square formed footings or poured holes when the detail allows it. Follow the footing size on your plan or local practice. This page only sizes concrete once you choose a tube.</p>

      <h2>Do Sonotubes need rebar?</h2>
      <p>That depends on the structural detail, local code, and load, not on a volume chart. Some pier details call for vertical bars and a cage. Others are plain concrete for light loads. Check the plan, the deck hardware instructions, and your building department. Do not invent a rebar schedule from bag counts.</p>

      <h2>How do I use a concrete calculator for tubes?</h2>
      <p>Enter inside diameter, height, and tube count in the <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a>. Read cubic feet, yards, and 40 / 60 / 80&nbsp;lb bag estimates. For rectangular pads use the <a href="/calculators/concrete-calculator/">slab calculator</a> instead. Deck lumber takeoffs are separate in the <a href="/calculators/deck-material-calculator/">deck material calculator</a>.</p>
      <ol>
        <li>Confirm inside diameter and pour height for each pier (include above-grade reveal if the tube stays).</li>
        <li>Count tubes. Corner and stair piers often differ from field piers.</li>
        <li>Run πr²h or the Sonotube calculator for total volume.</li>
        <li>Convert to bags with the yield on your mix. Add about 5% for formed cylinders unless you already rounded aggressively.</li>
        <li>Brace tubes plumb before you place concrete. Strip cardboard only when the mix has set per the form and mix instructions.</li>
      </ol>

      <h2>Tips</h2>
      <ul>
        <li>Buy one product line for the whole pour so color and strength stay consistent.</li>
        <li>Stage water and a mixing plan before the first bag opens. Tube pours go fast once you start.</li>
        <li>For full deck lumber lists after the piers, see the <a href="/guides/deck-material-list-16x24/">16×24 deck material list</a>.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using outside diameter instead of inside diameter.</li>
        <li>Applying fence-hole depth rules to formed deck piers without checking frost and plan details.</li>
        <li>Forgetting to multiply by pier count.</li>
        <li>Ordering from a slab chart that assumes a rectangle.</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf" rel="noopener noreferrer">QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields</a></li>
        <li><a href="https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf" rel="noopener noreferrer">Sakrete High Strength Concrete Mix TDS – bag yields</a></li>
      </ul>
  `,

  'how-to-estimate-roofing-shingles': `      <div class="takeaway"><strong>Key takeaway:</strong> One roofing square covers 100&nbsp;sq&nbsp;ft of roof surface. Multiply plan length × width by the pitch area factor, divide by 100 for squares, then add about 10–15% waste. Most common asphalt products use about 3 bundles per square. Specialty laminates can need 4–5.</div>

      <h2>How do I estimate roofing shingles for a roof?</h2>
      <p>Find roof surface area, convert to squares, add waste, then multiply by bundles per square from the product you are buying. Surface area is plan footprint times the pitch factor, not the house length × width alone. Measure pitch first if you do not already know it. Then run the numbers in the <a href="/calculators/roofing-shingles-calculator/">roofing shingles calculator</a>.</p>
      <ol>
        <li>Measure plan length and width of each roof plane (or the simple rectangle footprint for a basic gable).</li>
        <li>Find pitch as X-in-12. See <a href="/guides/how-to-measure-roof-pitch/">how to measure roof pitch</a> if you need a safe method.</li>
        <li>Multiply plan area by the pitch area factor (6/12 ≈ 1.118 per IKO’s example).</li>
        <li>Divide roof square feet by 100 to get squares.</li>
        <li>Add waste (often about 10–15% for hips, valleys, and cuts; GAF notes up to about 10% overage as a planning figure for many jobs).</li>
        <li>Multiply squares by bundles per square from the label (commonly 3; some specialty products 4–5).</li>
      </ol>

      <h2>What is a roofing square vs square feet?</h2>
      <p>A roofing square is 100&nbsp;square feet of roof surface. Contractors order by squares. Homeowners often think in square feet. Both describe the same area: 13.5 squares is 1,350&nbsp;sq&nbsp;ft of roof. IKO and GAF both define a square as 100&nbsp;sq&nbsp;ft when explaining coverage and bundles.</p>

      <h2>How many bundles of shingles in a square?</h2>
      <p>Typically three bundles per square for many asphalt products, about 33.3&nbsp;sq&nbsp;ft of coverage each. IKO notes that specialty shingles can take four or five bundles per square. GAF cites Timberline HDZ at three bundles per square and Grand Sequoia at five. Always read the bundle wrapper for the product on your truck.</p>
      <div class="table-scroll">
      <table>
        <caption>Bundle planning figures from manufacturer guidance</caption>
        <thead><tr><th>Product type (examples)</th><th>Bundles per square</th><th>Source note</th></tr></thead>
        <tbody>
          <tr><td>Many common asphalt / Timberline HDZ</td><td>3</td><td>IKO typical; GAF Timberline HDZ</td></tr>
          <tr><td>Some specialty laminates</td><td>4–5</td><td>IKO specialty range</td></tr>
          <tr><td>GAF Grand Sequoia</td><td>5</td><td>GAF square / bundle article</td></tr>
        </tbody>
      </table>
      </div>

      <h2>How does roof pitch change the shingle order?</h2>
      <p>Steeper roofs have more surface area on the same footprint. At 6/12 the area factor is about 1.118. At 8/12 it rises to about 1.202. Skipping the pitch factor under-orders every steep roof. Convert pitch with the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a>, then finish the material takeoff here or in the shingles calculator.</p>

      <h2>Worked example: 40 × 30 ft plan at 6/12</h2>
      <p>Plan area = 1,200&nbsp;sq&nbsp;ft. Roof surface ≈ 1,200 × 1.118 = 1,342&nbsp;sq&nbsp;ft = 13.42 squares. With 10% waste → about 14.76 squares. At 3 bundles per square → about 45 bundles before starter and ridge. Complex hips and valleys often need more waste than a simple gable.</p>

      <h2>Tips</h2>
      <ul>
        <li>Order starter and ridge pieces as separate line items. They are not always included in field-shingle bundle math.</li>
        <li>Match dye lots. Buying a few extra bundles later can show a color shift.</li>
        <li>Low-slope roofs may need different underlayment or systems. Pitch drives product choice, not only quantity.</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using plan area as roof area on a steep pitch.</li>
        <li>Assuming every asphalt product is 3 bundles per square.</li>
        <li>Skipping waste on cut-heavy hips and valleys.</li>
        <li>Measuring pitch along the rafter slope instead of horizontal run.</li>
      </ul>

      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.iko.com/na/blog/how-many-shingles-in-a-bundle/" rel="noopener noreferrer">IKO – How many shingles in a bundle (square = 100 sq ft, bundles, 6:12 factor, waste)</a></li>
        <li><a href="https://www.gaf.com/en-us/blog/your-home/how-to-measure-a-roofing-square-3faec381-6f6f-49ff-841f-114c59108f2a" rel="noopener noreferrer">GAF – How to measure a roofing square (100 sq ft, Timberline HDZ / Grand Sequoia bundles, overage)</a></li>
      </ul>
  `,

};

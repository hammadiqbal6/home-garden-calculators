export type GuideFaq = { question: string; answer: string };

/** FAQ items rendered by the guide template (not included in guideBodies HTML). */
export const guideFaqs: Record<string, GuideFaq[]> = {
  "how-much-concrete-for-fence-posts": [
    {
      "question": "How many bags of concrete per fence post?",
      "answer": "It depends on hole diameter and depth, not post height alone. An 8-inch-wide, 2-foot-deep hole is about 0.70 cu ft—often one to two 80 lb bags after waste. A 12-inch × 3-foot hole is about 2.36 cu ft (roughly four 80 lb bags before waste). Always size the hole for frost depth and wind load."
    },
    {
      "question": "Should fence post holes be three times the post width?",
      "answer": "That is a common rule of thumb (for example, a 4-inch post in a roughly 12-inch hole), and manufacturer post-setting guides often use similar proportions. Treat it as a starting point—loose soil, tall privacy panels, and frost heave may call for a wider or deeper hole or a tube form. Confirm local practice before you dig."
    },
    {
      "question": "Do I mix concrete or pour dry mix into the hole?",
      "answer": "Fast-setting bagged mixes are often placed dry in the hole and then watered in place for fence posts, following the bag instructions. Structural footings and deck posts usually need mixed concrete and may require forms. Read the product label; post mixes and general concrete mixes are not interchangeable for every job."
    },
    {
      "question": "How deep should fence posts be set?",
      "answer": "A frequent DIY rule of thumb is about one-third of the above-ground post height in the ground, and below the local frost line where frost heave is a concern. Manufacturer guides sometimes describe one-third to one-half of the above-ground length plus gravel. Always check frost maps and local code for your climate."
    },
    {
      "question": "Can I use the slab concrete calculator for post holes?",
      "answer": "No. Slabs are rectangular volume (length × width × thickness). Post holes are cylinders. Use the post hole concrete calculator so diameter and depth convert correctly, then convert volume to bags."
    }
  ],
  "mulch-depth-guide": [
    {
      "question": "How deep should mulch be in flower beds?",
      "answer": "Extension guidance commonly recommends about 2–3 inches of organic mulch for shrub and perennial beds. That depth suppresses weeds and conserves moisture without smothering roots. Replenish as the mulch decomposes rather than stacking thicker layers each year."
    },
    {
      "question": "How deep should mulch be around trees?",
      "answer": "Use a similar 2–3 inch depth in a wide ring (donut), kept clear of the trunk flare. Piling mulch against the bark—“volcano mulching”—traps moisture against the trunk and can encourage rot and pests. Leave a bare collar at the base."
    },
    {
      "question": "Is 4 inches of mulch too much?",
      "answer": "For most ornamental beds, yes—layers much deeper than about 3 inches can impede water and oxygen. Wood-chip paths sometimes use 3–4 inches because they compact under foot traffic; that is a different use case than planting beds."
    },
    {
      "question": "Should I remove old mulch before adding new?",
      "answer": "Not always. If the old layer is thin and well decomposed, top-dress to restore about 2–3 inches total. If you have a thick, matted, or moldy layer, rake it out or thin it first so new mulch does not create an anaerobic blanket."
    },
    {
      "question": "Does mulch depth change bag counts?",
      "answer": "Yes. Volume scales directly with depth: cubic feet = area × (depth inches ÷ 12). At 3 inches, 100 sq ft needs about 25 cu ft; at 2 inches the same bed needs about 16.7 cu ft. Use a mulch calculator for irregular shapes."
    }
  ],
  "how-many-bags-of-concrete": [
    {
      "question": "How many 80 lb bags of concrete are in a cubic yard?",
      "answer": "About 45 bags before waste, using a typical 0.60 cu ft yield per 80 lb bag (27 ÷ 0.60). Always confirm the yield printed on the bag you buy—lightweight and specialty mixes can differ."
    },
    {
      "question": "How many 60 lb bags per cubic yard?",
      "answer": "About 60 bags before waste at a typical 0.45 cu ft yield (27 ÷ 0.45). After a 10% waste factor, plan closer to 66 bags per cubic yard of placed concrete."
    },
    {
      "question": "When should I order ready-mix instead of bags?",
      "answer": "As a practical rule of thumb, when the pour approaches or exceeds about one cubic yard, ready-mix often wins on labor and consistency if a truck can access the site. Smaller pads, repairs, and fence posts usually stay on bags."
    },
    {
      "question": "Do bag yields include waste?",
      "answer": "No. Manufacturer yields assume you place that volume of mixed concrete. Uneven subgrade, form bulge, and spillage routinely add 5–10%. Round up after you divide volume by bag yield."
    },
    {
      "question": "Which calculator should I use for bags?",
      "answer": "Use the slab/footing concrete calculator for rectangles, the post hole calculator for fence posts, and the Sonotube calculator for cardboard forms. Each shape needs a different volume formula before you convert to bags."
    }
  ],
  "concrete-for-10x10-slab": [
    {
      "question": "How much concrete do I need for a 10×10 slab at 4 inches?",
      "answer": "About 33.3 cu ft or 1.23 cu yd before waste. With a 10% waste factor (YardCalc default), that is about 36.7 cu ft—roughly 62 bags of 80 lb mix or 82 bags of 60 lb mix at standard yields."
    },
    {
      "question": "How much for a 10×10 slab at 6 inches?",
      "answer": "About 50 cu ft or 1.85 cu yd before waste. With 10% waste, expect roughly 92 bags of 80 lb mix or 123 bags of 60 lb mix. At that size, ready-mix is often more practical if access allows."
    },
    {
      "question": "Does the slab volume include the gravel base?",
      "answer": "No. Concrete volume is only the slab thickness. Compacted gravel or crushed-stone base is a separate order—estimate it with a gravel calculator using base depth, not slab thickness."
    },
    {
      "question": "What thickness should a patio slab be?",
      "answer": "Many residential patios and shed pads use about 4 inches of concrete over compacted base. Driveways and heavier loads often need 5–6 inches plus reinforcement details required by local code. This guide estimates volume only—it does not design structural thickness."
    },
    {
      "question": "How do I convert a 10×10 slab to bags?",
      "answer": "Compute cubic feet (10 × 10 × thickness in feet), multiply by 1.10 for a 10% waste allowance, then divide by bag yield (about 0.60 cu ft for 80 lb, 0.45 for 60 lb) and round up."
    }
  ],
  "mulch-for-common-garden-beds": [
    {
      "question": "How much mulch for a 4×8 garden bed?",
      "answer": "At 3 inches deep: 4 × 8 × 0.25 = 8 cu ft (about 0.30 cu yd), or four 2 cu ft bags. At 2 inches, the same bed needs about 5.3 cu ft (three 2 cu ft bags after rounding up)."
    },
    {
      "question": "How many bags of mulch for a 20×5 bed?",
      "answer": "At 3 inches: 100 × 0.25 = 25 cu ft ≈ 0.93 cu yd, which is thirteen 2 cu ft bags. Bulk delivery by the cubic yard is often cheaper at this size."
    },
    {
      "question": "Should I buy bags or bulk mulch?",
      "answer": "Bags are convenient for small beds and touch-ups. Once you need roughly a cubic yard or more, bulk usually costs less per cubic foot and means fewer plastic bags—if you can stage a delivery."
    },
    {
      "question": "How do I mulch an L-shaped bed?",
      "answer": "Split the shape into rectangles, calculate each piece, and add the volumes. The mulch calculator accepts custom length and width; run it twice and sum the results for odd layouts."
    },
    {
      "question": "Does this chart apply to tree rings?",
      "answer": "Not directly. Tree rings need a donut volume (outer circle minus trunk opening). Use the tree ring mulch calculator so you do not over-order for the trunk area you leave bare."
    }
  ],
  "gravel-types-for-driveways": [
    {
      "question": "What gravel is best for a driveway base?",
      "answer": "Angular crushed stone with fines—often sold as crusher run, dense grade, or road base—locks together when compacted and makes a stable base. Rounded pea gravel alone tends to roll under tires and is a poor sole driving surface."
    },
    {
      "question": "What is #57 stone used for?",
      "answer": "Clean crushed stone such as #57 is commonly used for drainage layers and some surface courses. It has fewer fines than dense grade, so it drains well but may not lock as tightly as crusher run for a structural base."
    },
    {
      "question": "How deep should driveway gravel be?",
      "answer": "Depth depends on soil strength and traffic. As a DIY planning rule of thumb, many light residential drives use several inches of compacted base plus a surface course—often on the order of 4–8 inches total before considering soft soils or heavier vehicles. Confirm with local practice; this is not a structural design."
    },
    {
      "question": "How do I convert driveway gravel to tons?",
      "answer": "Compute cubic yards (length × width × depth ÷ 27), then multiply by density. YardCalc uses about 2,700 lb per cu yd for crushed stone as a mid-range planning density—ask your quarry for the exact figure and order extra for compaction."
    },
    {
      "question": "Do I need sand under driveway gravel?",
      "answer": "Driveway gravel bases usually rely on crushed stone, not a mason-sand setting bed. Sand is more typical under pavers as a leveling layer over a compacted gravel base. Use the sand and paver calculators when you are building a paver drive or patio instead of loose gravel."
    }
  ],
  "how-to-measure-roof-pitch": [
    {
      "question": "What does a 6/12 roof pitch mean?",
      "answer": "It means 6 inches of vertical rise for every 12 inches of horizontal run. That is about 26.6° and an area factor near 1.12—so plan (footprint) area is multiplied by about 1.12 to estimate slope surface area."
    },
    {
      "question": "How do I measure roof pitch from the attic?",
      "answer": "Place a level against the underside of a rafter or mark 12 inches of run along a level line, then measure the rise at that mark. Measuring from the attic avoids walking the roof and is the safest option for many homeowners."
    },
    {
      "question": "Can I measure roof pitch from the ground?",
      "answer": "You can estimate with apps or geometry, but ground methods are less precise than a level-and-tape measurement on a rafter or rake. For material orders, prefer a direct rise-over-run measurement or the pitch stated on drawings."
    },
    {
      "question": "Why does pitch matter for shingles?",
      "answer": "Pitch converts plan area to actual roof surface area and affects product choice. Very low slopes may need special underlayment or different roofing systems. After you know pitch, use a roofing squares calculator to estimate bundles with waste."
    },
    {
      "question": "Is it safe to walk on my roof to measure pitch?",
      "answer": "Only with proper fall protection, dry conditions, and experience. Prefer attic or rake measurements. Hire a roofing professional when the roof is steep, high, wet, or fragile—pitch math is not worth an injury."
    }
  ],
  "grass-seed-per-sq-ft": [
    {
      "question": "How much grass seed do I need per square foot?",
      "answer": "Convert from the bag’s pounds per 1,000 sq ft. Example: 3.5 lb per 1,000 equals 0.0035 lb per sq ft (about 0.056 oz per sq ft). Rates change by species and new vs overseed—do not invent a single universal oz/sq ft rule."
    },
    {
      "question": "Is overseeding half the new-lawn rate?",
      "answer": "Often overseed rates are lower than bare-soil rates for the same product, but the ratio is not always exactly half. Use the overseed line on your bag."
    },
    {
      "question": "Should I buy by the pound or by the bag?",
      "answer": "Compute pounds first, then choose bag sizes that cover that weight. Check net weight on each package—marketing “covers X sq ft” claims assume a specific rate."
    },
    {
      "question": "Do I need topsoil when seeding?",
      "answer": "Not always, but bare spots with poor contact benefit from a thin, screened topdressing. Estimate volume with the topsoil calculator; choose material carefully (see topsoil vs garden soil)."
    },
    {
      "question": "Can I seed and fertilize the same day?",
      "answer": "Many starter fertilizers are designed for establishment—follow both the seed and fertilizer labels, and obey any state turf fertilizer limits."
    }
  ],
  "fertilizer-nitrogen-per-1000-sq-ft": [
    {
      "question": "How do I calculate fertilizer for 1 lb of nitrogen per 1,000 sq ft?",
      "answer": "Divide 1 by the nitrogen decimal. For 30-0-4, 1 ÷ 0.30 ≈ 3.3 lb of product per 1,000 sq ft. Multiply by (area ÷ 1,000) for the whole lawn."
    },
    {
      "question": "What does 30-0-4 mean?",
      "answer": "Thirty percent nitrogen, zero phosphate, four percent potash by weight. A 10 lb bag contains about 3 lb of nitrogen (10 × 0.30)."
    },
    {
      "question": "Is 1 lb N per 1,000 always correct?",
      "answer": "No—it is a common planning example, not a universal prescription. Annual needs and legal per-application caps vary. Follow your soil test, extension guidance, and the product label."
    },
    {
      "question": "How does bag size enter the math?",
      "answer": "After you know total product pounds, bags needed ≈ ceil(total product lb ÷ bag weight). The calculator can show that step."
    },
    {
      "question": "Should new seedings use a starter fertilizer?",
      "answer": "Often yes when the label and soil test support it—especially if phosphorus is recommended for establishment. Do not assume every “lawn food” is a starter. Coordinate with seeding rates from the grass seed guide."
    }
  ],
  "raised-bed-soil-mix-4x8": [
    {
      "question": "How much soil does a 4×8 raised bed need?",
      "answer": "At 12 in deep, 32 cu ft (about 1.19 cu yd). At 18 in, 48 cu ft (about 1.78 cu yd). Multiply length × width × depth in feet."
    },
    {
      "question": "What is a good soil mix for a 4×8 bed?",
      "answer": "Recipes vary. A common DIY rule of thumb is roughly equal parts topsoil, compost, and a coarse aeration ingredient; some extension pages suggest higher topsoil fractions with less compost. There is no single mandatory recipe."
    },
    {
      "question": "Bags or bulk: which should I buy?",
      "answer": "Bulk usually wins on cost past roughly a yard; bags win for precise blends and small fills. Calculate cubic feet first."
    },
    {
      "question": "How deep should the soil be?",
      "answer": "Depends on crops and whether roots can enter native soil below. Many vegetables are comfortable in about a foot of improved media; deep-rooted crops appreciate more. Verify for your plants."
    },
    {
      "question": "Do I need landscape fabric under the bed?",
      "answer": "Optional. Fabric can limit weeds from below but can also impede earthworms and root exploration. Cardboard is a common biodegradable suppressant when installing on turf—follow local extension preferences."
    }
  ],
  "how-much-paint-for-a-room": [
    {
      "question": "How much paint do I need for a 12×12 room?",
      "answer": "With 8 ft ceilings, wall area = 2 × (12+12) × 8 = 384 sq ft before openings. Subtract doors/windows, divide by label coverage, then multiply by coats. Run the paint calculator for exact gallons."
    },
    {
      "question": "How many square feet does a gallon of paint cover?",
      "answer": "Many interior latex products list about 250–400 sq ft per gallon per coat. Smooth, sealed walls land toward the high end; check your can."
    },
    {
      "question": "Do I include the ceiling?",
      "answer": "Not in the basic four-wall estimate. Ceiling area ≈ length × width; calculate gallons separately if you are painting it."
    },
    {
      "question": "How much do doors and windows subtract?",
      "answer": "YardCalc defaults to about 20 sq ft per door and 15 sq ft per window—adjust if your units differ."
    },
    {
      "question": "Should I buy extra?",
      "answer": "Rounding up a bit helps with touch-up and sheen matching. Store leftovers sealed and frost-free."
    }
  ],
  "paver-base-gravel-and-sand-depth": [
    {
      "question": "How deep should paver base gravel be?",
      "answer": "Many residential DIY patios use about 4–6 inches of compacted gravel as a rule of thumb. Driveways and weak soils may need more. Follow the paver producer and local practice—not a blog alone."
    },
    {
      "question": "How much sand under pavers?",
      "answer": "About 1 inch of bedding sand is a common rule of thumb for concrete pavers. Joint sand is additional and much smaller in volume."
    },
    {
      "question": "Do I need gravel under a small walkway?",
      "answer": "A proper base still matters on soft ground. Skimping is a leading cause of uneven walks. When in doubt, follow manufacturer details."
    },
    {
      "question": "How do I convert inches of base to tons?",
      "answer": "First get cubic yards, then ask your yard for tons per yard for that aggregate (densities vary). The gravel calculator helps with volume."
    },
    {
      "question": "What about polymeric sand?",
      "answer": "It is a joint material, not a base substitute. Install only when joints, temperature, and activation instructions match the product label."
    }
  ],
  "deck-material-list-12x16": [
    {
      "question": "How many deck boards for a 12×16 deck?",
      "answer": "With 5.5 in effective width and boards running 12 ft across a 16 ft width, plan on about 35 twelve-foot boards before waste. Running boards the other way needs more pieces if you still buy 12 ft stock."
    },
    {
      "question": "What joist spacing should I use?",
      "answer": "Sixteen inches on-center is a common planning default for many wood decks, but some decking products require 12 in O.C. Always match span tables and the decking brand."
    },
    {
      "question": "Does this include railings and stairs?",
      "answer": "No. Add those systems separately."
    },
    {
      "question": "How many screws do I need?",
      "answer": "A simple estimate is board linear feet × screws per foot (YardCalc defaults to 2). Hidden-clip systems use different counts."
    },
    {
      "question": "Can I build from this list alone?",
      "answer": "Use it for shopping ballparks. Structural design, flashing, and guards need code-compliant details."
    }
  ],
  "retaining-wall-blocks-and-base": [
    {
      "question": "How many retaining wall blocks do I need?",
      "answer": "Divide wall length by block length and height by block height, multiply, then add waste. Example: 20 ft × 3 ft with 18×6 in blocks → 84 blocks before waste."
    },
    {
      "question": "How deep should the gravel base be?",
      "answer": "Manufacturer manuals vary; many small landscape walls use several inches of compacted dense-grade gravel in a trench wider than the block. The calculator’s 6 in depth × 24 in width is a planning default—not a universal code."
    },
    {
      "question": "When do I need an engineer?",
      "answer": "As walls get taller, carry surcharge, or support structures, codes and manufacturers require engineered designs. When in doubt, ask the building department."
    },
    {
      "question": "Can I reuse the paver base depths?",
      "answer": "Related ideas (compacted angular gravel), different structure. Use wall-system details, not patio sand beds, behind retained soil."
    },
    {
      "question": "Do caps count in the face-block total?",
      "answer": "Usually order caps separately by linear feet of wall."
    }
  ],
  "topsoil-vs-garden-soil": [
    {
      "question": "Is garden soil the same as topsoil?",
      "answer": "Not reliably. Topsoil emphasizes mineral soil; garden soil bags are often blends. Read ingredients and intended-use statements."
    },
    {
      "question": "How many cubic yards of topsoil do I need?",
      "answer": "Multiply area by depth in feet, then divide by 27. Example: 100 sq ft at 3 in ≈ 0.93 cu yd."
    },
    {
      "question": "Can I use topsoil in pots?",
      "answer": "Heavy mineral topsoil often compacts and drains poorly in containers. Use potting mix for pots unless a specific recipe says otherwise."
    },
    {
      "question": "Should I put topsoil over existing grass?",
      "answer": "Thick layers can smother turf. For leveling, use thin topdressings or kill/remove grass first when installing beds."
    },
    {
      "question": "What about “organic” labels?",
      "answer": "Interpret carefully—marketing language varies. Look for documented compost feedstocks and test results when possible."
    }
  ]
};

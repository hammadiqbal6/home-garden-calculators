export type GuideFaq = { question: string; answer: string };
export const guideFaqs: Record<string, GuideFaq[]> = {
  'how-much-concrete-for-fence-posts': [
    { question: "How many bags per fence post?", answer: "Often one to three 60\u201380 lb bags depending on hole diameter and depth. Calculate cylinder volume rather than guessing from post height." },
    { question: "How deep should fence post holes be?", answer: "A common rule of thumb is about one-third of the above-grade post height and below local frost line where frost heave matters\u2014confirm locally." },
    { question: "Can I use the slab calculator for posts?", answer: "No. Use the post-hole calculator for cylinders." },
    { question: "Do gate posts need more concrete?", answer: "Often yes\u2014larger diameter or deeper embedment is common. List them separately." },
  ],
  'mulch-depth-guide': [
    { question: "How deep should mulch be in flower beds?", answer: "About 2\u20133 inches of organic mulch is a common extension rule of thumb for shrub and perennial beds." },
    { question: "Can mulch touch tree trunks?", answer: "Keep mulch off the trunk flare; volcano mulching traps moisture against bark." },
    { question: "Does depth change bag counts?", answer: "Yes. Volume scales linearly with depth\u2014use the mulch calculator after you choose depth." },
    { question: "How often should I remulch?", answer: "When thickness drops below about 2 inches after settling and decomposition, as a practical trigger." },
  ],
  'how-many-bags-of-concrete': [
    { question: "How many 80 lb bags in a cubic yard?", answer: "About 45 before waste using a 0.60 cu ft yield rule of thumb\u2014confirm your bag." },
    { question: "When should I order ready-mix?", answer: "Often when pours approach or exceed about one cubic yard, if a truck can access the site." },
    { question: "What waste factor should I use?", answer: "Many DIYers use about 5\u201310% as a rule of thumb for uneven bases and spillage." },
    { question: "Do accelerators change bag counts?", answer: "They change set behavior, not the volume-to-bag math." },
  ],
  'concrete-for-10x10-slab': [
    { question: "How much concrete for a 10\u00d710 slab at 4 inches?", answer: "About 1.23 cu yd (33.3 cu ft) before waste." },
    { question: "How many 80 lb bags with 10% waste?", answer: "Roughly 46 bags using a 0.60 cu ft yield planning figure." },
    { question: "Is 4 inches enough for a driveway?", answer: "Driveways often need thicker sections and proper base\u2014check local code; this chart is aimed at light patio/shed planning." },
    { question: "Is gravel included?", answer: "No. Base gravel is a separate volume." },
  ],
  'mulch-for-common-garden-beds': [
    { question: "How much mulch for a 4\u00d78 bed at 3 inches?", answer: "About 8 cu ft, or four 2 cu ft bags." },
    { question: "How do I handle L-shaped beds?", answer: "Split into rectangles and add volumes in the calculator." },
    { question: "Bulk or bags?", answer: "Bulk is usually cheaper once you need multiple yards; bags win for tiny top-ups." },
    { question: "What about tree rings?", answer: "Use the tree-ring calculator so the trunk opening is subtracted." },
  ],
  'gravel-types-for-driveways': [
    { question: "What gravel is best for a driveway base?", answer: "Angular crushed stone with fines (crusher run / dense grade) is commonly used because it locks when compacted." },
    { question: "Is pea gravel OK for driving?", answer: "It can roll under tires; better as decorative stone than the only structural surface." },
    { question: "How do I convert yards to tons?", answer: "Ask your yard for density\u2014about 1.2\u20131.4 tons/cu yd is a common crushed-stone rule of thumb." },
    { question: "Do I calculate sand the same way?", answer: "Sand volume uses the same area\u00d7depth math but different products\u2014see the paver base guide for bedding sand." },
  ],
  'how-to-measure-roof-pitch': [
    { question: "What does 6/12 pitch mean?", answer: "The roof rises 6 inches for every 12 inches of horizontal run (~26.6\u00b0)." },
    { question: "How do I measure safely?", answer: "Prefer attic rafter measurements; use fall protection on roofs or hire a pro." },
    { question: "Why does pitch matter for shingles?", answer: "Pitch sets the area factor that converts plan area to roof surface area." },
    { question: "Is percent slope the same as pitch?", answer: "No. Percent slope is rise/run\u00d7100; pitch is often stated as X-in-12." },
  ],
  'grass-seed-per-sq-ft': [
    { question: "How much grass seed per square foot?", answer: "Derive from the bag\u2019s lb per 1,000 sq ft rate: lb = (sq ft/1000)\u00d7rate. Avoid universal oz/sq ft rules that ignore species." },
    { question: "New lawn vs overseed rates?", answer: "Overseed rates are usually lower. Use the rate that matches your job on the label." },
    { question: "How do I measure my lawn?", answer: "Add rectangles, or measure length\u00d7width for simple shapes." },
    { question: "Should I add topsoil when seeding?", answer: "For low spots or bare soil, calculate topsoil separately; seed math does not include soil volume." },
  ],
  'fertilizer-nitrogen-per-1000-sq-ft': [
    { question: "How do I calculate fertilizer from N-P-K?", answer: "Divide desired lb of nitrogen by the N% as a decimal to get product lb per 1,000 sq ft." },
    { question: "What does 30-0-4 mean?", answer: "30% nitrogen, 0% phosphate, 4% potash by weight." },
    { question: "Can I apply extra nitrogen for faster green-up?", answer: "Do not exceed label rates; excess can burn turf and contribute to runoff." },
    { question: "Do organic fertilizers use the same math?", answer: "Yes\u2014use the nitrogen percentage on the label the same way." },
  ],
  'raised-bed-soil-mix-4x8': [
    { question: "How much soil for a 4\u00d78 bed 12 inches deep?", answer: "32 cubic feet, about 1.19 cubic yards." },
    { question: "What mix should I use?", answer: "Recipes vary. A common teaching rule of thumb is roughly equal parts topsoil/mineral soil, compost, and an aeration component\u2014adjust using local extension advice." },
    { question: "Interior or exterior dimensions?", answer: "Use interior length and width for volume." },
    { question: "Do I include mulch in the soil volume?", answer: "No. Mulch is a separate surface layer." },
  ],
  'how-much-paint-for-a-room': [
    { question: "How much paint for a 12\u00d715 room?", answer: "Often around 2\u20133 gallons for walls at two coats after subtracting openings, depending on coverage\u2014run the calculator with your label\u2019s coverage." },
    { question: "How much does a gallon cover?", answer: "Many interior paints list about 350\u2013400 sq ft per gallon per coat; read the can." },
    { question: "Do I count the ceiling?", answer: "Ceiling is separate: length \u00d7 width \u00d7 coats \u00f7 coverage." },
    { question: "Should I buy primer too?", answer: "When stains or large color changes require it\u2014follow label guidance." },
  ],
  'paver-base-gravel-and-sand-depth': [
    { question: "How deep should paver base be?", answer: "Many DIY patio guides suggest about 4\u20136 inches of compacted gravel plus about 1 inch of bedding sand\u2014verify with the manufacturer and local codes." },
    { question: "Can I use extra sand instead of gravel base?", answer: "Thick sand is not a substitute for a compacted gravel base on most systems." },
    { question: "Do driveways use the same depths?", answer: "Usually no\u2014vehicle loads need heavier sections per manufacturer charts." },
    { question: "How do I estimate tons of base?", answer: "Calculate cubic yards, then convert with your supplier\u2019s density." },
  ],
  'deck-material-list-12x16': [
    { question: "How many deck boards for 12\u00d716?", answer: "Depends on board face width and orientation\u2014use width \u00f7 face width for rows, then multiply by length needed per row, plus waste." },
    { question: "Is 16 inch joist spacing OK?", answer: "Common for many lumber decks, but composites and spans may require 12 inch o.c.\u2014check span tables." },
    { question: "Does the calculator include footings?", answer: "Decking/joist estimates are separate from concrete footings\u2014use Sonotube or post-hole tools for piers." },
    { question: "Do I need a permit?", answer: "Many jurisdictions require permits for decks\u2014ask locally." },
  ],
  'retaining-wall-blocks-and-base': [
    { question: "How many blocks do I need?", answer: "Length \u00f7 block length \u00d7 courses, plus waste and corners." },
    { question: "How deep is the gravel base?", answer: "Follow the block manufacturer; many small walls use a compacted gravel trench under the first course." },
    { question: "When do I need an engineer?", answer: "When height, surcharge, or soil conditions exceed the manufacturer\u2019s gravity-wall chart\u2014do not guess." },
    { question: "Can I backfill with site clay?", answer: "Usually no; systems typically specify free-draining backfill and drainage details." },
  ],
  'topsoil-vs-garden-soil': [
    { question: "Is topsoil the same as garden soil?", answer: "Not reliably. Topsoil is often mineral fill; garden/raised-bed products usually include compost and amendments\u2014read ingredients." },
    { question: "How many yards do I need?", answer: "Area \u00d7 depth, then \u00f7 27 for cubic yards." },
    { question: "Bags or bulk?", answer: "Bulk wins for multi-yard fills; bags are fine for small beds." },
    { question: "Can I topdress a lawn with garden soil mix?", answer: "Usually screened topsoil is used for thin lawn topdressing; rich bagged mixes can be costly and unnecessary for large lawn areas." },
  ],
};

/**
 * HowTo JSON-LD + visible steps for calculator pages.
 * Steps must match the on-page workflow (inputs → formula → label yields / waste).
 * Do not invent product yields or rates here—cite bag/manufacturer labels in step text.
 */
export type ToolHowTo = {
  name: string;
  steps: { name: string; text: string }[];
};

export const toolHowTo: Record<string, ToolHowTo> = {
  'concrete-calculator': {
    name: 'How to estimate slab concrete bags and yards',
    steps: [
      {
        name: 'Enter slab dimensions',
        text: 'Measure length, width, and thickness (or steps riser/tread/width). Use the shape that matches the pour.',
      },
      {
        name: 'Apply a waste percent',
        text: 'Add waste for irregular edges and spillage (the calculator default is 10%). Round up when ordering.',
      },
      {
        name: 'Read cubic feet, yards, and bags',
        text: 'Divide cubic feet by 27 for yards. Convert bags with the yield on your mix label (QUIKRETE Concrete Mix 1101 lists about 0.60 cu ft per 80 lb bag).',
      },
      {
        name: 'Confirm with the bag or ready-mix order',
        text: 'Match bag size and product name at the store, or convert yards for a ready-mix ticket before delivery day.',
      },
    ],
  },
  'concrete-calculator-post-holes': {
    name: 'How to estimate concrete for post holes',
    steps: [
      {
        name: 'Measure hole diameter and depth',
        text: 'Use the planned hole size (often about three times post width) and depth below frost where required.',
      },
      {
        name: 'Enter post count and waste',
        text: 'Multiply by the number of posts and add a small waste factor for uneven holes.',
      },
      {
        name: 'Convert volume to bags',
        text: 'Read cubic feet and bag counts, then confirm with the yield printed on your concrete mix bag.',
      },
      {
        name: 'Set posts per product instructions',
        text: 'Brace posts plumb and follow Fast-Setting or standard-mix guidance for water and fill method.',
      },
    ],
  },
  'sonotube-concrete-calculator': {
    name: 'How to use this concrete tube / Sonotube calculator',
    steps: [
      {
        name: 'Enter inside diameter and height',
        text: 'Use the clear inside diameter labeled on the cardboard concrete tube (Sonotube or equivalent), plus the fill height of the column.',
      },
      {
        name: 'Set tube count and waste',
        text: 'Multiply by the number of piers or tubes and add a small waste percent for spillage when filling tall forms.',
      },
      {
        name: 'Read volume and bag estimates',
        text: 'The calculator uses π × (radius)² × height × count, then bag yields from your mix label (about 0.60 cu ft per 80 lb bag for QUIKRETE Concrete Mix 1101).',
      },
      {
        name: 'Brace forms before pouring',
        text: 'Place tubes plumb, brace against ovalizing, and confirm footing details required by local code before you pour.',
      },
    ],
  },
  'mulch-calculator': {
    name: 'How to estimate mulch by area and depth',
    steps: [
      {
        name: 'Measure bed length and width',
        text: 'Measure each bed or use total square footage of the planting area.',
      },
      {
        name: 'Choose mulch depth',
        text: 'Enter the planned depth (often about 2–3 inches for many beds). Avoid burying tree trunks.',
      },
      {
        name: 'Convert volume to yards or bags',
        text: 'Read cubic feet and yards, then divide by the coverage printed on bagged mulch or order bulk by the yard.',
      },
      {
        name: 'Plan delivery and spreading',
        text: 'Confirm truck access and stage material so you can spread evenly to the depth you entered.',
      },
    ],
  },
  'mulch-calculator-tree-rings': {
    name: 'How to estimate donut mulch for tree rings',
    steps: [
      {
        name: 'Measure outer and inner diameters',
        text: 'Outer diameter is the ring edge; inner diameter is the mulch-free zone at the trunk (do not pile mulch against bark).',
      },
      {
        name: 'Enter mulch depth',
        text: 'Use a shallow, even depth—volcano mulching against the trunk can harm trees.',
      },
      {
        name: 'Read donut volume and bags',
        text: 'The calculator subtracts the inner circle from the outer circle, then multiplies by depth for cubic feet and bag estimates.',
      },
      {
        name: 'Spread in a flat ring',
        text: 'Keep mulch off the trunk flare and taper toward the edges rather than mounding.',
      },
    ],
  },
  'gravel-calculator': {
    name: 'How to estimate gravel tons and yards',
    steps: [
      {
        name: 'Enter length, width, and depth',
        text: 'Measure the area and planned compacted depth for drive, path, or base stone.',
      },
      {
        name: 'Apply waste and density',
        text: 'Add waste for irregular edges. Ton estimates use the density field—confirm bulk density with your supplier because moisture changes weight.',
      },
      {
        name: 'Read cubic yards and tons',
        text: 'Use yards for volume orders and tons when the quarry prices by weight.',
      },
      {
        name: 'Confirm delivery minimums',
        text: 'Call the yard for product type (base vs decorative), density, and truck minimums before ordering.',
      },
    ],
  },
  'topsoil-calculator': {
    name: 'How to estimate topsoil yards and bags',
    steps: [
      {
        name: 'Measure area and fill depth',
        text: 'Enter length and width (or total area) and the average depth of topsoil you will add.',
      },
      {
        name: 'Include settling waste',
        text: 'Add about 10% when the calculator waste field is used so settling and uneven grade do not leave thin spots.',
      },
      {
        name: 'Convert to yards or bags',
        text: 'Divide cubic feet by 27 for yards. For bags, divide cubic feet by the cubic feet printed on the product bag.',
      },
      {
        name: 'Match product to the job',
        text: 'Use screened topsoil for lawn leveling; use a garden blend or raised-bed mix when planting beds need compost content.',
      },
    ],
  },
  'sand-calculator': {
    name: 'How to estimate sand for beds and pavers',
    steps: [
      {
        name: 'Enter area and sand depth',
        text: 'For paver bedding, a common setting bed is about 1 inch over compacted gravel—confirm with your paver manufacturer.',
      },
      {
        name: 'Add waste for screeding',
        text: 'Include extra for screeding loss and corner cuts so you do not run short mid-install.',
      },
      {
        name: 'Read cubic yards (and tons if shown)',
        text: 'Order bedding or masonry sand by the product name specified for the job—play sand is not a substitute for paver bedding sand.',
      },
      {
        name: 'Keep edge restraints in mind',
        text: 'Install edge restraints so sand cannot migrate after compaction and joint filling.',
      },
    ],
  },
  'paver-calculator': {
    name: 'How to estimate pavers, sand, and base',
    steps: [
      {
        name: 'Enter patio size and paver face size',
        text: 'Measure length and width of the paved area and the actual face dimensions of one paver.',
      },
      {
        name: 'Set a waste percent for the pattern',
        text: 'Straight stack often needs about 5–10% extra; diagonal herringbone often needs more for cuts.',
      },
      {
        name: 'Review paver count plus sand and base volumes',
        text: 'The calculator divides area by one paver’s face area, then estimates bedding sand and gravel base from the depths you enter.',
      },
      {
        name: 'Dry-lay and buy matching dye lots',
        text: 'Dry-lay a few rows to confirm the bond pattern, then buy extras from the same dye lot for future repairs.',
      },
    ],
  },
  'fence-calculator': {
    name: 'How to estimate fence posts, rails, and pickets',
    steps: [
      {
        name: 'Enter total run length and post spacing',
        text: 'Sections = ceil(length ÷ spacing); posts = sections + 1. Six to eight feet is common for many wood privacy runs.',
      },
      {
        name: 'Set rails per section and picket size',
        text: 'Enter rails per bay and picket width plus gap so the tool can estimate picket count along the run.',
      },
      {
        name: 'Review the materials list',
        text: 'Copy posts, rails, pickets, and optional concrete bags. Override bags-per-post after running the post-hole calculator for solid fills.',
      },
      {
        name: 'Account for gates and corners',
        text: 'Add gate posts and hardware separately; corners may need extra posts or bracing beyond a straight run.',
      },
    ],
  },
  'deck-material-calculator': {
    name: 'How to estimate deck boards and joists',
    steps: [
      {
        name: 'Enter deck length and width',
        text: 'Use the rectangular footprint of the deck surface you will cover with boards.',
      },
      {
        name: 'Set board face width and joist spacing',
        text: 'Enter actual face width including gap. Joists are often 16 inches on center—follow decking manufacturer span tables when they require 12 inches.',
      },
      {
        name: 'Read boards, joists, and fasteners',
        text: 'Use the board and joist counts for a shopping list; screw counts scale with linear feet of decking.',
      },
      {
        name: 'Pair with footing concrete if needed',
        text: 'Size pier concrete separately with the Sonotube or post-hole calculator before you order framing lumber.',
      },
    ],
  },
  'roof-pitch-calculator': {
    name: 'How to convert roof rise and run to pitch',
    steps: [
      {
        name: 'Measure rise over a known run',
        text: 'Prefer an attic or rake measurement. Rise over 12 inches of run is the X in an X/12 pitch.',
      },
      {
        name: 'Enter rise and run in the calculator',
        text: 'The tool reports pitch (X-in-12), approximate angle, and percent slope from the same triangle.',
      },
      {
        name: 'Note the area factor when estimating materials',
        text: 'Use pitch-based area factors (for example IKO lists 1.118 for 6:12) when converting plan area to roof surface for shingles.',
      },
      {
        name: 'Work safely on roofs',
        text: 'Use fall protection on roof surfaces; attic measurements are safer when accessible.',
      },
    ],
  },
  'roofing-shingles-calculator': {
    name: 'How to use this shingle estimator (square feet to squares)',
    steps: [
      {
        name: 'Enter plan length, width, and pitch',
        text: 'Measure the building footprint and select the roof pitch so the tool can apply an area factor to get roof square feet.',
      },
      {
        name: 'Add waste for hips, valleys, and cuts',
        text: 'Simple roofs may need about 10% waste; complex roofs need more—follow manufacturer estimating guidance.',
      },
      {
        name: 'Read squares and bundles',
        text: 'Roof squares = roof square feet ÷ 100. Bundle counts use bundles per square from the shingle wrapper (often three for many strip shingles).',
      },
      {
        name: 'Confirm starter, ridge, and underlayment separately',
        text: 'This rectangle model estimates field shingles; order starter, hip/ridge, and underlayment from the manufacturer’s accessory guidance.',
      },
    ],
  },
  'paint-calculator': {
    name: 'How to estimate paint gallons for walls',
    steps: [
      {
        name: 'Enter room length, width, and height',
        text: 'Measure the room so the calculator can form wall area from the perimeter times ceiling height.',
      },
      {
        name: 'Subtract doors and windows',
        text: 'Enter door and window counts (or areas) so openings are removed from the paintable wall area.',
      },
      {
        name: 'Set coats and coverage',
        text: 'Divide paintable area by label coverage per coat, then multiply by coats. BEHR lists about 250–400 sq ft per gallon per coat for several interior lines; confirm the can you buy.',
      },
      {
        name: 'Buy matching tint lots',
        text: 'Round up to whole containers from the same tint batch and account for primer separately when the label requires it.',
      },
    ],
  },
  'retaining-wall-calculator': {
    name: 'How to estimate retaining wall blocks and base',
    steps: [
      {
        name: 'Enter wall length and height',
        text: 'Measure the exposed wall face. Block counts use the face area of one block from the dimensions you enter.',
      },
      {
        name: 'Set block size and waste',
        text: 'Use the manufacturer’s listed block face size and add waste for cuts and breakage.',
      },
      {
        name: 'Review courses, blocks, and base volume',
        text: 'The calculator estimates courses from height, total blocks, and crushed-stone base volume from base depth and width fields.',
      },
      {
        name: 'Follow the block system’s engineering limits',
        text: 'Height, geogrid, drainage, and surcharge rules come from the block manufacturer—this tool is a materials takeoff, not a structural design.',
      },
    ],
  },
  'grass-seed-calculator': {
    name: 'How to estimate grass seed per 1,000 sq ft',
    steps: [
      {
        name: 'Measure lawn square footage',
        text: 'Enter the area you will seed (new lawn or overseed).',
      },
      {
        name: 'Enter the bag rate per 1,000 sq ft',
        text: 'Copy the new-lawn or overseed rate printed on your seed bag. Many cool-season blends list about 3–4 lb per 1,000 sq ft for new lawns and a lower overseed rate.',
      },
      {
        name: 'Read total pounds (and kilograms)',
        text: 'Seed needed = (lawn sq ft ÷ 1,000) × rate. Use the new-lawn field for bare soil and the overseed field for thickening existing turf.',
      },
      {
        name: 'Calibrate the spreader',
        text: 'Set the spreader to the bag chart, split seed into two perpendicular passes, and keep seed in firm contact with soil for germination.',
      },
    ],
  },
  'fertilizer-calculator': {
    name: 'How to convert nitrogen rate to product pounds',
    steps: [
      {
        name: 'Enter lawn area',
        text: 'Measure the turf area you will fertilize in square feet.',
      },
      {
        name: 'Set desired nitrogen per 1,000 sq ft',
        text: 'Use the nitrogen target from local extension guidance or your fertility plan (for example 1 lb N per 1,000 sq ft for a single application).',
      },
      {
        name: 'Enter the fertilizer analysis',
        text: 'Read the N-P-K percentages on the bag (a 25-0-5 product is 25% nitrogen by weight).',
      },
      {
        name: 'Read product pounds and bag count',
        text: 'Product lb = (area ÷ 1,000) × (desired N ÷ nitrogen fraction). Buy whole bags and follow label timing and water-in instructions.',
      },
    ],
  },
  'raised-bed-soil-calculator': {
    name: 'How to estimate soil for a raised bed',
    steps: [
      {
        name: 'Measure interior length, width, and fill depth',
        text: 'Use inside dimensions of the box and the depth you will fill with mix.',
      },
      {
        name: 'Read cubic feet and yards',
        text: 'Volume = length × width × depth. An 8×4 ft bed 12 inches deep is 32 cu ft (~1.2 cu yd).',
      },
      {
        name: 'Choose a mix strategy',
        text: 'Deep beds often use bulk topsoil/compost blends for most of the volume with a finer mix near the top—avoid pure play sand as the only fill.',
      },
      {
        name: 'Order bags or bulk to match volume',
        text: 'Divide cubic feet by the bag size printed on the product, or order bulk by the yard for large beds.',
      },
    ],
  },
  'asphalt-calculator': {
    name: 'How to estimate asphalt tons for a driveway or pad',
    steps: [
      {
        name: 'Measure length, width, and compacted depth',
        text: 'Use the finished paved footprint and the compacted thickness the paving plan calls for (often about 2–3 inches of surface mix over base).',
      },
      {
        name: 'Confirm mix density',
        text: 'Default density is 145 lb/cu ft for compacted hot-mix asphalt (common FHWA / industry planning weight). Override with the plant mix density when you have it.',
      },
      {
        name: 'Add a small overage',
        text: 'The calculator default is 5% for edges and thin spots. Irregular driveways may need more.',
      },
      {
        name: 'Read tons and cubic yards',
        text: 'Tons = (area × depth in feet × density) ÷ 2,000. Order from the plant by the ton and confirm base stone separately with the gravel calculator.',
      },
    ],
  },
  'brick-calculator': {
    name: 'How to estimate bricks or concrete blocks for a wall',
    steps: [
      {
        name: 'Choose clay brick or CMU mode',
        text: 'Clay brick defaults to a modular 7⅝ × 2¼ in face. Concrete block (CMU) defaults to a 15⅝ × 7⅝ in face (nominal 8×16 module with a ⅜ in joint).',
      },
      {
        name: 'Enter wall length and height',
        text: 'Measure the face area to cover. Subtract door and window openings before you order.',
      },
      {
        name: 'Set unit size, mortar joint, and waste',
        text: 'Use the actual face sizes from the manufacturer. A ⅜ in joint is the usual modular default. Add about 5% waste for cuts and breakage.',
      },
      {
        name: 'Read courses and unit counts',
        text: 'Units = courses × units per course from the mortar module. Glen-Gery lists about 6.86 modular bricks per square foot with a ⅜ in joint.',
      },
    ],
  },
  'lumber-calculator': {
    name: 'How to calculate board feet and lumber pieces',
    steps: [
      {
        name: 'Enter nominal thickness, width, and length',
        text: 'Softwood board feet use nominal size (a 2×4 uses 2 and 4, not 1½ × 3½). Length is the actual piece length in feet.',
      },
      {
        name: 'Choose pieces → board feet or board feet → pieces',
        text: 'Count identical pieces to total board feet, or enter a target board-foot purchase and convert to pieces of that size.',
      },
      {
        name: 'Read board feet and linear feet',
        text: 'Board feet per piece = (thickness × width × length) ÷ 12. Multiply by piece count for the order total.',
      },
      {
        name: 'Cross-check specialty takeoffs',
        text: 'For a rectangular deck board and joist list, also use the deck material calculator so spacing rules stay consistent.',
      },
    ],
  },
  'rebar-calculator': {
    name: 'How to estimate rebar for a concrete slab',
    steps: [
      {
        name: 'Enter slab length and width',
        text: 'Use the plan dimensions of the pour. This tool estimates the rebar mat only—use the concrete calculator for yards and bags.',
      },
      {
        name: 'Set on-center spacing and bar size',
        text: 'Many residential slabs use #3 or #4 bar at 12–18 in on center each way. ACI 318 caps shrinkage/temperature spacing at the lesser of 5× thickness or 18 in for many slabs—confirm with drawings and local code.',
      },
      {
        name: 'Choose stick length and waste',
        text: 'Yards often stock 20 ft or 40 ft sticks. Add about 10% for laps, cuts, and chairs unless the detail shows exact lengths.',
      },
      {
        name: 'Read bar counts, linear feet, and sticks',
        text: 'Bars each way = floor(span ÷ spacing) + 1. Total linear feet ÷ stick length (with waste) gives the stick count to buy.',
      },
    ],
  },
};

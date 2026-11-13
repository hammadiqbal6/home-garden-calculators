/** HowTo JSON-LD steps for procedural guides (must match visible steps in guideBodies). */
export type GuideHowTo = {
  name: string;
  steps: { name: string; text: string }[];
};

export const guideHowTo: Record<string, GuideHowTo> = {
  'how-to-measure-roof-pitch': {
    name: 'How to measure roof pitch',
    steps: [
      {
        name: 'Prefer an attic or rake measurement',
        text: 'Measure rise over run on a rafter in the attic when possible. Use the roof surface or rake only with proper fall protection and dry conditions.',
      },
      {
        name: 'Measure rise over 12 inches of run',
        text: 'Hold a level horizontal and measure the vertical rise at the 12-inch mark along the level. That rise in inches is the X in an X/12 pitch.',
      },
      {
        name: 'Convert to angle and area factor',
        text: 'Pitch (X-in-12) = (rise ÷ run) × 12. Angle ≈ arctan(rise/run). IKO lists a 6:12 area factor of 1.118 for converting plan area to roof surface.',
      },
      {
        name: 'Estimate shingles from plan area',
        text: 'Multiply plan footprint by the area factor for roof square feet, divide by 100 for squares, then add waste and read bundles per square on the label.',
      },
    ],
  },
  'how-much-concrete-for-fence-posts': {
    name: 'How to estimate concrete for fence posts',
    steps: [
      {
        name: 'Count posts',
        text: 'Include line posts, corners, and gate posts using a fence layout or fence calculator.',
      },
      {
        name: 'Choose hole diameter and depth',
        text: 'QUIKRETE setting-posts guidance commonly uses a hole about three times the post width and depth of about one-third to one-half of the above-ground length, below frost where required.',
      },
      {
        name: 'Calculate cylinder volume and bags',
        text: 'Use π × (diameter ÷ 2)² × depth × post count, then convert with the yield on your mix (about 0.60 cu ft per 80 lb bag of QUIKRETE Concrete Mix 1101).',
      },
      {
        name: 'Set posts per the mix instructions',
        text: 'Add gravel under the post when appropriate, brace plumb, and fill according to the bag or ready-mix guidance.',
      },
    ],
  },
  'how-much-paint-for-a-room': {
    name: 'How to estimate paint for a room',
    steps: [
      {
        name: 'Measure the room',
        text: 'Record length, width, and ceiling height in feet.',
      },
      {
        name: 'Subtract openings',
        text: 'Count doors and windows (or measure unusual openings) and subtract their areas from wall area.',
      },
      {
        name: 'Apply coverage and coats',
        text: 'Divide paintable area by label coverage. BEHR lists about 250–400 sq ft per gallon per coat for several ULTRA and PREMIUM PLUS interior paints; YardTally defaults to 350. Multiply by coats.',
      },
      {
        name: 'Round up to matching tint lots',
        text: 'Buy whole containers from the same tint batch and add primer separately when the label requires it.',
      },
    ],
  },
  'how-many-bags-of-concrete': {
    name: 'How to convert concrete volume to bags',
    steps: [
      {
        name: 'Compute cubic feet for the pour',
        text: 'Use the shape calculator that matches the job (slab, post hole, or Sonotube), then note cubic feet before waste.',
      },
      {
        name: 'Divide by bag yield',
        text: 'QUIKRETE Concrete Mix 1101 and Sakrete High-Strength list about 0.60 cu ft per 80 lb bag and 0.45 cu ft per 60 lb bag. Bags = volume ÷ yield.',
      },
      {
        name: 'Add waste and round up',
        text: 'Manufacturer yields do not include waste. Add about 5–10%, then round up to whole bags.',
      },
    ],
  },
  'concrete-for-10x10-slab': {
    name: 'How to estimate concrete for a 10×10 slab',
    steps: [
      {
        name: 'Choose thickness',
        text: 'Many residential patio pads are planned near 4 inches; heavier loads often use 5–6 inches. Confirm local practice—this page estimates volume only.',
      },
      {
        name: 'Compute volume',
        text: 'Cubic feet = 10 × 10 × (thickness inches ÷ 12). Divide by 27 for cubic yards.',
      },
      {
        name: 'Convert to bags with waste',
        text: 'Multiply by about 1.10 for a 10% waste allowance, then divide by bag yield (about 0.60 cu ft for 80 lb, 0.45 for 60 lb) and round up.',
      },
      {
        name: 'Order base separately',
        text: 'Compacted gravel under the slab is a separate order. Estimate it with a gravel calculator using base depth, not slab thickness.',
      },
    ],
  },
  'how-much-concrete-in-a-sonotube': {
    name: 'How to estimate concrete in a Sonotube',
    steps: [
      {
        name: 'Confirm inside diameter and height',
        text: 'Use the tube’s inside diameter and the height you will fill, not the cardboard wall thickness.',
      },
      {
        name: 'Compute cylinder volume',
        text: 'Volume (cu ft) = π × (diameter ÷ 2)² × height with diameter and height in feet. A 12-inch × 4 ft tube is about 3.14 cu ft.',
      },
      {
        name: 'Convert to bags',
        text: 'Divide by bag yield (about 0.60 cu ft per 80 lb, 0.45 per 60 lb for QUIKRETE 1101 / Sakrete High-Strength), multiply by pier count, then round up with a little leftover.',
      },
    ],
  },
  'how-to-estimate-roofing-shingles': {
    name: 'How to estimate roofing shingles',
    steps: [
      {
        name: 'Measure plan dimensions and pitch',
        text: 'Measure each roof plane’s plan length and width, and determine pitch (rise over 12 inches of run). Prefer attic or rake measurements when climbing is unsafe.',
      },
      {
        name: 'Convert plan area to roof surface',
        text: 'Multiply plan area by the pitch area factor (IKO lists 1.118 for 6:12). Sum the planes for total roof square feet.',
      },
      {
        name: 'Convert to squares, bundles, and waste',
        text: 'Divide roof square feet by 100 for squares. Many common asphalt lines use about 3 bundles per square; specialty products may need 4–5. Add about 10–15% waste (IKO general range) or up to about 10% overage (GAF).',
      },
    ],
  },
  'mulch-depth-guide': {
    name: 'How to measure and refresh mulch depth',
    steps: [
      {
        name: 'Probe existing depth',
        text: 'Push a ruler or stick through the mulch to mineral soil in several spots and note the average depth.',
      },
      {
        name: 'Choose a target depth',
        text: 'Most extension guidance for flower beds and gardens lands around 2–3 inches of organic mulch. Keep mulch pulled back from trunks.',
      },
      {
        name: 'Top up rather than stack',
        text: 'Order only the difference between existing and target depth. Measure area, convert depth to feet, and use a mulch calculator for bags or yards.',
      },
    ],
  },
  'mulch-for-common-garden-beds': {
    name: 'How to calculate mulch from area and depth',
    steps: [
      {
        name: 'Measure the bed',
        text: 'Record length and width in feet, or split L-shapes into rectangles and add areas.',
      },
      {
        name: 'Pick depth',
        text: 'Common bed targets are about 2–3 inches of organic mulch. Convert inches to feet (3 inches = 0.25 ft).',
      },
      {
        name: 'Convert to bags or yards',
        text: 'Cubic feet = area × depth in feet. Divide by 2 or 3 for common bag sizes, or divide by 27 for cubic yards. UF/IFAS notes about 108 sq ft per cubic yard at 3 inches.',
      },
    ],
  },
  'gravel-types-for-driveways': {
    name: 'How to estimate driveway gravel volume',
    steps: [
      {
        name: 'Choose base vs surface material',
        text: 'Use angular dense grade / crusher run for the locked base. Prefer angular stone for the driving surface; rounded pea gravel alone tends to roll under tires.',
      },
      {
        name: 'Compute cubic yards',
        text: 'Volume (cu yd) = length × width × depth in feet ÷ 27. Use the compacted depth you intend to place, not loose dump height.',
      },
      {
        name: 'Ask the quarry for tons',
        text: 'Tons = cubic yards × compacted unit weight from your yard. Densities vary by rock type, so do not treat one tons-per-yard figure as universal.',
      },
    ],
  },
  'grass-seed-per-sq-ft': {
    name: 'How to buy the right amount of grass seed',
    steps: [
      {
        name: 'Measure lawn area',
        text: 'Measure each rectangle (or break irregular shapes into rectangles) and add square feet.',
      },
      {
        name: 'Choose new lawn vs overseed rate',
        text: 'Use Iowa State PM 1072 for cool-season mixtures, or the lb per 1,000 sq ft printed on your bag. Overseed rates are often lower than bare-soil rates.',
      },
      {
        name: 'Compute seed pounds',
        text: 'Seed (lb) = (area ÷ 1,000) × rate. Buy a little extra for thin spots and walk perpendicular spreader passes.',
      },
    ],
  },
  'fertilizer-nitrogen-per-1000-sq-ft': {
    name: 'How to calculate lawn fertilizer from nitrogen',
    steps: [
      {
        name: 'Set a nitrogen target',
        text: 'Penn State watershed guidance often starts near 2 lb N per 1,000 sq ft per growing season for many established lawns in Pennsylvania, split across applications. Always follow the label and local law.',
      },
      {
        name: 'Read the N-P-K analysis',
        text: 'The first number is percent nitrogen by weight. For 30-0-4, N = 30% = 0.30 as a decimal.',
      },
      {
        name: 'Convert to product pounds',
        text: 'Product lb per 1,000 sq ft = desired lb N ÷ (N% as a decimal). Scale by (lawn sq ft ÷ 1,000).',
      },
    ],
  },
  'raised-bed-soil-mix-4x8': {
    name: 'How to fill a 4×8 raised bed',
    steps: [
      {
        name: 'Measure interior dimensions and depth',
        text: 'Use inside length, width, and the soil depth you will fill (often 12–18 inches for many vegetable beds).',
      },
      {
        name: 'Compute volume',
        text: 'Cubic feet = length × width × depth in feet. A 4×8 bed 12 inches deep is 32 cu ft (about 1.19 cu yd).',
      },
      {
        name: 'Choose a mix',
        text: 'Iowa State Extension describes equal parts topsoil, organic matter, and coarse sand, or about 70% topsoil and 30% compost. Adjust for crops and climate.',
      },
    ],
  },
  'paver-base-gravel-and-sand-depth': {
    name: 'How to estimate paver base and sand',
    steps: [
      {
        name: 'Confirm manufacturer depths',
        text: 'YardTally defaults (about 4 inches compacted gravel base plus about 1 inch bedding sand) are planning assumptions. Follow the paver installation sheet for your product and traffic.',
      },
      {
        name: 'Compute each layer separately',
        text: 'Volume (cu ft) = length × width × (depth inches ÷ 12) for gravel base and for sand. Do not reuse driveway depths for a patio assembly without checking the manufacturer.',
      },
      {
        name: 'Convert to tons or bags if needed',
        text: 'Ask the yard for compacted density before converting cubic yards to tons. Order pavers with pattern waste separately.',
      },
    ],
  },
  'deck-material-list-12x16': {
    name: 'How to build a 12×16 deck material takeoff',
    steps: [
      {
        name: 'Confirm footprint and board direction',
        text: 'A 12×16 deck is 192 sq ft of footprint. Decide which way the decking runs before counting boards.',
      },
      {
        name: 'Count boards and joists with stated defaults',
        text: 'Use actual face width and joist spacing. YardTally defaults (about 5.5 in face, 16 in O.C.) are planning assumptions—verify span tables and the decking brand.',
      },
      {
        name: 'Size posts and footings separately',
        text: 'This takeoff is not a construction plan. Size piers with the Sonotube calculator and follow local code for footings.',
      },
    ],
  },
  'deck-material-list-16x24': {
    name: 'How to build a 16×24 deck material takeoff',
    steps: [
      {
        name: 'Confirm footprint and orientation',
        text: 'A 16×24 deck is 384 sq ft of footprint. Board and joist counts change with decking direction.',
      },
      {
        name: 'Run the deck calculator with your board width',
        text: 'YardTally defaults (5.5 in face, 12 ft stock, 16 in O.C.) are planning assumptions, not a cutting list or priced bill of materials.',
      },
      {
        name: 'Estimate pier concrete separately',
        text: 'Use the Sonotube guide and calculator for tube diameter × depth bag counts. Do not treat this page as engineered footing design.',
      },
    ],
  },
  'retaining-wall-blocks-and-base': {
    name: 'How to estimate retaining wall blocks and base',
    steps: [
      {
        name: 'Measure wall length and exposed height',
        text: 'Courses ≈ ceil(height ÷ block face height). Blocks per course ≈ ceil(length ÷ block face length). Read face size on the pallet tag.',
      },
      {
        name: 'Plan a wall base, not a patio paver section',
        text: 'People often say “paver base” when they mean a compacted gravel trench under wall blocks. Follow the block manufacturer’s trench, drainage, and geogrid instructions.',
      },
      {
        name: 'Stop for engineering when required',
        text: 'Tall walls, surcharges, and poor soils need an engineer. Do not invent a legal height cap from this planning page.',
      },
    ],
  },
  'topsoil-vs-garden-soil': {
    name: 'How to choose and order topsoil or garden soil',
    steps: [
      {
        name: 'Match product to the job',
        text: 'Topsoil is usually mineral soil for grading and fill. Bagged garden or raised-bed mixes often include compost. Read ingredients—labels are not identical everywhere.',
      },
      {
        name: 'Compute volume',
        text: 'Cubic feet = area × depth in feet. Cubic yards = cubic feet ÷ 27.',
      },
      {
        name: 'Choose bags vs bulk',
        text: 'Bags suit small beds. Once you need roughly a cubic yard or more, bulk is often cheaper if you can stage a delivery.',
      },
    ],
  },
};

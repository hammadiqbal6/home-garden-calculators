import { siteConfig } from '../config/site';
import { guideBodies } from './guideBodies';
import { guideFaqs, type GuideFaq } from './guideFaqs';

export interface GuideDefinition {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  answerFirst: string;
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
  datePublished: string;
  dateModified: string;
  bodyHtml: string;
  faq: GuideFaq[];
}

const UPDATED = siteConfig.contentUpdated;

function g(
  partial: Omit<GuideDefinition, 'bodyHtml' | 'faq' | 'dateModified'> & {
    dateModified?: string;
  },
): GuideDefinition {
  const bodyHtml = guideBodies[partial.slug];
  const faq = guideFaqs[partial.slug];
  if (!bodyHtml) throw new Error(`Missing guideBodies for ${partial.slug}`);
  if (!faq) throw new Error(`Missing guideFaqs for ${partial.slug}`);
  return {
    ...partial,
    dateModified: partial.dateModified ?? UPDATED,
    bodyHtml,
    faq,
  };
}

export const guides: GuideDefinition[] = [
  g({
    slug: 'how-much-concrete-for-fence-posts',
    title: 'How Much Concrete for a Fence Post? Bags',
    description:
      'How much concrete for a fence post by hole diameter and depth. Bag charts for 4×4 and 6×6 posts, frost tips, and a free post-hole calculator.',
    h1: 'How Much Concrete for a Fence Post? Bags',
    primaryKeyword: 'how much concrete for fence posts',
    secondaryKeywords: ['concrete per fence post', 'bags of concrete for fence posts'],
    answerFirst:
      'Most residential fence posts need about one to three 60–80 lb bags of concrete each, depending on hole diameter and depth. An 8-inch-wide, 2-foot-deep hole holds roughly 0.70 cubic feet—about two bags of standard mix after waste. Multiply by your post count, and dig below the local frost line.',
    relatedToolSlugs: [
      'concrete-calculator-post-holes',
      'fence-calculator',
      'sonotube-concrete-calculator',
      'concrete-calculator',
    ],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'concrete-for-10x10-slab',
      'how-much-concrete-in-a-sonotube',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'mulch-depth-guide',
    title: 'How Deep Should Mulch Be? Beds, Trees, Gardens',
    description:
      'How deep should mulch be in beds, around trees, and in gardens? Typical 2–3 inch depths, a coverage table, and a free mulch calculator for bags and yards.',
    h1: 'How Deep Should Mulch Be? Beds, Trees, Gardens',
    primaryKeyword: 'mulch depth',
    secondaryKeywords: [
      'how deep should mulch be',
      'mulch depth for gardens',
      'mulch depth for flower beds',
    ],
    answerFirst:
      'Most flower beds and garden plantings do well with about 2–3 inches of organic mulch. Mississippi State Extension says pull mulch 2–3 inches back from trunks. UF/IFAS Florida-Friendly guidance targets about 3 inches and warns against deeper beds. Clemson lists 2–3 inches for many wood and bark mulches. Measure existing depth, then use the mulch calculator for bags and yards.',
    relatedToolSlugs: [
      'mulch-calculator',
      'mulch-calculator-circular-beds',
      'mulch-calculator-tree-rings',
      'topsoil-calculator',
    ],
    relatedGuideSlugs: [
      'mulch-for-common-garden-beds',
      'topsoil-vs-garden-soil',
      'raised-bed-soil-mix-4x8',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-27',
  }),
  g({
    slug: 'how-many-bags-of-concrete',
    title: 'How Many Bags of Concrete Per Yard? Chart',
    description:
      'How many bags of concrete per cubic yard for 40, 60, and 80 lb mixes. Chart bag counts for slabs, posts, and Sonotubes with standard yields.',
    h1: 'How Many Bags of Concrete Per Yard? Chart',
    primaryKeyword: 'how many bags of concrete do I need',
    secondaryKeywords: ['80 lb bags of concrete per yard', 'concrete bag calculator'],
    answerFirst:
      'An 80 lb bag yields about 0.60 cu ft; you need roughly 45 bags per cubic yard before waste. Divide your project volume in cubic feet by the bag yield (about 0.30 / 0.45 / 0.60 for 40 / 60 / 80 lb), then round up. For pours larger than about one yard, ready-mix is usually more practical.',
    relatedToolSlugs: [
      'concrete-calculator',
      'concrete-slab-cost-calculator',
      'concrete-calculator-post-holes',
      'sonotube-concrete-calculator',
      'rebar-calculator',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-do-i-need',
      'concrete-slab-thickness',
      'how-much-concrete-for-fence-posts',
      'concrete-for-10x10-slab',
      'how-much-concrete-in-a-sonotube',
      'sonotube-footing-and-depth',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-27',
  }),
  g({
    slug: 'concrete-for-10x10-slab',
    title: 'How Much Concrete for a 10×10 Slab?',
    description:
      'How much concrete for a 10×10 slab at 4–6 inches, plus 12×12 and 20×20 charts. Yards, bags, and waste—with a free slab calculator link.',
    h1: 'How Much Concrete for a 10×10 Slab?',
    primaryKeyword: 'how much concrete for a 10x10 slab',
    secondaryKeywords: ['10x10 concrete slab bags', 'concrete for patio slab'],
    answerFirst:
      'A 10×10 ft slab at 4 inches needs about 1.23 cubic yards (33.3 cu ft) before waste—roughly 62 bags of 80 lb mix or 82 bags of 60 lb mix after 10% waste. At 6 inches the same footprint is about 1.85 cu yd. Use these figures as planning estimates and confirm bag yields on the label.',
    relatedToolSlugs: [
      'concrete-calculator',
      'concrete-slab-cost-calculator',
      'rebar-calculator',
      'gravel-calculator',
    ],
    relatedGuideSlugs: [
      'concrete-slab-thickness',
      'how-much-concrete-do-i-need',
      'how-many-bags-of-concrete',
      'how-much-concrete-for-fence-posts',
    ],
    datePublished: '2026-10-20',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'mulch-for-common-garden-beds',
    title: 'Mulch for Garden Beds: 4x8, 10x10 & Sizes',
    description:
      'Mulch amounts for common garden bed sizes—4×8, 10×10, and more. Cubic yards and bags at typical depths, with a free mulch calculator.',
    h1: 'Mulch for Garden Beds: 4x8, 10x10 & Sizes',
    primaryKeyword: 'mulch for garden bed sizes',
    secondaryKeywords: [
      'how much mulch for a 4x8 garden bed',
      'how many bags of mulch for flower bed',
      'mulch bags vs bulk',
    ],
    answerFirst:
      'At 3 inches deep, a 4×8 ft bed needs 8 cu ft of mulch (four 2 cu ft bags). A 20×5 bed needs about 25 cu ft (thirteen 2 cu ft bags). Iowa notes bags are commonly 2 or 3 cu ft; UF/IFAS says one cubic yard covers about 108 sq ft at 3 inches. Calculate area × depth first.',
    relatedToolSlugs: ['mulch-calculator', 'mulch-calculator-tree-rings'],
    relatedGuideSlugs: ['mulch-depth-guide', 'topsoil-vs-garden-soil'],
    datePublished: '2026-10-20',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'gravel-types-for-driveways',
    title: 'Best Gravel for a Driveway: Types & Depths',
    description:
      'Best gravel for a driveway: dense-grade base vs surface stone, depth and tonnage tables, and a free gravel calculator for yards and tons.',
    h1: 'Best Gravel for a Driveway: Types & Depths',
    primaryKeyword: 'gravel types for driveways',
    secondaryKeywords: [
      'best gravel for driveway',
      'what is dense grade gravel',
      'crushed stone vs pea gravel',
    ],
    answerFirst:
      'Driveways usually need a compacted angular crushed-stone base (dense grade / crusher run) plus a stable surface course. Pea gravel rolls under tires and is a poor sole driving surface. Estimate length × width × depth, then ask your quarry for compacted density when converting yards to tons—or use the gravel calculator.',
    relatedToolSlugs: [
      'gravel-calculator',
      'paver-base-calculator',
      'asphalt-calculator',
      'sand-calculator',
      'paver-calculator',
    ],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'retaining-wall-blocks-and-base',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'how-to-measure-roof-pitch',
    title: 'How to Measure Roof Pitch: 3 Easy Methods',
    description:
      'How to measure roof pitch safely from the attic, roof, or ground. Convert rise and run to pitch and degrees with a free pitch calculator.',
    h1: 'How to Measure Roof Pitch: 3 Easy Methods',
    primaryKeyword: 'how to measure roof pitch',
    secondaryKeywords: ['measure roof slope', 'roof pitch from ground'],
    answerFirst:
      'Roof pitch is inches of rise per 12 inches of run. Place a level horizontally against a rafter or roof surface, mark 12 inches along the level, then measure vertical rise at that mark. A 6-inch rise is a 6/12 pitch (~26.6°). Prefer attic or rake measurements when climbing is unsafe.',
    relatedToolSlugs: ['roof-pitch-calculator', 'roofing-shingles-calculator'],
    relatedGuideSlugs: ['how-to-estimate-roofing-shingles', 'deck-material-list-12x16'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'grass-seed-per-sq-ft',
    title: 'Grass Seed per Sq Ft: New Lawn & Overseed',
    description:
      'Grass seed per square foot and per 1,000 sq ft for new lawns and overseeding. Use bag rates with worked examples for cool-season turf.',
    h1: 'Grass Seed per Sq Ft: New Lawn & Overseed',
    primaryKeyword: 'grass seed per square foot',
    secondaryKeywords: [
      'how much grass seed per 1000 sq ft',
      'grass seed rate per 1000 sq ft',
      'how much grass seed per sq ft',
    ],
    answerFirst:
      'Grass seed rates are listed in pounds per 1,000 square feet. Multiply (lawn sq ft ÷ 1,000) by the bag or extension rate. Iowa State PM 1072 lists cool-season mixes from 1–1.5 lb per 1,000 for Kentucky bluegrass up to 7–9 lb for tall fescue. Warm-season grasses need Southern extension rates; do not invent them here.',
    relatedToolSlugs: ['grass-seed-calculator', 'topsoil-calculator', 'fertilizer-calculator'],
    relatedGuideSlugs: [
      'fertilizer-nitrogen-per-1000-sq-ft',
      'topsoil-vs-garden-soil',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'fertilizer-nitrogen-per-1000-sq-ft',
    title: 'How Much Fertilizer per 1,000 Sq Ft?',
    description:
      'How much fertilizer per 1,000 sq ft from nitrogen targets and N-P-K. Includes 10-10-10, starter rates, and product pounds for lawn feeding.',
    h1: 'How Much Fertilizer per 1,000 Square Feet?',
    primaryKeyword: 'fertilizer nitrogen per 1000 sq ft',
    secondaryKeywords: [
      'how to calculate fertilizer for 1 lb nitrogen',
      'what does 30-0-4 mean',
      'lawn fertilizer rate calculator',
    ],
    answerFirst:
      'Product pounds equal desired nitrogen pounds divided by N% as a decimal. For 1 lb N per 1,000 sq ft with 30-0-4, use about 3.3 lb of product per 1,000. Penn State cites about 2 lb N per 1,000 per season as a starting rate; Pennsylvania caps total N near 0.9 lb per application. Follow the label and local law.',
    relatedToolSlugs: ['fertilizer-calculator', 'grass-seed-calculator'],
    relatedGuideSlugs: ['grass-seed-per-sq-ft', 'topsoil-vs-garden-soil'],
    datePublished: '2026-10-23',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'raised-bed-soil-mix-4x8',
    title: 'Raised Bed Soil Mix for a 4x8: Ratios & Cu Ft',
    description:
      'Raised bed soil mix for a 4×8 bed: ratios and cubic feet. Plan compost, topsoil, and aeration blend volume with a free bed soil calculator.',
    h1: 'Raised Bed Soil Mix for a 4x8: Ratios & Cu Ft',
    primaryKeyword: 'raised bed soil mix 4x8',
    secondaryKeywords: [
      'how much soil for 4x8 raised bed',
      'good soil mix for raised bed',
      'raised bed soil depth',
    ],
    answerFirst:
      'A 4×8 ft raised bed filled 12 inches deep needs 32 cubic feet of mix (about 1.19 cubic yards). Volume is interior length × width × depth. Iowa State Extension describes equal parts topsoil, organic matter, and coarse sand, or about 70% topsoil and 30% compost. Adjust for crops and climate.',
    relatedToolSlugs: ['raised-bed-soil-calculator', 'topsoil-calculator'],
    relatedGuideSlugs: ['topsoil-vs-garden-soil', 'mulch-depth-guide'],
    datePublished: '2026-10-23',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'how-much-paint-for-a-room',
    title: 'How Much Paint for a Room? Gallons by Size',
    description:
      'How much paint for a room by size and coats. Gallons for walls and ceilings with door and window deductions—pair with the paint calculator.',
    h1: 'How Much Paint for a Room? Gallons by Size',
    primaryKeyword: 'how much paint for a room',
    secondaryKeywords: [
      'how many square feet does a gallon of paint cover',
      'paint gallons for a room',
      'how much paint for small bathroom',
      'how much paint for a 12x12 room',
    ],
    answerFirst:
      'BEHR says one gallon of BEHR ULTRA or PREMIUM PLUS interior paint and primer covers about 250–400 sq ft per coat. YardTally’s paint calculator defaults to 350, in that range. Gallons equal paintable wall area times coats divided by coverage; confirm the can for your room.',
    relatedToolSlugs: ['paint-calculator', 'fence-calculator', 'deck-material-calculator'],
    relatedGuideSlugs: ['deck-material-list-12x16', 'retaining-wall-blocks-and-base'],
    datePublished: '2026-10-23',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'paver-base-gravel-and-sand-depth',
    title: 'Paver Base Depth: Gravel & Sand Thickness',
    description:
      'Paver base depth for gravel and sand under patios and walkways. Typical compacted thicknesses and how to estimate yards before you order.',
    h1: 'Paver Base Depth: Gravel & Sand Thickness',
    primaryKeyword: 'paver base gravel and sand depth',
    secondaryKeywords: [
      'how deep should paver base gravel be',
      'paver base thickness',
      'bedding sand depth for pavers',
      'how much sand under pavers',
    ],
    answerFirst:
      'YardTally’s patio calculator defaults to about 4 inches of compacted paver base gravel plus about 1 inch of bedding sand under concrete pavers. Those are planning assumptions, not a universal standard. Follow the paver manufacturer sheet; driveway assemblies use different depths.',
    relatedToolSlugs: ['paver-calculator', 'sand-calculator', 'gravel-calculator'],
    relatedGuideSlugs: [
      'gravel-types-for-driveways',
      'retaining-wall-blocks-and-base',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'deck-material-list-12x16',
    title: '12x16 Deck Material List: Boards & Joists',
    description:
      '12×16 deck material list for deck boards, joists, posts, and hardware. Planning takeoff with YardTally defaults—confirm spans with local code.',
    h1: '12x16 Deck Material List: Boards & Joists',
    primaryKeyword: 'deck material list 12x16',
    secondaryKeywords: [
      '12x16 deck boards',
      'how many joists for 12x16 deck',
      '12x16 deck plan vs material list',
    ],
    answerFirst:
      'This is a shopping takeoff for a 12×16 ft deck (192 sq ft), not construction plans or a priced BOM. With YardTally defaults (5.5 in face, 16 in O.C. joists) and boards along 12 ft, plan about 35 twelve-foot boards and 10 field joists before waste; verify current span tables.',
    relatedToolSlugs: ['deck-material-calculator', 'lumber-calculator', 'sonotube-concrete-calculator'],
    relatedGuideSlugs: [
      'deck-material-list-16x24',
      'lumber-weight-chart',
      'how-much-concrete-for-fence-posts',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'deck-material-list-16x24',
    title: '16x24 Deck Material List: Lumber Takeoff',
    description:
      '16×24 deck material list for boards, joists, beams, posts, and footings. Full lumber takeoff assumptions you can adjust before you buy.',
    h1: '16x24 Deck Material List: Lumber Takeoff',
    primaryKeyword: '16x24 deck material list',
    secondaryKeywords: [
      '16x24 deck boards',
      'how many joists for 16x24 deck',
      '16 by 24 deck lumber list',
      'is 16x24 deck list same as 12x16 scaled',
    ],
    answerFirst:
      'A 16×24 list is not the 12×16 list scaled by area. With YardTally defaults and boards along 24 ft across a 16 ft width, plan about 70 twelve-foot boards and 19 field joists before waste, then size beams, posts, and footings separately from span tables.',
    relatedToolSlugs: ['deck-material-calculator', 'lumber-calculator', 'sonotube-concrete-calculator'],
    relatedGuideSlugs: [
      'deck-material-list-12x16',
      'lumber-weight-chart',
      'how-much-concrete-for-fence-posts',
    ],
    datePublished: '2026-11-13',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'retaining-wall-blocks-and-base',
    title: 'Retaining Wall Blocks & Base: Count & Build',
    description:
      'How many retaining wall blocks you need, gravel base depth, and drainage backfill—with a planning table and free retaining wall calculator.',
    h1: 'Retaining Wall Blocks & Base: Count & Build',
    primaryKeyword: 'retaining wall blocks and base',
    secondaryKeywords: [
      'how many retaining wall blocks',
      'retaining wall gravel base',
      'can I use paver base under a retaining wall',
      'typical retaining wall block dimensions',
    ],
    answerFirst:
      'A 20 ft wall that is 3 ft exposed with 18×6 in face blocks needs about 84 face blocks before waste (six courses × 14), plus a compacted gravel trench. YardTally’s 24×6 in trench is a planning default. Use the retaining wall calculator for live counts; taller walls need engineering.',
    relatedToolSlugs: [
      'retaining-wall-calculator',
      'brick-calculator',
      'gravel-calculator',
      'paver-base-calculator',
    ],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'gravel-types-for-driveways',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'topsoil-vs-garden-soil',
    title: 'Topsoil vs Garden Soil: Differences & Uses',
    description:
      'Topsoil vs garden soil: differences, best uses, and when to buy each. Pair with free topsoil and raised-bed calculators for yards and bags.',
    h1: 'Topsoil vs Garden Soil: Differences & Uses',
    primaryKeyword: 'topsoil vs garden soil',
    secondaryKeywords: [
      'garden soil vs topsoil',
      'how many yards of topsoil',
      'can I use topsoil in pots',
      'is garden soil the same as topsoil',
    ],
    answerFirst:
      'Garden soil is not the same as topsoil. Topsoil is mainly mineral soil for grading and fill; bagged garden soil is often a compost blend for beds. Calculate yards as area × depth ÷ 27, read ingredients, and use potting mix in containers instead of heavy topsoil.',
    relatedToolSlugs: [
      'topsoil-calculator',
      'mulch-calculator',
      'raised-bed-soil-calculator',
    ],
    relatedGuideSlugs: [
      'raised-bed-soil-mix-4x8',
      'mulch-depth-guide',
      'grass-seed-per-sq-ft',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'how-much-concrete-in-a-sonotube',
    title: 'How Much Concrete in a Sonotube? Size Chart',
    description:
      'How much concrete in a Sonotube by diameter and height. Size chart for bags and yards, plus links to the free Sonotube calculator.',
    h1: 'How Much Concrete in a Sonotube? Size Chart',
    primaryKeyword: 'how much concrete in a sonotube',
    secondaryKeywords: [
      'sonotube bags of concrete',
      'concrete for 12 inch sonotube',
      'concrete calculator for tubes',
    ],
    answerFirst:
      'A 12-inch Sonotube that is 4 feet tall holds about 3.14 cubic feet of concrete. That is roughly 5.2 of the 80 lb bags before you round up, so plan on 6 bags, or about 7 of the 60 lb bags. Multiply by pier count, then add a little for spillage.',
    relatedToolSlugs: [
      'sonotube-concrete-calculator',
      'deck-footing-calculator',
      'concrete-footing-calculator',
      'concrete-calculator-post-holes',
      'concrete-calculator',
      'deck-material-calculator',
    ],
    relatedGuideSlugs: [
      'sonotube-footing-and-depth',
      'how-many-bags-of-concrete',
      'how-much-concrete-for-fence-posts',
      'deck-material-list-16x24',
    ],
    datePublished: '2026-11-13',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'how-to-estimate-roofing-shingles',
    title: 'Estimate Roofing Shingles: Squares & Bundles',
    description:
      'Estimate roofing shingles in squares and bundles from plan area and pitch. Waste for hips and valleys, with a free shingle calculator link.',
    h1: 'Estimate Roofing Shingles: Squares & Bundles',
    primaryKeyword: 'how to estimate roofing shingles',
    secondaryKeywords: [
      'how to figure shingles for a roof',
      'roofing squares vs square feet',
      'how many bundles per square',
    ],
    answerFirst:
      'One roofing square covers 100 square feet of roof surface. Multiply plan length × width by the pitch area factor, divide by 100 for squares, then add about 10–15% waste. Most common asphalt products use about 3 bundles per square; specialty products can need 4–5.',
    relatedToolSlugs: ['roofing-shingles-calculator', 'roof-pitch-calculator'],
    relatedGuideSlugs: ['how-to-measure-roof-pitch'],
    datePublished: '2026-11-13',
    dateModified: '2026-11-19',
  }),
  g({
    slug: 'concrete-slab-thickness',
    title: 'How Thick Should a Concrete Slab Be?',
    description:
      'How thick should a concrete slab be for a patio, driveway, or shed? Compare 4, 5, and 6 inch options and see how thickness changes yards and bags.',
    h1: 'How Thick Should a Concrete Slab Be?',
    primaryKeyword: 'concrete slab thickness',
    secondaryKeywords: [
      'what is the standard thickness for a concrete slab',
      'how thick should a concrete slab be',
      'does a 4 inch concrete slab need rebar',
      'how many yards of concrete for a 30x40 slab',
    ],
    answerFirst:
      'IRMCA recommends a 4-inch minimum for residential exterior flatwork and 5 inches where delivery vehicles or heavy loads are expected. QUIKRETE lists sidewalks and patios at least 4 inches thick. A 12×12 slab at 4 inches is about 1.78 cu yd before waste; run the calculator for bags.',
    relatedToolSlugs: [
      'concrete-calculator',
      'concrete-slab-cost-calculator',
      'concrete-footing-calculator',
      'rebar-calculator',
      'gravel-calculator',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-do-i-need',
      'concrete-for-10x10-slab',
      'how-many-bags-of-concrete',
    ],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'how-much-concrete-do-i-need',
    title: 'How Much Concrete? Slab, Footing & Post Math',
    description:
      'How much concrete do you need for slabs, footings, and posts? Formulas, waste tips, and links to free YardTally calculators for each shape.',
    h1: 'How Much Concrete? Slab, Footing & Post Math',
    primaryKeyword: 'how much concrete do I need',
    secondaryKeywords: [
      'how much will 1 yard of concrete cover',
      'how much does 3 yards of concrete cover',
      'concrete coverage per cubic yard',
      'bags vs ready mix concrete',
    ],
    answerFirst:
      'One cubic yard of concrete covers about 81 sq ft at 4 inches thick, or about 54 sq ft at 6 inches. Three yards cover about 243 sq ft at 4 inches. Past roughly one yard, ready-mix usually beats bagging by hand. Convert yards to bags with the bags guide and QUIKRETE 1101 yields when you stay on bags.',
    relatedToolSlugs: [
      'concrete-calculator',
      'concrete-slab-cost-calculator',
      'concrete-footing-calculator',
      'concrete-calculator-post-holes',
      'sonotube-concrete-calculator',
    ],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'concrete-slab-thickness',
      'concrete-for-10x10-slab',
      'sonotube-footing-and-depth',
    ],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'sonotube-footing-and-depth',
    title: 'Sonotube Footing Size & Depth: Frost Rules',
    description:
      'Sonotube footing size and depth with frost-line rules of thumb. Diameter and embedment planning plus a free Sonotube concrete calculator.',
    h1: 'Sonotube Footing Size & Depth: Frost Rules',
    primaryKeyword: 'sonotube footing',
    secondaryKeywords: [
      'do I need a footing under a Sonotube',
      'how deep should a Sonotube be',
      'do I need rebar in a Sonotube',
      'how many bags of concrete for a 4 foot sonotube',
    ],
    answerFirst:
      'A Sonotube is a cardboard form. The concrete pier poured inside it is the footing for many deck posts, so you do not always pour a separate pad underneath—local code and soil still decide diameter and depth. QUIKRETE says footings typically must extend below frost. A 12-inch × 4 ft tube needs about six 80 lb bags after 5% waste.',
    relatedToolSlugs: [
      'sonotube-concrete-calculator',
      'deck-footing-calculator',
      'concrete-footing-calculator',
      'concrete-calculator-post-holes',
      'deck-material-calculator',
      'rebar-calculator',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-in-a-sonotube',
      'how-much-concrete-do-i-need',
      'how-much-concrete-for-fence-posts',
      'deck-material-list-12x16',
    ],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
  }),
  g({
    slug: 'lumber-weight-chart',
    title: 'Lumber Weight Chart: 2×4 per Foot',
    description:
      'Softwood lumber weight chart for 2×4–4×4: lb per foot and per 8 ft for SPF, Douglas fir, and southern pine from USDA Wood Handbook density.',
    h1: 'Lumber Weight Chart (2×4, 2×6, 2×8, 4×4)',
    primaryKeyword: 'lumber weight chart',
    secondaryKeywords: [
      '2x4 weight',
      '2x4 weight per foot',
      'how much does a 2x4x8 weigh',
      'lumber weight per foot',
      'pressure treated lumber weight',
    ],
    answerFirst:
      'A kiln-dried SPF 2×4 weighs about 1.05 lb per linear foot—roughly 8.4 lb for an 8 ft stick—using the dressed 1½×3½ in section and USDA Wood Handbook density (~28.7 lb/cu ft). Douglas fir-larch KD is closer to 9.8 lb; wet treated southern pine can hit ~15 lb. Treat these as planning estimates.',
    relatedToolSlugs: [
      'lumber-calculator',
      'deck-material-calculator',
      'fence-calculator',
    ],
    relatedGuideSlugs: [
      'deck-material-list-12x16',
      'deck-material-list-16x24',
    ],
    datePublished: '2026-11-22',
    dateModified: '2026-11-25',
  }),
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

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
    title: 'How Much Concrete for Fence Posts? Chart',
    description:
      'Learn how much concrete each fence post needs by hole diameter and depth, with bag charts, worked examples, and links to free calculators.',
    h1: 'How Much Concrete for Fence Posts?',
    primaryKeyword: 'how much concrete for fence posts',
    secondaryKeywords: ['concrete per fence post', 'bags of concrete for fence posts'],
    answerFirst:
      'Most residential fence posts need about one to three 60–80 lb bags of concrete each, depending on hole diameter and depth. An 8-inch-wide, 2-foot-deep hole holds roughly 0.70 cubic feet—about two bags of standard mix after waste. Multiply by your post count, and dig below the local frost line.',
    relatedToolSlugs: [
      'concrete-calculator-post-holes',
      'fence-calculator',
      'concrete-calculator',
    ],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'concrete-for-10x10-slab',
      'how-much-concrete-in-a-sonotube',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'mulch-depth-guide',
    title: 'Mulch Depth for Gardens: How Deep?',
    description:
      'How deep mulch should be in flower beds and gardens: about 2–3 inches organic, with MSU, UF/IFAS, and Clemson guidance plus a free mulch calculator.',
    h1: 'Mulch Depth for Gardens',
    primaryKeyword: 'mulch depth',
    secondaryKeywords: [
      'how deep should mulch be',
      'mulch depth for gardens',
      'mulch depth for flower beds',
    ],
    answerFirst:
      'Most flower beds and garden plantings do well with about 2–3 inches of organic mulch. Mississippi State Extension says pull mulch 2–3 inches back from trunks. UF/IFAS Florida-Friendly guidance targets about 3 inches and warns against deeper beds. Clemson lists 2–3 inches for many wood and bark mulches. Measure existing depth before you order.',
    relatedToolSlugs: ['mulch-calculator', 'mulch-calculator-tree-rings'],
    relatedGuideSlugs: [
      'mulch-for-common-garden-beds',
      'topsoil-vs-garden-soil',
      'raised-bed-soil-mix-4x8',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'how-many-bags-of-concrete',
    title: 'How Many Bags of Concrete Do I Need?',
    description:
      'Convert cubic feet and yards to 40, 60, and 80 lb concrete bags with yield tables, waste tips, and free calculators.',
    h1: 'How Many Bags of Concrete Do I Need?',
    primaryKeyword: 'how many bags of concrete do I need',
    secondaryKeywords: ['80 lb bags of concrete per yard', 'concrete bag calculator'],
    answerFirst:
      'An 80 lb bag yields about 0.60 cu ft; you need roughly 45 bags per cubic yard before waste. Divide your project volume in cubic feet by the bag yield (about 0.30 / 0.45 / 0.60 for 40 / 60 / 80 lb), then round up. For pours larger than about one yard, ready-mix is usually more practical.',
    relatedToolSlugs: [
      'concrete-calculator',
      'concrete-calculator-post-holes',
      'sonotube-concrete-calculator',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-for-fence-posts',
      'concrete-for-10x10-slab',
      'how-much-concrete-in-a-sonotube',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'concrete-for-10x10-slab',
    title: 'How Much Concrete for a 10×10 Slab?',
    description:
      'Concrete yards and bag counts for a 10×10 slab at 4 and 6 inches, plus other common patio sizes, waste tips, and a free calculator link.',
    h1: 'How Much Concrete for a 10×10 Slab?',
    primaryKeyword: 'how much concrete for a 10x10 slab',
    secondaryKeywords: ['10x10 concrete slab bags', 'concrete for patio slab'],
    answerFirst:
      'A 10×10 ft slab at 4 inches needs about 1.23 cubic yards (33.3 cu ft) before waste—roughly 62 bags of 80 lb mix or 82 bags of 60 lb mix after 10% waste. At 6 inches the same footprint is about 1.85 cu yd. Use these figures as planning estimates and confirm bag yields on the label.',
    relatedToolSlugs: ['concrete-calculator', 'rebar-calculator', 'gravel-calculator'],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'how-much-concrete-for-fence-posts',
      'how-much-concrete-in-a-sonotube',
    ],
    datePublished: '2026-10-20',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'mulch-for-common-garden-beds',
    title: 'Mulch for Common Garden Bed Sizes (Chart)',
    description:
      'Cubic yards and bag counts for common garden bed sizes at 2 and 3 inch mulch depth, with a free mulch calculator for custom beds.',
    h1: 'Mulch for Common Garden Bed Sizes',
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
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'gravel-types-for-driveways',
    title: 'Gravel Types for Driveways: Base vs Surface',
    description:
      'Compare crushed stone, dense grade, pea gravel, and clean rock for driveway layers, plus how to estimate tons with a gravel calculator.',
    h1: 'Gravel Types for Driveways',
    primaryKeyword: 'gravel types for driveways',
    secondaryKeywords: [
      'best gravel for driveway',
      'what is dense grade gravel',
      'crushed stone vs pea gravel',
    ],
    answerFirst:
      'Driveways usually need a compacted angular crushed-stone base (dense grade / crusher run) plus a stable surface course. Pea gravel rolls under tires and is a poor sole driving surface. Estimate length × width × depth, then ask your quarry for compacted density when converting yards to tons. Treat depth and tons-per-yard figures as planning assumptions.',
    relatedToolSlugs: ['gravel-calculator', 'asphalt-calculator', 'sand-calculator', 'paver-calculator'],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'retaining-wall-blocks-and-base',
    ],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'how-to-measure-roof-pitch',
    title: 'How to Measure Roof Pitch (Safe Methods)',
    description:
      'Measure roof pitch as X-in-12 using a level and tape, from the attic, or from rafter geometry. Includes angle conversion and calculators.',
    h1: 'How to Measure Roof Pitch',
    primaryKeyword: 'how to measure roof pitch',
    secondaryKeywords: ['measure roof slope', 'roof pitch from ground'],
    answerFirst:
      'Roof pitch is inches of rise per 12 inches of run. Place a level horizontally against a rafter or roof surface, mark 12 inches along the level, then measure vertical rise at that mark. A 6-inch rise is a 6/12 pitch (~26.6°). Prefer attic or rake measurements when climbing is unsafe.',
    relatedToolSlugs: ['roof-pitch-calculator', 'roofing-shingles-calculator'],
    relatedGuideSlugs: ['how-to-estimate-roofing-shingles', 'deck-material-list-12x16'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'grass-seed-per-sq-ft',
    title: 'Grass Seed per 1,000 Sq Ft (lb Rates)',
    description:
      'Convert grass seed bag rates in lb per 1,000 sq ft into total pounds for new lawns and overseeding, with worked examples and calculator links.',
    h1: 'How Much Grass Seed per 1,000 Square Feet?',
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
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'fertilizer-nitrogen-per-1000-sq-ft',
    title: 'How Much Nitrogen per 1,000 Sq Ft? (Lawn Chart)',
    description:
      'Calculate lawn fertilizer product pounds from a nitrogen target and N-P-K analysis, with examples per 1,000 square feet and label safety tips.',
    h1: 'Fertilizer Nitrogen per 1,000 Square Feet',
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
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'raised-bed-soil-mix-4x8',
    title: '4×8 Raised Bed Soil Mix & Depth',
    description:
      'Soil volume for a 4×8 raised bed by depth, plus Iowa Extension mix options, settling tips, and links to free soil calculators.',
    h1: 'Raised Bed Soil Mix for a 4×8 Bed',
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
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'how-much-paint-for-a-room',
    title: 'How Much Paint for a Room?',
    description:
      'Estimate interior paint gallons from wall area, openings, coats, and Behr coverage (250–400 sq ft/gal), with 12×12 and small bathroom examples.',
    h1: 'How Much Paint Do I Need for a Room?',
    primaryKeyword: 'how much paint for a room',
    secondaryKeywords: [
      'how many square feet does a gallon of paint cover',
      'paint gallons for a room',
      'how much paint for small bathroom',
      'how much paint for a 12x12 room',
    ],
    answerFirst:
      'BEHR says one gallon of BEHR ULTRA or PREMIUM PLUS interior paint and primer covers about 250–400 sq ft per coat. YardTally’s paint calculator defaults to 350, in that range. Gallons equal paintable wall area times coats divided by coverage; confirm the can for your room.',
    relatedToolSlugs: ['paint-calculator'],
    relatedGuideSlugs: ['deck-material-list-12x16'],
    datePublished: '2026-10-23',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'paver-base-gravel-and-sand-depth',
    title: 'Paver Base Gravel & Sand Depth',
    description:
      'YardTally planning depths for paver base gravel and bedding sand, with patio volume examples and links to paver, sand, and gravel calculators.',
    h1: 'Paver Base Gravel and Sand Depth',
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
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'deck-material-list-12x16',
    title: '12×16 Deck Material List (Boards, Joists)',
    description:
      '12×16 deck material takeoff (not construction plans): board and joist counts with YardTally defaults, plus links to deck and footing calculators.',
    h1: 'Deck Material List for a 12×16 Deck',
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
      'how-to-measure-roof-pitch',
      'how-much-concrete-for-fence-posts',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'deck-material-list-16x24',
    title: '16×24 Deck Material List (Lumber & Footings)',
    description:
      '16×24 deck material takeoff: boards, joists, and footing pointers with YardTally defaults, plus links to the deck and Sonotube calculators.',
    h1: 'Deck Material List for a 16×24 Deck',
    primaryKeyword: '16x24 deck material list',
    secondaryKeywords: [
      '16x24 deck boards',
      'how many joists for 16x24 deck',
      '16 by 24 deck lumber list',
      'is 16x24 deck list same as 12x16 scaled',
    ],
    answerFirst:
      'A 16×24 list is not the 12×16 list scaled by area. With YardTally defaults and boards along 24 ft across a 16 ft width, plan about 70 twelve-foot boards and 19 field joists before waste, then size beams, posts, and footings separately from span tables.',
    relatedToolSlugs: ['deck-material-calculator', 'sonotube-concrete-calculator'],
    relatedGuideSlugs: [
      'deck-material-list-12x16',
      'how-many-bags-of-concrete',
      'how-much-concrete-for-fence-posts',
    ],
    datePublished: '2026-11-13',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'retaining-wall-blocks-and-base',
    title: 'Retaining Wall Blocks & Base',
    description:
      'Estimate retaining wall blocks by courses, plan gravel wall base (not patio paver depths), and know when manufacturer charts need an engineer.',
    h1: 'Retaining Wall Blocks and Base',
    primaryKeyword: 'retaining wall blocks and base',
    secondaryKeywords: [
      'how many retaining wall blocks',
      'retaining wall gravel base',
      'can I use paver base under a retaining wall',
      'typical retaining wall block dimensions',
    ],
    answerFirst:
      'A 20 ft wall that is 3 ft exposed with 18×6 in face blocks needs about 84 face blocks before waste (six courses × 14), plus a compacted gravel trench. YardTally’s 24×6 in trench is a planning default. “Paver base” under a wall means wall base, not patio depths; taller walls need engineering.',
    relatedToolSlugs: ['retaining-wall-calculator', 'brick-calculator', 'gravel-calculator'],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'gravel-types-for-driveways',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'topsoil-vs-garden-soil',
    title: 'Topsoil vs Garden Soil: Differences, Uses & Cost',
    description:
      'Compare topsoil and garden soil, calculate cubic yards from area and depth, and see when potting mix beats mineral topsoil in containers.',
    h1: 'Topsoil vs Garden Soil',
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
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'how-much-concrete-in-a-sonotube',
    title: 'How Much Concrete in a Sonotube?',
    description:
      'Figure how much concrete fills an 8–18 inch Sonotube at common heights, with 60 and 80 lb bag charts, πr²h math, and a free tube calculator.',
    h1: 'How Much Concrete in a Sonotube?',
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
      'concrete-calculator',
      'deck-material-calculator',
    ],
    relatedGuideSlugs: ['how-many-bags-of-concrete', 'deck-material-list-16x24'],
    datePublished: '2026-11-13',
    dateModified: '2026-11-13',
  }),
  g({
    slug: 'how-to-estimate-roofing-shingles',
    title: 'How to Estimate Roofing Shingles',
    description:
      'Estimate roofing shingles from plan area, pitch factor, and waste. Convert squares to bundles with IKO and GAF coverage figures plus a free calculator.',
    h1: 'How to Estimate Roofing Shingles',
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
    dateModified: '2026-11-13',
  }),
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

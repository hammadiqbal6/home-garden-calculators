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
      'Most residential fence posts need about one to three 60–80 lb bags of concrete each, depending on hole diameter and depth. An 8-inch-wide, 2-foot-deep hole holds roughly 0.70 cubic feet—often one to two bags after waste. Multiply by your post count, and dig below the local frost line.',
    relatedToolSlugs: [
      'concrete-calculator-post-holes',
      'fence-calculator',
      'concrete-calculator',
    ],
    relatedGuideSlugs: ['how-many-bags-of-concrete', 'concrete-for-10x10-slab'],
    datePublished: '2026-10-19',
  }),
  g({
    slug: 'mulch-depth-guide',
    title: 'Mulch Depth Guide: How Deep Should Mulch Be?',
    description:
      'Recommended mulch depths for beds, trees, and paths, with volume tips and links to free mulch calculators. Based on extension guidance.',
    h1: 'Mulch Depth Guide',
    primaryKeyword: 'mulch depth',
    secondaryKeywords: ['how deep should mulch be', 'mulch depth for trees'],
    answerFirst:
      'Most flower and shrub beds do well with about 2–3 inches of organic mulch. Tree rings use a similar depth in a wide donut, kept off the trunk flare. Thicker layers can block water and oxygen; thinner layers break down quickly and suppress weeds poorly.',
    relatedToolSlugs: ['mulch-calculator', 'mulch-calculator-tree-rings'],
    relatedGuideSlugs: [
      'mulch-for-common-garden-beds',
      'topsoil-vs-garden-soil',
      'raised-bed-soil-mix-4x8',
    ],
    datePublished: '2026-10-19',
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
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts', 'concrete-for-10x10-slab'],
    datePublished: '2026-10-19',
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
      'A 10×10 ft slab at 4 inches needs about 1.23 cubic yards (33.3 cu ft) before waste—roughly 46 bags of 80 lb mix or 62 bags of 60 lb mix after 10% waste. At 6 inches the same footprint is about 1.85 cu yd. Use these figures as planning estimates and confirm bag yields on the label.',
    relatedToolSlugs: ['concrete-calculator', 'gravel-calculator'],
    relatedGuideSlugs: ['how-many-bags-of-concrete', 'how-much-concrete-for-fence-posts'],
    datePublished: '2026-10-20',
  }),
  g({
    slug: 'mulch-for-common-garden-beds',
    title: 'Mulch for Common Garden Bed Sizes (Chart)',
    description:
      'Cubic yards and bag counts for common garden bed sizes at 2 and 3 inch mulch depth, with a free mulch calculator for custom beds.',
    h1: 'Mulch for Common Garden Bed Sizes',
    primaryKeyword: 'mulch for garden bed sizes',
    secondaryKeywords: ['how much mulch for flower bed', 'mulch bags for garden bed'],
    answerFirst:
      'At 3 inches deep, a 4×8 ft bed needs about 8 cu ft of mulch (four 2 cu ft bags). A 10×4 bed needs about 10 cu ft; a 20×5 bed needs about 25 cu ft (≈0.93 cu yd). Use 2 inches for lighter top-ups and keep mulch off tree trunks.',
    relatedToolSlugs: ['mulch-calculator', 'mulch-calculator-tree-rings'],
    relatedGuideSlugs: ['mulch-depth-guide', 'topsoil-vs-garden-soil'],
    datePublished: '2026-10-20',
  }),
  g({
    slug: 'gravel-types-for-driveways',
    title: 'Gravel Types for Driveways: Base vs Surface',
    description:
      'Compare crushed stone, dense grade, pea gravel, and clean rock for driveway layers, plus how to estimate tons with a gravel calculator.',
    h1: 'Gravel Types for Driveways',
    primaryKeyword: 'gravel types for driveways',
    secondaryKeywords: ['driveway gravel depth', 'crushed stone vs pea gravel'],
    answerFirst:
      'Driveways usually need a compacted angular crushed-stone base (often called dense grade or crusher run) topped with a stable surface aggregate. Rounded pea gravel looks tidy but can roll under tires. Depth depends on soil and traffic—many DIY drives use several inches of compacted base plus a surface course.',
    relatedToolSlugs: ['gravel-calculator', 'sand-calculator', 'paver-calculator'],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'retaining-wall-blocks-and-base',
    ],
    datePublished: '2026-10-19',
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
    relatedGuideSlugs: ['deck-material-list-12x16'],
    datePublished: '2026-10-19',
  }),
  g({
    slug: 'grass-seed-per-sq-ft',
    title: 'Grass Seed per Sq Ft (lb per 1,000)',
    description:
      'Convert grass seed bag rates in lb per 1,000 sq ft into total pounds for new lawns and overseeding, with worked examples and calculator links.',
    h1: 'How Much Grass Seed per Square Foot?',
    primaryKeyword: 'grass seed per square foot',
    secondaryKeywords: ['how much grass seed per sq ft', 'grass seed rate per 1000 sq ft'],
    answerFirst:
      'Grass seed is usually sold by pounds per 1,000 square feet, not a universal ounces-per-square-foot number. Multiply (lawn sq ft ÷ 1000) by the bag rate. New-lawn and overseed rates differ—always use the rate printed for your species mix and job type.',
    relatedToolSlugs: ['grass-seed-calculator', 'topsoil-calculator', 'fertilizer-calculator'],
    relatedGuideSlugs: [
      'fertilizer-nitrogen-per-1000-sq-ft',
      'topsoil-vs-garden-soil',
    ],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'fertilizer-nitrogen-per-1000-sq-ft',
    title: 'Fertilizer N per 1,000 Sq Ft',
    description:
      'Calculate lawn fertilizer product pounds from a nitrogen target and N-P-K analysis, with examples per 1,000 square feet and label safety tips.',
    h1: 'Fertilizer Nitrogen per 1,000 Square Feet',
    primaryKeyword: 'fertilizer nitrogen per 1000 sq ft',
    secondaryKeywords: ['lawn fertilizer rate calculator', 'how much fertilizer per 1000 sq ft'],
    answerFirst:
      'Product fertilizer pounds equal desired pounds of actual nitrogen divided by the nitrogen percent as a decimal. For 1 lb N per 1,000 sq ft with a 30-0-4 bag, you need about 3.3 lb of product per 1,000 sq ft. Never exceed the label; match timing to local extension calendars.',
    relatedToolSlugs: ['fertilizer-calculator', 'grass-seed-calculator'],
    relatedGuideSlugs: ['grass-seed-per-sq-ft', 'topsoil-vs-garden-soil'],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'raised-bed-soil-mix-4x8',
    title: '4×8 Raised Bed Soil Mix & Depth',
    description:
      'Soil volume for a 4×8 raised bed by depth, plus practical mix rules of thumb, settling tips, and links to free soil calculators.',
    h1: 'Raised Bed Soil Mix for a 4×8 Bed',
    primaryKeyword: 'raised bed soil mix 4x8',
    secondaryKeywords: ['how much soil for 4x8 raised bed', 'raised bed soil depth'],
    answerFirst:
      'A 4×8 ft raised bed filled 12 inches deep needs 32 cubic feet of mix (about 1.19 cubic yards). Volume is interior length × width × depth. Mix recipes vary; a common teaching rule of thumb uses roughly equal parts mineral soil, compost, and an aeration component—adjust for crops and climate.',
    relatedToolSlugs: ['raised-bed-soil-calculator', 'topsoil-calculator'],
    relatedGuideSlugs: ['topsoil-vs-garden-soil', 'mulch-depth-guide'],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'how-much-paint-for-a-room',
    title: 'How Much Paint for a Room?',
    description:
      'Estimate interior paint gallons from wall area, openings, coats, and label coverage, with worked room examples and a free paint calculator.',
    h1: 'How Much Paint Do I Need for a Room?',
    primaryKeyword: 'how much paint for a room',
    secondaryKeywords: ['paint gallons for a room', 'how many gallons of paint'],
    answerFirst:
      'Paint gallons equal paintable wall area times coats divided by coverage. Wall area is roughly perimeter × height minus doors and windows. Many interior paints cover about 350–400 square feet per gallon per coat as a rule of thumb—confirm the can and use the paint calculator for your room.',
    relatedToolSlugs: ['paint-calculator'],
    relatedGuideSlugs: ['deck-material-list-12x16'],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'paver-base-gravel-and-sand-depth',
    title: 'Paver Base Gravel & Sand Depth',
    description:
      'Typical gravel base and bedding sand depths for DIY paver patios, with volume worked examples and links to paver, sand, and gravel calculators.',
    h1: 'Paver Base Gravel and Sand Depth',
    primaryKeyword: 'paver base gravel and sand depth',
    secondaryKeywords: ['paver base thickness', 'bedding sand depth for pavers'],
    answerFirst:
      'Many DIY patio guides use a rule of thumb of about 4–6 inches of compacted gravel base plus about 1 inch of bedding sand under concrete pavers. Driveways need heavier sections. Follow the paver manufacturer and local codes when they specify different depths.',
    relatedToolSlugs: ['paver-calculator', 'sand-calculator', 'gravel-calculator'],
    relatedGuideSlugs: [
      'gravel-types-for-driveways',
      'retaining-wall-blocks-and-base',
    ],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'deck-material-list-12x16',
    title: '12×16 Deck Material List',
    description:
      'Planning takeoff for a 12×16 ft deck: footprint, board and joist counting ideas, waste rules of thumb, and links to deck and footing calculators.',
    h1: 'Deck Material List for a 12×16 Deck',
    primaryKeyword: 'deck material list 12x16',
    secondaryKeywords: ['12x16 deck boards', 'how many joists for 12x16 deck'],
    answerFirst:
      'A 12×16 ft deck covers 192 square feet of footprint. Board count depends on face width and orientation; joists are commonly 16 inches on center for many lumber decks—verify span tables and the decking brand. Use the deck calculator for boards and joists, then size footings separately.',
    relatedToolSlugs: ['deck-material-calculator', 'sonotube-concrete-calculator'],
    relatedGuideSlugs: [
      'how-to-measure-roof-pitch',
      'how-much-concrete-for-fence-posts',
    ],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'retaining-wall-blocks-and-base',
    title: 'Retaining Wall Blocks & Base',
    description:
      'Estimate segmental retaining wall blocks by length and courses, plan gravel base volume, and know when manufacturer charts require engineering.',
    h1: 'Retaining Wall Blocks and Base',
    primaryKeyword: 'retaining wall blocks and base',
    secondaryKeywords: ['how many retaining wall blocks', 'retaining wall gravel base'],
    answerFirst:
      'Block count is roughly wall length divided by block length times the number of courses, plus waste and corners. Small segmental walls usually sit on compacted gravel in a trench; taller walls need engineering and may require geogrid. Follow the block manufacturer’s height chart.',
    relatedToolSlugs: ['retaining-wall-calculator', 'gravel-calculator'],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'gravel-types-for-driveways',
    ],
    datePublished: '2026-10-23',
  }),
  g({
    slug: 'topsoil-vs-garden-soil',
    title: 'Topsoil vs Garden Soil (Cubic Yards)',
    description:
      'Understand topsoil versus bagged garden or raised-bed mixes, calculate cubic yards from area and depth, and choose bulk vs bags for the job.',
    h1: 'Topsoil vs Garden Soil',
    primaryKeyword: 'topsoil vs garden soil',
    secondaryKeywords: ['garden soil vs topsoil', 'how many yards of topsoil'],
    answerFirst:
      'Topsoil usually means mineral soil for grading and fill, while bagged garden or raised-bed mixes often include compost and amendments. Calculate volume as area × depth (yards = cubic feet ÷ 27). Read ingredients—labels are not identical everywhere—and match the product to fill jobs versus planting mixes.',
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
  }),
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

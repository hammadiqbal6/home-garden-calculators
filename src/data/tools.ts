/**
 * Registry of every calculator page: SEO, keywords, related links, and content.
 * One primary keyword per page — see docs/KEYWORD-MAP.md.
 */
import { siteConfig } from '../config/site';
import { toolBodies } from './toolBodies';

export type ToolCategory = 'concrete' | 'landscape' | 'outdoor' | 'lawn';

export interface ToolSource {
  label: string;
  href: string;
  /** Plain-language note: which numbers or rules this source supports */
  usedFor?: string;
  /** ISO date this URL was last checked (change only when re-verified) */
  checked?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  /** Primary target keyword (unique intent) */
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  h1: string;
  /** 40–60 word answer-first intro for snippets / AI Overviews */
  answerFirst: string;
  summary: string;
  calculatorId: string;
  relatedSlugs: string[];
  relatedGuideSlugs: string[];
  faq: FaqItem[];
  sources: ToolSource[];
  /** Long-form HTML sections after the tool (formula, examples, tips) */
  sectionsHtml: string;
  datePublished: string;
  dateModified: string;
  applicationCategory: string;
  embeddable?: boolean;
}

const UPDATED = siteConfig.contentUpdated;

export const categories: Record<
  ToolCategory,
  {
    slug: string;
    name: string;
    title: string;
    description: string;
    primaryKeyword: string;
    /** 150–300 words of unique hub intro HTML */
    introHtml: string;
  }
> = {
  concrete: {
    slug: 'concrete',
    name: 'Concrete calculators',
    title: 'Concrete Calculators: Slabs, Post Holes, Sonotubes',
    description:
      'Free concrete calculators for slabs, footings, fence post holes, Sonotubes and steps. Get cubic yards and bag counts, plus guides on mixing and waste allowance.',
    primaryKeyword: 'concrete calculator hub',
    introHtml: `
      <p>Pick the calculator that matches your pour shape. The <a href="/calculators/concrete-calculator/">slab and footing calculator</a> converts length × width × thickness into cubic yards and 40/60/80&nbsp;lb bags—use it for patios, pads, and rectangular footings. The <a href="/calculators/concrete-calculator-post-holes/">post hole calculator</a> is for cylindrical fence or sign holes (diameter × depth × count). The <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a> covers cardboard column forms for deck piers and posts.</p>
      <p>Start with dimensions in feet (or meters), add about 10% waste for DIY bag mixes, and confirm bag yields on the label. For step-by-step bag charts see <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete do I need</a> and <a href="/guides/how-much-concrete-for-fence-posts/">how much concrete for fence posts</a>. Always check local frost-line depth and building codes before you dig or pour.</p>
      <p>Common sizes: a 10×10 patio at 4&nbsp;inches is roughly 1.2&nbsp;cu&nbsp;yd before waste; an 8-inch-wide, 2-foot-deep fence hole is often one to two 60–80&nbsp;lb bags. Use the specialized tools rather than forcing post holes or tubes into the slab calculator.</p>
    `,
  },
  landscape: {
    slug: 'landscape',
    name: 'Landscape material calculators',
    title: 'Landscape Calculators: Mulch, Gravel & Soil',
    description:
      'Free landscape calculators for mulch, gravel, topsoil, sand, pavers and raised beds. Enter area and depth for cubic yards, tons and bag counts.',
    primaryKeyword: 'landscape material calculator',
    introHtml: `
      <p>Landscape volume tools share one idea: area × depth, then convert to yards or bags. Use the <a href="/calculators/mulch-calculator/">mulch calculator</a> for rectangular beds and the <a href="/calculators/mulch-calculator-tree-rings/">tree ring calculator</a> for donut volumes that stay off the trunk flare. Depth guidance lives in the <a href="/guides/mulch-depth-guide/">mulch depth guide</a> (typically 2–3&nbsp;inches for beds).</p>
      <p>Order bulk gravel and topsoil with the <a href="/calculators/gravel-calculator/">gravel</a> and <a href="/calculators/topsoil-calculator/">topsoil</a> tools—confirm density with your local yard when converting yards to tons. Paver projects usually need bedding sand plus a compacted base; pair the <a href="/calculators/paver-calculator/">paver calculator</a> with sand and gravel estimates. Raised beds get their own <a href="/calculators/raised-bed-soil-calculator/">soil volume tool</a>.</p>
    `,
  },
  outdoor: {
    slug: 'outdoor-structures',
    name: 'Outdoor structure calculators',
    title: 'Outdoor Calculators: Fence, Deck, Roof & Paint',
    description:
      'Free calculators for fence posts and pickets, deck boards and joists, roof pitch and shingles, paint gallons and retaining wall blocks.',
    primaryKeyword: 'outdoor project calculator',
    introHtml: `
      <p>Plan the structure before you buy materials. The <a href="/calculators/fence-calculator/">fence calculator</a> counts posts, rails and pickets from run length and spacing—then estimate concrete with the <a href="/calculators/concrete-calculator-post-holes/">post hole tool</a>. Deck framing and boards use the <a href="/calculators/deck-material-calculator/">deck material calculator</a>; pier concrete often uses the <a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a>.</p>
      <p>Roof work splits geometry from materials: measure pitch safely with the <a href="/guides/how-to-measure-roof-pitch/">roof pitch guide</a> and <a href="/calculators/roof-pitch-calculator/">pitch calculator</a>, then estimate squares and bundles with the <a href="/calculators/roofing-shingles-calculator/">shingles calculator</a>. Interior or exterior walls use the <a href="/calculators/paint-calculator/">paint calculator</a>. Segmental walls use the <a href="/calculators/retaining-wall-calculator/">retaining wall block calculator</a>—taller walls may need engineering.</p>
    `,
  },
  lawn: {
    slug: 'lawn',
    name: 'Lawn & garden calculators',
    title: 'Lawn Calculators: Grass Seed & Fertilizer Rates',
    description:
      'Free lawn calculators for grass seed (new lawn and overseed) and fertilizer from nitrogen targets and N-P-K analysis. Rates per 1,000 sq ft.',
    primaryKeyword: 'lawn calculator',
    introHtml: `
      <p>Lawn math is usually “pounds per 1,000 square feet.” The <a href="/calculators/grass-seed-calculator/">grass seed calculator</a> multiplies your area by the bag rate for new lawns or overseeding—do not use new-lawn rates when overseeding. The <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a> converts a nitrogen target and the bag’s N-P-K analysis into product pounds.</p>
      <p>Match species and timing to local extension calendars, and calibrate spreaders so you apply the planned rate. Pair thin soil repairs with the <a href="/calculators/topsoil-calculator/">topsoil calculator</a>. These tools are planning aids, not site-specific agronomy advice.</p>
    `,
  },
};

export const tools: ToolDefinition[] = [
  {
    slug: 'concrete-calculator',
    name: 'Concrete Calculator',
    shortName: 'Concrete',
    category: 'concrete',
    primaryKeyword: 'concrete calculator',
    secondaryKeywords: [
      'concrete slab calculator',
      'how many bags of concrete',
      'concrete calculator yards',
    ],
    title: 'Concrete Calculator: Bags & Cubic Yards for Slabs',
    description:
      'Free concrete calculator for slabs, footings and steps. Enter length, width and depth to get cubic yards and 40, 60 or 80 lb bag counts with waste added.',
    h1: 'Concrete Calculator',
    answerFirst:
      'A concrete calculator converts your project dimensions into cubic feet and cubic yards, then into 40, 60, or 80 lb bags. For a slab, multiply length × width × thickness (in feet); divide by 27 for yards. Add about 10% waste. Typical bag yields are 0.30, 0.45, and 0.60 cubic feet.',
    summary: 'Slabs, footings, and solid steps with cubic yards and bag counts.',
    calculatorId: 'concrete',
    relatedSlugs: [
      'concrete-calculator-post-holes',
      'sonotube-concrete-calculator',
      'fence-calculator',
    ],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'concrete-for-10x10-slab',
      'how-much-concrete-for-fence-posts',
    ],
    faq: [
      {
        question: 'How many 80 lb bags of concrete in a yard?',
        answer:
          'One cubic yard is 27 cubic feet. At about 0.60 cu ft per 80 lb bag, you need roughly 45 bags per cubic yard (27 ÷ 0.60), before waste.',
      },
      {
        question: 'Should I order ready-mix or use bags?',
        answer:
          'Bags are practical under about 1 cubic yard. Larger pours are usually cheaper and more consistent with ready-mix delivered by the yard.',
      },
      {
        question: 'How thick should a concrete slab be?',
        answer:
          'Many residential patio and shed slabs use 4 inches. Driveways and heavier loads often need 5–6 inches plus proper base—confirm with local code.',
      },
      {
        question: 'What waste factor should I use?',
        answer:
          'A 5–10% waste factor covers uneven subgrade, spillage, and over-excavation. Use 10% for DIY bag mixes and irregular forms.',
      },
    ],
    sources: [
      {
        label: 'QUIKRETE – Concrete calculator & bag yields',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: '40/60/80 lb bag yield planning figures and coverage checks',
        checked: '2026-10-20',
      },
      {
        label: 'Sakrete – Concrete calculator',
        href: 'https://sakrete.com/resources/calculators/',
        usedFor: 'Cross-check bag coverage estimates for bagged concrete',
        checked: '2026-10-20',
      },
      {
        label: 'American Cement Association (formerly PCA)',
        href: 'https://www.cement.org/',
        usedFor: 'Industry context on cement and concrete materials',
        checked: '2026-10-20',
      },
      {
        label: 'ACI 332.1R-18 preview – Guide to Residential Concrete Construction',
        href: 'https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf',
        usedFor: 'Residential concrete practice overview (preview PDF)',
        checked: '2026-10-20',
      },
    ],
    sectionsHtml: toolBodies['concrete-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'concrete-calculator-post-holes',
    name: 'Concrete Calculator for Post Holes',
    shortName: 'Post holes',
    category: 'concrete',
    primaryKeyword: 'concrete calculator for post holes',
    secondaryKeywords: ['fence post concrete calculator', 'how much concrete per fence post'],
    title: 'Concrete Calculator for Post Holes | YardCalc',
    description:
      'Calculate concrete for fence post holes: enter diameter, depth, and post count for cubic yards and 40/60/80 lb bags. Free post-hole concrete estimator.',
    h1: 'Concrete Calculator for Post Holes',
    answerFirst:
      'Concrete for post holes equals the cylinder volume of each hole times the number of posts: π × (diameter÷2)² × depth. An 8-inch-wide, 2-foot-deep hole is about 0.70 cu ft—often one 60 or 80 lb bag after waste. Multiply by your post count and add 10% for over-dig.',
    summary: 'Fence and sign post hole concrete by diameter, depth, and count.',
    calculatorId: 'post-holes',
    relatedSlugs: ['concrete-calculator', 'sonotube-concrete-calculator', 'fence-calculator'],
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts', 'how-many-bags-of-concrete'],
    faq: [
      {
        question: 'How much concrete for one fence post?',
        answer:
          'For an 8–12 inch diameter hole about one-third the post height deep, many DIYers use one 50–80 lb bag per post. Use this calculator for your exact diameter and depth.',
      },
      {
        question: 'Do I fill the whole hole with concrete?',
        answer:
          'Many residential fences use concrete around the post to near grade, or a gravel base with concrete collar. Follow local frost-line depth and manufacturer guidance.',
      },
      {
        question: 'Should posts be set in gravel or concrete?',
        answer:
          'Both methods are used. Concrete holds posts rigid; gravel can improve drainage in some soils. Check local code and wood-preservative requirements for ground contact.',
      },
    ],
    sources: [
      {
        label: 'QUIKRETE – Setting a fence post',
        href: 'https://www.quikrete.com/athome/project-setting-a-fence-post.asp',
        usedFor: 'Practical post-setting steps and bagged concrete context',
        checked: '2026-10-20',
      },
      {
        label: 'QUIKRETE – Concrete calculator',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: 'Bag yield cross-check for cylinder volumes',
        checked: '2026-10-20',
      },
      {
        label: 'Clemson HGIC – Home & Garden Information Center',
        href: 'https://hgic.clemson.edu/',
        usedFor: 'Landscape and fencing extension resources',
        checked: '2026-10-20',
      },
    ],
    sectionsHtml: toolBodies['concrete-calculator-post-holes'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'sonotube-concrete-calculator',
    name: 'Sonotube Concrete Calculator',
    shortName: 'Sonotube',
    category: 'concrete',
    primaryKeyword: 'sonotube concrete calculator',
    secondaryKeywords: ['cardboard concrete form calculator', 'column concrete calculator'],
    title: 'Sonotube Concrete Calculator – Columns & Piers | YardCalc',
    description:
      'Sonotube concrete calculator for round columns and deck piers. Enter tube diameter and height for cubic yards and bag counts.',
    h1: 'Sonotube Concrete Calculator',
    answerFirst:
      'Sonotube (round cardboard form) volume is π × (inside diameter ÷ 2)² × height. A 12-inch tube 4 feet tall holds about 3.14 cu ft (~0.12 cu yd), roughly six 60 lb bags before waste. Multiply by the number of piers and add 5% for spillage.',
    summary: 'Round column and pier forms by diameter and height.',
    calculatorId: 'sonotube',
    relatedSlugs: ['concrete-calculator', 'concrete-calculator-post-holes', 'deck-material-calculator'],
    relatedGuideSlugs: ['how-many-bags-of-concrete'],
    faq: [
      {
        question: 'Is Sonotube diameter inside or outside?',
        answer:
          'Use the inside diameter (the clear form size) for concrete volume. Manufacturers label common sizes such as 8", 10", and 12".',
      },
      {
        question: 'How much concrete for a 12-inch Sonotube?',
        answer:
          'Per foot of height, a 12" tube needs about 0.785 cu ft. A 4 ft pier is ~3.14 cu ft—about five to six 80 lb bags with a little waste.',
      },
    ],
    sources: [
      {
        label: 'Sonotube concrete forms – product sizing',
        href: 'https://www.sonotube.com/sonotube-concrete-forms',
        usedFor: 'Inside diameter / form sizing for round tubes',
        checked: '2026-10-20',
      },
      {
        label: 'QUIKRETE – Concrete calculator',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: 'Bag counts from calculated cubic feet',
        checked: '2026-10-20',
      },
    ],
    sectionsHtml: toolBodies['sonotube-concrete-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'mulch-calculator',
    name: 'Mulch Calculator',
    shortName: 'Mulch',
    category: 'landscape',
    primaryKeyword: 'mulch calculator',
    secondaryKeywords: ['mulch calculator bags', 'mulch calculator cubic yards', 'how much mulch'],
    title: 'Mulch Calculator: How Much Mulch Do I Need? (Yards/Bags)',
    description:
      'Enter bed length, width and depth to see how many cubic yards or 2 and 3 cu ft bags of mulch you need. Includes recommended mulch depths for beds and trees.',
    h1: 'Mulch Calculator',
    answerFirst:
      'Mulch volume equals area times depth. Convert depth to feet (3 inches = 0.25 ft), then multiply by square feet. Divide cubic feet by 27 for yards, or by 2 or 3 for bag counts. Most beds need 2–3 inches of organic mulch; keep mulch off tree trunks.',
    summary: 'Bed mulch in cubic yards and bag counts.',
    calculatorId: 'mulch',
    relatedSlugs: ['mulch-calculator-tree-rings', 'topsoil-calculator', 'raised-bed-soil-calculator'],
    relatedGuideSlugs: ['mulch-depth-guide', 'mulch-for-common-garden-beds'],
    faq: [
      {
        question: 'How much mulch do I need for 100 sq ft?',
        answer:
          'At 3 inches deep: 100 × 0.25 = 25 cu ft ≈ 0.93 cu yd, or thirteen 2 cu ft bags.',
      },
      {
        question: 'How many bags in a cubic yard of mulch?',
        answer:
          'A cubic yard is 27 cu ft, so about fourteen 2 cu ft bags or nine 3 cu ft bags.',
      },
    ],
    sources: [
      {
        label: 'Iowa State Extension – How to determine amount of mulch needed',
        href: 'https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed',
        usedFor: 'Volume method (area × depth) for garden beds',
        checked: '2026-10-20',
      },
      {
        label: 'UF/IFAS Gardening Solutions – Choosing and installing mulches',
        href: 'https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/',
        usedFor: 'Mulch depth and installation guidance',
        checked: '2026-10-20',
      },
      {
        label: 'Mississippi State Extension – Mulches for the landscape',
        href: 'https://extension.msstate.edu/publications/mulches-for-the-landscape',
        usedFor: 'Landscape mulch practice overview',
        checked: '2026-10-20',
      },
      {
        label: 'Clemson HGIC – Mulch',
        href: 'https://hgic.clemson.edu/factsheet/mulch/',
        usedFor: 'Extension mulch depth and care notes',
        checked: '2026-10-20',
      },
    ],
    sectionsHtml: toolBodies['mulch-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'mulch-calculator-tree-rings',
    name: 'Mulch Calculator for Tree Rings',
    shortName: 'Tree ring mulch',
    category: 'landscape',
    primaryKeyword: 'mulch calculator for tree rings',
    secondaryKeywords: ['tree ring mulch calculator', 'mulch around trees calculator'],
    title: 'Mulch Calculator for Tree Rings – Donut Volume | YardCalc',
    description:
      'Calculate mulch for tree rings: enter outer ring and trunk diameters plus depth for cubic feet, yards, and bags. Avoid volcano mulching.',
    h1: 'Mulch Calculator for Tree Rings',
    answerFirst:
      'Tree-ring mulch volume uses a donut (annulus): π × (R_outer² − R_trunk²) × depth. Leave a small bare gap at the trunk flare—do not pile mulch against bark. A 6 ft wide ring around a 1 ft trunk at 3 inches deep needs about 7 cu ft of mulch.',
    summary: 'Annular mulch rings around trees by outer and trunk diameter.',
    calculatorId: 'tree-ring-mulch',
    relatedSlugs: ['mulch-calculator', 'topsoil-calculator'],
    relatedGuideSlugs: ['mulch-depth-guide'],
    faq: [
      {
        question: 'How wide should a mulch ring be?',
        answer:
          'Wider is generally better for roots—often out toward the dripline when practical. Even a 3–6 ft diameter ring helps retain moisture and reduce mower damage.',
      },
      {
        question: 'What is volcano mulching?',
        answer:
          'Piling mulch against the trunk. It traps moisture on bark and can invite decay and pests. Keep mulch a few inches away from the trunk.',
      },
    ],
    sources: [
      {
        label: 'Penn State Extension – Mulching',
        href: 'https://extension.psu.edu/mulching',
      },
    ],
    sectionsHtml: toolBodies['mulch-calculator-tree-rings'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'gravel-calculator',
    name: 'Gravel Calculator',
    shortName: 'Gravel',
    category: 'landscape',
    primaryKeyword: 'gravel calculator',
    secondaryKeywords: ['crushed stone calculator', 'how much gravel do I need'],
    title: 'Gravel Calculator – Tons & Cubic Yards | YardCalc',
    description:
      'Gravel and crushed stone calculator: length, width, and depth to cubic yards and estimated tons. Useful for driveways, paths, and bases.',
    h1: 'Gravel Calculator',
    answerFirst:
      'Gravel needed equals length × width × depth, converted to cubic yards (÷27). Many crushed-stone products weigh about 1.3–1.4 tons per cubic yard; this tool uses ~2,700 lb/yd³ as a mid estimate. Add ~10% for compaction on driveways and paths.',
    summary: 'Driveway and path gravel in yards and tons.',
    calculatorId: 'gravel',
    relatedSlugs: ['sand-calculator', 'paver-calculator', 'retaining-wall-calculator'],
    relatedGuideSlugs: ['gravel-types-for-driveways'],
    faq: [
      {
        question: 'How deep should driveway gravel be?',
        answer:
          'Many driveways use several inches of compacted base (often 4–8"+ depending on soil and traffic). Follow local practice and stone-yard guidance for your region.',
      },
      {
        question: 'How many tons in a cubic yard of gravel?',
        answer:
          'Roughly 1.2–1.4 tons depending on rock type and moisture. Always confirm density with your supplier.',
      },
    ],
    sources: [
      {
        label: 'USDA NRCS – Aggregate basics (general)',
        href: 'https://www.nrcs.usda.gov/',
      },
    ],
    sectionsHtml: toolBodies['gravel-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'topsoil-calculator',
    name: 'Topsoil Calculator',
    shortName: 'Topsoil',
    category: 'landscape',
    primaryKeyword: 'topsoil calculator',
    secondaryKeywords: ['soil calculator cubic yards', 'how much topsoil'],
    title: 'Topsoil Calculator – Cubic Yards & Bags | YardCalc',
    description:
      'Calculate topsoil for lawns and beds: enter length, width and depth to get cubic yards, cubic meters and bag estimates with waste. Free planning tool.',
    h1: 'Topsoil Calculator',
    answerFirst:
      'Topsoil volume is area × depth. To add 2 inches over 500 sq ft: 500 × (2÷12) = 83.3 cu ft ≈ 3.1 cu yd. Screened topsoil is often sold by the yard; bagged soil is handy for small beds. Include ~10% for settling.',
    summary: 'Lawn and garden topsoil depth to yards.',
    calculatorId: 'topsoil',
    relatedSlugs: ['mulch-calculator', 'raised-bed-soil-calculator', 'sand-calculator'],
    relatedGuideSlugs: ['mulch-depth-guide'],
    faq: [
      {
        question: 'How much topsoil to level a yard?',
        answer:
          'Measure average fill depth across the area. Even 1 inch over 1,000 sq ft is about 3.1 cu yd. Deep low spots should be measured separately.',
      },
    ],
    sources: [
      {
        label: 'University extension soil guidance (general)',
        href: 'https://extension.org/',
      },
    ],
    sectionsHtml: toolBodies['topsoil-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'sand-calculator',
    name: 'Sand Calculator',
    shortName: 'Sand',
    category: 'landscape',
    primaryKeyword: 'sand calculator',
    secondaryKeywords: ['paver sand calculator', 'how much sand do I need'],
    title: 'Sand Calculator – Beds, Pavers & Play | YardCalc',
    description:
      'Sand calculator for paver bedding, leveling, and play areas. Converts dimensions to cubic yards and estimated tons.',
    h1: 'Sand Calculator',
    answerFirst:
      'Sand volume uses the same length × width × depth formula as gravel. Paver bedding sand is often about 1 inch deep; playground sand is deeper. A 10×10 area at 1 inch is 8.3 cu ft (~0.31 cu yd). Add waste for screeding.',
    summary: 'Bedding and fill sand by area and depth.',
    calculatorId: 'sand',
    relatedSlugs: ['paver-calculator', 'gravel-calculator', 'concrete-calculator'],
    relatedGuideSlugs: ['gravel-types-for-driveways'],
    faq: [
      {
        question: 'How much sand under pavers?',
        answer:
          'A common setting bed is about 1 inch of coarse concrete/bedding sand over a compacted gravel base. Confirm with your paver manufacturer.',
      },
    ],
    sources: [
      {
        label: 'ICPI – Segmental pavement basics',
        href: 'https://www.icpi.org/',
      },
    ],
    sectionsHtml: toolBodies['sand-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'paver-calculator',
    name: 'Paver Calculator',
    shortName: 'Pavers',
    category: 'landscape',
    primaryKeyword: 'paver calculator',
    secondaryKeywords: ['patio paver calculator', 'how many pavers do I need'],
    title: 'Paver Calculator – Count, Sand & Base | YardCalc',
    description:
      'Estimate pavers needed plus bedding sand and gravel base. Enter patio size and paver dimensions with a waste percent.',
    h1: 'Paver Calculator',
    answerFirst:
      'Pavers needed ≈ patio area ÷ paver face area, then add 5–10% waste for cuts. A 10×10 patio with 12×12 inch pavers needs 100 pavers, about 110 with 10% waste. Plan ~1" sand bed and several inches of compacted gravel base.',
    summary: 'Patio paver counts with sand and base volumes.',
    calculatorId: 'paver',
    relatedSlugs: ['sand-calculator', 'gravel-calculator', 'retaining-wall-calculator'],
    relatedGuideSlugs: ['gravel-types-for-driveways'],
    faq: [
      {
        question: 'How much waste for paver patterns?',
        answer:
          'Straight stack patterns may need ~5–10%. Diagonal herringbone often needs 10–15% extra for cuts.',
      },
    ],
    sources: [
      {
        label: 'ICPI – Industry guidance',
        href: 'https://www.icpi.org/',
      },
    ],
    sectionsHtml: toolBodies['paver-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'fence-calculator',
    name: 'Fence Calculator',
    shortName: 'Fence',
    category: 'outdoor',
    primaryKeyword: 'fence calculator',
    secondaryKeywords: ['fence post calculator', 'picket fence calculator', 'rails and pickets'],
    title: 'Fence Calculator – Posts, Rails & Pickets | YardCalc',
    description:
      'Fence materials calculator for posts, rails, and pickets from total run length and spacing. Includes concrete bag estimate for posts.',
    h1: 'Fence Calculator',
    answerFirst:
      'Fence posts usually equal the number of sections plus one end post. At 8 ft spacing, a 48 ft run needs 6 sections and 7 posts. Rails are sections × rails per bay (often 2–3). Pickets ≈ total inches of run ÷ (picket width + gap).',
    summary: 'Posts, rails, pickets, and post concrete bags.',
    calculatorId: 'fence',
    relatedSlugs: ['concrete-calculator-post-holes', 'deck-material-calculator', 'paint-calculator'],
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts'],
    faq: [
      {
        question: 'How far apart should fence posts be?',
        answer:
          'Six to eight feet is common for wood privacy fences. Heavier or taller panels may need closer spacing—check panel specs.',
      },
    ],
    sources: [
      {
        label: 'Clemson HGIC – Landscape structures',
        href: 'https://hgic.clemson.edu/',
      },
    ],
    sectionsHtml: toolBodies['fence-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'deck-material-calculator',
    name: 'Deck Material Calculator',
    shortName: 'Deck',
    category: 'outdoor',
    primaryKeyword: 'deck material calculator',
    secondaryKeywords: ['deck board calculator', 'deck joist calculator', 'deck screws calculator'],
    title: 'Deck Material Calculator – Boards, Joists & Screws | YardCalc',
    description:
      'Deck material calculator for decking boards, joists at 16" o.c., rim joists, and screw counts. Free rectangular deck estimator.',
    h1: 'Deck Material Calculator',
    answerFirst:
      'Deck boards needed ≈ deck width ÷ board face width, times boards along the length. Joists are typically spaced 16 inches on center: count = floor(length ÷ spacing) + 1, plus rim joists. Screw counts scale with linear feet of decking—often about two fasteners per foot of board.',
    summary: 'Boards, joists, and screws for a rectangular deck.',
    calculatorId: 'deck',
    relatedSlugs: ['sonotube-concrete-calculator', 'fence-calculator', 'paint-calculator'],
    relatedGuideSlugs: ['how-to-measure-roof-pitch'],
    faq: [
      {
        question: 'What board width should I enter?',
        answer:
          'Use the actual face width including the gap you will leave (for example 5.5" for 6" nominal boards with a small gap).',
      },
      {
        question: 'Is 16" joist spacing always OK?',
        answer:
          '16" o.c. is common for many boards, but composites and some spans require 12" o.c. Follow the decking manufacturer span tables.',
      },
    ],
    sources: [
      {
        label: 'AWC – Deck guide resources',
        href: 'https://www.awc.org/',
      },
    ],
    sectionsHtml: toolBodies['deck-material-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'roof-pitch-calculator',
    name: 'Roof Pitch Calculator',
    shortName: 'Roof pitch',
    category: 'outdoor',
    primaryKeyword: 'roof pitch calculator',
    secondaryKeywords: ['roof slope calculator', 'roof angle calculator', 'pitch to degrees'],
    title: 'Roof Pitch Calculator – Slope, Angle & Factor | YardCalc',
    description:
      'Roof pitch calculator converts rise and run to X-in-12 pitch, degrees, percent slope, and roof area factor. Free, mobile-friendly.',
    h1: 'Roof Pitch Calculator',
    answerFirst:
      'Roof pitch is rise over run, usually stated as inches of rise per 12 inches of run (for example 6/12). Angle = arctan(rise÷run). The area factor √(1+(rise/run)²) converts horizontal plan area to actual roof surface area for material estimates.',
    summary: 'Pitch, degrees, percent slope, and area multiplier.',
    calculatorId: 'roof-pitch',
    relatedSlugs: ['roofing-shingles-calculator', 'deck-material-calculator'],
    relatedGuideSlugs: ['how-to-measure-roof-pitch'],
    faq: [
      {
        question: 'What is a 6/12 roof pitch?',
        answer:
          'The roof rises 6 inches for every 12 inches of horizontal run—about 26.6°, a common residential slope.',
      },
      {
        question: 'How do I measure pitch safely?',
        answer:
          'Measure on a rafter, rake board, or level+tape on the roof surface using safe access. See our measurement guide before climbing.',
      },
    ],
    sources: [
      {
        label: 'FEMA / general roof slope terminology',
        href: 'https://www.fema.gov/',
      },
    ],
    sectionsHtml: toolBodies['roof-pitch-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'roofing-shingles-calculator',
    name: 'Roofing Shingles Calculator',
    shortName: 'Shingles',
    category: 'outdoor',
    primaryKeyword: 'roofing calculator',
    secondaryKeywords: ['shingle calculator', 'roofing squares calculator', 'how many squares of shingles'],
    title: 'Roofing Shingles Calculator – Squares & Bundles | YardCalc',
    description:
      'Calculate roofing squares and shingle bundles from plan dimensions and pitch. Includes waste factor for hips, valleys, and starter.',
    h1: 'Roofing Shingles & Squares Calculator',
    answerFirst:
      'One roofing square covers 100 square feet of roof surface. Multiply plan length × width by the pitch area factor, divide by 100 for squares, then add 10–15% waste. Most asphalt bundles cover about ⅓ square (3 bundles per square).',
    summary: 'Squares and bundles from plan area and pitch.',
    calculatorId: 'roofing',
    relatedSlugs: ['roof-pitch-calculator', 'paint-calculator'],
    relatedGuideSlugs: ['how-to-measure-roof-pitch'],
    faq: [
      {
        question: 'How many bundles in a square?',
        answer:
          'Typically three bundles per square for many asphalt products, but always read the bundle label—coverage varies.',
      },
    ],
    sources: [
      {
        label: 'GAF / manufacturer coverage labels (example industry practice)',
        href: 'https://www.gaf.com/',
      },
    ],
    sectionsHtml: toolBodies['roofing-shingles-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    shortName: 'Paint',
    category: 'outdoor',
    primaryKeyword: 'paint calculator',
    secondaryKeywords: ['how much paint do I need', 'room paint calculator', 'gallon paint calculator'],
    title: 'Paint Calculator – Gallons for Walls | YardCalc',
    description:
      'Paint calculator for rooms: wall area minus doors and windows, coverage per gallon, one or two coats. US gallons and liters.',
    h1: 'Paint Calculator',
    answerFirst:
      'Paint gallons ≈ paintable wall area × coats ÷ coverage. Wall area is perimeter × height (or 2×(L+W)×H for a rectangular room). Subtract doors (~20 sq ft) and windows (~15 sq ft each). At 350 sq ft/gallon, two coats on 400 sq ft need about 2.3 gallons.',
    summary: 'Room paint in gallons and liters with openings deducted.',
    calculatorId: 'paint',
    relatedSlugs: ['fence-calculator', 'deck-material-calculator'],
    relatedGuideSlugs: ['how-to-measure-roof-pitch'],
    faq: [
      {
        question: 'How much does a gallon of paint cover?',
        answer:
          'Many interior paints list about 250–400 sq ft per gallon per coat depending on surface and color change. This tool defaults to 350.',
      },
    ],
    sources: [
      {
        label: 'Paint manufacturer coverage guidelines (typical)',
        href: 'https://www.sherwin-williams.com/',
      },
    ],
    sectionsHtml: toolBodies['paint-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'retaining-wall-calculator',
    name: 'Retaining Wall Block Calculator',
    shortName: 'Retaining wall',
    category: 'outdoor',
    primaryKeyword: 'retaining wall calculator',
    secondaryKeywords: ['retaining wall block calculator', 'how many retaining wall blocks'],
    title: 'Retaining Wall Block Calculator | YardCalc',
    description:
      'Estimate retaining wall blocks, courses and base gravel from wall length, height and block face size. Free SRW planning calculator with waste allowance.',
    h1: 'Retaining Wall Block Calculator',
    answerFirst:
      'Block count ≈ wall face area ÷ block face area, or courses × blocks per course. Courses = ceil(wall height ÷ block height). Add ~5% waste. Include a compacted gravel base trench in your materials list for drainage and leveling.',
    summary: 'SRW blocks, courses, and base gravel.',
    calculatorId: 'retaining-wall',
    relatedSlugs: ['gravel-calculator', 'paver-calculator', 'concrete-calculator'],
    relatedGuideSlugs: ['gravel-types-for-driveways'],
    faq: [
      {
        question: 'Do I need geogrid?',
        answer:
          'Taller walls and surcharged slopes often require engineering and geogrid. Follow the block manufacturer’s height limits and local code.',
      },
    ],
    sources: [
      {
        label: 'NCMA – Segmental retaining walls',
        href: 'https://www.ncma.org/',
      },
    ],
    sectionsHtml: toolBodies['retaining-wall-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'grass-seed-calculator',
    name: 'Grass Seed Calculator',
    shortName: 'Grass seed',
    category: 'lawn',
    primaryKeyword: 'grass seed calculator',
    secondaryKeywords: ['lawn seed calculator', 'overseeding calculator'],
    title: 'Grass Seed Calculator – New Lawn & Overseed | YardCalc',
    description:
      'Grass seed calculator using lb per 1,000 sq ft rates for new lawns and overseeding. Get pounds and kilograms for your yard size—match the rate on your seed bag.',
    h1: 'Grass Seed Calculator',
    answerFirst:
      'Seed needed = (lawn sq ft ÷ 1000) × rate. Cool-season blends often use about 3–4 lb/1000 sq ft for new lawns and roughly half that for overseeding. Always follow the rate printed on your seed bag for the species mix.',
    summary: 'New lawn and overseed seed quantities.',
    calculatorId: 'grass-seed',
    relatedSlugs: ['fertilizer-calculator', 'topsoil-calculator'],
    relatedGuideSlugs: ['mulch-depth-guide'],
    faq: [
      {
        question: 'Can I use new-lawn rates for overseeding?',
        answer:
          'Usually no—overseeding rates are lower. Too much seed increases competition and waste.',
      },
    ],
    sources: [
      {
        label: 'Penn State Extension – Turfgrass',
        href: 'https://extension.psu.edu/turfgrass',
      },
    ],
    sectionsHtml: toolBodies['grass-seed-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'fertilizer-calculator',
    name: 'Fertilizer Calculator',
    shortName: 'Fertilizer',
    category: 'lawn',
    primaryKeyword: 'fertilizer calculator',
    secondaryKeywords: ['lawn fertilizer calculator', 'nitrogen fertilizer calculator'],
    title: 'Fertilizer Calculator – Nitrogen Rates | YardCalc',
    description:
      'Lawn fertilizer calculator from nitrogen target and N-P-K percentage. Get product pounds and bag counts for your yard size.',
    h1: 'Fertilizer Calculator',
    answerFirst:
      'Product fertilizer = (area÷1000) × (desired lb nitrogen per 1000 ÷ nitrogen fraction). Example: 1 lb N/1000 sq ft using a 25-0-5 product needs 4 lb of product per 1,000 sq ft because 1 ÷ 0.25 = 4. Match timing to local extension calendars.',
    summary: 'Product pounds from N rate and analysis.',
    calculatorId: 'fertilizer',
    relatedSlugs: ['grass-seed-calculator', 'topsoil-calculator'],
    relatedGuideSlugs: ['mulch-depth-guide'],
    faq: [
      {
        question: 'What do N-P-K numbers mean?',
        answer:
          'They are percent nitrogen, phosphate, and potash by weight. A 25-0-5 bag is 25% nitrogen.',
      },
    ],
    sources: [
      {
        label: 'University of Minnesota Extension – Fertilizing lawns',
        href: 'https://extension.umn.edu/lawn-care/fertilizing-lawns',
        usedFor: 'Nitrogen rate and lawn fertility practice',
        checked: '2026-10-20',
      },
      {
        label: 'Penn State Extension – Turfgrass',
        href: 'https://extension.psu.edu/turfgrass',
        usedFor: 'Turfgrass care and rate context',
        checked: '2026-10-20',
      },
    ],
    sectionsHtml: toolBodies['fertilizer-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'raised-bed-soil-calculator',
    name: 'Raised Bed Soil Calculator',
    shortName: 'Raised bed',
    category: 'landscape',
    primaryKeyword: 'raised bed soil calculator',
    secondaryKeywords: ['garden box soil calculator', 'how much soil for raised bed'],
    title: 'Raised Bed Soil Calculator | YardCalc',
    description:
      'Calculate soil mix volume for raised beds from interior length, width, and depth. Cubic feet, yards, and bag estimates.',
    h1: 'Raised Bed Soil Calculator',
    answerFirst:
      'Raised bed soil volume = interior length × width × fill depth. An 8×4 ft bed 12 inches deep needs 32 cu ft (~1.2 cu yd). Many gardeners blend topsoil, compost, and aeration materials rather than using a single bagged product.',
    summary: 'Soil fill volume for garden boxes.',
    calculatorId: 'raised-bed',
    relatedSlugs: ['topsoil-calculator', 'mulch-calculator', 'sand-calculator'],
    relatedGuideSlugs: ['mulch-depth-guide'],
    faq: [
      {
        question: 'Should I fill the entire depth with potting mix?',
        answer:
          'Deep beds can use bulk topsoil/compost blends for most of the volume and reserve finer mix for the top layer. Avoid pure play sand as the only fill.',
      },
    ],
    sources: [
      {
        label: 'Extension vegetable gardening resources',
        href: 'https://extension.org/',
      },
    ],
    sectionsHtml: toolBodies['raised-bed-soil-calculator'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    applicationCategory: 'UtilitiesApplication',
  },
];

export function getTool(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function toolsByCategory(category: ToolCategory): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p.endsWith('/') ? p : `${p}/`}`;
}

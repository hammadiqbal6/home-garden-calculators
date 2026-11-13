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
    /** 1–2 sentence answer-first lead with a number (above the card grid) */
    answerFirst: string;
    /** Extra HTML below the card grid (tables, longer explainer) */
    introHtml: string;
  }
> = {
  concrete: {
    slug: 'concrete',
    name: 'Concrete calculators',
    title: 'Concrete Calculators: Slabs, Posts, Sonotubes',
    description:
      'Free concrete calculators for slabs, footings, fence post holes, Sonotubes and steps. Get cubic yards and bag counts, plus guides on mixing and waste allowance.',
    primaryKeyword: 'concrete calculator hub',
    answerFirst:
      'Estimate slabs, post holes, and Sonotubes in cubic yards and 40/60/80 lb bags. A 10×10 ft patio at 4 inches needs about 1.23 cu yd (≈56 × 80 lb bags before waste; ~62 after 10%).',
    introHtml: `
      <h2>Which concrete calculator do I need?</h2>
      <div class="table-scroll">
      <table>
        <caption>Match the pour shape to the right tool</caption>
        <thead><tr><th>Project</th><th>Use this calculator</th><th>Quick check</th></tr></thead>
        <tbody>
          <tr><td>Patio, pad, footing, solid steps</td><td><a href="/calculators/concrete-calculator/">Slab / footing calculator</a></td><td>10×10×4&quot; ≈ 1.23 yd³ (~62 × 80 lb after 10% waste)</td></tr>
          <tr><td>Fence or sign post holes</td><td><a href="/calculators/concrete-calculator-post-holes/">Post hole calculator</a></td><td>8&quot;×2 ft ≈ 2 × 80 lb bags after waste</td></tr>
          <tr><td>Cardboard column forms</td><td><a href="/calculators/sonotube-concrete-calculator/">Sonotube calculator</a></td><td>12&quot;×4 ft ≈ 6 × 80 lb bags before waste</td></tr>
        </tbody>
      </table>
      </div>
      <h2>How to choose bag mix vs ready-mix</h2>
      <p>Bagged QUIKRETE / Sakrete-style mixes suit posts, small pads, and repairs you can place in batches. Past about one cubic yard—or any pour that must be continuous across a large slab—compare the cost and labor of ready-mix delivery. YardTally bag counts use published standard-mix yields of about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags; lightweight and high-yield products differ, so read the label.</p>
      <h2>Worked example: 10×10 patio</h2>
      <p>Volume = 10 × 10 × (4÷12) = 33.33 cu ft ≈ 1.23 cu yd. With the default 10% waste factor that becomes 36.7 cu ft → 62 bags of 80 lb mix or 82 bags of 60 lb mix. Order gravel base separately with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. Full charts: <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>, <a href="/guides/how-much-concrete-for-fence-posts/">fence post concrete</a>, and <a href="/guides/concrete-for-10x10-slab/">10×10 slab</a>.</p>
      <h2>Waste, frost, and regional caveats</h2>
      <p>Uneven subgrade and spillage routinely consume 5–10% extra on DIY bag mixes. Frost-line depth, soil type, and local code control hole depth and slab thickness—this hub estimates volume only. Confirm reinforcement, joints, and base with local practice before you pour.</p>
    `,
  },
  landscape: {
    slug: 'landscape',
    name: 'Landscape material calculators',
    title: 'Landscape Calculators: Mulch, Gravel & Soil',
    description:
      'Free landscape calculators for mulch, gravel, topsoil, sand, pavers and raised beds. Enter area and depth for cubic yards, tons and bag counts.',
    primaryKeyword: 'landscape material calculator',
    answerFirst:
      'Convert bed area × depth into cubic yards, tons, or bags for mulch, gravel, topsoil, sand, pavers, and raised beds. At 3 inches deep, 100 sq ft of mulch is about 0.93 cu yd (roughly thirteen 2 cu ft bags).',
    introHtml: `
      <h2>Bulk yards vs bags</h2>
      <div class="table-scroll">
      <table>
        <caption>Planning rule of thumb (confirm bag size on the label)</caption>
        <thead><tr><th>Material</th><th>1 cubic yard ≈</th><th>When bags win</th></tr></thead>
        <tbody>
          <tr><td>Mulch (2 cu ft bags)</td><td>~13.5 bags</td><td>Under ~1 yd or tight access</td></tr>
          <tr><td>Mulch (3 cu ft bags)</td><td>~9 bags</td><td>Small beds and top-ups</td></tr>
          <tr><td>Topsoil / compost blends</td><td>Bulk by the yard</td><td>Raised beds and small fills</td></tr>
          <tr><td>Gravel / crushed stone</td><td>~1.2–1.5 tons (density varies)</td><td>Only for tiny patches</td></tr>
        </tbody>
      </table>
      </div>
      <h2>How to choose bulk vs bags</h2>
      <p>Bulk yards usually win on price once you need more than about a cubic yard and have truck access. Bags win for small beds, tree rings, and sites where a dump truck cannot reach. YardTally ton estimates use mid densities (gravel/sand ≈ 2,700 lb/yd³, topsoil ≈ 2,200 lb/yd³)—moisture and rock type move those numbers, so confirm with your stone yard ticket.</p>
      <h2>Worked example: 20×10 path at 4 inches</h2>
      <p>Area = 200 sq ft. Depth = 4÷12 = 0.333 ft. Volume = 66.7 cu ft ≈ 2.47 cu yd before waste; with 10% compaction allowance ≈ 2.72 cu yd ≈ 3.67 tons at 2,700 lb/yd³. Run the same dimensions in the <a href="/calculators/gravel-calculator/">gravel calculator</a>.</p>
      <p>Use the <a href="/calculators/mulch-calculator/">mulch calculator</a> for rectangular beds and the <a href="/calculators/mulch-calculator-tree-rings/">tree ring calculator</a> for donut volumes. Depth guidance: <a href="/guides/mulch-depth-guide/">mulch depth guide</a> (typically 2–3&nbsp;inches for beds). Pair pavers with <a href="/calculators/sand-calculator/">sand</a> and gravel; see <a href="/guides/paver-base-gravel-and-sand-depth/">paver base depth</a> and <a href="/guides/gravel-types-for-driveways/">driveway gravel types</a>.</p>
    `,
  },
  outdoor: {
    slug: 'outdoor-structures',
    name: 'Outdoor structure calculators',
    title: 'Outdoor Calculators: Fence, Deck & Roof',
    description:
      'Free calculators for fence posts and pickets, deck boards and joists, roof pitch and shingles, paint gallons and retaining wall blocks.',
    primaryKeyword: 'outdoor project calculator',
    answerFirst:
      'Plan fence posts and pickets, deck boards, roof pitch and shingles, paint gallons, and retaining-wall blocks before you buy. A 100 ft fence with 8 ft sections typically needs 14 posts (sections + 1) before gates and corners.',
    introHtml: `
      <h2>Project picker</h2>
      <div class="table-scroll">
      <table>
        <caption>Start with the structure, then add related materials</caption>
        <thead><tr><th>If you are building…</th><th>Start here</th><th>Also estimate</th></tr></thead>
        <tbody>
          <tr><td>Fence line</td><td><a href="/calculators/fence-calculator/">Fence calculator</a></td><td><a href="/calculators/concrete-calculator-post-holes/">Post hole concrete</a></td></tr>
          <tr><td>Deck</td><td><a href="/calculators/deck-material-calculator/">Deck materials</a></td><td><a href="/calculators/sonotube-concrete-calculator/">Sonotube piers</a></td></tr>
          <tr><td>Roof / re-roof</td><td><a href="/calculators/roof-pitch-calculator/">Pitch</a> → <a href="/calculators/roofing-shingles-calculator/">Shingles</a></td><td><a href="/guides/how-to-measure-roof-pitch/">Measure pitch safely</a></td></tr>
          <tr><td>Painted walls</td><td><a href="/calculators/paint-calculator/">Paint calculator</a></td><td><a href="/guides/how-much-paint-for-a-room/">Room paint guide</a></td></tr>
          <tr><td>Segmental wall</td><td><a href="/calculators/retaining-wall-calculator/">Block calculator</a></td><td><a href="/guides/retaining-wall-blocks-and-base/">Blocks &amp; base guide</a></td></tr>
        </tbody>
      </table>
      </div>
      <h2>How to choose what to estimate first</h2>
      <p>Start with geometry (run length, deck footprint, plan roof area, wall face), then layer on waste and related materials. Fence posts drive concrete volume; deck boards drive joist count and pier locations; roof pitch drives shingle squares; retaining-wall height drives whether you need engineering beyond a simple block count.</p>
      <h2>Worked examples</h2>
      <ul>
        <li><strong>48 ft fence at 8 ft spacing:</strong> 6 sections, 7 posts, 18 rails (3 per bay). For 10&quot; × 2.5 ft holes filled solid, plan ~15 × 80 lb bags after 10% waste—use the post-hole tool, not a flat “one bag per post” rule for cylinder fills.</li>
        <li><strong>12×16 deck:</strong> board and joist takeoff in the <a href="/guides/deck-material-list-12x16/">12×16 deck material list</a>; pier concrete via Sonotube diameter × height.</li>
        <li><strong>16×24 deck:</strong> larger rectangular takeoff in the <a href="/guides/deck-material-list-16x24/">16×24 deck material list</a> (boards, joists, beams, posts, footings).</li>
        <li><strong>40×25 plan roof at 6/12:</strong> area factor ≈ 1.118 → ~11.2 squares before waste; with 10% waste and 3 bundles/square, order about 37 bundles.</li>
      </ul>
      <p>Taller retaining walls and load-bearing decks may need a licensed design—follow manufacturer height charts and local code. Paint coverage varies by brand (this site defaults to 350 sq ft/gal); confirm on the can.</p>
    `,
  },
  lawn: {
    slug: 'lawn',
    name: 'Lawn & garden calculators',
    title: 'Lawn Calculators: Seed & Fertilizer',
    description:
      'Free lawn calculators for grass seed (new lawn and overseed) and fertilizer from nitrogen targets and N-P-K analysis. Rates per 1,000 sq ft.',
    primaryKeyword: 'lawn calculator',
    answerFirst:
      'Convert lawn area into grass-seed pounds and fertilizer product pounds using rates per 1,000 sq ft. A 5,000 sq ft cool-season new lawn at 3.5 lb/1,000 needs about 17.5 lb of seed (use the rate on your bag).',
    introHtml: `
      <h2>How to choose seed rate vs fertilizer rate</h2>
      <p>Seed quantity comes from the species blend on the bag (new-lawn rates are higher than overseed). Fertilizer quantity comes from your nitrogen target and the first N-P-K number. YardTally’s grass-seed defaults (3.5 lb/1,000 new, 1.75 lb/1,000 overseed) are mid cool-season planning figures—always override with the printed bag rate for your mix. Warm-season grasses and specialty blends can sit well outside that band.</p>
      <h2>Worked examples</h2>
      <ul>
        <li><strong>Seed:</strong> 5,000 sq ft × (3.5 lb ÷ 1,000) = 17.5 lb for a new cool-season lawn. The same area overseeded at 1.75 lb/1,000 needs 8.75 lb.</li>
        <li><strong>Fertilizer:</strong> Target 1 lb N per 1,000 sq ft with a 25-0-5 product → product = 1 ÷ 0.25 = 4 lb per 1,000 sq ft. For 5,000 sq ft that is 20 lb of product (half of a 40 lb bag).</li>
        <li><strong>Raised bed next to the lawn:</strong> an 8×4 ft bed 12 inches deep needs 32 cu ft (~1.2 cu yd) of mix—see the <a href="/calculators/raised-bed-soil-calculator/">raised bed soil calculator</a>.</li>
      </ul>
      <h2>Seasonal lawn calendar (planning)</h2>
      <div class="table-scroll">
      <table>
        <caption>Typical cool-season timing—confirm with local extension</caption>
        <thead><tr><th>Season</th><th>Common tasks</th><th>YardTally tools</th></tr></thead>
        <tbody>
          <tr><td>Early spring</td><td>Soil test, light cleanup, pre-emergent where appropriate</td><td><a href="/calculators/fertilizer-calculator/">Fertilizer</a></td></tr>
          <tr><td>Late summer / early fall</td><td>Best window for cool-season seed and overseed</td><td><a href="/calculators/grass-seed-calculator/">Grass seed</a></td></tr>
          <tr><td>Fall</td><td>Nitrogen feeding per local calendar; topdress thin spots</td><td><a href="/calculators/topsoil-calculator/">Topsoil</a></td></tr>
          <tr><td>Anytime (beds)</td><td>Raised-bed fills next to the lawn</td><td><a href="/calculators/raised-bed-soil-calculator/">Raised bed soil</a></td></tr>
        </tbody>
      </table>
      </div>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using new-lawn seed rates for overseeding (usually too much seed).</li>
        <li>Applying fertilizer by bag count without dividing by the nitrogen percentage.</li>
        <li>Skipping a soil test when pH or phosphorus limits growth more than nitrogen.</li>
        <li>Assuming one national calendar fits every USDA hardiness zone.</li>
      </ul>
      <p>Guides: <a href="/guides/grass-seed-per-sq-ft/">grass seed per sq&nbsp;ft</a>, <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">nitrogen per 1,000&nbsp;sq&nbsp;ft</a>, <a href="/guides/topsoil-vs-garden-soil/">topsoil vs garden soil</a>, <a href="/guides/raised-bed-soil-mix-4x8/">4×8 raised bed mix</a>.</p>
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
    h1: 'Concrete Calculator: Cubic Yards & 40/60/80 lb Bags',
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
        checked: '2026-11-07',
      },
      {
        label: 'Sakrete – Concrete calculator',
        href: 'https://sakrete.com/resources/calculators/',
        usedFor: 'Cross-check bag coverage estimates for bagged concrete',
        checked: '2026-11-07',
      },
      {
        label: 'American Cement Association (formerly PCA)',
        href: 'https://www.cement.org/',
        usedFor: 'Industry context on cement and concrete materials',
        checked: '2026-11-07',
      },
      {
        label: 'ACI 332.1R-18 preview – Guide to Residential Concrete Construction',
        href: 'https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf',
        usedFor: 'Residential concrete practice overview (preview PDF)',
        checked: '2026-11-07',
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
    title: 'Concrete Calculator for Post Holes | YardTally',
    description:
      'Calculate concrete for fence post holes: enter diameter, depth, and post count for cubic yards and 40/60/80 lb bags. Free post-hole concrete estimator.',
    h1: 'Concrete Calculator for Post Holes',
    answerFirst:
      'Concrete for post holes equals the cylinder volume of each hole times the number of posts: π × (diameter÷2)² × depth. An 8-inch-wide, 2-foot-deep hole is about 0.70 cu ft—about two 60 or 80 lb bags after 10% waste. Multiply by your post count; Fast-Setting dry-pour methods may use fewer bags.',
    summary: 'Fence and sign post hole concrete by diameter, depth, and count.',
    calculatorId: 'post-holes',
    relatedSlugs: ['concrete-calculator', 'sonotube-concrete-calculator', 'fence-calculator'],
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts', 'how-many-bags-of-concrete'],
    faq: [
      {
        question: 'How much concrete for one fence post?',
        answer:
          'It depends on hole diameter and depth. An 8″ × 2 ft cylinder is about 0.70 cu ft (two 80 lb bags of standard mix after waste). A 10″ × 2.5 ft hole is about 1.36 cu ft (three 80 lb bags after waste). Fast-Setting dry-pour products may list fewer bags—follow that label, or use this calculator for a full fill.',
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
        checked: '2026-11-07',
      },
      {
        label: 'QUIKRETE – Concrete calculator',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: 'Bag yield cross-check for cylinder volumes',
        checked: '2026-11-07',
      },
      {
        label: 'Clemson HGIC – Home & Garden Information Center',
        href: 'https://hgic.clemson.edu/',
        usedFor: 'Landscape and fencing extension resources',
        checked: '2026-11-07',
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
    secondaryKeywords: [
      'concrete calculator for tubes',
      'concrete tube calculator',
      'cardboard concrete form calculator',
      'column concrete calculator',
    ],
    title: 'Sonotube / Concrete Tube Calculator (Bags, Yards)',
    description:
      'Concrete calculator for tubes and Sonotube forms: enter diameter, height, and tube count for cubic yards and 40/60/80 lb bag estimates.',
    h1: 'Sonotube / Concrete Tube Calculator: Bags by Diameter',
    answerFirst:
      'Sonotube (round cardboard form) volume is π × (inside diameter ÷ 2)² × height. A 12-inch tube 4 feet tall holds about 3.14 cu ft (~0.12 cu yd), roughly six 80 lb bags (or seven 60 lb) before waste. Multiply by pier count and add 5% for spillage.',
    summary: 'Round column and pier forms by diameter and height.',
    calculatorId: 'sonotube',
    relatedSlugs: ['concrete-calculator', 'concrete-calculator-post-holes', 'deck-material-calculator'],
    relatedGuideSlugs: [
      'how-much-concrete-in-a-sonotube',
      'how-many-bags-of-concrete',
      'deck-material-list-16x24',
    ],
    faq: [
      {
        question: 'Is this a concrete calculator for tubes / cardboard forms?',
        answer:
          'Yes. It estimates concrete for round cardboard forms (often called Sonotube or concrete tubes): enter inside diameter, height, and how many tubes, then read cubic feet/yards and bag counts.',
      },
      {
        question: 'Is Sonotube diameter inside or outside?',
        answer:
          'Use the inside diameter (the clear form size) for concrete volume. Manufacturers label common sizes such as 8", 10", and 12".',
      },
      {
        question: 'How much concrete for a 12-inch Sonotube?',
        answer:
          'Per foot of height, a 12" tube needs about 0.785 cu ft. A 4 ft pier is ~3.14 cu ft—six 80 lb bags before waste (still six after the default 5% waste at 0.60 cu ft/bag).',
      },
      {
        question: 'Cubic feet or cubic yards for tube pours?',
        answer:
          'Bag planning usually stays in cubic feet (0.30 / 0.45 / 0.60 cu ft yields for 40 / 60 / 80 lb mixes). Divide by 27 for cubic yards when comparing ready-mix. Four 12" × 4 ft tubes with 5% waste are about 13.2 cu ft (~0.49 cu yd).',
      },
    ],
    sources: [
      {
        label: 'Sonotube concrete forms – product sizing',
        href: 'https://www.sonotube.com/sonotube-concrete-forms',
        usedFor: 'Inside diameter / form sizing for round tubes',
        checked: '2026-11-07',
      },
      {
        label: 'QUIKRETE – Concrete calculator',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: 'Bag counts from calculated cubic feet',
        checked: '2026-11-07',
      },
    ],
    sectionsHtml: toolBodies['sonotube-concrete-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'mulch-calculator',
    name: 'Mulch Calculator',
    shortName: 'Mulch',
    category: 'landscape',
    primaryKeyword: 'mulch calculator',
    secondaryKeywords: ['mulch calculator bags', 'mulch calculator cubic yards', 'how much mulch'],
    title: 'Mulch Calculator: How Much Mulch Do I Need?',
    description:
      'Enter bed length, width and depth to see how many cubic yards or 2 and 3 cu ft bags of mulch you need. Includes recommended mulch depths for beds and trees.',
    h1: 'Mulch Calculator: Cubic Yards & Bags',
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
          'A cubic yard is 27 cu ft, so 27÷2 = 13.5 of the common 2 cu ft bags (plan on 14 at the register) or nine 3 cu ft bags.',
      },
      {
        question: 'How many 2 cu ft and 3 cu ft bags for a given mulch volume?',
        answer:
          'Divide cubic feet by bag size, then round up. Example: 25 cu ft needs ceil(25÷2) = 13 of the 2 cu ft bags, or ceil(25÷3) = 9 of the 3 cu ft bags. For yards, multiply by 27 first (0.93 cu yd × 27 ≈ 25 cu ft).',
      },
    ],
    sources: [
      {
        label: 'Iowa State Extension – How to determine amount of mulch needed',
        href: 'https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed',
        usedFor: 'Volume method (area × depth) for garden beds',
        checked: '2026-11-07',
      },
      {
        label: 'UF/IFAS Gardening Solutions – Choosing and installing mulches',
        href: 'https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/',
        usedFor: 'Mulch depth and installation guidance',
        checked: '2026-11-07',
      },
      {
        label: 'Mississippi State Extension – Mulches for the landscape',
        href: 'https://extension.msstate.edu/publications/mulches-for-the-landscape',
        usedFor: 'Landscape mulch practice overview',
        checked: '2026-11-07',
      },
      {
        label: 'Clemson HGIC – Mulch',
        href: 'https://hgic.clemson.edu/factsheet/mulch/',
        usedFor: 'Extension mulch depth and care notes',
        checked: '2026-11-07',
      },
    ],
    sectionsHtml: toolBodies['mulch-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
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
    title: 'Mulch Calculator for Tree Rings – Donut Volume | YardTally',
    description:
      'Calculate mulch for tree rings: enter outer ring and trunk diameters plus depth for cubic feet, yards, and bags. Avoid volcano mulching.',
    h1: 'Mulch Calculator for Tree Rings: Donut Volume',
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
        usedFor: 'Tree-ring mulch depth and volcano-mulching guidance',
        checked: '2026-11-07',
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
    title: 'Gravel Calculator – Tons & Cubic Yards | YardTally',
    description:
      'Gravel and crushed stone calculator: length, width, and depth to cubic yards and estimated tons. Useful for driveways, paths, and bases.',
    h1: 'Gravel Calculator: Tons & Cubic Yards',
    answerFirst:
      'Gravel needed equals length × width × depth, converted to cubic yards (÷27). Many crushed-stone products weigh about 1.3–1.4 tons per cubic yard; this tool uses ~2,700 lb/yd³ as a mid estimate. Add ~10% for compaction on driveways and paths.',
    summary: 'Driveway and path gravel in yards and tons.',
    calculatorId: 'gravel',
    relatedSlugs: ['sand-calculator', 'paver-calculator', 'retaining-wall-calculator'],
    relatedGuideSlugs: ['gravel-types-for-driveways', 'paver-base-gravel-and-sand-depth'],
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
        label: 'USDA NRCS – Aggregate and soil resources (general)',
        href: 'https://www.nrcs.usda.gov/',
        usedFor: 'Context on aggregates; density still confirmed with local stone yards',
        checked: '2026-11-07',
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
    title: 'Topsoil Calculator – Cubic Yards & Bags | YardTally',
    description:
      'Calculate topsoil for lawns and beds: enter length, width and depth to get cubic yards, cubic meters and bag estimates with waste. Free planning tool.',
    h1: 'Topsoil Calculator: Yards, Bags & Tons',
    answerFirst:
      'Topsoil volume is area × depth. To add 2 inches over 500 sq ft: 500 × (2÷12) = 83.3 cu ft ≈ 3.1 cu yd. Screened topsoil is often sold by the yard; bagged soil is handy for small beds. Include ~10% for settling.',
    summary: 'Lawn and garden topsoil depth to yards.',
    calculatorId: 'topsoil',
    relatedSlugs: ['mulch-calculator', 'raised-bed-soil-calculator', 'sand-calculator'],
    relatedGuideSlugs: ['topsoil-vs-garden-soil', 'raised-bed-soil-mix-4x8', 'grass-seed-per-sq-ft'],
    faq: [
      {
        question: 'How much topsoil to level a yard?',
        answer:
          'Measure average fill depth across the area. Even 1 inch over 1,000 sq ft is about 3.1 cu yd. Deep low spots should be measured separately.',
      },
    ],
    sources: [
      {
        label: 'Extension.org – Soil and gardening resources',
        href: 'https://extension.org/',
        usedFor: 'General topsoil and garden-soil practice; bag sizes vary by brand',
        checked: '2026-11-07',
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
    title: 'Sand Calculator – Beds, Pavers & Play | YardTally',
    description:
      'Sand calculator for paver bedding, leveling, and play areas. Converts dimensions to cubic yards and estimated tons.',
    h1: 'Sand Calculator: Cubic Yards & Bags',
    answerFirst:
      'Sand volume uses the same length × width × depth formula as gravel. Paver bedding sand is often about 1 inch deep; playground sand is deeper. A 10×10 area at 1 inch is 8.3 cu ft (~0.31 cu yd). Add waste for screeding.',
    summary: 'Bedding and fill sand by area and depth.',
    calculatorId: 'sand',
    relatedSlugs: ['paver-calculator', 'gravel-calculator', 'concrete-calculator'],
    relatedGuideSlugs: ['paver-base-gravel-and-sand-depth', 'gravel-types-for-driveways'],
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
        usedFor: 'Paver bedding sand depth context (~1 inch typical setting bed)',
        checked: '2026-11-07',
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
    title: 'Paver Calculator – Count, Sand & Base | YardTally',
    description:
      'Estimate pavers needed plus bedding sand and gravel base. Enter patio size and paver dimensions with a waste percent.',
    h1: 'Paver Calculator: Count, Sand & Base',
    answerFirst:
      'Pavers needed ≈ patio area ÷ paver face area, then add 5–10% waste for cuts. A 10×10 patio with 12×12 inch pavers needs 100 pavers, about 110 with 10% waste. Plan ~1" sand bed and several inches of compacted gravel base.',
    summary: 'Patio paver counts with sand and base volumes.',
    calculatorId: 'paver',
    relatedSlugs: ['sand-calculator', 'gravel-calculator', 'retaining-wall-calculator'],
    relatedGuideSlugs: ['paver-base-gravel-and-sand-depth', 'gravel-types-for-driveways'],
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
        usedFor: 'Segmental paver waste, bedding, and base practice overview',
        checked: '2026-11-07',
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
    title: 'Fence Calculator: Posts, Rails, Pickets',
    description:
      'Fence materials calculator for posts, rails, and pickets from total run length and spacing. Includes concrete bag estimate for posts.',
    h1: 'Fence Calculator: Posts, Rails, Pickets & Concrete',
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
      {
        question: 'Why does the tool default to one concrete bag per post?',
        answer:
          'One 80 lb bag is a Fast-Setting dry-pour planning heuristic for small holes, not a full cylinder fill. For solid fills, run the post-hole calculator (e.g. 10″ × 2.5 ft ≈ three 80 lb bags after waste) and override bags-per-post.',
      },
    ],
    sources: [
      {
        label: 'Clemson HGIC – Landscape structures',
        href: 'https://hgic.clemson.edu/',
        usedFor: 'Fence and landscape structure practice overview',
        checked: '2026-11-07',
      },
      {
        label: 'QUIKRETE – Setting a fence post',
        href: 'https://www.quikrete.com/athome/project-setting-a-fence-post.asp',
        usedFor: 'Fast-Setting vs standard mix post-setting context',
        checked: '2026-11-07',
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
    title: 'Deck Material Calculator – Boards & Joists | YardTally',
    description:
      'Deck material calculator for decking boards, joists at 16" o.c., rim joists, and screw counts. Free rectangular deck estimator.',
    h1: 'Deck Material Calculator: Boards & Joists',
    answerFirst:
      'Deck boards needed ≈ deck width ÷ board face width, times boards along the length. Joists are typically spaced 16 inches on center: count = floor(length ÷ spacing) + 1, plus rim joists. Screw counts scale with linear feet of decking—often about two fasteners per foot of board.',
    summary: 'Boards, joists, and screws for a rectangular deck.',
    calculatorId: 'deck',
    relatedSlugs: ['sonotube-concrete-calculator', 'fence-calculator', 'paint-calculator'],
    relatedGuideSlugs: [
      'deck-material-list-12x16',
      'deck-material-list-16x24',
      'how-to-measure-roof-pitch',
    ],
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
        usedFor: 'Deck framing practice and span-table context (not a substitute for code)',
        checked: '2026-11-07',
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
    title: 'Roof Pitch Calculator – Slope, Angle & Factor | YardTally',
    description:
      'Roof pitch calculator converts rise and run to X-in-12 pitch, degrees, percent slope, and roof area factor. Free, mobile-friendly.',
    h1: 'Roof Pitch Calculator: Slope, Angle & Factor',
    answerFirst:
      'Roof pitch is rise over run, usually stated as inches of rise per 12 inches of run (for example 6/12). Angle = arctan(rise÷run). The area factor √(1+(rise/run)²) converts horizontal plan area to actual roof surface area for material estimates.',
    summary: 'Pitch, degrees, percent slope, and area multiplier.',
    calculatorId: 'roof-pitch',
    relatedSlugs: ['roofing-shingles-calculator', 'deck-material-calculator'],
    relatedGuideSlugs: ['how-to-measure-roof-pitch', 'how-to-estimate-roofing-shingles'],
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
        label: 'FEMA – Roof and building guidance (general)',
        href: 'https://www.fema.gov/',
        usedFor: 'General roof slope terminology; measure safely from the ground when possible',
        checked: '2026-11-07',
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
    secondaryKeywords: [
      'shingle estimator square feet',
      'shingle calculator',
      'roofing squares calculator',
      'how many squares of shingles',
    ],
    title: 'Shingle Estimator: Squares and Square Feet',
    description:
      'Shingle estimator for roof square feet and squares: convert plan length × width and pitch into roof area, squares, waste, and asphalt bundles (~3 per square).',
    h1: 'Shingle Estimator: Squares & Square Feet',
    answerFirst:
      'One roofing square covers 100 square feet of roof surface. Multiply plan length × width by the pitch area factor, divide by 100 for squares, then add 10–15% waste. Most asphalt bundles cover about ⅓ square (3 bundles per square).',
    summary: 'Squares and bundles from plan area and pitch.',
    calculatorId: 'roofing',
    relatedSlugs: ['roof-pitch-calculator', 'deck-material-calculator'],
    relatedGuideSlugs: ['how-to-estimate-roofing-shingles', 'how-to-measure-roof-pitch'],
    faq: [
      {
        question: 'What is a roofing square vs square feet?',
        answer:
          'A square is 100 square feet of roof surface. This shingle estimator first finds roof square feet from plan dimensions × the pitch area factor, then divides by 100 to report squares—so you can order by either unit.',
      },
      {
        question: 'How many bundles in a square?',
        answer:
          'Typically three bundles per square for many asphalt products (about 33.3 sq ft coverage each), but always read the bundle label—coverage varies by brand and laminate vs 3-tab.',
      },
      {
        question: 'How do I estimate shingles from square feet?',
        answer:
          'Take roof surface square feet (not just plan footprint), divide by 100 for squares, add waste (often 10–15% for hips/valleys/starter), then multiply squares by bundles per square from the label.',
      },
    ],
    sources: [
      {
        label: 'GAF – Manufacturer coverage practice (example)',
        href: 'https://www.gaf.com/',
        usedFor: 'Bundles-per-square industry practice; always read the bundle label',
        checked: '2026-11-07',
      },
    ],
    sectionsHtml: toolBodies['roofing-shingles-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    shortName: 'Paint',
    category: 'outdoor',
    primaryKeyword: 'paint calculator',
    secondaryKeywords: ['how much paint do I need', 'room paint calculator', 'gallon paint calculator'],
    title: 'Paint Calculator – Gallons for Walls | YardTally',
    description:
      'Paint calculator for rooms: wall area minus doors and windows, coverage per gallon, one or two coats. US gallons and liters.',
    h1: 'Paint Calculator: Gallons for Walls',
    answerFirst:
      'Paint gallons ≈ paintable wall area × coats ÷ coverage. Wall area is perimeter × height (or 2×(L+W)×H for a rectangular room). Subtract doors (~20 sq ft) and windows (~15 sq ft each). At 350 sq ft/gallon, two coats on 400 sq ft need about 2.3 gallons.',
    summary: 'Room paint in gallons and liters with openings deducted.',
    calculatorId: 'paint',
    relatedSlugs: ['fence-calculator', 'deck-material-calculator'],
    relatedGuideSlugs: ['how-much-paint-for-a-room'],
    faq: [
      {
        question: 'How much does a gallon of paint cover?',
        answer:
          'Many interior paints list about 250–400 sq ft per gallon per coat depending on surface and color change. This tool defaults to 350.',
      },
      {
        question: 'How many square feet does a gallon of paint cover?',
        answer:
          'Use the coverage printed on the can (often ~350–400 sq ft per gallon per coat indoors). Divide paintable wall area × coats by that coverage to get gallons.',
      },
    ],
    sources: [
      {
        label: 'Sherwin-Williams – Coverage guidelines (typical)',
        href: 'https://www.sherwin-williams.com/',
        usedFor: 'Typical interior coverage band; YardTally defaults to 350 sq ft/gal',
        checked: '2026-11-07',
      },
    ],
    sectionsHtml: toolBodies['paint-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'retaining-wall-calculator',
    name: 'Retaining Wall Block Calculator',
    shortName: 'Retaining wall',
    category: 'outdoor',
    primaryKeyword: 'retaining wall calculator',
    secondaryKeywords: ['retaining wall block calculator', 'how many retaining wall blocks'],
    title: 'Retaining Wall Block Calculator – Blocks & Base',
    description:
      'Estimate retaining wall blocks, courses and base gravel from wall length, height and block face size. Free SRW planning calculator with waste allowance.',
    h1: 'Retaining Wall Calculator: Blocks & Base',
    answerFirst:
      'Block count ≈ wall face area ÷ block face area, or courses × blocks per course. Courses = ceil(wall height ÷ block height). Add ~5% waste. Include a compacted gravel base trench in your materials list for drainage and leveling.',
    summary: 'SRW blocks, courses, and base gravel.',
    calculatorId: 'retaining-wall',
    relatedSlugs: ['gravel-calculator', 'paver-calculator', 'concrete-calculator'],
    relatedGuideSlugs: ['retaining-wall-blocks-and-base', 'paver-base-gravel-and-sand-depth'],
    faq: [
      {
        question: 'Do I need geogrid?',
        answer:
          'Taller walls and surcharged slopes often require engineering and geogrid. Follow the block manufacturer’s height limits and local code.',
      },
      {
        question: 'What retaining wall block dimensions should I enter?',
        answer:
          'Use the face length and face height of one block (for example 18 in long × 6 in tall). Caps are usually ordered separately by linear feet and are not the same as face-block dimensions.',
      },
      {
        question: 'How deep should the retaining wall base trench be vs a paver base?',
        answer:
          'Wall bases and patio paver bases are related (compacted angular gravel) but not interchangeable. Many small landscape walls use several inches of compacted gravel in a trench wider than the block; this tool’s planning default is about 24 in wide × 6 in deep. Follow the wall manufacturer—not patio sand-bed depths—behind retained soil.',
      },
      {
        question: 'Do caps count in the face-block total?',
        answer:
          'Usually order caps separately by linear feet of wall. Face-block counts cover the stacked courses, not decorative cap units.',
      },
    ],
    sources: [
      {
        label: 'NCMA – Segmental retaining walls',
        href: 'https://www.ncma.org/',
        usedFor: 'SRW block and base practice overview; height limits are manufacturer-specific',
        checked: '2026-11-07',
      },
    ],
    sectionsHtml: toolBodies['retaining-wall-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'grass-seed-calculator',
    name: 'Grass Seed Calculator',
    shortName: 'Grass seed',
    category: 'lawn',
    primaryKeyword: 'grass seed calculator',
    secondaryKeywords: ['lawn seed calculator', 'overseeding calculator'],
    title: 'Grass Seed Calculator – New Lawn & Overseed | YardTally',
    description:
      'Grass seed calculator using lb per 1,000 sq ft rates for new lawns and overseeding. Get pounds and kilograms for your yard size—match the rate on your seed bag.',
    h1: 'Grass Seed Calculator: lb per 1,000 Sq Ft (New & Overseed)',
    answerFirst:
      'Seed needed = (lawn sq ft ÷ 1000) × rate. Cool-season blends often use about 3–4 lb/1000 sq ft for new lawns and roughly half that for overseeding. Always follow the rate printed on your seed bag for the species mix.',
    summary: 'New lawn and overseed seed quantities.',
    calculatorId: 'grass-seed',
    relatedSlugs: ['fertilizer-calculator', 'topsoil-calculator', 'raised-bed-soil-calculator'],
    relatedGuideSlugs: ['grass-seed-per-sq-ft', 'fertilizer-nitrogen-per-1000-sq-ft'],
    faq: [
      {
        question: 'Can I use new-lawn rates for overseeding?',
        answer:
          'Usually no—overseeding rates are lower. Too much seed increases competition and waste.',
      },
      {
        question: 'How much grass seed per 1,000 sq ft?',
        answer:
          'Read the bag. Many cool-season blends list about 3–4 lb per 1,000 sq ft for new lawns and a lower overseed rate. This calculator multiplies (area ÷ 1,000) by the rate you enter from the label.',
      },
    ],
    sources: [
      {
        label: 'Penn State Extension – Turfgrass',
        href: 'https://extension.psu.edu/turfgrass',
        usedFor: 'Cool-season turf seeding context; override with bag rate for your mix',
        checked: '2026-11-07',
      },
    ],
    sectionsHtml: toolBodies['grass-seed-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-13',
    applicationCategory: 'UtilitiesApplication',
  },
  {
    slug: 'fertilizer-calculator',
    name: 'Fertilizer Calculator',
    shortName: 'Fertilizer',
    category: 'lawn',
    primaryKeyword: 'fertilizer calculator',
    secondaryKeywords: ['lawn fertilizer calculator', 'nitrogen fertilizer calculator'],
    title: 'Fertilizer Calculator – Nitrogen Rates | YardTally',
    description:
      'Lawn fertilizer calculator from nitrogen target and N-P-K percentage. Get product pounds and bag counts for your yard size.',
    h1: 'Fertilizer Calculator: Nitrogen Rates & Bag Count',
    answerFirst:
      'Product fertilizer = (area÷1000) × (desired lb nitrogen per 1000 ÷ nitrogen fraction). Example: 1 lb N/1000 sq ft using a 25-0-5 product needs 4 lb of product per 1,000 sq ft because 1 ÷ 0.25 = 4. Match timing to local extension calendars.',
    summary: 'Product pounds from N rate and analysis.',
    calculatorId: 'fertilizer',
    relatedSlugs: ['grass-seed-calculator', 'topsoil-calculator'],
    relatedGuideSlugs: ['fertilizer-nitrogen-per-1000-sq-ft', 'grass-seed-per-sq-ft'],
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
        checked: '2026-11-07',
      },
      {
        label: 'Penn State Extension – Turfgrass',
        href: 'https://extension.psu.edu/turfgrass',
        usedFor: 'Turfgrass care and rate context',
        checked: '2026-11-07',
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
    title: 'Raised Bed Soil Calculator: Cu Ft and Bags',
    description:
      'Calculate soil mix volume for raised beds from interior length, width, and depth. Cubic feet, yards, and bag estimates.',
    h1: 'Raised Bed Soil Calculator: Cubic Feet, Bags & Mix',
    answerFirst:
      'Raised bed soil volume = interior length × width × fill depth. An 8×4 ft bed 12 inches deep needs 32 cu ft (~1.2 cu yd). Many gardeners blend topsoil, compost, and aeration materials rather than using a single bagged product.',
    summary: 'Soil fill volume for garden boxes.',
    calculatorId: 'raised-bed',
    relatedSlugs: ['topsoil-calculator', 'mulch-calculator', 'grass-seed-calculator'],
    relatedGuideSlugs: ['raised-bed-soil-mix-4x8', 'topsoil-vs-garden-soil'],
    faq: [
      {
        question: 'Should I fill the entire depth with potting mix?',
        answer:
          'Deep beds can use bulk topsoil/compost blends for most of the volume and reserve finer mix for the top layer. Avoid pure play sand as the only fill.',
      },
    ],
    sources: [
      {
        label: 'Extension.org – Vegetable gardening resources',
        href: 'https://extension.org/',
        usedFor: 'Raised-bed soil volume practice; mix recipes vary by crop and climate',
        checked: '2026-11-07',
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

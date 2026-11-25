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
    title: 'Concrete Calculators: Slab, Footing, Post & Tube',
    description:
      'Free concrete calculators for slabs, strip and pad footings, post holes, and Sonotube piers. Get cubic yards and 40/60/80 lb bag counts before you pour.',
    primaryKeyword: 'concrete calculator hub',
    answerFirst:
      'Estimate slabs, footings, post holes, and Sonotubes in cubic yards and 40/60/80 lb bags. A 10×10 ft patio at 4 inches needs about 1.23 cu yd (≈56 × 80 lb bags before waste; ~62 after 10%).',
    introHtml: `
      <h2>Which concrete calculator do I need?</h2>
      <div class="table-scroll">
      <table>
        <caption>Match the pour shape to the right tool</caption>
        <thead><tr><th>Project</th><th>Use this calculator</th><th>Quick check</th></tr></thead>
        <tbody>
          <tr><td>Patio / slab</td><td><a href="/calculators/concrete-calculator/">Concrete slab calculator</a></td><td>10×10×4&quot; ≈ 1.23 yd³ (~62 × 80 lb after 10% waste)</td></tr>
          <tr><td>Solid poured steps</td><td><a href="/calculators/concrete-steps-calculator/">Concrete steps calculator</a></td><td>3 steps × 7&quot;×11&quot; × 3 ft ≈ 10.6 cu ft after 10% waste</td></tr>
          <tr><td>Strip or spread pad footings</td><td><a href="/calculators/concrete-footing-calculator/">Concrete footing calculator</a></td><td>40 ft × 16&quot; × 8&quot; ≈ 1.32 yd³ (~66 × 80 lb after 10% waste)</td></tr>
          <tr><td>Slab cost (your ready-mix or bag prices)</td><td><a href="/calculators/concrete-slab-cost-calculator/">Concrete slab cost calculator</a></td><td>Volume × your $/yd or $/bag + optional add-ons</td></tr>
          <tr><td>Fence or sign post holes</td><td><a href="/calculators/concrete-calculator-post-holes/">Post hole concrete calculator</a></td><td>8&quot;×2 ft ≈ 2 × 80 lb bags after waste</td></tr>
          <tr><td>Cardboard column / pier forms</td><td><a href="/calculators/sonotube-concrete-calculator/">Sonotube concrete calculator</a></td><td>12&quot;×4 ft ≈ 6 × 80 lb bags before waste</td></tr>
          <tr><td>Deck pier count + bags</td><td><a href="/calculators/deck-footing-calculator/">Deck footing calculator</a></td><td>16×12 at 8 ft spacing ≈ 6 piers</td></tr>
          <tr><td>Slab rebar mat (spacing → sticks)</td><td><a href="/calculators/rebar-calculator/">Rebar calculator</a></td><td>20×20 at 18&quot; o.c. ≈ 31 × 20 ft sticks after 10% waste</td></tr>
        </tbody>
      </table>
      </div>
      <h2>How to choose bag mix vs ready-mix</h2>
      <p>Bagged QUIKRETE / Sakrete-style mixes suit posts, small pads, and repairs you can place in batches. Past about one cubic yard—or any pour that must be continuous across a large slab—compare the cost and labor of ready-mix delivery with the <a href="/calculators/concrete-slab-cost-calculator/">concrete slab cost calculator</a> (your prices only). YardTally bag counts use published standard-mix yields of about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags; lightweight and high-yield products differ, so read the label. Coverage planning (“how much will one yard cover?”) lives in <a href="/guides/how-much-concrete-do-i-need/">how much concrete do I need</a>.</p>
      <h2>Worked example: 10×10 patio</h2>
      <p>Volume = 10 × 10 × (4÷12) = 33.33 cu ft ≈ 1.23 cu yd. With the default 10% waste factor that becomes 36.7 cu ft → 62 bags of 80 lb mix or 82 bags of 60 lb mix. Order gravel base separately with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. Strip and pad runs use the <a href="/calculators/concrete-footing-calculator/">concrete footing calculator</a>. Thickness norms (about 4 inches for many patios) are in <a href="/guides/concrete-slab-thickness/">concrete slab thickness</a>. Full charts: <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>, <a href="/guides/concrete-for-10x10-slab/">concrete for a 10×10 slab</a>, <a href="/guides/how-much-concrete-for-fence-posts/">how much concrete for fence posts</a>, <a href="/guides/how-much-concrete-in-a-sonotube/">how much concrete in a Sonotube</a>, and <a href="/guides/sonotube-footing-and-depth/">Sonotube footing and depth</a>.</p>
      <h2>Waste, frost, and regional caveats</h2>
      <p>Uneven subgrade and spillage routinely consume 5–10% extra on DIY bag mixes. Frost-line depth, soil type, and local code control hole depth and slab thickness—this hub estimates volume only. Confirm reinforcement, joints, and base with local practice before you pour. Deck pier grids that still need a footing count belong on the <a href="/calculators/deck-footing-calculator/">deck footing calculator</a>.</p>
      <h2>Related materials outside this hub</h2>
      <p>Masonry walls use the <a href="/calculators/brick-calculator/">brick / CMU calculator</a> (outdoor structures hub). For a paved driveway instead of a concrete pad, estimate tons with the <a href="/calculators/asphalt-calculator/">asphalt calculator</a> (landscape hub) and base stone with the gravel tool.</p>
    `,
  },
  landscape: {
    slug: 'landscape',
    name: 'Landscape material calculators',
    title: 'Landscape Calculators: Mulch, Gravel & Pavers',
    description:
      'Free landscape calculators for mulch, gravel, topsoil, sand, pavers, and raised beds. Enter area and depth for cubic yards, tons, and bag counts.',
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
      <p>Use the <a href="/calculators/mulch-calculator/">mulch calculator</a> (how much mulch do I need for beds), the <a href="/calculators/mulch-calculator-circular-beds/">circular bed mulch calculator</a> for round beds, and the <a href="/calculators/mulch-calculator-tree-rings/">tree ring calculator</a> for donut volumes. Depth guidance: <a href="/guides/mulch-depth-guide/">mulch depth guide</a> (typically 2–3&nbsp;inches for beds). For a perforated-pipe trench, size rock with the <a href="/calculators/french-drain-gravel-calculator/">French drain gravel calculator</a> (trench volume minus pipe, plus fabric wrap)—not the flat-pad gravel tool. Size patio or retaining-wall base stone with the <a href="/calculators/paver-base-calculator/">paver base calculator</a>. Pair pavers with <a href="/calculators/sand-calculator/">sand</a> and gravel; see <a href="/guides/paver-base-gravel-and-sand-depth/">paver base depth</a> and <a href="/guides/gravel-types-for-driveways/">driveway gravel types</a>. For asphalt driveways, estimate tons with the <a href="/calculators/asphalt-calculator/">asphalt calculator</a> (planning density ~145 lb/cu ft compacted).</p>
    `,
  },
  outdoor: {
    slug: 'outdoor-structures',
    name: 'Outdoor structure calculators',
    title: 'Deck, Fence & Roof Calculators',
    description:
      'Free calculators for deck boards and joists, fence posts and pickets, roof pitch and shingles, paint gallons, and retaining-wall blocks.',
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
          <tr><td>Deck</td><td><a href="/calculators/deck-material-calculator/">Deck materials</a></td><td><a href="/calculators/deck-footing-calculator/">Deck footings</a> · <a href="/calculators/sonotube-concrete-calculator/">Sonotube piers</a></td></tr>
          <tr><td>Roof / re-roof</td><td><a href="/calculators/roof-pitch-calculator/">Pitch</a> → <a href="/calculators/roofing-shingles-calculator/">Shingles</a></td><td><a href="/guides/how-to-measure-roof-pitch/">Measure pitch safely</a></td></tr>
          <tr><td>Painted walls</td><td><a href="/calculators/paint-calculator/">Paint calculator</a></td><td><a href="/guides/how-much-paint-for-a-room/">Room paint guide</a></td></tr>
          <tr><td>Segmental wall</td><td><a href="/calculators/retaining-wall-calculator/">Block calculator</a></td><td><a href="/guides/retaining-wall-blocks-and-base/">Blocks &amp; base guide</a> · <a href="/calculators/paver-base-calculator/">Paver / wall base gravel</a></td></tr>
          <tr><td>Brick or CMU masonry wall</td><td><a href="/calculators/brick-calculator/">Brick / block calculator</a></td><td>Modular brick ≈ 6.86 / sq ft with ⅜&quot; joint</td></tr>
          <tr><td>General lumber takeoff</td><td><a href="/calculators/lumber-calculator/">Lumber / board feet &amp; weight</a></td><td><a href="/guides/lumber-weight-chart/">Weight per foot chart</a> (SPF / DF / SP)</td></tr>
        </tbody>
      </table>
      </div>
      <h2>How to choose what to estimate first</h2>
      <p>Start with geometry (run length, deck footprint, plan roof area, wall face), then layer on waste and related materials. Fence posts drive concrete volume—use the <a href="/guides/how-much-concrete-for-fence-posts/">fence post concrete guide</a> for bag charts before you dig. Deck boards drive joist count and pier locations—run the <a href="/calculators/deck-footing-calculator/">deck footing calculator</a> for pier count and frost-depth bags before you buy cardboard tubes. Roof pitch drives shingle squares; measure safely with <a href="/guides/how-to-measure-roof-pitch/">how to measure roof pitch</a>. Retaining-wall height drives whether you need engineering beyond a simple block count. Clay brick or CMU counts stay on the <a href="/calculators/brick-calculator/">brick estimator</a>.</p>
      <h2>Worked examples</h2>
      <ul>
        <li><strong>48 ft fence at 8 ft spacing:</strong> 6 sections, 7 posts, 18 rails (3 per bay). For 10&quot; × 2.5 ft holes filled solid, plan ~15 × 80 lb bags after 10% waste—use the post-hole tool, not a flat “one bag per post” rule for cylinder fills.</li>
        <li><strong>12×16 deck:</strong> board and joist takeoff in the <a href="/guides/deck-material-list-12x16/">12×16 deck material list</a>; footing count and bags via the <a href="/calculators/deck-footing-calculator/">deck footing calculator</a>, then pier concrete via Sonotube diameter × height.</li>
        <li><strong>16×24 deck:</strong> larger rectangular takeoff in the <a href="/guides/deck-material-list-16x24/">16×24 deck material list</a> (boards, joists, beams, posts, footings).</li>
        <li><strong>40×25 plan roof at 6/12:</strong> area factor ≈ 1.118 → ~11.2 squares before waste; with 10% waste and 3 bundles/square, order about 37 bundles.</li>
      </ul>
      <p>Taller retaining walls and load-bearing decks may need a licensed design—follow manufacturer height charts and local code. Paint coverage varies by brand (this site defaults to 350 sq ft/gal); confirm on the can.</p>
      <h2>Related materials outside this hub</h2>
      <p>Slab reinforcement for deck pads and garage floors: <a href="/calculators/rebar-calculator/">rebar calculator</a> (concrete hub). Driveway paving next to outdoor projects: <a href="/calculators/asphalt-calculator/">asphalt calculator</a> (landscape hub) with gravel base from the landscape tools.</p>
    `,
  },
  lawn: {
    slug: 'lawn',
    name: 'Lawn & garden calculators',
    title: 'Lawn Calculators: Seed, Fertilizer & Topsoil',
    description:
      'Free lawn calculators for grass seed (new lawn and overseed), fertilizer from nitrogen targets, and topsoil for lawns. Rates per 1,000 sq ft.',
    primaryKeyword: 'lawn calculator',
    answerFirst:
      'Convert lawn area into grass-seed pounds and fertilizer product pounds using rates per 1,000 sq ft. A 5,000 sq ft cool-season new lawn at 3.5 lb/1,000 needs about 17.5 lb of seed (use the rate on your bag).',
    introHtml: `
      <h2>How to choose seed rate vs fertilizer rate</h2>
      <p>Seed quantity comes from the species blend on the bag (new-lawn rates are higher than overseed). Fertilizer quantity comes from your nitrogen target and the first N-P-K number. YardTally’s grass-seed defaults (3.5 lb/1,000 new, 1.75 lb/1,000 overseed) are mid cool-season planning figures—always override with the printed bag rate for your mix. Warm-season grasses and specialty blends can sit well outside that band.</p>
      <h2>Worked examples</h2>
      <ul>
        <li><strong>Seed:</strong> 5,000 sq ft × (3.5 lb ÷ 1,000) = 17.5 lb for a new cool-season lawn. The same area overseeded at 1.75 lb/1,000 needs 8.75 lb.</li>
        <li><strong>Sod:</strong> a 50×20 ft lawn (1,000 sq ft) with 5% waste is 1,050 sq ft → about 105 rolls at 10 sq ft each or 3 pallets at 450 sq ft—see the <a href="/calculators/sod-calculator/">sod calculator</a>.</li>
        <li><strong>Fertilizer:</strong> Target 1 lb N per 1,000 sq ft with a 25-0-5 product → product = 1 ÷ 0.25 = 4 lb per 1,000 sq ft. For 5,000 sq ft that is 20 lb of product (half of a 40 lb bag).</li>
        <li><strong>Raised bed next to the lawn:</strong> an 8×4 ft bed 12 inches deep needs 32 cu ft (~1.2 cu yd) of mix—see the <a href="/calculators/raised-bed-soil-calculator/">raised bed soil calculator</a>.</li>
      </ul>
      <h2>Seasonal lawn calendar (planning)</h2>
      <div class="table-scroll">
      <table>
        <caption>Typical cool-season timing—confirm with local extension</caption>
        <thead><tr><th>Season</th><th>Common tasks</th><th>YardTally tools</th></tr></thead>
        <tbody>
          <tr><td>Early spring</td><td>Soil test, light cleanup, pre-emergent where appropriate</td><td><a href="/calculators/fertilizer-calculator/">Fertilizer</a> · <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">N per 1,000 sq&nbsp;ft guide</a></td></tr>
          <tr><td>Late summer / early fall</td><td>Best window for cool-season seed and overseed</td><td><a href="/calculators/grass-seed-calculator/">Grass seed</a> · <a href="/calculators/sod-calculator/">Sod calculator</a> · <a href="/guides/grass-seed-per-sq-ft/">Seed rates guide</a></td></tr>
          <tr><td>Fall</td><td>Nitrogen feeding per local calendar; topdress thin spots</td><td><a href="/calculators/topsoil-calculator/">Topsoil</a> · <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">Fertilizer nitrogen guide</a></td></tr>
          <tr><td>Anytime (beds)</td><td>Raised-bed fills next to the lawn</td><td><a href="/calculators/raised-bed-soil-calculator/">Raised bed soil</a></td></tr>
        </tbody>
      </table>
      </div>
      <h2>Sod vs seed on the same lawn</h2>
      <p>Sod is ordered in square feet (rolls or pallets) with a small waste factor for cuts. Seed is ordered in pounds from a rate per 1,000 sq ft on the bag. Don't mix the units: a 1,000 sq ft lawn with 5% sod waste is 1,050 sq ft of turf (about three 450 sq ft pallets at the common planning default), while the same area seeded at 3.5 lb/1,000 needs 3.5 lb of cool-season blend—not “one pallet of seed.” Run the <a href="/calculators/sod-calculator/">sod calculator</a> when the ticket lists roll coverage; stay on the grass-seed tool for broadcast or slit-seed jobs.</p>
      <h2>Nitrogen label math (quick)</h2>
      <p>Product pounds per 1,000 sq ft = target lb N ÷ (N% ÷ 100). A 25-0-5 bag at 1 lb N/1,000 needs 4 lb of product per 1,000. Multiply by lawn thousands for the whole yard, then divide by bag weight for bag count. The <a href="/calculators/fertilizer-calculator/">fertilizer calculator</a> and <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">nitrogen per 1,000 sq ft</a> guide walk the same arithmetic with worked tables.</p>
      <h2>Common mistakes</h2>
      <ul>
        <li>Using new-lawn seed rates for overseeding (usually too much seed).</li>
        <li>Applying fertilizer by bag count without dividing by the nitrogen percentage.</li>
        <li>Skipping a soil test when pH or phosphorus limits growth more than nitrogen.</li>
        <li>Assuming one national calendar fits every USDA hardiness zone.</li>
        <li>Ordering sod from a seed rate, or seed by the pallet, without converting units.</li>
      </ul>
      <p>Start with the <a href="/guides/fertilizer-nitrogen-per-1000-sq-ft/">fertilizer nitrogen per 1,000&nbsp;sq&nbsp;ft</a> guide for label math, then the <a href="/guides/grass-seed-per-sq-ft/">grass seed per sq&nbsp;ft</a>, <a href="/guides/topsoil-vs-garden-soil/">topsoil vs garden soil</a>, and <a href="/guides/raised-bed-soil-mix-4x8/">4×8 raised bed mix</a> guides.</p>
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
      'concrete calculator bags',
    ],
    title: 'Concrete Slab Calculator: Yards, Bags & Rebar',
    description:
      'Free concrete slab calculator for yards and 40/60/80 lb bags. Size 10×10, 12×12, and 20×20 at 4–6 inches, add waste, and see when a ready-mix truck makes sense.',
    h1: 'Concrete Slab Calculator: Yards, Bags & Rebar',
    answerFirst:
      'This concrete slab calculator turns length × width × thickness into cubic yards and 40/60/80 lb bags. A 10×10 slab at 4 inches is about 1.23 cu yd (≈62 × 80 lb bags after 10% waste). Add waste, compare bag vs ready-mix, and open the size table below for 12×12 and 20×20.',
    summary: 'Concrete slab calculator for yards, bags, and common patio sizes.',
    calculatorId: 'concrete',
    relatedSlugs: [
      'concrete-steps-calculator',
      'concrete-footing-calculator',
      'concrete-slab-cost-calculator',
      'concrete-calculator-post-holes',
      'sonotube-concrete-calculator',
      'deck-footing-calculator',
      'rebar-calculator',
      'brick-calculator',
    ],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'how-much-concrete-do-i-need',
      'concrete-slab-thickness',
      'concrete-for-10x10-slab',
      'how-much-concrete-for-fence-posts',
      'how-much-concrete-in-a-sonotube',
      'sonotube-footing-and-depth',
    ],
    faq: [
      {
        question: 'How much concrete for a 10×10, 12×12, or 20×20 slab?',
        answer:
          'At 4 inches before waste: 10×10 ≈ 1.23 cu yd, 12×12 ≈ 1.78 cu yd, 20×20 ≈ 4.94 cu yd. At 6 inches those footprints are about 1.85 / 2.67 / 7.41 cu yd. With 10% waste and 80 lb bags (≈0.60 cu ft), plan roughly 62 / 89 / 245 bags at 4 inches. Enter your size above for exact yards and bags; see the size table on this page.',
      },
      {
        question: 'How many bags of concrete do I need?',
        answer:
          'Convert your pour to cubic feet, divide by the bag yield, then round up and add waste. Standard planning yields are about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags. Example: a 10×10×4″ slab is 33.33 cu ft → about 1.23 cu yd; with 10% waste that is 62 × 80 lb bags or 82 × 60 lb bags.',
      },
      {
        question: 'How much extra concrete should I order?',
        answer:
          'Plan about 5–10% extra for uneven subgrade, form bulge, and spillage. DIY bag mixes usually sit at the high end of that band. This calculator’s waste field defaults to 10%. Order a little more rather than finishing a pour short—cold joints are hard to hide.',
      },
      {
        question: 'When do I need a ready-mix truck?',
        answer:
          'Bags are practical under about one cubic yard. Past that—or any continuous large slab—ready-mix is usually less labor if a truck can reach the forms. Ask the plant about short-load fees and minimum yards. This tool rounds ready-mix orders up to the next ¼ cu yd after waste.',
      },
      {
        question: 'How many 80 lb bags of concrete in a yard?',
        answer:
          'One cubic yard is 27 cubic feet. At about 0.60 cu ft per 80 lb bag, you need roughly 45 bags per cubic yard (27 ÷ 0.60) before waste—about 50 bags after a 10% waste factor. Confirm the yield printed on the bag you buy.',
      },
      {
        question: 'How thick should a concrete slab be?',
        answer:
          'Many residential patio and shed slabs use 4 inches over compacted base. Driveways and heavier loads often need 5–6 inches plus reinforcement—confirm with local code. This tool estimates volume only; pair it with the rebar calculator for bar counts.',
      },
      {
        question: 'Concrete calculator for slabs vs Sonotube vs post holes?',
        answer:
          'Use this concrete calculator for rectangular slabs, footings, and solid steps. Use the Sonotube concrete calculator for cardboard tube forms (deck piers). Use the post hole calculator for dug fence or sign holes without a tube. Same bag yields; different shapes.',
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
    dateModified: '2026-11-22',
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
    title: 'Concrete for Post Holes: Bags per Post',
    description:
      'Calculate concrete for fence post holes by diameter, depth, and post count. Get cubic yards and 40/60/80 lb bags per post before you dig.',
    h1: 'Concrete for Post Holes: Bags per Post',
    answerFirst:
      'Concrete for post holes equals the cylinder volume of each hole times the number of posts: π × (diameter÷2)² × depth. An 8-inch-wide, 2-foot-deep hole is about 0.70 cu ft—about two 60 or 80 lb bags after 10% waste. Multiply by your post count; Fast-Setting dry-pour methods may use fewer bags.',
    summary: 'Fence and sign post hole concrete by diameter, depth, and count.',
    calculatorId: 'post-holes',
    relatedSlugs: [
      'concrete-calculator',
      'sonotube-concrete-calculator',
      'fence-calculator',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-for-fence-posts',
      'how-many-bags-of-concrete',
      'how-much-concrete-in-a-sonotube',
    ],
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
    dateModified: '2026-11-22',
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
      'how much concrete for sonotube',
      'how many bags of concrete for sonotube',
    ],
    title: 'Sonotube Calculator: Bags & Yards by Size',
    description:
      'Free Sonotube calculator for 8–36″ tubes. Get bags and cubic yards by diameter and height, with optional bell or pad footing and bags-per-foot charts.',
    h1: 'Sonotube Calculator: Bags & Yards by Size',
    answerFirst:
      'Sonotube volume is π × (inside Ø ÷ 2)² × height. A 12″ × 4 ft tube is about 3.14 cu ft—six 80 lb bags before waste (QUIKRETE 1101). Add an optional bell or pad when required, mix two diameters in one run, and keep about 5% waste for spillage.',
    summary: 'Round pier forms with optional bell/pad, mixed sizes, and bags-per-foot.',
    calculatorId: 'sonotube',
    relatedSlugs: [
      'concrete-calculator',
      'concrete-footing-calculator',
      'concrete-calculator-post-holes',
      'deck-footing-calculator',
      'deck-material-calculator',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-in-a-sonotube',
      'sonotube-footing-and-depth',
      'how-much-concrete-for-fence-posts',
      'how-many-bags-of-concrete',
      'deck-material-list-16x24',
    ],
    faq: [
      {
        question: 'How many bags of concrete per foot of Sonotube?',
        answer:
          'Per foot before waste, bags = ceil(π × (Ø÷24)² ÷ yield) with QUIKRETE 1101 yields of about 0.30 / 0.375 / 0.45 / 0.60 cu ft for 40 / 50 / 60 / 80 lb. A 12″ tube is about 0.785 cu ft/ft → 3 / 3 / 2 / 2 bags. Multiply by height and pier count, then add waste. See the bags-per-foot table on this page.',
      },
      {
        question: 'Can this Sonotube calculator include a footing bell or pad?',
        answer:
          'Yes. Choose bell (truncated cone) or circular pad under the tube to add that volume before waste. Required sizes come from local code or a plan—this tool only estimates concrete volume. Rectangular strip footings use the main concrete calculator.',
      },
      {
        question: 'Can I mix different Sonotube diameters in one run?',
        answer:
          'Yes. Enter size A diameter/height/count, then optional size B. Volumes are summed before bag conversion. Example: two 12″×4 ft plus two 10″×3 ft is about 12.8 cu ft before waste.',
      },
      {
        question: 'How many bags of concrete for a Sonotube?',
        answer:
          'Volume = π × r² × height using inside diameter, then divide by bag yield and round up. A 12″ × 4 ft Sonotube is about 3.14 cu ft—plan on six 80 lb bags, seven 60 lb bags, nine 50 lb bags, or eleven 40 lb bags before waste (QUIKRETE 1101 yields). Multiply by pier count; the calculator adds a default 5% waste for spillage. Optional bell/pad volume is extra when selected.',
      },
      {
        question: 'How much concrete for a 12-inch Sonotube?',
        answer:
          'Per foot of height, a 12″ tube needs about 0.785 cu ft. A 4 ft pier is ~3.14 cu ft (~0.12 cu yd)—six 80 lb bags before waste (still six after the default 5% waste at 0.60 cu ft/bag). Shorter 2 ft and 3 ft piers need about three and four 80 lb bags.',
      },
      {
        question: 'Is this a Sonotube concrete calculator for cardboard forms?',
        answer:
          'Yes. Enter inside diameter, height, and tube count to get cubic feet, cubic yards, and bag counts for Sonotube and other round cardboard concrete forms. Dug fence posts without a tube use the post hole concrete calculator instead; rectangular pads use the slab concrete calculator.',
      },
      {
        question: 'How do I convert Sonotube volume to cubic yards?',
        answer:
          'Cubic yards = cubic feet ÷ 27. The 12″ × 4 ft example (3.14 cu ft) is about 0.12 cu yd per tube before waste. Enter diameter, height, and count above to see yards and bags together.',
      },
      {
        question: 'Is Sonotube diameter inside or outside?',
        answer:
          'Use the inside diameter (the clear form size) for concrete volume. Manufacturers label common sizes such as 8″, 10″, and 12″. Outside cardboard thickness is not filled with concrete.',
      },
      {
        question: 'Sonotube calculator vs slab or post hole calculator?',
        answer:
          'Use this Sonotube tool for cardboard column and pier forms. Use the slab concrete calculator for rectangles and steps. Use the post hole calculator and the fence post concrete guide for dug fence or sign holes without a tube—same cylinder math, different defaults and job details.',
      },
    ],
    sources: [
      {
        label: 'Sonotube concrete forms – product sizing',
        href: 'https://www.sonotube.com/sonotube-concrete-forms',
        usedFor: 'Inside diameter / form sizing for round tubes',
        checked: '2026-11-15',
      },
      {
        label: 'QUIKRETE Concrete Mix 1101 – Technical data',
        href: 'https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf',
        usedFor: 'Bag yields (~0.30 / 0.375 / 0.45 / 0.60 cu ft for 40 / 50 / 60 / 80 lb)',
        checked: '2026-11-15',
      },
    ],
    sectionsHtml: toolBodies['sonotube-concrete-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'concrete-footing-calculator',
    name: 'Concrete Footing Calculator',
    shortName: 'Footings',
    category: 'concrete',
    primaryKeyword: 'concrete footing calculator',
    secondaryKeywords: [
      'strip footing calculator',
      'footing concrete calculator',
      'pad footing calculator',
      'continuous footing calculator',
      'how much concrete for a footing',
    ],
    title: 'Concrete Footing Calculator: Strip & Pad',
    description:
      'Free concrete footing calculator for strip and pad footings. Enter length, width, and depth for cubic yards, waste, and 40/60/80 lb bag counts.',
    h1: 'Concrete Footing Calculator: Strip & Pad',
    answerFirst:
      'Strip and pad footings use length × width × depth × count. A 40 ft run 16 in wide by 8 in deep is about 35.6 cu ft (1.32 cu yd) before waste—about 66 × 80 lb bags after 10%. Bag yields follow QUIKRETE/Sakrete (~0.30/0.45/0.60 cu ft). Optional rebar is a planning takeoff, not a design.',
    summary: 'Strip and pad footing yards, bags, and optional rebar.',
    calculatorId: 'footing',
    relatedSlugs: [
      'concrete-calculator',
      'concrete-slab-cost-calculator',
      'deck-footing-calculator',
      'rebar-calculator',
      'sonotube-concrete-calculator',
      'concrete-calculator-post-holes',
    ],
    relatedGuideSlugs: [
      'how-many-bags-of-concrete',
      'how-much-concrete-do-i-need',
      'concrete-slab-thickness',
      'sonotube-footing-and-depth',
      'how-much-concrete-in-a-sonotube',
    ],
    faq: [
      {
        question: 'How much concrete for a strip footing?',
        answer:
          'Multiply length × width × depth (all in feet) × number of segments. A 40 ft × 16 in × 8 in strip is about 35.6 cu ft (1.32 cu yd) before waste; with 10% waste plan about 66 × 80 lb bags at 0.60 cu ft per bag. Enter the same dimensions above for live totals.',
      },
      {
        question: 'How do I calculate pad footing concrete?',
        answer:
          'Use the same rectangle formula per pad, then multiply by pad count. Four 3×3×12 in pads are 36 cu ft (~1.33 cu yd) before waste. Switch footing type to Spread pad and set Count to the number of pads.',
      },
      {
        question: 'How many bags of concrete for a footing?',
        answer:
          'Convert the footing to cubic feet with waste, then divide by bag yield and round up. Standard planning yields are about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags (QUIKRETE / Sakrete). Confirm the yield printed on the bag you buy.',
      },
      {
        question: 'Does this footing calculator include rebar?',
        answer:
          'Optionally. Turn Rebar estimate On for a planning stick count (longitudinal + transverse for strip; each-way grid for pads). It does not design bar size, spacing, cover, or laps—follow drawings and local code. Full slab mats also have a dedicated rebar calculator.',
      },
      {
        question: 'Footing calculator vs slab or Sonotube calculator?',
        answer:
          'Use this page for continuous/strip and spread pad footings with count and optional rebar. Use the slab concrete calculator for patio/garage slabs and solid steps. Use the Sonotube calculator for round cardboard pier forms, and the post-hole tool for dug fence holes.',
      },
    ],
    sources: [
      {
        label: 'QUIKRETE Concrete Mix 1101 – Technical data',
        href: 'https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf',
        usedFor: '40/60/80 lb bag yield planning figures (~0.30 / 0.45 / 0.60 cu ft)',
        checked: '2026-11-19',
      },
      {
        label: 'Sakrete High-Strength Concrete Mix – TDS',
        href: 'https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf',
        usedFor: 'Cross-check bag coverage for bagged concrete (~0.30 / 0.45 / 0.60 cu ft)',
        checked: '2026-11-19',
      },
      {
        label: 'ACI 332.1R-18 preview – Guide to Residential Concrete Construction',
        href: 'https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf',
        usedFor: 'Residential concrete practice overview (preview PDF); footing design is not performed here',
        checked: '2026-11-19',
      },
    ],
    sectionsHtml: toolBodies['concrete-footing-calculator'],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'mulch-calculator',
    name: 'Mulch Calculator',
    shortName: 'Mulch',
    category: 'landscape',
    primaryKeyword: 'how much mulch do I need',
    secondaryKeywords: [
      'mulch calculator',
      'mulch calculator bags',
      'mulch calculator cubic yards',
      'mulch bags vs bulk',
      'how much will 25 bags of mulch cover',
      '3-3-3 rule for mulch',
    ],
    title: 'Mulch Calculator: Cubic Yards & Bags',
    description:
      'Free mulch calculator for cubic yards and 2 or 3 cu ft bags. Enter bed area and depth to compare bag vs bulk before you order.',
    h1: 'Mulch Calculator: Cubic Yards & Bags',
    answerFirst:
      'Mulch volume equals area × depth. At 3 inches, one cubic yard covers about 108 sq ft (UF/IFAS). A 10×10 bed at 3 inches needs 25 cu ft—about thirteen 2 cu ft bags. Bags suit small beds; bulk usually costs less near a yard. UVM’s 3-3-3 tree tip: 3 inches deep, 3 inches off the trunk, ~3 feet wide.',
    summary: 'Bed mulch in cubic yards and bag counts.',
    calculatorId: 'mulch',
    relatedSlugs: [
      'mulch-calculator-tree-rings',
      'topsoil-calculator',
      'raised-bed-soil-calculator',
      'mulch-calculator-circular-beds',
    ],
    relatedGuideSlugs: [
      'mulch-depth-guide',
      'mulch-for-common-garden-beds',
      'topsoil-vs-garden-soil',
    ],
    faq: [
      {
        question: 'How much mulch do I need for 100 sq ft?',
        answer:
          'At 3 inches deep: 100 × 0.25 = 25 cu ft ≈ 0.93 cu yd, or thirteen 2 cu ft bags (nine 3 cu ft bags). At 2 inches the same bed needs about 16.7 cu ft. UF/IFAS notes one cubic yard covers about 108 sq ft at 3 inches.',
      },
      {
        question: 'How many bags in a cubic yard of mulch?',
        answer:
          'A cubic yard is 27 cu ft, so 27÷2 = 13.5 of the common 2 cu ft bags (plan on 14 at the register) or nine 3 cu ft bags.',
      },
      {
        question: 'Is it cheaper to buy mulch by the yard or by the bag?',
        answer:
          'Bulk usually costs less per cubic foot once you need about a cubic yard or more and can take delivery. Bags are better for small beds and touch-ups. Iowa notes bags are commonly 2 or 3 cu ft—divide your cubic feet by the size on the package. Enter your local prices above to compare.',
      },
      {
        question: 'How much will 25 bags of mulch cover?',
        answer:
          'If they are 2 cu ft bags, that is 50 cu ft—about 200 sq ft at 3 inches or about 300 sq ft at 2 inches. If they are 3 cu ft bags, 25 bags are 75 cu ft (about 300 sq ft at 3 inches). Always check the bag size.',
      },
      {
        question: 'What is the 3-3-3 rule for mulch?',
        answer:
          'UVM Extension cites a 3-3-3 method for mature trees: at least 3 inches from the trunk, no more than 3 inches deep, and about 3 feet of mulch diameter. Keep a donut clear of the bark—never a mulch volcano. Other extensions use similar clearance and depth guidance without the slogan.',
      },
      {
        question: 'How deep should I set the mulch calculator?',
        answer:
          'Most flower beds and gardens use about 2–3 inches of organic mulch. See the mulch depth guide for extension ranges, then enter that depth here for bags and yards.',
      },
    ],
    sources: [
      {
        label: 'Iowa State Extension – How to determine amount of mulch needed',
        href: 'https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed',
        usedFor: 'Volume method (area × depth) for garden beds; 2 / 3 cu ft bags',
        checked: '2026-11-22',
      },
      {
        label: 'UF/IFAS Gardening Solutions – Choosing and installing mulches',
        href: 'https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/',
        usedFor: '~108 sq ft per cu yd at 3 inches; mulch depth and installation',
        checked: '2026-11-22',
      },
      {
        label: 'University of Vermont Extension – Beware the mulch volcano',
        href: 'https://www.uvm.edu/extension/news/beware-mulch-volcano',
        usedFor: '3-3-3 tree mulch method; no mulch against bark',
        checked: '2026-11-22',
      },
      {
        label: 'Mississippi State Extension – Mulches for the landscape',
        href: 'https://extension.msstate.edu/publications/mulches-for-the-landscape',
        usedFor: 'Landscape mulch practice overview; trunk clearance',
        checked: '2026-11-22',
      },
      {
        label: 'Clemson HGIC – Mulch',
        href: 'https://hgic.clemson.edu/factsheet/mulch/',
        usedFor: 'Extension mulch depth and care notes',
        checked: '2026-11-22',
      },
    ],
    sectionsHtml: toolBodies['mulch-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-22',
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
    title: 'Tree Ring Mulch Calculator: Donut Volume',
    description:
      'Tree ring mulch calculator for donut volume around a trunk. Enter outer and inner diameters plus depth for yards and bags without volcano mulch.',
    h1: 'Tree Ring Mulch Calculator: Donut Volume',
    answerFirst:
      'Tree-ring mulch volume uses a donut (annulus): π × (R_outer² − R_trunk²) × depth. Leave a small bare gap at the trunk flare—do not pile mulch against bark. A 6 ft wide ring around a 1 ft trunk at 3 inches deep needs about 7 cu ft of mulch.',
    summary: 'Annular mulch rings around trees by outer and trunk diameter.',
    calculatorId: 'tree-ring-mulch',
    relatedSlugs: [
      'mulch-calculator',
      'topsoil-calculator',
      'mulch-calculator-circular-beds',
    ],
    relatedGuideSlugs: [
      'mulch-depth-guide',
      'mulch-for-common-garden-beds',
      'topsoil-vs-garden-soil',
    ],
    faq: [
      {
        question: 'Why subtract the inner circle?',
        answer:
          'Tree-ring mulch is a donut: keep mulch off the trunk flare. Volume uses the outer circle minus the mulch-free inner circle, times depth.',
      },
      {
        question: 'How deep should tree-ring mulch be?',
        answer:
          'Keep a shallow, even layer and never volcano-mulch against the bark. Extension guidance emphasizes leaving the root flare visible.',
      },
      {
        question: 'Can I pile mulch against the trunk?',
        answer:
          'No. Mulch volcanoes trap moisture against bark and can encourage pests and decline. Leave a clear collar at the trunk.',
      },
      {
        question: 'How do I convert ring volume to bags?',
        answer:
          'Read cubic feet from the calculator, then divide by the coverage or volume printed on the mulch bag.',
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'gravel-calculator',
    name: 'Gravel Calculator',
    shortName: 'Gravel',
    category: 'landscape',
    primaryKeyword: 'gravel calculator',
    secondaryKeywords: ['crushed stone calculator', 'how much gravel do I need'],
    title: 'Gravel Calculator: Tons & Cubic Yards',
    description:
      'Free gravel calculator for tons and cubic yards from area and depth. Plan driveway base, patio base, and walkways with compaction waste.',
    h1: 'Gravel Calculator: Tons & Cubic Yards',
    answerFirst:
      'Gravel needed equals length × width × depth, converted to cubic yards (÷27). Many crushed-stone products weigh about 1.3–1.4 tons per cubic yard; this tool uses ~2,700 lb/yd³ as a mid estimate and converts tons↔yards both ways. Optional prices compare bulk yards/tons vs 0.5 cu ft bags. Add ~10% for compaction on driveways and paths.',
    summary: 'Driveway and path gravel in yards and tons.',
    calculatorId: 'gravel',
    relatedSlugs: [
      'french-drain-gravel-calculator',
      'sand-calculator',
      'paver-calculator',
      'asphalt-calculator',
      'concrete-calculator',
      'retaining-wall-calculator',
      'paver-base-calculator',
    ],
    relatedGuideSlugs: ['gravel-types-for-driveways', 'paver-base-gravel-and-sand-depth'],
    faq: [
      {
        question: 'How much gravel for a driveway at 4 inches?',
        answer:
          'Volume (cu ft) = area × (4÷12). A 10×50 ft drive at 4 inches is 167 cu ft ≈ 6.2 cu yd before waste; with 10% compaction ≈ 6.8 cu yd ≈ 9.2 tons at 2,700 lb/yd³. Enter your length, width, and compacted depth above.',
      },
      {
        question: 'How many tons of gravel per cubic yard?',
        answer:
          'At YardTally’s mid crushed-stone density (~2,700 lb/yd³), one cubic yard weighs about 1.35 tons. Moisture and rock type move that number—confirm with your stone yard ticket. Tons ↔ yards convert both ways in this calculator.',
      },
      {
        question: 'How much gravel for a 10×10 or 12×12 slab base?',
        answer:
          'At 4 inches before waste: 10×10 ≈ 1.23 cu yd; 12×12 ≈ 1.78 cu yd. With 10% compaction allowance, plan about 1.35 / 1.96 cu yd. Convert to tons with your density (default ~1.35 ton/yd). Decorative #57 surface stone is often shallower than structural base.',
      },
      {
        question: 'What depth should I use for a driveway base?',
        answer:
          'Depth depends on soil, traffic, and local practice. Enter the compacted depth your plan calls for; decorative surface stone is often shallower than structural base. See the driveway gravel types guide for base vs surface stone.',
      },
      {
        question: 'Should I order by the yard, by the ton, or in bags?',
        answer:
          'Use cubic yards when pricing by volume, tons when the quarry sells by weight, and 0.5 cu ft bags for small patches. Optional price fields compare those options using your local quotes only—no invented retail prices.',
      },
      {
        question: 'Do I need a waste factor?',
        answer:
          'Yes for irregular edges and compaction loss. Add about 10% so the delivered load covers the finished depth.',
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
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'french-drain-gravel-calculator',
    name: 'French Drain Gravel Calculator',
    shortName: 'French drain',
    category: 'landscape',
    primaryKeyword: 'french drain gravel calculator',
    secondaryKeywords: [
      'french drain calculator',
      'how much gravel for a french drain',
      'french drain fabric calculator',
    ],
    title: 'French Drain Gravel: Stone & Pipe by Length',
    description:
      'French drain gravel calculator for stone yards and tons by trench length. Subtract pipe volume and estimate landscape fabric wrap for the run.',
    h1: 'French Drain Gravel: Stone & Pipe by Length',
    answerFirst:
      'French drain gravel equals trench volume minus the perforated pipe cylinder, then ÷27 for cubic yards. LSU AgCenter cites residential trenches about 12–18 in wide and 18–24 in deep with ~4 in pipe. Enter your sizes, density for tons (default ~2,700 lb/yd³), and read fabric wrap area plus pipe length.',
    summary: 'French drain trench gravel (pipe subtracted), tons, fabric area, and pipe length.',
    calculatorId: 'french-drain',
    relatedSlugs: [
      'gravel-calculator',
      'retaining-wall-calculator',
      'sand-calculator',
      'topsoil-calculator',
    ],
    relatedGuideSlugs: ['gravel-types-for-driveways', 'retaining-wall-blocks-and-base'],
    faq: [
      {
        question: 'How much gravel for a 50 ft or 100 ft French drain?',
        answer:
          'Use trench L×W×D minus pipe volume, then ÷27. At 12 in wide × 18 in deep with 4 in pipe and 10% waste: 50 ft ≈ 2.9 cu yd; 100 ft ≈ 5.7 cu yd (defaults on this page). Scale with your width and depth—enter the run length above.',
      },
      {
        question: 'What trench width and depth for a French drain?',
        answer:
          'LSU AgCenter cites residential trenches about 12–18 in wide and 18–24 in deep with ~4 in perforated pipe. Softer soils and higher flow may need larger sections—confirm local practice. This tool estimates materials, not hydraulics.',
      },
      {
        question: 'Do I need landscape fabric and perforated pipe?',
        answer:
          'Yes for a classic wrapped French drain: geotextile fabric, perforated pipe, and washed drain rock. Fabric keeps fines out of the stone; pipe carries water along the trench. This calculator returns fabric wrap area and pipe length with the gravel volume.',
      },
      {
        question: 'How much slope does a French drain need?',
        answer:
          'WSU Extension notes about 0.5–1% slope (roughly 1/16–⅛ in per foot) as common planning guidance so water moves toward the outlet. Keep the trench grade continuous; this calculator does not design slope or outlet details.',
      },
      {
        question: 'What size stone (washed #57 or ¾ in.)?',
        answer:
          'Washed drain rock / #57-style stone is a common French-drain fill—follow your local detail. Enter density for tons (default ~2,700 lb/yd³). Moisture and rock type change delivered weight more than volume.',
      },
    ],
    sources: [
      {
        label: 'LSU AgCenter – Installing and Maintaining a French Drain',
        href: 'https://www.lsuagcenter.com/articles/page1684941508413',
        usedFor:
          'Residential trench width/depth ranges (~12–18 in × 18–24 in), ~4 in perforated pipe, washed gravel, geotextile wrap context',
        checked: '2026-11-19',
      },
      {
        label: 'City of Norfolk – Infiltration / French drain DIY notes',
        href: 'https://www.norfolk.gov/DocumentCenter/View/77565/Infiltration',
        usedFor: 'Minimum trench size band, non-woven geotextile, washed gravel, slope notes',
        checked: '2026-11-19',
      },
      {
        label: 'Washington State University Extension – Improving Drainage (PDF)',
        href: 'https://wpcdn.web.wsu.edu/wp-extension/uploads/sites/2079/2014/02/water-diversion.pdf',
        usedFor: 'Geotextile-lined trench with perforated pipe in gravel; ~0.5–1% slope guidance',
        checked: '2026-11-19',
      },
    ],
    sectionsHtml: toolBodies['french-drain-gravel-calculator'],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
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
    title: 'Topsoil Calculator: Yards & Bags for Lawns',
    description:
      'Topsoil calculator for cubic yards and bags for lawns and beds. Convert area and depth into yards, bags, and approximate tons.',
    h1: 'Topsoil Calculator: Yards & Bags for Lawns',
    answerFirst:
      'Topsoil volume is area × depth. To add 2 inches over 500 sq ft: 500 × (2÷12) = 83.3 cu ft ≈ 3.1 cu yd. This tool estimates tons at ~2,200 lb/yd³, counts 0.5 cu ft bags, and converts tons↔yards both ways. Optional prices compare bulk vs bags—no invented retail prices. Include ~10% for settling.',
    summary: 'Lawn and garden topsoil depth to yards.',
    calculatorId: 'topsoil',
    relatedSlugs: [
      'mulch-calculator',
      'raised-bed-soil-calculator',
      'sand-calculator',
    ],
    relatedGuideSlugs: ['topsoil-vs-garden-soil', 'raised-bed-soil-mix-4x8', 'grass-seed-per-sq-ft'],
    faq: [
      {
        question: 'How much topsoil to level a yard?',
        answer:
          'Measure average fill depth across the area. Even 1 inch over 1,000 sq ft is 1,000 × (1 ÷ 12) ≈ 83 cu ft (~3.1 cu yd). Deep low spots should be measured separately.',
      },
      {
        question: 'How do I convert topsoil yards to tons or bags?',
        answer:
          'Tons ≈ yards × (2,200 ÷ 2,000) with this tool’s mid density (~1.1 ton/yd³)—confirm moisture with your yard. For common 0.5 cu ft bags, divide cubic feet by 0.5 and round up. Optional convert-tons and price fields compare weight, volume, and bag totals.',
      },
      {
        question: 'Should I add waste for settling?',
        answer:
          'Yes. Include about 10% extra when ordering so settling and uneven grade do not leave thin spots after spreading.',
      },
      {
        question: 'Is topsoil the same as garden soil or raised-bed mix?',
        answer:
          'Not always. Screened topsoil is common for lawn leveling; garden blends and raised-bed mixes usually include more compost. Compare products in the topsoil vs garden soil guide, and use the raised bed soil calculator when filling boxes.',
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'sand-calculator',
    name: 'Sand Calculator',
    shortName: 'Sand',
    category: 'landscape',
    primaryKeyword: 'sand calculator',
    secondaryKeywords: ['paver sand calculator', 'how much sand do I need'],
    title: 'Sand Calculator: Tons & Yards (Paver, Play)',
    description:
      'Sand calculator for tons and cubic yards for paver beds, play sand, and fills. Enter area and depth to size bulk or bagged sand.',
    h1: 'Sand Calculator: Tons & Yards (Paver, Play)',
    answerFirst:
      'Sand volume uses the same length × width × depth formula as gravel. Paver bedding sand is often about 1 inch deep; playground sand is deeper. A 10×10 area at 1 inch is 8.3 cu ft (~0.31 cu yd). Tons use ~2,700 lb/yd³; optional prices compare bulk vs 0.5 cu ft bags. Add waste for screeding.',
    summary: 'Bedding and fill sand by area and depth.',
    calculatorId: 'sand',
    relatedSlugs: [
      'paver-calculator',
      'gravel-calculator',
      'asphalt-calculator',
      'concrete-calculator',
      'paver-base-calculator',
    ],
    relatedGuideSlugs: ['paver-base-gravel-and-sand-depth', 'gravel-types-for-driveways'],
    faq: [
      {
        question: 'How much sand under pavers?',
        answer:
          'A common setting bed is about 1 inch of coarse concrete/bedding sand over a compacted gravel base. Confirm with your paver manufacturer or ICPI-style installation guidance for the system you buy.',
      },
      {
        question: 'Can I use play sand for a paver bed?',
        answer:
          'Usually no. Play sand, masonry sand, and concrete/bedding sand are not interchangeable. Use the product specified for pavers or the mix design.',
      },
      {
        question: 'How do I convert sand yards to tons or bags?',
        answer:
          'Tons ≈ yards × (2,700 ÷ 2,000) with this tool’s mid density (~1.35 ton/yd³)—moisture swings weight. For 0.5 cu ft bags, divide cubic feet by 0.5 and round up. Enter optional convert-tons or local prices to compare bulk vs bags.',
      },
      {
        question: 'Why does sand migrate at the edges?',
        answer:
          'Missing or weak edge restraints let sand and pavers spread under traffic. Install restraints before final compaction and joint filling.',
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'paver-calculator',
    name: 'Paver Calculator',
    shortName: 'Pavers',
    category: 'landscape',
    primaryKeyword: 'paver calculator',
    secondaryKeywords: ['patio paver calculator', 'how many pavers do I need'],
    title: 'Paver Calculator: Count, Sand & Base',
    description:
      'Paver calculator for piece count, bedding sand, and gravel base. Size a patio or walkway with waste so you order enough units and base.',
    h1: 'Paver Calculator: Count, Sand & Base',
    answerFirst:
      'Pavers needed ≈ patio area ÷ paver face area, then add 5–10% waste for cuts. A 10×10 patio with 12×12 inch pavers needs 100 pavers, about 110 with 10% waste. Plan ~1" sand bed and several inches of compacted gravel base.',
    summary: 'Patio paver counts with sand and base volumes.',
    calculatorId: 'paver',
    relatedSlugs: [
      'sand-calculator',
      'gravel-calculator',
      'asphalt-calculator',
      'retaining-wall-calculator',
      'paver-base-calculator',
    ],
    relatedGuideSlugs: ['paver-base-gravel-and-sand-depth', 'gravel-types-for-driveways'],
    faq: [
      {
        question: 'How much waste for paver patterns?',
        answer:
          'Straight stack patterns may need ~5–10%. Diagonal herringbone often needs 10–15% extra for cuts. Buy a few matching dye-lot extras for future repairs.',
      },
      {
        question: 'How many 12×12 inch pavers per square foot?',
        answer:
          'One 12×12 inch paver covers 1 sq ft of face area, so a 100 sq ft patio needs 100 pavers before waste (about 110 with 10% waste).',
      },
      {
        question: 'How deep should sand and gravel base be?',
        answer:
          'A common planning stack is about 1 inch of bedding sand over several inches of compacted crushed stone. Exact base depth depends on soil, traffic, and the paver manufacturer—confirm before excavating.',
      },
      {
        question: 'Does the calculator count edge restraints?',
        answer:
          'No. Order edge restraints, geotextile, and joint sand from the system instructions; this tool estimates paver count plus sand and base volumes from the depths you enter.',
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'fence-calculator',
    name: 'Fence Calculator',
    shortName: 'Fence',
    category: 'outdoor',
    primaryKeyword: 'fence calculator',
    secondaryKeywords: ['fence post calculator', 'picket fence calculator', 'rails and pickets'],
    title: 'Fence Calculator: Posts, Rails & Pickets',
    description:
      'Fence calculator for posts, rails, and pickets by run length and spacing. Estimate concrete per post and material counts for privacy or picket fences.',
    h1: 'Fence Calculator: Posts, Rails & Pickets',
    answerFirst:
      'Fence posts usually equal the number of sections plus one end post. At 8 ft spacing, a 48 ft run needs 6 sections and 7 posts. Rails are sections × rails per bay (often 2–3). Pickets ≈ total inches of run ÷ (picket width + gap).',
    summary: 'Posts, rails, pickets, and post concrete bags.',
    calculatorId: 'fence',
    relatedSlugs: [
      'concrete-calculator-post-holes',
      'deck-material-calculator',
      'lumber-calculator',
      'paint-calculator',
    ],
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts', 'how-much-paint-for-a-room'],
    faq: [
      {
        question: 'How many fence posts for 100 ft?',
        answer:
          'Posts ≈ sections + 1. At 8 ft spacing, 100 ft needs 13 sections and 14 posts; at 6 ft spacing, about 17 sections and 18 posts—before gates and corners. Enter run length and post spacing above.',
      },
      {
        question: 'How far apart should fence posts be?',
        answer:
          'Six to eight feet is common for wood privacy fences. Heavier or taller panels may need closer spacing—check panel specs.',
      },
      {
        question: 'How much concrete per fence post?',
        answer:
          'The default one 80 lb bag is a Fast-Setting dry-pour planning heuristic for small holes, not a full cylinder fill. For solid fills, run the post-hole calculator (e.g. 10″ × 2.5 ft ≈ three 80 lb bags after waste) and override bags-per-post.',
      },
      {
        question: 'How are pickets counted?',
        answer:
          'Pickets ≈ total inches of run ÷ (picket width + gap). Enter the actual face width and gap you will leave so the count matches the finished look. Privacy fences with almost no gap need more pickets per foot.',
      },
      {
        question: 'Does the calculator include gates?',
        answer:
          'A straight run estimate does not design gate hardware. Deduct the gate opening from the picket run and add dedicated gate posts separately after you choose opening width.',
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
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'deck-footing-calculator',
    name: 'Deck Footing Calculator',
    shortName: 'Deck footings',
    category: 'outdoor',
    primaryKeyword: 'deck footing calculator',
    secondaryKeywords: [
      'deck pier calculator',
      'how many footings for a deck',
      'deck post footing calculator',
      'deck concrete footings',
    ],
    title: 'Deck Footing Calculator: Count, Size & Bags',
    description:
      'Deck footing calculator for pier count, hole size, and concrete bags. Enter deck size and spacing to plan frost-depth footings before you dig.',
    h1: 'Deck Footing Calculator: Count, Size & Bags',
    answerFirst:
      'Footing count comes from a spacing grid: posts along = floor(length ÷ post spacing) + 1, times beam rows across the width. Enter your local frost depth for hole depth, plus hole or Sonotube diameter for πr²h volume and 40/60/80 lb bags. Check local code—this is a planning estimate, not a structural design.',
    summary: 'Deck pier count, frost-depth holes, and bag totals.',
    calculatorId: 'deck-footings',
    relatedSlugs: [
      'sonotube-concrete-calculator',
      'concrete-footing-calculator',
      'deck-material-calculator',
      'concrete-calculator-post-holes',
      'concrete-calculator',
    ],
    relatedGuideSlugs: [
      'sonotube-footing-and-depth',
      'how-much-concrete-in-a-sonotube',
      'how-many-bags-of-concrete',
      'deck-material-list-12x16',
      'deck-material-list-16x24',
    ],
    faq: [
      {
        question: 'How many footings for a 12×16 deck?',
        answer:
          'It depends on beam and post spacing, not area alone. Example: 16 ft along with posts at 8 ft → floor(16÷8)+1 = 3 posts along; two beam rows across → 6 footings. Enter your deck size and spacing above, then confirm against span tables and local code.',
      },
      {
        question: 'How many footings does a deck need?',
        answer:
          'This calculator builds a rectangular grid from the post and beam spacing you enter (posts along = floor(length ÷ spacing) + 1). Confirm the layout against span tables, hardware instructions, and local code before you dig.',
      },
      {
        question: 'How deep should deck footings be?',
        answer:
          'Depth usually must reach below the local frost line where frost heave is a risk, unless your jurisdiction allows a frost-protected shallow foundation detail. Enter that frost depth here as hole depth. Do not guess from a national average—ask the building department or read the frost map they enforce.',
      },
      {
        question: 'How much concrete per deck footing?',
        answer:
          'Volume per round pier is π × (form radius)² × depth. A 12-inch form 4 feet deep holds about 3.14 cu ft before waste—roughly six 80 lb bags of standard mix at ~0.60 cu ft per bag (QUIKRETE Concrete Mix 1101). Multiply by footing count and add a small waste factor.',
      },
      {
        question: 'How far apart can deck footings be?',
        answer:
          'Spacing follows beam and joist span limits for your lumber and load—not a single national number. Enter the post spacing your plan allows; closer spacing means more piers and more concrete. This tool does not design beams or post size.',
      },
      {
        question: 'Should I use a Sonotube for deck posts?',
        answer:
          'Cardboard tube forms are common for round deck piers when the plan calls for them. Enter optional Sonotube inside diameter so volume uses the tube, not a wider dug hole. For tube-only takeoffs with a known count, use the Sonotube concrete calculator.',
      },
    ],
    sources: [
      {
        label: 'QUIKRETE Concrete Mix 1101 – Technical data',
        href: 'https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf',
        usedFor: 'Bag yields (~0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb)',
        checked: '2026-11-19',
      },
      {
        label: 'Sonotube concrete forms – product sizing',
        href: 'https://www.sonotube.com/sonotube-concrete-forms',
        usedFor: 'Inside diameter / form sizing for round tubes',
        checked: '2026-11-19',
      },
      {
        label: 'AWC – Deck Construction Guide resources',
        href: 'https://www.awc.org/',
        usedFor: 'Deck framing practice context (not a substitute for code or frost maps)',
        checked: '2026-11-19',
      },
    ],
    sectionsHtml: toolBodies['deck-footing-calculator'],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
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
    title: 'Deck Material Calculator: Boards & Joists',
    description:
      'Free deck material calculator for deck boards, joists, and screws by size. Plan a rectangular deck takeoff with waste before you buy lumber.',
    h1: 'Deck Material Calculator: Boards & Joists',
    answerFirst:
      'Deck boards needed ≈ deck width ÷ board face width, times boards along the length. Joists are typically spaced 16 inches on center: count = floor(length ÷ spacing) + 1, plus rim joists. Screw counts scale with linear feet of decking—often about two fasteners per foot of board.',
    summary: 'Boards, joists, and screws for a rectangular deck.',
    calculatorId: 'deck',
    relatedSlugs: [
      'deck-footing-calculator',
      'sonotube-concrete-calculator',
      'fence-calculator',
      'lumber-calculator',
      'paint-calculator',
      'roof-pitch-calculator',
    ],
    relatedGuideSlugs: [
      'deck-material-list-12x16',
      'deck-material-list-16x24',
      'how-to-measure-roof-pitch',
      'how-much-paint-for-a-room',
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
      {
        question: 'Does this design beams, footings, or stairs?',
        answer:
          'No. It is a rectangular decking and joist takeoff. Size beams, posts, and stairs from code and manufacturer tables—or a qualified designer. For pier count and bag totals, use the deck footing calculator.',
      },
      {
        question: 'How are screw counts estimated?',
        answer:
          'Fastener counts scale with linear feet of decking (often about two fasteners per foot of board). Confirm the pattern required by your decking brand.',
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
    dateModified: '2026-11-19',
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
    title: 'Roof Pitch Calculator: Rise, Run & Degrees',
    description:
      'Roof pitch calculator for rise, run, degrees, and slope factor. Convert 4/12–12/12 pitches and plan shingle area multipliers safely.',
    h1: 'Roof Pitch Calculator: Rise, Run & Degrees',
    answerFirst:
      'Roof pitch is rise over run, usually stated as inches of rise per 12 inches of run (for example 6/12). Angle = arctan(rise÷run). The area factor √(1+(rise/run)²) converts horizontal plan area to actual roof surface area for material estimates.',
    summary: 'Pitch, degrees, percent slope, and area multiplier.',
    calculatorId: 'roof-pitch',
    relatedSlugs: [
      'roofing-shingles-calculator',
      'deck-material-calculator',
      'lumber-calculator',
    ],
    relatedGuideSlugs: ['how-to-measure-roof-pitch', 'how-to-estimate-roofing-shingles'],
    faq: [
      {
        question: 'What is a 6/12 roof pitch?',
        answer:
          'The roof rises 6 inches for every 12 inches of horizontal run. That is about a 26.57° angle and a 50% slope.',
      },
      {
        question: 'How do I measure pitch safely?',
        answer:
          'Prefer measuring rise over run on a rafter in the attic. Use the roof surface only with proper fall protection and dry conditions.',
      },
      {
        question: 'How does pitch affect shingle square footage?',
        answer:
          'Steeper pitches have larger area factors. IKO lists a 6:12 area factor of 1.118 for converting plan area to roof surface before you estimate squares.',
      },
      {
        question: 'Is pitch the same as roofing squares?',
        answer:
          'No. Pitch is geometry (rise/run). Squares are materials (100 sq ft of roof surface). Use this tool for pitch, then the shingle estimator for squares.',
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
    dateModified: '2026-11-19',
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
    title: 'Roofing Shingle Calculator: Squares & Bundles',
    description:
      'Roofing shingle calculator for squares and bundles from plan area and pitch. Add waste for hips and valleys before you order bundles.',
    h1: 'Roofing Shingle Calculator: Squares & Bundles',
    answerFirst:
      'One roofing square covers 100 square feet of roof surface. Multiply plan length × width by the pitch area factor, divide by 100 for squares, then add 10–15% waste. Most asphalt bundles cover about ⅓ square (3 bundles per square).',
    summary: 'Squares and bundles from plan area and pitch.',
    calculatorId: 'roofing',
    relatedSlugs: [
      'roof-pitch-calculator',
      'deck-material-calculator',
      'lumber-calculator',
    ],
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
          'Typically three bundles per square for many asphalt products (about 33.3 sq ft coverage each), but always read the bundle label—coverage varies by brand and laminate vs 3-tab. IKO notes specialty products can need four or five bundles per square.',
      },
      {
        question: 'How do I estimate shingles from square feet?',
        answer:
          'Take roof surface square feet (not just plan footprint), divide by 100 for squares, add waste (often 10–15% for hips/valleys/starter), then multiply squares by bundles per square from the label.',
      },
      {
        question: 'How does roof pitch change the shingle order?',
        answer:
          'Steeper roofs have more surface on the same footprint. Area factor = √(1 + (rise/run)²). At 6/12 the factor is about 1.118; at 8/12 about 1.202. Measure pitch first with the roof pitch calculator, then finish squares and bundles here.',
      },
      {
        question: 'How much waste should I add for shingles?',
        answer:
          'IKO commonly discusses about 10–15% waste for cuts, hips, and valleys. Simple gables can land near the low end; cut-heavy roofs need more. Order starter and ridge products separately from field bundles.',
      },
    ],
    sources: [
      {
        label: 'IKO – How many shingles in a bundle',
        href: 'https://www.iko.com/na/blog/how-many-shingles-in-a-bundle/',
        usedFor: 'Bundles per square and waste guidance',
        checked: '2026-11-15',
      },
      {
        label: 'GAF – How to measure a roofing square',
        href: 'https://www.gaf.com/en-us/blog/your-home/how-to-measure-a-roofing-square-3faec381-6f6f-49ff-841f-114c59108f2a',
        usedFor: 'Square = 100 sq ft definition and coverage practice',
        checked: '2026-11-15',
      },
    ],
    sectionsHtml: toolBodies['roofing-shingles-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-19',
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
    title: 'Paint Calculator: Gallons for Walls & Trim',
    description:
      'Paint calculator for gallons of wall and trim paint. Enter room size, coats, and openings to estimate coverage before you buy cans.',
    h1: 'Paint Calculator: Gallons for Walls & Trim',
    answerFirst:
      'Paint gallons ≈ paintable wall area × coats ÷ coverage. Wall area is perimeter × height (or 2×(L+W)×H for a rectangular room). Subtract doors (~20 sq ft) and windows (~15 sq ft each). At 350 sq ft/gallon, two coats on 400 sq ft need about 2.3 gallons.',
    summary: 'Room paint in gallons and liters with openings deducted.',
    calculatorId: 'paint',
    relatedSlugs: [
      'fence-calculator',
      'deck-material-calculator',
      'lumber-calculator',
    ],
    relatedGuideSlugs: ['how-much-paint-for-a-room'],
    faq: [
      {
        question: 'What coverage should I enter?',
        answer:
          'Use the sq ft per gallon per coat on your paint can. BEHR lists about 250–400 sq ft per gallon per coat for several ULTRA and PREMIUM PLUS interior paints; YardTally defaults to 350 until you override it.',
      },
      {
        question: 'Do I subtract doors and windows?',
        answer:
          'Yes. Enter door and window counts (or areas) so openings are removed from wall area before coats and coverage are applied.',
      },
      {
        question: 'How many coats should I plan?',
        answer:
          'Many interior projects use two finish coats over appropriately primed surfaces. Follow the label for hide, color change, and primer requirements.',
      },
      {
        question: 'Should I buy all gallons from one tint lot?',
        answer:
          'Yes when possible. Round up to whole containers from the same tint batch so wall color stays consistent across the room.',
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'retaining-wall-calculator',
    name: 'Retaining Wall Block Calculator',
    shortName: 'Retaining wall',
    category: 'outdoor',
    primaryKeyword: 'retaining wall calculator',
    secondaryKeywords: ['retaining wall block calculator', 'how many retaining wall blocks'],
    title: 'Retaining Wall Blocks: Count, Base & Fill',
    description:
      'Retaining wall block calculator for face blocks, base gravel, and backfill. Plan a segmental wall takeoff before you order blocks and stone.',
    h1: 'Retaining Wall Blocks: Count, Base & Fill',
    answerFirst:
      'Block count ≈ wall face area ÷ block face area, or courses × blocks per course. Courses = ceil(wall height ÷ block height). Add ~5% waste. Include a compacted gravel base trench in your materials list for drainage and leveling.',
    summary: 'SRW blocks, courses, and base gravel.',
    calculatorId: 'retaining-wall',
    relatedSlugs: [
      'gravel-calculator',
      'french-drain-gravel-calculator',
      'paver-calculator',
      'brick-calculator',
      'concrete-calculator',
      'paver-base-calculator',
    ],
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'grass-seed-calculator',
    name: 'Grass Seed Calculator',
    shortName: 'Grass seed',
    category: 'lawn',
    primaryKeyword: 'grass seed calculator',
    secondaryKeywords: [
      'lawn seed calculator',
      'overseeding calculator',
      'grass seed per 1000 sq ft',
      'grass seed density',
    ],
    title: 'Grass Seed Calculator: New Lawn or Overseed',
    description:
      'Grass seed calculator for new lawn or overseed rates per 1,000 sq ft. Convert lawn area into pounds of seed using the rate on your bag.',
    h1: 'Grass Seed Calculator: New Lawn or Overseed',
    answerFirst:
      'Per 1,000 sq ft: seed needed = (lawn sq ft ÷ 1,000) × the bag rate. Cool-season blends often list about 3–4 lb per 1,000 sq ft for new lawns and roughly half that for overseeding. Always follow the rate printed on your seed bag for the species mix.',
    summary: 'New lawn and overseed seed quantities.',
    calculatorId: 'grass-seed',
    relatedSlugs: [
      'fertilizer-calculator',
      'topsoil-calculator',
      'raised-bed-soil-calculator',
      'sod-calculator',
    ],
    relatedGuideSlugs: ['grass-seed-per-sq-ft', 'fertilizer-nitrogen-per-1000-sq-ft'],
    faq: [
      {
        question: 'What is grass seed density / rate per 1,000 sq ft?',
        answer:
          'Bag labels list seeding rate (lb per 1,000 sq ft), not seeds per square inch. Cool-season blends often sit near 3–4 lb/1,000 for new lawns and about half that for overseed. Enter the printed rate here; species tables live in the grass seed per sq ft guide.',
      },
      {
        question: 'How much grass seed per 1,000 sq ft?',
        answer:
          'Read the bag. Many cool-season blends list about 3–4 lb per 1,000 sq ft for new lawns and a lower overseed rate. This calculator multiplies (area ÷ 1,000) by the rate you enter from the label. Iowa State PM 1072 discusses seeding rates by species—always override with your product label.',
      },
      {
        question: 'Can I use new-lawn rates for overseeding?',
        answer:
          'Usually no—overseeding rates are lower. Too much seed increases competition and waste. Use the overseed rate printed on the bag when thickening existing turf.',
      },
      {
        question: 'Do I enter square feet or acres?',
        answer:
          'Enter square feet. For acreage, multiply acres × 43,560, then apply the per-1,000-sq-ft rate: seed lb = (sq ft ÷ 1,000) × rate.',
      },
      {
        question: 'Should I match the spreader setting to the bag chart?',
        answer:
          'Yes. Calibrate to the bag’s spreader chart, split seed into two perpendicular passes, and keep seed in firm contact with soil for germination.',
      },
    ],
    sources: [
      {
        label: 'Penn State Extension – Turfgrass',
        href: 'https://extension.psu.edu/turfgrass',
        usedFor: 'Cool-season turf seeding context; override with bag rate for your mix',
        checked: '2026-11-07',
      },
      {
        label: 'Iowa State University – PM 1072 Lawn Establishment',
        href: 'https://store.extension.iastate.edu/product/5413',
        usedFor: 'Species seeding-rate context; always prefer the rate on your seed bag',
        checked: '2026-11-13',
      },
    ],
    sectionsHtml: toolBodies['grass-seed-calculator'],
    datePublished: '2026-10-19',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'fertilizer-calculator',
    name: 'Fertilizer Calculator',
    shortName: 'Fertilizer',
    category: 'lawn',
    primaryKeyword: 'fertilizer calculator',
    secondaryKeywords: ['lawn fertilizer calculator', 'nitrogen fertilizer calculator'],
    title: 'Lawn Fertilizer Calculator: lb per 1,000 Sq Ft',
    description:
      'Lawn fertilizer calculator for pounds per 1,000 sq ft from your N-P-K analysis. Covers 10-10-10, starter rates, and product pounds for any lawn size.',
    h1: 'Lawn Fertilizer Calculator: lb per 1,000 Sq Ft',
    answerFirst:
      'Product fertilizer = (area÷1000) × (desired lb nitrogen per 1000 ÷ nitrogen fraction). Example: 1 lb N/1000 sq ft using a 25-0-5 product needs 4 lb of product per 1,000 sq ft because 1 ÷ 0.25 = 4. Match timing to local extension calendars.',
    summary: 'Product pounds from N rate and analysis.',
    calculatorId: 'fertilizer',
    relatedSlugs: [
      'grass-seed-calculator',
      'topsoil-calculator',
      'raised-bed-soil-calculator',
      'sod-calculator',
    ],
    relatedGuideSlugs: ['fertilizer-nitrogen-per-1000-sq-ft', 'grass-seed-per-sq-ft'],
    faq: [
      {
        question: 'How much 10-10-10 fertilizer per 1,000 sq ft?',
        answer:
          '10-10-10 is 10% nitrogen. For 1 lb actual N per 1,000 sq ft you need 1 ÷ 0.10 = 10 lb of product per 1,000. A 5,000 sq ft lawn at that rate needs about 50 lb of 10-10-10. Many established lawns skip or limit phosphorus—confirm with a soil test and local fertilizer rules.',
      },
      {
        question: 'How much starter fertilizer per 1,000 sq ft?',
        answer:
          'Starter products often run higher in phosphorus (middle N-P-K number) for new seed. Use the label’s coverage rate, or set your nitrogen target in this calculator and enter the bag’s first number. Typical starter guidance is on the bag—do not invent a rate. Overseeding established turf may need a different product than bare-soil establishment.',
      },
      {
        question: 'How do I convert a nitrogen rate to product pounds?',
        answer:
          'Product fertilizer = (area ÷ 1,000) × (desired lb nitrogen per 1,000 ÷ nitrogen fraction). Example: 1 lb N/1,000 sq ft using 25-0-5 needs 4 lb of product per 1,000 sq ft because 1 ÷ 0.25 = 4. Match timing to local extension calendars.',
      },
      {
        question: 'Can I use this for liquid lawn fertilizer?',
        answer:
          'Yes for nitrogen math if the label lists N-P-K percent by weight (or clear lb N per gallon). Convert your target lb N into product pounds or gallons using the same N fraction. Hose-end and concentrate products vary—follow the label for water volume and spreader/hose settings; this tool does not replace label mixing charts.',
      },
      {
        question: 'What do N-P-K numbers mean?',
        answer:
          'They are percent nitrogen, phosphate, and potash by weight. A 25-0-5 bag is 25% nitrogen; a 10-10-10 bag is 10% of each.',
      },
      {
        question: 'Is more nitrogen always better?',
        answer:
          'No. Excess nitrogen can burn turf and increase clipping growth without improving root health. Follow extension rate guidance for your grass type and season.',
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
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'raised-bed-soil-calculator',
    name: 'Raised Bed Soil Calculator',
    shortName: 'Raised bed',
    category: 'landscape',
    primaryKeyword: 'raised bed soil calculator',
    secondaryKeywords: ['garden box soil calculator', 'how much soil for raised bed'],
    title: 'Raised Bed Soil Calculator: Cu Ft & Bags',
    description:
      'Raised bed soil calculator for cubic feet and bags of mix. Enter bed length, width, and depth to fill a 4×8 or any rectangular bed.',
    h1: 'Raised Bed Soil Calculator: Cu Ft & Bags',
    answerFirst:
      'Raised bed soil volume = interior length × width × fill depth. An 8×4 ft bed 12 inches deep needs 32 cu ft (~1.2 cu yd). Many gardeners blend topsoil, compost, and aeration materials rather than using a single bagged product.',
    summary: 'Soil fill volume for garden boxes.',
    calculatorId: 'raised-bed',
    relatedSlugs: [
      'topsoil-calculator',
      'mulch-calculator',
      'grass-seed-calculator',
    ],
    relatedGuideSlugs: ['raised-bed-soil-mix-4x8', 'topsoil-vs-garden-soil'],
    faq: [
      {
        question: 'Should I fill the entire depth with potting mix?',
        answer:
          'Deep beds can use bulk topsoil/compost blends for most of the volume and reserve finer mix for the top layer. Avoid pure play sand as the only fill.',
      },
      {
        question: 'How much soil for an 8×4 ft bed 12 inches deep?',
        answer:
          'Interior volume = 8 × 4 × 1 = 32 cu ft (~1.2 cu yd). Enter your actual inside dimensions and fill depth if the box differs.',
      },
      {
        question: 'How do I convert cubic feet to bags?',
        answer:
          'Divide total cubic feet by the cubic feet printed on the bag. Bag sizes vary widely—always use the label volume rather than assuming a standard bag.',
      },
      {
        question: 'Will the soil settle after filling?',
        answer:
          'Yes. Mixes settle after watering. Plan a little extra volume or top up after the first deep watering so the finished surface stays near the rim.',
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
    dateModified: '2026-11-19',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'asphalt-calculator',
    name: 'Asphalt Calculator',
    shortName: 'Asphalt',
    category: 'landscape',
    primaryKeyword: 'asphalt calculator',
    secondaryKeywords: [
      'asphalt driveway calculator',
      'how much asphalt do I need',
      'asphalt tons calculator',
      'blacktop calculator',
      'roadway fill volume calculator',
    ],
    title: 'Asphalt Calculator: Tons for Driveway or Lot',
    description:
      'Asphalt / blacktop calculator for tons from area and depth. Plan driveway or lot paving with compacted thickness and a practical waste allowance.',
    h1: 'Asphalt Calculator: Tons for Driveway or Lot',
    answerFirst:
      'Asphalt tons ≈ area × compacted depth (ft) × density ÷ 2,000. This tool defaults to 145 lb/cu ft for compacted hot-mix asphalt—a common FHWA / industry planning density. A 40×12 ft drive at 3 inches with 5% waste is about 9.14 tons.',
    summary: 'Driveway and pad asphalt in tons from area and compacted depth.',
    calculatorId: 'asphalt',
    relatedSlugs: [
      'gravel-calculator',
      'paver-calculator',
      'concrete-calculator',
      'sand-calculator',
      'paver-base-calculator',
      'french-drain-gravel-calculator',
    ],
    relatedGuideSlugs: ['gravel-types-for-driveways', 'paver-base-gravel-and-sand-depth'],
    faq: [
      {
        question: 'How much asphalt do I need for a driveway?',
        answer:
          'Multiply length × width × compacted depth in feet, then convert with mix density. At 145 lb/cu ft, 480 sq ft at 3 inches is about 8.7 tons before waste; add a few percent for edges.',
      },
      {
        question: 'Is this a blacktop calculator for residential driveways?',
        answer:
          'Yes—“blacktop” and hot-mix asphalt use the same area × depth × density math here. Enter your compacted surface thickness (often about 2–3 inches residential) and override density if the plant ticket differs from 145 lb/cu ft.',
      },
      {
        question: 'How many tons of asphalt per square foot?',
        answer:
          'At 145 lb/cu ft and 3 inches thick, one square foot weighs about 36.25 lb ≈ 0.018 tons. Multiply by your area, or use this calculator so depth and waste stay consistent.',
      },
      {
        question: 'What density should I use for hot-mix asphalt?',
        answer:
          '145 lb/cu ft is a common compacted planning value (FHWA Federal Lands estimating practice; Iowa DOT cites ~145 lb/cu ft for compacted HMA). Override with the plant mix design when you have it.',
      },
      {
        question: 'Is asphalt depth the same as gravel base depth?',
        answer:
          'No. Estimate asphalt surface thickness here and crushed-stone base separately with the gravel calculator. Typical residential sections use both layers.',
      },
    ],
    sources: [
      {
        label: 'FHWA – WFL Estimating Handbook',
        href: 'https://highways.dot.gov/federal-lands/estimates/wfl-estimating-handbook',
        usedFor: 'Federal Lands estimating guidance for paving quantities; 145 lb/cu ft planning density for compacted hot asphalt mix',
        checked: '2026-11-13',
      },
      {
        label: 'Iowa DOT – Hot Mix Asphalt density (mix properties)',
        href: 'https://iowadot.gov/media/446/download?inline=',
        usedFor: 'Compacted HMA approximately 145 lb per cubic foot',
        checked: '2026-11-13',
      },
    ],
    sectionsHtml: toolBodies['asphalt-calculator'],
    datePublished: '2026-11-13',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'brick-calculator',
    name: 'Brick Calculator',
    shortName: 'Brick',
    category: 'outdoor',
    primaryKeyword: 'brick calculator',
    secondaryKeywords: [
      'brick estimator',
      'how many bricks do I need',
      'concrete block calculator',
      'CMU calculator',
      'cinder block calculator',
    ],
    title: 'Brick Calculator: Bricks per Sq Ft for Walls',
    description:
      'Brick calculator and brick estimator for walls. Count modular brick or CMU blocks per square foot with mortar joints and waste.',
    h1: 'Brick Calculator: Bricks per Sq Ft for Walls',
    answerFirst:
      'Bricks needed ≈ wall face ÷ (brick face + mortar joint), counted in full courses. Modular brick with a ⅜ inch joint uses about 6.86 bricks per square foot (Glen-Gery). Switch to CMU mode for standard 8×16 concrete block faces.',
    summary: 'Clay brick or CMU counts for a wall face with mortar and waste.',
    calculatorId: 'brick',
    relatedSlugs: [
      'retaining-wall-calculator',
      'concrete-calculator',
      'rebar-calculator',
      'sand-calculator',
      'paver-base-calculator',
      'lumber-calculator',
    ],
    relatedGuideSlugs: ['retaining-wall-blocks-and-base', 'paver-base-gravel-and-sand-depth'],
    faq: [
      {
        question: 'How many bricks do I need for a wall?',
        answer:
          'Divide the wall into mortar modules: ceil(height ÷ module height) courses × ceil(length ÷ module length) units, then add waste. Modular brick at ⅜ inch joints is about 6.86 per square foot before course rounding.',
      },
      {
        question: 'Is this a brick estimator for clay brick and CMU?',
        answer:
          'Yes. Use clay brick mode for modular face brick and CMU mode for concrete block / cinder block counts. Effective module = brick face + mortar joint (~6.86 modular bricks/sq ft at ⅜ inch joints per Glen-Gery); ceil to whole courses and add waste. Segmental retaining-wall blocks stay on the retaining wall calculator.',
      },
      {
        question: 'How much mortar per brick?',
        answer:
          'Mortar volume depends on joint width and whether joints are full or face-shell bedded. This calculator counts units, not mortar bags—ask your mason or use the coverage on the mortar mix bag you buy.',
      },
      {
        question: 'Can I calculate concrete blocks (CMU) here?',
        answer:
          'Yes. Choose concrete block (CMU) mode. Defaults use a 15⅝ × 7⅝ inch face with a ⅜ inch joint (nominal 8×16 module). Segmental retaining-wall blocks belong in the retaining wall calculator instead.',
      },
      {
        question: 'What waste percent should I add?',
        answer:
          'About 5% covers routine cuts and breakage on straight walls. Arches, openings, and blended colors often need more—order from one production run when match matters.',
      },
    ],
    sources: [
      {
        label: 'Glen-Gery – Brick sizes & per-square-foot chart',
        href: 'https://www.glengery.com/brick-sizes',
        usedFor: 'Modular brick actual face 7⅝ × 2¼ in; ~6.86 bricks/sq ft with ⅜ in joint',
        checked: '2026-11-13',
      },
      {
        label: 'CMHA – CMU shapes, sizes, and specifications',
        href: 'https://www.cmha.org/resource/cmu-tec-001/',
        usedFor: 'Nominal 8×8×16 CMU; specified faces typically ⅜ in less than nominal for modular joints',
        checked: '2026-11-13',
      },
    ],
    sectionsHtml: toolBodies['brick-calculator'],
    datePublished: '2026-11-13',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'lumber-calculator',
    name: 'Lumber Calculator',
    shortName: 'Lumber',
    category: 'outdoor',
    primaryKeyword: 'lumber calculator',
    secondaryKeywords: [
      'board feet calculator',
      'how many board feet',
      'what is a board foot',
      'how much lumber do I need',
      'lumber weight calculator',
      'dimensional lumber weight calculator',
      'dimensional lumber weight per foot',
      'square foot lumber calculator',
      '2x4 weight',
    ],
    title: 'Lumber Calculator: Board Feet & Weight',
    description:
      'Free lumber calculator for board feet, piece counts, and dimensional lumber weight. Softwood weight chart link plus KD vs green density options.',
    h1: 'Lumber Calculator: Board Feet & Weight',
    answerFirst:
      'Board feet = (nominal thickness × nominal width × length in feet) ÷ 12. Ten 2×4×8s are 53.3 board feet. Weight uses the dressed section (a 2×4 is 1½×3½) × USDA Wood Handbook density—about 8.4 lb for one kiln-dried SPF 2×4×8 as a planning estimate.',
    summary: 'Softwood board feet, piece counts, and planning weight from nominal sizes.',
    calculatorId: 'lumber',
    relatedSlugs: [
      'deck-material-calculator',
      'fence-calculator',
      'roof-pitch-calculator',
      'paint-calculator',
      'raised-bed-soil-calculator',
      'brick-calculator',
    ],
    relatedGuideSlugs: [
      'lumber-weight-chart',
      'deck-material-list-12x16',
      'deck-material-list-16x24',
    ],
    faq: [
      {
        question: 'What is a board foot?',
        answer:
          'A board foot is a softwood volume unit equal to 12×12×1 inches (144 cubic inches). Softwood board feet use nominal thickness and width with actual length (7 CFR 1217.4 / American Softwood Lumber Standard).',
      },
      {
        question: 'How many board feet in a 2×4×8?',
        answer:
          '(2 × 4 × 8) ÷ 12 = 5.33 board feet. Use nominal 2 and 4 even though a dressed stud measures about 1½ × 3½ inches.',
      },
      {
        question: 'How much does a 2×4 weigh per foot?',
        answer:
          'Using the dressed 1½ × 3½ in section and SPF kiln-dried density (~28.7 lb/cu ft from Wood Handbook SG), about 1.05 lb per linear foot. Douglas fir-larch KD is closer to 1.2 lb/ft; wet treated southern pine can approach ~1.9 lb/ft. See the lumber weight chart for more sizes.',
      },
      {
        question: 'How much does a 2×4×8 weigh?',
        answer:
          'About 8.4 lb for kiln-dried SPF as a planning estimate (actual 1½ × 3½ × 8 ft × ~28.7 lb/cu ft). Southern pine KD is roughly 10 lb; green or wet pressure-treated stock is much heavier—often around 15 lb for the same stick when still wet.',
      },
      {
        question: 'Should I use actual or nominal dimensions?',
        answer:
          'Board-foot pricing uses nominal thickness and width. Weight and span checks use actual dressed size. This calculator keeps those jobs separate: board feet from nominal, weight from the dressed section.',
      },
      {
        question: 'Kiln-dried vs green vs pressure-treated weight?',
        answer:
          'Kiln-dried framing is lighter because moisture is lower (~12% MC planning basis). Green lumber and freshly treated southern pine hold more water and can weigh like the Wood Handbook green densities (~53 lb/cu ft for loblolly-class stock). Pick the species/condition preset that matches what you will lift; moisture still varies by yard and weather.',
      },
    ],
    sources: [
      {
        label: 'eCFR – 7 CFR 1217.4 Board foot',
        href: 'https://www.ecfr.gov/current/title-7/subtitle-B/chapter-XI/part-1217/subpart-A/subject-group-ECFR2f9f8517fff2bc4/section-1217.4',
        usedFor: 'Softwood board foot definition; tally uses nominal thickness/width and actual length; under 1 in nominal thickness counts as 1 in',
        checked: '2026-11-13',
      },
      {
        label: 'American Lumber Standard Committee – PS 20 (board measure)',
        href: 'https://alsc.org/greenbook%20collection/ps20.pdf',
        usedFor: 'Board measure: nominal thickness × nominal width × length; dressed (actual) softwood sizes',
        checked: '2026-11-13',
      },
      {
        label: 'USDA Forest Service – Wood Handbook (FPL-GTR-190)',
        href: 'https://www.fpl.fs.usda.gov/documnts/fplgtr/fpl_gtr190.pdf',
        usedFor:
          'Specific gravity and density of softwoods (Table 5-3a style); KD density ≈ SG × 62.4 × 1.12; green southern pine density ~53 lb/cu ft',
        checked: '2026-11-22',
      },
    ],
    sectionsHtml: toolBodies['lumber-calculator'],
    datePublished: '2026-11-13',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'rebar-calculator',
    name: 'Rebar Calculator',
    shortName: 'Rebar',
    category: 'concrete',
    primaryKeyword: 'rebar calculator',
    secondaryKeywords: [
      'how much rebar for a slab',
      'concrete slab rebar',
      'rebar spacing calculator',
      'rebar for 20x20 slab',
    ],
    title: 'Rebar Calculator: Spacing, Pieces & Weight',
    description:
      'Rebar calculator for slab spacing, stick counts, and weight. Includes #3 and #4 weight per foot so you can order the right steel for the pour.',
    h1: 'Rebar Calculator: Spacing, Pieces & Weight',
    answerFirst:
      'Rebar for a slab grid ≈ bars each way from on-center spacing, then total linear feet ÷ stick length. A 20×20 ft slab at 18 inch spacing needs 14 bars each way (560 ft); with 10% waste that is about 31 of the 20 ft sticks.',
    summary: 'Slab rebar mats: bar counts, linear feet, sticks, and weight.',
    calculatorId: 'rebar',
    relatedSlugs: [
      'concrete-calculator',
      'concrete-footing-calculator',
      'concrete-slab-cost-calculator',
      'concrete-calculator-post-holes',
      'sonotube-concrete-calculator',
      'brick-calculator',
    ],
    relatedGuideSlugs: [
      'concrete-slab-thickness',
      'concrete-for-10x10-slab',
      'how-many-bags-of-concrete',
    ],
    faq: [
      {
        question: 'How much rebar for a concrete slab?',
        answer:
          'Count bars each way as floor(span ÷ spacing) + 1, multiply by bar lengths, then convert to sticks with waste. Pair the steel takeoff with the concrete calculator for yards and bags.',
      },
      {
        question: 'How much does rebar weigh per foot (#3 and #4)?',
        answer:
          'Common ASTM planning weights: #3 (⅜ in) ≈ 0.376 lb/ft; #4 (½ in) ≈ 0.668 lb/ft. Multiply total linear feet (after waste) by that factor for approximate order weight. Confirm mill tags and any epoxy coating surcharge with your supplier.',
      },
      {
        question: 'What rebar spacing for a 4-inch slab?',
        answer:
          'Many residential pads use #3 or #4 bar at 12–18 inches on center. ACI 318 caps shrinkage/temperature spacing at the lesser of 5× thickness or 18 inches for many slabs—confirm with local code and drawings.',
      },
      {
        question: 'How much rebar for a 20×20 slab?',
        answer:
          'At 18 inches on center each way: 14 bars × 20 ft × 2 directions = 560 linear feet before waste. With 10% waste and 20 ft sticks, plan about 31 sticks. At #4 weight (~0.668 lb/ft), 560 ft is about 374 lb before waste.',
      },
      {
        question: 'Does this calculator design the slab?',
        answer:
          'No. It estimates bar counts, sticks, and weight from the spacing you enter. It does not replace engineered details for cover, laps, load, or soil conditions.',
      },
    ],
    sources: [
      {
        label: 'ACI 318 – Building Code Requirements for Structural Concrete',
        href: 'https://www.concrete.org/store/productdetail.aspx?ItemID=318U19',
        usedFor: 'Maximum spacing context for shrinkage/temperature reinforcement (lesser of 5× thickness or 18 in for many slabs)—confirm edition and local amendments',
        checked: '2026-11-13',
      },
      {
        label: 'University of Missouri Extension – Concrete basement construction',
        href: 'https://hdl.handle.net/10355/50810',
        usedFor: 'Example residential floor note: #4 bars at 18 in each way or 6×6 welded-wire mesh',
        checked: '2026-11-13',
      },
    ],
    sectionsHtml: toolBodies['rebar-calculator'],
    datePublished: '2026-11-13',
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'concrete-slab-cost-calculator',
    name: 'Concrete Slab Cost Calculator',
    shortName: 'Slab cost',
    category: 'concrete',
    primaryKeyword: 'concrete slab cost calculator',
    secondaryKeywords: [
      'concrete slab cost',
      'cost of concrete slab',
      'concrete patio cost calculator',
      'ready mix concrete cost calculator',
    ],
    title: 'Concrete Slab Cost: Price per Sq Ft & Yard',
    description:
      'Estimate concrete slab cost from your ready-mix $/yard or bag price. See price per sq ft, volume, and optional gravel, rebar, forms, and delivery add-ons.',
    h1: 'Concrete Slab Cost: Price per Sq Ft & Yard',
    answerFirst:
      'This concrete slab cost calculator turns length × width × thickness into cubic yards (or bags), then multiplies by the ready-mix or bag price you enter. Add optional line items you price yourself—gravel base, rebar or mesh, forms, delivery/short-load fees, and labor per square foot. Defaults are labeled examples only; replace them with your plant or store quotes.',
    summary: 'Slab volume priced with your ready-mix or bag quotes plus optional add-ons.',
    calculatorId: 'concrete-slab-cost',
    relatedSlugs: [
      'concrete-calculator',
      'concrete-footing-calculator',
      'rebar-calculator',
      'gravel-calculator',
      'sonotube-concrete-calculator',
      'concrete-calculator-post-holes',
    ],
    relatedGuideSlugs: [
      'how-much-concrete-do-i-need',
      'concrete-slab-thickness',
      'concrete-for-10x10-slab',
      'how-many-bags-of-concrete',
    ],
    faq: [
      {
        question: 'How do I estimate concrete slab cost?',
        answer:
          'Convert the slab to cubic yards (or bags), multiply by the ready-mix or bag price from your quote, then add gravel, steel, forms, delivery, and labor you have priced. This tool does the volume math and the dollar math from numbers you enter—it does not invent local market rates.',
      },
      {
        question: 'Should I use ready-mix or bag prices?',
        answer:
          'Bags work for small pads you can mix in batches. Around one cubic yard or any continuous patio pour, compare a ready-mix short-load ticket—including delivery fees—against bag count × shelf price and your mixing time. Run both modes with your real quotes.',
      },
      {
        question: 'Are the default dollar amounts real market prices?',
        answer:
          'No. Ready-mix and bag defaults are labeled examples so the form shows a worked total. Replace every price field with your plant ticket or store tag before you budget. Optional add-ons start at $0 until you paste a quote.',
      },
      {
        question: 'Does cost per square foot include labor?',
        answer:
          'Only if you enter a labor rate per sq ft. Leave labor at $0 for a materials-only estimate. Cost per sq ft is total ÷ slab area for whatever line items you filled in.',
      },
      {
        question: 'Where do I get yards and bags without pricing?',
        answer:
          'Use the concrete calculator for volume and 40/60/80 lb bag counts, then return here with those quantities and your quotes. Charts for a 10×10 slab are in the concrete-for-10x10-slab guide.',
      },
    ],
    sources: [
      {
        label: 'QUIKRETE – Concrete Mix (No. 1101) bag yields',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: '40/60/80 lb bag yield planning figures used when bag mode prices material',
        checked: '2026-11-19',
      },
      {
        label: 'Sakrete – Concrete calculator',
        href: 'https://sakrete.com/resources/calculators/',
        usedFor: 'Cross-check bag coverage estimates for bagged concrete',
        checked: '2026-11-19',
      },
      {
        label: 'American Cement Association (formerly PCA)',
        href: 'https://www.cement.org/',
        usedFor: 'Industry context on cement and concrete materials (not regional price data)',
        checked: '2026-11-19',
      },
    ],
    sectionsHtml: toolBodies['concrete-slab-cost-calculator'],
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },

  {
    slug: 'concrete-steps-calculator',
    name: 'Concrete Steps Calculator',
    shortName: 'Concrete steps',
    category: 'concrete',
    primaryKeyword: 'concrete steps calculator',
    secondaryKeywords: [
      'concrete stair calculator',
      'how much concrete for steps',
      'poured concrete steps calculator',
    ],
    title: 'Concrete Steps Calculator: Bags & Yards',
    description:
      'Free concrete steps calculator for solid poured stairs. Enter width, rise, tread, and step count for cubic yards and 40/60/80 lb bags.',
    h1: 'Concrete Steps Calculator: Bags & Yards',
    answerFirst:
      'Solid poured steps use volume = width × tread × riser × n(n+1)/2. Three steps at 7″ rise and 11″ tread on a 3 ft wide flight are about 9.63 cu ft before waste (~10.6 cu ft after 10%)—about eighteen 80 lb bags of standard mix.',
    summary: 'Solid poured stair volume in yards and bags.',
    calculatorId: 'concrete-steps',
    relatedSlugs: [
      'concrete-calculator',
      'concrete-footing-calculator',
      'rebar-calculator',
      'concrete-calculator-post-holes',
    ],
    relatedGuideSlugs: ['how-many-bags-of-concrete', 'how-much-concrete-do-i-need', 'concrete-slab-thickness'],
    faq: [
      {
        question: 'How much concrete for 3 poured steps?',
        answer:
          'For 7″ rise, 11″ tread, and 3 ft width: about 9.63 cu ft before waste and 10.6 cu ft after 10% waste—roughly 18 × 80 lb bags (QUIKRETE 1101 planning yield ~0.60 cu ft/bag). Enter your sizes above for exact totals.',
      },
      {
        question: 'Why not use length × width × thickness?',
        answer:
          'Solid stairs stack tread-deep layers. The n(n+1)/2 factor accounts for that wedge. A flat rectangle undercounts the pour.',
      },
      {
        question: 'Does this include the footing under the stairs?',
        answer:
          'No. This tool sizes stair fill only. Use the concrete footing calculator for a strip or pad under the bottom step, and confirm frost depth with local code.',
      },
      {
        question: 'What bag yields does YardTally use?',
        answer:
          'About 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb QUIKRETE Concrete Mix No. 1101 planning figures. Read the yield on the bag you buy.',
      },
    ],
    sources: [
      {
        label: 'QUIKRETE – Concrete calculator & bag yields',
        href: 'https://www.quikrete.com/calculator/main.asp',
        usedFor: '40/60/80 lb bag yield planning figures',
        checked: '2026-11-25',
      },
      {
        label: 'Sakrete – Concrete calculator',
        href: 'https://sakrete.com/resources/calculators/',
        usedFor: 'Cross-check bag coverage estimates',
        checked: '2026-11-25',
      },
    ],
    sectionsHtml: toolBodies['concrete-steps-calculator'],
    datePublished: '2026-11-25',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'sod-calculator',
    name: 'Sod Calculator',
    shortName: 'Sod',
    category: 'lawn',
    primaryKeyword: 'sod calculator',
    secondaryKeywords: [
      'how much sod do I need',
      'sod pallet calculator',
      'lawn sod calculator',
    ],
    title: 'Sod Calculator: Rolls & Pallets',
    description:
      'Free sod calculator for lawn area, waste, rolls, and pallets. Enter length and width plus your supplier’s sq ft per roll and per pallet.',
    h1: 'Sod Calculator: Rolls & Pallets',
    answerFirst:
      'Sod needed = lawn area × (1 + waste%), then round up by roll and pallet coverage. A 50×20 ft lawn (1,000 sq ft) with 5% waste is 1,050 sq ft—about 105 rolls at 10 sq ft each or 3 pallets at 450 sq ft (override with your ticket).',
    summary: 'Lawn sod rolls and pallets from area and waste.',
    calculatorId: 'sod',
    relatedSlugs: [
      'grass-seed-calculator',
      'fertilizer-calculator',
      'topsoil-calculator',
      'raised-bed-soil-calculator',
    ],
    relatedGuideSlugs: [
      'grass-seed-per-sq-ft',
      'fertilizer-nitrogen-per-1000-sq-ft',
      'topsoil-vs-garden-soil',
    ],
    faq: [
      {
        question: 'How much sod for 1,000 square feet?',
        answer:
          'With 5% waste, order about 1,050 sq ft. At 10 sq ft per roll that is 105 rolls; at 450 sq ft per pallet that is 3 pallets. Change coverage to match your supplier.',
      },
      {
        question: 'Sod calculator vs grass seed calculator?',
        answer:
          'Use this page for rolls or pallets. Use the grass seed calculator when you are seeding or overseeding by pounds per 1,000 sq ft.',
      },
      {
        question: 'How much extra sod should I order?',
        answer:
          'Most crews plan 5–10% waste for cuts along beds and curves. Enter your waste percent above rather than guessing after the truck leaves.',
      },
      {
        question: 'Are 10 sq ft rolls and 450 sq ft pallets fixed?',
        answer:
          'No—those are common retail planning defaults only. Always override with the coverage printed on your sod ticket.',
      },
    ],
    sources: [
      {
        label: 'Iowa State University Extension – PM 1072 Lawn seeding',
        href: 'https://store.extension.iastate.edu/product/4210',
        usedFor: 'Lawn establishment context; sod coverage still comes from your supplier ticket',
        checked: '2026-11-25',
      },
      {
        label: 'University of Minnesota Extension – Establishing a lawn',
        href: 'https://extension.umn.edu/lawn-care/establishing-lawn',
        usedFor: 'Lawn establishment practice overview (seed vs sod context)',
        checked: '2026-11-25',
      },
    ],
    sectionsHtml: toolBodies['sod-calculator'],
    datePublished: '2026-11-25',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'paver-base-calculator',
    name: 'Paver Base Calculator',
    shortName: 'Paver base',
    category: 'landscape',
    primaryKeyword: 'paver base calculator',
    secondaryKeywords: [
      'paver base for retaining wall',
      'gravel base for pavers',
      'retaining wall gravel base calculator',
      'how much gravel under pavers',
    ],
    title: 'Paver Base Calculator: Gravel Yards',
    description:
      'Free paver base calculator for patio pads and retaining-wall gravel trenches. Convert length, width, and compacted depth into cubic yards and tons.',
    h1: 'Paver Base Calculator: Gravel Yards',
    answerFirst:
      'Paver base volume = length × width × compacted depth, plus waste. A 20×4 ft trench at 6 inches with 10% waste is about 1.63 cu yd (~2.2 tons at 2,700 lb/yd³). Use this for patio base or retaining-wall gravel base—not French drains.',
    summary: 'Compacted gravel base for pavers and wall trenches.',
    calculatorId: 'paver-base',
    relatedSlugs: [
      'gravel-calculator',
      'sand-calculator',
      'paver-calculator',
      'retaining-wall-calculator',
      'french-drain-gravel-calculator',
    ],
    relatedGuideSlugs: [
      'paver-base-gravel-and-sand-depth',
      'retaining-wall-blocks-and-base',
      'gravel-types-for-driveways',
    ],
    faq: [
      {
        question: 'How much gravel for paver base?',
        answer:
          'Multiply pad length × width × compacted depth (in feet), add waste, and convert to yards. Example: 20×4 ft at 6 in with 10% waste ≈ 1.63 cu yd.',
      },
      {
        question: 'Can I use paver base under a retaining wall?',
        answer:
          'Many segmental wall makers call for a compactable gravel trench under the first course. Enter trench length, width, and design depth here; size blocks on the retaining wall calculator.',
      },
      {
        question: 'Is this the same as the gravel calculator?',
        answer:
          'Same rectangle math with paver/wall-base defaults and links. General driveways and pads can use either tool; French drains need the French drain gravel calculator.',
      },
      {
        question: 'What density is used for tons?',
        answer:
          'About 2,700 lb per cubic yard as a mid crushed-stone planning figure. Confirm with your quarry ticket when buying by the ton.',
      },
    ],
    sources: [
      {
        label: 'Penn State Extension – Landscape mulch and stone basics',
        href: 'https://extension.psu.edu/',
        usedFor: 'Landscape aggregate practice context; confirm local base specs',
        checked: '2026-11-25',
      },
      {
        label: 'YardTally methodology – bulk densities',
        href: '/methodology/',
        usedFor: '2,700 lb/cu yd mid gravel density used for ton estimates',
        checked: '2026-11-25',
      },
    ],
    sectionsHtml: toolBodies['paver-base-calculator'],
    datePublished: '2026-11-25',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
  },
  {
    slug: 'mulch-calculator-circular-beds',
    name: 'Circular Bed Mulch Calculator',
    shortName: 'Circular mulch',
    category: 'landscape',
    primaryKeyword: 'circular mulch calculator',
    secondaryKeywords: [
      'round garden bed mulch calculator',
      'mulch for round beds',
      'circular flower bed mulch',
    ],
    title: 'Circular Bed Mulch Calculator',
    description:
      'Free circular bed mulch calculator for round planting areas. Enter diameter and depth for cubic yards and 2/3 cu ft bag counts.',
    h1: 'Circular Bed Mulch Calculator',
    answerFirst:
      'Round-bed mulch volume = π × (diameter ÷ 2)² × (depth ÷ 12). An 8 ft diameter bed at 3 inches needs about 12.6 cu ft (~0.47 cu yd)—about seven 2 cu ft bags or five 3 cu ft bags.',
    summary: 'Mulch yards and bags for circular garden beds.',
    calculatorId: 'circular-mulch',
    relatedSlugs: [
      'mulch-calculator',
      'mulch-calculator-tree-rings',
      'topsoil-calculator',
      'raised-bed-soil-calculator',
    ],
    relatedGuideSlugs: [
      'mulch-depth-guide',
      'mulch-for-common-garden-beds',
      'topsoil-vs-garden-soil',
    ],
    faq: [
      {
        question: 'How much mulch for an 8 ft round bed?',
        answer:
          'At 3 inches deep, about 12.6 cu ft (~0.47 cu yd). That is roughly seven 2 cu ft bags or five 3 cu ft bags after rounding up.',
      },
      {
        question: 'Circular bed vs tree ring calculator?',
        answer:
          'Use this page for a solid circular planting bed. Use the tree ring calculator when you need a donut with trunk keep-out in the middle.',
      },
      {
        question: 'How deep should mulch be?',
        answer:
          'Most organic mulches for shrub and flower beds land around 2–3 inches. See the mulch depth guide, then enter that depth here.',
      },
    ],
    sources: [
      {
        label: 'Penn State Extension – Mulching',
        href: 'https://extension.psu.edu/mulching-landscape-trees-and-shrubs',
        usedFor: 'Typical organic mulch depth guidance for landscape beds',
        checked: '2026-11-25',
      },
      {
        label: 'Clemson HGIC – Mulch',
        href: 'https://hgic.clemson.edu/',
        usedFor: 'Landscape mulch practice overview',
        checked: '2026-11-25',
      },
    ],
    sectionsHtml: toolBodies['mulch-calculator-circular-beds'],
    datePublished: '2026-11-25',
    dateModified: '2026-11-25',
    applicationCategory: 'UtilitiesApplication',
    embeddable: true,
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

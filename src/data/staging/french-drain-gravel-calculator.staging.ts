/**
 * Staging copy for /calculators/french-drain-gravel-calculator/ — not wired into tools.ts yet.
 * Worked numbers match frenchDrainGravel() (trench − pipe) at ~2,700 lb/yd³ mid density.
 * datePublished / dateModified: 2026-11-19
 */
export const frenchDrainGravelCalculatorStaging = {
  slug: 'french-drain-gravel-calculator',
  name: 'French Drain Gravel Calculator',
  shortName: 'French drain',
  category: 'landscape' as const,
  primaryKeyword: 'french drain gravel calculator',
  secondaryKeywords: [
    'how much gravel for a french drain',
    'french drain rock calculator',
    'drain tile gravel yards',
    'perforated pipe gravel estimate',
    'french drain trench gravel',
  ],
  title: 'French Drain Gravel Calculator | YardTally',
  description:
    'Free French drain gravel calculator: trench volume minus pipe, then cubic yards and tons at ~2,700 lb/yd³ mid density. Plan clean drain rock orders with waste.',
  h1: 'French Drain Gravel Calculator: Yards & Tons',
  answerFirst:
    'A 50 ft French drain in a 12×18 inch trench with a 4-inch pipe needs about 2.88 cu yd of gravel after subtracting the pipe and 10% waste—about 3.9 tons at 2,700 lb/yd³ mid density. Order clean drain rock, not fines-heavy base. Confirm trench size and outlet locally.',
  summary: 'Trench gravel after pipe displacement, in yards and tons.',
  calculatorId: 'french-drain',
  relatedSlugs: [
    'gravel-calculator',
    'sand-calculator',
    'retaining-wall-calculator',
    'paver-calculator',
  ],
  relatedGuideSlugs: [
    'gravel-types-for-driveways',
    'paver-base-gravel-and-sand-depth',
  ],
  faq: [
    {
      question: 'How much gravel do I need for a French drain?',
      answer:
        'Gravel ≈ trench length × width × depth minus the pipe cylinder, then add waste. A 50 ft trench 12 in wide and 18 in deep with a 4 in pipe is about 75 cu ft of trench − 4.4 cu ft of pipe → ~70.6 cu ft of gravel before waste → about 77.7 cu ft (2.88 cu yd) with 10% waste.',
    },
    {
      question: 'How do I convert French drain gravel to tons?',
      answer:
        'Tons ≈ cubic yards × density ÷ 2,000. YardTally uses ~2,700 lb/yd³ as a crushed-stone mid planning density—the same mid estimate as the gravel calculator. Moisture and rock type move the ticket weight; confirm with your stone yard.',
    },
    {
      question: 'What size gravel for a French drain?',
      answer:
        'Use clean, open-graded drain rock or washed gravel that leaves void space for water—not dense-grade crusher run packed with fines. Exact gradation follows the pipe manufacturer sheet and local practice. See gravel types for driveways for angular-versus-rounded intuition; drain rock is a different product than driveway base.',
    },
    {
      question: 'Do I subtract the pipe from the gravel volume?',
      answer:
        'Yes for planning. This calculator subtracts π × (pipe radius)² × trench length using outside pipe diameter. Fabric, fittings, and catch basins are not modeled—add a little extra if the trench is irregular.',
    },
    {
      question: 'French drain calculator vs gravel calculator?',
      answer:
        'The gravel calculator sizes solid rectangles (paths, bases, drives). This French drain tool subtracts pipe displacement inside a trench. Same mid density (~2,700 lb/yd³); different geometry.',
    },
    {
      question: 'How deep and wide should the trench be?',
      answer:
        'Depth and width depend on outlet elevation, soil, and the pipe diameter you choose. Treat dimensions as confirm-local-code / confirm-local-practice planning inputs. This page only converts the trench and pipe sizes you enter into gravel yards and tons.',
    },
  ],
  sources: [
    {
      label: 'USDA NRCS – Aggregate and soil resources (general)',
      href: 'https://www.nrcs.usda.gov/',
      usedFor: 'Context on aggregates; density still confirmed with local stone yards',
      checked: '2026-11-19',
    },
    {
      label: 'Clemson HGIC – Home & Garden Information Center',
      href: 'https://hgic.clemson.edu/',
      usedFor: 'Landscape drainage and soil resource context',
      checked: '2026-11-19',
    },
  ],
  sectionsHtml: `
      <h2>How this French drain gravel calculator works</h2>
      <p>Enter trench length, width, and depth, plus the outside diameter of the perforated pipe. The tool computes trench volume, subtracts the pipe cylinder, applies waste, then reports cubic feet, cubic yards, and tons. Density defaults to about <strong>2,700 lb per cubic yard</strong>—the same mid planning estimate used on the <a href="/calculators/gravel-calculator/">gravel calculator</a>. Confirm density on your stone yard ticket.</p>
      <p>For solid pads and paths without a pipe, stay on the gravel calculator. Material intuition for angular crushed stone versus rounded rock: <a href="/guides/gravel-types-for-driveways/">gravel types for driveways</a>. Paver bases are a different assembly—see <a href="/guides/paver-base-gravel-and-sand-depth/">paver base gravel and sand depth</a>.</p>

      <h2>How it's calculated</h2>
      <ul>
        <li><strong>Trench:</strong> length × width × depth (all in feet)</li>
        <li><strong>Pipe displacement:</strong> π × (outside diameter ÷ 2)² × length</li>
        <li><strong>Gravel:</strong> max(0, trench − pipe) × (1 + waste)</li>
        <li><strong>Tons:</strong> cubic yards × density_lb_per_yd ÷ 2,000</li>
      </ul>
      <p>Default waste is 10% for irregular trenches and compaction of the stone bed under and around the pipe. Override density when your quarry quotes a different number.</p>

      <h2>Trench size planning (confirm-local-code)</h2>
      <p>Width must fit the pipe plus stone cover on both sides. Depth must reach the outlet elevation with a continuous fall. Daylight the drain to a safe discharge point or an approved dry well. Label trench geometry as <strong>confirm-local-code</strong> / confirm-local-practice—this calculator does not design drainage systems or set required slopes.</p>
      <p>Wrap clean stone in filter fabric when fines from adjacent soil would clog the voids. Keep fabric off the perforations in the way your pipe manufacturer describes.</p>

      <h2>Worked example: 50 ft drain</h2>
      <p>Trench 50 ft long, 12 inches wide, 18 inches deep, with a 4-inch outside-diameter pipe:</p>
      <ul>
        <li>Trench = 50 × 1 × 1.5 = 75 cu ft</li>
        <li>Pipe = π × (2÷12)² × 50 ≈ 4.36 cu ft</li>
        <li>Gravel before waste ≈ 70.6 cu ft</li>
        <li>With 10% waste → <strong>77.7 cu ft ≈ 2.88 cu yd</strong></li>
        <li>At 2,700 lb/yd³ → <strong>about 3.9 tons</strong></li>
      </ul>
      <p>Order clean drain rock or washed gravel sized for drainage—not dense-grade driveway base packed with fines that block flow.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Subtract the pipe, add waste, then convert yards to tons with a mid density (~2,700 lb/yd³) until the quarry gives you a ticket density.</div>

      <h2>Drain rock vs driveway gravel</h2>
      <p>Driveway sections want angular stone that locks under tires. French drains want open voids so water moves to the pipe. Do not copy a crusher-run driveway recipe into a perforated trench. Ask the yard for drain rock / septic stone / washed gravel suited to pipe bedding.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Forgetting to subtract pipe volume and over-ordering stone.</li>
        <li>Using fines-heavy base stone that clogs and holds water.</li>
        <li>Building a trench with no continuous fall to an outlet.</li>
        <li>Mixing paver-base depth rules into drain trenches.</li>
        <li>Trusting the 2,700 lb/yd³ mid density without checking the delivery ticket.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Write trench L × W × D, pipe OD, waste percent, yards, and tons.</li>
        <li>Order clean drain rock; confirm gradation and density with the yard.</li>
        <li>Buy perforated pipe, couplings, fabric, and outlet fittings as separate lines.</li>
        <li>Confirm-local-code / practice on trench depth, setback, and discharge point.</li>
        <li>Stage fabric and stone so the pipe stays centered in clean rock, not mud.</li>
      </ul>


      <h2>Fabric, fittings, and waste</h2>
      <p>Filter fabric, couplings, elbows, and cleanouts are not inside the gravel volume. Buy them as separate line items. If the trench wanders or you over-excavate soft spots, keep the 10% waste factor or raise it. Under-ordering clean drain rock usually means a muddy refill with the wrong stone.</p>
      <p>When the outlet is far from the wet spot, measure the full run—not just the soggy section. Slope must stay continuous; a flat middle creates a silt trap. Confirm discharge location with local practice before the excavator arrives.</p>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Math assumes a rectangular trench and a single straight pipe. Fittings, catch basins, and dual pipes are not modeled. Density is a mid estimate (~2,700 lb/yd³), not a universal rock weight. See <a href="/methodology/">methodology</a> for sources and limits.</p>
  `,
  howTo: {
    name: 'How to estimate French drain gravel yards and tons',
    steps: [
      {
        name: 'Enter trench length, width, and depth',
        text: 'Measure the excavated trench. Convert width and depth to feet when they are in inches.',
      },
      {
        name: 'Enter pipe outside diameter and waste',
        text: 'Use the outside diameter of the drain pipe. Add waste for irregular trenches (default 10%).',
      },
      {
        name: 'Read gravel yards and tons',
        text: 'The calculator subtracts pipe volume from the trench, then converts to yards and tons at ~2,700 lb/yd³ mid density unless you override density.',
      },
      {
        name: 'Confirm stone type and outlet',
        text: 'Order clean drain rock, confirm density on the ticket, and confirm-local-code / practice for trench depth and daylight outlet before you dig.',
      },
    ],
  },
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
} as const;

export type FrenchDrainGravelCalculatorStaging = typeof frenchDrainGravelCalculatorStaging;

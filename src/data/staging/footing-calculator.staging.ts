/**
 * Staging copy for /calculators/footing-calculator/ — not wired into tools.ts yet.
 * Worked numbers match footingVolume() in concreteExtras (continuous / pad).
 * datePublished / dateModified: 2026-11-19
 */
export const footingCalculatorStaging = {
  slug: 'footing-calculator',
  name: 'Footing Calculator',
  shortName: 'Footings',
  category: 'concrete' as const,
  primaryKeyword: 'footing calculator',
  secondaryKeywords: [
    'concrete footing calculator',
    'strip footing calculator',
    'pad footing calculator',
    'how much concrete for a footing',
    'continuous footing concrete',
  ],
  title: 'Footing Calculator: Yards & Bags | YardTally',
  description:
    'Free footing calculator for continuous strip and pad footings. Get cubic yards and 40/60/80 lb bag counts with waste—confirm depth and width with local code.',
  h1: 'Footing Calculator: Strip & Pad Concrete',
  answerFirst:
    'A continuous 40 ft strip footing 16 inches wide by 8 inches thick needs about 1.45 cu yd after 10% waste—roughly sixty-six 80 lb bags. Pad footings multiply length × width × thickness by count. This tool returns yards and bags for strip and pad shapes. Confirm width, depth, and frost with local code before you dig.',
  summary: 'Continuous strip and pad footing volume in yards and bags.',
  calculatorId: 'footing',
  relatedSlugs: [
    'concrete-calculator',
    'rebar-calculator',
    'sonotube-concrete-calculator',
    'concrete-calculator-post-holes',
  ],
  relatedGuideSlugs: [
    'how-many-bags-of-concrete',
    'concrete-for-10x10-slab',
    'how-much-concrete-in-a-sonotube',
  ],
  faq: [
    {
      question: 'How much concrete do I need for a footing?',
      answer:
        'Volume = length × width × thickness (all in feet), then add waste. A 40 ft continuous run that is 16 in wide and 8 in thick is 40 × (16÷12) × (8÷12) ≈ 35.6 cu ft before waste → about 39.1 cu ft (1.45 cu yd) with 10% waste—roughly sixty-six 80 lb bags at 0.60 cu ft/bag (QUIKRETE Concrete Mix 1101 planning yield). Confirm the bag label you buy.',
    },
    {
      question: 'What is the difference between a strip footing and a pad footing?',
      answer:
        'A continuous (strip) footing is a long rectangle under a wall or stem. A pad footing is a discrete rectangle or square under a post or pier; multiply one pad’s volume by the pad count. Both use the same L × W × thickness math in this calculator.',
    },
    {
      question: 'How wide and deep should a footing be?',
      answer:
        'Width and depth depend on loads, soil, and frost. Treat any numbers you enter here as planning inputs only—confirm-local-code for minimum width, thickness, and frost depth before you dig. This tool estimates concrete volume; it does not design structural size.',
    },
    {
      question: 'Do footings need rebar?',
      answer:
        'Many footings include longitudinal bars, stirrups, or dowels when the plan or inspector requires them. This page does not claim a rebar schedule. Once your plan lists spacing and bar size, estimate sticks with the rebar calculator. Volume of concrete still comes from the footing dimensions above.',
    },
    {
      question: 'Footing calculator vs slab or Sonotube calculator?',
      answer:
        'Use this footing calculator for strip and pad rectangles. Use the main concrete calculator for patio slabs and steps. Use the Sonotube calculator for round cardboard pier forms. Same bag yields; different shapes and defaults.',
    },
    {
      question: 'Should I order bags or ready-mix for footings?',
      answer:
        'Bags suit small pads and short runs you can place in batches. Continuous wall footings near or above one cubic yard often favor ready-mix if a truck can reach the trench. Compare labor and access before you buy.',
    },
  ],
  sources: [
    {
      label: 'QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields',
      href: 'https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf',
      usedFor: 'Planning bag yields (~0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb)',
      checked: '2026-11-19',
    },
    {
      label: 'QUIKRETE – Concrete calculator & bag yields',
      href: 'https://www.quikrete.com/calculator/main.asp',
      usedFor: 'Cross-check bag coverage for rectangular pours',
      checked: '2026-11-19',
    },
    {
      label: 'Sakrete – Concrete calculator',
      href: 'https://sakrete.com/resources/calculators/',
      usedFor: 'Cross-check bagged concrete coverage estimates',
      checked: '2026-11-19',
    },
    {
      label: 'ACI 332.1R-18 preview – Guide to Residential Concrete Construction',
      href: 'https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf',
      usedFor: 'Residential concrete practice overview (preview PDF); not a substitute for local code',
      checked: '2026-11-19',
    },
  ],
  sectionsHtml: `
      <h2>How this footing calculator works</h2>
      <p>Pick continuous strip or pad, enter length, width, and thickness, then set pad count when you have identical pads. The tool returns cubic feet, cubic yards, and 40 / 60 / 80 lb bag counts with a waste factor (default 10%). Math runs in your browser—inputs are not uploaded.</p>
      <p>Use feet for long runs and inches for footing width and thickness when that matches your sketch. The calculator converts to feet before multiplying so a 8-inch thickness never gets treated as 8 feet.</p>

      <h2>How it's calculated</h2>
      <ul>
        <li><strong>Continuous strip:</strong> volume = length × width × thickness (all in feet)</li>
        <li><strong>Pad footing:</strong> volume = length × width × thickness × pad count</li>
        <li><strong>With waste:</strong> total = volume × (1 + waste)</li>
        <li><strong>Bags:</strong> bags = ceil(total_cu_ft ÷ bag_yield)</li>
      </ul>
      <p>Bag yields follow QUIKRETE Concrete Mix No. 1101 / Sakrete-style planning figures: about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags. Always read the bag you buy—lightweight and high-yield products differ.</p>

      <h2>Depth and width planning (confirm-local-code)</h2>
      <p>Footing width, thickness, and embedment below grade are structural and frost decisions. Soil bearing, wall loads, and frost depth change the minimums. Enter the sizes from your plan or building department handout. Label every depth and width choice as <strong>confirm-local-code</strong> before you dig or order concrete. This page only converts those dimensions into volume and bags.</p>
      <p>If your detail shows a keyed joint, step footing, or thickened edge, sketch those extras and add them as separate rectangles or bump the waste factor. Do not assume a patio slab thickness equals a footing thickness.</p>

      <h2>Worked example: continuous strip footing</h2>
      <p>A 40 ft continuous footing, 16 inches wide and 8 inches thick:</p>
      <ul>
        <li>Width = 16÷12 = 1.333 ft; thickness = 8÷12 = 0.667 ft</li>
        <li>Volume = 40 × 1.333 × 0.667 ≈ 35.6 cu ft before waste</li>
        <li>With 10% waste → about 39.1 cu ft ≈ <strong>1.45 cu yd</strong></li>
        <li>Bags ≈ ceil(39.1 ÷ 0.60) = <strong>66 × 80 lb</strong>, or ceil(39.1 ÷ 0.45) = <strong>87 × 60 lb</strong></li>
      </ul>
      <p>Ready-mix tickets often round up to the next quarter yard—plan on about 1.5 cu yd on the order sheet for this example.</p>

      <h2>Worked example: six pad footings</h2>
      <p>Six identical 2×2 ft pads at 12 inches thick: one pad = 2 × 2 × 1 = 4 cu ft. Six pads = 24 cu ft before waste → 26.4 cu ft with 10% (≈ 0.98 cu yd). That is about forty-five 80 lb bags or fifty-nine 60 lb bags. Round post bases that use cardboard tubes belong on the <a href="/calculators/sonotube-concrete-calculator/">Sonotube concrete calculator</a> instead.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Convert width and thickness to feet, multiply the rectangle, add waste, then divide by bag yield. Strip runs and pad counts share the same formula.</div>

      <h2>Rebar note (no code claim)</h2>
      <p>Reinforcement is common in footings, but bar size, cover, and spacing come from the plan or engineer—not from a volume tool. After you know the layout, use the <a href="/calculators/rebar-calculator/">rebar calculator</a> for stick counts. Do not invent a schedule from bag totals alone.</p>

      <h2>When to use the main slab tool instead</h2>
      <p>Patio pads, shed floors, and flat steps stay on the <a href="/calculators/concrete-calculator/">concrete calculator</a>. Size-specific charts live in <a href="/guides/concrete-for-10x10-slab/">concrete for a 10×10 slab</a> and <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>. Fence post holes without forms use the <a href="/calculators/concrete-calculator-post-holes/">post hole calculator</a>.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Leaving width or thickness in inches while length is in feet without converting.</li>
        <li>Treating planning sketch sizes as final without confirm-local-code checks for frost and bearing.</li>
        <li>Forgetting pad count on multi-pier pad layouts.</li>
        <li>Ordering exact yardage with no waste on rough trenches.</li>
        <li>Using this rectangle tool for Sonotube piers or dug fence cylinders.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Write length, width, thickness, pad count, and waste percent from the calculator.</li>
        <li>Note 40 / 60 / 80 lb bag totals or ready-mix yards (round up as needed).</li>
        <li>Confirm-local-code on footing width, thickness, and frost depth before delivery day.</li>
        <li>Stage forms, vapor or drainage details, and rebar per the plan—volume alone is not a build checklist.</li>
        <li>Check truck access for ready-mix or wheelbarrow paths for bagged mix.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Results assume rectangular strips or pads with uniform thickness. Real trenches vary. This tool does not size structural footings, frost depth, or reinforcement. See <a href="/methodology/">methodology</a> for sources and the correction log.</p>
  `,
  howTo: {
    name: 'How to estimate footing concrete yards and bags',
    steps: [
      {
        name: 'Choose strip or pad and enter dimensions',
        text: 'Select continuous strip or pad footing. Enter length, width, and thickness; add pad count for identical pads.',
      },
      {
        name: 'Set waste percent',
        text: 'Add waste for trench over-dig and spillage (default 10%). Round up when the trench is irregular.',
      },
      {
        name: 'Read yards and bag counts',
        text: 'Convert cubic feet ÷ 27 for yards. Bag counts use the yield on your mix label (about 0.60 cu ft per 80 lb bag for QUIKRETE Concrete Mix 1101).',
      },
      {
        name: 'Confirm-local-code before you dig',
        text: 'Match width, thickness, and frost depth to your plan or building department. Estimate rebar separately if the detail requires it.',
      },
    ],
  },
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
} as const;

export type FootingCalculatorStaging = typeof footingCalculatorStaging;

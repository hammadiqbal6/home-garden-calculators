/**
 * Staging copy for /calculators/concrete-slab-cost-calculator/ — not wired into tools.ts yet.
 * Worked numbers match slabCostEstimate() / concreteCostCompare() in concreteExtras.
 * Prices in examples are user-entered samples only — no regional defaults.
 * datePublished / dateModified: 2026-11-19
 */
export const concreteSlabCostCalculatorStaging = {
  slug: 'concrete-slab-cost-calculator',
  name: 'Concrete Slab Cost Calculator',
  shortName: 'Slab cost',
  category: 'concrete' as const,
  primaryKeyword: 'concrete slab cost calculator',
  secondaryKeywords: [
    'concrete cost calculator',
    'how much does a concrete slab cost',
    'ready mix vs bagged concrete cost',
    'concrete slab price estimator',
    'cost of concrete for a patio',
  ],
  title: 'Concrete Slab Cost Calculator | YardTally',
  description:
    'Free concrete slab cost calculator: volume plus your bag and ready-mix prices. Compare bags vs delivered yards—no invented regional rates.',
  h1: 'Concrete Slab Cost Calculator: Bags vs Ready-Mix',
  answerFirst:
    'A 10×10 ft slab at 4 inches with 10% waste is about 1.36 cu yd (62 × 80 lb bags). Enter your bag and ready-mix prices—this tool invents no regional rates. At sample $6.50/80 lb bag versus $160/yd plus $100 delivery, ready-mix wins on that pour. Confirm quotes locally.',
  summary: 'Slab volume with user-entered bag and ready-mix cost comparison.',
  calculatorId: 'slab-cost',
  relatedSlugs: [
    'concrete-calculator',
    'gravel-calculator',
    'rebar-calculator',
    'sonotube-concrete-calculator',
  ],
  relatedGuideSlugs: [
    'concrete-for-10x10-slab',
    'how-many-bags-of-concrete',
  ],
  faq: [
    {
      question: 'How much does a concrete slab cost?',
      answer:
        'Material cost equals volume times the prices you enter—YardTally does not invent regional rates. First size the slab (length × width × thickness), add waste, then multiply bag counts or ready-mix yards by your supplier quotes. Labor, forms, base gravel, and finishing are separate line items.',
    },
    {
      question: 'How do I compare bagged concrete vs ready-mix?',
      answer:
        'Enter price per 40 / 60 / 80 lb bag and price per cubic yard plus any delivery fee. The calculator totals each option for the same volume. Ready-mix often includes a short-load or delivery fee; bags skip the truck fee but add mixing labor.',
    },
    {
      question: 'How many bags of concrete for a 10×10 slab?',
      answer:
        'At 4 inches with 10% waste: about 36.7 cu ft → 62 × 80 lb bags or 82 × 60 lb bags using QUIKRETE 1101 planning yields (0.60 / 0.45 cu ft). See the 10×10 slab guide for thickness charts. Cost still needs your bag price entered above.',
    },
    {
      question: 'Does this include gravel base or labor?',
      answer:
        'No. Concrete volume and the prices you type are the only cost inputs. Order base stone with the gravel calculator. Forms, rebar, finishing, and crew time stay on your own worksheet.',
    },
    {
      question: 'Why does ready-mix round to quarter yards?',
      answer:
        'Many plants ticket ready-mix in 0.25 cu yd increments. After waste, a 1.36 cu yd pour may show as a 1.5 cu yd order for pricing. Confirm the increment your plant uses.',
    },
    {
      question: 'Slab cost calculator vs concrete calculator?',
      answer:
        'The main concrete calculator owns volume and bag counts for slabs and steps. This page adds optional cost fields you fill in. Same volume math; cost intent lives here so the volume page stays focused on yards and bags.',
    },
  ],
  sources: [
    {
      label: 'QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields',
      href: 'https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf',
      usedFor: 'Bag yields for converting slab volume to bag counts before pricing',
      checked: '2026-11-19',
    },
    {
      label: 'QUIKRETE – Concrete calculator & bag yields',
      href: 'https://www.quikrete.com/calculator/main.asp',
      usedFor: 'Cross-check bag coverage used in cost totals',
      checked: '2026-11-19',
    },
    {
      label: 'Sakrete – Concrete calculator',
      href: 'https://sakrete.com/resources/calculators/',
      usedFor: 'Cross-check bagged concrete coverage estimates',
      checked: '2026-11-19',
    },
  ],
  sectionsHtml: `
      <h2>How this concrete slab cost calculator works</h2>
      <p>Enter slab length, width, and thickness, then optional waste. The tool returns cubic feet, cubic yards, and bag counts using the same QUIKRETE 1101 / Sakrete-style yields as the main concrete calculator (about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb). Next, type the bag prices and ready-mix price you were quoted. Totals update from <strong>your</strong> numbers only—there are no built-in city or regional price defaults.</p>
      <p>Volume-only planning without cost fields stays on the <a href="/calculators/concrete-calculator/">concrete calculator</a>. Thickness charts: <a href="/guides/concrete-for-10x10-slab/">concrete for a 10×10 slab</a>. Bag math: <a href="/guides/how-many-bags-of-concrete/">how many bags of concrete</a>.</p>

      <h2>How it's calculated</h2>
      <ul>
        <li><strong>Volume:</strong> length × width × (thickness in feet)</li>
        <li><strong>With waste:</strong> volume × (1 + waste)</li>
        <li><strong>Bags:</strong> ceil(volume_cu_ft ÷ bag_yield)</li>
        <li><strong>Bag cost:</strong> bags × price_per_bag (only for sizes you price)</li>
        <li><strong>Ready-mix cost:</strong> order_yards × price_per_yd + delivery_fee</li>
      </ul>
      <p>Order yards round up to the next 0.25 cu yd for planning tickets. Replace that rule if your plant uses a different increment.</p>

      <h2>Thickness planning (confirm-local-code)</h2>
      <p>Many residential patio and shed slabs use about 4 inches over compacted base. Driveways and heavier loads often need thicker sections plus reinforcement. Treat thickness as <strong>confirm-local-code</strong>—this page estimates material cost from the thickness you enter; it does not design the slab.</p>
      <p>Gravel or crushed-stone base is a separate order. Size it with the <a href="/calculators/gravel-calculator/">gravel calculator</a>. Rebar mats, if required, use the <a href="/calculators/rebar-calculator/">rebar calculator</a>.</p>

      <h2>Worked example: 10×10×4&quot; with sample prices</h2>
      <p>Volume before waste = 10 × 10 × (4÷12) = 33.33 cu ft ≈ 1.23 cu yd. With 10% waste → 36.67 cu ft ≈ <strong>1.36 cu yd</strong> → <strong>62 × 80 lb bags</strong> (or 82 × 60 lb).</p>
      <p>Sample prices you might type (not YardTally defaults):</p>
      <ul>
        <li>$6.50 per 80 lb bag → 62 × 6.50 = <strong>$403</strong> bagged</li>
        <li>$160 per cu yd + $100 delivery on a 1.5 cu yd rounded ticket → 1.5 × 160 + 100 = <strong>$340</strong> ready-mix</li>
      </ul>
      <p>On those sample inputs, ready-mix is cheaper before labor. Your quotes will differ—always overwrite the price fields with local supplier numbers.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Size the pour first, then paste real quotes into the price fields. The calculator never invents a regional slab price.</div>

      <h2>What this cost tool leaves out</h2>
      <p>Forms, stakes, vapor barrier, wire or rebar, finishing tools, pump fees, and crew wages are outside the price boxes. Add them on a separate worksheet. Dye, fiber, and strength upgrades change both bag product and ready-mix unit price—use the line items on your quote.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using a national average price instead of a local quote.</li>
        <li>Comparing bag totals to ready-mix without including delivery or short-load fees.</li>
        <li>Forgetting waste so the cost looks artificially low.</li>
        <li>Folding gravel base into the concrete thickness input.</li>
        <li>Treating material cost as the full project budget.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Lock length, width, thickness, and waste; write yards and bag counts.</li>
        <li>Call for bag unit prices and ready-mix price + delivery on the same day.</li>
        <li>Enter only the prices you verified; leave unused bag sizes blank.</li>
        <li>Order gravel base and rebar as separate lines.</li>
        <li>Confirm-local-code on slab thickness, joints, and inspections before pour day.</li>
      </ul>


      <h2>Reading the cost comparison</h2>
      <p>When both bag prices and ready-mix prices are filled in, compare the cheapest priced bag size to the ready-mix total that includes delivery. A lower material total does not always win if you lack helpers to mix bags or if the truck cannot reach the forms. Re-run the numbers after you get same-day quotes so fuel surcharges and short-load fees are current.</p>
      <p>Blank price fields stay out of the comparison. If you only price 80 lb bags, the tool will not invent 40 or 60 lb totals. That keeps the page honest about regional pricing: every dollar figure is yours.</p>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Cost totals are only as good as the prices you enter. Volume assumes a flat rectangle. No labor, tax, or permit fees are included. See <a href="/methodology/">methodology</a> for sources and the correction log.</p>
  `,
  howTo: {
    name: 'How to estimate concrete slab material cost',
    steps: [
      {
        name: 'Enter slab dimensions and waste',
        text: 'Measure length, width, and thickness. Add waste for edges and spillage (default 10%).',
      },
      {
        name: 'Read volume and bag counts',
        text: 'Note cubic yards and 40 / 60 / 80 lb bags using the yield on your mix label before you price anything.',
      },
      {
        name: 'Enter your bag and ready-mix prices',
        text: 'Type local unit prices and any delivery fee. Leave blank any bag size you will not buy. No regional defaults are applied.',
      },
      {
        name: 'Compare totals and confirm quotes',
        text: 'Pick the cheaper material path for this pour, then confirm numbers with the supplier and confirm-local-code on thickness before ordering.',
      },
    ],
  },
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
} as const;

export type ConcreteSlabCostCalculatorStaging = typeof concreteSlabCostCalculatorStaging;

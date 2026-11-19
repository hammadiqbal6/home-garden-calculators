/**
 * Staging copy for /calculators/deck-footing-calculator/ — not wired into tools.ts yet.
 * Worked numbers match deckFootingConcrete() / deckFootingCount() in concreteExtras.
 * datePublished / dateModified: 2026-11-19
 */
export const deckFootingCalculatorStaging = {
  slug: 'deck-footing-calculator',
  name: 'Deck Footing Calculator',
  shortName: 'Deck footings',
  category: 'concrete' as const,
  primaryKeyword: 'deck footing calculator',
  secondaryKeywords: [
    'deck pier calculator',
    'how many deck footings',
    'deck post footing concrete',
    'sonotube deck footing',
    'deck footing spacing concrete',
  ],
  title: 'Deck Footing Calculator: Piers | YardTally',
  description:
    'Free deck footing calculator: pier count from spacing plus Sonotube concrete in yards and bags. Pair with deck tools—confirm frost depth locally.',
  h1: 'Deck Footing Calculator: Pier Count & Concrete',
  answerFirst:
    'A 12×16 ft deck on an 8 ft pier grid needs 6 footings. With 12-inch Sonotubes 4 ft deep and 5% waste, plan about 0.73 cu yd—roughly thirty-three 80 lb bags. This calculator counts piers from spacing, then sizes tube concrete. Link the Sonotube and deck material tools next. Confirm frost depth locally.',
  summary: 'Deck pier count from grid spacing plus tube concrete volume.',
  calculatorId: 'deck-footing',
  relatedSlugs: [
    'sonotube-concrete-calculator',
    'deck-material-calculator',
    'concrete-calculator',
    'lumber-calculator',
  ],
  relatedGuideSlugs: [
    'how-much-concrete-in-a-sonotube',
    'deck-material-list-12x16',
    'deck-material-list-16x24',
    'how-many-bags-of-concrete',
  ],
  faq: [
    {
      question: 'How many footings does a deck need?',
      answer:
        'Pier count follows your beam and joist layout, not a single rule for every deck. This calculator uses a rectangular grid: posts along each edge = floor(span ÷ spacing) + 1, then multiplies the two directions. A 12×16 ft deck at 8 ft spacing is 2 × 3 = 6 footings. Confirm the layout on your plan before you dig.',
    },
    {
      question: 'How much concrete per deck footing?',
      answer:
        'Treat each pier as a cylinder (and optional bell or pad if your detail uses one). A 12-inch inside-diameter tube 4 ft tall is about 3.14 cu ft before waste—about six 80 lb bags per tube (QUIKRETE 1101 yield ~0.60 cu ft). Multiply by pier count and add a small waste factor for spillage.',
    },
    {
      question: 'How deep should deck footings be?',
      answer:
        'Depth is a frost and bearing decision. Dig to the depth on your plan or below local frost where required. Label every depth choice as confirm-local-code. This tool only converts the tube diameter and height you enter into concrete volume.',
    },
    {
      question: 'Deck footing calculator vs Sonotube calculator?',
      answer:
        'This page counts piers from deck spacing, then sizes identical tubes. The Sonotube concrete calculator is the right place when you already know tube count and just need bags for mixed diameters. Both use inside diameter and the same bag yields.',
    },
    {
      question: 'Do I still need a deck material list?',
      answer:
        'Yes. Footing concrete is separate from boards and joists. After piers are sized, run the deck material calculator and size guides such as the 12×16 or 16×24 deck material lists for lumber takeoffs.',
    },
    {
      question: 'Can I use bagged concrete for deck piers?',
      answer:
        'Bagged mix works for modest pier counts when you can place each tube without cold joints that your inspector rejects. Larger decks or continuous pours often use ready-mix. Compare labor, access, and bag totals before pour day.',
    },
  ],
  sources: [
    {
      label: 'Sonotube concrete forms – product sizing',
      href: 'https://www.sonotube.com/sonotube-concrete-forms',
      usedFor: 'Inside diameter / form sizing for round cardboard tubes',
      checked: '2026-11-19',
    },
    {
      label: 'QUIKRETE Concrete Mix (No. 1101) data sheet – bag yields',
      href: 'https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf',
      usedFor: 'Bag yields (~0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb)',
      checked: '2026-11-19',
    },
    {
      label: 'QUIKRETE – Concrete calculator & bag yields',
      href: 'https://www.quikrete.com/calculator/main.asp',
      usedFor: 'Cross-check bag coverage for pier volumes',
      checked: '2026-11-19',
    },
  ],
  sectionsHtml: `
      <h2>How this deck footing calculator works</h2>
      <p>Enter deck length and width, pier spacing along each direction, then tube inside diameter and fill height. The tool counts footings on a rectangular grid and returns total concrete in cubic feet, cubic yards, and 40 / 60 / 80 lb bags. Default waste for formed tubes is 5% for spillage.</p>
      <p>Pair this page with the <a href="/calculators/sonotube-concrete-calculator/">Sonotube concrete calculator</a> when you already know pier count, and with the <a href="/calculators/deck-material-calculator/">deck material calculator</a> for boards and joists. Framing takeoffs for common sizes: <a href="/guides/deck-material-list-12x16/">12×16 deck material list</a> and <a href="/guides/deck-material-list-16x24/">16×24 deck material list</a>.</p>

      <h2>How it's calculated</h2>
      <ul>
        <li><strong>Pier count:</strong> along each edge = floor(span ÷ spacing) + 1; total = along-length × along-width</li>
        <li><strong>Tube volume:</strong> π × (inside diameter ÷ 2)² × height × pier count</li>
        <li><strong>With waste:</strong> total = volume × (1 + waste)</li>
        <li><strong>Bags:</strong> ceil(total_cu_ft ÷ bag_yield)</li>
      </ul>
      <p>Use inside diameter printed on the cardboard form. Outside cardboard thickness is not filled with concrete. Bag yields follow QUIKRETE 1101 / Sakrete planning figures (~0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb).</p>

      <h2>Depth and diameter planning (confirm-local-code)</h2>
      <p>Tube diameter, embedment, and any bell or pad under the pier come from the deck plan or local practice. Frost heave risk drives depth in cold climates. Treat every diameter and depth entry as <strong>confirm-local-code</strong> before you dig. This calculator does not design post size, beam spans, or lateral bracing.</p>
      <p>If your detail shows a flared bell or circular pad under the tube, add that volume in the advanced footing options when available, or estimate the extra cylinder/frustum separately and add it to the order.</p>

      <h2>Worked example: 12×16 deck on 8 ft spacing</h2>
      <p>Deck footprint 12 ft × 16 ft. Spacing 8 ft both ways:</p>
      <ul>
        <li>Along 12 ft: floor(12÷8) + 1 = 2 posts</li>
        <li>Along 16 ft: floor(16÷8) + 1 = 3 posts</li>
        <li>Total footings = 2 × 3 = <strong>6</strong></li>
      </ul>
      <p>Each pier uses a 12-inch Sonotube filled 4 ft: π × 0.5² × 4 ≈ 3.14 cu ft per tube. Six tubes ≈ 18.85 cu ft before waste. With 5% waste → about <strong>19.8 cu ft (0.73 cu yd)</strong>—roughly <strong>thirty-three 80 lb bags</strong> or forty-four 60 lb bags. Per-footing volume with waste is about 3.3 cu ft.</p>
      <p>Live bag charts by diameter also live in the <a href="/guides/how-much-concrete-in-a-sonotube/">how much concrete in a Sonotube</a> guide.</p>
      <div class="takeaway"><strong>Key takeaway:</strong> Count piers from spacing first, then multiply one tube’s volume. Confirm frost depth and tube size with local code before you order bags.</div>

      <h2>Link the lumber takeoff</h2>
      <p>Concrete for piers does not replace a board and joist list. After footings are set, size decking and framing with the deck material calculator. Keep footing concrete on this page or the Sonotube tool so lumber waste factors never get mixed into bag counts.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Using outside tube diameter instead of inside diameter.</li>
        <li>Copying a neighbor’s pier count without matching beam layout and spacing.</li>
        <li>Ignoring frost depth (confirm-local-code) and pouring shallow pads on organic soil.</li>
        <li>Forgetting to multiply by pier count after sizing one tube.</li>
        <li>Ordering deck boards before footings are located and approved.</li>
      </ul>

      <h2>Shopping checklist</h2>
      <ul>
        <li>Record pier count, tube diameter, fill height, and waste percent.</li>
        <li>Write bag totals or ready-mix yards; round up for spillage on tall forms.</li>
        <li>Brace Sonotubes plumb before pouring; stage water and tools for bagged mix.</li>
        <li>Confirm-local-code on frost depth, post hardware, and inspections.</li>
        <li>Run the <a href="/calculators/deck-material-calculator/">deck material calculator</a> for boards, joists, and fasteners after pier layout is locked.</li>
      </ul>

      <h2>Assumptions and limits</h2>
      <p><strong>Planning estimate only.</strong> Grid counting assumes a rectangular layout with even spacing. Real decks may drop or add posts for stairs, landings, or beams. This tool does not size structural members or frost depth. See <a href="/methodology/">methodology</a> for sources and limits.</p>
  `,
  howTo: {
    name: 'How to estimate deck pier count and concrete',
    steps: [
      {
        name: 'Enter deck size and pier spacing',
        text: 'Measure the deck footprint and the planned spacing along length and width. The calculator counts posts as floor(span ÷ spacing) + 1 each way.',
      },
      {
        name: 'Enter tube diameter and fill height',
        text: 'Use the inside diameter of the cardboard form (Sonotube or equivalent) and the concrete fill height to frost or plan depth.',
      },
      {
        name: 'Read pier count, yards, and bags',
        text: 'Review footing count, cubic yards, and 40 / 60 / 80 lb bag totals with waste. Confirm yields on the mix bag you buy.',
      },
      {
        name: 'Confirm-local-code and link lumber tools',
        text: 'Verify frost depth and pier size with local code. Then size boards and joists with the Sonotube and deck material calculators as needed.',
      },
    ],
  },
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
} as const;

export type DeckFootingCalculatorStaging = typeof deckFootingCalculatorStaging;

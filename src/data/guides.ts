import { siteConfig } from '../config/site';

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
}

const UPDATED = siteConfig.contentUpdated;

export const guides: GuideDefinition[] = [
  {
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
    dateModified: UPDATED,
    bodyHtml: `
      <div class="takeaway"><strong>Key takeaway:</strong> Calculate cylinder volume for each hole, then convert to bags. Do not guess from post height alone—diameter and depth matter more.</div>
      <h2>How it's calculated</h2>
      <p>Volume of one hole ≈ π × (diameter ÷ 2)² × depth. Convert diameter to feet (8&nbsp;in = 0.667&nbsp;ft). Bags ≈ ceil(volume_cu_ft ÷ bag_yield), then multiply by post count and add ~10% waste.</p>
      <h2>Quick chart (approx., before waste)</h2>
      <div class="table-scroll">
      <table>
        <caption>Approximate concrete volume and 80&nbsp;lb bags per fence post hole</caption>
        <thead><tr><th>Hole diameter</th><th>Depth</th><th>Volume</th><th>80 lb bags</th></tr></thead>
        <tbody>
          <tr><td>8"</td><td>2 ft</td><td>0.70 cu ft</td><td>2</td></tr>
          <tr><td>10"</td><td>2.5 ft</td><td>1.36 cu ft</td><td>3</td></tr>
          <tr><td>12"</td><td>3 ft</td><td>2.36 cu ft</td><td>4</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Worked example: 12 posts</h2>
      <p>Twelve 8&quot; × 2&nbsp;ft holes ≈ 12 × 0.70 = 8.4&nbsp;cu&nbsp;ft. With 10% waste → 9.2&nbsp;cu&nbsp;ft. At 0.60&nbsp;cu&nbsp;ft per 80&nbsp;lb bag that is about 16 bags (ceil(9.2 ÷ 0.60)).</p>
      <h2>Step-by-step</h2>
      <ol>
        <li>Count posts with the <a href="/calculators/fence-calculator/">fence calculator</a>.</li>
        <li>Decide hole diameter (often 3× post width) and depth (commonly ⅓ post height, below frost).</li>
        <li>Run the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a> (not the slab calculator).</li>
        <li>Add ~10% waste and buy matching bags or order ready-mix for large runs.</li>
      </ol>
      <h2>Common mistakes</h2>
      <ul>
        <li>Setting posts too shallow for wind load or frost heave.</li>
        <li>Filling to the top without sloping for drainage away from the post.</li>
        <li>Using interior drywall mix instead of outdoor concrete/setting mix.</li>
        <li>Using the slab tool for round holes (use the post-hole tool instead).</li>
      </ul>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/athome/project-setting-a-fence-post.asp" rel="noopener noreferrer">QUIKRETE – Setting a fence post</a></li>
        <li><a href="https://www.quikrete.com/calculator/main.asp" rel="noopener noreferrer">QUIKRETE calculator &amp; yields</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener noreferrer">Clemson HGIC landscape resources</a></li>
      </ul>
    `,
  },
  {
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
    relatedGuideSlugs: ['mulch-for-common-garden-beds', 'how-much-concrete-for-fence-posts'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <p>This guide answers “how deep,” not “how many bags.” For quantities, use the <a href="/calculators/mulch-calculator/">mulch calculator</a> or the <a href="/guides/mulch-for-common-garden-beds/">common bed sizes chart</a>.</p>
      <h2>Recommended depths</h2>
      <div class="table-scroll">
      <table>
        <caption>Typical organic mulch depths by landscape area</caption>
        <thead><tr><th>Area</th><th>Typical depth</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Shrub &amp; perennial beds</td><td>2–3"</td><td>Replenish as it decomposes</td></tr>
          <tr><td>Tree rings</td><td>2–3"</td><td>Keep clear of trunk bark</td></tr>
          <tr><td>Paths (wood chips)</td><td>3–4"</td><td>Expect compaction</td></tr>
        </tbody>
      </table>
      </div>
      <h2>How volume follows from depth</h2>
      <p>Cubic feet = area (sq&nbsp;ft) × (depth_inches ÷ 12). Cubic yards = cubic feet ÷ 27. At 3&nbsp;inches, each 100&nbsp;sq&nbsp;ft needs about 25&nbsp;cu&nbsp;ft (≈0.93&nbsp;cu&nbsp;yd).</p>
      <h2>Worked example</h2>
      <p>A 20 × 5&nbsp;ft bed at 3&nbsp;inches: 100 × 0.25 = 25&nbsp;cu&nbsp;ft ≈ thirteen 2&nbsp;cu&nbsp;ft bags. Use the calculator for irregular beds by splitting into rectangles.</p>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed" rel="noopener noreferrer">Iowa State Extension – Mulch amount</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS – Choosing and installing mulches</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/mulch/" rel="noopener noreferrer">Clemson HGIC – Mulch</a></li>
        <li><a href="https://extension.msstate.edu/publications/mulches-for-the-landscape" rel="noopener noreferrer">Mississippi State Extension – Mulches for the landscape</a></li>
      </ul>
    `,
  },
  {
    slug: 'how-many-bags-of-concrete',
    title: 'How Many Bags of Concrete Do I Need?',
    description:
      'Convert cubic feet and yards to 40, 60, and 80 lb concrete bags with yield tables, waste tips, and free calculators.',
    h1: 'How Many Bags of Concrete Do I Need?',
    primaryKeyword: 'how many bags of concrete do I need',
    secondaryKeywords: ['80 lb bags of concrete per yard', 'concrete bag calculator'],
    answerFirst:
      'An 80 lb bag yields about 0.60 cu ft; you need roughly 45 bags per cubic yard before waste. Divide your project volume in cubic feet by the bag yield (about 0.30 / 0.45 / 0.60 for 40 / 60 / 80 lb), then round up. For pours larger than about one yard, ready-mix is usually more practical.',
    relatedToolSlugs: ['concrete-calculator', 'concrete-calculator-post-holes', 'sonotube-concrete-calculator'],
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts', 'concrete-for-10x10-slab'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <h2>Bag yield table</h2>
      <p>An 80&nbsp;lb bag yields about 0.60&nbsp;cu&nbsp;ft; you need roughly 45 bags per cubic yard (27 ÷ 0.60) before waste.</p>
      <div class="table-scroll">
      <table>
        <caption>Typical bagged concrete yields used by YardCalc</caption>
        <thead><tr><th>Bag</th><th>Yield (approx.)</th><th>Bags / cu yd</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 cu ft</td><td>~90</td></tr>
          <tr><td>60 lb</td><td>0.45 cu ft</td><td>~60</td></tr>
          <tr><td>80 lb</td><td>0.60 cu ft</td><td>~45</td></tr>
        </tbody>
      </table>
      </div>
      <h2>How it's calculated</h2>
      <p>Bags = ceil(volume_cu_ft ÷ yield). Volume for a slab = length × width × (thickness_inches ÷ 12). Divide cubic feet by 27 for yards. Add 5–10% waste for uneven subgrade and spillage.</p>
      <h2>Worked example: 10×10×4&quot; slab</h2>
      <p>10 × 10 × (4÷12) = 33.33&nbsp;cu&nbsp;ft ≈ 1.23&nbsp;cu&nbsp;yd. With 10% waste → 36.7&nbsp;cu&nbsp;ft ≈ 62 bags of 60&nbsp;lb or 46 bags of 80&nbsp;lb. See the dedicated <a href="/guides/concrete-for-10x10-slab/">10×10 slab guide</a> for more sizes.</p>
      <p>Start with the <a href="/calculators/concrete-calculator/">concrete calculator</a> for slabs, steps, and footings. Use the <a href="/calculators/concrete-calculator-post-holes/">post hole</a> or <a href="/calculators/sonotube-concrete-calculator/">Sonotube</a> tools for cylinders.</p>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/calculator/main.asp" rel="noopener noreferrer">QUIKRETE yields</a></li>
        <li><a href="https://sakrete.com/resources/calculators/" rel="noopener noreferrer">Sakrete calculator</a></li>
        <li><a href="https://www.cement.org/" rel="noopener noreferrer">American Cement Association</a></li>
      </ul>
    `,
  },
  {
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
    relatedGuideSlugs: ['how-many-bags-of-concrete'],
    datePublished: '2026-10-20',
    dateModified: UPDATED,
    bodyHtml: `
      <p>This page is a size-specific worked chart. For arbitrary dimensions use the <a href="/calculators/concrete-calculator/">concrete calculator</a>. It does not replace post-hole or Sonotube tools.</p>
      <figure class="diagram">
        <img src="/diagrams/slab-dimensions.svg" width="960" height="540" alt="Diagram of a rectangular concrete slab showing length, width and thickness" loading="lazy" />
      </figure>
      <h2>How it's calculated</h2>
      <p>Volume (cu&nbsp;ft) = 10 × 10 × (thickness_inches ÷ 12). Yards = cu&nbsp;ft ÷ 27. Bags = ceil(cu&nbsp;ft × 1.10 ÷ yield) with ~10% waste.</p>
      <h2>10×10 slab chart</h2>
      <div class="table-scroll">
      <table>
        <caption>10×10 ft slab volume and approximate bags with 10% waste</caption>
        <thead><tr><th>Thickness</th><th>Cu ft</th><th>Cu yd</th><th>80 lb bags (+10%)</th><th>60 lb bags (+10%)</th></tr></thead>
        <tbody>
          <tr><td>4"</td><td>33.3</td><td>1.23</td><td>~46</td><td>~62</td></tr>
          <tr><td>5"</td><td>41.7</td><td>1.54</td><td>~58</td><td>~77</td></tr>
          <tr><td>6"</td><td>50.0</td><td>1.85</td><td>~69</td><td>~92</td></tr>
        </tbody>
      </table>
      </div>
      <h2>Other common patio sizes (4&quot; thick, before waste)</h2>
      <div class="table-scroll">
      <table>
        <thead><tr><th>Size</th><th>Cu ft</th><th>Cu yd</th></tr></thead>
        <tbody>
          <tr><td>8×8</td><td>21.3</td><td>0.79</td></tr>
          <tr><td>10×12</td><td>40.0</td><td>1.48</td></tr>
          <tr><td>12×12</td><td>48.0</td><td>1.78</td></tr>
        </tbody>
      </table>
      </div>
      <p>Near or above one cubic yard, ready-mix often wins on labor if a truck can access the site. Always compact a gravel base separately—base volume is not included in slab concrete.</p>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/calculator/main.asp" rel="noopener noreferrer">QUIKRETE calculator</a></li>
        <li><a href="https://www.concrete.org/Portals/0/Files/PDF/Previews/332.1R-18_preview.pdf" rel="noopener noreferrer">ACI 332.1R-18 preview</a></li>
      </ul>
    `,
  },
  {
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
    relatedGuideSlugs: ['mulch-depth-guide'],
    datePublished: '2026-10-20',
    dateModified: UPDATED,
    bodyHtml: `
      <p>Depth guidance belongs in the <a href="/guides/mulch-depth-guide/">mulch depth guide</a>. This page is a quantity chart for common rectangles—customize with the <a href="/calculators/mulch-calculator/">mulch calculator</a>.</p>
      <figure class="diagram">
        <img src="/diagrams/mulch-bed-dimensions.svg" width="960" height="540" alt="Diagram of a garden bed mulch layer showing length, width and depth" loading="lazy" />
      </figure>
      <h2>How it's calculated</h2>
      <p>Cu&nbsp;ft = length × width × (depth_inches ÷ 12). Yards = cu&nbsp;ft ÷ 27. Bags (2&nbsp;cu&nbsp;ft) = ceil(cu&nbsp;ft ÷ 2).</p>
      <h2>Common bed chart at 3&quot; depth</h2>
      <div class="table-scroll">
      <table>
        <caption>Mulch volume for rectangular beds at 3 inches</caption>
        <thead><tr><th>Bed size</th><th>Sq ft</th><th>Cu ft</th><th>Cu yd</th><th>2 cu ft bags</th></tr></thead>
        <tbody>
          <tr><td>4×4</td><td>16</td><td>4.0</td><td>0.15</td><td>2</td></tr>
          <tr><td>4×8</td><td>32</td><td>8.0</td><td>0.30</td><td>4</td></tr>
          <tr><td>10×4</td><td>40</td><td>10.0</td><td>0.37</td><td>5</td></tr>
          <tr><td>12×3</td><td>36</td><td>9.0</td><td>0.33</td><td>5</td></tr>
          <tr><td>20×5</td><td>100</td><td>25.0</td><td>0.93</td><td>13</td></tr>
        </tbody>
      </table>
      </div>
      <p>At 2&quot; depth, volumes are two-thirds of the 3&quot; figures. For tree rings use the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a> so you subtract the trunk opening.</p>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed" rel="noopener noreferrer">Iowa State Extension – Mulch amount</a></li>
        <li><a href="https://gardeningsolutions.ifas.ufl.edu/care/planting/mulch/" rel="noopener noreferrer">UF/IFAS mulch guide</a></li>
      </ul>
    `,
  },
  {
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
    relatedGuideSlugs: ['mulch-depth-guide'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <h2>Common materials</h2>
      <ul>
        <li><strong>Crusher run / dense grade:</strong> fines + stone; locks when compacted—excellent base.</li>
        <li><strong>Clean crushed stone (#57 etc.):</strong> drainage layers and some surfaces.</li>
        <li><strong>Pea gravel:</strong> decorative; less ideal as the only driving surface.</li>
      </ul>
      <h2>How much to order</h2>
      <p>Volume = length × width × depth. Yards = cu&nbsp;ft ÷ 27. Tons depend on density (often ~1.2–1.4&nbsp;tons per cu&nbsp;yd for crushed stone—ask your yard). Estimate with the <a href="/calculators/gravel-calculator/">gravel calculator</a>.</p>
      <h2>Worked example</h2>
      <p>A 40 × 10&nbsp;ft drive at 4&nbsp;inches: 400 × (4÷12) = 133.3&nbsp;cu&nbsp;ft ≈ 4.9&nbsp;cu&nbsp;yd before compaction waste. Order a little extra for crowning and compaction.</p>
    `,
  },
  {
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
    relatedGuideSlugs: ['how-many-bags-of-concrete'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <h2>Three practical methods</h2>
      <ol>
        <li><strong>On a rafter (attic):</strong> safest for many homes—measure rise over 12" of run along the rafter bottom.</li>
        <li><strong>On the roof surface:</strong> only with proper fall protection; use a level and tape.</li>
        <li><strong>From drawings:</strong> use stated pitch or rise/run on section details.</li>
      </ol>
      <h2>How it's calculated</h2>
      <p>Pitch = rise / 12. Angle ≈ arctan(rise/12). Roof factor (for plan area → slope area) ≈ sqrt(1 + (rise/12)²).</p>
      <p>Convert with the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a>, then estimate shingles with the <a href="/calculators/roofing-shingles-calculator/">roofing squares calculator</a>.</p>
      <div class="takeaway"><strong>Safety:</strong> Never walk a wet or steep roof without training and protection. Hire a pro when in doubt.</div>
    `,
  },
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

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
    relatedGuideSlugs: ['how-many-bags-of-concrete'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <div class="takeaway"><strong>Key takeaway:</strong> Calculate cylinder volume for each hole, then convert to bags. Do not guess from post height alone—diameter and depth matter more.</div>
      <h2>Quick chart (approx., before waste)</h2>
      <table>
        <thead><tr><th>Hole diameter</th><th>Depth</th><th>Volume</th><th>80 lb bags</th></tr></thead>
        <tbody>
          <tr><td>8"</td><td>2 ft</td><td>0.70 cu ft</td><td>2</td></tr>
          <tr><td>10"</td><td>2.5 ft</td><td>1.36 cu ft</td><td>3</td></tr>
          <tr><td>12"</td><td>3 ft</td><td>2.36 cu ft</td><td>4</td></tr>
        </tbody>
      </table>
      <h2>Step-by-step</h2>
      <ol>
        <li>Count posts with the <a href="/calculators/fence-calculator/">fence calculator</a>.</li>
        <li>Decide hole diameter (often 3× post width) and depth (commonly ⅓ post height, below frost).</li>
        <li>Run the <a href="/calculators/concrete-calculator-post-holes/">post hole concrete calculator</a>.</li>
        <li>Add ~10% waste and buy matching bags or order ready-mix for large runs.</li>
      </ol>
      <h2>Common mistakes</h2>
      <ul>
        <li>Setting posts too shallow for wind load or frost heave.</li>
        <li>Filling to the top without sloping for drainage away from the post.</li>
        <li>Using interior drywall mix instead of outdoor concrete/setting mix.</li>
      </ul>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/calculator/default.asp" rel="noopener">Quikrete calculator &amp; yields</a></li>
        <li><a href="https://hgic.clemson.edu/" rel="noopener">Clemson HGIC landscape resources</a></li>
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
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <h2>Recommended depths</h2>
      <table>
        <thead><tr><th>Area</th><th>Typical depth</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Shrub &amp; perennial beds</td><td>2–3"</td><td>Replenish as it decomposes</td></tr>
          <tr><td>Tree rings</td><td>2–3"</td><td>Keep clear of trunk bark</td></tr>
          <tr><td>Paths (wood chips)</td><td>3–4"</td><td>Expect compaction</td></tr>
        </tbody>
      </table>
      <p>Use the <a href="/calculators/mulch-calculator/">mulch calculator</a> for beds and the <a href="/calculators/mulch-calculator-tree-rings/">tree ring mulch calculator</a> for donut volumes.</p>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://extension.psu.edu/mulching" rel="noopener">Penn State Extension – Mulching</a></li>
        <li><a href="https://hgic.clemson.edu/factsheet/mulch/" rel="noopener">Clemson HGIC – Mulch</a></li>
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
      'Divide your project volume in cubic feet by the bag yield: about 0.30 cu ft (40 lb), 0.45 cu ft (60 lb), or 0.60 cu ft (80 lb), then round up. One cubic yard needs roughly 45 bags of 80 lb mix before waste. For pours larger than about one yard, ready-mix is usually more practical.',
    relatedToolSlugs: ['concrete-calculator', 'concrete-calculator-post-holes', 'sonotube-concrete-calculator'],
    relatedGuideSlugs: ['how-much-concrete-for-fence-posts'],
    datePublished: '2026-10-19',
    dateModified: UPDATED,
    bodyHtml: `
      <h2>Bag yield table</h2>
      <table>
        <thead><tr><th>Bag</th><th>Yield (approx.)</th><th>Bags / cu yd</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 cu ft</td><td>~90</td></tr>
          <tr><td>60 lb</td><td>0.45 cu ft</td><td>~60</td></tr>
          <tr><td>80 lb</td><td>0.60 cu ft</td><td>~45</td></tr>
        </tbody>
      </table>
      <p>Start with the <a href="/calculators/concrete-calculator/">concrete calculator</a> for slabs, steps, and footings.</p>
      <h2>Sources</h2>
      <ul class="sources">
        <li><a href="https://www.quikrete.com/calculator/default.asp" rel="noopener">Quikrete yields</a></li>
        <li><a href="https://www.sakrete.com/projects-and-calculators/calculators/concrete-calculator" rel="noopener">Sakrete calculator</a></li>
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
      <p>Estimate quantity with the <a href="/calculators/gravel-calculator/">gravel calculator</a> and confirm tons with your local yard’s density.</p>
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
      <p>Convert with the <a href="/calculators/roof-pitch-calculator/">roof pitch calculator</a>, then estimate shingles with the <a href="/calculators/roofing-shingles-calculator/">roofing squares calculator</a>.</p>
      <div class="takeaway"><strong>Safety:</strong> Never walk a wet or steep roof without training and protection. Hire a pro when in doubt.</div>
    `,
  },
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

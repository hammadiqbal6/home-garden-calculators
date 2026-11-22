import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { tools } from '../data/tools';
import { guides } from '../data/guides';

export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl;
  const calcLines = tools
    .map((t) => `- [${t.name}](${origin}/calculators/${t.slug}/): ${t.summary}`)
    .join('\n');
  const guideLines = guides
    .map(
      (g) =>
        `- [${g.h1}](${origin}/guides/${g.slug}/): ${g.answerFirst.slice(0, 160).trim()}${g.answerFirst.length > 160 ? '…' : ''}`,
    )
    .join('\n');

  const body = `# ${siteConfig.name} — full LLM summary

> ${siteConfig.tagline}. Free, private, in-browser material estimators for home and garden projects (US imperial and metric). Planning estimates only—confirm product labels and local codes.

Site: ${origin}/
Maintainer: ${siteConfig.author.name}
Methodology: ${origin}/methodology/
Short index: ${origin}/llms.txt
Well-known alias: ${origin}/.well-known/llms.txt

## Question → URL map

- How much concrete is in a Sonotube? → ${origin}/guides/how-much-concrete-in-a-sonotube/
- How many bags for a 12-inch Sonotube? → ${origin}/guides/how-much-concrete-in-a-sonotube/
- Is this a concrete calculator for tubes? → ${origin}/calculators/sonotube-concrete-calculator/
- How much concrete for a Sonotube (bags by diameter)? → ${origin}/calculators/sonotube-concrete-calculator/
- Topsoil vs garden soil? → ${origin}/guides/topsoil-vs-garden-soil/
- Is garden soil the same as topsoil? → ${origin}/guides/topsoil-vs-garden-soil/
- How many bags of concrete do I need (yards & bags)? → ${origin}/calculators/concrete-calculator/
- How much concrete do I need (1 yard / 3 yards coverage)? → ${origin}/guides/how-much-concrete-do-i-need/
- How much will 1 yard of concrete cover at 4 inches? → ${origin}/guides/how-much-concrete-do-i-need/
- How many 80 lb bags of concrete are in a cubic yard? → ${origin}/guides/how-many-bags-of-concrete/
- How many 60 lb bags of concrete are in a cubic yard? → ${origin}/guides/how-many-bags-of-concrete/
- How thick should a concrete slab be? → ${origin}/guides/concrete-slab-thickness/
- Does a 4-inch concrete slab need rebar? → ${origin}/guides/concrete-slab-thickness/
- How many yards for a 30x40 slab at 4 inches? → ${origin}/guides/concrete-slab-thickness/
- How much concrete for a 10x10 slab at 4 inches? → ${origin}/guides/concrete-for-10x10-slab/
- How much concrete for a strip footing? → ${origin}/calculators/concrete-footing-calculator/
- How much concrete for pad footings? → ${origin}/calculators/concrete-footing-calculator/
- Concrete footing calculator (yards, bags, optional rebar)? → ${origin}/calculators/concrete-footing-calculator/
- How many bags of concrete per fence post? → ${origin}/guides/how-much-concrete-for-fence-posts/
- Do I need a footing under a Sonotube? → ${origin}/guides/sonotube-footing-and-depth/
- How deep should a Sonotube be? → ${origin}/guides/sonotube-footing-and-depth/
- How many bags of concrete for a Sonotube? → ${origin}/calculators/sonotube-concrete-calculator/
- How much area will one gallon of paint cover? → ${origin}/guides/how-much-paint-for-a-room/
- How much paint for a small bathroom? → ${origin}/guides/how-much-paint-for-a-room/
- How deep should mulch be for gardens? → ${origin}/guides/mulch-depth-guide/
- How much mulch do I need (bags vs bulk)? → ${origin}/calculators/mulch-calculator/
- What is the 3-3-3 rule for mulch? → ${origin}/calculators/mulch-calculator/
- How much will 25 bags of mulch cover? → ${origin}/calculators/mulch-calculator/
- How much mulch for a 4x8 garden bed? → ${origin}/guides/mulch-for-common-garden-beds/
- How many 2 cu ft and 3 cu ft bags of mulch? → ${origin}/calculators/mulch-calculator/
- How much grass seed per 1,000 square feet? → ${origin}/guides/grass-seed-per-sq-ft/
- What is the rate in pounds per square foot? → ${origin}/guides/grass-seed-per-sq-ft/
- How do I measure roof pitch? → ${origin}/guides/how-to-measure-roof-pitch/
- What does a 6/12 roof pitch mean? → ${origin}/guides/how-to-measure-roof-pitch/
- What is a roofing square? → ${origin}/guides/how-to-estimate-roofing-shingles/
- How to figure shingles for a roof? → ${origin}/guides/how-to-estimate-roofing-shingles/
- How many bundles in a square? → ${origin}/guides/how-to-estimate-roofing-shingles/
- What is dense gravel / best gravel for a driveway? → ${origin}/guides/gravel-types-for-driveways/
- How much gravel for a French drain? → ${origin}/calculators/french-drain-gravel-calculator/
- How much landscape fabric for a French drain? → ${origin}/calculators/french-drain-gravel-calculator/
- Can I use paver base under a retaining wall? → ${origin}/guides/retaining-wall-blocks-and-base/
- Is a 12x16 deck material list the same as plans? → ${origin}/guides/deck-material-list-12x16/
- How many boards for a 16x24 deck? → ${origin}/guides/deck-material-list-16x24/
- How much asphalt do I need for a driveway? → ${origin}/calculators/asphalt-calculator/
- How many tons of asphalt per square foot? → ${origin}/calculators/asphalt-calculator/
- How many bricks do I need for a wall? → ${origin}/calculators/brick-calculator/
- How many concrete blocks (CMU) for a wall? → ${origin}/calculators/brick-calculator/
- What is a board foot? → ${origin}/calculators/lumber-calculator/
- How many board feet in a 2x4x8? → ${origin}/calculators/lumber-calculator/
- How much does a 2x4 weigh per foot? → ${origin}/guides/lumber-weight-chart/
- How much does a 2x4x8 weigh? → ${origin}/guides/lumber-weight-chart/
- Lumber weight chart (SPF, Doug fir, southern pine)? → ${origin}/guides/lumber-weight-chart/
- Lumber weight calculator (board feet + lb)? → ${origin}/calculators/lumber-calculator/
- How much rebar for a concrete slab? → ${origin}/calculators/rebar-calculator/
- How much rebar for a 20x20 slab? → ${origin}/calculators/rebar-calculator/
- How many footings for a deck? → ${origin}/calculators/deck-footing-calculator/
- How much concrete per deck footing? → ${origin}/calculators/deck-footing-calculator/
- Deck footing calculator (count, frost depth, bags)? → ${origin}/calculators/deck-footing-calculator/
- How much does a concrete slab cost? → ${origin}/calculators/concrete-slab-cost-calculator/
- Concrete slab cost calculator (ready-mix or bags)? → ${origin}/calculators/concrete-slab-cost-calculator/

## Key figures (with citations)

### Concrete bag yields
- QUIKRETE Concrete Mix (No. 1101): about 0.30 / 0.375 / 0.45 / 0.60 / 0.675 cu ft for 40 / 50 / 60 / 80 / 90 lb bags. Source: https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf
- Sakrete High-Strength: about 0.30 / 0.45 / 0.6 cu ft for 40 / 60 / 80 lb (90 lb 0.66 cu ft). Source: https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf
- Cubic yard → bags before waste: 27 ÷ 0.60 ≈ 45 of the 80 lb bags; 27 ÷ 0.45 = 60 of the 60 lb bags.
- Fence post hole starting sizes: QUIKRETE Setting Posts — hole about three times post width; depth about 1/3 to 1/2 of above-ground length. Source: https://quikrete.com/athome/settingposts.asp
- Example Sonotube: 12-inch × 4 ft ≈ 3.14 cu ft → about 5.2 of the 80 lb bags before waste (plan 6), about 7 of the 60 lb bags, about 9 of the 50 lb bags, or about 11 of the 40 lb bags. Live chart: ${origin}/calculators/sonotube-concrete-calculator/
- Deck footing grid example: 16×12 freestanding deck at 8 ft post and beam spacing → 6 piers; 12″ × 4 ft each ≈ 3.14 cu ft before waste. Live tool: ${origin}/calculators/deck-footing-calculator/
- Strip footing example: 40 ft × 16 in × 8 in ≈ 35.56 cu ft (1.32 cu yd) before waste → about 66 × 80 lb bags after 10% waste. Live: ${origin}/calculators/concrete-footing-calculator/

### Paint coverage
- BEHR: one gallon of BEHR ULTRA or PREMIUM PLUS interior paint and primer covers about 250–400 sq ft with one coat. Source: https://www.behr.com/how-to/interior/determine-how-much-interior-paint-to-buy
- YardTally paint calculator default: 350 sq ft per gallon (inside that published range).

### Roofing
- One roofing square = 100 sq ft of roof surface (IKO, GAF).
- Many common asphalt lines: about 3 bundles per square (~33.3 sq ft per bundle). Specialty products may need 4–5 (IKO Crowne Slate 4; Armourshake / GAF Grand Sequoia 5).
- IKO 6:12 area factor: 1.118. Waste: about 10–15% as a general range (IKO); GAF notes up to about 10% overage.
- Sources: https://www.iko.com/na/blog/how-many-shingles-in-a-bundle/ ; https://www.gaf.com/en-us/blog/your-home/how-to-measure-a-roofing-square-3faec381-6f6f-49ff-841f-114c59108f2a

### Mulch & lawn
- Bed mulch depth: commonly about 2–3 inches organic (Clemson, UF/IFAS). Pull mulch 2–3 inches back from trunks (Mississippi State). UF/IFAS: about 108 sq ft per cubic yard at 3 inches; do not exceed 3 inches in beds.
- UVM Extension 3-3-3 tree mulch mnemonic: at least 3 inches from the trunk, no more than 3 inches deep, about 3 feet diameter (donut, not volcano). Source: https://www.uvm.edu/extension/news/beware-mulch-volcano
- One cubic yard of concrete covers about 81 sq ft at 4 inches (27 ÷ 1/3). Three yards ≈ 243 sq ft at 4 inches.
- IRMCA residential exterior flatwork: minimum 4 inches thickness; 5 inches where delivery vehicles / heavy loads expected. Source: https://irmca.org/file/640/Concrete%20Guide%20for%20Residential%20Exterior%20Flatwork.pdf
- Iowa State PM 1072 new-lawn lb per 1,000 sq ft: KY bluegrass 1–1.5; 50/50 rye/bluegrass 3–3.5; tall fescue 7–9. Source: https://yardandgarden.extension.iastate.edu/files/inline-files/PM1072.pdf
- Penn State watershed-friendly yard: about 2 lb N per 1,000 sq ft per growing season as a starting rate for many established lawns; Pennsylvania applications limited to 0.9 lb N per 1,000 per application. Sources: https://extension.psu.edu/spring-tips-for-a-watershed-friendly-yard ; https://www.pa.gov/agencies/pda/plants-land-water/fertilizer/homeowners-and-applicators

### Gravel / French drain
- Flat pads: volume = L × W × depth; tons ≈ yards × (density lb/yd³ ÷ 2000); YardTally mid crushed-stone density ≈ 2,700 lb/yd³ (confirm with yard).
- French drain: gravel = trench volume − πr²L pipe cylinder; fabric wrap width ≈ W + 2D + overlap. Residential planning ranges often ~12–18 in wide × 18–24 in deep with ~4 in pipe (LSU AgCenter).

### Asphalt, masonry, lumber, rebar
- Compacted hot-mix asphalt planning density ≈ 145 lb/cu ft (FHWA WFL estimating practice; Iowa DOT mix properties). Tons = area × depth_ft × density ÷ 2,000.
- Modular clay brick: actual face ~7⅝ × 2¼ in; with ⅜ in joint ≈ 6.86 bricks/sq ft (Glen-Gery). Standard CMU face ~15⅝ × 7⅝ in → nominal 8×16 module (CMHA).
- Softwood board feet = (nominal T_in × W_in × L_ft) ÷ 12 (7 CFR 1217.4 / ALSC PS 20). Under 1 in nominal thickness tallies as 1 in.
- Softwood weight (planning): volume_cu_ft = (actual_T × actual_W × L_ft × 12) ÷ 1728; weight_lb = volume × density. KD density ≈ SG × 62.4 × 1.12 (USDA Wood Handbook). SPF KD ~28.7 lb/cu ft → 2×4×8 ≈ 8.4 lb; Doug fir-larch KD ~33.5; southern pine KD ~35.6; green/wet PT southern pine ~53. Chart: ${origin}/guides/lumber-weight-chart/ ; live tool: ${origin}/calculators/lumber-calculator/
- Slab rebar: bars each way = floor(span_in ÷ spacing_in) + 1; convert linear feet to sticks with waste. Unit weights (CRSI): #3 ≈ 0.376 lb/ft, #4 ≈ 0.668 lb/ft. ACI 318 caps many shrinkage/temperature spacings at the lesser of 5× thickness or 18 in—confirm locally. Example: 20×20 at 18 in o.c. → 560 ft before waste.
- Concrete slab cost: volume × user-entered ready-mix $/yd (or bag count × $/bag) + optional add-ons the user prices. YardTally does not publish regional concrete prices; example form defaults are placeholders only. Live tool: ${origin}/calculators/concrete-slab-cost-calculator/

## Calculators

${calcLines}

## Guides

${guideLines}

## Hubs

- [Concrete](${origin}/hubs/concrete/)
- [Landscape](${origin}/hubs/landscape/)
- [Outdoor structures](${origin}/hubs/outdoor-structures/)
- [Lawn & garden](${origin}/hubs/lawn/)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

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
- How many 80 lb bags of concrete are in a cubic yard? → ${origin}/guides/how-many-bags-of-concrete/
- How many 60 lb bags of concrete are in a cubic yard? → ${origin}/guides/how-many-bags-of-concrete/
- How much concrete for a 10x10 slab at 4 inches? → ${origin}/guides/concrete-for-10x10-slab/
- How many bags of concrete per fence post? → ${origin}/guides/how-much-concrete-for-fence-posts/
- How much area will one gallon of paint cover? → ${origin}/guides/how-much-paint-for-a-room/
- How much paint for a small bathroom? → ${origin}/guides/how-much-paint-for-a-room/
- How deep should mulch be for gardens? → ${origin}/guides/mulch-depth-guide/
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
- Can I use paver base under a retaining wall? → ${origin}/guides/retaining-wall-blocks-and-base/
- Is a 12x16 deck material list the same as plans? → ${origin}/guides/deck-material-list-12x16/
- How many boards for a 16x24 deck? → ${origin}/guides/deck-material-list-16x24/

## Key figures (with citations)

### Concrete bag yields
- QUIKRETE Concrete Mix (No. 1101): about 0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb bags (90 lb ≈ 0.675 cu ft). Source: https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf
- Sakrete High-Strength: about 0.30 / 0.45 / 0.6 cu ft for 40 / 60 / 80 lb (90 lb 0.66 cu ft). Source: https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf
- Cubic yard → bags before waste: 27 ÷ 0.60 ≈ 45 of the 80 lb bags; 27 ÷ 0.45 = 60 of the 60 lb bags.
- Fence post hole starting sizes: QUIKRETE Setting Posts — hole about three times post width; depth about 1/3 to 1/2 of above-ground length. Source: https://quikrete.com/athome/settingposts.asp
- Example Sonotube: 12-inch × 4 ft ≈ 3.14 cu ft → about 5.2 of the 80 lb bags before waste (plan 6) or about 7 of the 60 lb bags.

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
- Iowa State PM 1072 new-lawn lb per 1,000 sq ft: KY bluegrass 1–1.5; 50/50 rye/bluegrass 3–3.5; tall fescue 7–9. Source: https://yardandgarden.extension.iastate.edu/files/inline-files/PM1072.pdf
- Penn State watershed-friendly yard: about 2 lb N per 1,000 sq ft per growing season as a starting rate for many established lawns; Pennsylvania applications limited to 0.9 lb N per 1,000 per application. Sources: https://extension.psu.edu/spring-tips-for-a-watershed-friendly-yard ; https://www.pa.gov/agencies/pda/plants-land-water/fertilizer/homeowners-and-applicators

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

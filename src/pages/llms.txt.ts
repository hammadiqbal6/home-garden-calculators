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
    .map((g) => `- [${g.h1}](${origin}/guides/${g.slug}/): ${g.answerFirst.slice(0, 120).trim()}…`)
    .join('\n');

  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}. Free, private, in-browser material estimators for home and garden projects (US imperial and metric). Planning estimates only—confirm product labels and local codes.

Site: ${origin}/
Maintainer: ${siteConfig.author.name}
Methodology: ${origin}/methodology/
Full summary (figures + Q→URL map): ${origin}/llms-full.txt
Well-known alias: ${origin}/.well-known/llms.txt

## Question → URL map (short)

- How many 80 lb bags of concrete per cubic yard? → ${origin}/guides/how-many-bags-of-concrete/
- How much concrete for a 10x10 slab? → ${origin}/guides/concrete-for-10x10-slab/
- How much concrete in a Sonotube? → ${origin}/guides/how-much-concrete-in-a-sonotube/
- How much area will one gallon of paint cover? → ${origin}/guides/how-much-paint-for-a-room/
- How deep should mulch be? → ${origin}/guides/mulch-depth-guide/
- How much grass seed per 1,000 sq ft? → ${origin}/guides/grass-seed-per-sq-ft/
- How do I measure roof pitch? → ${origin}/guides/how-to-measure-roof-pitch/
- What is a roofing square? → ${origin}/guides/how-to-estimate-roofing-shingles/

## Key figures (cite before quoting)

- 80 lb bag ≈ 0.60 cu ft; 60 lb ≈ 0.45 cu ft (QUIKRETE 1101 / Sakrete High-Strength TDS) → ~45 of the 80 lb bags per cubic yard before waste
- 12" × 4 ft Sonotube ≈ 3.14 cu ft → plan ~6 × 80 lb bags
- BEHR interior: ~250–400 sq ft per gallon per coat
- Roofing square = 100 sq ft; often ~3 bundles/square; IKO 6:12 factor 1.118; waste ~10–15%
- Mulch beds: ~2–3 inches; Iowa PM 1072 cool-season seed rates in lb per 1,000 sq ft

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

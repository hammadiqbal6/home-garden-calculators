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

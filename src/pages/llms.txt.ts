import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { tools } from '../data/tools';
import { guides } from '../data/guides';

export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl;
  const calcLines = tools
    .map((t) => `- ${origin}/calculators/${t.slug}/`)
    .join('\n');
  const guideLines = guides
    .map((g) => `- ${origin}/guides/${g.slug}/`)
    .join('\n');

  const body = `# YardCalc (optional llms.txt — Google Search ignores this file)
# Plain link list for answer engines that choose to fetch it.

Title: ${siteConfig.name} — ${siteConfig.tagline}
URL: ${origin}/

## Calculators
${calcLines}

## Guides
${guideLines}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

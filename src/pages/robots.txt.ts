import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  // Every bot-specific group must repeat Disallow rules. Groups with only
  // "Allow: /" cancel the * Disallows for that bot (most-specific group wins).
  const disallows = `Allow: /
Disallow: /embed/
Disallow: /*?utm_`;

  const body = `# YardCalc robots.txt
# Favicons and apple-touch-icon must stay crawlable (Google favicon guidance).

User-agent: *
${disallows}

User-agent: Googlebot
${disallows}

User-agent: Bingbot
${disallows}

User-agent: OAI-SearchBot
${disallows}

User-agent: ChatGPT-User
${disallows}

User-agent: PerplexityBot
${disallows}

User-agent: Claude-SearchBot
${disallows}

User-agent: GPTBot
${disallows}

User-agent: Google-Extended
${disallows}

User-agent: ClaudeBot
${disallows}

User-agent: CCBot
${disallows}

Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

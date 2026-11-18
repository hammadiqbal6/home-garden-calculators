import type { APIRoute } from 'astro';
import { siteConfig } from '../../config/site';

/**
 * RFC 9116 security.txt — contact + privacy policy for security researchers.
 * Generated so Canonical uses siteConfig.siteUrl (no hardcoded hostname).
 */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/+$/, '');
  const contact = siteConfig.contactEmail;
  // ~1 year horizon (matches sister-site Docuklin practice).
  const expires = '2027-11-18T00:00:00.000Z';
  const body = [
    `Contact: mailto:${contact}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en',
    `Canonical: ${origin}/.well-known/security.txt`,
    `Policy: ${origin}/privacy/`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

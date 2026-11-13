/**
 * Inject a geo country meta tag into HTML so the client can suppress the site
 * cookie banner in EEA/UK/CH (Google CMP region) without a second popup.
 */
export const GEO_COUNTRY_META_NAME = 'yt-geo-country';

export function injectGeoCountryMeta(html: string, countryCode: string): string {
  const cc = String(countryCode || 'XX')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 2) || 'XX';

  // Already injected (e.g. nested fetch) — leave alone.
  if (new RegExp(`<meta\\s+[^>]*name=["']${GEO_COUNTRY_META_NAME}["']`, 'i').test(html)) {
    return html;
  }

  const meta = `<meta name="${GEO_COUNTRY_META_NAME}" content="${cc}" />`;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${meta}`);
  }
  return meta + html;
}

/** Best-effort visitor country from a Cloudflare Worker request. */
export function countryFromWorkerRequest(request: {
  cf?: { country?: string | null };
  headers: Headers;
}): string {
  const fromCf = request.cf?.country;
  if (fromCf && typeof fromCf === 'string' && fromCf.trim()) {
    return fromCf.trim().toUpperCase();
  }
  const header = request.headers.get('CF-IPCountry');
  if (header && header.trim()) return header.trim().toUpperCase();
  return 'XX';
}

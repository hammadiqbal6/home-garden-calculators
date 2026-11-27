import { describe, expect, it } from 'vitest';
import {
  NOT_FOUND_ASSET_PATH,
  isNotFoundPath,
  notFoundAssetUrl,
  notFoundResponseHeaders,
} from '../src/lib/notFoundResponse';

describe('notFoundResponse helpers', () => {
  it('treats /404, /404/, and /404.html as not-found paths', () => {
    expect(isNotFoundPath('/404')).toBe(true);
    expect(isNotFoundPath('/404/')).toBe(true);
    expect(isNotFoundPath('/404.html')).toBe(true);
    expect(isNotFoundPath('/cookies/')).toBe(false);
  });

  it('asks ASSETS for /404/ (not /404.html) to avoid empty 307 bodies', () => {
    expect(NOT_FOUND_ASSET_PATH).toBe('/404/');
    expect(notFoundAssetUrl('https://getyardtally.com').pathname).toBe('/404/');
    expect(notFoundAssetUrl('https://getyardtally.com').href).toBe(
      'https://getyardtally.com/404/',
    );
  });

  it('strips Location and sets no-store on 404 responses', () => {
    const headers = notFoundResponseHeaders(
      new Headers({
        Location: '/404/',
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=0',
      }),
    );
    expect(headers.get('Location')).toBeNull();
    expect(headers.get('Cache-Control')).toBe('no-store');
    expect(headers.get('Content-Type')).toBe('text/html');
  });
});

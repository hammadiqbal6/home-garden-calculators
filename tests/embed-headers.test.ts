import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('embed framing headers', () => {
  const headers = readFileSync(resolve('public/_headers'), 'utf8');

  it('keeps X-Frame-Options SAMEORIGIN on the site-wide /* rule', () => {
    const siteWide = headers.split('/embed/*')[0] ?? headers;
    expect(siteWide).toMatch(/X-Frame-Options:\s*SAMEORIGIN/);
  });

  it('unsets X-Frame-Options and allows frame-ancestors * for /embed/* only', () => {
    const embedIdx = headers.indexOf('/embed/*');
    expect(embedIdx).toBeGreaterThan(-1);
    const embedBlock = headers.slice(embedIdx);
    expect(embedBlock).toMatch(/!\s*X-Frame-Options/);
    expect(embedBlock).toMatch(/frame-ancestors\s+\*/);
    expect(embedBlock).toMatch(/X-Robots-Tag:\s*noindex,\s*follow/);
  });
});

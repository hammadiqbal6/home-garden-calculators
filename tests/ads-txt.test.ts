import { describe, expect, it } from 'vitest';
import { buildAdsTxt } from '../src/lib/adsTxt';

describe('buildAdsTxt', () => {
  it('emits a comment placeholder when publisher id is empty', () => {
    const body = buildAdsTxt('');
    expect(body).toContain('intentionally omitted');
    expect(body).not.toMatch(/^google\.com,/m);
  });

  it('accepts ca-pub- prefix and emits pub- line', () => {
    expect(buildAdsTxt('ca-pub-1234567890123456')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n',
    );
  });

  it('accepts pub- prefix as-is', () => {
    expect(buildAdsTxt('pub-9876543210987654')).toBe(
      'google.com, pub-9876543210987654, DIRECT, f08c47fec0942fa0\n',
    );
  });
});

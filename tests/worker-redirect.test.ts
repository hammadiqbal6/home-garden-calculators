import { describe, expect, it } from 'vitest';
import {
  DEFAULT_CANONICAL_ORIGIN,
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  LEGACY_WORKERS_DEV_HOST,
  isLegacyRedirectHost,
  legacyHostRedirectLocation,
  needsTrailingSlashRedirect,
  parseLegacyRedirectHosts,
  withTrailingSlashPath,
} from '../src/lib/workerRedirect';

describe('legacy host → canonical 301', () => {
  it('redirects the exact legacy workers.dev host to getyardtally.com with path and query', () => {
    const location = legacyHostRedirectLocation(
      `https://${LEGACY_WORKERS_DEV_HOST}/calculators/concrete-calculator/?a=1`,
    );
    expect(location).toBe(
      'https://getyardtally.com/calculators/concrete-calculator/?a=1',
    );
  });

  it('redirects www to apex with path and query', () => {
    const location = legacyHostRedirectLocation(
      'https://www.getyardtally.com/guides/mulch-depth-guide/?utm=1',
    );
    expect(location).toBe(
      'https://getyardtally.com/guides/mulch-depth-guide/?utm=1',
    );
  });

  it('applies trailing slash in the same hop (no 308-then-301 chain)', () => {
    const location = legacyHostRedirectLocation(
      `https://${LEGACY_WORKERS_DEV_HOST}/calculators/concrete-calculator?a=1`,
    );
    expect(location).toBe(
      'https://getyardtally.com/calculators/concrete-calculator/?a=1',
    );
  });

  it('preserves root path and query on the legacy host', () => {
    expect(legacyHostRedirectLocation(`https://${LEGACY_WORKERS_DEV_HOST}/?utm=1`)).toBe(
      'https://getyardtally.com/?utm=1',
    );
  });

  it('does not redirect the canonical apex host', () => {
    expect(
      legacyHostRedirectLocation('https://getyardtally.com/calculators/concrete-calculator/?a=1'),
    ).toBeNull();
    expect(
      legacyHostRedirectLocation('https://getyardtally.com/calculators/concrete-calculator'),
    ).toBeNull();
  });

  it('does not redirect versioned Workers preview hosts', () => {
    const preview = `https://abc123-${LEGACY_WORKERS_DEV_HOST}/calculators/`;
    expect(legacyHostRedirectLocation(preview)).toBeNull();
    expect(isLegacyRedirectHost(`abc123-${LEGACY_WORKERS_DEV_HOST}`)).toBe(false);
  });

  it('does not redirect localhost', () => {
    expect(legacyHostRedirectLocation('http://localhost:4321/calculators/')).toBeNull();
    expect(
      legacyHostRedirectLocation('http://127.0.0.1:8787/calculators/concrete-calculator'),
    ).toBeNull();
  });

  it('uses CANONICAL_ORIGIN override when provided', () => {
    const location = legacyHostRedirectLocation(
      `https://${LEGACY_WORKERS_DEV_HOST}/guides/`,
      'https://example.test/',
    );
    expect(location).toBe('https://example.test/guides/');
  });

  it('accepts a configurable comma-separated legacy host list', () => {
    const hosts = parseLegacyRedirectHosts(
      'old.example, home-garden-calculators.hammadiqbal117.workers.dev',
    );
    expect(hosts).toEqual([
      'old.example',
      'home-garden-calculators.hammadiqbal117.workers.dev',
    ]);
    expect(
      legacyHostRedirectLocation('https://old.example/calculators/?x=1', undefined, hosts),
    ).toBe('https://getyardtally.com/calculators/?x=1');
  });

  it('defaults canonical origin and legacy list to YardTally cutover values', () => {
    expect(DEFAULT_CANONICAL_ORIGIN).toBe('https://getyardtally.com');
    expect(DEFAULT_LEGACY_REDIRECT_HOSTS).toContain(
      'home-garden-calculators.hammadiqbal117.workers.dev',
    );
    expect(DEFAULT_LEGACY_REDIRECT_HOSTS).toContain('www.getyardtally.com');
  });
});

describe('trailing-slash helpers (canonical host behavior)', () => {
  it('adds a slash for directory-like paths', () => {
    expect(withTrailingSlashPath('/calculators/concrete-calculator')).toBe(
      '/calculators/concrete-calculator/',
    );
    expect(needsTrailingSlashRedirect('/calculators/concrete-calculator')).toBe(true);
  });

  it('leaves already-slashed paths and file assets alone', () => {
    expect(withTrailingSlashPath('/calculators/concrete-calculator/')).toBe(
      '/calculators/concrete-calculator/',
    );
    expect(withTrailingSlashPath('/site.webmanifest')).toBe('/site.webmanifest');
    expect(withTrailingSlashPath('/og/home.svg')).toBe('/og/home.svg');
    expect(withTrailingSlashPath('/')).toBe('/');
    expect(needsTrailingSlashRedirect('/site.webmanifest')).toBe(false);
  });
});

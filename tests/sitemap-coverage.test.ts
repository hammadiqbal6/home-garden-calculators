import { describe, expect, it } from 'vitest';
import { tools, categories } from '../src/data/tools';
import { guides } from '../src/data/guides';
import { STATIC_INDEXABLE_PATHS } from '../scripts/audit/expected-sitemap-paths.mjs';

/** Pathnames that must appear in the production sitemap after build. */
function expectedIndexablePathnames(): string[] {
  const fromTools = tools.map((t) => `/calculators/${t.slug}/`);
  const fromGuides = guides.map((g) => `/guides/${g.slug}/`);
  const fromHubs = Object.values(categories).map((c) => `/hubs/${c.slug}/`);
  return [...new Set([...STATIC_INDEXABLE_PATHS, ...fromHubs, ...fromTools, ...fromGuides])].sort();
}

describe('sitemap coverage contract', () => {
  it('lists unique trailing-slash pathnames for every indexable route', () => {
    const paths = expectedIndexablePathnames();
    expect(paths.length).toBeGreaterThan(40);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) {
      expect(p.startsWith('/')).toBe(true);
      expect(p.endsWith('/')).toBe(true);
    }
  });

  it('includes both concrete calculator and slab-cost calculator paths', () => {
    const paths = new Set(expectedIndexablePathnames());
    expect(paths.has('/calculators/concrete-calculator/')).toBe(true);
    expect(paths.has('/calculators/concrete-slab-cost-calculator/')).toBe(true);
  });

  it('keeps static shells in the shared STATIC_INDEXABLE_PATHS list', () => {
    for (const p of ['/', '/about/', '/contact/', '/methodology/', '/calculators/', '/guides/']) {
      expect(STATIC_INDEXABLE_PATHS).toContain(p);
    }
  });

  it('registers every tool and guide slug used by Astro routes', () => {
    expect(tools.length).toBeGreaterThan(20);
    expect(guides.length).toBeGreaterThan(10);
    expect(Object.keys(categories).length).toBeGreaterThanOrEqual(4);
    for (const t of tools) {
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
    }
    for (const g of guides) {
      expect(g.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site.ts';
import { tools, categories } from './src/data/tools.ts';
import { guides } from './src/data/guides.ts';

/** Per-URL lastmod from content registries (falls back to site-wide stamp). */
function lastmodForPathname(pathname) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (path === '/') return siteConfig.contentUpdated;

  const tool = tools.find((t) => path === `/calculators/${t.slug}/`);
  if (tool) return tool.dateModified;

  const guide = guides.find((g) => path === `/guides/${g.slug}/`);
  if (guide) return guide.dateModified;

  const hub = Object.values(categories).find((c) => path === `/hubs/${c.slug}/`);
  if (hub) return siteConfig.contentUpdated;

  return siteConfig.contentUpdated;
}

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      changefreq: undefined,
      priority: undefined,
      filter: (page) => !page.includes('/404') && !page.includes('/embed/'),
      serialize(item) {
        try {
          const pathname = new URL(item.url).pathname;
          const stamp = lastmodForPathname(pathname);
          item.lastmod = new Date(`${stamp}T00:00:00.000Z`);
        } catch {
          item.lastmod = new Date(`${siteConfig.contentUpdated}T00:00:00.000Z`);
        }
        return item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});

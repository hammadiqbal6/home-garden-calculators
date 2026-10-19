// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site.ts';

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      changefreq: undefined,
      priority: undefined,
      lastmod: new Date(siteConfig.contentUpdated),
      filter: (page) => !page.includes('/404'),
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

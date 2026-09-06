// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages — user site (https://<username>.github.io).
// Served from the domain root, so no `base` prefix is needed.
// If you ever move this to a project repo (…github.io/portfolio),
// set `base: '/portfolio'` here and every internal link picks it up
// automatically via the `href()` helper in src/data/site.ts.
export default defineConfig({
  site: 'https://jeeyool.github.io',
  vite: { plugins: [tailwindcss()] },
});

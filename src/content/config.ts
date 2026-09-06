import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    /** Index of this site's owner in `authors` — the list bolds that entry
     *  rather than string-matching a name that is spelled three ways. */
    selfIndex: z.number().int().min(0),
    venue: z.string(),
    volume: z.string().optional(),
    pages: z.string().optional(),
    year: z.number().int(),
    doi: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int(),
    role: z.string().optional(),
    openAccess: z.boolean().default(false),
    contribution: z.string(),
    contributionKo: z.string(),
    abstractImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    oneLiner: z.string(),
    tags: z.array(z.string()).default([]),
    accent: z.enum(['accent', 'signal']).default('accent'),
    status: z.string().optional(),
    /** Path under src/assets/projects/, e.g. 'mppt-measurement-system/board.jpg' */
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().optional(),
    /** Figures shown under the body. Paths are relative to src/assets/projects/. */
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
          /** Full-width instead of the two-column grid. */
          wide: z.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

const thrusts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thrusts' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    keywords: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    accent: z.enum(['accent', 'signal']).default('accent'),
  }),
});

export const collections = { publications, projects, thrusts };

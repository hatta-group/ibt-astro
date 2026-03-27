import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    ogImage: z.string().optional(),
    lastMod: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const schools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/schools' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const iberTypes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/iber-types' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    color: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, schools, 'iber-types': iberTypes };

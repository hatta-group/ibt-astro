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
    prefecture: z.string().optional(),
    region: z.string().optional(),
    programs: z.array(z.string()).optional(),
    schoolType: z.string().optional(),
  }),
});

const universities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/universities' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    slug: z.string(),
    country: z.string(),
    city: z.string().optional(),
    region: z.enum(['japan', 'uk', 'us', 'canada', 'australia', 'europe', 'asia']),
    qsRank: z.number().optional(),
    ibScoreRange: z.string(),
    ibScoreMin: z.number().optional(),
    ibScoreRecommended: z.number().optional(),
    ibAdmissionType: z.string().optional(),
    requiredHL: z.array(z.string()).optional(),
    applicationSystem: z.string().optional(),
    admissionDeadline: z.string().optional(),
    tuitionFeeApprox: z.string().optional(),
    scholarshipAvailable: z.boolean().optional(),
    languageRequirement: z.string().optional(),
    website: z.string(),
    featured: z.boolean().default(false),
    programs: z.array(z.string()).optional(),
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

export const collections = { blog, schools, universities, 'iber-types': iberTypes };

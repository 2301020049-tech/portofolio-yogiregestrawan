import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Collection untuk project Roblox & karya lainnya
    projects: defineCollection({
      type: 'data',
      source: 'projects/**',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        year: z.number(),
        thumbnail: z.string(),
        screenshots: z.array(z.string()).optional().default([]),
        robloxLink: z.string().optional().default(''),
        tags: z.array(z.string()),
        category: z.string().optional(),
        status: z.enum(['published', 'development']).optional().default('published'),
        techStack: z.array(z.string()).optional().default([]),
      }),
    }),

    // Collection untuk foto (maternity-01.json, dll.)
    photos: defineCollection({
      type: 'data',
      source: 'photos/**',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        mood: z.array(z.string()),
        after: z.string(),
        before: z.string(),
        hasComparison: z.boolean().optional(),
        initialPosition: z.number().optional().default(50),
        camera: z.string(),
        lens: z.string(),
        settings: z.string(),
      }),
    }),

    // Collection untuk design grafis (logo, brand post, dll.)
    designs: defineCollection({
      type: 'data',
      source: 'designs/**',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        client: z.string(),
        brief: z.string(),
        tools: z.array(z.string()),
        category: z.enum(['logo', 'brand-post']),
        year: z.number(),
        thumbnail: z.string().optional().default(''),
        images: z.array(z.string()).optional(),
        tags: z.array(z.string()),
        accentColor: z.string().optional().default(''),
      }),
    }),
  },
})

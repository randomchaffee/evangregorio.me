import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = {
  projects,
};

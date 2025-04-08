import { defineCollection, z, reference } from "astro:content";

// Define the schema for the blog collection
const blogCollection = defineCollection({
  type: "content", // 'content' for Markdown/MDX files
  schema: ({ image }) =>
    z.object({
      // Use schema context to access image helper
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(), // Coerce string dates from frontmatter into Date objects
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(), // Use image() helper for optimization
      category: z.string(), // Simple string category for now
      tags: z.array(z.string()).optional(),
      featured: z.boolean().default(false), // Default featured to false
    }),
});

// Export a single `collections` object to register our collection(s)
export const collections = {
  blog: blogCollection,
};

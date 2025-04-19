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

// Define the schema for the gallery collection
const galleryCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(), // Make description optional
      image: image(), // Reference the source image
      date: z.coerce.date().optional(), // Optional date
      tags: z.array(z.string()).optional(), // Optional tags
    }),
});

// Export a single `collections` object to register our collection(s)
export const collections = {
  blog: blogCollection,
  gallery: galleryCollection, // Add the gallery collection
};

import { z } from "zod";

export const blogCategorySchema = z.enum([
  "KITCHEN_DESIGN",
  "MATERIALS",
  "TRENDS",
  "TIPS",
  "PROJECTS",
  "NEWS",
]);

export const createBlogPostSchema = z.object({
  // Required fields
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  titleEn: z.string().min(1, "English title is required"),
  excerptEn: z.string().min(1, "English excerpt is required"),
  contentEn: z.string().min(1, "English content is required"),
  category: z.string().min(1, "Category is required"),

  // Optional bilingual fields
  titleAr: z.string().optional().nullable(),
  excerptAr: z.string().optional().nullable(),
  contentAr: z.string().optional().nullable(),

  // Optional metadata
  featuredImage: z.string().url("Invalid image URL").optional().nullable().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  author: z.string().default("Kitchen Core Team"),
  readingTime: z.number().int().min(1).default(5),

  // Publishing
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),

  // SEO fields
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.array(z.string()).default([]),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export const blogQuerySchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  published: z.coerce.boolean().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
export type BlogQueryInput = z.infer<typeof blogQuerySchema>;

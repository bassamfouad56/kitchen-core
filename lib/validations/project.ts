import { z } from "zod";

export const projectCategorySchema = z.enum([
  "MODERN_WOODEN",
  "CLASSIC_WOODEN",
  "ALUMINUM",
  "BEDROOMS",
]);

export const createProjectSchema = z.object({
  // Bilingual fields
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().default(""),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().default(""),
  challengesEn: z.string().default(""),
  challengesAr: z.string().default(""),
  // Common fields
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  location: z.string().min(1, "Location is required"),
  category: projectCategorySchema,
  image: z.string().url("Invalid image URL").or(z.literal("")),
  gallery: z.array(z.string().url()).default([]),
  year: z.string().min(1, "Year is required"),
  area: z.string().min(1, "Area is required"),
  budget: z.string().min(1, "Budget is required"),
  materials: z.array(z.string()).default([]),
  appliances: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  duration: z.string().min(1, "Duration is required"),
  innovations: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
  leadId: z.string().cuid().optional().nullable(),
  customerId: z.string().cuid().optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectQuerySchema = z.object({
  category: projectCategorySchema.optional().nullable().transform(val => val || undefined),
  featured: z.coerce.boolean().optional(),
  published: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;

import { z } from "zod";

export const createProductServiceSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  categoryKey: z.string().min(1, "Category key is required"),
  dbCategory: z.enum(["MODERN_WOODEN", "CLASSIC_WOODEN", "ALUMINUM", "BEDROOMS"]),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  taglineEn: z.string().min(1, "English tagline is required"),
  taglineAr: z.string().min(1, "Arabic tagline is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  heroImage: z.string().min(1, "Hero image is required"),
  featuresEn: z.array(z.string()).min(1, "At least one English feature is required"),
  featuresAr: z.array(z.string()).min(1, "At least one Arabic feature is required"),
  benefitsEn: z.array(z.string()).min(1, "At least one English benefit is required"),
  benefitsAr: z.array(z.string()).min(1, "At least one Arabic benefit is required"),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateProductServiceSchema = createProductServiceSchema.partial();

export const createProductServiceImageSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  src: z.string().min(1, "Image source is required"),
  altEn: z.string().optional(),
  altAr: z.string().optional(),
  order: z.number().int().default(0),
});

export const updateProductServiceImageSchema = createProductServiceImageSchema.partial();

export type CreateProductServiceInput = z.infer<typeof createProductServiceSchema>;
export type UpdateProductServiceInput = z.infer<typeof updateProductServiceSchema>;
export type CreateProductServiceImageInput = z.infer<typeof createProductServiceImageSchema>;
export type UpdateProductServiceImageInput = z.infer<typeof updateProductServiceImageSchema>;

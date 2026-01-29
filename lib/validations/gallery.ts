import { z } from "zod";

export const gallerySizeSchema = z.enum([
  "SMALL",
  "MEDIUM",
  "LARGE",
  "WIDE",
  "TALL",
]);

export const createGalleryImageSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().default(""),
  image: z.string().url("Invalid image URL"),
  category: z.enum(["MODERN_WOODEN", "CLASSIC_WOODEN", "ALUMINUM", "BEDROOMS"]),
  location: z.string().min(1, "Location is required"),
  size: gallerySizeSchema.default("MEDIUM"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().default(""),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateGalleryImageSchema = createGalleryImageSchema.partial();

export const galleryQuerySchema = z.object({
  category: z
    .enum(["MODERN_WOODEN", "CLASSIC_WOODEN", "ALUMINUM", "BEDROOMS"])
    .optional(),
  size: gallerySizeSchema.optional(),
  published: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateGalleryImageInput = z.infer<typeof createGalleryImageSchema>;
export type UpdateGalleryImageInput = z.infer<typeof updateGalleryImageSchema>;
export type GalleryQueryInput = z.infer<typeof galleryQuerySchema>;

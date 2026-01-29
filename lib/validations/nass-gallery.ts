import { z } from "zod";

// Gallery sizes from schema
const gallerySizeEnum = z.enum(["SMALL", "MEDIUM", "LARGE", "WIDE", "TALL"]);

// NassImage schema
const nassImageSchema = z.object({
  src: z.string().min(1, "Image source is required"),
  alt: z.string().min(1, "Alt text is required"),
  title: z.string().optional().nullable(),
  size: gallerySizeEnum.default("MEDIUM"),
  order: z.number().int().default(0),
});

// NassFeature schema
const nassFeatureSchema = z.object({
  icon: z.string().optional().nullable(),
  labelEn: z.string().min(1, "English label is required"),
  labelAr: z.string().min(1, "Arabic label is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  order: z.number().int().default(0),
});

export const createNassGallerySchema = z.object({
  collectionKey: z.string().min(1, "Collection key is required").regex(/^nass\d+$/, "Collection key must be in format 'nassX'"),
  badgeEn: z.string().min(1, "English badge is required"),
  badgeAr: z.string().min(1, "Arabic badge is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  titleHighlightEn: z.string().min(1, "English title highlight is required"),
  titleHighlightAr: z.string().min(1, "Arabic title highlight is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  images: z.array(nassImageSchema).optional(),
  features: z.array(nassFeatureSchema).optional(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateNassGallerySchema = createNassGallerySchema.partial().extend({
  images: z.array(nassImageSchema).optional(),
  features: z.array(nassFeatureSchema).optional(),
});

export const nassGalleryQuerySchema = z.object({
  collectionKey: z.string().optional(),
  published: z.coerce.boolean().optional(),
});

export type CreateNassGalleryInput = z.infer<typeof createNassGallerySchema>;
export type UpdateNassGalleryInput = z.infer<typeof updateNassGallerySchema>;
export type NassGalleryQueryInput = z.infer<typeof nassGalleryQuerySchema>;

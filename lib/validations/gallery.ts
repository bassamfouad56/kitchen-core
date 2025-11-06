import { z } from 'zod';

export const gallerySizeSchema = z.enum(['SMALL', 'MEDIUM', 'LARGE', 'WIDE', 'TALL']);

export const createGalleryImageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.string().url('Invalid image URL'),
  category: z.enum(['PALACE', 'VILLA', 'ESTATE', 'PENTHOUSE']),
  location: z.string().min(1, 'Location is required'),
  size: gallerySizeSchema.default('MEDIUM'),
  description: z.string().min(1, 'Description is required'),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateGalleryImageSchema = createGalleryImageSchema.partial();

export const galleryQuerySchema = z.object({
  category: z.enum(['PALACE', 'VILLA', 'ESTATE', 'PENTHOUSE']).optional(),
  size: gallerySizeSchema.optional(),
  published: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateGalleryImageInput = z.infer<typeof createGalleryImageSchema>;
export type UpdateGalleryImageInput = z.infer<typeof updateGalleryImageSchema>;
export type GalleryQueryInput = z.infer<typeof galleryQuerySchema>;

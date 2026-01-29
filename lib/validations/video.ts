import { z } from 'zod';

export const createVideoSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().default(''),
  descriptionEn: z.string().default(''),
  descriptionAr: z.string().default(''),
  url: z.string().url('Invalid video URL'),
  thumbnail: z.string().url('Invalid thumbnail URL').optional().or(z.literal('')).nullable(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateVideoSchema = createVideoSchema.partial();

export type CreateVideoInput = z.infer<typeof createVideoSchema>;
export type UpdateVideoInput = z.infer<typeof updateVideoSchema>;

import { z } from 'zod';

export const createInnovationSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().default(''),
  descriptionEn: z.string().min(1, 'English description is required'),
  descriptionAr: z.string().default(''),
  icon: z.string().default(''),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateInnovationSchema = createInnovationSchema.partial();

export type CreateInnovationInput = z.infer<typeof createInnovationSchema>;
export type UpdateInnovationInput = z.infer<typeof updateInnovationSchema>;

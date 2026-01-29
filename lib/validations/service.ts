import { z } from 'zod';

export const createServiceSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().default(''),
  descriptionEn: z.string().min(1, 'English description is required'),
  descriptionAr: z.string().default(''),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateServiceSchema = createServiceSchema.partial();

export const serviceQuerySchema = z.object({
  published: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ServiceQueryInput = z.infer<typeof serviceQuerySchema>;

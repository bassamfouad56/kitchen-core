import { z } from 'zod';

export const createStatisticSchema = z.object({
  number: z.string().min(1, 'Number value is required'),
  labelEn: z.string().min(1, 'English label is required'),
  labelAr: z.string().default(''),
  section: z.enum(['HOMEPAGE_TRUST', 'GALLERY_STATS']),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateStatisticSchema = createStatisticSchema.partial();

export const statisticQuerySchema = z.object({
  section: z.enum(['HOMEPAGE_TRUST', 'GALLERY_STATS']).optional(),
  published: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateStatisticInput = z.infer<typeof createStatisticSchema>;
export type UpdateStatisticInput = z.infer<typeof updateStatisticSchema>;
export type StatisticQueryInput = z.infer<typeof statisticQuerySchema>;

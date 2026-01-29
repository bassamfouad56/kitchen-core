import { z } from 'zod';

export const createFounderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  image: z.string().url('Invalid image URL'),
  bio: z.string().min(1, 'Bio is required'),
  quote: z.string().min(1, 'Quote is required'),
  education: z.array(z.string()).default([]),
  recognition: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

export const updateFounderSchema = createFounderSchema.partial();

export type CreateFounderInput = z.infer<typeof createFounderSchema>;
export type UpdateFounderInput = z.infer<typeof updateFounderSchema>;

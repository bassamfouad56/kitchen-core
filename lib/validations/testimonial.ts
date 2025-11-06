import { z } from 'zod';

export const createTestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  image: z.string().url('Invalid image URL'),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.number().int().min(1).max(5).default(5),
  project: z.string().min(1, 'Project is required'),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export const testimonialQuerySchema = z.object({
  featured: z.coerce.boolean().optional(),
  published: z.coerce.boolean().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type TestimonialQueryInput = z.infer<typeof testimonialQuerySchema>;

import { z } from 'zod';

/**
 * Common validation schemas
 */

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required');

export const phoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number')
  .optional();

export const urlSchema = z
  .string()
  .url('Invalid URL')
  .optional();

export const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens');

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export const idSchema = z.object({
  id: z.string().cuid(),
});

export const publishedFilterSchema = z.object({
  published: z.coerce.boolean().optional(),
});

export const searchSchema = z.object({
  q: z.string().min(1).optional(),
});

export const orderSchema = z.object({
  orderBy: z.enum(['createdAt', 'updatedAt', 'title', 'order']).optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

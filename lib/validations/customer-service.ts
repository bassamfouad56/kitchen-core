import { z } from "zod";

export const createCustomerServiceSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  icon: z.string().min(1, "Icon name is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  taglineEn: z.string().default(""),
  taglineAr: z.string().default(""),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  image: z.string().default(""),
  stepsEn: z.array(z.string()).default([]),
  stepsAr: z.array(z.string()).default([]),
  benefitsEn: z.array(z.string()).default([]),
  benefitsAr: z.array(z.string()).default([]),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateCustomerServiceSchema = createCustomerServiceSchema.partial();

export type CreateCustomerServiceInput = z.infer<typeof createCustomerServiceSchema>;
export type UpdateCustomerServiceInput = z.infer<typeof updateCustomerServiceSchema>;

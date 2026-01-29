import { z } from 'zod';

export const createCompanySchema = z.object({
  nameEn: z.string().min(1, 'English name is required'),
  nameAr: z.string().default(''),
  taglineEn: z.string().optional().nullable(),
  taglineAr: z.string().optional().nullable(),
  descriptionEn: z.string().min(1, 'English description is required'),
  descriptionAr: z.string().default(''),
  missionEn: z.string().optional().nullable(),
  missionAr: z.string().optional().nullable(),
  visionEn: z.string().optional().nullable(),
  visionAr: z.string().optional().nullable(),
  valuesEn: z.array(z.string()).default([]),
  valuesAr: z.array(z.string()).default([]),
  foundedYear: z.string().optional().nullable(),
  employeeCount: z.string().optional().nullable(),
  projectsCompleted: z.string().optional().nullable(),
  countriesServed: z.string().optional().nullable(),
  yearsOfExperience: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal('')).nullable(),
  whatsappNumber: z.string().optional().nullable(),
  instagramUrl: z.string().url().optional().or(z.literal('')).nullable(),
  facebookUrl: z.string().url().optional().or(z.literal('')).nullable(),
  linkedinUrl: z.string().url().optional().or(z.literal('')).nullable(),
  twitterUrl: z.string().url().optional().or(z.literal('')).nullable(),
  youtubeUrl: z.string().url().optional().or(z.literal('')).nullable(),
  tiktokUrl: z.string().url().optional().or(z.literal('')).nullable(),
  featuredImage: z.string().url().optional().or(z.literal('')).nullable(),
  backgroundVideo: z.string().url().optional().or(z.literal('')).nullable(),
  published: z.boolean().default(true),
});

export const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

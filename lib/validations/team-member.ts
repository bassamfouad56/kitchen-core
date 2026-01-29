import { z } from 'zod';

export const createTeamMemberSchema = z.object({
  nameEn: z.string().min(1, 'English name is required'),
  nameAr: z.string().min(1, 'Arabic name is required'),
  roleEn: z.string().min(1, 'English role is required'),
  roleAr: z.string().min(1, 'Arabic role is required'),
  bioEn: z.string().min(1, 'English bio is required'),
  bioAr: z.string().min(1, 'Arabic bio is required'),
  image: z.string().url('Invalid image URL'),
  specialtiesEn: z.array(z.string()).default([]),
  specialtiesAr: z.array(z.string()).default([]),
  email: z.string().email().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  yearsOfExperience: z.string().optional(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;

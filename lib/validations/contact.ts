import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

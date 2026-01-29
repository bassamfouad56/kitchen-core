import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional().nullable(),
});

export const updateSubscriberSchema = z.object({
  name: z.string().max(100).optional().nullable(),
  preferences: z.record(z.string(), z.unknown()).optional().nullable(),
  verified: z.boolean().optional(),
});

export type SubscribeNewsletterInput = z.infer<typeof subscribeNewsletterSchema>;
export type UpdateSubscriberInput = z.infer<typeof updateSubscriberSchema>;

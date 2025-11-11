import { z } from "zod";

export const leadSourceSchema = z.enum([
  "WEBSITE",
  "SOCIAL_MEDIA",
  "REFERRAL",
  "ADVERTISING",
  "SHOWROOM",
  "EVENT",
  "PHONE",
  "EMAIL",
  "OTHER",
]);

export const leadStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATING",
  "WON",
  "LOST",
  "ON_HOLD",
]);

export const leadPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const createLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  projectType: z
    .enum(["MODERN_WOODEN", "CLASSIC_WOODEN", "ALUMINUM", "BEDROOMS"])
    .optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  source: leadSourceSchema.default("WEBSITE"),
  status: leadStatusSchema.default("NEW"),
  priority: leadPrioritySchema.default("MEDIUM"),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateLeadSchema = createLeadSchema.partial();

export const leadQuerySchema = z.object({
  status: leadStatusSchema.optional(),
  source: leadSourceSchema.optional(),
  priority: leadPrioritySchema.optional(),
  assignedTo: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadQueryInput = z.infer<typeof leadQuerySchema>;

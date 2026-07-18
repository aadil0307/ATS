import { z } from "zod";

export const SERVICES = [
  "Web & App Development",
  "AI & Automation",
  "Cloud & DevOps",
  "UI/UX Design",
  "API & Integrations",
  "Security & Audits",
] as const;

export const BUDGETS = ["<1L", "1-5L", "5-25L", "25L+"] as const;

export const SOURCES = ["Referral", "LinkedIn", "Google", "Other"] as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^\+[1-9]\d{7,14}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters")
    .max(100, "That name is too long"),
  company: z.string().trim().max(100).optional(),
  email: z
    .string()
    .trim()
    .regex(EMAIL_RE, "Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(PHONE_RE, "Use E.164 format, e.g. +919619100568")
    .optional()
    .or(z.literal("")),
  services: z
    .array(z.string())
    .min(1, "Pick at least one service"),
  budget: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(50, "Tell us a bit more — at least 50 characters")
    .max(2000, "Keep it under 2000 characters"),
  source: z.string().optional().or(z.literal("")),
  recaptchaToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type LeadInput = Omit<ContactInput, "recaptchaToken">;

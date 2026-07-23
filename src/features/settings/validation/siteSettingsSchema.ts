import { z } from "zod";

export const siteSettingsSchema = z.object({
  // Branding
  storeName: z
    .string()
    .trim()
    .min(1, "Store name is required"),

  tagline: z.string(),

  description: z.string(),

  logoUrl: z.string(),

  faviconUrl: z.string(),

  browserTitle: z.string(),

  // Contact
  phone: z.string(),

  email: z
    .string()
    .email("Invalid email address")
    .or(z.literal("")),

  address: z.string(),

  businessHours: z.string(),

  // Social
  facebook: z
    .string()
    .url("Invalid Facebook URL")
    .or(z.literal("")),

  instagram: z
    .string()
    .url("Invalid Instagram URL")
    .or(z.literal("")),

  whatsapp: z.string(),

  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal("")),

  youtube: z
    .string()
    .url("Invalid YouTube URL")
    .or(z.literal("")),

  // Store
  defaultCurrency: z
    .string()
    .trim()
    .min(1, "Currency is required"),

  contactEmail: z
    .string()
    .email("Invalid contact email")
    .or(z.literal("")),

  // Footer
  footerText: z.string(),

  copyrightText: z.string(),

  // SEO
  seoTitle: z.string(),

  seoDescription: z.string(),

  seoImage: z
    .string()
    .url("Invalid image URL")
    .or(z.literal("")),
});

export type SiteSettingsFormValues =
  z.infer<typeof siteSettingsSchema>;
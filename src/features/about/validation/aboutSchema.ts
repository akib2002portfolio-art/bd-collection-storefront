import { z } from "zod";

export const aboutSchema = z.object({
  eyebrow: z.string(),

  title: z.string().min(1),

  shortDescription: z.string(),

  story: z.string(),

  mission: z.string(),

  vision: z.string(),

  heroImage: z.string(),

  secondaryImage: z.string(),

  yearsExperience: z.number().min(0),

  happyCustomers: z.number().min(0),

  productsCount: z.number().min(0),

  metaTitle: z.string(),

  metaDescription: z.string(),
});

export type AboutFormValues =
  z.infer<typeof aboutSchema>;
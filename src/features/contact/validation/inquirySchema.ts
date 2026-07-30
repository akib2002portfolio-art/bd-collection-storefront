import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum([
    "general",
    "product",
  ]),

  name: z
    .string()
    .trim()
    .min(2, "Name is required."),

  email: z
    .email("Invalid email address."),

  phone: z.string().optional(),

  subject: z.string().optional(),

  message: z
    .string()
    .trim()
    .min(10, "Message is too short."),

  productId: z.string().optional(),
});

export type InquiryFormValues =
  z.infer<typeof inquirySchema>;
import { z } from "zod";
import { HERO_LIMITS } from "../constants/hero";

export const heroSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(HERO_LIMITS.TITLE_MAX_LENGTH),

    subtitle: z
        .string()
        .trim()
        .max(HERO_LIMITS.SUBTITLE_MAX_LENGTH),

    buttonText: z
        .string()
        .trim()
        .max(HERO_LIMITS.BUTTON_TEXT_MAX_LENGTH)
        .optional(),

    buttonLink: z
        .string()
        .trim()
        .max(HERO_LIMITS.BUTTON_LINK_MAX_LENGTH)
        .optional(),

    imageUrl: z
        .string()
        .trim()
        .url("Invalid image URL")
        .or(z.literal("")),

    displayOrder: z.number().int().min(0),

    isActive: z.boolean(),
});

export type HeroFormValues = z.infer<typeof heroSchema>;
import type { HeroSlide as CmsHeroSlide } from "../types";
import type { HeroSlide as StorefrontHeroSlide } from "../../home/types/home";

export function mapHeroToStorefront(
  slide: CmsHeroSlide,
): StorefrontHeroSlide {
  return {
    id: slide.id,

    eyebrow: "BD Collection",

    title: slide.title,

    description: slide.subtitle ?? "",

    image: slide.imageUrl ?? "/images/hero/hero-1.webp",

    ctaLabel: slide.buttonText ?? "Shop Now",

    ctaHref: slide.buttonLink ?? "/shop",
  };
}
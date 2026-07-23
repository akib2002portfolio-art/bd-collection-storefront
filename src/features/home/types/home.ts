export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomeCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export type CurrencyCode =
  | "BDT"
  | "USD";

export interface ProductPreview {
  id: string;
  name: string;
  slug: string;

  price: number | null;
  currency: CurrencyCode | null;

  salePrice?: number;

  thumbnail: string;

  category: string;

  isNew: boolean;
}

export interface AboutPreviewContent {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}
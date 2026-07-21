export interface HeroSlide {
  id: string;

  title: string;
  subtitle: string | null;

  buttonText: string | null;
  buttonLink: string | null;

  imageUrl: string | null;

  displayOrder: number;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface HeroSlideFormData {
  title: string;

  subtitle: string;

  buttonText: string;
  buttonLink: string;

  imageUrl: string;

  displayOrder: number;

  isActive: boolean;
}
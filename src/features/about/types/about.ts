export interface AboutPage {
  id: string;

  eyebrow: string | null;
  title: string;
  shortDescription: string | null;

  story: string | null;
  mission: string | null;
  vision: string | null;

  heroImage: string | null;
  secondaryImage: string | null;

  yearsExperience: number;
  happyCustomers: number;
  productsCount: number;

  metaTitle: string | null;
  metaDescription: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateAboutInput {
  eyebrow: string;

  title: string;
  shortDescription: string;

  story: string;
  mission: string;
  vision: string;

  heroImage: string;
  secondaryImage: string;

  yearsExperience: number;
  happyCustomers: number;
  productsCount: number;

  metaTitle: string;
  metaDescription: string;
}
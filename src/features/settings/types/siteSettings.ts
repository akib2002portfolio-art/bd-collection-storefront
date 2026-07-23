export interface SiteSettings {
  id: string;

  // Branding
  storeName: string;
  tagline: string | null;
  description: string | null;

  logoUrl: string | null;
  faviconUrl: string | null;
  browserTitle: string | null;

  // Contact
  phone: string | null;
  email: string | null;
  address: string | null;
  businessHours: string | null;

  // Social
  facebook: string | null;
  instagram: string | null;
  whatsapp: string | null;
  linkedin: string | null;
  youtube: string | null;

  // Store
  defaultCurrency: string;
  contactEmail: string | null;

  // Footer
  footerText: string | null;
  copyrightText: string | null;

  // SEO
  seoTitle: string | null;
  seoDescription: string | null;
  seoImage: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateSiteSettingsInput {
  // Branding
  storeName: string;
  tagline: string;
  description: string;

  logoUrl: string;
  faviconUrl: string;
  browserTitle: string;

  // Contact
  phone: string;
  email: string;
  address: string;
  businessHours: string;

  // Social
  facebook: string;
  instagram: string;
  whatsapp: string;
  linkedin: string;
  youtube: string;

  // Store
  defaultCurrency: string;
  contactEmail: string;

  // Footer
  footerText: string;
  copyrightText: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
}
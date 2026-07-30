import { supabase } from "../../../lib/supabase";

import type {
  AboutPage,
  UpdateAboutInput,
} from "../types";

interface AboutRow {
  id: string;

  eyebrow: string | null;
  title: string;
  short_description: string | null;

  story: string | null;
  mission: string | null;
  vision: string | null;

  hero_image: string | null;
  secondary_image: string | null;

  years_experience: number;
  happy_customers: number;
  products_count: number;

  meta_title: string | null;
  meta_description: string | null;

  created_at: string;
  updated_at: string;
}

class AboutService {
  private map(row: AboutRow): AboutPage {
    return {
      id: row.id,

      eyebrow: row.eyebrow,
      title: row.title,
      shortDescription: row.short_description,

      story: row.story,
      mission: row.mission,
      vision: row.vision,

      heroImage: row.hero_image,
      secondaryImage: row.secondary_image,

      yearsExperience: row.years_experience,
      happyCustomers: row.happy_customers,
      productsCount: row.products_count,

      metaTitle: row.meta_title,
      metaDescription: row.meta_description,

      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getAbout(): Promise<AboutPage> {
    const { data, error } = await supabase
      .from("about_page")
      .select("*")
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to fetch About page: ${error.message}`,
      );
    }

    if (!data) {
      throw new Error(
        "No About page record found. Please create one in the database.",
      );
    }

    return this.map(data as AboutRow);
  }

  async updateAbout(
    id: string,
    about: UpdateAboutInput,
  ): Promise<AboutPage> {
    const { data, error } = await supabase
      .from("about_page")
      .update({
        eyebrow: about.eyebrow,

        title: about.title,
        short_description: about.shortDescription,

        story: about.story,
        mission: about.mission,
        vision: about.vision,

        hero_image: about.heroImage,
        secondary_image: about.secondaryImage,

        years_experience: about.yearsExperience,
        happy_customers: about.happyCustomers,
        products_count: about.productsCount,

        meta_title: about.metaTitle,
        meta_description: about.metaDescription,

        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Failed to update About page: ${error.message}`,
      );
    }

    return this.map(data as AboutRow);
  }
}

export const aboutService = new AboutService();
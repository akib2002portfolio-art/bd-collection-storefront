import { supabase } from "../../../lib/supabase";
import type { HeroSlide, HeroSlideFormData } from "../types";

interface HeroRow {
  id: string;

  title: string;
  subtitle: string | null;

  button_text: string | null;
  button_link: string | null;

  image_url: string | null;

  display_order: number;

  is_active: boolean;

  created_at: string;
  updated_at: string;
}

class HeroService {
  private mapHero(row: HeroRow): HeroSlide {
  return {
    id: row.id,

    title: row.title,
    subtitle: row.subtitle,

    buttonText: row.button_text,
    buttonLink: row.button_link,

    imageUrl: row.image_url,

    displayOrder: row.display_order,

    isActive: row.is_active,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

  async getHeroSlides(): Promise<HeroSlide[]> {
    const { data, error } = await supabase
      .from("homepage_hero")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch hero slides: ${error.message}`);
    }

    return (data as HeroRow[]).map((row) => this.mapHero(row));
  }

  async getHeroSlide(id: string): Promise<HeroSlide> {
    const { data, error } = await supabase
      .from("homepage_hero")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch hero slide: ${error.message}`);
    }

    return this.mapHero(data as HeroRow);
  }

  async createHeroSlide(
    hero: HeroSlideFormData,
  ): Promise<HeroSlide> {
    const { data, error } = await supabase
      .from("homepage_hero")
      .insert({
        title: hero.title,
        subtitle: hero.subtitle,

        button_text: hero.buttonText,
        button_link: hero.buttonLink,

        image_url: hero.imageUrl,

        display_order: hero.displayOrder,

        is_active: hero.isActive,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create hero slide: ${error.message}`);
    }

    return this.mapHero(data as HeroRow);
  }

  async updateHeroSlide(
    id: string,
    hero: HeroSlideFormData,
  ): Promise<HeroSlide> {
    const { data, error } = await supabase
      .from("homepage_hero")
      .update({
        title: hero.title,
        subtitle: hero.subtitle,

        button_text: hero.buttonText,
        button_link: hero.buttonLink,

        image_url: hero.imageUrl,

        display_order: hero.displayOrder,

        is_active: hero.isActive,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update hero slide: ${error.message}`);
    }

    return this.mapHero(data as HeroRow);
  }

  async deleteHeroSlide(id: string): Promise<void> {
    const { error } = await supabase
      .from("homepage_hero")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete hero slide: ${error.message}`);
    }
  }

  async toggleHeroSlide(
    id: string,
    isActive: boolean,
  ): Promise<void> {
    const { error } = await supabase
      .from("homepage_hero")
      .update({
        is_active: isActive,
      })
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to update hero status: ${error.message}`);
    }
  }

  async updateDisplayOrder(
    id: string,
    displayOrder: number,
  ): Promise<void> {
    const { error } = await supabase
      .from("homepage_hero")
      .update({
        display_order: displayOrder,
      })
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to update display order: ${error.message}`);
    }
  }
}

export const heroService = new HeroService();
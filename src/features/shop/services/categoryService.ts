import { supabase } from "../../../lib/supabase";

import type { Category } from "../types";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  active: boolean;
};

class CategoryService {
  private mapCategory(row: CategoryRow): Category {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? undefined,
      image: row.image ?? undefined,
      displayOrder: row.display_order,
      active: row.active,
    };
  }

  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error) {
      throw new Error(
        `Failed to fetch categories: ${error.message}`
      );
    }

    return (data as CategoryRow[]).map((row) =>
      this.mapCategory(row)
    );
  }

  async getCategoryBySlug(
    slug: string
  ): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      return null;
    }

    return this.mapCategory(data as CategoryRow);
  }
}

export const categoryService = new CategoryService();
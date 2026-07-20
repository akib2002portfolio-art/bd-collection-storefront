import { supabase } from "../../../../lib/supabase";

import type { Category } from "../types/category";

export interface CreateCategoryInput {
    name: string;
    slug: string;
    description: string;
    image: string | null;
    display_order: number;
}

export interface UpdateCategoryInput
    extends CreateCategoryInput {
    id: string;
}

class CategoryService {
    async getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", {
      ascending: true,
    });

  console.log("Categories data:", data);
  console.log("Categories error:", error);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Category[];
}

    async getCategoryById(
        id: string,
    ): Promise<Category> {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Category;
    }

    async createCategory(
        category: CreateCategoryInput,
    ): Promise<Category> {
        const { data, error } = await supabase
            .from("categories")
            .insert(category)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Category;
    }

    async updateCategory(
        category: UpdateCategoryInput,
    ): Promise<Category> {
        const { id, ...updates } = category;

        const { data, error } = await supabase
            .from("categories")
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Category;
    }

    async deleteCategory(
        id: string,
    ): Promise<void> {
        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id);

        if (error) {
            if (
                error.code === "23503"
            ) {
                throw new Error(
                    "This category is being used by one or more products. Move those products to another category before deleting it.",
                );
            }

            throw new Error(error.message);
        }
    }
}

export const categoryService =
    new CategoryService();
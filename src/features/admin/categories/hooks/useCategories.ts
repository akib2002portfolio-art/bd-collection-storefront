import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  categoryService,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "../services/categoryService";

import type { Category } from "../types/category";

export interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;

  getCategoryById: (
    id: string,
  ) => Promise<Category>;

  createCategory: (
    category: CreateCategoryInput,
  ) => Promise<Category>;

  updateCategory: (
    category: UpdateCategoryInput,
  ) => Promise<Category>;

  deleteCategory: (
    id: string,
  ) => Promise<void>;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await categoryService.getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load categories.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById =
    useCallback(
      (id: string) =>
        categoryService.getCategoryById(id),
      [],
    );

  const createCategory =
    useCallback(
      async (
        category: CreateCategoryInput,
      ) => {
        const created =
          await categoryService.createCategory(
            category,
          );

        setCategories((previous) => [
          created,
          ...previous,
        ]);

        return created;
      },
      [],
    );

  const updateCategory =
    useCallback(
      async (
        category: UpdateCategoryInput,
      ) => {
        const updated =
          await categoryService.updateCategory(
            category,
          );

        setCategories((previous) =>
          previous.map((item) =>
            item.id === updated.id
              ? updated
              : item,
          ),
        );

        return updated;
      },
      [],
    );

  const deleteCategory =
    useCallback(async (id: string) => {
      await categoryService.deleteCategory(id);

      setCategories((previous) =>
        previous.filter(
          (category) =>
            category.id !== id,
        ),
      );
    }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    categories,
    loading,
    error,
    refresh,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
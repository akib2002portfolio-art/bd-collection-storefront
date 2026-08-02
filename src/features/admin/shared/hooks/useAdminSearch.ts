import { useMemo, useState } from "react";

import { useProducts } from "../../products/hooks/useProducts";
import { useCategories } from "../../categories/hooks/useCategories";

export interface SearchResult {
  id: string;
  type: "product" | "category";
  label: string;
  meta: string;
  href: string;
}

export function useAdminSearch() {
  const [query, setQuery] = useState("");

  const { products } = useProducts();
  const { categories } = useCategories();

  const results = useMemo<SearchResult[]>(() => {
    const term = query.trim().toLowerCase();

    if (term.length < 1) return [];

    const productResults: SearchResult[] = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.sku.toLowerCase().includes(term),
      )
      .slice(0, 4)
      .map((product) => ({
        id: product.id,
        type: "product",
        label: product.name,
        meta: product.sku,
        href: `/admin/edit-product/${product.id}`,
      }));

    const categoryResults: SearchResult[] = categories
      .filter((category) => category.name.toLowerCase().includes(term))
      .slice(0, 4)
      .map((category) => ({
        id: category.id,
        type: "category",
        label: category.name,
        meta: category.slug ?? "",
        href: `/admin/edit-category/${category.id}`,
      }));

    return [...productResults, ...categoryResults];
  }, [query, products, categories]);

  return { query, setQuery, results };
}

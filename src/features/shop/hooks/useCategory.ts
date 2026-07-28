import { useQuery } from "@tanstack/react-query";

import { categoryService } from "../services/categoryService";

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}
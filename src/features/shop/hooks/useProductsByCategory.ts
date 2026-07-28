import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/productService";

export function useProductsByCategory(categoryId?: string) {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () =>
      productService.getProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });
}
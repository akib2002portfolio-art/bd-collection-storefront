import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/productService";

export function useRelatedProducts(
  categoryId: string,
  currentProductId: string,
) {
  return useQuery({
    queryKey: [
      "related-products",
      categoryId,
      currentProductId,
    ],

    queryFn: () =>
      productService.getRelatedProducts(
        categoryId,
        currentProductId,
      ),

    enabled:
      Boolean(categoryId) &&
      Boolean(currentProductId),
  });
}
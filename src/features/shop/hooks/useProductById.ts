import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/productService";

export function useProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],

    queryFn: () =>
      productService.getProductById(id),

    enabled: Boolean(id),
  });
}
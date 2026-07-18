import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/productService";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: Boolean(slug),
  });
}
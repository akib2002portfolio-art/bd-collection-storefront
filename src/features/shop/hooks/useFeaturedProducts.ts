import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/productService";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => productService.getFeaturedProducts(),
  });
}
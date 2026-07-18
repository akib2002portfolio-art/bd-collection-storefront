import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/productService";

export function useNewArrivals() {
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: () => productService.getNewArrivals(),
  });
}
import type { ProductPreview } from "../../types/home";

import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ProductPreview[];
}

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
import { cn } from "../../../../lib/utils";

import type { Product } from "../../types/product";

import { ProductCard } from "../ProductCard";

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({
  products,
  cols = 4,
  className,
}: ProductGridProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:gap-6",
        gridCols[cols],
        className,
      )}
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
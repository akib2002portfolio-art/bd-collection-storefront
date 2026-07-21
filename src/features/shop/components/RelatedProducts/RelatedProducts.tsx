import { ProductGrid } from "../ProductGrid";
import { useRelatedProducts } from "../../hooks/useRelatedProducts";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const {
    data: products = [],
    isLoading,
  } = useRelatedProducts(
    categoryId,
    currentProductId,
  );

  if (isLoading) {
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          You May Also Like
        </h2>

        <p className="mt-2 text-muted-foreground">
          Explore more from this collection.
        </p>
      </div>

      <ProductGrid
        products={products}
        cols={4}
      />
    </section>
  );
}
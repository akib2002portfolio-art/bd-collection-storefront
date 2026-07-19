import { motion } from "framer-motion";

import { useFeaturedProducts } from "../../../shop/hooks/useFeaturedProducts";
import { mapProductsToPreview } from "../../utils/productPreviewMapper";

import { ProductGrid } from "./ProductGrid";

export function FeaturedProducts() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useFeaturedProducts();

  const previewProducts = mapProductsToPreview(products);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Featured
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Featured Products
          </h2>

          <p className="mt-4 text-muted-foreground">
            Discover our latest premium garments, carefully selected for
            quality, comfort, and timeless style.
          </p>
        </motion.div>

        {isLoading && (
          <div className="py-16 text-center text-muted-foreground">
            Loading featured products...
          </div>
        )}

        {isError && (
          <div className="py-16 text-center text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load featured products."}
          </div>
        )}

        {!isLoading && !isError && (
          <ProductGrid products={previewProducts} />
        )}
      </div>
    </section>
  );
}
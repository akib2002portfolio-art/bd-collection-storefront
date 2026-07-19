import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { useNewArrivals } from "../../../shop/hooks/useNewArrivals";
import { mapProductsToPreview } from "../../utils/productPreviewMapper";

import { ProductGrid } from "../FeaturedProducts/ProductGrid";

export function NewArrivals() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useNewArrivals();

  const previewProducts = mapProductsToPreview(products);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              New Arrival
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              New Arrivals
            </h2>
          </motion.div>

          <Link
            to="/shop"
            className="border-b border-foreground pb-1 text-sm font-medium uppercase tracking-[0.2em]"
          >
            View All
          </Link>
        </div>

        {isLoading && (
          <div className="py-16 text-center text-muted-foreground">
            Loading new arrivals...
          </div>
        )}

        {isError && (
          <div className="py-16 text-center text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load new arrivals."}
          </div>
        )}

        {!isLoading && !isError && (
          <ProductGrid products={previewProducts} />
        )}
      </div>
    </section>
  );
}
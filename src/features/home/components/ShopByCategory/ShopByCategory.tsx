import { motion } from "framer-motion";

import { useCategories } from "../../../shop/hooks/useCategories";

import { CategoryGrid } from "./CategoryGrid";

export function ShopByCategory() {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useCategories();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-muted-foreground">
            Loading categories...
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-destructive">
            Unable to load categories.
          </p>
        </div>
      </section>
    );
  }

  const categoryCards = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    image: category.image ?? "/images/category-placeholder.jpg",
  }));

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
            Categories
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Shop by Category
          </h2>

          <p className="mt-4 text-muted-foreground">
            Explore our carefully curated collections designed for every style
            and occasion.
          </p>
        </motion.div>

        <CategoryGrid categories={categoryCards} />
      </div>
    </section>
  );
}
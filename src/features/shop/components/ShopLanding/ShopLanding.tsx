import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CategoryGrid } from "../../../home/components/ShopByCategory/CategoryGrid";
import { useCategories } from "../../hooks/useCategories";
import type { CategoryCardData } from "../../../home/types/home";

export function ShopLanding() {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useCategories();

  const categoryCards: CategoryCardData[] = categories.map(
    (category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image,
      description: category.description,
    })
  );

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          BD Collection
        </p>

        <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">
          Discover Every Collection
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Browse premium fashion collections curated for every
          occasion. Explore categories or view our complete
          product catalogue.
        </p>

        <Link
          to="/shop/all"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-background transition hover:opacity-90"
        >
          Browse All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mt-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Shop by Category
            </h2>
          </div>
        </div>

        {isLoading && (
          <div className="py-24 text-center text-muted-foreground">
            Loading categories...
          </div>
        )}

        {isError && (
          <div className="py-24 text-center text-destructive">
            Unable to load categories.
          </div>
        )}

        {!isLoading && !isError && (
          <CategoryGrid categories={categoryCards} />
        )}
      </section>
    </main>
  );
}
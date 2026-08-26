import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "../../../../components/ui/button";

import type { CategoryCardData } from "../../../home/types/home";
import { CategoryGrid } from "../../../home/components/ShopByCategory/CategoryGrid";

import { useCategories } from "../../hooks/useCategories";

import { ShopHeader } from "../ShopHeader";

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
   <main className="container mx-auto px-6 pt-14 pb-20">
      <section className="mx-auto max-w-3xl">
        <ShopHeader
          eyebrow="BD Collection"
          title="Discover Every Collection"
          description="Browse premium fashion collections curated for every occasion. Explore categories or view our complete catalogue."
          align="center"
          size="hero"
          showBreadcrumbs={false}
        />

       <div className="mt-8 flex justify-center">
          <Link to="/shop/all">
            <Button
              size="lg"
              className="rounded-full px-8"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
            Categories
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Product by Category
          </h2>
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
import { ShopHeader } from "../ShopHeader";
import { ProductGrid } from "../ProductGrid";

import { useCategory } from "../../hooks/useCategory";
import { useProductsByCategory } from "../../hooks/useProductsByCategory";

interface CategoryListingProps {
  slug: string;
}

export function CategoryListing({
  slug,
}: CategoryListingProps) {
  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useCategory(slug);

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useProductsByCategory(category?.id);

  if (categoryLoading || productsLoading) {
    return (
      <section className="container mx-auto px-6 py-24">
        <p className="text-center text-muted-foreground">
          Loading category...
        </p>
      </section>
    );
  }

  if (categoryError || !category) {
    return (
      <section className="container mx-auto px-6 py-24">
        <p className="text-center text-destructive">
          Category not found.
        </p>
      </section>
    );
  }

  if (productsError) {
    return (
      <section className="container mx-auto px-6 py-24">
        <p className="text-center text-destructive">
          Failed to load products.
        </p>
      </section>
    );
  }

  return (
    <main className="container mx-auto px-6 pt-10 pb-20">
      <ShopHeader
        eyebrow="BD Collection"
        title={category.name}
        description={category.description}
        productCount={products.length}
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Shop",
            href: "/shop",
          },
          {
            label: category.name,
          },
        ]}
        align="left"
        size="compact"
      />

      <section className="mt-10">
        <ProductGrid
          products={products}
          cols={4}
        />
      </section>
    </main>
  );
}
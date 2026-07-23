import { ProductGrid } from "../ProductGrid";
import { ShopHeader } from "../ShopHeader";

import { useProducts } from "../../hooks/useProducts";

export function ShopListing() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts();

  if (isLoading) {
    return (
      <section className="container mx-auto px-6 py-24">
        <p className="text-center text-muted-foreground">
          Loading products...
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container mx-auto px-6 py-24">
        <p className="text-center text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load products."}
        </p>
      </section>
    );
  }

  return (
   <main className="container mx-auto px-6 pt-10 pb-20">
      <ShopHeader
        eyebrow="BD Collection"
        title="Browse All Products"
        description="Explore our complete collection of premium fashion designed for every occasion."
        productCount={products.length}
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Shop",
          },
        ]}
        showBreadcrumbs
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
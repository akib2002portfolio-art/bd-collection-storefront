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
        <p className="text-center text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load products."}
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-20">
      <ShopHeader
        title="Discover Our Collection"
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
      />

      <ProductGrid
        products={products}
        cols={4}
      />
    </section>
  );
}
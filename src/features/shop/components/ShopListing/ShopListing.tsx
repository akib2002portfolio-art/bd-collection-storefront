import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { ProductGrid } from "../ProductGrid";
import { ShopHeader } from "../ShopHeader";

import { useProducts } from "../../hooks/useProducts";

export function ShopListing() {
  const [search, setSearch] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!search.trim()) {
      return products;
    }

    const keyword = search.toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.sku.toLowerCase().includes(keyword) ||
        product.categoryName.toLowerCase().includes(keyword)
    );
  }, [products, search]);

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
    <main className="container mx-auto px-6 pb-20 pt-10">
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

      <div className="mt-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border bg-background py-3 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <section className="mt-10">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} cols={4} />
        ) : (
          <div className="rounded-xl border border-dashed py-20 text-center">
            <h3 className="text-xl font-semibold">No products found</h3>

            <p className="mt-3 text-muted-foreground">
              Try another search keyword.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
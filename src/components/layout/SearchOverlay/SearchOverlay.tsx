import { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X, PackageSearch } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useProducts } from "../../../features/shop/hooks/useProducts";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [keyword, setKeyword] = useState("");
  const { data: products = [], isLoading } = useProducts();

  useEffect(() => {
    if (!open) {
      setKeyword("");
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!keyword.trim()) {
      return [];
    }

    const search = keyword.toLowerCase();

    return products.filter((product) => {
      const productName = (product.name ?? "").toLowerCase();
      const sku = (product.sku ?? "").toLowerCase();
      const categoryName = (product.categoryName ?? "Collection").toLowerCase();

      return (
        productName.includes(search) ||
        sku.includes(search) ||
        categoryName.includes(search)
      );
    });
  }, [keyword, products]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto flex h-full max-w-5xl flex-col px-6 py-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Search Products</h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-2 transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 rounded-xl border px-4 py-4">
                <Search className="h-5 w-5 text-muted-foreground" />

                <input
                  autoFocus
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-label="Search products"
                  placeholder="Search by product, SKU or category..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="mt-8 flex-1 overflow-y-auto">
              {!keyword.trim() && (
                <div className="rounded-xl border border-dashed p-16 text-center">
                  <PackageSearch className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

                  <h3 className="text-lg font-semibold">Start typing...</h3>

                  <p className="mt-2 text-muted-foreground">
                    Search products by name, SKU or category.
                  </p>
                </div>
              )}

              {keyword.trim() && isLoading && (
                <div className="py-12 text-center">Loading products...</div>
              )}

              {keyword.trim() && !isLoading && results.length === 0 && (
                <div className="rounded-xl border border-dashed p-16 text-center">
                  <PackageSearch className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

                  <h3 className="text-lg font-semibold">No products found</h3>

                  <p className="mt-2 text-muted-foreground">Try another keyword.</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-3">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-xl border p-3 transition hover:bg-muted"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <div className="font-semibold">{product.name}</div>

                        <div className="mt-1 text-sm text-muted-foreground">
                          {product.categoryName ?? "Collection"}
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground">
                          SKU: {product.sku}
                        </div>
                      </div>

                      {product.price !== null && (
                        <div className="text-right">
                          <div className="font-semibold">
                            {product.currency ?? "BDT"} {product.price}
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
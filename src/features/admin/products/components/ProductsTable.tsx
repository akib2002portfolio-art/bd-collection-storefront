import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
import { ProductRow } from "./ProductRow";

interface ProductsTableProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => Promise<void>;
}

export function ProductsTable({
  products,
  categories,
  loading,
  error,
  onDelete,
}: ProductsTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-8 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-10 text-center">
        <h2 className="font-display text-3xl text-ink">
          No Products Yet
        </h2>

        <p className="mt-3 text-taupe">
          Create your first product using the{" "}
          <strong>Add Product</strong> button.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categories={categories}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-hairline bg-canvas shadow-sm lg:block">
        <table className="min-w-full">
          <thead className="border-b border-hairline bg-bone">
            <tr className="text-left text-xs uppercase tracking-[0.22em] text-taupe">
              <th className="px-6 py-5">Product</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">SKU</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Stock</th>
              <th className="px-6 py-5 text-center">Featured</th>
              <th className="px-6 py-5 text-center">New</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                categories={categories}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
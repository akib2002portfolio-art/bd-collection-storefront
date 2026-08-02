import { useNavigate } from "@tanstack/react-router";

import { formatPrice } from "../../../../lib/format";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { ProductStatusBadge } from "./ProductStatusBadge";

interface ProductCardProps {
  product: Product;
  categories: Category[];
  onDelete: (id: string) => Promise<void>;
}

export function ProductCard({
  product,
  categories,
  onDelete,
}: ProductCardProps) {
  const navigate = useNavigate();

  const categoryName =
    categories.find((category) => category.id === product.category_id)?.name ?? "-";

  function handleEdit() {
    navigate({
      to: "/admin/edit-product/$id",
      params: { id: product.id },
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${product.name}"?\n\nThis action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await onDelete(product.id);
      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete product.",
      );
    }
  }

  return (
    <div className="rounded-xl border border-hairline bg-canvas p-4 shadow-sm">
      <div className="flex gap-4">
        <img
          src={product.image_url ?? "https://placehold.co/80x80?text=No+Image"}
          alt={product.name}
          className="h-16 w-16 shrink-0 rounded-lg border border-hairline object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-ink">{product.name}</p>
          <p className="truncate text-sm text-taupe">{categoryName}</p>
          <p className="mt-1 text-sm text-ink">
            {product.price !== null && product.currency !== null
              ? formatPrice(product.price, product.currency)
              : "No price"}
          </p>
        </div>

        <ProductStatusBadge status={product.status} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline pt-3 text-xs text-taupe">
        <span>SKU: {product.sku}</span>
        <span>Stock: {product.stock}</span>
        {product.featured && <span>⭐ Featured</span>}
        {product.new_arrival && <span>🆕 New</span>}
      </div>

      <div className="mt-3 flex justify-end gap-4 border-t border-hairline pt-3">
        <button
          type="button"
          onClick={handleEdit}
          className="text-sm text-ink transition hover:underline"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="text-sm text-red-600 transition hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

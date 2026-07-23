import { useNavigate } from "@tanstack/react-router";
import { formatPrice } from "../../../../lib/format";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { ProductStatusBadge } from "./ProductStatusBadge";

interface ProductRowProps {
  product: Product;
  categories: Category[];
  onDelete: (id: string) => Promise<void>;
}

export function ProductRow({
  product,
  categories,
  onDelete,
}: ProductRowProps) {
  const navigate = useNavigate();

  const categoryName =
    categories.find(
      (category) => category.id === product.category_id,
    )?.name ?? "-";

  function handleEdit() {
    navigate({
      to: "/admin/edit-product/$id",
      params: {
        id: product.id,
      },
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${product.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await onDelete(product.id);
      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete product.");
      }
    }
  }

  return (
    <tr className="border-b border-hairline transition hover:bg-bone">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={
              product.image_url ??
              "https://placehold.co/80x80?text=No+Image"
            }
            alt={product.name}
            className="h-16 w-16 rounded-lg border border-hairline object-cover"
          />

          <div>
            <p className="font-medium text-ink">
              {product.name}
            </p>

            <p className="text-sm text-taupe">
              {product.short_description || "-"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        {categoryName}
      </td>

      <td className="px-6 py-4">
        {product.sku}
      </td>

      <td className="px-6 py-4">
        {product.price !== null && product.currency !== null
          ? formatPrice(product.price, product.currency)
          : "-"}
      </td>

      <td className="px-6 py-4">
        {product.stock}
      </td>

      <td className="px-6 py-4 text-center">
        {product.featured ? "⭐" : "-"}
      </td>

      <td className="px-6 py-4 text-center">
        {product.new_arrival ? "🆕" : "-"}
      </td>

      <td className="px-6 py-4">
        <ProductStatusBadge
          status={product.status}
        />
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
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
      </td>
    </tr>
  );
}
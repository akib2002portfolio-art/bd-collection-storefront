import type { ProductStatus } from "../types/product";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const statusClasses: Record<ProductStatus, string> = {
  published:
    "bg-green-100 text-green-700 border border-green-200",

  draft:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",

  out_of_stock:
    "bg-red-100 text-red-700 border border-red-200",
};

const labels: Record<ProductStatus, string> = {
  published: "Published",
  draft: "Draft",
  out_of_stock: "Out of Stock",
};

export function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses[status]}`}
    >
      {labels[status]}
    </span>
  );
}
import type { Product } from "../../types/product";
import { formatPrice } from "../../../../lib/format";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const isInStock = product.stock > 0;

  return (
    <div className="flex flex-col">
      {/* Category */}
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {product.categoryName}
      </p>

      {/* Product Name */}
      <h1 className="mt-3 text-5xl font-bold leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-8 text-4xl font-bold">
        {formatPrice(product.price)}
      </p>

      {/* Product Details */}
      <div className="mt-10 rounded-2xl border bg-muted/20 p-6">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Product Details
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Category
            </span>

            <span className="font-medium">
              {product.categoryName}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              SKU
            </span>

            <span>{product.sku || "-"}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Availability
            </span>

            <span
              className={
                isInStock
                  ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                  : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
              }
            >
              {isInStock
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Description
        </h2>

        <p className="mt-5 text-base leading-8 text-muted-foreground">
          {product.description ||
            product.shortDescription ||
            "No description available."}
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!isInStock}
        className="mt-10 flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send Inquiry
      </button>
    </div>
  );
}
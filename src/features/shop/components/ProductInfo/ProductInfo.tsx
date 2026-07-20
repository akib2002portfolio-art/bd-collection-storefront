import type { Product } from "../../types/product";
import { formatPrice } from "../../../../lib/format";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const isInStock = product.stock > 0;

  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {product.categoryName}
      </p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        {product.name}
      </h1>

      <p className="mt-6 text-3xl font-semibold">
        {formatPrice(product.price)}
      </p>

      <div className="mt-8 space-y-3 border-y py-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">SKU</span>
          <span>{product.sku || "-"}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Availability</span>

          <span
            className={
              isInStock
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Description
        </h2>

        <p className="mt-4 leading-7 text-muted-foreground">
          {product.description ||
            product.shortDescription ||
            "No description available."}
        </p>
      </div>

      <button
        type="button"
        disabled={!isInStock}
        className="mt-10 h-12 rounded-md bg-primary px-8 text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send Inquiry
      </button>
    </div>
  );
}
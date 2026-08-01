import { Package } from "lucide-react";

import type { Product } from "../../shop/types/product";
import { formatPrice } from "../../../lib/format";

interface ProductInquiryCardProps {
  product: Product;
}

export function ProductInquiryCard({
  product,
}: ProductInquiryCardProps) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border bg-card shadow-sm">

      <div className="border-b bg-muted/40 px-6 py-4">

        <div className="flex items-center gap-2">

          <Package className="h-5 w-5 text-primary" />

          <span className="text-sm font-semibold uppercase tracking-[0.16em]">
            Product Inquiry
          </span>

        </div>

      </div>

      <div className="flex flex-col gap-6 p-6 sm:flex-row">

        <div className="h-36 w-full overflow-hidden rounded-xl border bg-muted sm:w-36">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}

        </div>

        <div className="flex-1 space-y-3">

          <div>

            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Category
            </p>

            <p className="mt-1 font-medium">
              {product.categoryName}
            </p>

          </div>

          <h3 className="text-2xl font-semibold">
            {product.name}
          </h3>

          <div className="flex flex-wrap gap-6 text-sm">

            <div>

              <p className="text-muted-foreground">
                Price
              </p>

              <p className="font-semibold">
                {product.price !== null
                  ? formatPrice(product.price, product.currency)
                  : "Contact for Price"}
              </p>

            </div>

            <div>

              <p className="text-muted-foreground">
                SKU
              </p>

              <p className="font-medium">
                {product.sku || "-"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
import type { Product } from "../../shop/types";
import type { ProductPreview } from "../types/home";

export function mapProductToPreview(
  product: Product,
): ProductPreview {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,

    price: product.price,
    currency: product.currency,

    // Database doesn't support sale price yet
    salePrice: undefined,

    thumbnail: product.imageUrl,

    // We'll replace this with the real category name later
    category: "",

    isNew: product.newArrival,
  };
}

export function mapProductsToPreview(
  products: Product[],
): ProductPreview[] {
  return products.map(mapProductToPreview);
}
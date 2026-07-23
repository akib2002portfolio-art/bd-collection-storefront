import type { CurrencyCode } from "../features/shop/types";

export function formatPrice(
  price: number | null,
  currency: CurrencyCode | null,
): string {
  if (price === null || currency === null) {
    return "";
  }

  const formattedPrice = new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(price);

  switch (currency) {
    case "BDT":
      return `৳${formattedPrice}`;

    case "USD":
      return `$${formattedPrice}`;

    default:
      return formattedPrice;
  }
}
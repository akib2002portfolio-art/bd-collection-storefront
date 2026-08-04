import { createFileRoute } from "@tanstack/react-router";

import { useSeoMetadata } from "../../hooks/useSeoMetadata";
import { ShopLanding } from "../../features/shop/components/ShopLanding";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
});

function ShopPage() {
  useSeoMetadata({
    title: "Shop | BD Collection",
    description: "Shop curated fashion collections and premium garments at BD Collection. Browse categories, featured products, and new arrivals.",
    canonical: "/shop",
    openGraph: {
      title: "Shop | BD Collection",
      description: "Shop curated fashion collections and premium garments at BD Collection.",
    },
  });

  return <ShopLanding />;
}
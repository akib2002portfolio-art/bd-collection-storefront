import { createFileRoute } from "@tanstack/react-router";

import { ShopListing } from "../../features/shop/components/ShopListing";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
});

function ShopPage() {
  return <ShopListing />;
}
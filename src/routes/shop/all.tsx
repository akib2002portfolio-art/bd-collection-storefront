import { createFileRoute } from "@tanstack/react-router";

import { ShopListing } from "../../features/shop/components/ShopListing";

export const Route = createFileRoute("/shop/all")({
  component: ShopAllPage,
});

function ShopAllPage() {
  return <ShopListing />;
}
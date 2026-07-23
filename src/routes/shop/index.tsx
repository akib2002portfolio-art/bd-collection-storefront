import { createFileRoute } from "@tanstack/react-router";

import { ShopLanding } from "../../features/shop/components/ShopLanding";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
});

function ShopPage() {
  return <ShopLanding />;
}
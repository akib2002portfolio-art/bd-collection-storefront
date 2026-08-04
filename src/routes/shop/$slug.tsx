import { createFileRoute } from "@tanstack/react-router";

import { CategoryListing } from "../../features/shop/components/CategoryListing";

export const Route = createFileRoute("/shop/$slug")({
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();

  return <CategoryListing slug={slug} />;
}

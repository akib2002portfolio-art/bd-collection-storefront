import { createFileRoute } from "@tanstack/react-router";

import { useSeoMetadata } from "../../hooks/useSeoMetadata";
import { CategoryListing } from "../../features/shop/components/CategoryListing";

export const Route = createFileRoute("/shop/$slug")({
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();

  useSeoMetadata({
    title: `${slug} | BD Collection`,
    description: `Browse the ${slug} collection at BD Collection.`,
    canonical: `/shop/${slug}`,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Shop", url: "/shop" },
      { name: slug },
    ],
  });

  return <CategoryListing slug={slug} />;
}

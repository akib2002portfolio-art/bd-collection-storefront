import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "../features/home/components/Hero";
import { ShopByCategory } from "../features/home/components/ShopByCategory";
import { FeaturedProducts } from "../features/home/components/FeaturedProducts";
import { AboutPreview } from "../features/home/components/AboutPreview";
import { useSeoMetadata } from "../hooks/useSeoMetadata";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  useSeoMetadata({
    title: "BD Collection | Premium Fashion Store",
    description: "Discover premium apparel and elevated style at BD Collection. Shop featured items, new arrivals, and curated categories.",
    canonical: "/",
    openGraph: {
      title: "BD Collection | Premium Fashion Store",
      description: "Discover premium apparel and elevated style at BD Collection. Shop featured items, new arrivals, and curated categories.",
    },
  });

  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <AboutPreview />
    </>
  );
}
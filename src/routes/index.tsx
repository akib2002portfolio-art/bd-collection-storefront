import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "../features/home/components/Hero";
import { ShopByCategory } from "../features/home/components/ShopByCategory";
import { FeaturedProducts } from "../features/home/components/FeaturedProducts";
import { NewArrivals } from "../features/home/components/NewArrivals";
import { AboutPreview } from "../features/home/components/AboutPreview";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <NewArrivals />
      <AboutPreview />
    </>
  );
}
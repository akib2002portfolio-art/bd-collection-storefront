import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../features/home/components/Hero";
import { ShopByCategory } from "../features/home/components/ShopByCategory";
import { FeaturedProducts } from "../features/home/components/FeaturedProducts";
import { AboutPreview } from "../features/home/components/AboutPreview";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <AboutPreview />
    </>
  );
}
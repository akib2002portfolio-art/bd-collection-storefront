import { createFileRoute } from "@tanstack/react-router";
import { RelatedProducts } from "../../features/shop/components/RelatedProducts";
import { ProductGallery } from "../../features/shop/components/ProductGallery";
import { ProductInfo } from "../../features/shop/components/ProductInfo";
import { useProduct } from "../../features/shop/hooks/useProduct";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { slug } = Route.useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(slug);

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-destructive">
            Failed to load product.
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">
            Product not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <ProductGallery
          productName={product.name}
          imageUrl={product.imageUrl}
        />

        <ProductInfo product={product} />
      </div>

      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </main>
  );
}
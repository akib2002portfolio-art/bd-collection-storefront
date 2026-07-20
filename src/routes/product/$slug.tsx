import { createFileRoute } from "@tanstack/react-router";
import { ProductBreadcrumb } from "../../features/shop/components/ProductBreadcrumb";
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
      <div className="container mx-auto px-4 py-20">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <p>Failed to load product.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-12">

      <ProductBreadcrumb
        categoryName={product.categoryName}
        productName={product.name}
      />

      <div className="grid gap-16 lg:grid-cols-2">

        <ProductGallery
          productName={product.name}
          imageUrl={product.imageUrl}
        />

        <ProductInfo
          product={product}
        />

      </div>

    </main>
  );
}
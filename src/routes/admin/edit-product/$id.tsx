import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import {
  useEffect,
  useState,
} from "react";

import { ProductForm } from "../../../features/admin/products/components/ProductForm";
import { useProducts } from "../../../features/admin/products/hooks/useProducts";
import type {
  Product,
  CreateProductInput,
} from "../../../features/admin/products/types/product";

export const Route = createFileRoute(
  "/admin/edit-product/$id",
)({
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const {
    getProductById,
    updateProduct,
  } = useProducts();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data =
          await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [getProductById, id]);

  async function handleSubmit(
    data: CreateProductInput,
  ) {
    try {
      setSaving(true);

      await updateProduct({
        ...data,
        id,
      });

      alert("Product updated successfully.");

      navigate({
        to: "/admin/products",
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to update product.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-8 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-ink">
          Edit Product
        </h1>

        <p className="mt-2 text-taupe">
          Update your product information.
        </p>
      </div>

      <ProductForm
        initialData={product}
        loading={saving}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
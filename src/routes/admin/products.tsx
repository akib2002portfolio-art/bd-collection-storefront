import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  ProductToolbar,
} from "../../features/admin/products/components/ProductToolbar";

import {
  ProductsTable,
} from "../../features/admin/products/components/ProductsTable";

import {
  useProducts,
} from "../../features/admin/products/hooks/useProducts";

import {
  useCategories,
} from "../../features/admin/categories/hooks/useCategories";

import {
  AdminLayout,
} from "../../features/admin/shared";

export const Route = createFileRoute(
  "/admin/products",
)({
  component: ProductsPage,
});

function ProductsPage() {
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
    deleteProduct,
  } = useProducts();

  const {
    categories,
  } = useCategories();

  function handleAddProduct() {
    navigate({
      to: "/admin/new-product",
    });
  }

  return (
    <AdminLayout
      title="Products"
      subtitle="Manage your product catalog"
    >
      <div className="space-y-6">
        <ProductToolbar
          productCount={products.length}
          onAddProduct={handleAddProduct}
        />

        <ProductsTable
          products={products}
          categories={categories}
          loading={loading}
          error={error}
          onDelete={deleteProduct}
        />
      </div>
    </AdminLayout>
  );
}
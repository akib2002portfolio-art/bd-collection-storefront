import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import { AdminLayout } from "../../features/admin/shared";

import { useCategories } from "../../features/admin/categories/hooks/useCategories";

import { CategoryToolbar } from "../../features/admin/categories/components/CategoryToolbar";

import { CategoriesTable } from "../../features/admin/categories/components/CategoriesTable";

export const Route = createFileRoute(
  "/admin/categories",
)({
  component: CategoriesPage,
});

function CategoriesPage() {
  const navigate = useNavigate();

  const {
    categories,
    loading,
    error,
    refresh,
  } = useCategories();

  function handleAddCategory() {
    navigate({
      to: "/admin/new-category",
    });
  }

  return (
    <AdminLayout
      title="Categories"
      subtitle="Manage your product categories"
    >
      <div className="space-y-6">
        <CategoryToolbar
          categoryCount={categories.length}
          onAddCategory={handleAddCategory}
        />

        <CategoriesTable
          categories={categories}
          loading={loading}
          error={error}
          onRefresh={refresh}
        />
      </div>
    </AdminLayout>
  );
}
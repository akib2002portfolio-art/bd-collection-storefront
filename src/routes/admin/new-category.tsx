import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  CategoryForm,
  type CategoryFormData,
} from "../../features/admin/categories/components/CategoryForm";

import { useCategories } from "../../features/admin/categories/hooks/useCategories";

import { AdminLayout } from "../../features/admin/shared";

export const Route = createFileRoute(
  "/admin/new-category",
)({
  component: NewCategoryPage,
});

function NewCategoryPage() {
  const navigate = useNavigate();

  const { createCategory } =
    useCategories();

  async function handleSubmit(
    data: CategoryFormData,
  ) {
    try {
      await createCategory(data);

      alert(
        "Category created successfully.",
      );

      navigate({
        to: "/admin/categories",
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          "Failed to create category.",
        );
      }
    }
  }

  return (
    <AdminLayout
      title="New Category"
      subtitle="Create a new category"
    >
      <CategoryForm
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
}
import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  CategoryForm,
  type CategoryFormData,
} from "../../features/admin/categories/components/CategoryForm";

import { useCategories } from "../../features/admin/categories/hooks/useCategories";

import type { Category } from "../../features/admin/categories/types/category";

import { AdminLayout } from "../../features/admin/shared";

export const Route = createFileRoute(
  "/admin/edit-category/$id",
)({
  component: EditCategoryPage,
});

function EditCategoryPage() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const {
    getCategoryById,
    updateCategory,
  } = useCategories();

  const [category, setCategory] =
    useState<Category>();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadCategory() {
      try {
        const data =
          await getCategoryById(id);

        setCategory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadCategory();
  }, [id, getCategoryById]);

  if (loading) {
    return (
      <AdminLayout
        title="Edit Category"
        subtitle="Loading..."
      >
        <div className="rounded-xl border border-hairline bg-canvas p-8 text-center">
          Loading category...
        </div>
      </AdminLayout>
    );
  }

  if (!category) {
    return (
      <AdminLayout
        title="Edit Category"
        subtitle="Not Found"
      >
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          Category not found.
        </div>
      </AdminLayout>
    );
  }

  async function handleSubmit(
    data: CategoryFormData,
  ) {
    try {
      await updateCategory({
        id,
        ...data,
      });

      alert(
        "Category updated successfully.",
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
          "Failed to update category.",
        );
      }
    }
  }

  return (
    <AdminLayout
      title="Edit Category"
      subtitle="Update category"
    >
      <CategoryForm
        initialData={category}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
}
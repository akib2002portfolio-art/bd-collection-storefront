import { useNavigate } from "@tanstack/react-router";

import type { Category } from "../types/category";
import { useCategories } from "../hooks/useCategories";

interface CategoryCardProps {
  category: Category;
  onRefresh: () => Promise<void>;
}

export function CategoryCard({ category, onRefresh }: CategoryCardProps) {
  const navigate = useNavigate();
  const { deleteCategory } = useCategories();

  function handleEdit() {
    navigate({
      to: "/admin/edit-category/$id",
      params: { id: category.id },
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${category.name}"?\n\nThis action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await deleteCategory(category.id);
      await onRefresh();
      alert("Category deleted successfully.");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete category.",
      );
    }
  }

  return (
    <div className="rounded-xl border border-hairline bg-canvas p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-medium text-ink">{category.name}</p>
        <span className="text-xs text-taupe">Order: {category.display_order}</span>
      </div>

      <p className="mt-1 text-sm text-taupe">{category.slug ?? "-"}</p>

      <div className="mt-3 flex justify-end gap-4 border-t border-hairline pt-3">
        <button
          type="button"
          onClick={handleEdit}
          className="text-sm text-ink transition hover:underline"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="text-sm text-red-600 transition hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

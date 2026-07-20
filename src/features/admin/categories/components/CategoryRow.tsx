import { useNavigate } from "@tanstack/react-router";

import type { Category } from "../types/category";
import { useCategories } from "../hooks/useCategories";

interface CategoryRowProps {
  category: Category;
  onRefresh: () => Promise<void>;
}

export function CategoryRow({
  category,
  onRefresh,
}: CategoryRowProps) {
  const navigate = useNavigate();

  const { deleteCategory } =
    useCategories();

  function handleEdit() {
    navigate({
      to: "/admin/edit-category/$id",
      params: {
        id: category.id,
      },
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${category.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(category.id);

      await onRefresh();

      alert(
        "Category deleted successfully.",
      );
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          "Failed to delete category.",
        );
      }
    }
  }

  return (
    <tr className="border-b border-hairline transition hover:bg-bone">
      <td className="px-6 py-4">
        {category.name}
      </td>

      <td className="px-6 py-4">
        {category.slug ?? "-"}
      </td>

      <td className="px-6 py-4">
        {category.display_order}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
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
      </td>
    </tr>
  );
}
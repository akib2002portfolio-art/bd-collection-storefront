import type { Category } from "../types/category";
import { CategoryRow } from "./CategoryRow";

interface CategoriesTableProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

export function CategoriesTable({
  categories,
  loading,
  error,
  onRefresh,
}: CategoriesTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-8 text-center">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-10 text-center">
        <h2 className="font-display text-3xl text-ink">
          No Categories Yet
        </h2>

        <p className="mt-3 text-taupe">
          Create your first category.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-sm">
      <table className="w-full">
        <thead className="border-b border-hairline bg-bone">
          <tr className="text-left text-xs uppercase tracking-[0.22em] text-taupe">
            <th className="px-6 py-5">
              Name
            </th>

            <th className="px-6 py-5">
              Slug
            </th>

            <th className="px-6 py-5">
              Order
            </th>

            <th className="px-6 py-5 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onRefresh={onRefresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
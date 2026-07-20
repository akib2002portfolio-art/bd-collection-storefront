interface CategoryToolbarProps {
  categoryCount: number;
  onAddCategory: () => void;
}

export function CategoryToolbar({
  categoryCount,
  onAddCategory,
}: CategoryToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-hairline bg-canvas p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-display text-2xl text-ink">
          Categories
        </h2>

        <p className="mt-1 text-sm text-taupe">
          {categoryCount}{" "}
          {categoryCount === 1
            ? "category"
            : "categories"}
        </p>
      </div>

      <button
        type="button"
        onClick={onAddCategory}
        className="rounded-md bg-ink px-5 py-3 text-canvas transition hover:bg-sienna"
      >
        + Add Category
      </button>
    </div>
  );
}
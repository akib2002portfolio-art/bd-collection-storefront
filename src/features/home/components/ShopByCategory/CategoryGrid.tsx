import type { CategoryCardData } from "../../types/home";

import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: CategoryCardData[];
}

export function CategoryGrid({
  categories,
}: CategoryGridProps) {
  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
      "
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}
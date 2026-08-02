interface CategoryBreakdownProps {
  data: { id: string; name: string; count: number }[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const max = Math.max(1, ...data.map((category) => category.count));

  return (
    <div className="rounded-xl border border-hairline bg-canvas p-6 shadow-sm">
      <h3 className="font-display text-xl text-ink">Products by Category</h3>

      <div className="mt-4 space-y-3">
        {data.map((category) => (
          <div key={category.id}>
            <div className="flex justify-between text-sm">
              <span className="text-ink">{category.name}</span>
              <span className="text-taupe">{category.count}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-bone">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${(category.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

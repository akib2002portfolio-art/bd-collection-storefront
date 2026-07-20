interface ProductToolbarProps {
  productCount: number;
  onAddProduct: () => void;
}

export function ProductToolbar({
  productCount,
  onAddProduct,
}: ProductToolbarProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="eyebrow">
          {productCount} Products
        </p>
      </div>

      <button
        type="button"
        onClick={onAddProduct}
        className="rounded-md bg-ink px-5 py-3 text-xs uppercase tracking-[0.22em] text-canvas transition hover:bg-sienna"
      >
        Add Product
      </button>
    </div>
  );
}
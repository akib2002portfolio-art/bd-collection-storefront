import { Link } from "@tanstack/react-router";

interface ProductBreadcrumbProps {
  categoryName: string;
  productName: string;
}

export function ProductBreadcrumb({
  categoryName,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
    >
      <Link
        to="/"
        className="transition-colors hover:text-foreground"
      >
        Home
      </Link>

      <span>/</span>

      <Link
        to="/shop"
        className="transition-colors hover:text-foreground"
      >
        Shop
      </Link>

      <span>/</span>

      <span>{categoryName}</span>

      <span>/</span>

      <span className="font-medium text-foreground">
        {productName}
      </span>
    </nav>
  );
}
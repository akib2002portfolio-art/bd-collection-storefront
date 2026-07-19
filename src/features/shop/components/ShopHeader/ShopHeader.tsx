import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ShopHeaderProps {
  title: string;
  description?: string;
  productCount: number;
  breadcrumbs?: BreadcrumbItem[];
}

export function ShopHeader({
  title,
  description,
  productCount,
  breadcrumbs = [],
}: ShopHeaderProps) {
  return (
    <header className="mb-12">
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <span
              key={item.label}
              className="flex items-center gap-1"
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">
                  {item.label}
                </span>
              )}

              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          ))}
        </nav>
      )}

      <p className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
        Shop
      </p>

      <h1 className="mt-3 text-5xl font-bold tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        {productCount} Products
      </p>
    </header>
  );
}
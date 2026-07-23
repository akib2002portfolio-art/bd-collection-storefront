import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { cn } from "../../../../lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ShopHeaderProps {
  eyebrow?: string;

  title: string;

  description?: string;

  productCount?: number;

  breadcrumbs?: BreadcrumbItem[];

  showBreadcrumbs?: boolean;

  align?: "left" | "center";

  size?: "hero" | "compact";
}

export function ShopHeader({
  eyebrow = "Shop",
  title,
  description,
  productCount,
  breadcrumbs = [],
  showBreadcrumbs = true,
  align = "left",
  size = "hero",
}: ShopHeaderProps) {
  return (
    <header
      className={cn(
        "mb-16",
        align === "center" && "text-center"
      )}
    >
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <span
              key={item.label}
              className="flex items-center gap-1"
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className="transition-colors hover:text-foreground"
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

      <p className="mt-8 text-sm uppercase tracking-[0.32em] text-muted-foreground">
        {eyebrow}
      </p>

      <h1
        className={cn(
          "mt-4 font-bold tracking-tight",
          size === "hero"
            ? "text-5xl md:text-6xl"
            : "text-4xl"
        )}
      >
        {title}
      </h1>

      {description && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-7 text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}

      {productCount !== undefined && (
        <p className="mt-5 text-sm text-muted-foreground">
          {productCount} Products
        </p>
      )}
    </header>
  );
}
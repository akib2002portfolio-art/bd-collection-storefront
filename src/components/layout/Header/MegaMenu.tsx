import { Link } from "@tanstack/react-router";

import type { NavigationItem } from "../../../config/navigation";

interface MegaMenuProps {
  items: NavigationItem[];
}

export function MegaMenu({ items }: MegaMenuProps) {
  return (
    <div
      className={[
        "absolute left-0 top-full z-50",
        "min-w-[280px]",
        "pt-2",

        // Animation
        "opacity-0 invisible translate-y-2",
        "pointer-events-none",
        "transition-all duration-200 ease-out",

        // Hover
        "group-hover:opacity-100",
        "group-hover:visible",
        "group-hover:translate-y-0",
        "group-hover:pointer-events-auto",
      ].join(" ")}
    >
      <div
        className={[
          "rounded-2xl",
          "border border-border",
          "bg-background",
          "shadow-xl",
          "backdrop-blur-xl",
          "p-6",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={[
                "rounded-lg",
                "px-3 py-2",
                "text-sm",
                "font-medium",
                "transition-all duration-200",
                "hover:bg-muted",
                "hover:text-primary",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
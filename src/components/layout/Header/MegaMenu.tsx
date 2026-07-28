import { Link } from "@tanstack/react-router";

import type { NavigationItem } from "../../../config/navigation";

interface MegaMenuProps {
  items: NavigationItem[];
}

export function MegaMenu({ items }: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-full mt-4 hidden min-w-[280px] rounded-2xl border border-border bg-background p-6 shadow-xl group-hover:block">
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm transition-colors duration-200 hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
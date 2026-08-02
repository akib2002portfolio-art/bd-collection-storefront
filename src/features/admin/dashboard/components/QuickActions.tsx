import { Link } from "@tanstack/react-router";
import { Plus, Package, FolderTree, Image as ImageIcon } from "lucide-react";

const actions = [
  { label: "Add Product", href: "/admin/new-product", icon: Package },
  { label: "Add Category", href: "/admin/new-category", icon: FolderTree },
  { label: "Add Hero Slide", href: "/admin/new-hero", icon: ImageIcon },
] as const;

export function QuickActions() {
  return (
    <div className="rounded-xl border border-hairline bg-canvas p-6 shadow-sm">
      <h3 className="font-display text-xl text-ink">Quick Actions</h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {actions.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            to={href}
            className="flex flex-col items-center gap-2 rounded-lg border border-hairline px-4 py-5 text-center text-sm transition-colors hover:bg-bone"
          >
            <Icon className="h-5 w-5 text-ink" />
            <span className="flex items-center gap-1">
              <Plus className="h-3.5 w-3.5" />
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

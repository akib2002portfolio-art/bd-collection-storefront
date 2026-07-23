import {
  LayoutDashboard,
  Package,
  Home,
  Settings,
  LogOut,
} from "lucide-react";

import { cn } from "../../../../lib/utils";
import {
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";

import { useAdminAuth } from "../../auth";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Homepage",
    icon: Home,
    href: "/admin/homepage",
  },
  {
    label: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    label: "Site Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  const { logout } = useAdminAuth();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  function isActive(href: string) {
    switch (href) {
      case "/admin/products":
        return (
          pathname.startsWith("/admin/products") ||
          pathname.startsWith("/admin/new-product") ||
          pathname.startsWith("/admin/edit-product")
        );

      case "/admin/homepage":
        return pathname.startsWith("/admin/homepage");

      case "/admin/settings":
        return pathname.startsWith("/admin/settings");

      default:
        return pathname === href;
    }
  }

  async function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to logout?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await logout();

      navigate({
        to: "/",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to logout.");
    }
  }

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-hairline bg-canvas">
      {/* Logo */}
      <div className="border-b border-hairline px-7 py-7">
        <h1 className="font-display text-2xl text-ink">
          BD <span className="italic">Collection</span>
        </h1>

        <p className="mt-1 text-sm text-taupe">
          Content Management System
        </p>

        <p className="eyebrow mt-3 !text-taupe">
          Administrator
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-7">
        {navItems.map(({ label, icon: Icon, href }) => (
          <button
            key={label}
            type="button"
            onClick={() =>
              navigate({
                to: href,
              })
            }
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-xs uppercase tracking-[0.22em] transition-all duration-200",
              isActive(href)
                ? "bg-ink text-canvas shadow-sm"
                : "text-taupe hover:bg-bone hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-hairline px-7 py-6">
        <p className="font-medium text-ink">
          Administrator
        </p>

        <p className="mt-1 text-sm text-taupe">
          Owner
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-taupe transition-colors hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
import {
  LayoutDashboard,
  Package,
  Home,
  Settings,
  FolderTree,
  FileText,
  Inbox,
  LogOut,
  X,
} from "lucide-react";

import { cn } from "../../../../lib/utils";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { useAdminAuth } from "../../auth";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Homepage", icon: Home, href: "/admin/homepage" },
  { label: "About", icon: FileText, href: "/admin/about" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Categories", icon: FolderTree, href: "/admin/categories" },
  { label: "Inquiries", icon: Inbox, href: "/admin/inquiries" },
  { label: "Site Settings", icon: Settings, href: "/admin/settings" },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
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
      case "/admin/categories":
        return (
          pathname.startsWith("/admin/categories") ||
          pathname.startsWith("/admin/new-category") ||
          pathname.startsWith("/admin/edit-category")
        );
      case "/admin/inquiries":
        return pathname.startsWith("/admin/inquiries");
      case "/admin/homepage":
        return pathname.startsWith("/admin/homepage");
      case "/admin/about":
        return pathname.startsWith("/admin/about");
      case "/admin/settings":
        return pathname.startsWith("/admin/settings");
      default:
        return pathname === href;
    }
  }

  async function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await logout();
      navigate({ to: "/", replace: true });
    } catch (error) {
      console.error(error);
      alert("Failed to logout.");
    }
  }

  function handleNavigate(href: string) {
    navigate({ to: href });
    onClose();
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-72 shrink-0 flex-col border-r border-hairline bg-canvas transition-transform duration-300 ease-out",
          "lg:sticky lg:top-0 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between border-b border-hairline px-7 py-7">
          <div>
            <h1 className="font-display text-2xl text-ink">
              BD <span className="italic">Collection</span>
            </h1>
            <p className="mt-1 text-sm text-taupe">Content Management System</p>
            <p className="eyebrow mt-3">Administrator</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-taupe transition-colors hover:bg-bone hover:text-ink lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
          {navItems.map(({ label, icon: Icon, href }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavigate(href)}
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

        <div className="border-t border-hairline px-7 py-6">
          <p className="font-medium text-ink">Administrator</p>
          <p className="mt-1 text-sm text-taupe">Owner</p>

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
    </>
  );
}
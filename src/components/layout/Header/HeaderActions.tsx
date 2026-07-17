import { Search, ShieldUser } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { siteConfig } from "../../../data/site";

interface HeaderActionsProps {
  onSearchClick: () => void;
}

export function HeaderActions({
  onSearchClick,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Search products"
        onClick={onSearchClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:bg-muted"
      >
        <Search className="h-5 w-5" />
      </button>

      <Link
        to={siteConfig.adminLoginPath}
        className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-muted"
      >
        <ShieldUser className="h-4 w-4" />
        <span>Admin</span>
      </Link>
    </div>
  );
}
import { Search, ShieldUser } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { siteConfig } from "../../../data/site";
import { useHeaderTheme } from "./HeaderContext";

interface HeaderActionsProps {
  onSearchClick: () => void;
}

export function HeaderActions({
  onSearchClick,
}: HeaderActionsProps) {
  const { variant } = useHeaderTheme();

  const isTransparent = variant === "transparent";

  const buttonClass = isTransparent
    ? [
        "border-white/30",
        "bg-white/10",
        "text-white",
        "hover:bg-white/20",
      ].join(" ")
    : [
        "border-border",
        "bg-background",
        "text-foreground",
        "hover:bg-muted",
      ].join(" ");

  const adminClass = isTransparent
    ? [
        "border-white/30",
        "text-white",
        "hover:bg-white/10",
      ].join(" ")
    : [
        "border-border",
        "text-foreground",
        "hover:bg-muted",
      ].join(" ");

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Search products"
        onClick={onSearchClick}
        className={[
          "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
          buttonClass,
        ].join(" ")}
      >
        <Search className="h-5 w-5" />
      </button>

      <Link
        to={siteConfig.adminLoginPath}
        className={[
          "hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 sm:inline-flex",
          adminClass,
        ].join(" ")}
      >
        <ShieldUser className="h-4 w-4" />
        <span>Admin</span>
      </Link>
    </div>
  );
}
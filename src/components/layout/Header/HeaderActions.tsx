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

  const searchClass = isTransparent
    ? [
        "border-white/20",
        "bg-white/10",
        "text-white",
        "backdrop-blur-xl",
        "hover:bg-white/20",
        "hover:border-white/40",
      ].join(" ")
    : [
        "border-border/70",
        "bg-background/80",
        "text-foreground",
        "backdrop-blur-xl",
        "hover:bg-primary",
        "hover:text-primary-foreground",
        "hover:border-primary",
      ].join(" ");

  const adminClass = isTransparent
    ? [
        "border-white/20",
        "bg-white/10",
        "text-white",
        "backdrop-blur-xl",
        "hover:bg-white/20",
        "hover:border-white/40",
      ].join(" ")
    : [
        "border-border/70",
        "bg-background/80",
        "text-foreground",
        "backdrop-blur-xl",
        "hover:bg-primary",
        "hover:text-primary-foreground",
        "hover:border-primary",
      ].join(" ");

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Search products"
        onClick={onSearchClick}
        className={[
          "group inline-flex h-11 w-11 items-center justify-center",
          "rounded-full border",
          "transition-all duration-300",
          "hover:-translate-y-0.5",
          "hover:shadow-lg",
          searchClass,
        ].join(" ")}
      >
        <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </button>

      <Link
        to={siteConfig.adminLoginPath}
        className={[
          "hidden sm:inline-flex",
          "items-center gap-2",
          "rounded-full",
          "border",
          "px-5 py-2.5",
          "text-sm font-semibold",
          "tracking-wide",
          "transition-all duration-300",
          "hover:-translate-y-0.5",
          "hover:shadow-lg",
          adminClass,
        ].join(" ")}
      >
        <ShieldUser className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
        <span>Admin</span>
      </Link>
    </div>
  );
}
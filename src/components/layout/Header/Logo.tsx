import { Link } from "@tanstack/react-router";
import { useSiteSettings } from "../../../features/settings/hooks";
import { useHeaderTheme } from "./HeaderContext";

export function Logo() {
  const { variant } = useHeaderTheme();

  const { data: settings } = useSiteSettings();

  const isTransparent =
    variant === "transparent";

  const storeName =
    settings?.storeName ||
    "BD Collection";

  const tagline =
    settings?.tagline ||
    "Premium Fashion Ltd";

  const logoUrl =
    settings?.logoUrl || "";

  return (
    <Link
      to="/"
      aria-label={storeName}
      className="group flex shrink-0 items-center gap-4"
    >
      {logoUrl ? (
        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          bg-white
          shadow-sm
          transition-all
          duration-300
          group-hover:scale-105
        "
        >
          <img
            src={logoUrl}
            alt={storeName}
            className="max-h-12 max-w-12 object-contain"
          />
        </div>
      ) : (
        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-xl
          bg-primary
          text-xl
          font-bold
          text-white
          transition-transform
          duration-300
          group-hover:scale-105
        "
        >
          {storeName.charAt(0)}
        </div>
      )}

      <div className="hidden sm:flex flex-col leading-tight">
        <span
          className={[
            "text-xl font-bold tracking-tight transition-colors duration-300",
            isTransparent
              ? "text-white"
              : "text-foreground",
          ].join(" ")}
        >
          {storeName}
        </span>

        <span
          className={[
            "text-xs uppercase tracking-[0.25em] transition-colors duration-300",
            isTransparent
              ? "text-white/80"
              : "text-muted-foreground",
          ].join(" ")}
        >
          {tagline}
        </span>
      </div>
    </Link>
  );
}
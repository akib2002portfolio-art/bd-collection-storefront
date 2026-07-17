import { Link } from "@tanstack/react-router";

import { siteConfig } from "../../../data/site";
import { useHeaderTheme } from "./HeaderContext";

export function Logo() {
  const { variant } = useHeaderTheme();

  const isTransparent = variant === "transparent";

  return (
    <Link
      to="/"
      aria-label={siteConfig.name}
      className="group inline-flex shrink-0 select-none"
    >
      <div className="flex flex-col leading-none">
        <span
          className={[
            "text-xs font-medium uppercase tracking-[0.35em] transition-colors duration-300",
            isTransparent
              ? "text-white/70"
              : "text-muted-foreground",
          ].join(" ")}
        >
          {siteConfig.brand.prefix}
        </span>

        <span
          className={[
            "text-4xl font-bold tracking-tight transition-colors duration-300",
            isTransparent
              ? "text-white"
              : "text-foreground",
          ].join(" ")}
        >
          {siteConfig.brand.suffix}
        </span>
      </div>
    </Link>
  );
}
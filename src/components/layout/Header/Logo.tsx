import { Link } from "@tanstack/react-router";
import { siteConfig } from "../../../data/site";

export function Logo() {
  return (
    <Link
      to="/"
      aria-label={siteConfig.name}
      className="group inline-flex shrink-0 items-center gap-2 select-none transition-opacity duration-300 hover:opacity-90"
    >
      <div className="flex flex-col leading-none">
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
          {siteConfig.brand.prefix}
        </span>

        <span className="text-xl font-bold tracking-wide transition-colors duration-300 group-hover:text-primary">
          {siteConfig.brand.suffix}
        </span>
      </div>
    </Link>
  );
}
import { Link } from "@tanstack/react-router";

import {
  infoNavigation,
  shopNavigation,
} from "../../../data/navigation";

import { MegaMenu } from "./MegaMenu";
import { useHeaderTheme } from "./HeaderContext";

export function Navigation() {
  const { variant } = useHeaderTheme();

  const isTransparent =
    variant === "transparent";

  const navClass = isTransparent
    ? "text-white hover:text-white/70"
    : "text-foreground hover:text-primary";

  return (
    <nav
      className="hidden items-center gap-8 lg:flex"
      aria-label="Main Navigation"
    >
      <div className="group relative">
        <Link
          to="/shop"
          className={[
            "text-sm font-medium transition-colors duration-300",
            navClass,
          ].join(" ")}
        >
          Shop
        </Link>

        <MegaMenu items={shopNavigation} />
      </div>

      {infoNavigation.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={[
            "text-sm font-medium transition-colors duration-300",
            navClass,
          ].join(" ")}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
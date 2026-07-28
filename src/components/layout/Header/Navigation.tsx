import { Link, useRouterState } from "@tanstack/react-router";

import {
  infoNavigation,
  shopNavigation,
} from "../../../config/navigation";

import { MegaMenu } from "./MegaMenu";
import { useHeaderTheme } from "./HeaderContext";

export function Navigation() {
  const { variant } = useHeaderTheme();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isTransparent = variant === "transparent";

  const baseClass = [
    "text-sm",
    "font-medium",
    "transition-colors",
    "duration-300",
  ].join(" ");

  const normalClass = isTransparent
    ? "text-white hover:text-white/70"
    : "text-foreground hover:text-primary";

  const activeClass = isTransparent
    ? "text-white"
    : "text-primary";

  const homeItem = infoNavigation.find(
    (item) => item.href === "/"
  );

  const otherItems = infoNavigation.filter(
    (item) => item.href !== "/"
  );

  const isHomeActive = pathname === "/";

  const isShopActive =
    pathname === "/shop" ||
    pathname.startsWith("/shop/");

  return (
    <nav
      className="hidden items-center gap-8 lg:flex"
      aria-label="Main Navigation"
    >
      {homeItem && (
        <Link
          to={homeItem.href}
          className={[
            baseClass,
            isHomeActive ? activeClass : normalClass,
          ].join(" ")}
        >
          {homeItem.label}
        </Link>
      )}

      <div className="group relative">
        <Link
          to="/shop"
          className={[
            baseClass,
            isShopActive ? activeClass : normalClass,
          ].join(" ")}
        >
          Shop
        </Link>

        <MegaMenu items={shopNavigation} />
      </div>

      {otherItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={[
              baseClass,
              isActive ? activeClass : normalClass,
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
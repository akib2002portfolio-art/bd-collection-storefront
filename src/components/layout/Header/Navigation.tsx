import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

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

  const homeItem = infoNavigation.find(
    (item) => item.href === "/"
  );

  const otherItems = infoNavigation.filter(
    (item) => item.href !== "/"
  );

  const isHomeActive = pathname === "/";
  const isShopActive = pathname.startsWith("/shop");

  const [shopOpen, setShopOpen] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const openMenu = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setShopOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShopOpen(false);
      timeoutRef.current = null;
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navClass = (active: boolean) =>
    [
      "group relative flex items-center gap-1 py-2 text-[15px] font-medium transition-all duration-300",

      active
        ? isTransparent
          ? "text-white"
          : "text-primary"
        : isTransparent
          ? "text-white/90 hover:text-white"
          : "text-foreground hover:text-primary",
    ].join(" ");

  return (
    <nav
      className="hidden lg:flex items-center gap-10"
      aria-label="Main Navigation"
    >
      {homeItem && (
        <Link
          to={homeItem.href}
          className={navClass(isHomeActive)}
        >
          {homeItem.label}

          <span
            className={[
              "absolute bottom-0 left-0 h-[2px] rounded-full bg-current transition-all duration-300",
              isHomeActive
                ? "w-full"
                : "w-0 group-hover:w-full",
            ].join(" ")}
          />
        </Link>
      )}

      <div
        className="relative"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <Link
          to="/shop"
          className={navClass(isShopActive)}
        >
          Products

          <ChevronDown
            className={[
              "h-4 w-4 transition-transform duration-300",
              shopOpen ? "rotate-180" : "",
            ].join(" ")}
          />

          <span
            className={[
              "absolute bottom-0 left-0 h-[2px] rounded-full bg-current transition-all duration-300",
              isShopActive || shopOpen
                ? "w-full"
                : "w-0 group-hover:w-full",
            ].join(" ")}
          />
        </Link>

        <MegaMenu
          items={shopNavigation}
          open={shopOpen}
        />
      </div>

      {otherItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={navClass(active)}
          >
            {item.label}

            <span
              className={[
                "absolute bottom-0 left-0 h-[2px] rounded-full bg-current transition-all duration-300",
                active
                  ? "w-full"
                  : "w-0 group-hover:w-full",
              ].join(" ")}
            />
          </Link>
        );
      })}
    </nav>
  );
}
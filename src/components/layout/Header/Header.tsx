import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { MobileMenu } from "../MobileMenu";
import { SearchOverlay } from "../SearchOverlay";

import { HeaderActions } from "./HeaderActions";
import { HeaderProvider } from "./HeaderContext";
import { Logo } from "./Logo";
import { MobileToggle } from "./MobileToggle";
import { Navigation } from "./Navigation";

export function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  const variant =
    isHomePage && !isScrolled
      ? "transparent"
      : "solid";

  return (
    <HeaderProvider
      value={{
        variant,
        isScrolled,
        isHomePage,
      }}
    >
      <>
        <header
          className={[
            "fixed inset-x-0 top-0 z-50 transition-all duration-300",
            variant === "transparent"
              ? "bg-transparent"
              : "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-xl",
          ].join(" ")}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <Logo />

            <Navigation />

            <div className="flex items-center gap-2">
              <HeaderActions
                onSearchClick={() =>
                  setIsSearchOpen(true)
                }
              />

              <MobileToggle
                onClick={() =>
                  setIsMobileMenuOpen(true)
                }
              />
            </div>
          </div>
        </header>

        <SearchOverlay
          open={isSearchOpen}
          onClose={() =>
            setIsSearchOpen(false)
          }
        />

        <MobileMenu
          open={isMobileMenuOpen}
          onClose={() =>
            setIsMobileMenuOpen(false)
          }
        />
      </>
    </HeaderProvider>
  );
}
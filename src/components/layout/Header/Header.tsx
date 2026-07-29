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

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
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
            "fixed inset-x-0 top-0 z-50",
            "transition-all duration-500 ease-out",
            variant === "transparent"
              ? "bg-transparent"
              : [
                  "border-b border-border/50",
                  "bg-background/85",
                  "backdrop-blur-2xl",
                  "shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
                ].join(" "),
          ].join(" ")}
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex h-24 items-center justify-between">

              {/* Left */}
              <Logo />

              {/* Center */}
              <Navigation />

              {/* Right */}
              <div className="flex items-center gap-3">
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
          </div>
        </header>

        <SearchOverlay
          open={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
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
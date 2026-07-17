import { useEffect, useState } from "react";
import { MobileMenu } from "../MobileMenu";
import { HeaderActions } from "./HeaderActions";
import { Logo } from "./Logo";
import { MobileToggle } from "./MobileToggle";
import { Navigation } from "./Navigation";
import { SearchOverlay } from "../SearchOverlay";
export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    // TODO: Connect to MobileMenu component
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // TODO: Connect to SearchOverlay component
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={[
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
                        : "bg-transparent",
                ].join(" ")}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <Logo />

                    <Navigation />

                    <div className="flex items-center gap-2">
                        <HeaderActions
                            onSearchClick={() => setIsSearchOpen(true)}
                        />

                        <MobileToggle
                            onClick={() => setIsMobileMenuOpen(true)}
                        />
                    </div>
                </div>
            </header>

            <SearchOverlay
                open={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            <MobileMenu
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
}
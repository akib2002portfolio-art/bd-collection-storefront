import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import {
  shopNavigation,
  infoNavigation,
} from "../../../config/navigation";
import { siteConfig } from "../../../data/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-[320px] max-w-[90vw] flex-col bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
            }}
          >
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-lg font-bold">
                  {siteConfig.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Shop
                  </p>

                  <div className="flex flex-col gap-3">
                    {shopNavigation.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className="text-base transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Company
                  </p>

                  <div className="flex flex-col gap-3">
                    {infoNavigation.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className="text-base transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="border-t p-6">
              <Link
                to={siteConfig.adminLoginPath}
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Admin Login
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
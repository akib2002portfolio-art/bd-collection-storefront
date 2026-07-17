import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
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
        <motion.div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto flex h-full max-w-4xl flex-col px-6 py-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Search Products
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 rounded-xl border px-4 py-4">
                <Search className="h-5 w-5 text-muted-foreground" />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="mt-10 flex-1">
              <div className="rounded-xl border border-dashed p-12 text-center">
                <p className="text-muted-foreground">
                  Product search will be connected to Supabase in a
                  later sprint.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useEffect, useRef, useState } from "react";
import { Search, Package, FolderTree } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { useAdminSearch } from "../hooks/useAdminSearch";

export function AdminSearch() {
  const { query, setQuery, results } = useAdminSearch();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(href: string) {
    setOpen(false);
    setQuery("");
    navigate({ to: href });
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs md:w-72">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />

      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search products, categories..."
        className="w-full rounded-full border border-hairline bg-canvas py-2.5 pl-11 pr-5 text-sm text-ink outline-none transition-colors placeholder:text-taupe focus:border-ink focus:bg-white"
      />

      {open && query.trim().length > 0 && (
        <div className="absolute right-0 top-12 z-50 w-full min-w-[280px] overflow-hidden rounded-xl border border-hairline bg-canvas shadow-xl">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-taupe">
              No results for "{query}"
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleSelect(result.href)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-bone"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bone">
                    {result.type === "product" ? (
                      <Package className="h-4 w-4 text-ink" />
                    ) : (
                      <FolderTree className="h-4 w-4 text-ink" />
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">
                      {result.label}
                    </span>
                    <span className="block truncate text-xs text-taupe">
                      {result.meta}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

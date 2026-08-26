import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { NavigationItem } from "../../../config/navigation";

interface MegaMenuProps {
  items: NavigationItem[];
  open: boolean;
}

export function MegaMenu({
  items,
  open,
}: MegaMenuProps) {
  return (
    <div
      className={[
        "absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-3 transition-all duration-300",

        open
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-border/60
          bg-background/95
          backdrop-blur-2xl
          shadow-[0_30px_80px_rgba(0,0,0,0.15)]
        "
      >
        <div className="grid grid-cols-2">
          <div className="border-r border-border/60 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Categories
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Product Collection
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Discover premium fashion designed with comfort, elegance and
              timeless style.
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="
                    group/item
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-4
                    transition-all
                    duration-300
                    hover:bg-muted
                  "
                >
                  <div>
                    <h4 className="font-semibold">{item.label}</h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Browse our latest collection
                    </p>
                  </div>

                  <ArrowUpRight
                    className="
                      h-5
                      w-5
                      opacity-0
                      transition-all
                      duration-300
                      group-hover/item:translate-x-1
                      group-hover/item:-translate-y-1
                      group-hover/item:opacity-100
                    "
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
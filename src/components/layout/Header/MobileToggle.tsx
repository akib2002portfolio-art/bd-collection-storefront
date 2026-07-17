import { Menu } from "lucide-react";

import { useHeaderTheme } from "./HeaderContext";

interface MobileToggleProps {
  onClick: () => void;
}

export function MobileToggle({
  onClick,
}: MobileToggleProps) {
  const { variant } = useHeaderTheme();

  const isTransparent =
    variant === "transparent";

  return (
    <button
      type="button"
      aria-label="Open navigation menu"
      onClick={onClick}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 lg:hidden",
        isTransparent
          ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
          : "border-border bg-background text-foreground hover:bg-muted",
      ].join(" ")}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
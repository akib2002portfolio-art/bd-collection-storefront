import { Menu } from "lucide-react";

interface MobileToggleProps {
  onClick: () => void;
}

export function MobileToggle({ onClick }: MobileToggleProps) {
  return (
    <button
      type="button"
      aria-label="Open navigation menu"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors duration-300 hover:bg-muted lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
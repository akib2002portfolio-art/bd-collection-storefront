import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";

interface ContactCardProps {
  children: ReactNode;
  className?: string;
}

export function ContactCard({
  children,
  className,
}: ContactCardProps) {
  return (
    <div
      className={cn(
        `
        group
        relative
        overflow-hidden

        rounded-2xl
        border
        border-border/60

        bg-background

        shadow-sm

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-xl
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
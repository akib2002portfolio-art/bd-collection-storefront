import type { ReactNode } from "react";

interface ContactSidebarCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function ContactSidebarCard({
  icon,
  title,
  subtitle,
  children,
}: ContactSidebarCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-border/60
        bg-background
        p-6
        shadow-sm

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-start gap-4">
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full

            transition-all
            duration-300

            group-hover:scale-110
            group-hover:rotate-6
          "
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="
              text-xl
              font-semibold
              leading-none

              transition-colors
              duration-300

              group-hover:text-primary
            "
          >
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="border-t border-border/50 pt-5">
        {children}
      </div>
    </div>
  );
}
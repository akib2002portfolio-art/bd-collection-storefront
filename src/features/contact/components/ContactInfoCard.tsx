import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { ContactCard } from "./ContactCard";

interface ContactInfoCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  value: string;
  href?: string;
  breakMode?: "normal" | "email";
}

export function ContactInfoCard({
  icon,
  title,
  subtitle,
  value,
  href,
  breakMode = "normal",
}: ContactInfoCardProps) {
  const content = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-primary
            transition-all
            duration-300
            group-hover:bg-primary
            group-hover:text-primary-foreground
            group-hover:scale-105
          "
        >
          {icon}
        </div>

        {href && (
          <ArrowUpRight
            size={18}
            className="
              text-muted-foreground
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
              group-hover:text-primary
            "
          />
        )}
      </div>

      {/* Body */}
      <div className="mt-6 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </p>

        <p
          className={`
            mt-2
            text-base
            font-semibold
            leading-snug
            tracking-tight
            text-foreground
            transition-colors
            duration-300
            group-hover:text-primary
            [overflow-wrap:anywhere]

            ${breakMode === "email" ? "" : "whitespace-pre-line"}
          `}
        >
          {value}
        </p>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <ContactCard className="h-full p-6">
      {href ? (
        <a href={href} className="block h-full">
          {content}
        </a>
      ) : (
        content
      )}
    </ContactCard>
  );
}
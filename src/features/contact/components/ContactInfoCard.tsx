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
            h-10
            w-10
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
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <h3
          className={`
            mt-2
            text-lg
            font-semibold
            leading-snug
            transition-colors
            duration-300
            group-hover:text-primary

            ${
              breakMode === "email"
                ? "break-all"
                : "break-words whitespace-pre-line"
            }
          `}
        >
          {value}
        </h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <ContactCard className="h-full p-5">
      {href ? (
        <a
          href={href}
          className="block h-full"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </ContactCard>
  );
}
import type { ReactNode } from "react";
import { cn } from "../../../../lib/utils";

interface AdminCardProps {
    title: string;
    value?: string;
    description?: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
}

export function AdminCard({ title, value, description, icon, children, className }: AdminCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-hairline bg-canvas p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
                className,
            )}
        >
            {icon && <div className="text-ink">{icon}</div>}
            <p
                className={cn(
                    "eyebrow !text-taupe",
                    icon && "mt-3",
                )}
            >
                {title}
            </p>
            {value && <p className="mt-2 font-display text-4xl text-ink">{value}</p>}
            {description && <p className="mt-2 text-sm text-taupe">{description}</p>}
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
}
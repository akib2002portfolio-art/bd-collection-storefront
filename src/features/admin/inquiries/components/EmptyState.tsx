import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border bg-card py-20 text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">

        <Inbox className="h-8 w-8 text-muted-foreground" />

      </div>

      <h3 className="text-lg font-semibold">

        {title}

      </h3>

      <p className="mt-2 text-sm text-muted-foreground">

        {description}

      </p>

    </div>
  );
}
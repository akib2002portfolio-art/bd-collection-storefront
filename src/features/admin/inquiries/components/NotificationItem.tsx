import { CircleDot } from "lucide-react";

import type { Inquiry } from "../../../contact/types";

import { formatRelativeDate } from "../utils/formatRelativeDate";

interface NotificationItemProps {
  inquiry: Inquiry;
  onClick: () => void;
}

export function NotificationItem({
  inquiry,
  onClick,
}: NotificationItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-3 border-b p-4 text-left transition hover:bg-muted"
    >
      <CircleDot className="mt-1 h-3 w-3 fill-blue-500 text-blue-500" />

      <div className="min-w-0 flex-1">

        <div className="truncate font-semibold">
          {inquiry.name}
        </div>

        <div className="truncate text-sm text-muted-foreground">
          {inquiry.product?.name ??
            "General Inquiry"}
        </div>

        <div className="mt-1 text-xs text-muted-foreground">
          {formatRelativeDate(
            inquiry.createdAt,
          )}
        </div>

      </div>

    </button>
  );
}
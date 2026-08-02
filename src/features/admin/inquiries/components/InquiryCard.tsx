import { User } from "lucide-react";

import type { Inquiry } from "../../../contact/types";

import { InquiryStatusBadge } from "./InquiryStatusBadge";
import { formatRelativeDate } from "../utils/formatRelativeDate";

interface InquiryCardProps {
  inquiry: Inquiry;
  onClick?: () => void;
}

export function InquiryCard({ inquiry, onClick }: InquiryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition hover:shadow-md ${
        inquiry.status === "unread" ? "border-l-4 border-l-blue-500" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>

          <div className="min-w-0">
            <div
              className={`truncate ${
                inquiry.status === "unread" ? "font-bold" : "font-medium"
              }`}
            >
              {inquiry.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {inquiry.email}
            </div>
          </div>
        </div>

        <InquiryStatusBadge status={inquiry.status} />
      </div>

      <div className="border-t pt-3">
        <div className="truncate text-sm font-medium">
          {inquiry.subject || "General Inquiry"}
        </div>
        <div className="mt-1 truncate text-xs text-muted-foreground">
          {inquiry.message}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {inquiry.product ? inquiry.product.name : "General"} · {inquiry.type}
        </span>
        <span>{formatRelativeDate(inquiry.createdAt)}</span>
      </div>
    </button>
  );
}

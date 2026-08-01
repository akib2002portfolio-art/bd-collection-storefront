import {
  CheckCircle2,
  Archive,
  CircleDot,
} from "lucide-react";

interface InquiryStatusBadgeProps {
  status:
    | "unread"
    | "read"
    | "archived";
}

export function InquiryStatusBadge({
  status,
}: InquiryStatusBadgeProps) {
  switch (status) {
    case "unread":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          <CircleDot className="h-3.5 w-3.5 fill-current" />
          Unread
        </span>
      );

    case "read":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Read
        </span>
      );

    case "archived":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Archive className="h-3.5 w-3.5" />
          Archived
        </span>
      );

    default:
      return null;
  }
}
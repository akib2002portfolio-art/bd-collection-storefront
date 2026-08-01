import type { InquiryStatus } from "../../../contact/types";

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
}

const styles: Record<InquiryStatus, string> = {
  unread:
    "bg-blue-100 text-blue-700 border border-blue-200",

  read:
    "bg-green-100 text-green-700 border border-green-200",

  archived:
    "bg-gray-100 text-gray-600 border border-gray-200",
};

export function InquiryStatusBadge({
  status,
}: InquiryStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
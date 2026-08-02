import { Link } from "@tanstack/react-router";

import type { Inquiry } from "../../../contact/types";
import { InquiryStatusBadge } from "../../inquiries/components/InquiryStatusBadge";
import { formatRelativeDate } from "../../inquiries/utils/formatRelativeDate";

interface RecentInquiriesProps {
  inquiries: Inquiry[];
}

export function RecentInquiries({ inquiries }: RecentInquiriesProps) {
  return (
    <div className="rounded-xl border border-hairline bg-canvas p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-ink">Recent Inquiries</h3>

        <Link to="/admin/inquiries" className="text-sm text-taupe hover:text-ink">
          View all →
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <p className="mt-4 text-sm text-taupe">No inquiries yet.</p>
      ) : (
        <div className="mt-4 divide-y divide-hairline">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {inquiry.name}
                </p>
                <p className="truncate text-xs text-taupe">
                  {inquiry.subject || "General Inquiry"}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <InquiryStatusBadge status={inquiry.status} />
                <span className="text-xs text-taupe">
                  {formatRelativeDate(inquiry.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

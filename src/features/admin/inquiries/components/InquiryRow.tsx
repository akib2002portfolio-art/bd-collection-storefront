import { User } from "lucide-react";

import type { Inquiry } from "../../../contact/types";

import { InquiryStatusBadge } from "./InquiryStatusBadge";
import { formatRelativeDate } from "../utils/formatRelativeDate";

interface InquiryRowProps {
  inquiry: Inquiry;
  onClick?: () => void;
}

export function InquiryRow({
  inquiry,
  onClick,
}: InquiryRowProps) {
  const rowStyle =
    inquiry.status === "unread"
      ? "border-l-4 border-l-blue-500 bg-blue-50/40 dark:bg-blue-950/10"
      : inquiry.status === "archived"
      ? "opacity-60"
      : "";

  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer border-b transition-all duration-200 hover:bg-muted/60 ${rowStyle}`}
    >
      {/* Status */}
      <td className="px-4 py-4 align-top">
        <InquiryStatusBadge
          status={inquiry.status}
        />
      </td>

      {/* Type */}
      <td className="px-4 py-4 align-top">
        <span className="capitalize font-medium">
          {inquiry.type}
        </span>
      </td>

      {/* Customer */}
      <td className="px-4 py-4">
        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>

          <div>

            <div
              className={`${
                inquiry.status === "unread"
                  ? "font-bold"
                  : "font-medium"
              }`}
            >
              {inquiry.name}
            </div>

            <div className="text-sm text-muted-foreground">
              {inquiry.email}
            </div>

            {inquiry.phone && (
              <div className="text-xs text-muted-foreground">
                {inquiry.phone}
              </div>
            )}

          </div>

        </div>
      </td>

      {/* Product */}
      <td className="px-4 py-4">

        {inquiry.product ? (
          <>
            <div className="font-medium">
              {inquiry.product.name}
            </div>

            <div className="text-xs text-muted-foreground">
              {inquiry.product.sku}
            </div>
          </>
        ) : (
          <span className="text-muted-foreground">
            General Inquiry
          </span>
        )}

      </td>

      {/* Subject */}
      <td className="px-4 py-4">

        <div className="max-w-xs truncate font-medium">
          {inquiry.subject || "-"}
        </div>

        <div className="mt-1 max-w-xs truncate text-xs text-muted-foreground">
          {inquiry.message}
        </div>

      </td>

      {/* Date */}
      <td className="px-4 py-4">

        <div className="font-medium">
          {formatRelativeDate(
            inquiry.createdAt,
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {new Date(
            inquiry.createdAt,
          ).toLocaleDateString()}
        </div>

      </td>

    </tr>
  );
}
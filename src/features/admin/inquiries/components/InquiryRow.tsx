import type { Inquiry } from "../../../contact/types";

import { InquiryStatusBadge } from "./InquiryStatusBadge";

interface InquiryRowProps {
  inquiry: Inquiry;
  onClick?: () => void;
}

export function InquiryRow({
  inquiry,
  onClick,
}: InquiryRowProps) {
  return (
    <tr
      onClick={onClick}
      className="cursor-pointer border-b transition hover:bg-muted/40"
    >
      <td className="px-4 py-4">
        <InquiryStatusBadge
          status={inquiry.status}
        />
      </td>

      <td className="px-4 py-4 capitalize">
        {inquiry.type}
      </td>

      <td className="px-4 py-4">
        <div className="font-medium">
          {inquiry.name}
        </div>

        <div className="text-sm text-muted-foreground">
          {inquiry.email}
        </div>
      </td>

      <td className="px-4 py-4">
        {inquiry.product?.name ?? "-"}
      </td>

      <td className="px-4 py-4">
        {inquiry.subject ?? "-"}
      </td>

      <td className="px-4 py-4 text-sm text-muted-foreground">
        {new Date(
          inquiry.createdAt,
        ).toLocaleString()}
      </td>
    </tr>
  );
}
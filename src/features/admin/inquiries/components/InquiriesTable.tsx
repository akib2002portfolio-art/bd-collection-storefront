import { useNavigate } from "@tanstack/react-router";

import { InquiryRow } from "./InquiryRow";
import { InquiryCard } from "./InquiryCard";

import type { Inquiry } from "../../../contact/types";

interface InquiriesTableProps {
  inquiries: Inquiry[];
  isLoading: boolean;
  isError: boolean;
}

export function InquiriesTable({
  inquiries,
  isLoading,
  isError,
}: InquiriesTableProps) {
  const navigate = useNavigate();

  function openInquiry(inquiry: Inquiry) {
    navigate({
      to: "/admin/inquiry/$id",
      params: { id: inquiry.id },
    });
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <p className="text-muted-foreground">
          Loading inquiries...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center">
        <p className="font-medium text-destructive">
          Failed to load inquiries.
        </p>
      </div>
    );
  }

  if (!inquiries || inquiries.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-16 text-center">
        <h2 className="text-lg font-semibold">
          No inquiries found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Customer inquiries will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {inquiries.map((inquiry) => (
          <InquiryCard
            key={inquiry.id}
            inquiry={inquiry}
            onClick={() => openInquiry(inquiry)}
          />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Subject</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((inquiry) => (
                <InquiryRow
                  key={inquiry.id}
                  inquiry={inquiry}
                  onClick={() => openInquiry(inquiry)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
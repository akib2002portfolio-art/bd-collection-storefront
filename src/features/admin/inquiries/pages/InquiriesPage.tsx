import { useMemo, useState } from "react";

import { AdminLayout } from "../../shared";

import {
  InquiryStats,
  InquiryToolbar,
  InquiriesTable,
} from "../components";

import { useInquiries } from "../../../contact/hooks";

export function InquiriesPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "unread" | "read" | "archived"
  >("all");

  const {
    data: inquiries = [],
    isLoading,
    isError,
  } = useInquiries();

  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];

    if (filter !== "all") {
      result = result.filter(
        (item) => item.status === filter,
      );
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((item) => {
        return (
          item.name
            .toLowerCase()
            .includes(keyword) ||
          item.email
            .toLowerCase()
            .includes(keyword) ||
          (item.subject ?? "")
            .toLowerCase()
            .includes(keyword) ||
          (item.product?.name ?? "")
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    return result;
  }, [
    inquiries,
    filter,
    search,
  ]);

  return (
    <AdminLayout
      title="Customer Inquiries"
      subtitle="Manage customer inquiries from your storefront."
    >
      <div className="space-y-6">

        <InquiryStats
          inquiries={inquiries}
        />

        <InquiryToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        <InquiriesTable
          inquiries={filteredInquiries}
          isLoading={isLoading}
          isError={isError}
        />

      </div>
    </AdminLayout>
  );
}
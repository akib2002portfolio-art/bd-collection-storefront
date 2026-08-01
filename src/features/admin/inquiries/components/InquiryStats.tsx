import { useMemo } from "react";

import { useInquiries } from "../../../contact/hooks";

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}

export function InquiryStats() {
  const {
    data: inquiries = [],
    isLoading,
  } = useInquiries();

  const stats = useMemo(() => {
    const unread = inquiries.filter(
      (i) => i.status === "unread",
    ).length;

    const product = inquiries.filter(
      (i) => i.type === "product",
    ).length;

    const general = inquiries.filter(
      (i) => i.type === "general",
    ).length;

    return {
      total: inquiries.length,
      unread,
      product,
      general,
    };
  }, [inquiries]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Unread"
        value={stats.unread}
      />

      <StatCard
        title="Total"
        value={stats.total}
      />

      <StatCard
        title="Product"
        value={stats.product}
      />

      <StatCard
        title="General"
        value={stats.general}
      />
    </div>
  );
}
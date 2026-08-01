import {
  Inbox,
  MailOpen,
  Package,
  Mail,
} from "lucide-react";

import { useMemo } from "react";

import type { Inquiry } from "../../../contact/types";

interface InquiryStatsProps {
  inquiries: Inquiry[];
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export function InquiryStats({
  inquiries,
}: InquiryStatsProps) {
  const stats = useMemo(() => {
    return {
      total: inquiries.length,

      unread: inquiries.filter(
        (i) => i.status === "unread",
      ).length,

      product: inquiries.filter(
        (i) => i.type === "product",
      ).length,

      general: inquiries.filter(
        (i) => i.type === "general",
      ).length,
    };
  }, [inquiries]);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Unread"
        value={stats.unread}
        icon={
          <Inbox className="h-6 w-6 text-blue-600" />
        }
        color="bg-blue-100 dark:bg-blue-950/40"
      />

      <StatCard
        title="Total"
        value={stats.total}
        icon={
          <MailOpen className="h-6 w-6 text-emerald-600" />
        }
        color="bg-emerald-100 dark:bg-emerald-950/40"
      />

      <StatCard
        title="Product"
        value={stats.product}
        icon={
          <Package className="h-6 w-6 text-orange-600" />
        }
        color="bg-orange-100 dark:bg-orange-950/40"
      />

      <StatCard
        title="General"
        value={stats.general}
        icon={
          <Mail className="h-6 w-6 text-violet-600" />
        }
        color="bg-violet-100 dark:bg-violet-950/40"
      />

    </div>
  );
}
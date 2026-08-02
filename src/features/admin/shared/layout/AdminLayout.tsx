import { useState, type ReactNode } from "react";

import { useInquiries } from "../../../contact/hooks";

import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AdminLayout({
  title,
  subtitle,
  children,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: inquiries = [] } = useInquiries();
  const unreadInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "unread",
  );

  return (
    <div className="flex min-h-screen bg-bone">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          unreadCount={unreadInquiries.length}
          notifications={unreadInquiries}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
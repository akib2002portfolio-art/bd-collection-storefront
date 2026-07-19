import type { ReactNode } from "react";

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
  return (
    <div className="flex min-h-screen bg-bone">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminHeader
          title={title}
          subtitle={subtitle}
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
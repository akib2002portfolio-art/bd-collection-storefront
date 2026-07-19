import { createFileRoute } from "@tanstack/react-router";
import {
  AdminLayout,
} from "../../features/admin/shared";

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Content Management System"
    >
      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>

        <p className="mt-3 text-gray-600">
          Sprint 2 Admin Shell Working ✅
        </p>
      </div>
    </AdminLayout>
  );
}
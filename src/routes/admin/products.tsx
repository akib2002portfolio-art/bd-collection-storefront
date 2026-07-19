import { createFileRoute } from "@tanstack/react-router";
import {
  AdminLayout,
} from "../../features/admin/shared";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <AdminLayout
      title="Products"
      subtitle="Manage your product catalog"
    >
      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <h2 className="text-2xl font-semibold">
          Products
        </h2>

        <p className="mt-3 text-gray-600">
          Product Management Coming Soon
        </p>
      </div>
    </AdminLayout>
  );
}
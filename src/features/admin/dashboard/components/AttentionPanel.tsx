import { Link } from "@tanstack/react-router";
import { AlertTriangle, Inbox } from "lucide-react";

import type { Product } from "../../products/types/product";
import type { Inquiry } from "../../../contact/types";

interface AttentionPanelProps {
  lowStockProducts: Product[];
  missingPriceProducts: Product[];
  unreadInquiries: Inquiry[];
}

export function AttentionPanel({
  lowStockProducts,
  missingPriceProducts,
  unreadInquiries,
}: AttentionPanelProps) {
  const hasNothing =
    lowStockProducts.length === 0 &&
    missingPriceProducts.length === 0 &&
    unreadInquiries.length === 0;

  if (hasNothing) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-6 text-sm text-taupe">
        Nothing needs your attention right now.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-hairline bg-canvas p-6 shadow-sm">
      <h3 className="font-display text-xl text-ink">Needs Attention</h3>

      <div className="mt-4 space-y-3">
        {unreadInquiries.length > 0 && (
          <Link
            to="/admin/inquiries"
            className="flex items-center justify-between rounded-lg border border-hairline px-4 py-3 text-sm transition-colors hover:bg-bone"
          >
            <span className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-blue-600" />
              {unreadInquiries.length} unread inquiry
              {unreadInquiries.length === 1 ? "" : "ies"}
            </span>
            <span className="text-taupe">View →</span>
          </Link>
        )}

        {lowStockProducts.length > 0 && (
          <Link
            to="/admin/products"
            className="flex items-center justify-between rounded-lg border border-hairline px-4 py-3 text-sm transition-colors hover:bg-bone"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              {lowStockProducts.length} product
              {lowStockProducts.length === 1 ? "" : "s"} low on stock
            </span>
            <span className="text-taupe">View →</span>
          </Link>
        )}

        {missingPriceProducts.length > 0 && (
          <Link
            to="/admin/products"
            className="flex items-center justify-between rounded-lg border border-hairline px-4 py-3 text-sm transition-colors hover:bg-bone"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              {missingPriceProducts.length} product
              {missingPriceProducts.length === 1 ? "" : "s"} missing a price
            </span>
            <span className="text-taupe">View →</span>
          </Link>
        )}
      </div>
    </div>
  );
}

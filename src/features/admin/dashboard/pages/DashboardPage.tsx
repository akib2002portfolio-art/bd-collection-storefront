import { AdminLayout } from "../../shared";
import { useDashboardData } from "../hooks/useDashboardData";

import {
  StatsGrid,
  AttentionPanel,
  RecentInquiries,
  QuickActions,
  CategoryBreakdown,
} from "../components";

export function DashboardPage() {
  const {
    loading,
    products,
    categories,
    inquiries,
    heroSlides,
    publishedProducts,
    lowStockProducts,
    missingPriceProducts,
    unreadInquiries,
    activeHeroSlides,
    categoryBreakdown,
    recentInquiries,
  } = useDashboardData();

  if (loading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Content Management System">
        <p className="text-taupe">Loading dashboard...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard" subtitle="Content Management System">
      <div className="space-y-6">
        <StatsGrid
          productsCount={products.length}
          publishedCount={publishedProducts.length}
          categoriesCount={categories.length}
          inquiriesCount={inquiries.length}
          unreadCount={unreadInquiries.length}
          heroSlidesCount={heroSlides.length}
          activeHeroCount={activeHeroSlides.length}
        />

        <AttentionPanel
          lowStockProducts={lowStockProducts}
          missingPriceProducts={missingPriceProducts}
          unreadInquiries={unreadInquiries}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentInquiries inquiries={recentInquiries} />
          </div>
          <CategoryBreakdown data={categoryBreakdown} />
        </div>

        <QuickActions />
      </div>
    </AdminLayout>
  );
}

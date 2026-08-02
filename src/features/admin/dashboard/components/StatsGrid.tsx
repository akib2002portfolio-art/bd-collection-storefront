import {
  Package,
  FolderTree,
  Inbox,
  Image as ImageIcon,
} from "lucide-react";

import { AdminCard } from "../../shared";

interface StatsGridProps {
  productsCount: number;
  publishedCount: number;
  categoriesCount: number;
  inquiriesCount: number;
  unreadCount: number;
  heroSlidesCount: number;
  activeHeroCount: number;
}

export function StatsGrid({
  productsCount,
  publishedCount,
  categoriesCount,
  inquiriesCount,
  unreadCount,
  heroSlidesCount,
  activeHeroCount,
}: StatsGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <AdminCard
        title="Products"
        value={String(productsCount)}
        description={`${publishedCount} published`}
        icon={<Package className="h-5 w-5" />}
      />

      <AdminCard
        title="Categories"
        value={String(categoriesCount)}
        icon={<FolderTree className="h-5 w-5" />}
      />

      <AdminCard
        title="Inquiries"
        value={String(inquiriesCount)}
        description={`${unreadCount} unread`}
        icon={<Inbox className="h-5 w-5" />}
      />

      <AdminCard
        title="Hero Slides"
        value={String(heroSlidesCount)}
        description={`${activeHeroCount} active`}
        icon={<ImageIcon className="h-5 w-5" />}
      />
    </div>
  );
}

import { useProducts } from "../../products/hooks/useProducts";
import { useCategories } from "../../categories/hooks/useCategories";
import { useInquiries } from "../../../contact/hooks";
import { useHeroSlides } from "../../../homepage/hooks";

const LOW_STOCK_THRESHOLD = 15;

export function useDashboardData() {
  const { products, loading: productsLoading } = useProducts();

  const { categories, loading: categoriesLoading } = useCategories();

  const {
    data: inquiries = [],
    isLoading: inquiriesLoading,
  } = useInquiries();

  const {
    data: heroSlides = [],
    isLoading: heroLoading,
  } = useHeroSlides();

  const loading =
    productsLoading ||
    categoriesLoading ||
    inquiriesLoading ||
    heroLoading;

  const publishedProducts = products.filter(
    (product) => product.status === "published",
  );

  const lowStockProducts = products.filter(
    (product) => product.stock < LOW_STOCK_THRESHOLD,
  );

  const missingPriceProducts = products.filter(
    (product) => product.price === null,
  );

  const unreadInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "unread",
  );

  const activeHeroSlides = heroSlides.filter(
    (slide) => slide.isActive,
  );

  const categoryBreakdown = categories.map((category) => ({
    id: category.id,
    name: category.name,
    count: products.filter(
      (product) => product.category_id === category.id,
    ).length,
  }));

  const recentInquiries = [...inquiries]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return {
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
  };
}

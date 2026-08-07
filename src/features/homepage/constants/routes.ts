interface HeroRouteOption {
  label: string;
  value: string;
}

interface HeroCategoryOption {
  name: string;
  slug: string;
}

export function createHeroRouteOptions(
  categories: HeroCategoryOption[] = [],
): HeroRouteOption[] {
  const categoryRoutes = categories.map((category) => ({
    label: category.name,
    value: `/shop/${category.slug}`,
  }));

  return [
    {
      label: "Home",
      value: "/",
    },
    {
      label: "Products",
      value: "/shop",
    },
    {
      label: "About",
      value: "/about",
    },
    {
      label: "Contact",
      value: "/contact",
    },
    ...categoryRoutes,
  ];
}
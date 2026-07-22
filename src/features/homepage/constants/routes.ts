export interface HeroRouteOption {
  label: string;
  value: string;
}

export const HERO_ROUTE_OPTIONS: HeroRouteOption[] = [
  {
    label: "Home",
    value: "/",
  },
  {
    label: "Shop",
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
  {
    label: "Men's Wear",
    value: "/shop?category=mens",
  },
  {
    label: "Women's Wear",
    value: "/shop?category=womens",
  },
  {
    label: "Kids",
    value: "/shop?category=kids",
  },
  {
    label: "Accessories",
    value: "/shop?category=accessories",
  },
];
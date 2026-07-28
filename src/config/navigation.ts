export interface NavigationChild {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationChild[];
}

export const shopNavigation: NavigationItem[] = [
  {
    label: "Men's Wear",
    href: "/shop/mens-wear",
  },
  {
    label: "Women's Wear",
    href: "/shop/womens-wear",
  },
  {
    label: "Kids",
    href: "/shop/kids",
  },
  {
    label: "Accessories",
    href: "/shop/accessories",
  },
];

export const infoNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
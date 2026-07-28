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
    label: "New Arrival",
    href: "/shop",
  },
  {
    label: "Men",
    href: "/shop/men",
  },
  {
    label: "Women",
    href: "/shop/women",
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
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
export const footerData = {
  company: {
    address: "Dhaka, Bangladesh",
    phone: "+880 1XXXXXXXXX",
    email: "info@bdcollection.com",
  },

  copyright: `© ${new Date().getFullYear()} BD Collection`,

  developer: {
    title: "Website engineered by",
    name: "Akib Al Imran",
    subtitle: "Software Engineer • Portfolio",
  },
};

// src/data/footer.ts

export const footerNavigation = [
  {
    title: "Products",
    links: [
      { label: "New Arrival", href: "/shop?category=new-arrival" },
      { label: "Men", href: "/shop?category=men" },
      { label: "Women", href: "/shop?category=women" },
      { label: "Kids", href: "/shop?category=kids" },
      { label: "Accessories", href: "/shop?category=accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
import type { HomeCategory } from "../../features/home/types/home";

export const homeCategories: HomeCategory[] = [
  {
    id: "new-arrival",
    name: "New Arrival",
    slug: "new-arrival",
    image: "/images/categories/new-arrival.webp",
    description: "Discover the latest arrivals.",
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    image: "/images/categories/men.jpg",
    description: "Modern essentials for men.",
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    image: "/images/categories/women.avif",
    description: "Elegant contemporary fashion.",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image: "/images/categories/kids.avif",
    description: "Comfortable styles for children.",
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image: "/images/categories/accessories.avif",
    description: "Complete every look.",
  },
];
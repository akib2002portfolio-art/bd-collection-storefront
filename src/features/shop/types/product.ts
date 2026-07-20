export type ProductStatus = "draft" | "published";

export interface Product {
  id: string;

  name: string;

  slug: string;

  sku: string;

  categoryId: string;

  categoryName: string;

  shortDescription: string;

  description: string;

  imageUrl: string;

  price: number;

  stock: number;

  featured: boolean;

  newArrival: boolean;

  displayOrder: number;

  status: ProductStatus;

  createdAt: string;

  updatedAt: string;
}
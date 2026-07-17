export interface Product {
  id: string;

  name: string;

  slug: string;

  shortDescription: string;

  description: string;

  price: number;

  salePrice?: number;

  categoryId: string;

  featured: boolean;

  newArrival: boolean;

  active: boolean;

  displayOrder: number;
}
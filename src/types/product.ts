export type ProductStatus =
  | "draft"
  | "published"
  | "out_of_stock";

export type CurrencyCode =
  | "BDT"
  | "USD";

export interface Product {
  id: string;

  name: string;
  slug: string;
  sku: string;

  category_id: string | null;

  short_description: string;
  description: string;

  price: number | null;
  currency: CurrencyCode | null;

  stock: number;

  image_url: string | null;

  featured: boolean;
  new_arrival: boolean;

  display_order: number;

  status: ProductStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  sku: string;

  category_id: string | null;

  short_description: string;
  description: string;

  price: number | null;
  currency: CurrencyCode | null;

  stock: number;

  image_url: string | null;

  featured: boolean;
  new_arrival: boolean;

  display_order: number;

  status: ProductStatus;
}

export interface UpdateProductInput
  extends CreateProductInput {
  id: string;
}
import { supabase } from "../../../lib/supabase";

import type {
  Product,
  CurrencyCode,
} from "../types";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  sku: string;

  category_id: string;

  categories: {
    name: string;
  } | null;

  short_description: string;
  description: string;
  image_url: string;

  price: number | null;
  currency: CurrencyCode | null;

  stock: number;

  featured: boolean;
  new_arrival: boolean;

  display_order: number;

  status: "draft" | "published";

  created_at: string;
  updated_at: string;
};

class ProductService {
  private mapProduct(row: ProductRow): Product {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      sku: row.sku,

      categoryId: row.category_id,
      categoryName: row.categories?.name ?? "Collection",

      shortDescription: row.short_description,
      description: row.description,

      imageUrl: row.image_url,

      price: row.price,
      currency: row.currency,

      stock: row.stock,

      featured: row.featured,
      newArrival: row.new_arrival,

      displayOrder: row.display_order,

      status: row.status,

      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories!products_category_id_fkey (
          name
        )
      `)
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    return (data as ProductRow[]).map((row) => this.mapProduct(row));
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories!products_category_id_fkey (
          name
        )
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return this.mapProduct(data as ProductRow);
  }

  async getRelatedProducts(
    categoryId: string,
    currentProductId: string,
    limit = 4,
  ): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories!products_category_id_fkey (
          name
        )
      `)
      .eq("status", "published")
      .eq("category_id", categoryId)
      .neq("id", currentProductId)
      .order("display_order", { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(
        `Failed to fetch related products: ${error.message}`,
      );
    }

    return (data as ProductRow[]).map((row) =>
      this.mapProduct(row),
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories!products_category_id_fkey (
          name
        )
      `)
      .eq("status", "published")
      .eq("featured", true)
      .order("display_order", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch featured products: ${error.message}`);
    }

    return (data as ProductRow[]).map((row) => this.mapProduct(row));
  }

  async getNewArrivals(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories!products_category_id_fkey (
          name
        )
      `)
      .eq("status", "published")
      .eq("new_arrival", true)
      .order("display_order", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch new arrivals: ${error.message}`);
    }

    return (data as ProductRow[]).map((row) => this.mapProduct(row));
  }
}

export const productService = new ProductService();
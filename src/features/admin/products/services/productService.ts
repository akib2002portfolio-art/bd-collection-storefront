import { supabase } from "../../../../lib/supabase";

import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "../types/product";

class ProductService {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Product[];
  }

  async getProductById(
    id: string,
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Product;
  }

  async createProduct(
    product: CreateProductInput,
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Product;
  }

  async updateProduct(
    product: UpdateProductInput,
  ): Promise<Product> {
    const { id, ...updates } = product;

    const { data, error } = await supabase
      .from("products")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Product;
  }

  async deleteProduct(
    id: string,
  ): Promise<void> {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export const productService =
  new ProductService();
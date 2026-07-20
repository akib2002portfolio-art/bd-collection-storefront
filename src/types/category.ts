export interface Category {
  id: string;

  name: string;

  slug: string | null;

  description: string | null;

  image: string | null;

  display_order: number;

  active: boolean;

  created_at: string;
  updated_at: string;
}
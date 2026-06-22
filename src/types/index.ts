export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Football' | 'Cricket' | 'Custom';
  sizes: string[];
  image: string;
  images?: string[];
  description: string;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_published: boolean;
  is_out_of_stock?: boolean;
  crossed_out_price?: number;
  created_at: string;
}

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

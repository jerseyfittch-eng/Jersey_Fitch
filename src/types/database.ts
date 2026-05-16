export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
          sizes: string[];
          image: string;
          images: string[];
          description: string;
          is_featured: boolean;
          is_new_arrival: boolean;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
    };
  };
}

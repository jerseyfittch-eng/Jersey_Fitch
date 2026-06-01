import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export function useProducts(category?: string, search?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let query = supabase.from('products').select('*').order('created_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error: err } = await query;

      if (!ignore) {
        if (err) {
          setError(err.message);
        } else {
          setProducts((data as Product[]) || []);
        }
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [category, search]);

  return { products, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!ignore) {
        if (err) setError(err.message);
        else setProduct(data as Product);
        setLoading(false);
      }
    };

    if (id) fetchProduct();
    return () => { ignore = true; };
  }, [id]);

  return { product, loading, error };
}

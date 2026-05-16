/*
  # Create Products Table for Jersey E-Commerce

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - jersey name
      - `price` (numeric) - price in INR
      - `category` (text) - Football, Cricket, or Custom
      - `sizes` (text[]) - available sizes array
      - `image` (text) - image URL
      - `description` (text) - product description
      - `is_featured` (boolean) - show in featured section
      - `is_new_arrival` (boolean) - show in new arrivals
      - `is_published` (boolean) - controls public visibility
      - `created_at` (timestamptz) - creation timestamp

  2. Security
    - Enable RLS on `products` table
    - Public (anon + authenticated) can SELECT published products
    - Only authenticated users (admins) can INSERT, UPDATE, DELETE
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10, 2) NOT NULL,
  category text NOT NULL CHECK (category IN ('Football', 'Cricket', 'Custom')),
  sizes text[] NOT NULL DEFAULT '{}',
  image text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  is_featured boolean NOT NULL DEFAULT false,
  is_new_arrival boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published products are viewable by everyone"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_new_arrival ON products(is_new_arrival);

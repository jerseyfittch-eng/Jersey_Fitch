/*
  # Add product images array support

  1. Schema
    - Add `images` (text[]) to `products`
    - Keep default as an empty array

  2. Data migration
    - Backfill `images` with the existing primary `image`
      so existing products continue to show correctly in detail slider.
*/

ALTER TABLE products
ADD COLUMN IF NOT EXISTS images text[] NOT NULL DEFAULT '{}';

UPDATE products
SET images = CASE
  WHEN image IS NOT NULL AND btrim(image) <> '' THEN ARRAY[image]
  ELSE '{}'
END
WHERE images = '{}';

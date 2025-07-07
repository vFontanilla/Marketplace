/*
  # Create listings table for marketplace

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `price` (numeric, required)
      - `description` (text, optional)
      - `category` (text, required)
      - `location` (text, optional)
      - `contact_email` (text, required)
      - `image_urls` (text array for storing image URLs)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `listings` table
    - Add policy for public read access
    - Add policy for authenticated users to create listings

  3. Storage
    - Create storage bucket for listing images
    - Set up public access policies for images
*/

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  description text,
  category text NOT NULL,
  location text,
  contact_email text NOT NULL,
  image_urls text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view listings"
  ON listings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create listings"
  ON listings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to listing images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'listing-images');

CREATE POLICY "Anyone can upload listing images"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'listing-images');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
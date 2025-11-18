-- Create storage bucket for room images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'room-images',
  'room-images',
  true,
  20971520, -- 20MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create storage policies for room images
CREATE POLICY "Anyone can view room images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'room-images');

CREATE POLICY "Authenticated owners can upload room images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'room-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Owners can update their room images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'room-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Owners can delete their room images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'room-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Add new fields to rooms table
ALTER TABLE public.rooms
ADD COLUMN IF NOT EXISTS deposit numeric,
ADD COLUMN IF NOT EXISTS owner_name text,
ADD COLUMN IF NOT EXISTS owner_phone text,
ADD COLUMN IF NOT EXISTS owner_whatsapp text,
ADD COLUMN IF NOT EXISTS nearby_landmarks text,
ADD COLUMN IF NOT EXISTS room_rules text,
ADD COLUMN IF NOT EXISTS has_attached_bathroom boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_furnished boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS has_ac boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS has_mess boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS average_rating numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_reviews integer DEFAULT 0;
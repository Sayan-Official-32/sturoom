-- Create triggers for auth.users table to handle new user signup
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_user_role();

-- Create storage bucket for room images
INSERT INTO storage.buckets (id, name, public)
VALUES ('room-images', 'room-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for room images
CREATE POLICY "Anyone can view room images"
ON storage.objects FOR SELECT
USING (bucket_id = 'room-images');

CREATE POLICY "Authenticated users can upload room images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'room-images');

CREATE POLICY "Users can update their own room images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'room-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own room images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'room-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Fix existing user who signed up but doesn't have a role
-- This handles the current user who already signed up
INSERT INTO public.user_roles (user_id, role)
SELECT id, COALESCE((raw_user_meta_data->>'signup_role')::user_role, 'student'::user_role)
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_roles)
ON CONFLICT DO NOTHING;
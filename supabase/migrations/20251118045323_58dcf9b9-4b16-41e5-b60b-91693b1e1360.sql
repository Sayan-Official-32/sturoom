-- Fix privilege escalation vulnerability in user_roles table

-- 1. Drop the insecure INSERT policy that allows users to set any role
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;

-- 2. Create a secure function to assign default role based on user metadata
CREATE OR REPLACE FUNCTION public.assign_user_role()
RETURNS TRIGGER AS $$
DECLARE
  signup_role user_role;
BEGIN
  -- Get the role from user metadata (set during signup)
  signup_role := COALESCE(NEW.raw_user_meta_data->>'signup_role', 'student')::user_role;
  
  -- Only allow 'student' or 'owner' roles during signup
  -- Admin roles can only be assigned manually by existing admins
  IF signup_role NOT IN ('student', 'owner') THEN
    signup_role := 'student';
  END IF;
  
  -- Insert the validated role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, signup_role);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Create trigger to automatically assign role on user creation
DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_user_role();

-- 4. Add policy to allow only admins to assign roles to others
CREATE POLICY "Only admins can assign roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));
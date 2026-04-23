-- Fix permissions for courses table
-- Ensure RLS is enabled and policies are applied correctly

-- 1. Enable RLS (already done, but just in case)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view active courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;

-- 3. Create fresh policies
-- Allow anonymous users to view active courses
CREATE POLICY "Anyone can view active courses" 
ON public.courses 
FOR SELECT 
TO anon, authenticated
USING (is_active = true);

-- Allow admins to do everything
CREATE POLICY "Admins can manage courses" 
ON public.courses 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. Grant SELECT on courses to anon role
GRANT SELECT ON public.courses TO anon;
GRANT SELECT ON public.courses TO authenticated;

-- 5. Repeat for other tables if needed
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.profiles TO authenticated;

-- 6. Ensure the profiles table has a policy for anon to view basic info if needed
-- or at least for authenticated users to view their own.
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- ============================================================
-- TradeNest Schema Patch v2
-- Run this in Supabase SQL Editor AFTER the main schema
-- ============================================================

-- 1. Fix column names: thumbnail_1/thumbnail_2 → thumbnail1/thumbnail2
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='courses' AND column_name='thumbnail_1'
  ) THEN
    ALTER TABLE public.courses RENAME COLUMN thumbnail_1 TO thumbnail1;
    ALTER TABLE public.courses RENAME COLUMN thumbnail_2 TO thumbnail2;
  END IF;
END $$;

-- 2. Add missing is_active column if not exists
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 3. Ensure provider_order_id has unique constraint for idempotency
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_provider_order_id_key;
ALTER TABLE public.orders ADD CONSTRAINT orders_provider_order_id_key UNIQUE (provider_order_id);

-- 4. Add updated_at to profiles for settings page
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- 5. Add has_lifetime_access shortcut to profiles (denormalized for speed)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_lifetime_access boolean DEFAULT false;

-- 6. Fix course_requests to match the extended schema
ALTER TABLE public.course_requests ADD COLUMN IF NOT EXISTS instructor_name text;
ALTER TABLE public.course_requests ADD COLUMN IF NOT EXISTS course_url text;
ALTER TABLE public.course_requests ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.course_requests ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.course_requests ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.course_requests DROP CONSTRAINT IF EXISTS course_requests_status_check;
ALTER TABLE public.course_requests ADD CONSTRAINT course_requests_status_check 
  CHECK (status IN ('pending', 'in-progress', 'fulfilled', 'rejected'));

-- Update the request_text column name if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='course_requests' AND column_name='request_text'
  ) THEN
    ALTER TABLE public.course_requests RENAME COLUMN request_text TO course_name;
  END IF;
END $$;

-- 7. RLS: Allow users to read their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- 8. RLS: Allow users to read order_items via their orders  
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can view own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );

-- 9. RLS: Users can read published courses
DROP POLICY IF EXISTS "Anyone can view active courses" ON public.courses;
CREATE POLICY "Anyone can view active courses" ON public.courses
  FOR SELECT USING (is_active = true);

-- 10. RLS: Admins can do full CRUD on courses
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
CREATE POLICY "Admins can manage courses" ON public.courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

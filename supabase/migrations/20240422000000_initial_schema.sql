-- Supabase Schema for TradeNest Marketplace
-- Consolidated Version (2026-04-23)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text check (role in ('user', 'admin')) default 'user',
  full_name text,
  avatar_url text,
  has_lifetime_access boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Courses table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text check (category in ('Forex', 'Trading', 'Business', 'Smart Money', 'Hot')),
  original_price numeric not null,
  sale_price numeric not null,
  discount_percentage numeric generated always as (round((original_price - sale_price) / original_price * 100)) stored,
  thumbnail1 text,
  thumbnail2 text,
  rating numeric default 5.0,
  is_featured boolean default false,
  is_bestseller boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Course links (Secure download links)
create table public.course_links (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  link_url text not null,
  platform text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  total_amount numeric not null,
  payment_status text check (payment_status in ('pending', 'completed', 'failed')) default 'pending',
  payment_provider text check (payment_provider in ('stripe', 'razorpay')),
  provider_order_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null
);

-- Memberships (Lifetime access)
create table public.memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text default 'lifetime',
  active boolean default true,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Course requests
create table public.course_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  course_name text not null,
  instructor_name text,
  course_url text,
  category text,
  notes text,
  status text default 'pending' check (status in ('pending', 'in-progress', 'fulfilled', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Support Tickets table
create table public.support_tickets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'open' check (status in ('open', 'in-progress', 'resolved')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Download logs
create table public.download_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  link_id uuid references public.course_links(id) on delete cascade,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- --- ROW LEVEL SECURITY (RLS) ---
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_links enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.memberships enable row level security;
alter table public.course_requests enable row level security;
alter table public.support_tickets enable row level security;
alter table public.download_logs enable row level security;

-- --- PERMISSIONS (FIX) ---
-- Ensure 'anon' and 'authenticated' roles have access to common tables
grant select on public.courses to anon;
grant select on public.courses to authenticated;
grant select on public.profiles to authenticated;

-- Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Anyone can view active courses" on public.courses for select using (is_active = true);
create policy "Admins can manage courses" on public.courses for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Secure access to course links" on public.course_links
  for select
  using (
    exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin')
    or
    exists (
      select 1 from public.order_items
      join public.orders on orders.id = order_items.order_id
      where order_items.course_id = course_links.course_id
      and orders.user_id = auth.uid()
      and orders.payment_status = 'completed'
    )
    or
    exists (select 1 from public.memberships where memberships.user_id = auth.uid() and memberships.active = true)
  );

create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);

create policy "Users can view own order items" on public.order_items
  for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Anyone can submit course requests" on public.course_requests for insert with check (true);
create policy "Users can view their own requests" on public.course_requests for select using (
  auth.uid() = user_id or email = (select email from public.profiles where id = auth.uid())
);
create policy "Admins can manage all requests" on public.course_requests for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Anyone can submit support tickets" on public.support_tickets for insert with check (true);
create policy "Admins can manage all support tickets" on public.support_tickets for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Admins can view download logs" on public.download_logs for select using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- --- FUNCTIONS & TRIGGERS ---
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- --- SEED DATA (OPTIONAL) ---
-- Uncomment or run manually if needed for initial setup
/*
INSERT INTO public.courses (title, description, category, original_price, sale_price, thumbnail1, is_featured, is_active)
VALUES 
('Advanced SMC Forex Masterclass', 'Master the Smart Money Concepts with this institutional trading course.', 'Forex', 1999, 19.99, 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80', true, true),
('ICT Mentorship 2024 (Private Content)', 'Exclusive access to the latest institutional trading mentorship.', 'Trading', 2500, 25.00, 'https://images.unsplash.com/photo-1535320485706-44d43b919500?w=800&q=80', true, true),
('E-Commerce Empire: 0 to $100k', 'Build a successful dropshipping and brand building business.', 'Business', 997, 9.97, 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', false, true),
('Crypto Scalping Pro', 'Fast-paced crypto trading strategies for daily profits.', 'Hot', 1499, 14.99, 'https://images.unsplash.com/photo-1639728733761-adc942d32702?w=800&q=80', true, true);
*/

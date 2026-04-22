-- Supabase Schema for Digital Course Marketplace

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text check (role in ('user', 'admin')) default 'user',
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Courses table
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  category text check (category in ('Forex', 'Trading', 'Business', 'Smart Money', 'Hot')),
  original_price numeric not null,
  sale_price numeric not null,
  discount_percentage numeric generated always as (round((original_price - sale_price) / original_price * 100)) stored,
  thumbnail_1 text, -- Main thumbnail
  thumbnail_2 text, -- Hover thumbnail
  rating numeric default 5.0,
  is_featured boolean default false,
  is_bestseller boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Course links (Secure download links)
create table public.course_links (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  link_url text not null, -- Google Drive, Mega, etc.
  platform text, -- 'Google Drive', 'Mega', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  total_amount numeric not null,
  payment_status text check (payment_status in ('pending', 'completed', 'failed')) default 'pending',
  payment_provider text check (payment_provider in ('stripe', 'razorpay')),
  provider_order_id text, -- Stripe Session ID or Razorpay Order ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null
);

-- Memberships (Lifetime access)
create table public.memberships (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text default 'lifetime',
  active boolean default true,
  expires_at timestamp with time zone, -- null for lifetime
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Course requests
create table public.course_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  request_text text not null,
  status text check (status in ('pending', 'fulfilled', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- --- ROW LEVEL SECURITY (RLS) ---

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_links enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.memberships enable row level security;
alter table public.course_requests enable row level security;

-- Profiles: Users can view their own, admins can view all.
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Courses: Everyone can view. Only admins can manage.
create policy "Anyone can view courses" on public.courses for select using (true);

-- Course Links: SECURE ACCESS
-- Only accessible if user purchased the course OR is an admin OR has active membership.
create policy "Secure access to course links" on public.course_links
  for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
    or
    exists (
      select 1 from public.order_items
      join public.orders on orders.id = order_items.order_id
      where order_items.course_id = course_links.course_id
      and orders.user_id = auth.uid()
      and orders.payment_status = 'completed'
    )
    or
    exists (
      select 1 from public.memberships
      where memberships.user_id = auth.uid()
      and memberships.active = true
    )
  );

-- Orders: Users can view own, admins can view all.
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);

-- Order Items: Users can view own, admins can view all.
create policy "Users can view own order items" on public.order_items
  for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- --- FUNCTIONS & TRIGGERS ---

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Download logs (Tracking access)
create table public.download_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  link_id uuid references public.course_links(id) on delete cascade,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.download_logs enable row level security;
create policy "Admins can view download logs" on public.download_logs for select using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- Course Requests table
create table public.course_requests (
  id uuid default uuid_generate_v4() primary key,
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

-- RLS for Course Requests
alter table public.course_requests enable row level security;

-- Anyone can insert (guests and users)
create policy "Anyone can submit course requests" on public.course_requests for insert with check (true);

-- Users can view their own requests
create policy "Users can view their own requests" on public.course_requests for select using (
  auth.uid() = user_id or email = (select email from public.profiles where id = auth.uid())
);

-- Admins can manage everything
create policy "Admins can manage all requests" on public.course_requests for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Support Tickets table
create table public.support_tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'open' check (status in ('open', 'in-progress', 'resolved')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Support Tickets
alter table public.support_tickets enable row level security;

-- Anyone can submit tickets
create policy "Anyone can submit support tickets" on public.support_tickets for insert with check (true);

-- Admins can manage everything
create policy "Admins can manage all support tickets" on public.support_tickets for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);



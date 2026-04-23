import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;


export function createClient() {
  if (typeof window === 'undefined') return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const _global = globalThis as any;

  if (_global.supabaseClient) return _global.supabaseClient;

  _global.supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return _global.supabaseClient;
}




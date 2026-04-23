import { createClient } from './supabase-server';

export async function getCourses(options?: { 
  category?: string; 
  featured?: boolean;
  limit?: number;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase.from('courses').select('*');

  if (options?.category && options.category !== 'All') {
    query = query.eq('category', options.category);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.search) {
    query = query.ilike('title', `%${options.search}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  // Ensure only active courses are shown
  query = query.eq('is_active', true);
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data;
}

export async function getCourseById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  return data;
}

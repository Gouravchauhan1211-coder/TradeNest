import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Retrieves all courses purchased by a user including their download links.
 */
export async function getUserPurchasedCoursesWithLinks(supabase: SupabaseClient, userId: string) {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        course_id,
        courses (
          *,
          course_links (*)
        ),
        orders!inner(user_id, payment_status)
      `)
      .eq('orders.user_id', userId)
      .eq('orders.payment_status', 'completed');

    if (error) throw error;

    // Map to unique course objects with links
    const courses = data.map((item: any) => item.courses);
    return courses;
  } catch (err) {
    console.error('Error fetching purchased courses with links:', err);
    return [];
  }
}

/**
 * Retrieves ALL courses with links for Lifetime Members.
 */
export async function getAllCoursesWithLinks(supabase: SupabaseClient) {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        course_links (*)
      `);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching all courses with links:', err);
    return [];
  }
}

/**
 * Checks if a user has an active lifetime membership.
 */
export async function hasLifetimeAccess(supabase: SupabaseClient, userId: string) {
  try {
    const { data, error } = await supabase
      .from('memberships')
      .select('id')
      .eq('user_id', userId)
      .eq('active', true)
      .eq('type', 'lifetime')
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (err) {
    console.error('Error checking membership access:', err);
    return false;
  }
}

/**
 * Checks if a user can download a specific course.
 * Logic: User has purchased the course OR has lifetime membership.
 */
export async function canUserDownloadCourse(userId: string, courseId: string) {
  const { createClient } = await import('@/lib/supabase-server');
  const supabase = await createClient();

  const isMember = await hasLifetimeAccess(supabase, userId);
  if (isMember) return true;

  const purchased = await getUserPurchasedCoursesWithLinks(supabase, userId);
  return purchased.some((course: any) => course.id === courseId);
}

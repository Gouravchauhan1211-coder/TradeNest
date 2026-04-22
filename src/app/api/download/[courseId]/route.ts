import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { canUserDownloadCourse } from '@/lib/access-control';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const { searchParams } = new URL(req.url);
  const linkId = searchParams.get('linkId');

  const supabase = await createClient();

  // 1. Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Verify access (Server-side check)
  const hasAccess = await canUserDownloadCourse(user.id, courseId);

  if (!hasAccess) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 3. Fetch course links
  const { data: links, error: linksError } = await supabase
    .from('course_links')
    .select('*')
    .eq('course_id', courseId);

  if (linksError || !links || links.length === 0) {
    return NextResponse.json({ error: 'Course links not found' }, { status: 404 });
  }

  // 4. Select the link (either by ID or first available)
  const selectedLink = linkId 
    ? links.find(l => l.id === linkId) 
    : links[0];

  if (!selectedLink) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }

  // 5. Log download event (Optional but recommended)
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  
  // Use a fire-and-forget or awaited log depending on preference
  // Here we await for reliability
  await supabase.from('download_logs').insert({
    user_id: user.id,
    course_id: courseId,
    link_id: selectedLink.id,
    ip_address: ip
  });

  // 6. Redirect to raw storage link
  return NextResponse.redirect(selectedLink.link_url);
}

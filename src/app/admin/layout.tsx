import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?callbackUrl=/admin');
  }

  // 2. Check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-grow p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

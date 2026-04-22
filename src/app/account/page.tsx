import { createClient } from '@/lib/supabase-server';
import { BookOpen, Star, Clock, ArrowRight } from 'lucide-react';
import { hasLifetimeAccess, getUserPurchasedCoursesWithLinks } from '@/lib/access-control';
import Link from 'next/link';

export default async function AccountDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [isLifetime, purchased] = await Promise.all([
    hasLifetimeAccess(supabase, user.id),
    getUserPurchasedCoursesWithLinks(supabase, user.id)
  ]);

  const stats = [
    { label: 'Purchased Courses', value: purchased.length, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Member Status', value: isLifetime ? 'Lifetime' : 'Standard', icon: Star, color: isLifetime ? 'text-purple-500' : 'text-muted-foreground' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Account Dashboard</h1>
        <p className="text-muted-foreground">Manage your learning journey and access your premium content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-muted/30 p-8 rounded-3xl space-y-4 border border-border">
            <stat.icon className={stat.color} size={32} />
            <div>
              <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              <div className="text-3xl font-black">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Recent Downloads</h2>
          <Link href="/account/downloads" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
             View All <ArrowRight size={14} />
          </Link>
        </div>

        {purchased.length > 0 ? (
          <div className="space-y-4">
            {purchased.slice(0, 3).map((course: any) => (
              <div key={course.id} className="flex items-center justify-between p-5 bg-muted/20 rounded-2xl border border-border">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-8 rounded bg-muted overflow-hidden relative">
                      {/* Course thumb placeholder */}
                   </div>
                   <div className="font-bold text-sm truncate max-w-[200px] md:max-w-md">{course.title}</div>
                </div>
                <Link href={`/api/download/${course.id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                   <Clock size={18} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground bg-muted/10 rounded-3xl border-dashed border border-border">
             No recent activity. Unlock your first course today!
          </div>
        )}
      </section>
    </div>
  );
}

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Download, ExternalLink, Box, ArrowRight } from 'lucide-react';
import { 
  hasLifetimeAccess, 
  getUserPurchasedCoursesWithLinks, 
  getAllCoursesWithLinks 
} from '@/lib/access-control';
import Link from 'next/link';

export default async function DownloadsPage() {
  const supabase = await createClient();

  // 1. Get current authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?callbackUrl=/account/downloads');
  }

  // 2. Check access level
  const isLifetimeMember = await hasLifetimeAccess(supabase, user.id);
  
  // 3. Fetch courses based on access
  let courses = [];
  if (isLifetimeMember) {
    courses = await getAllCoursesWithLinks(supabase);
  } else {
    courses = await getUserPurchasedCoursesWithLinks(supabase, user.id);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">My Downloads</h1>
        <p className="text-muted-foreground">
          {isLifetimeMember 
            ? "Lifetime Access Active — All courses unlocked." 
            : "Access your purchased courses and materials below."}
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <div key={course.id} className="glass-card rounded-2xl overflow-hidden flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={course.thumbnail1}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded">
                   {course.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-4 line-clamp-2 leading-snug">
                  {course.title}
                </h3>
                
                <div className="mt-auto space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Download Links
                  </div>
                  {course.course_links && course.course_links.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {course.course_links.map((link: any) => (
                        <a
                          key={link.id}
                          href={`/api/download/${course.id}?linkId=${link.id}`}
                          className="flex items-center justify-between gap-3 bg-muted hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <Download size={16} />
                            <span className="text-sm font-semibold">
                              {link.platform || 'Download Link'}
                            </span>
                          </div>
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      Links are being updated. Check back soon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 glass rounded-[3rem] border-dashed">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Box className="text-muted-foreground" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">No courses yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Start your journey today. Browse our selection of premium courses and unlock elite knowledge.
          </p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            Explore Shop
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}

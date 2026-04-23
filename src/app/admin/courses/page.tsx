import { supabaseAdmin } from '@/lib/supabase-admin';
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminCourses() {
  const { data: courses } = await supabaseAdmin
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Course Management</h1>
          <p className="text-muted-foreground">Add, edit, or remove courses from the marketplace.</p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add New Course
        </Link>

      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or category..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Total Courses: <span className="text-foreground">{courses?.length || 0}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <th className="px-8 py-4">Thumbnail</th>
                <th className="px-8 py-4">Title</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses?.map((course) => (
                <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-border">
                      <Image 
                        src={course.thumbnail1} 
                        alt={course.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="text-sm font-bold truncate max-w-[200px]">{course.title}</div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black">{formatCurrency(course.sale_price)}</span>
                      <span className="text-[10px] text-muted-foreground line-through">{formatCurrency(course.original_price)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                     <span className={`w-2 h-2 rounded-full inline-block mr-2 ${course.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                     <span className="text-[10px] font-black uppercase tracking-widest">
                       {course.is_active ? 'Active' : 'Inactive'}
                     </span>
                  </td>
                  <td className="px-8 py-4 text-right space-x-2">
                    <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {(!courses || courses.length === 0) && (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center text-muted-foreground italic">No courses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

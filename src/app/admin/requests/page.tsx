import { supabaseAdmin } from '@/lib/supabase-admin';
import { Search, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react';

const STATUS_ICONS: any = {
  'pending': { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  'in-progress': { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'fulfilled': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  'rejected': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
};

export default async function AdminRequests() {
  const { data: requests } = await supabaseAdmin
    .from('course_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Course Requests</h1>
        <p className="text-muted-foreground">Manage user requests for new courses and content.</p>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by course or email..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
          <select className="bg-muted text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl outline-none border-none focus:ring-2 focus:ring-primary">
             <option>All Status</option>
             <option>Pending</option>
             <option>In Progress</option>
             <option>Fulfilled</option>
             <option>Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <th className="px-8 py-4">Course Details</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Requested By</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests?.map((request) => (
                <tr key={request.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold">{request.course_name}</span>
                       <span className="text-xs text-muted-foreground">{request.instructor_name || 'Unknown Instructor'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-border">
                      {request.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-semibold">{request.email}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${STATUS_ICONS[request.status]?.bg} ${STATUS_ICONS[request.status]?.color}`}>
                          {request.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">
                    {new Date(request.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                       Update
                    </button>
                  </td>
                </tr>
              ))}
              {(!requests || requests.length === 0) && (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center text-muted-foreground italic">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

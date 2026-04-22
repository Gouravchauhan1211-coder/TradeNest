import { supabaseAdmin } from '@/lib/supabase-admin';
import { Search, Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const STATUS_COLORS: any = {
  'open': 'bg-red-500/10 text-red-600 border-red-500/10',
  'in-progress': 'bg-blue-500/10 text-blue-600 border-blue-500/10',
  'resolved': 'bg-green-500/10 text-green-600 border-green-500/10',
};

export default async function AdminTickets() {
  const { data: tickets } = await supabaseAdmin
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Support Tickets</h1>
        <p className="text-muted-foreground">Manage customer inquiries and technical support requests.</p>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by email or subject..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
          <select className="bg-muted text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl outline-none border-none focus:ring-2 focus:ring-primary">
             <option>All Tickets</option>
             <option>Open</option>
             <option>In Progress</option>
             <option>Resolved</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <th className="px-8 py-4">Subject & Email</th>
                <th className="px-8 py-4">Message Preview</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets?.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold">{ticket.subject}</span>
                       <span className="text-xs text-muted-foreground">{ticket.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs text-muted-foreground truncate max-w-[250px]">{ticket.message}</p>
                  </td>
                  <td className="px-8 py-5">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${STATUS_COLORS[ticket.status]}`}>
                        {ticket.status}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                       View & Reply
                    </button>
                  </td>
                </tr>
              ))}
              {(!tickets || tickets.length === 0) && (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">No support tickets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

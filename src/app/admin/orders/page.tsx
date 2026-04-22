import { supabaseAdmin } from '@/lib/supabase-admin';
import { Search, Filter, Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default async function AdminOrders() {
  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('*, profiles(email)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Order Management</h1>
        <p className="text-muted-foreground">Track all transactions and customer purchases.</p>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by user email..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-muted text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl outline-none border-none focus:ring-2 focus:ring-primary">
               <option>All Status</option>
               <option>Completed</option>
               <option>Pending</option>
               <option>Refunded</option>
            </select>
            <button className="btn-secondary py-2 px-4 flex items-center gap-2 text-sm">
               <Download size={18} />
               Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">User Email</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5 text-[10px] font-mono text-muted-foreground">#{order.id.slice(0,8)}</td>
                  <td className="px-8 py-5 text-sm font-semibold">{order.profiles?.email}</td>
                  <td className="px-8 py-5 text-sm font-bold">{formatCurrency(order.total_amount)}</td>
                  <td className="px-8 py-5">
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/10">
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

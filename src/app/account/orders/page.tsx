import { createClient } from '@/lib/supabase-server';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default async function AccountOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(courses(title))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Order History</h1>
        <p className="text-muted-foreground">Keep track of your purchases and invoices.</p>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <th className="px-8 py-4 rounded-tl-2xl">Order ID</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Amount</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 rounded-tr-2xl text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white/40">
            {orders?.map((order) => (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-8 py-6 text-[10px] font-mono text-muted-foreground">#{order.id.slice(0,8)}</td>
                <td className="px-8 py-6 text-sm font-semibold">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-8 py-6 text-sm font-bold">{formatCurrency(order.total_amount)}</td>
                <td className="px-8 py-6">
                  <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {order.payment_status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-all">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">
                  You haven&apos;t placed any orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

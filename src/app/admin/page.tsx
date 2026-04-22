import { supabaseAdmin } from '@/lib/supabase-admin';
import { ShoppingBag, Users, DollarSign, BookOpen } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default async function AdminOverview() {
  // Fetch stats server-side
  const [
    { count: totalCourses },
    { count: totalUsers },
    { data: ordersData },
  ] = await Promise.all([
    supabaseAdmin.from('courses').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('*, profiles(email)').order('created_at', { ascending: false }).limit(5)
  ]);

  const totalRevenue = ordersData?.reduce((acc, order) => acc + (order.total_amount || 0), 0) || 0;
  const totalOrders = ordersData?.length || 0;

  const stats = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Courses', value: totalCourses || 0, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Registered Users', value: totalUsers || 0, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-8 rounded-3xl space-y-4">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              <div className="text-3xl font-black">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-tight">Recent Orders</h2>
          <button className="text-primary text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <th className="px-8 py-4">User Email</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ordersData?.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5 text-sm font-semibold">{order.profiles?.email}</td>
                  <td className="px-8 py-5 text-sm font-bold">{formatCurrency(order.total_amount)}</td>
                  <td className="px-8 py-5">
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!ordersData || ordersData.length === 0) && (
                <tr>
                   <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground italic">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

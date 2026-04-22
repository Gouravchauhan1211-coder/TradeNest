import { supabaseAdmin } from '@/lib/supabase-admin';
import { Search, Shield, User, Star } from 'lucide-react';

export default async function AdminUsers() {
  const { data: users } = await supabaseAdmin
    .from('profiles')
    .select(`
      *,
      orders (count)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user roles, access levels, and account statuses.</p>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by email or name..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Total Users: <span className="text-foreground">{users?.length || 0}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Join Date</th>
                <th className="px-8 py-4">Orders</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Membership</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {user.email?.[0].toUpperCase()}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-sm font-semibold">{user.full_name || 'No Name'}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-center">
                    {user.orders?.[0]?.count || 0}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      user.role === 'admin' 
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/10' 
                        : 'bg-muted text-muted-foreground border-border'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    {user.has_lifetime_access ? (
                      <span className="bg-purple-500/10 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit border border-purple-500/10">
                        <Star size={10} fill="currentColor" />
                        Lifetime
                      </span>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Standard</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                       Manage
                    </button>
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center text-muted-foreground italic">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

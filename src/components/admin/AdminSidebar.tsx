'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Courses', href: '/admin/courses', icon: BookOpen },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Requests', href: '/admin/requests', icon: MessageSquare },
  { label: 'Tickets', href: '/admin/tickets', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass border-r border-border h-screen sticky top-0 flex flex-col p-6">
      <div className="mb-10 px-2">
        <Link href="/" className="flex items-center gap-2">
           <span className="text-xl font-bold tracking-tighter gradient-text uppercase">TradeNest Admin</span>
        </Link>
      </div>

      <nav className="flex-grow space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-border space-y-2">
        <Link 
          href="/account"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <Settings size={20} />
          <span className="font-semibold text-sm">Account</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all">
          <LogOut size={20} />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Download, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
  { label: 'Orders', href: '/account/orders', icon: ShoppingBag },
  { label: 'Downloads', href: '/account/downloads', icon: Download },
  { label: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="space-y-2 sticky top-28">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between gap-3 px-6 py-4 rounded-2xl transition-all group",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </Link>
              );
            })}
            <div className="pt-6 mt-6 border-t border-border">
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-destructive hover:bg-destructive/10 transition-all">
                <LogOut size={20} />
                <span className="font-bold text-sm tracking-tight">Sign Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-grow">
          <div className="glass p-10 rounded-[3rem] shadow-2xl shadow-primary/5 min-h-[600px]">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}

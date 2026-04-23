'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, LogOut, LayoutDashboard, Download, Trophy } from 'lucide-react';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { createClient } from '@/lib/supabase-browser';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient();



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const cartItems = useCartStore(state => state.items);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(profile?.role || 'user');
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single();
        setRole(profile?.role || 'user');
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
    setRole(null);
    router.push('/');
    router.refresh();
  };


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tighter gradient-text">TradeNest</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/membership" className="hover:text-primary transition-colors">Membership</Link>
              <Link href="/requests" className="hover:text-primary transition-colors">Requests</Link>
              <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              <Link href="/contact-us" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/shop" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Search size={20} />
            </Link>

            <Link href="/cart" className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 pl-3 pr-4 py-2 bg-muted rounded-xl hover:bg-primary/5 hover:border-primary/20 border border-border transition-all text-sm font-bold"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 glass rounded-2xl shadow-2xl border border-border p-2 z-50">
                    {role === 'admin' && (
                      <Link href="/admin" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold transition-colors mb-1">
                        <Trophy size={16} /> Admin Panel
                      </Link>
                    )}
                    <Link href="/account" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-semibold transition-colors">
                      <LayoutDashboard size={16} /> My Account
                    </Link>

                    <Link href="/account/downloads" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-semibold transition-colors">
                      <Download size={16} /> Downloads
                    </Link>
                    <div className="border-t border-border my-1" />
                    <button onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive text-sm font-semibold transition-colors">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary py-2 px-5 text-sm">Sign In</Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="p-2 text-muted-foreground relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-muted-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden glass border-t border-border overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[500px]" : "max-h-0"
      )}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {[
            { label: 'Shop', href: '/shop' },
            { label: 'Membership', href: '/membership' },
            { label: 'Request Course', href: '/requests' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact-us' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              {label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border space-y-2">
            {user ? (
              <>
                {role === 'admin' && (
                  <Link href="/admin" onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-black text-primary bg-primary/5 mb-2">
                    Admin Panel
                  </Link>
                )}
                <Link href="/account" onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-bold text-primary">
                  My Account
                </Link>

                <button onClick={() => { handleSignOut(); setIsOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-destructive">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-bold text-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

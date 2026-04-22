'use client';

import { useCartStore } from '@/lib/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = '/login?callbackUrl=/cart';
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userId: session.user.id,
          userEmail: session.user.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        setError(data.error || 'Checkout failed. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingCart className="text-muted-foreground" size={40} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-10 text-lg">Add some elite courses to get started.</p>
        <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
          Browse Courses <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black tracking-tight uppercase mb-12">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="glass p-6 rounded-3xl flex items-center gap-6">
              <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={item.thumbnail1} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.category}</span>
                <h3 className="font-bold truncate mt-0.5">{item.title}</h3>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-xl font-black">{formatCurrency(item.salePrice)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl space-y-6 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-tight">Order Summary</h2>

            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-4">{item.title.slice(0, 30)}...</span>
                  <span className="font-bold flex-shrink-0">{formatCurrency(item.salePrice)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="text-lg font-black uppercase">Total</span>
              <span className="text-2xl font-black text-primary">{formatCurrency(total())}</span>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full btn-primary py-5 text-base flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <Lock size={18} />
              {loading ? 'Redirecting to Checkout...' : 'Secure Checkout'}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
              <ShieldCheck size={14} />
              128-bit SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

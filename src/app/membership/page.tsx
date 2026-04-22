import { CheckCircle2, Zap, Star, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-black tracking-tighter mb-6 uppercase">
          LIFETIME <span className="gradient-text">FREEDOM</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          One payment. Permanent access. Get every course currently on our site, plus all future additions, forever.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Features */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Why Go Lifetime?</h2>
            <div className="space-y-4">
              {[
                'Access to 500+ Premium Courses',
                'Priority Request System (99% fulfillment)',
                'Instant Access to All Future Uploads',
                'High-Speed Google Drive & Mega Links',
                'Private Telegram Community Access',
                'Dedicated 24/7 VIP Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <CheckCircle2 size={18} className="text-primary" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-3xl text-center">
              <Star className="mx-auto mb-2 text-accent" fill="currentColor" size={24} />
              <div className="text-2xl font-black">2,400+</div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground">Members</div>
            </div>
            <div className="glass p-6 rounded-3xl text-center">
              <Zap className="mx-auto mb-2 text-primary" fill="currentColor" size={24} />
              <div className="text-2xl font-black">20TB+</div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground">Content</div>
            </div>
          </div>
        </div>

        {/* Right: Pricing Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative glass p-12 rounded-[3rem] border-primary/20 shadow-2xl">
            <div className="inline-block bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
              Most Popular Plan
            </div>
            <h3 className="text-4xl font-black mb-2 uppercase">LIFETIME ACCESS</h3>
            <p className="text-muted-foreground mb-8">Save over $50,000 in course fees.</p>
            
            <div className="flex items-end gap-3 mb-10">
              <span className="text-6xl font-black tracking-tighter text-foreground">$149</span>
              <span className="text-2xl text-muted-foreground line-through mb-2">$2,500</span>
            </div>

            <button className="w-full btn-primary py-5 text-lg shadow-primary/40 mb-6">
              Unlock Everything Now
            </button>
            
            <div className="flex items-center justify-center gap-6 opacity-60">
              <Shield size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

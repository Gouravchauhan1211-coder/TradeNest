import { CheckCircle2, Zap, Star, Shield, ArrowRight, Sparkles, Trophy, Crown } from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="relative text-center max-w-3xl mx-auto mb-24">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-8 border border-primary/20">
          <Sparkles size={14} className="fill-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest">Join the Top 1%</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
          THE LAST <br />
          <span className="gradient-text">TRADING PASS</span> <br />
          YOU&apos;LL EVER NEED
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Stop paying thousands for individual courses. Get **instant, permanent access** to our entire library and every future update for one single, life-changing investment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Features */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Trophy className="text-primary" size={32} />
              VIP BENEFITS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Full Library Access', desc: 'Every course on the platform, unlocked instantly.', icon: Shield },
                { title: 'Priority Requests', desc: 'Request any course and we sourcing it within 48h.', icon: Zap },
                { title: 'Future Proof', desc: 'All new courses added weekly are included for free.', icon: Sparkles },
                { title: 'VIP Community', desc: 'Direct access to our private Discord & Telegram.', icon: Star },
                { title: 'High-Speed Links', desc: 'Premium servers for lightning-fast downloads.', icon: Download },
                { title: 'Dedicated Support', desc: '24/7 priority assistance for all members.', icon: CheckCircle2 }
              ].map((feature, i) => (
                <div key={i} className="glass p-6 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all group">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Crown size={120} />
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 uppercase">Trusted by Thousands</h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-md">
                  Join a community of **2,400+ serious traders** who have saved a collective **$12 million** using TradeNest.
                </p>
                <div className="flex gap-12">
                   <div>
                      <div className="text-3xl font-black mb-1">$12M+</div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Saved by users</div>
                   </div>
                   <div>
                      <div className="text-3xl font-black mb-1">500+</div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Courses live</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Pricing Card */}
        <div className="lg:sticky top-24">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass p-12 md:p-16 rounded-[3rem] border-white/20 shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div className="inline-block bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                  Limited Spots Available
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Single Payment</span>
                </div>
              </div>

              <h3 className="text-5xl font-black mb-4 uppercase tracking-tighter">LIFETIME PASS</h3>
              <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                Unlock generational wealth-building knowledge for the price of a dinner out.
              </p>
              
              <div className="flex items-end gap-4 mb-12">
                <span className="text-7xl font-black tracking-tighter text-foreground">$149</span>
                <div className="flex flex-col mb-2">
                   <span className="text-2xl text-muted-foreground line-through opacity-40 font-bold">$2,500</span>
                   <span className="text-xs font-black text-green-500 uppercase tracking-widest">You save 94%</span>
                </div>
              </div>

              <Link href="/cart?addMembership=true" className="w-full btn-primary py-6 text-xl shadow-primary/40 mb-8 flex items-center justify-center gap-3">
                <Crown size={24} className="fill-white" />
                Claim Your Membership
              </Link>
              
              <div className="space-y-4">
                 {[
                   'One-time payment. Never pay again.',
                   'Instant access to all current content.',
                   'All future courses included automatically.',
                   'Secure checkout with Stripe / Razorpay.'
                 ].map((text, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                     <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                     {text}
                   </div>
                 ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border flex items-center justify-center gap-8 opacity-50">
                 <Shield size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Secure 128-bit SSL Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { Star, Shield, Download, Zap, ShoppingCart, ArrowLeft, CheckCircle2, Lock, PlayCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { useCartStore } from '@/lib/cart-store';

export default function ProductContent({ product, relatedCourses }: { product: any, relatedCourses: any[] }) {
  const { addItem, isInCart } = useCartStore();
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      salePrice: product.salePrice,
      originalPrice: product.originalPrice,
      thumbnail1: product.thumbnail1,
      category: product.category
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left: Images */}
        <div className="space-y-6">
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5">
            <Image
              src={product.thumbnail1}
              alt={product.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
               <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                 {product.category}
               </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-card">
               <Image src={product.thumbnail2 || product.thumbnail1} alt="Preview" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity cursor-zoom-in" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={40} className="text-white/80" />
               </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-card bg-muted flex flex-col items-center justify-center gap-2 border-dashed border-2 border-border hover:border-primary/30 transition-colors cursor-pointer">
               <FileText size={24} className="text-muted-foreground" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center px-4">Download Sample Curriculum (PDF)</span>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-accent bg-accent/10 px-3 py-1 rounded-full">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground text-sm font-medium">128 Verified Purchases</span>
            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
               <Shield size={14} /> In Stock
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-[1.1]">
            {product.title}
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
            {product.description || "Master the elite concepts used by top-tier professionals. This course provides comprehensive knowledge, practical strategies, and real-world examples to help you succeed in the market."}
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
            {[
              { label: 'Instant Download Access', icon: Zap },
              { label: 'Full Lifetime Access', icon: Shield },
              { label: 'No Ads or Viruses', icon: Lock },
              { label: 'Permanent Support', icon: Download },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon size={16} />
                </div>
                <span className="text-sm font-bold">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
               <div className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Limited Offer</div>
            </div>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-black text-foreground">{formatCurrency(product.salePrice)}</span>
              <span className="text-2xl text-muted-foreground line-through mb-1 opacity-50">{formatCurrency(product.originalPrice)}</span>
              <div className="flex flex-col mb-1">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter">
                  SAVE {Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/cart" onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2 py-4">
                <Zap size={20} className="fill-white" />
                Buy Now
              </Link>
              <button 
                onClick={handleAddToCart}
                disabled={inCart}
                className={`flex-1 btn-secondary flex items-center justify-center gap-2 py-4 ${inCart ? 'opacity-60 cursor-default' : ''}`}
              >
                {inCart ? (
                  <>
                    <CheckCircle2 size={20} className="text-green-500" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-40">
               <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={20} />
               <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={30} height={20} />
               <div className="text-[10px] font-black uppercase tracking-widest border border-border px-2 py-1 rounded">SSL Secure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum / Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
              <div className="w-1.5 h-8 bg-primary rounded-full"></div>
              Course Curriculum
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Module 1: Introduction to Advanced Concepts', duration: '2h 15m' },
                { title: 'Module 2: Identifying High Probability Zones', duration: '3h 45m' },
                { title: 'Module 3: Risk Management and Psychology', duration: '1h 30m' },
                { title: 'Module 4: Live Case Studies & Backtesting', duration: '5h 20m' },
                { title: 'Bonus: Exclusive Indicators & Templates', duration: 'Resources' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-muted/50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-muted transition-all cursor-default group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <span className="font-bold text-muted-foreground group-hover:text-foreground transition-colors">{item.title}</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.duration}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
               <div className="w-1.5 h-8 bg-primary rounded-full"></div>
               What You&apos;ll Learn
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Develop a professional trading mindset',
                  'Identify institutional liquidity sweeps',
                  'Master multi-timeframe analysis',
                  'Implement strict risk management models',
                  'Access private community templates',
                  'Understand real-world case studies'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 glass rounded-2xl">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <aside className="space-y-8">
           <div className="glass p-8 rounded-[2rem] border-primary/10">
              <h3 className="text-xl font-black mb-4 uppercase">Lifetime Membership</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Get access to this course and **500+ other premium courses** forever with our Lifetime Membership.
              </p>
              <Link href="/membership" className="btn-primary w-full text-center py-3 block text-sm">
                Upgrade Now for $99
              </Link>
           </div>
           
           <div className="bg-black text-white p-8 rounded-[2rem] relative overflow-hidden">
              <Zap size={40} className="absolute -top-4 -right-4 text-white/10 rotate-12" />
              <h3 className="text-xl font-black mb-4 uppercase">Support</h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                Have questions about this course? Our team is available 24/7 to help you with download links or technical issues.
              </p>
              <Link href="/contact-us" className="text-sm font-bold underline hover:text-primary transition-colors">
                Contact Sourcing Team
              </Link>
           </div>
        </aside>
      </div>

      {/* Related Products */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight">You May Also Like</h2>
          <Link href="/shop" className="text-primary text-sm font-bold hover:underline uppercase tracking-widest">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedCourses.map((course) => (
            <ProductCard key={course.id} {...course} />
          ))}
          {relatedCourses.length === 0 && (
            <p className="text-muted-foreground italic col-span-full py-12 glass rounded-3xl text-center">No related courses found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

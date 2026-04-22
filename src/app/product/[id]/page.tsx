'use client';

import { use } from 'react';
import Image from 'next/image';
import { Star, Shield, Download, Zap, ShoppingCart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

const DUMMY_COURSES = [
  {
    id: '1',
    title: 'Advanced SMC Trading Course - Institutional Concepts',
    category: 'Smart Money',
    originalPrice: 499,
    salePrice: 19.99,
    discount: 96,
    description: 'Master the concepts used by institutional traders. This course covers order blocks, liquidity, market structure, and high-probability entry models. Includes 20+ hours of video content, trading plan templates, and case studies.',
    thumbnail1: 'https://images.unsplash.com/photo-1611974717482-480ce9745841?q=80&w=800&auto=format&fit=crop',
    thumbnail2: 'https://images.unsplash.com/photo-1642388691919-63e803000b9a?q=80&w=800&auto=format&fit=crop',
    rating: 5.0
  },
  // ... more related courses
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = DUMMY_COURSES.find(p => p.id === id) || DUMMY_COURSES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card">
            <Image
              src={product.thumbnail1}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
               <Image src={product.thumbnail2} alt="Preview" fill className="object-cover" />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden glass-card bg-muted flex items-center justify-center">
               <span className="text-xs font-bold text-muted-foreground">+3 more previews</span>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-accent">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold">{product.rating.toFixed(1)} (128 reviews)</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            {product.title}
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            {['Instant Download Access', 'Full Lifetime Access', 'Google Drive / Mega Links', 'No Ads or Viruses'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-500" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="glass p-8 rounded-[2rem] space-y-6">
            <div className="flex items-end gap-4">
              <span className="text-4xl font-black text-foreground">{formatCurrency(product.salePrice)}</span>
              <span className="text-xl text-muted-foreground line-through mb-1">{formatCurrency(product.originalPrice)}</span>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                -{product.discount}% OFF
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="btn-primary flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Buy Now
              </button>
              <button className="btn-secondary">
                Add to Cart
              </button>
            </div>
            
            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Secure Checkout via Stripe & Razorpay
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUMMY_COURSES.slice(0, 4).map((course) => (
            <ProductCard key={course.id} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}

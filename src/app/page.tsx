import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Download, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const DUMMY_COURSES = [
  {
    id: '1',
    title: 'Advanced SMC Trading Course - Institutional Concepts',
    category: 'Smart Money',
    originalPrice: 499,
    salePrice: 19.99,
    discount: 96,
    thumbnail1: 'https://images.unsplash.com/photo-1611974717482-480ce9745841?q=80&w=800&auto=format&fit=crop',
    thumbnail2: 'https://images.unsplash.com/photo-1642388691919-63e803000b9a?q=80&w=800&auto=format&fit=crop',
    rating: 5.0
  },
  {
    id: '2',
    title: 'Forex Masterclass: From Zero to Pro Trader',
    category: 'Forex',
    originalPrice: 999,
    salePrice: 29.99,
    discount: 97,
    thumbnail1: 'https://images.unsplash.com/photo-1611974717482-480ce9745841?q=80&w=800&auto=format&fit=crop',
    thumbnail2: 'https://images.unsplash.com/photo-1640341719942-0f044949826c?q=80&w=800&auto=format&fit=crop',
    rating: 4.9
  },
  {
    id: '3',
    title: 'The Ultimate ICT Mentorship 2024 Core Content',
    category: 'Hot',
    originalPrice: 2500,
    salePrice: 49.99,
    discount: 98,
    thumbnail1: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop',
    thumbnail2: 'https://images.unsplash.com/photo-1611974717482-480ce9745841?q=80&w=800&auto=format&fit=crop',
    rating: 5.0
  },
  {
    id: '4',
    title: 'Business Scalability: Systematize Your Agency',
    category: 'Business',
    originalPrice: 1500,
    salePrice: 39.99,
    discount: 97,
    thumbnail1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    thumbnail2: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop',
    rating: 4.8
  }
];

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8 border-border animate-bounce">
            <Zap size={14} className="text-primary fill-primary" />
            <span className="text-xs font-bold uppercase tracking-wider">Flash Sale: Up to 99% Off</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            UNLOCK <br />
            <span className="gradient-text">ELITE KNOWLEDGE</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12 leading-relaxed">
            TradeNest provides premium trading and business courses originally priced at thousands of dollars for a fraction of the cost. Instant access. No subscriptions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="btn-primary flex items-center gap-2 group">
              Browse All Courses
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/membership" className="btn-secondary">
              Lifetime Membership
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">20TB+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Content</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">15k+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Students</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">500+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Courses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Instant Download', icon: Download },
            { label: 'No Viruses / Ads', icon: Shield },
            { label: 'Permanent Links', icon: Zap },
            { label: 'Rated 5.0/5.0', icon: Star },
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl flex flex-col items-center text-center gap-3">
              <stat.icon className="text-primary" size={24} />
              <span className="text-sm font-semibold uppercase tracking-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">LATEST ARRIVALS</h2>
            <p className="text-muted-foreground">The most recently sourced premium content.</p>
          </div>
          <Link href="/shop" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUMMY_COURSES.map((course) => (
            <ProductCard key={course.id} {...course} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden glass rounded-[2rem] p-12 md:p-20 text-center">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              CAN&apos;T FIND A SPECIFIC COURSE?
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-10">
              Our sourcing team has a 99% fulfillment rate. Request any trading or business course and we&apos;ll find it for you at a massive discount.
            </p>
            <Link href="/requests" className="btn-primary inline-flex">
              Request a Course Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

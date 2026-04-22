'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Forex', 'Trading', 'Business', 'Smart Money', 'Hot'];

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
  },
  {
    id: '5',
    title: 'Crypto Trading Pro: Master the Bull Market',
    category: 'Trading',
    originalPrice: 799,
    salePrice: 24.99,
    discount: 97,
    thumbnail1: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop',
    thumbnail2: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop',
    rating: 4.7
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = DUMMY_COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Explore Courses</h1>
          <p className="text-muted-foreground">Find the best premium resources at unbeatable prices.</p>
        </div>

        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4 uppercase tracking-widest text-xs">
              <Filter size={16} />
              <span>Categories</span>
            </div>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-white/5">
            <div className="flex items-center gap-2 font-bold mb-4 uppercase tracking-widest text-xs">
              <SlidersHorizontal size={16} />
              <span>Sort By</span>
            </div>
            <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none">
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <ProductCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted rounded-3xl">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

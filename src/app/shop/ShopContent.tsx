'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Forex', 'Trading', 'Business', 'Smart Money', 'Hot'];

export default function ShopContent({ initialCourses }: { initialCourses: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest Arrivals');

  const filteredCourses = initialCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Basic sorting
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.salePrice - b.salePrice;
    if (sortBy === 'Price: High to Low') return b.salePrice - a.salePrice;
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {sortedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedCourses.map((course) => (
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

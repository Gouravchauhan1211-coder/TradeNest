'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

export default function NewCourse() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Trading',
    original_price: '',
    sale_price: '',
    thumbnail1: '',
    thumbnail2: '',
    is_active: true,
    is_featured: false,
    is_bestseller: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('courses').insert({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        original_price: parseFloat(formData.original_price),
        sale_price: parseFloat(formData.sale_price),
        thumbnail1: formData.thumbnail1,
        thumbnail2: formData.thumbnail2 || null,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        is_bestseller: formData.is_bestseller,
      });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => router.push('/admin/courses'), 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the course.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/admin/courses" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">
          <ArrowLeft size={16} />
          Back to List
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">Add New Course</h1>
          <p className="text-muted-foreground">Fill in the details to publish a new course to the marketplace.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-2xl flex items-center gap-3 border border-destructive/20 animate-shake">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 text-green-500 p-4 rounded-2xl flex items-center gap-3 border border-green-500/20">
            <CheckCircle2 size={20} />
            <span className="text-sm font-bold">Course added successfully! Redirecting...</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Course Title</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. ICT Mentorship 2024 Core Content"
                  className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Description</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell students what they will learn..."
                  className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1">Original Price ($)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleChange}
                    placeholder="2500"
                    className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1">Sale Price ($)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="sale_price"
                    value={formData.sale_price}
                    onChange={handleChange}
                    placeholder="25"
                    className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Upload size={16} /> Thumbnails
              </h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Primary Image URL</label>
                <input
                  required
                  name="thumbnail1"
                  value={formData.thumbnail1}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Hover Image URL (Optional)</label>
                <input
                  name="thumbnail2"
                  value={formData.thumbnail2}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold"
                >
                  <option value="Forex">Forex</option>
                  <option value="Trading">Trading</option>
                  <option value="Business">Business</option>
                  <option value="Smart Money">Smart Money</option>
                  <option value="Hot">Hot</option>
                </select>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold">Course Active</label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold">Featured Course</label>
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold">Bestseller</label>
                  <input
                    type="checkbox"
                    name="is_bestseller"
                    checked={formData.is_bestseller}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-6 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Publish Course'}
            </button>
            
            <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
               <div className="flex items-center gap-2 text-primary mb-2">
                  <Zap size={14} className="fill-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Admin Tip</span>
               </div>
               <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Use high-quality image URLs from Unsplash or our CDN for the best visual appeal.
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

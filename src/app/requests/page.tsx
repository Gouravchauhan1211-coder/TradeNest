'use client';

import { useState } from 'react';
import { Send, CheckCircle, Info } from 'lucide-react';

const CATEGORIES = ['Forex', 'Trading', 'Business', 'Smart Money', 'Other'];

export default function RequestCoursePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic will be wired to a Server Action
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
           <CheckCircle className="text-green-500" size={40} />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 uppercase">Request Received!</h1>
        <p className="text-xl text-muted-foreground mb-10">
          We fulfill 99% of requests. We&apos;ll notify you via email as soon as the course is available on TradeNest.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">Request a <span className="gradient-text">Course</span></h1>
        <p className="text-xl text-muted-foreground">
          Can&apos;t find what you&apos;re looking for? Tell us, and we&apos;ll get it for you.
        </p>
      </div>

      <div className="glass p-10 rounded-[3rem] shadow-2xl shadow-primary/5">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1">Course Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. Advanced Institutional Trading Mentorship"
              className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1">Instructor Name</label>
            <input
              type="text"
              placeholder="e.g. Inner Circle Trader"
              className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1">Category</label>
            <select className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1">Original URL (Optional)</label>
            <input
              type="url"
              placeholder="https://example.com/course-page"
              className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1">Your Email Address *</label>
            <input
              required
              type="email"
              placeholder="name@example.com"
              className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1">Additional Notes</label>
            <textarea
              rows={4}
              placeholder="Tell us more about why you want this course..."
              className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            />
          </div>

          <div className="md:col-span-2">
             <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-8">
                <Info size={20} className="text-primary flex-shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  Most requests are fulfilled within 48-72 hours. You will receive an email once the course is listed.
                </p>
             </div>
             <button type="submit" className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3">
                Submit Request
                <Send size={20} />
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

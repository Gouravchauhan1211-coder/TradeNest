'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle, Globe } from 'lucide-react';

const SUBJECTS = [
  'General Inquiry',
  'Order Issue',
  'Download Problem',
  'Course Request',
  'Other'
];

export default function ContactUsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
           <CheckCircle className="text-green-500" size={40} />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 uppercase">Message Sent!</h1>
        <p className="text-xl text-muted-foreground mb-10">
          Our support team has received your inquiry. We typically respond within 2-4 hours.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">Contact <span className="gradient-text">Support</span></h1>
        <p className="text-xl text-muted-foreground">We&apos;re here to help you unlock your potential.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl space-y-6 border-primary/5 transition-all hover:border-primary/20">
            <h2 className="text-xl font-bold uppercase tracking-tight">Direct Support</h2>
            
            <div className="space-y-4">
              <a href="https://wa.me/15185435529" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground">WhatsApp</div>
                  <div className="font-bold">+1 (518) 543-5529</div>
                </div>
              </a>

              <a href="https://t.me/Tradesmint_Sup" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground">Telegram Support</div>
                  <div className="font-bold">@Tradesmint_Sup</div>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground">Email Address</div>
                  <div className="font-bold">support@tradenest.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border-secondary/5">
             <h3 className="font-bold mb-2 uppercase tracking-tight">Business Hours</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Mon - Fri: 24 Hours<br />
               Sat - Sun: 10:00 AM - 6:00 PM EST
             </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass p-10 rounded-[3rem] shadow-2xl shadow-primary/5">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all appearance-none font-medium">
                  {SUBJECTS.map(sub => <option key={sub}>{sub}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 bg-muted rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3">
                 Send Message
                 <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

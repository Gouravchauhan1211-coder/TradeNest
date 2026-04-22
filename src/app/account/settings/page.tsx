'use client';

import { useState } from 'react';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';

export default function AccountSettings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile details and security settings.</p>
      </div>

      <div className="space-y-10">
        {/* Profile Section */}
        <section className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <User size={16} /> Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-4 bg-muted/40 rounded-2xl border border-border focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Email Address</label>
              <input
                disabled
                type="email"
                placeholder="email@example.com"
                className="w-full px-5 py-4 bg-muted/20 rounded-2xl border border-border text-muted-foreground text-sm font-semibold cursor-not-allowed"
              />
            </div>
          </div>
          <button className="btn-primary py-3 px-8 text-sm">Save Changes</button>
        </section>

        <hr className="border-border" />

        {/* Security Section */}
        <section className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <ShieldCheck size={16} /> Security & Password
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            We recommend using a strong password that you don&apos;t use anywhere else.
          </p>
          <div className="space-y-4">
             <button className="btn-secondary py-3 px-8 text-sm">Reset Password via Email</button>
          </div>
        </section>
      </div>
    </div>
  );
}

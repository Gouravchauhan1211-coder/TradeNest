import { Suspense } from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="relative inline-block mb-10">
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative w-28 h-28 bg-green-500/10 border-4 border-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="text-green-500" size={56} />
        </div>
      </div>

      <h1 className="text-5xl font-black uppercase tracking-tight mb-4">
        Payment <span className="gradient-text">Successful!</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
        Your order has been confirmed. Your courses are now available in your downloads section.
      </p>
      <p className="text-sm text-muted-foreground mb-12">
        A confirmation email has been sent to your inbox.
      </p>

      <div className="glass p-8 rounded-3xl mb-10 text-left space-y-4">
        <h2 className="font-bold uppercase tracking-tight text-sm text-muted-foreground">What Happens Next?</h2>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs flex-shrink-0">1</div>
          <span className="text-sm font-medium">Your order is being processed automatically</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs flex-shrink-0">2</div>
          <span className="text-sm font-medium">Download links are now active in My Account</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs flex-shrink-0">3</div>
          <span className="text-sm font-medium">Links never expire — access anytime, forever</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/account/downloads" className="btn-primary flex items-center gap-2">
          <Download size={18} />
          Go to Downloads
        </Link>
        <Link href="/shop" className="btn-secondary flex items-center gap-2">
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}

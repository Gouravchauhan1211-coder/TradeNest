import { Search, ShoppingCart, LayoutDashboard, Download, HardDrive, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    title: "Browse & Find",
    description: "Explore our catalog of 500+ premium courses across Forex, Trading, and Business categories. Use the search bar to find specific instructors or topics.",
    icon: Search
  },
  {
    title: "Checkout Securely",
    description: "Add your desired courses to the cart and complete your purchase using our 128-bit SSL secured checkout via Stripe or Razorpay.",
    icon: ShoppingCart
  },
  {
    title: "Go to Dashboard",
    description: "Once your payment is successful, head over to 'My Account' then click on the 'Downloads' section in your dashboard.",
    icon: LayoutDashboard
  },
  {
    title: "Click Download",
    description: "You'll see your purchased courses listed. Click the download button next to each course to access the secure links.",
    icon: Download
  },
  {
    title: "Access Files",
    description: "Our courses are hosted on high-speed Google Drive and Mega servers. You can stream them online or download them to your local device.",
    icon: HardDrive
  }
];

export default function HowToDownloadPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">How to <span className="gradient-text">Download</span></h1>
        <p className="text-xl text-muted-foreground">Follow these simple steps to access your elite knowledge.</p>
      </div>

      <div className="space-y-8 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute left-[59px] top-10 bottom-10 w-0.5 bg-border z-0"></div>

        {STEPS.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-32 h-32 lg:w-32 lg:h-32 rounded-[2.5rem] bg-background border-4 border-border flex items-center justify-center text-4xl font-black text-primary shadow-2xl shadow-primary/5">
               <step.icon size={40} className="text-primary" />
            </div>
            
            <div className="glass p-10 rounded-[3rem] flex-grow transition-all hover:border-primary/20">
               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Step 0{i+1}</div>
               <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">{step.title}</h2>
               <p className="text-muted-foreground leading-relaxed text-lg italic">
                  {step.description}
               </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 space-y-12">
        <div className="glass p-10 rounded-[3rem] border-amber-500/10 flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Info className="text-amber-500" size={32} />
           </div>
           <div>
              <h3 className="text-xl font-bold mb-2 uppercase">Pro Tip: Always Make a Copy</h3>
              <p className="text-muted-foreground text-sm">
                For Google Drive links, we recommend selecting &quot;Add shortcut to drive&quot; or &quot;Make a copy&quot; to ensure you have permanent access in your own cloud storage.
              </p>
           </div>
        </div>

        <div className="text-center space-y-6">
           <h2 className="text-3xl font-black uppercase tracking-tight">Ready to Start?</h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="btn-primary flex items-center gap-2">
                 Explore Shop <ArrowRight size={18} />
              </Link>
              <Link href="/faq" className="btn-secondary">
                 Still Unsure? Read FAQ
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

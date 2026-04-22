import Link from 'next/link';
import { Facebook, Instagram, Send, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tighter gradient-text">TradeNest</Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium digital course marketplace for traders, entrepreneurs, and smart money enthusiasts. Get up to 99% off on top-tier education.
            </p>
            <div className="flex items-center gap-4">

              <a href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="https://t.me/Tradesmint_com" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
                <Send size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/membership" className="hover:text-primary transition-colors">Lifetime Membership</Link></li>
              <li><Link href="/how-to-download" className="hover:text-primary transition-colors">How to Download</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <span>support@tradenest.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary" />
                <span>+1 518-543-5529</span>
              </li>
              <li className="flex items-center gap-3">
                <Send size={16} className="text-primary" />
                <Link href="/contact-us" className="hover:text-primary transition-colors">t.me/Tradesmint_Sup</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TradeNest. All rights reserved. Secure 128-bit SSL encrypted checkout.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

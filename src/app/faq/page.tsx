'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    question: "What is TradeNest? / How does it work?",
    answer: "TradeNest is a premium digital course marketplace. We source high-end trading and business courses originally priced at thousands of dollars and provide them to you at a 90-99% discount. Once you purchase, you get instant access to the course materials via secure cloud links."
  },
  {
    question: "Are these courses legal to purchase?",
    answer: "We provide educational content for personal learning purposes. Our platform operates as a resale marketplace for digital education materials, allowing students to access information that might otherwise be financially out of reach."
  },
  {
    question: "How do I access my courses after purchase?",
    answer: "Immediately after checkout, you can find all your courses in 'My Account -> Downloads'. You will see direct buttons to access the content on platforms like Google Drive or Mega."
  },
  {
    question: "Do download links expire?",
    answer: "No. We provide permanent access to all your purchased content. The links are maintained on high-speed cloud storage and never expire as long as your account is active."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards (Visa, Mastercard, American Express) via Stripe and Razorpay. All transactions are 128-bit SSL secured."
  },
  {
    question: "Do you offer refunds?",
    answer: "Since we provide digital products that are instantly accessible, we generally do not offer refunds. However, if a link is broken or the product is incorrect, we will fix it immediately or issue a refund if unresolved."
  },
  {
    question: "What is Lifetime Membership and what does it include?",
    answer: "Lifetime Membership is our elite plan. For a one-time payment, you get instant access to every course currently on the site, plus every single course we add in the future—forever."
  },
  {
    question: "How do I request a course?",
    answer: "If there's a specific course you want that isn't on our site, use the 'Request Course' page. We fulfill 99% of requests within 48-72 hours."
  },
  {
    question: "Is my personal and payment information safe?",
    answer: "Yes. We never store your credit card details on our servers. All payments are processed by world-class providers (Stripe/Razorpay). We use Supabase for secure data encryption."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us via the 'Contact Us' page, WhatsApp, or our Telegram support channel. Our team typically responds within a few hours."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">Got <span className="gradient-text">Questions?</span></h1>
        <p className="text-xl text-muted-foreground">Everything you need to know about TradeNest.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="glass rounded-[2rem] overflow-hidden border-border transition-all hover:border-primary/20">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-8 text-left outline-none"
            >
              <span className="text-lg font-bold tracking-tight">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <ChevronDown className="text-muted-foreground" size={24} />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-8 pb-8 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center glass p-10 rounded-[3rem] border-primary/10">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
           <MessageCircle className="text-primary" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-4 uppercase">Still have questions?</h2>
        <p className="text-muted-foreground mb-8">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
        </p>
        <Link href="/contact-us" className="btn-primary inline-flex items-center gap-2">
           Contact Us
           <ChevronDown className="-rotate-90" size={18} />
        </Link>
      </div>
    </div>
  );
}

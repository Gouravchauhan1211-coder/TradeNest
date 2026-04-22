export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 prose prose-slate">
      <h1 className="text-5xl font-black uppercase tracking-tight mb-12">Privacy <span className="gradient-text">Policy</span></h1>
      
      <div className="glass p-12 rounded-[3rem] space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">1. Introduction</h2>
          <p>
            Welcome to TradeNest. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li><strong>Identity Data:</strong> includes full name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and billing address.</li>
            <li><strong>Financial Data:</strong> processed via our third-party providers (Stripe/Razorpay). We do not store full credit card details.</li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, and operating system.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>To register you as a new customer.</li>
            <li>To process and deliver your order.</li>
            <li>To manage our relationship with you.</li>
            <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
            <li>To improve our website, services, and marketing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">4. Third-Party Services</h2>
          <p>
            We use third-party services to ensure the best experience:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li><strong>Supabase:</strong> For database and authentication security.</li>
            <li><strong>Stripe / Razorpay:</strong> For secure payment processing.</li>
            <li><strong>Cloudflare:</strong> For website performance and security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>support@tradenest.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}

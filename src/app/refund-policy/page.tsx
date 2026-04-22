export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 prose prose-slate">
      <h1 className="text-5xl font-black uppercase tracking-tight mb-12">Refund <span className="gradient-text">Policy</span></h1>
      
      <div className="glass p-12 rounded-[3rem] space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">Our Commitment</h2>
          <p>
            At TradeNest, we strive to provide the highest quality educational resources at the most affordable prices. Because our products are digital and delivered instantly, our refund policy is strict but fair.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">Digital Product Sales</h2>
          <p>
            As a general rule, <strong>all sales of digital courses are final and non-refundable.</strong> Once you have accessed or downloaded the content, the value has been delivered.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">Exceptions for Refunds</h2>
          <p>
            We will consider refund requests under the following specific circumstances:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li><strong>Broken Links:</strong> If the download links are non-functional and our support team cannot provide a working alternative within 48 hours.</li>
            <li><strong>Incorrect Product:</strong> If the content delivered is significantly different from what was described on the product page.</li>
            <li><strong>Duplicate Purchase:</strong> If you accidentally purchased the same course twice.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">Non-Refundable Situations</h2>
          <p>
            We cannot offer refunds for:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
             <li>Change of mind after purchase.</li>
             <li>Personal dissatisfaction with the course content or instructor style.</li>
             <li>Lack of technical ability to download or view the files (our support team can help with this).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">How to Request a Refund</h2>
          <p>
            To request a refund, please contact us at <strong>support@tradenest.com</strong> with your Order ID and the reason for your request. We process all valid refund requests within 5-7 business days.
          </p>
        </section>
      </div>
    </div>
  );
}

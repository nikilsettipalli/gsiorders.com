import React from 'react';

const RewardsCTA: React.FC = () => (
  <section
    className="w-full bg-brand-accent/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center my-8 shadow-lg"
    aria-label="Wholesale Access CTA"
    data-testid="rewards-cta"
  >
    <h2 className="text-2xl font-bold text-white mb-2">Volume Pricing for Distributors</h2>
    <p className="text-white/90 mb-4">Unlock exclusive wholesale rates and dedicated support for your business.</p>
    <a
      href="/wholesale"
      className="btn-primary bg-white text-brand-accent font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition-all"
      data-testid="wholesale-cta-btn"
    >
      Get Wholesale Access
    </a>
  </section>
);

export default RewardsCTA; 
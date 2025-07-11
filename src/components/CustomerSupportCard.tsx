import React from 'react';

const CustomerSupportCard: React.FC = () => (
  <section
    className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center my-8 gap-2"
    aria-label="Customer Support"
    data-testid="customer-support-card"
  >
    <span className="text-3xl mb-2" aria-hidden="true">💬</span>
    <h3 className="text-lg font-bold text-brand-primary mb-1">Need Help?</h3>
    <p className="text-gray-700 mb-1">Our support team is here for you 7 days a week.</p>
    <a href="mailto:support@gsiorders.com" className="text-brand-accent font-medium underline" data-testid="support-email">support@gsiorders.com</a>
    <a href="tel:+18005551234" className="text-gray-700 text-sm" data-testid="support-phone">(800) 555-1234</a>
  </section>
);

export default CustomerSupportCard; 
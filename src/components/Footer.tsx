import React from 'react';

const Footer: React.FC = () => (
  <footer
    className="w-full bg-gray-50 border-t border-gray-200 mt-12 pt-8 pb-4 px-4"
    aria-label="Site Footer"
    data-testid="footer"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-6">
      {/* Brand/Contact */}
      <div>
        <span className="font-bold text-brand-primary text-lg">GSI Orders</span>
        <p className="text-gray-600 mt-2 text-sm">Your source for premium beverages, delivered fast.</p>
        <a href="mailto:support@gsiorders.com" className="text-brand-accent underline text-sm mt-2 block" data-testid="footer-email">support@gsiorders.com</a>
      </div>
      {/* Navigation */}
      <nav aria-label="Footer Navigation">
        <ul className="flex flex-col gap-2">
          <li><a href="/products" className="hover:text-brand-primary" data-testid="footer-nav-shop">Shop</a></li>
          <li><a href="/brands" className="hover:text-brand-primary" data-testid="footer-nav-brands">Brands</a></li>
          <li><a href="/wholesale" className="hover:text-brand-primary" data-testid="footer-nav-wholesale">Wholesale</a></li>
          <li><a href="/account" className="hover:text-brand-primary" data-testid="footer-nav-account">Account</a></li>
        </ul>
      </nav>
      {/* Legal */}
      <div>
        <ul className="flex flex-col gap-2">
          <li><a href="/terms" className="text-gray-500 hover:text-brand-primary text-sm" data-testid="footer-legal-terms">Terms of Service</a></li>
          <li><a href="/privacy" className="text-gray-500 hover:text-brand-primary text-sm" data-testid="footer-legal-privacy">Privacy Policy</a></li>
          <li><a href="/compliance" className="text-gray-500 hover:text-brand-primary text-sm" data-testid="footer-legal-compliance">Compliance</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center text-xs text-gray-400">© {new Date().getFullYear()} GSI Orders. All rights reserved.</div>
  </footer>
);

export default Footer; 
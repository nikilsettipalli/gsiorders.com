import React from 'react';

const TopBanner: React.FC = () => (
  <div
    className="w-full bg-brand-primary text-white text-center py-2 px-4 text-sm font-medium tracking-wide shadow-sm select-none"
    role="status"
    data-testid="top-banner"
  >
    Fast shipping | Retail & Wholesale Available
  </div>
);

export default TopBanner; 
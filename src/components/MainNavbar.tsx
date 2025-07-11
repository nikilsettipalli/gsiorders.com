import React from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Shop', href: '/products', testid: 'nav-shop' },
  { label: 'Brands', href: '/brands', testid: 'nav-brands' },
  { label: 'Wholesale', href: '/wholesale', testid: 'nav-wholesale' },
  { label: 'Account', href: '/account', testid: 'nav-account' },
  { label: 'Cart', href: '/cart', testid: 'nav-cart' },
];

const MainNavbar: React.FC = () => (
  <nav
    className="w-full sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm"
    role="navigation"
    aria-label="Main Navigation"
    data-testid="main-navbar"
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg text-brand-primary tracking-tight" data-testid="nav-logo">
          GSI Orders
        </Link>
        <ul className="hidden md:flex items-center gap-4 ml-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
                data-testid={item.testid}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile nav trigger placeholder */}
      <div className="md:hidden">
        {/* TODO: Add mobile menu button */}
      </div>
    </div>
  </nav>
);

export default MainNavbar; 
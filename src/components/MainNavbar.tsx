import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import MegaMenuDropdown from './MegaMenuDropdown';

interface NavItem {
  label: string;
  href?: string;
  testid: string;
  hasDropdown?: boolean;
  dropdownType?: 'shop' | 'learn';
}

const navItems: NavItem[] = [
  { label: 'Shop Products', hasDropdown: true, dropdownType: 'shop', testid: 'nav-shop' },
  { label: 'Learn', hasDropdown: true, dropdownType: 'learn', testid: 'nav-learn' },
  { label: 'About Us', href: '/about', testid: 'nav-about' },
  { label: 'Reviews', href: '/reviews', testid: 'nav-reviews' },
  { label: 'Contact', href: '/contact', testid: 'nav-contact' },
];

const MainNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter for dropdown items
  const handleMouseEnter = (dropdownType: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdownType);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent flickering
  };

  // Handle click for dropdown items
  const handleDropdownClick = (dropdownType: string) => {
    setActiveDropdown(activeDropdown === dropdownType ? null : dropdownType);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav
      ref={navRef}
      className="w-full sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      role="navigation"
      aria-label="Main Navigation"
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="font-black text-2xl text-emerald-600 tracking-tight hover:text-emerald-700 transition-colors" 
              data-testid="nav-logo"
            >
              GSI Orders
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.testid} className="relative">
                {item.hasDropdown ? (
                  <button
                    className={`
                      flex items-center gap-1 px-4 py-3 rounded-xl font-semibold text-gray-700 
                      hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                      ${activeDropdown === item.dropdownType ? 'bg-emerald-50 text-emerald-600' : ''}
                    `}
                    onMouseEnter={() => handleMouseEnter(item.dropdownType!)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleDropdownClick(item.dropdownType!)}
                    data-testid={item.testid}
                    aria-expanded={activeDropdown === item.dropdownType}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDownIcon 
                      className={`
                        w-4 h-4 transition-transform duration-200
                        ${activeDropdown === item.dropdownType ? 'rotate-180' : ''}
                      `} 
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className="block px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    data-testid={item.testid}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <button 
              className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
              aria-label="Search products"
              data-testid="nav-search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Icon with Badge */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
              data-testid="nav-cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0a1 1 0 100 2 1 1 0 000-2zm-6 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                0
              </span>
            </Link>

            {/* Account/Login */}
            <Link 
              href="/account" 
              className="hidden sm:block px-4 py-2 text-sm font-semibold text-emerald-600 border border-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-200"
              data-testid="nav-account"
            >
              Account
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
              aria-label="Open mobile menu"
              data-testid="nav-mobile-menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeDropdown === 'shop' && (
          <div
            onMouseEnter={() => handleMouseEnter('shop')}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenuDropdown 
              isOpen={activeDropdown === 'shop'} 
              onClose={closeDropdown} 
            />
          </div>
        )}

        {/* Learn Dropdown (simplified for now) */}
        {activeDropdown === 'learn' && (
          <div
            className="absolute top-full left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-100"
            onMouseEnter={() => handleMouseEnter('learn')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Education
                  </h3>
                  <ul className="space-y-2">
                    <li><Link href="/learn/beginners-guide" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Beginner's Guide</Link></li>
                    <li><Link href="/learn/dosage" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Dosage Guide</Link></li>
                    <li><Link href="/learn/effects" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Effects & Benefits</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Resources
                  </h3>
                  <ul className="space-y-2">
                    <li><Link href="/learn/blog" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Blog</Link></li>
                    <li><Link href="/learn/faq" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>FAQ</Link></li>
                    <li><Link href="/learn/lab-results" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Lab Results</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Support
                  </h3>
                  <ul className="space-y-2">
                    <li><Link href="/support" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Contact Support</Link></li>
                    <li><Link href="/support/shipping" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Shipping Info</Link></li>
                    <li><Link href="/support/returns" className="text-gray-600 hover:text-emerald-600 transition-colors" onClick={closeDropdown}>Returns</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar; 
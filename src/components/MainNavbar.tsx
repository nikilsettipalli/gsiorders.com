import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCurrentBrand } from '../hooks/useCurrentBrand';
import MegaMenuDropdown from './MegaMenuDropdown';

const MainNavbar: React.FC = () => {
  const { brand } = useCurrentBrand();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav 
      ref={navRef}
      className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center"
              aria-label="GSI Orders Home"
            >
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                GSI Orders
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                className="flex items-center text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                Shop Products
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              <MegaMenuDropdown 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
              />
            </div>

            <Link 
              href="/learn" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              Learn
            </Link>
            
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              About Us
            </Link>
            
            <Link 
              href="/reviews" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              Reviews
            </Link>
            
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button 
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              aria-label="Search products"
              data-testid="nav-search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Enter State Dropdown */}
            <div className="relative">
              <button className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 flex items-center">
                Enter state
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Account Icon */}
            <Link 
              href="/account" 
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              aria-label="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart Icon with Badge */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              aria-label={`Shopping cart with ${cartCount} items`}
              data-testid="nav-cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5m0 0L2 5" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              aria-label="Toggle mobile menu"
              data-testid="mobile-menu-button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar; 
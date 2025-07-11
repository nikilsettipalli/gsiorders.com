import React from 'react';
import Link from 'next/link';
import { useCurrentBrand } from '../hooks/useCurrentBrand';

interface MegaMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({ isOpen, onClose }) => {
  const { brand } = useCurrentBrand();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mega Menu */}
      <div 
        className={`
          absolute top-full left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-100
          transform transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}
        `}
        role="menu"
        aria-label="Product navigation menu"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Shop by Category */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Shop by Category
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Beverages', href: '/products?category=beverages' },
                  { label: 'Tinctures', href: '/products?category=tinctures' },
                  { label: 'Topicals', href: '/products?category=topicals' },
                  { label: 'Concentrates', href: '/products?category=concentrates' },
                  { label: 'Sexual Enhancers', href: '/products?category=sexual-enhancers' },
                  { label: 'All Products', href: '/products' }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Shop by Mood */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Shop by Mood
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Relaxed', href: '/products?mood=relaxed', emoji: '😌' },
                  { label: 'Focused', href: '/products?mood=focused', emoji: '🎯' },
                  { label: 'Energized', href: '/products?mood=energized', emoji: '⚡' },
                  { label: 'Creative', href: '/products?mood=creative', emoji: '🎨' },
                  { label: 'Social', href: '/products?mood=social', emoji: '🎉' },
                  { label: 'Sleepy', href: '/products?mood=sleepy', emoji: '😴' },
                  { label: 'Happy', href: '/products?mood=happy', emoji: '😊' },
                  { label: 'Calm', href: '/products?mood=calm', emoji: '🧘' }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                      onClick={onClose}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Shop by Potency */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Shop by Potency
              </h3>
              <ul className="space-y-3">
                {[
                  { 
                    label: 'Mild', 
                    subtitle: '5-10mg', 
                    href: '/products?potency=mild',
                    strength: 1,
                    color: 'bg-green-200'
                  },
                  { 
                    label: 'Medium', 
                    subtitle: '10-25mg', 
                    href: '/products?potency=medium',
                    strength: 2,
                    color: 'bg-yellow-200'
                  },
                  { 
                    label: 'High', 
                    subtitle: '25mg+', 
                    href: '/products?potency=high',
                    strength: 3,
                    color: 'bg-red-200'
                  }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200"
                      onClick={onClose}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-gray-500">{item.subtitle}</div>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((dot) => (
                            <div
                              key={dot}
                              className={`w-2 h-2 rounded-full ${
                                dot <= item.strength ? item.color : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: More */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                More
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Best Sellers', href: '/products?sort=bestsellers' },
                  { label: 'New Products', href: '/products?sort=newest' },
                  { label: 'Bundles', href: '/products?type=bundles' },
                  { label: 'Gift Cards', href: '/gift-cards' }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Cannabis Plant Image */}
              <div className="mt-6 hidden lg:block">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format"
                    alt="Premium cannabis products"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm font-semibold">Premium Quality</p>
                    <p className="text-xs opacity-90">Lab tested & certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Banner - Bottom of mega menu */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-emerald-900 mb-1">
                  New Customer? Get 20% Off
                </h4>
                <p className="text-emerald-700 text-sm">
                  Use code WELCOME20 on your first order
                </p>
              </div>
              <Link
                href="/products"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                onClick={onClose}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenuDropdown; 
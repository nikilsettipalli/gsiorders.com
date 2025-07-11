import React from 'react';
import Link from 'next/link';

interface MegaMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-screen bg-white shadow-xl border-t border-gray-100 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-5 gap-8 p-8">
          {/* Cannabis Image */}
          <div className="col-span-1">
            <img
              src="https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=300&h=400&fit=crop&auto=format"
              alt="Premium Cannabis"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* SHOP BY CATEGORY */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              SHOP BY CATEGORY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products?category=beverages" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Beverages
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=rtds" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  RTD's
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=tinctures" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Tinctures
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=creams" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Creams
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=sexual-enhancers" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Sexual Enhancers
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=cbd-shampoo" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  CBD Shampoo
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors block py-1"
                  onClick={onClose}
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* SHOP BY MOOD */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              SHOP BY MOOD
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products?mood=aroused" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Aroused
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=sleepy" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Sleepy
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=classic-high" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Classic High
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=happy" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Happy
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=energized" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Energized
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=chill" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Chill
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=soothing" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Soothing
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=focused" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Focused
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=creative" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Creative
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?mood=social" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Social
                </Link>
              </li>
            </ul>
          </div>

          {/* SHOP BY POTENCY */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              SHOP BY POTENCY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products?potency=mild" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1 flex items-center gap-2"
                  onClick={onClose}
                >
                  Mild Potency
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?potency=medium" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1 flex items-center gap-2"
                  onClick={onClose}
                >
                  Medium Potency
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?potency=high" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1 flex items-center gap-2"
                  onClick={onClose}
                >
                  High Potency
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* MORE */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              MORE
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products?featured=best-sellers" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?featured=new" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  New
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?featured=bundles" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?featured=summer-collection" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Summer Collection
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?featured=mindful-bakery" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors block py-1"
                  onClick={onClose}
                >
                  Mindful Bakery
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuDropdown; 
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
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Shop by Category */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              SHOP BY CATEGORY
            </h3>
            <ul className="space-y-3">
              {[
                'Gummies',
                'Flower', 
                'Edibles',
                'Beverages',
                'Pre-Rolls',
                'Concentrates',
                'Vapes',
                'Merch',
                'All Products'
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?category=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                    onClick={onClose}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by Mood */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              SHOP BY MOOD
            </h3>
            <ul className="space-y-3">
              {[
                'Aroused',
                'Sleepy',
                'Classic High',
                'Happy',
                'Energized',
                'Chill',
                'Soothing',
                'Focused',
                'Creative',
                'Social'
              ].map((mood) => (
                <li key={mood}>
                  <Link
                    href={`/products?mood=${mood.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                    onClick={onClose}
                  >
                    {mood}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by Potency */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              SHOP BY POTENCY
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/products?potency=mild"
                  className="block hover:text-emerald-600 transition-colors duration-200"
                  onClick={onClose}
                >
                  <div className="text-gray-600 text-sm mb-1">Mild Potency</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/products?potency=medium"
                  className="block hover:text-emerald-600 transition-colors duration-200"
                  onClick={onClose}
                >
                  <div className="text-gray-600 text-sm mb-1">Medium Potency</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/products?potency=high"
                  className="block hover:text-emerald-600 transition-colors duration-200"
                  onClick={onClose}
                >
                  <div className="text-gray-600 text-sm mb-1">High Potency</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              MORE
            </h3>
            <ul className="space-y-3">
              {[
                'Best Sellers',
                'New',
                'Bundles',
                'Summer Collection',
                'Mindful Bakery'
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?collection=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                    onClick={onClose}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Promotional Banner */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-emerald-800 font-semibold text-sm mb-1">
                New Customer?
              </div>
              <div className="text-emerald-600 text-sm">
                Get 20% Off Your First Order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuDropdown; 
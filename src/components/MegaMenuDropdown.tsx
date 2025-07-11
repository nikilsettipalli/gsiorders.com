import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MegaMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({ isOpen, onClose }) => {
  const [currentImage, setCurrentImage] = useState('https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=400&h=500&fit=crop&auto=format');

  // Category-specific images
  const categoryImages = {
    'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=500&fit=crop&auto=format',
    'RTD\'s': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=500&fit=crop&auto=format',
    'Tinctures': 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=500&fit=crop&auto=format',
    'Creams': 'https://images.unsplash.com/photo-1570194065650-d99c79da3f76?w=400&h=500&fit=crop&auto=format',
    'Sexual Enhancers': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=500&fit=crop&auto=format',
    'CBD Shampoo': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=500&fit=crop&auto=format',
    'All Products': 'https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=400&h=500&fit=crop&auto=format'
  };

  const defaultImage = 'https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=400&h=500&fit=crop&auto=format';

  // Preload images for smooth transitions
  useEffect(() => {
    Object.values(categoryImages).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleCategoryHover = (category: string) => {
    const imageUrl = categoryImages[category as keyof typeof categoryImages] || defaultImage;
    setCurrentImage(imageUrl);
  };

  const handleCategoryLeave = () => {
    setCurrentImage(defaultImage);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Centered Dropdown */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-white shadow-2xl border border-gray-200 rounded-lg z-50 mx-4">
        <div className="grid grid-cols-5 gap-8 p-8">
          {/* Cannabis Image - Left Column */}
          <div className="col-span-1">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentImage}
                alt="Premium Cannabis Products"
                className="w-full h-96 object-cover transition-all duration-300 ease-in-out"
                onError={(e) => {
                  e.currentTarget.src = defaultImage;
                }}
              />
            </div>
          </div>

          {/* Categories Grid - Right 4 Columns */}
          <div className="col-span-4 grid grid-cols-4 gap-6">
            
            {/* SHOP BY CATEGORY */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                Shop by Category
              </h3>
              <div className="space-y-2">
                {['Beverages', 'RTD\'s', 'Tinctures', 'Creams', 'Sexual Enhancers', 'CBD Shampoo', 'All Products'].map((item) => (
                  <Link 
                    key={item}
                    href={`/products?category=${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors text-sm"
                    onClick={onClose}
                    onMouseEnter={() => handleCategoryHover(item)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* SHOP BY MOOD */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                Shop by Mood
              </h3>
              <div className="space-y-2">
                {['Aroused', 'Sleepy', 'Classic High', 'Happy', 'Energized', 'Chill', 'Soothing', 'Focused', 'Creative', 'Social'].map((mood) => (
                  <Link 
                    key={mood}
                    href={`/products?mood=${mood.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors text-sm"
                    onClick={onClose}
                  >
                    {mood}
                  </Link>
                ))}
              </div>
            </div>

            {/* SHOP BY POTENCY */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                Shop by Potency
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/products?potency=mild"
                  className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
                  onClick={onClose}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Mild Potency</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </Link>
                
                <Link 
                  href="/products?potency=medium"
                  className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
                  onClick={onClose}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Medium Potency</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </Link>
                
                <Link 
                  href="/products?potency=high"
                  className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
                  onClick={onClose}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">High Potency</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* MORE */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                More
              </h3>
              <div className="space-y-2">
                {['Best Sellers', 'New', 'Bundles', 'Summer Collection', 'Mindful Bakery'].map((item) => (
                  <Link 
                    key={item}
                    href={`/products?collection=${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors text-sm"
                    onClick={onClose}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenuDropdown; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrentBrand } from '../hooks/useCurrentBrand';

interface MegaMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

// Category image mapping
const categoryImages = {
  default: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format",
  beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&auto=format",
  tinctures: "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400&h=400&fit=crop&auto=format",
  topicals: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&auto=format",
  concentrates: "https://images.unsplash.com/photo-1618177707446-3b4ba094717d?w=400&h=400&fit=crop&auto=format",
  'sexual-enhancers': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format"
};

const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({ isOpen, onClose }) => {
  const { brand } = useCurrentBrand();
  const [currentImage, setCurrentImage] = useState(categoryImages.default);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: boolean }>({});

  // Preload all category images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = Object.entries(categoryImages).map(([key, src]) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => ({ ...prev, [key]: true }));
            resolve();
          };
          img.onerror = () => {
            setPreloadedImages(prev => ({ ...prev, [key]: false }));
            resolve();
          };
          img.src = src;
        });
      });
      
      await Promise.all(imagePromises);
    };

    if (isOpen) {
      preloadImages();
    }
  }, [isOpen]);

  // Handle category hover with smooth image switching
  const handleCategoryHover = (category: string) => {
    const imageKey = category.toLowerCase().replace(/\s+/g, '-') as keyof typeof categoryImages;
    const newImage = categoryImages[imageKey] || categoryImages.default;
    
    if (newImage !== currentImage) {
      setImageLoaded(false);
      setTimeout(() => {
        setCurrentImage(newImage);
        setImageLoaded(true);
      }, 150); // Half of transition duration for smooth fade
    }
  };

  // Reset to default image when leaving category area
  const handleCategoryLeave = () => {
    if (currentImage !== categoryImages.default) {
      setImageLoaded(false);
      setTimeout(() => {
        setCurrentImage(categoryImages.default);
        setImageLoaded(true);
      }, 150);
    }
  };

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
            <div className="space-y-4" onMouseLeave={handleCategoryLeave}>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Shop by Category
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Beverages', href: '/products?category=beverages', key: 'beverages' },
                  { label: 'Tinctures', href: '/products?category=tinctures', key: 'tinctures' },
                  { label: 'Topicals', href: '/products?category=topicals', key: 'topicals' },
                  { label: 'Concentrates', href: '/products?category=concentrates', key: 'concentrates' },
                  { label: 'Sexual Enhancers', href: '/products?category=sexual-enhancers', key: 'sexual-enhancers' },
                  { label: 'All Products', href: '/products', key: 'default' }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 hover:scale-105 px-3 py-2 rounded-lg transition-all duration-200 font-medium transform"
                      onClick={onClose}
                      onMouseEnter={() => handleCategoryHover(item.key)}
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
              
              {/* Dynamic Cannabis Image */}
              <div className="mt-6 hidden lg:block">
                <div className="relative overflow-hidden">
                  <img 
                    src={currentImage}
                    alt="Premium cannabis products"
                    className={`w-full h-32 object-cover rounded-xl shadow-lg transition-opacity duration-300 ease-in-out ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setCurrentImage(categoryImages.default);
                      setImageLoaded(true);
                    }}
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
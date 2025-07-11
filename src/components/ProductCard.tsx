// src/components/ProductCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
// import WishlistButton from "./WishlistButton"; // TODO: Re-enable when wishlist state is available

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  brand_id: string;
  inventory_count: number;
  images: string[] | null;
  brands?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[] | null;
    inventory_count: number;
    brands?: { name: string; slug: string };
    badge?: string | null; // e.g. 'Limited Batch', 'Award Winner', etc.
    rating?: number | null; // 1-5
    isNew?: boolean; // New product flag
    isBestSeller?: boolean; // Best seller flag
    isLimitedEdition?: boolean; // Limited edition flag
    category?: string; // Product category for filtering
  };
  userRole?: 'user' | 'admin' | 'rep';
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
  isLoading?: boolean; // For skeleton loading state
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  userRole = 'user',
  onAddToCart,
  onQuickView,
  className = '',
  isLoading: externalLoading = false,
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { addToCart } = useCart();

  // Role-based pricing logic
  const price =
    userRole === 'admin' || userRole === 'rep'
      ? product.price * 0.85 // Example: 15% wholesale discount
      : product.price;

  // Enhanced image URL logic with fallback
  const imageUrl = product.images?.[0] || '/images/placeholder-product.svg';

  // Enhanced badge logic with priority system
  const getBadge = () => {
    if (product.isBestSeller) return { text: '#1 Best Seller', color: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900' };
    if (product.isNew) return { text: 'New', color: 'bg-emerald-500 text-white' };
    if (product.isLimitedEdition) return { text: 'Limited Edition', color: 'bg-purple-600 text-white' };
    if (product.badge) return { text: product.badge, color: 'bg-brand-accent text-white' };
    if (product.inventory_count < 10) return { text: 'Low Stock', color: 'bg-red-500 text-white' };
    return null;
  };

  const badge = getBadge();
  const rating = product.rating;

  // Add to cart handler
  const handleAddToCart = async () => {
    if (isAddingToCart || product.inventory_count === 0) return;
    setIsAddingToCart(true);
    setError(null);
    try {
      if (onAddToCart) {
        await onAddToCart(product.id);
      } else {
        await addToCart(product.id, 1);
      }
    } catch (err: any) {
      setError('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Quick view handler
  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product.id);
    }
  };

  // If loading prop is true, show skeleton
  if (externalLoading) {
    return (
      <div className="product-card animate-pulse" data-testid="product-skeleton">
        <div className="aspect-square w-full bg-gray-200 rounded-xl"></div>
        <div className="h-6 bg-gray-200 rounded mt-2"></div>
        <div className="h-4 bg-gray-200 rounded mt-1 w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded mt-2"></div>
      </div>
    );
  }

  return (
    <motion.article
      className={`product-card group relative cursor-pointer transition-all duration-300 ${className}`}
      data-testid="product-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      tabIndex={0}
      aria-label={product.name}
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      {/* Out of stock overlay */}
      {product.inventory_count === 0 && (
        <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center rounded-2xl z-20" data-testid="out-of-stock-overlay">
          <span className="font-bold text-lg">Out of Stock</span>
        </div>
      )}

      {/* Enhanced Badge */}
      {badge && (
        <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-bold z-20 shadow-lg animate-pulse ${badge.color}`} data-testid="product-badge">
          {badge.text}
        </span>
      )}

      {/* Wishlist Button - TODO: Add wishlist state management */}
      <div className="absolute top-3 right-3 z-20">
        <button
          className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
          aria-label="Add to wishlist"
          data-testid="wishlist-placeholder"
        >
          <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Image with Quick Actions */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
        )}
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="product-image object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority={false}
          data-testid="product-image"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${showQuickActions ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-2">
            {onQuickView && (
              <button
                onClick={handleQuickView}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
                data-testid="quick-view-btn"
              >
                Quick View
              </button>
            )}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.inventory_count === 0}
              className="bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-600 transition-colors transform hover:scale-105 disabled:opacity-50"
              data-testid="quick-add-btn"
            >
              {isAddingToCart ? 'Adding...' : 'Quick Add'}
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 space-y-2">
        {/* Brand name */}
        {product.brands && (
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide" data-testid="product-brand">
            {product.brands.name}
          </p>
        )}
        
        {/* Product name */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors" data-testid="product-title">
          {product.name}
        </h3>

        {/* Rating */}
        {typeof rating === 'number' && (
          <div className="flex items-center gap-1" data-testid="product-rating" aria-label={`Rating: ${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-1">({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900" data-testid="product-price">
            ${price.toFixed(2)}
            {userRole === 'admin' || userRole === 'rep' && (
              <span className="ml-2 text-xs text-emerald-600 font-medium">(Wholesale)</span>
            )}
          </p>
          {product.inventory_count < 10 && product.inventory_count > 0 && (
            <span className="text-xs text-red-600 font-medium">
              Only {product.inventory_count} left
            </span>
          )}
        </div>

        {/* Main Add to Cart Button - Hidden on hover when quick actions are shown */}
        <button
          type="button"
          className={`w-full py-3 px-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''} ${showQuickActions ? 'opacity-75' : ''}`}
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.inventory_count === 0}
          aria-label={`Add ${product.name} to cart`}
          data-testid="add-to-cart-btn"
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            'Add to Cart'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mt-2 text-center" role="alert" data-testid="product-error">
            {error}
          </p>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;

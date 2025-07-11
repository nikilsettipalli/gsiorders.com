// src/components/ProductCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import WishlistButton from "./WishlistButton";

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
  };
  userRole?: 'user' | 'admin' | 'rep';
  onAddToCart?: (productId: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  userRole = 'user',
  onAddToCart,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Role-based pricing logic
  const price =
    userRole === 'admin' || userRole === 'rep'
      ? product.price * 0.85 // Example: 15% wholesale discount
      : product.price;

  // Supabase CDN image URL logic
  const imageUrl = product.images?.[0] || '/placeholder.webp';

  // Badge logic (from product.badge or inventory)
  const badge = product.badge ||
    (product.inventory_count < 10 ? 'Limited Batch' : null);

  // Rating logic (optional)
  const rating = product.rating;

  // Add to cart handler
  const handleAddToCart = async () => {
    if (isLoading || product.inventory_count === 0) return;
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <motion.article
      className={`product-card group relative cursor-pointer transition-transform ${className}`}
      data-testid="product-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      tabIndex={0}
      aria-label={product.name}
    >
      {/* Out of stock overlay */}
      {product.inventory_count === 0 && (
        <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center rounded-2xl z-10" data-testid="out-of-stock-overlay">
          <span className="font-bold text-lg">Out of Stock</span>
        </div>
      )}
      {/* Badge */}
      {badge && (
        <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs px-2 py-1 rounded z-20" data-testid="product-badge">
          {badge}
        </span>
      )}
      {/* Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="product-image object-cover group-hover:brightness-110 transition"
          sizes="(max-width: 640px) 100vw, 33vw"
          priority={false}
          data-testid="product-image"
        />
        <div className="product-overlay" />
      </div>
      {/* Product Info */}
      <h3 className="heading-3 mt-2 text-brand-primary" data-testid="product-title">
        {product.name}
      </h3>
      <p className="text-brand-primary font-semibold" data-testid="product-price">
        ${price.toFixed(2)}
        {userRole === 'admin' || userRole === 'rep' ? (
          <span className="ml-1 text-xs text-brand-accent">(Wholesale)</span>
        ) : null}
      </p>
      {/* Rating */}
      {typeof rating === 'number' && (
        <div className="flex items-center gap-1 mt-1" data-testid="product-rating" aria-label={`Rating: ${rating} out of 5`}>
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
        </div>
      )}
      {/* Add to Cart Button */}
      <button
        type="button"
        className={`btn-primary w-full mt-2${isLoading ? ' btn-loading' : ''}`}
        onClick={handleAddToCart}
        disabled={isLoading || product.inventory_count === 0}
        aria-label={`Add ${product.name} to cart`}
        data-testid="add-to-cart-btn"
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
      {/* Error Message */}
      {error && (
        <p className="text-error text-sm mt-1" role="alert" data-testid="product-error">
          {error}
        </p>
      )}
    </motion.article>
  );
};

export default ProductCard;

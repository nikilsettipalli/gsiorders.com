import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, isLoading, updateQuantity, removeFromCart, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingOption, setShippingOption] = useState('standard');
  const [isPromoApplying, setIsPromoApplying] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Mock recommended products - in real app, fetch based on cart contents
  const recommendedProducts: RecommendedProduct[] = [
    {
      id: 'rec-1',
      name: 'CBD Sleep Gummies',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=150&h=150&fit=crop',
      brand: 'Liquid Heaven'
    },
    {
      id: 'rec-2', 
      name: 'Premium Tequila Shot',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1556917336-5b28c8411d6a?w=150&h=150&fit=crop',
      brand: 'Motaquila'
    },
    {
      id: 'rec-3',
      name: 'Energy Boost Blend',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
      brand: 'Last Genie'
    }
  ];

  // Calculate shipping based on zip code
  const calculateShipping = (zip: string) => {
    if (!zip || zip.length < 5) return;
    
    // Mock shipping calculation - in real app, integrate with shipping API
    const baseRate = shippingOption === 'express' ? 15.99 : 5.99;
    const distance = parseInt(zip.substring(0, 2)); // Mock distance calculation
    const rate = distance > 50 ? baseRate + 2 : baseRate;
    setShippingCost(rate);
  };

  // Apply promo code
  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    
    setIsPromoApplying(true);
    setPromoError('');
    
    try {
      // Mock promo code validation - integrate with real promo API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (promoCode.toUpperCase() === 'SAVE10') {
        setPromoDiscount(cart.total * 0.1);
      } else if (promoCode.toUpperCase() === 'WELCOME20') {
        setPromoDiscount(cart.total * 0.2);
      } else {
        setPromoError('Invalid promo code');
        setPromoDiscount(0);
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsPromoApplying(false);
    }
  };

  // Save item for later
  const saveForLater = (productId: string) => {
    setSavedItems([...savedItems, productId]);
    removeFromCart(productId);
  };

  // Enhanced checkout with age verification
  const handleCheckout = async () => {
    // Age verification for CBD/cannabis products
    const over21 = window.confirm('You must be 21 or older to purchase these products. Are you 21 or older?');
    if (!over21) {
      alert('Sorry, you must be 21 or older to complete this purchase.');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cartItems: cart.items,
          promoCode: promoCode,
          promoDiscount: promoDiscount,
          shippingCost: shippingCost,
          shippingZip: shippingZip,
          shippingOption: shippingOption
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const { sessionUrl } = await response.json();
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const subtotal = cart.total || 0;
  const finalTotal = subtotal + shippingCost - promoDiscount;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Slide-out Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[28rem] bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-900">
              Cart ({cart.itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13L5.4 5M7 13l4.5 0M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="p-4 space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        {/* Product Image */}
                        <img
                          src={item.products.images?.[0] || `https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=80&h=80&fit=crop&random=${item.product_id}`}
                          alt={item.products.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{item.products.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{item.products.brands?.name}</p>
                          
                          {/* Quantity & Price Row */}
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <span className="w-10 text-center text-sm font-medium bg-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
                                disabled={item.quantity >= item.products.inventory_count}
                              >
                                +
                              </button>
                            </div>

                            {/* Line Total */}
                            <span className="font-bold text-gray-900">
                              {formatPrice(item.products.price * item.quantity)}
                            </span>
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center gap-4 mt-2">
                            <button
                              onClick={() => saveForLater(item.product_id)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              Save for later
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product_id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommended Products */}
                {cart.items.length > 0 && (
                  <div className="p-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">You might also like</h3>
                    <div className="space-y-3">
                      {recommendedProducts.slice(0, 2).map((product) => (
                        <div key={product.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                            <p className="text-xs text-gray-500">{product.brand}</p>
                            <p className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</p>
                          </div>
                          <button
                            onClick={() => addToCart(product.id, 1)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer - Checkout Section */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-4 space-y-4">
              {/* Promo Code */}
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={isPromoApplying || !promoCode.trim()}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors text-sm font-medium"
                  >
                    {isPromoApplying ? '...' : 'Apply'}
                  </button>
                </div>
                {promoError && <p className="text-xs text-red-600 mt-1">{promoError}</p>}
                {promoDiscount > 0 && <p className="text-xs text-green-600 mt-1">Promo applied: -{formatPrice(promoDiscount)}</p>}
              </div>

              {/* Shipping Calculator */}
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="ZIP code"
                    value={shippingZip}
                    onChange={(e) => {
                      setShippingZip(e.target.value);
                      calculateShipping(e.target.value);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={5}
                  />
                  <select
                    value={shippingOption}
                    onChange={(e) => {
                      setShippingOption(e.target.value);
                      calculateShipping(shippingZip);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="standard">Standard (5-7 days)</option>
                    <option value="express">Express (2-3 days)</option>
                  </select>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo discount</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost > 0 ? formatPrice(shippingCost) : 'Enter ZIP'}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading || !shippingZip}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Processing...' : `Secure Checkout • ${formatPrice(finalTotal)}`}
              </button>

              {/* Trust Badges */}
              <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  🔒 SSL Secure
                </span>
                <span className="flex items-center gap-1">
                  ✅ 21+ Verified
                </span>
                <span className="flex items-center gap-1">
                  🚚 Free shipping over $50
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal; 
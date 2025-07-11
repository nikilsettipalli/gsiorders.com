import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCart } from '../src/hooks/useCart';
import { MainNavbar, Footer, ErrorBoundary, CheckoutForm } from '../src/components';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cart, isLoading } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (!isLoading && (!cart.items || cart.items.length === 0)) {
      router.push('/cart');
    }
  }, [cart.items, isLoading, router]);

  const handleCheckoutComplete = (orderData: any) => {
    setIsRedirecting(true);
    
    // Redirect to success page with order details
    router.push({
      pathname: '/success',
      query: { 
        orderId: orderData.orderId,
        sessionId: orderData.sessionId 
      }
    });
  };

  const handleCheckoutCancel = () => {
    router.push('/cart');
  };

  // Show loading state while cart is loading or redirecting
  if (isLoading || isRedirecting) {
    return (
      <ErrorBoundary>
        <Head>
          <title>Checkout - GSI Orders</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gray-50">
          <MainNavbar />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">
                {isRedirecting ? 'Redirecting to payment...' : 'Loading checkout...'}
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }

  // Show empty cart message if no items
  if (!cart.items || cart.items.length === 0) {
    return (
      <ErrorBoundary>
        <Head>
          <title>Checkout - GSI Orders</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gray-50">
          <MainNavbar />
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <svg className="mx-auto h-24 w-24 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Shopping
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Head>
        <title>Secure Checkout - GSI Orders</title>
        <meta name="description" content="Complete your order securely with SSL encryption and age verification." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Checkout-specific meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com;" />
        
        {/* Trust indicators in meta */}
        <meta property="og:title" content="Secure Checkout - GSI Orders" />
        <meta property="og:description" content="SSL-encrypted checkout with age verification for premium CBD and wellness products." />
        
        {/* Prevent form autofill on payment fields for security */}
        <meta name="format-detection" content="telephone=no" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MainNavbar />
        
        {/* Checkout Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
                <p className="text-sm text-gray-600 mt-1">
                  SSL encrypted • 21+ age verification required
                </p>
              </div>
              
              {/* Security badges */}
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm font-medium">Secure</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Checkout Form - Main Column */}
              <div className="lg:col-span-2">
                <CheckoutForm 
                  onComplete={handleCheckoutComplete}
                  onCancel={handleCheckoutCancel}
                />
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.products.images?.[0] || `https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=60&h=60&fit=crop&random=${item.product_id}`}
                          alt={item.products.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.products.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.products.brands?.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium text-gray-900">
                              ${(item.products.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
                      <span className="font-medium">${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Calculated at next step</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-base font-semibold text-gray-900">Estimated Total</span>
                        <span className="text-base font-bold text-gray-900">${cart.total.toFixed(2)}+</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>SSL encrypted checkout</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Age verification required</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span>Secure payment processing</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Free shipping over $50</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Support */}
                  <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600 mb-2">Need help?</p>
                    <a 
                      href="tel:1-800-GSI-ORDER" 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      1-800-GSI-ORDER
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Customer support available 9AM-6PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default CheckoutPage; 
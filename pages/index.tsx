import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrentBrand } from '../src/hooks/useCurrentBrand';
import {
  MainNavbar,
  TopBanner,
  CategoryGrid,
  ProductGrid,
  ReviewHighlight,
  FarmerStorySection,
  Footer
} from '../src/components';

// Hero Section Component - mood.com style
const HeroSection: React.FC = () => {
  const { brand } = useCurrentBrand();
  
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left lg:pr-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-gray-900 leading-[0.9] tracking-tight">
              Premium
              <br />
              <span className="text-emerald-600">Cannabis</span>
              <br />
              Products
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-600 leading-relaxed font-light">
              Discover the finest selection of premium CBD, wellness products, and specialty items from trusted brands.
            </p>
            
            {/* Brand Pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/liquidheaven"
                className="px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
              >
                Liquid Heaven
              </Link>
              <Link
                href="/motaquila"
                className="px-5 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors"
              >
                Motaquila
              </Link>
              <Link
                href="/lastgenie"
                className="px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors"
              >
                Last Genie
              </Link>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-center"
              >
                Shop All Products
              </Link>
              <Link
                href="/liquidheaven"
                className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 text-center"
              >
                Explore CBD Collection
              </Link>
            </div>
          </div>
          
          {/* Right Content - Product Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Product Image */}
              <div className="col-span-2 relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1605127011521-3a8c8c2e3b3f?w=600&h=400&fit=crop&auto=format"
                    alt="Premium CBD Products"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Floating Product Cards */}
              <div className="relative -mt-8">
                <div className="aspect-square bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=200&fit=crop&auto=format"
                    alt="CBD Oil"
                    className="w-full h-20 object-cover rounded-xl mb-3"
                  />
                  <p className="font-semibold text-gray-900 text-sm mb-1">Premium CBD Oil</p>
                  <p className="text-emerald-600 font-bold text-lg">$49.99</p>
                </div>
              </div>
              
              <div className="relative -mt-4">
                <div className="aspect-square bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&auto=format"
                    alt="CBD Gummies"
                    className="w-full h-20 object-cover rounded-xl mb-3"
                  />
                  <p className="font-semibold text-gray-900 text-sm mb-1">CBD Gummies</p>
                  <p className="text-emerald-600 font-bold text-lg">$34.99</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Product Grid Section
const FeaturedProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Premium CBD Oil Tincture',
      price: 49.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&auto=format',
      badge: 'Popular',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Organic CBD Gummies',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format',
      badge: 'New',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Full Spectrum CBD Capsules',
      price: 39.99,
      originalPrice: 44.99,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format',
      badge: 'Sale',
      rating: 4.7
    },
    {
      id: 4,
      name: 'CBD Topical Cream',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&auto=format',
      badge: 'Popular',
      rating: 4.6
    }
  ];

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'New':
        return 'bg-blue-500 text-white';
      case 'Sale':
        return 'bg-red-500 text-white';
      case 'Popular':
        return 'bg-emerald-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Our most popular and highest-rated products, trusted by thousands of customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:scale-[1.02]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(product.badge)}`}>
                  {product.badge}
                </div>
                
                {/* Quick Add Button */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-700">
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                
                <p className="font-semibold text-gray-900 mb-3 text-lg leading-tight">{product.name}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Customer Reviews Section
const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format',
      rating: 5,
      text: 'Amazing quality CBD products! The oil tincture has helped me sleep so much better. Highly recommend to anyone looking for natural wellness solutions.',
      product: 'Premium CBD Oil Tincture',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
      rating: 5,
      text: 'Fast shipping and excellent customer service. The CBD gummies taste great and work exactly as described. Will definitely order again!',
      product: 'Organic CBD Gummies',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
      rating: 5,
      text: 'I\'ve tried many CBD brands, but this one is by far the best. Premium quality, fair prices, and you can really feel the difference.',
      product: 'Full Spectrum CBD Capsules',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Real reviews from verified customers who love our products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 hover:border-emerald-200"
            >
              {/* Stars */}
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{review.text}"
              </p>
              
              {/* Product */}
              <p className="text-emerald-600 font-medium mb-6 text-sm">
                Purchased: {review.product}
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    {review.verified && (
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Brand Showcase Section
const BrandShowcase: React.FC = () => {
  const brands = [
    {
      name: 'Liquid Heaven',
      slug: 'liquidheaven',
      description: 'Premium wellness and CBD products for a better lifestyle',
      color: 'emerald',
      image: 'https://images.unsplash.com/photo-1605127011521-3a8c8c2e3b3f?w=600&h=400&fit=crop&auto=format',
      products: '50+ Products'
    },
    {
      name: 'Motaquila',
      slug: 'motaquila',
      description: 'Exquisite premium beverages crafted for the discerning palate',
      color: 'pink',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&auto=format',
      products: '25+ Products'
    },
    {
      name: 'Last Genie',
      slug: 'lastgenie',
      description: 'Specialty products that bring magic to your everyday life',
      color: 'indigo',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop&auto=format',
      products: '30+ Products'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Our Premium Brands
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Three distinct brands, each offering unique products tailored to different lifestyles and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.slug}
              className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${brand.color}-600/80 to-transparent group-hover:from-${brand.color}-700/90 transition-all duration-300`}></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
                  {brand.products}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{brand.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{brand.description}</p>
                
                <Link
                  href={`/${brand.slug}`}
                  className={`inline-flex items-center justify-center w-full bg-gradient-to-r from-${brand.color}-500 to-${brand.color}-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]`}
                >
                  Explore {brand.name}
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Homepage Component
const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>GSI Orders - Premium Cannabis & CBD Products | Trusted Quality</title>
        <meta name="description" content="Discover premium cannabis and CBD products from Liquid Heaven, Motaquila, and Last Genie. Trusted quality, lab-tested, and customer approved." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="GSI Orders - Premium Cannabis & CBD Products" />
        <meta property="og:description" content="Discover premium cannabis and CBD products from trusted brands. Lab-tested quality you can trust." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gsiorders.com" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GSI Orders - Premium Cannabis & CBD Products" />
        <meta name="twitter:description" content="Discover premium cannabis and CBD products from trusted brands." />
      </Head>

      <div className="min-h-screen bg-white scroll-smooth antialiased">
        {/* Top Banner - Promotional content */}
        <TopBanner />
        
        {/* Main Navigation - Sticky header */}
        <MainNavbar />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Brand Showcase */}
        <BrandShowcase />
        
        {/* Category Grid - 4 columns desktop, 2 mobile */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Find exactly what you're looking for with our organized product categories
              </p>
            </div>
            <CategoryGrid />
          </div>
        </section>
        
        {/* Customer Reviews */}
        <CustomerReviews />
        
        {/* About/Story Content */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FarmerStorySection />
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              Stay in the Loop
            </h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto font-light">
              Get exclusive access to new products, special offers, and cannabis education content
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none text-lg"
              />
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl">
                Subscribe Now
              </button>
            </div>
            
            <p className="text-emerald-200 text-sm mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage; 
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrentBrand } from '../src/hooks/useCurrentBrand';
import {
  MainNavbar,
  Footer,
  ErrorBoundary
} from '../src/components';

// Product data based on user requirements
const categoryData = {
  allProducts: {
    name: 'All Products',
    totalSkus: 13,
    description: 'Complete collection across all categories'
  },
  beverages: {
    name: 'Beverages',
    brands: [
      {
        name: 'Liquid Heaven',
        skus: [
          { id: 1, name: 'CBD Energy Drink', price: '$12.99', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&auto=format', rating: 4.8, potency: 'High' },
          { id: 2, name: 'Relaxation Tea', price: '$15.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&auto=format', rating: 4.6, potency: 'Medium' },
          { id: 3, name: 'Morning Boost Coffee', price: '$18.99', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format', rating: 4.9, potency: 'High' },
          { id: 4, name: 'CBD Lemonade', price: '$9.99', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=300&h=300&fit=crop&auto=format', rating: 4.7, potency: 'Low' },
          { id: 5, name: 'Herbal Smoothie', price: '$14.99', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop&auto=format', rating: 4.5, potency: 'Medium' },
          { id: 6, name: 'Green Juice Blend', price: '$16.99', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=300&fit=crop&auto=format', rating: 4.8, potency: 'High' },
          { id: 7, name: 'Wellness Water', price: '$8.99', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format', rating: 4.4, potency: 'Low' },
          { id: 8, name: 'Power Protein Shake', price: '$19.99', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&auto=format', rating: 4.9, potency: 'High' }
        ]
      },
      {
        name: 'Motaquila',
        skus: [
          { id: 9, name: 'Premium Tequila Infusion', price: '$89.99', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=300&fit=crop&auto=format', rating: 4.9, potency: 'High' },
          { id: 10, name: 'Craft Cocktail Mix', price: '$45.99', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop&auto=format', rating: 4.7, potency: 'Medium' },
          { id: 11, name: 'Agave Spirit Blend', price: '$67.99', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=300&fit=crop&auto=format', rating: 4.8, potency: 'High' }
        ]
      }
    ]
  },
  sexualEnhancers: {
    name: 'Sexual Enhancers',
    brands: [
      {
        name: 'Genie',
        skus: [
          { id: 12, name: 'Libido Boost Gummies', price: '$39.99', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=300&fit=crop&auto=format', rating: 4.8, potency: 'High' },
          { id: 13, name: 'Passion Enhancement Oil', price: '$49.99', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=300&fit=crop&auto=format', rating: 4.6, potency: 'Medium' }
        ]
      }
    ]
  }
};

const HomePage: React.FC = () => {
  const { brand } = useCurrentBrand();
  const [selectedCategory, setSelectedCategory] = useState<string>('allProducts'); // Default to All Products
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPotency, setSelectedPotency] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trending');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedBrand('all');
    setSelectedPotency('all');
    setSortBy('trending');
  };

  const getFilteredProducts = () => {
    if (!selectedCategory) return [];
    
    let allProducts: any[] = [];
    
    if (selectedCategory === 'allProducts') {
      // Get all products from all categories
      Object.entries(categoryData).forEach(([key, category]) => {
        if (key !== 'allProducts' && 'brands' in category) {
          category.brands.forEach(brand => {
            allProducts = [...allProducts, ...brand.skus.map(sku => ({ ...sku, brandName: brand.name, category: key }))];
          });
        }
      });
    } else {
      // Get products from specific category
      const category = categoryData[selectedCategory as keyof typeof categoryData];
      if ('brands' in category) {
        category.brands.forEach(brand => {
          allProducts = [...allProducts, ...brand.skus.map(sku => ({ ...sku, brandName: brand.name, category: selectedCategory }))];
        });
      }
    }

    // Apply filters
    if (selectedBrand !== 'all') {
      allProducts = allProducts.filter(product => product.brandName === selectedBrand);
    }

    if (selectedPotency !== 'all') {
      allProducts = allProducts.filter(product => product.potency.toLowerCase() === selectedPotency);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        allProducts.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        break;
      case 'price-high':
        allProducts.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        break;
      case 'rating':
        allProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'trending':
      default:
        // Keep original order for trending
        break;
    }

    return allProducts;
  };

  const getAvailableBrands = () => {
    if (!selectedCategory) return [];
    
    if (selectedCategory === 'allProducts') {
      // Get all brands from all categories
      const allBrands: string[] = [];
      Object.entries(categoryData).forEach(([key, category]) => {
        if (key !== 'allProducts' && 'brands' in category) {
          category.brands.forEach(brand => {
            if (!allBrands.includes(brand.name)) {
              allBrands.push(brand.name);
            }
          });
        }
      });
      return allBrands;
    } else {
      const category = categoryData[selectedCategory as keyof typeof categoryData];
      if ('brands' in category) {
        return category.brands.map(brand => brand.name);
      }
    }
    return [];
  };

  const getDisplayTitle = () => {
    if (selectedCategory === 'allProducts') {
      return 'All Products';
    }
    const category = categoryData[selectedCategory as keyof typeof categoryData];
    return 'name' in category ? category.name : 'Products';
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>GSI Orders - Premium Cannabis Products</title>
        <meta name="description" content="Premium cannabis products for wellness and recreation. Shop gummies, flower, edibles, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <MainNavbar />

        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
          
          {/* Animated Background Circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300/20 rounded-full animate-ping"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-white z-10 space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                    Premium CBD &
                    <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                      Wellness Products
                    </span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                    Discover our scientifically-formulated collection featuring 
                    <span className="font-semibold text-yellow-300"> Amrit water-soluble technology</span> 
                    for enhanced bioavailability and faster absorption.
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-white/80">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lab Tested
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    FDA Compliant
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                    </svg>
                    Fast Shipping
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleCategoryClick('allProducts')}
                    className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Shop All Products
                  </button>
                  <Link
                    href="/about-amrit"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Learn About Amrit
                  </Link>
                </div>

                {/* Additional Trust Element */}
                <div className="flex items-center gap-3 text-white/70">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-emerald-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-sm">Trusted by thousands of customers nationwide</span>
                </div>
              </div>

              {/* Right Content - Enhanced Product Display */}
              <div className="relative z-10 lg:justify-self-end">
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Main Product Image */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=700&fit=crop&auto=format"
                      alt="Premium CBD Gummies with Amrit Technology"
                      className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-105"
                    />
                    
                    {/* Product Badge */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-4 py-2 rounded-full font-bold text-sm animate-bounce shadow-lg">
                      #1 Best Seller
                    </div>

                    {/* Amrit Technology Badge */}
                    <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Amrit Tech
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 -left-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-float">
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">5x</div>
                        <div className="text-xs">Faster Absorption</div>
                      </div>
                    </div>

                    <div className="absolute bottom-1/4 -right-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-float" style={{animationDelay: '1s'}}>
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">99%</div>
                        <div className="text-xs">Bioavailability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Circular Elements */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600">
                Choose your experience
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-6 lg:space-x-12">
              {/* All Products Category */}
              <div className="text-center">
                <button
                  onClick={() => handleCategoryClick('allProducts')}
                  className={`group relative w-32 h-32 lg:w-48 lg:h-48 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    selectedCategory === 'allProducts' 
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl ring-4 ring-emerald-200' 
                      : 'bg-gradient-to-br from-emerald-400 to-emerald-600 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      {/* Grid Icon for All Products */}
                      <svg className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span className="text-xs lg:text-sm font-bold text-emerald-600">13 SKUs</span>
                    </div>
                  </div>
                  {selectedCategory === 'allProducts' && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Active
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view
                  </div>
                </button>
                <h3 className="mt-4 text-lg lg:text-xl font-bold text-gray-900">All Products</h3>
                <p className="text-sm text-gray-600">Complete Collection</p>
              </div>

              {/* Beverages Category */}
              <div className="text-center">
                <button
                  onClick={() => handleCategoryClick('beverages')}
                  className={`group relative w-32 h-32 lg:w-48 lg:h-48 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    selectedCategory === 'beverages' 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl ring-4 ring-blue-200' 
                      : 'bg-gradient-to-br from-blue-400 to-blue-600 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      {/* Bottle Icon for Beverages */}
                      <svg className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1H3a1 1 0 000 2h1v1a2 2 0 00.586 1.414L8 13.828V17a1 1 0 102 0v-3.172l3.414-3.414A2 2 0 0014 9V8h1a1 1 0 100-2h-1V5a2 2 0 00-2-2H6zm0 2h6v3H6V4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs lg:text-sm font-bold text-blue-600">11 SKUs</span>
                    </div>
                  </div>
                  {selectedCategory === 'beverages' && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Active
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view
                  </div>
                </button>
                <h3 className="mt-4 text-lg lg:text-xl font-bold text-gray-900">Beverages</h3>
                <p className="text-sm text-gray-600">Liquid Heaven • Motaquila</p>
              </div>

              {/* Sexual Enhancers Category */}
              <div className="text-center">
                <button
                  onClick={() => handleCategoryClick('sexualEnhancers')}
                  className={`group relative w-32 h-32 lg:w-48 lg:h-48 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    selectedCategory === 'sexualEnhancers' 
                      ? 'bg-gradient-to-br from-pink-400 to-purple-600 shadow-2xl ring-4 ring-pink-200' 
                      : 'bg-gradient-to-br from-pink-400 to-purple-600 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      {/* Wellness/Sparkles Icon for Sexual Enhancers */}
                      <svg className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-2 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs lg:text-sm font-bold text-pink-600">2 SKUs</span>
                    </div>
                  </div>
                  {selectedCategory === 'sexualEnhancers' && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Active
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view
                  </div>
                </button>
                <h3 className="mt-4 text-lg lg:text-xl font-bold text-gray-900">Sexual Enhancers</h3>
                <p className="text-sm text-gray-600">Genie</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Display Section - Shows when category is selected */}
        {selectedCategory && (
          <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900">
                  {getDisplayTitle()}
                </h2>
                <button
                  onClick={() => setSelectedCategory('allProducts')}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Brands</option>
                      {getAvailableBrands().map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Potency Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Potency</label>
                    <select
                      value={selectedPotency}
                      onChange={(e) => setSelectedPotency(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Potency</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="trending">Trending</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Additional Filters */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">All Products</option>
                      <option value="hot-sale">Hot Sale</option>
                      <option value="almost-over">Almost Over</option>
                      <option value="new">New Arrivals</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFilteredProducts().map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {product.brandName}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.potency === 'High' ? 'bg-red-100 text-red-700' :
                          product.potency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {product.potency}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          {product.price}
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredProducts().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found with the selected filters.</p>
                </div>
              )}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default HomePage; 
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    
    const category = categoryData[selectedCategory as keyof typeof categoryData];
    let allProducts: any[] = [];
    
    category.brands.forEach(brand => {
      allProducts = [...allProducts, ...brand.skus.map(sku => ({ ...sku, brandName: brand.name }))];
    });

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
    const category = categoryData[selectedCategory as keyof typeof categoryData];
    return category.brands.map(brand => brand.name);
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

        {/* Hero Section - Single Colorful Product Image */}
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white z-10">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                  Premium Cannabis
                  <span className="block text-yellow-300">Experience</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Discover our curated selection of premium cannabis products. 
                  From wellness to recreation, elevate your experience.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Collection
                </Link>
              </div>
              <div className="relative z-10">
                <div className="relative w-full max-w-md mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=600&fit=crop&auto=format"
                    alt="Premium Cannabis Gummies"
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-700 px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                    Best Seller
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
            
            <div className="flex justify-center items-center space-x-8 lg:space-x-16">
              {/* Beverages Category */}
              <div className="text-center">
                <button
                  onClick={() => handleCategoryClick('beverages')}
                  className={`group relative w-32 h-32 lg:w-48 lg:h-48 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    selectedCategory === 'beverages' 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl' 
                      : 'bg-gradient-to-br from-blue-400 to-blue-600 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs lg:text-sm font-bold text-blue-600">11 SKUs</span>
                    </div>
                  </div>
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
                      ? 'bg-gradient-to-br from-pink-400 to-purple-600 shadow-2xl' 
                      : 'bg-gradient-to-br from-pink-400 to-purple-600 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-2 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs lg:text-sm font-bold text-pink-600">2 SKUs</span>
                    </div>
                  </div>
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
                  {categoryData[selectedCategory as keyof typeof categoryData].name} Products
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
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
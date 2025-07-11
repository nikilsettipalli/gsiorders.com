import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrentBrand } from '../src/hooks/useCurrentBrand';
import {
  MainNavbar,
  Footer,
  ErrorBoundary
} from '../src/components';

const HomePage: React.FC = () => {
  const { brand } = useCurrentBrand();

  return (
    <ErrorBoundary>
      <Head>
        <title>GSI Orders - Premium Cannabis Products</title>
        <meta name="description" content="Premium cannabis products for wellness and recreation. Shop gummies, flower, edibles, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <MainNavbar />

        {/* Hero Section */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                  Premium Cannabis Products
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Discover our curated selection of premium cannabis products. 
                  From wellness to recreation, we have everything you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-200 text-center"
                  >
                    Shop All Products
                  </Link>
                  <Link
                    href="/products?category=cbd"
                    className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition-colors duration-200 text-center"
                  >
                    Explore CBD Collection
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=400&fit=crop&auto=format"
                    alt="Premium CBD Gummies"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=400&fit=crop&auto=format"
                    alt="Premium CBD Oil"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600">
                Find the perfect products for your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Gummies',
                  image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&auto=format',
                  href: '/products?category=gummies'
                },
                {
                  name: 'Flower',
                  image: 'https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=400&h=300&fit=crop&auto=format',
                  href: '/products?category=flower'
                },
                {
                  name: 'Edibles',
                  image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop&auto=format',
                  href: '/products?category=edibles'
                },
                {
                  name: 'Concentrates',
                  image: 'https://images.unsplash.com/photo-1618177707446-3b4ba094717d?w=400&h=300&fit=crop&auto=format',
                  href: '/products?category=concentrates'
                }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Our most popular cannabis products
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Relaxation Gummies',
                  price: '$29.99',
                  rating: 4.8,
                  image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop&auto=format',
                  badge: 'Best Seller'
                },
                {
                  name: 'Premium CBD Oil',
                  price: '$49.99',
                  rating: 4.9,
                  image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=400&fit=crop&auto=format',
                  badge: 'New'
                },
                {
                  name: 'Sour Diesel Flower',
                  price: '$39.99',
                  rating: 4.7,
                  image: 'https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=400&h=400&fit=crop&auto=format',
                  badge: 'Popular'
                }
              ].map((product) => (
                <div
                  key={product.name}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span>
                      <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Elements */}
        <div className="fixed bottom-6 left-6 z-40">
          <div className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <span className="text-sm font-bold text-center leading-tight">
              Get<br />20% Off
            </span>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-40">
          <button className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default HomePage; 
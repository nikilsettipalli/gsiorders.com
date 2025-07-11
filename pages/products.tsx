import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MainNavbar, Footer, ErrorBoundary } from '../src/components';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with featured products
    const featuredProducts: Product[] = [
      {
        id: '1',
        name: 'Premium CBD Gummies',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop&auto=format',
        category: 'Gummies',
        rating: 4.8,
        reviews: 124,
        badge: 'Best Seller'
      },
      {
        id: '2',
        name: 'Relaxation Tincture',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=400&fit=crop&auto=format',
        category: 'Tinctures',
        rating: 4.9,
        reviews: 89,
        badge: 'New'
      },
      {
        id: '3',
        name: 'Sour Diesel Flower',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1536424813622-0d64ba88dc74?w=400&h=400&fit=crop&auto=format',
        category: 'Flower',
        rating: 4.7,
        reviews: 156,
        badge: 'Popular'
      },
      {
        id: '4',
        name: 'Energy Drink Mix',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format',
        category: 'Beverages',
        rating: 4.6,
        reviews: 78
      },
      {
        id: '5',
        name: 'Focus Capsules',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop&auto=format',
        category: 'Capsules',
        rating: 4.8,
        reviews: 92
      },
      {
        id: '6',
        name: 'Sleep Support Gummies',
        price: 32.99,
        image: 'https://images.unsplash.com/photo-1618177707446-3b4ba094717d?w=400&h=400&fit=crop&auto=format',
        category: 'Gummies',
        rating: 4.9,
        reviews: 203,
        badge: 'Top Rated'
      }
    ];

    setTimeout(() => {
      setProducts(featuredProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
    // TODO: Implement actual cart functionality
  };

  if (loading) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          <MainNavbar />
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
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
        <title>Premium Cannabis Products - GSI Orders</title>
        <meta name="description" content="Shop our premium selection of cannabis products including gummies, tinctures, flower, and more." />
      </Head>

      <div className="min-h-screen bg-white">
        <MainNavbar />

        {/* Header Section */}
        <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Premium Cannabis Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of premium cannabis products. 
              From wellness to recreation, we have everything you need.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emerald-600 font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center">
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
                        <span className="text-gray-600 text-sm ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              New to Cannabis?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Get personalized recommendations and start your wellness journey with us.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200">
              Get Started
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ProductsPage;

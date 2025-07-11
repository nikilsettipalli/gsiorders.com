import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  MainNavbar,
  Footer,
  ErrorBoundary,
  ProductCard
} from '../src/components';

// Clean product data for homepage display
const featuredProducts = [
  {
    id: '1',
    name: 'CBD Relief Gummies',
    price: 29.99,
    images: [''],
    inventory_count: 45,
    brands: { name: 'Liquid Heaven', slug: 'liquidheaven' },
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
    isLimitedEdition: false,
    category: 'wellness'
  },
  {
    id: '2', 
    name: 'Sleep Support Drops',
    price: 34.99,
    images: [''],
    inventory_count: 32,
    brands: { name: 'Liquid Heaven', slug: 'liquidheaven' },
    rating: 4.7,
    isNew: true,
    isBestSeller: false,
    isLimitedEdition: false,
    category: 'wellness'
  },
  {
    id: '3',
    name: 'Energy Wellness Drink',
    price: 19.99,
    images: [''],
    inventory_count: 28,
    brands: { name: 'Motaquila', slug: 'motaquila' },
    rating: 4.6,
    isNew: false,
    isBestSeller: false,
    isLimitedEdition: true,
    category: 'beverages'
  }
];

const HomePage: React.FC = () => {
  return (
    <ErrorBoundary>
      <Head>
        <title>GSI Orders - Premium CBD & Wellness Products</title>
        <meta name="description" content="One unified platform for premium CBD, wellness products, and beverages. D2C & wholesale solutions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <MainNavbar />

        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-20 bg-gradient-to-b from-brand-primary/10 to-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary mb-4">
              GSI Orders
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-xl mx-auto">
              One unified platform for D2C & wholesale. Premium CBD, wellness products, and beverages.
            </p>
            <div className="mt-8">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8 py-6 hover:opacity-90 focus:ring-2 focus:ring-brand-accent">
                  Shop Products
                </Button>
              </Link>
            </div>
          </section>

          {/* Featured Brands Section */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Shop by Brand
              </h2>
              <p className="text-lg text-gray-600">
                Discover our premium collection from trusted partners
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Liquid Heaven Brand */}
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:opacity-90 focus:ring-2 focus:ring-brand-accent">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Liquid Heaven</h3>
                  <p className="text-gray-600 mb-4">Premium CBD wellness products</p>
                  <Link href="/liquidheaven">
                    <Button variant="outline" className="w-full">
                      Shop Liquid Heaven
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Motaquila Brand */}
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:opacity-90 focus:ring-2 focus:ring-brand-accent">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">🍹</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Motaquila</h3>
                  <p className="text-gray-600 mb-4">Craft beverages and premium products</p>
                  <Link href="/motaquila">
                    <Button variant="outline" className="w-full">
                      Shop Motaquila
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Last Genie Brand */}
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:opacity-90 focus:ring-2 focus:ring-brand-accent sm:col-span-2 lg:col-span-1">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Last Genie</h3>
                  <p className="text-gray-600 mb-4">Specialty wellness products</p>
                  <Link href="/lastgenie">
                    <Button variant="outline" className="w-full">
                      Shop Last Genie
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Our most popular wellness products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8 py-6 hover:opacity-90 focus:ring-2 focus:ring-brand-accent">
                  View All Products
                </Button>
              </Link>
            </div>
          </section>

          {/* Simple Trust Section */}
          <section className="py-16 bg-gray-50 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose GSI Orders
              </h2>
              <p className="text-lg text-gray-600">
                Quality, compliance, and customer satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-2">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-2">99.8%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-2">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-2">100%</div>
                <div className="text-sm text-gray-600">Quality Guarantee</div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default HomePage; 
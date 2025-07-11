import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  MainNavbar,
  Footer,
  ErrorBoundary,
  ProductCard,
  ComplianceGrid,
  CustomerSupportCard,
  EducationalBlogCards,
  ReviewHighlight,
  FarmerStorySection
} from '../src/components';

// Sample products for homepage display
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
        <meta name="description" content="Premium CBD and wellness products for better living. Shop gummies, oils, beverages, and more from trusted brands." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <MainNavbar />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-primary/10 to-white py-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Shop Smarter.{' '}
                <span className="text-brand-primary">Sell Faster.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                One unified ecommerce platform for premium CBD, wellness products, and beverages. 
                Trusted by thousands of customers nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Browse Products
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Liquid Heaven</h3>
                  <p className="text-gray-600 mb-4">Premium CBD wellness products with advanced bioavailability</p>
                  <Button variant="outline" className="w-full group-hover:bg-emerald-50">
                    Shop Liquid Heaven
                  </Button>
                </CardContent>
              </Card>

              {/* Motaquila Brand */}
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">🍹</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Motaquila</h3>
                  <p className="text-gray-600 mb-4">Craft beverages and premium agave-based products</p>
                  <Button variant="outline" className="w-full group-hover:bg-pink-50">
                    Shop Motaquila
                  </Button>
                </CardContent>
              </Card>

              {/* Last Genie Brand */}
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer sm:col-span-2 lg:col-span-1">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Last Genie</h3>
                  <p className="text-gray-600 mb-4">Specialty wellness products and unique formulations</p>
                  <Button variant="outline" className="w-full group-hover:bg-indigo-50">
                    Shop Last Genie
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Our most popular wellness products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8 py-6">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Education Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose GSI Orders
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Quality, compliance, and customer satisfaction are at the heart of everything we do
              </p>
            </div>

            {/* Compliance Grid */}
            <div className="mb-16">
              <ComplianceGrid />
            </div>

            {/* Customer Review */}
            <div className="mb-16">
              <ReviewHighlight />
            </div>

            {/* Two-Column: Story + Support */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <FarmerStorySection />
              <CustomerSupportCard />
            </div>

            {/* Educational Blog Cards */}
            <div className="mb-16">
              <EducationalBlogCards />
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-brand-primary mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-primary mb-2">99.8%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
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
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default HomePage; 
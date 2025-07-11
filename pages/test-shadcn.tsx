import React from 'react';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MainNavbar, Footer } from '../src/components';

const TestShadcnPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Test shadcn/ui Components - GSI Orders</title>
        <meta name="description" content="Testing shadcn/ui components integration" />
      </Head>

      <div className="min-h-screen bg-white">
        <MainNavbar />
        
        <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              shadcn/ui Components Test
            </h1>
            <p className="text-lg text-gray-600">
              Testing the integration of shadcn/ui components with brand theming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Button Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Button Components</CardTitle>
                <CardDescription>
                  Testing different button variants from shadcn/ui
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="default">Default Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
              </CardContent>
            </Card>

            {/* Input Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Input Components</CardTitle>
                <CardDescription>
                  Testing input components with brand theming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="text" placeholder="Enter your name" />
                <Input type="email" placeholder="Enter your email" />
                <Input type="password" placeholder="Enter your password" />
                <Button className="w-full bg-brand-primary hover:bg-brand-accent">
                  Submit with Brand Colors
                </Button>
              </CardContent>
            </Card>

            {/* Brand Theming Test */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Brand Theming Test</CardTitle>
                <CardDescription>
                  Testing brand-specific color variables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Brand Primary</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-secondary rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Brand Secondary</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-accent rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Brand Accent</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-success rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Brand Success</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-warning rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Brand Warning</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-error rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Brand Error</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              All components should render properly without errors. 
              Brand colors should be applied correctly.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TestShadcnPage; 
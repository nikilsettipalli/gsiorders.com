import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import ShopByMoodSection from '../../src/components/ShopByMoodSection';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => Promise.resolve({
            data: [
              {
                id: '1',
                name: 'Mood Beverage',
                price: 19.99,
                images: ['mood.jpg'],
                inventory_count: 5,
                brands: { name: 'Mood Brand', slug: 'mood' }
              }
            ],
            error: null
          })
        })
      })
    })
  })
}));

// Mock ProductCard component
jest.mock('../../src/components/ProductCard', () => {
  return function MockProductCard({ product }: any) {
    return <div data-testid="mood-product-card">{product.name}</div>;
  };
});

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('ShopByMoodSection', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <ShopByMoodSection />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('shop-by-mood-section')).toBeInTheDocument();
  });

  it('renders mood products after loading', async () => {
    render(
      <MockBrandProvider>
        <ShopByMoodSection />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Mood Beverage')).toBeInTheDocument();
    });
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <ShopByMoodSection />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('shop-by-mood-section')).toBeInTheDocument();
    });
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
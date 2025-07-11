import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import ProductGrid from '../../src/components/ProductGrid';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          gt: () => Promise.resolve({
            data: [
              {
                id: '1',
                name: 'Test Beverage',
                price: 29.99,
                images: ['test.jpg'],
                inventory_count: 10,
                brands: { name: 'Test Brand', slug: 'test' },
                badge: 'popular',
                rating: 4.5,
                type: 'beverage'
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
    return <div data-testid="product-card">{product.name}</div>;
  };
});

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('ProductGrid', () => {
  it('renders loading state initially', () => {
    render(
      <MockBrandProvider>
        <ProductGrid />
      </MockBrandProvider>
    );
    
    expect(screen.getByTestId('product-grid-loading')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-skeleton')).toHaveLength(6);
  });

  it('renders products after loading', async () => {
    render(
      <MockBrandProvider>
        <ProductGrid />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.getByText('Test Beverage')).toBeInTheDocument();
    });
  });

  it('passes userRole to ProductCard', async () => {
    render(
      <MockBrandProvider>
        <ProductGrid userRole="admin" />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <ProductGrid />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    });
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has correct ARIA label', async () => {
    render(
      <MockBrandProvider>
        <ProductGrid />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByLabelText('Product Grid')).toBeInTheDocument();
    });
  });

  it('applies custom className', async () => {
    render(
      <MockBrandProvider>
        <ProductGrid className="custom-class" />
      </MockBrandProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('product-grid')).toHaveClass('custom-class');
    });
  });
}); 
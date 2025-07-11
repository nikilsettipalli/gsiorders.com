import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import CategoryGrid from '../../src/components/CategoryGrid';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('CategoryGrid', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <CategoryGrid />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('category-grid')).toBeInTheDocument();
    expect(screen.getByText('Ready to Drink')).toBeInTheDocument();
    expect(screen.getByText('Mixers')).toBeInTheDocument();
    expect(screen.getByText('Non-Alcoholic')).toBeInTheDocument();
  });

  it('calls onSelect when category is clicked', () => {
    const mockOnSelect = jest.fn();
    render(
      <MockBrandProvider>
        <CategoryGrid onSelect={mockOnSelect} />
      </MockBrandProvider>
    );
    
    fireEvent.click(screen.getByTestId('category-ready-to-drink'));
    expect(mockOnSelect).toHaveBeenCalledWith('ready-to-drink');
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <CategoryGrid />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has correct ARIA labels', () => {
    render(
      <MockBrandProvider>
        <CategoryGrid />
      </MockBrandProvider>
    );
    
    expect(screen.getByLabelText('Product Categories')).toBeInTheDocument();
    expect(screen.getByLabelText('Ready to Drink')).toBeInTheDocument();
    expect(screen.getByLabelText('Mixers')).toBeInTheDocument();
    expect(screen.getByLabelText('Non-Alcoholic')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <MockBrandProvider>
        <CategoryGrid className="custom-class" />
      </MockBrandProvider>
    );
    
    expect(screen.getByTestId('category-grid')).toHaveClass('custom-class');
  });
}); 
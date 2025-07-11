import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MegaMenuDropdown from '../../src/components/MegaMenuDropdown';

// Mock the useCurrentBrand hook
jest.mock('../../src/hooks/useCurrentBrand', () => ({
  useCurrentBrand: () => ({
    brand: { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' }
  })
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, onClick, className }: any) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  };
});

describe('MegaMenuDropdown', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <MegaMenuDropdown isOpen={false} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders mega menu when isOpen is true', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    // Check for main sections
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.getByText('Shop by Mood')).toBeInTheDocument();
    expect(screen.getByText('Shop by Potency')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('displays category links correctly', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Beverages')).toBeInTheDocument();
    expect(screen.getByText('Tinctures')).toBeInTheDocument();
    expect(screen.getByText('Topicals')).toBeInTheDocument();
    expect(screen.getByText('Concentrates')).toBeInTheDocument();
    expect(screen.getByText('Sexual Enhancers')).toBeInTheDocument();
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('displays mood options with emojis', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Relaxed')).toBeInTheDocument();
    expect(screen.getByText('Focused')).toBeInTheDocument();
    expect(screen.getByText('Energized')).toBeInTheDocument();
    expect(screen.getByText('Creative')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('Sleepy')).toBeInTheDocument();
    expect(screen.getByText('Happy')).toBeInTheDocument();
    expect(screen.getByText('Calm')).toBeInTheDocument();
  });

  it('displays potency options with strength indicators', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Mild')).toBeInTheDocument();
    expect(screen.getByText('5-10mg')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('10-25mg')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('25mg+')).toBeInTheDocument();
  });

  it('displays more section links', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Best Sellers')).toBeInTheDocument();
    expect(screen.getByText('New Products')).toBeInTheDocument();
    expect(screen.getByText('Bundles')).toBeInTheDocument();
    expect(screen.getByText('Gift Cards')).toBeInTheDocument();
  });

  it('displays featured banner', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('New Customer? Get 20% Off')).toBeInTheDocument();
    expect(screen.getByText('Use code WELCOME20 on your first order')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const backdrop = document.querySelector('.fixed.inset-0.z-40');
    expect(backdrop).toBeInTheDocument();
    
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when a menu link is clicked', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const beveragesLink = screen.getByText('Beverages');
    fireEvent.click(beveragesLink);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const menuContainer = screen.getByRole('menu');
    expect(menuContainer).toHaveAttribute('aria-label', 'Product navigation menu');
    
    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();
  });

  it('displays cannabis image with proper alt text', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const cannabisImage = screen.getByAltText('Premium cannabis products');
    expect(cannabisImage).toBeInTheDocument();
    expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
  });
}); 
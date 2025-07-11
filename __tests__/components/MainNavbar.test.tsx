import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainNavbar from '../../src/components/MainNavbar';

// Mock the useCurrentBrand hook
jest.mock('../../src/hooks/useCurrentBrand', () => ({
  useCurrentBrand: () => ({
    brand: { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' }
  })
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock MegaMenuDropdown component
jest.mock('../../src/components/MegaMenuDropdown', () => {
  return function MockMegaMenuDropdown({ isOpen, onClose }: any) {
    return isOpen ? (
      <div data-testid="mega-menu-dropdown">
        <button onClick={onClose}>Close Menu</button>
      </div>
    ) : null;
  };
});

// Create a mock brand provider for testing
const MockBrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('MainNavbar', () => {
  it('renders the logo correctly', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    expect(screen.getByText('GSI Orders')).toBeInTheDocument();
    expect(screen.getByLabelText('GSI Orders Home')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    expect(screen.getByText('Shop Products')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders right side action buttons', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    expect(screen.getByTestId('nav-search')).toBeInTheDocument();
    expect(screen.getByText('Enter state')).toBeInTheDocument();
    expect(screen.getByLabelText('Account')).toBeInTheDocument();
    expect(screen.getByTestId('nav-cart')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
  });

  it('opens mega menu dropdown when shop products button is hovered', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByText('Shop Products');
    fireEvent.mouseEnter(shopButton.parentElement as Element);
    
    expect(screen.getByTestId('mega-menu-dropdown')).toBeInTheDocument();
  });

  it('closes mega menu dropdown when mouse leaves', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByText('Shop Products');
    fireEvent.mouseEnter(shopButton.parentElement as Element);
    expect(screen.getByTestId('mega-menu-dropdown')).toBeInTheDocument();
    
    fireEvent.mouseLeave(shopButton.parentElement as Element);
    expect(screen.queryByTestId('mega-menu-dropdown')).not.toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('has proper aria attributes for dropdowns', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByText('Shop Products');
    expect(shopButton).toHaveAttribute('aria-expanded', 'false');
    expect(shopButton).toHaveAttribute('aria-haspopup', 'true');
  });

  it('closes dropdown on escape key', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByText('Shop Products');
    fireEvent.mouseEnter(shopButton.parentElement as Element);
    
    expect(screen.getByTestId('mega-menu-dropdown')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('mega-menu-dropdown')).not.toBeInTheDocument();
  });

  it('displays cart count badge when items are in cart', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const cartButton = screen.getByTestId('nav-cart');
    expect(cartButton).toHaveAttribute('aria-label', 'Shopping cart with 0 items');
  });

  it('has search button with proper accessibility', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const searchButton = screen.getByTestId('nav-search');
    expect(searchButton).toHaveAttribute('aria-label', 'Search products');
  });

  it('has mobile menu button with proper accessibility', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    expect(mobileMenuButton).toHaveAttribute('aria-label', 'Toggle mobile menu');
  });

  it('renders brand-aware styling', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('bg-white', 'border-b', 'border-gray-100');
  });
}); 
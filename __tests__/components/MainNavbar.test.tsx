import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MainNavbar from '../../src/components/MainNavbar';

expect.extend(toHaveNoViolations);

// Mock the useCurrentBrand hook
jest.mock('../../src/hooks/useCurrentBrand', () => ({
  useCurrentBrand: () => ({
    brand: { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' }
  })
}));

// Mock the MegaMenuDropdown component
jest.mock('../../src/components/MegaMenuDropdown', () => {
  return function MockMegaMenuDropdown({ isOpen, onClose }: any) {
    return isOpen ? (
      <div data-testid="mega-menu-dropdown">
        <button onClick={onClose}>Close Menu</button>
      </div>
    ) : null;
  };
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, className, ...props }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  };
});

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('MainNavbar', () => {
  beforeEach(() => {
    // Mock window.matchMedia for responsive design tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('main-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('nav-shop')).toBeInTheDocument();
    expect(screen.getByTestId('nav-learn')).toBeInTheDocument();
    expect(screen.getByTestId('nav-about')).toBeInTheDocument();
    expect(screen.getByTestId('nav-reviews')).toBeInTheDocument();
    expect(screen.getByTestId('nav-contact')).toBeInTheDocument();
  });

  it('renders dropdown buttons with chevron icons', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByTestId('nav-shop');
    const learnButton = screen.getByTestId('nav-learn');
    
    expect(shopButton).toHaveAttribute('aria-haspopup', 'true');
    expect(learnButton).toHaveAttribute('aria-haspopup', 'true');
  });

  it('renders cart icon with badge', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const cartLink = screen.getByTestId('nav-cart');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders account link', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const accountLink = screen.getByTestId('nav-account');
    expect(accountLink).toBeInTheDocument();
    expect(accountLink).toHaveAttribute('href', '/account');
  });

  it('opens mega menu dropdown when shop button is clicked', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByTestId('nav-shop');
    fireEvent.click(shopButton);
    
    expect(screen.getByTestId('mega-menu-dropdown')).toBeInTheDocument();
  });

  it('closes mega menu when close button is clicked', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByTestId('nav-shop');
    fireEvent.click(shopButton);
    
    const closeButton = screen.getByText('Close Menu');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('mega-menu-dropdown')).not.toBeInTheDocument();
  });

  it('opens learn dropdown when learn button is clicked', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const learnButton = screen.getByTestId('nav-learn');
    fireEvent.click(learnButton);
    
    // Learn dropdown should be visible
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main Navigation');
  });

  it('has proper aria attributes for dropdowns', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByTestId('nav-shop');
    const learnButton = screen.getByTestId('nav-learn');
    
    expect(shopButton).toHaveAttribute('aria-expanded', 'false');
    expect(learnButton).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(shopButton);
    expect(shopButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes dropdown on escape key', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    
    const shopButton = screen.getByTestId('nav-shop');
    fireEvent.click(shopButton);
    
    expect(screen.getByTestId('mega-menu-dropdown')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(screen.queryByTestId('mega-menu-dropdown')).not.toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper focus management', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    const shopButton = screen.getByTestId('nav-shop');
    expect(shopButton).toHaveClass('focus:outline-none', 'focus:ring-2');
  });
}); 
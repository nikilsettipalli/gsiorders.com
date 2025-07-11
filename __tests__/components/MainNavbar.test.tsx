import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import MainNavbar from '../../src/components/MainNavbar';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('MainNavbar', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('main-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <MockBrandProvider>
        <MainNavbar />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('nav-shop')).toBeInTheDocument();
    expect(screen.getByTestId('nav-brands')).toBeInTheDocument();
    expect(screen.getByTestId('nav-wholesale')).toBeInTheDocument();
    expect(screen.getByTestId('nav-account')).toBeInTheDocument();
    expect(screen.getByTestId('nav-cart')).toBeInTheDocument();
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
    const shopLink = screen.getByTestId('nav-shop');
    expect(shopLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-brand-primary');
  });
}); 
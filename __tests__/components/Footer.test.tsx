import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Footer from '../../src/components/Footer';
import { BrandProvider } from '../../src/hooks/useCurrentBrand';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(
      <BrandProvider>
        <Footer />
      </BrandProvider>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <BrandProvider>
        <Footer />
      </BrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
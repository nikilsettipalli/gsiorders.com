import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import TopBanner from '../../src/components/TopBanner';
import { BrandProvider } from '../../src/hooks/useCurrentBrand';

describe('TopBanner', () => {
  it('renders without crashing', () => {
    render(
      <BrandProvider>
        <TopBanner />
      </BrandProvider>
    );
    expect(screen.getByTestId('top-banner')).toBeInTheDocument();
    expect(screen.getByText(/Fast shipping/i)).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <BrandProvider>
        <TopBanner />
      </BrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
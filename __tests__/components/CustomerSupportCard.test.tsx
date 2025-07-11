import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import CustomerSupportCard from '../../src/components/CustomerSupportCard';
import { BrandProvider } from '../../src/hooks/useCurrentBrand';

describe('CustomerSupportCard', () => {
  it('renders without crashing', () => {
    render(
      <BrandProvider>
        <CustomerSupportCard />
      </BrandProvider>
    );
    expect(screen.getByTestId('customer-support-card')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <BrandProvider>
        <CustomerSupportCard />
      </BrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
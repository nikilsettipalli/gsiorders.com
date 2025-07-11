import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import ComplianceGrid from '../../src/components/ComplianceGrid';
import { BrandProvider } from '../../src/hooks/useCurrentBrand';

describe('ComplianceGrid', () => {
  it('renders without crashing', () => {
    render(
      <BrandProvider>
        <ComplianceGrid />
      </BrandProvider>
    );
    expect(screen.getByTestId('compliance-grid')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <BrandProvider>
        <ComplianceGrid />
      </BrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
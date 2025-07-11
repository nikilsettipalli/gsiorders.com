import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import EducationalBlogCards from '../../src/components/EducationalBlogCards';
import { BrandProvider } from '../../src/hooks/useCurrentBrand';

describe('EducationalBlogCards', () => {
  it('renders without crashing', () => {
    render(
      <BrandProvider>
        <EducationalBlogCards />
      </BrandProvider>
    );
    expect(screen.getByTestId('educational-blog-cards')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <BrandProvider>
        <EducationalBlogCards />
      </BrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
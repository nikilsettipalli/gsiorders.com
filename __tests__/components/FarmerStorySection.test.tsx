import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import FarmerStorySection from '../../src/components/FarmerStorySection';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('FarmerStorySection', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <FarmerStorySection />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('farmer-story-section')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <FarmerStorySection />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays story content', () => {
    render(
      <MockBrandProvider>
        <FarmerStorySection />
      </MockBrandProvider>
    );
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
  });
}); 
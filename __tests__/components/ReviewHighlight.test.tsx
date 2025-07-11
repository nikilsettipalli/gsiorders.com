import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import ReviewHighlight from '../../src/components/ReviewHighlight';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('ReviewHighlight', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <ReviewHighlight />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('review-highlight')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <ReviewHighlight />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays review content', () => {
    render(
      <MockBrandProvider>
        <ReviewHighlight />
      </MockBrandProvider>
    );
    expect(screen.getByText(/customer reviews/i)).toBeInTheDocument();
  });
}); 
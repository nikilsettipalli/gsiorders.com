import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import RewardsCTA from '../../src/components/RewardsCTA';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('RewardsCTA', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <RewardsCTA />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('rewards-cta')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <RewardsCTA />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays rewards content', () => {
    render(
      <MockBrandProvider>
        <RewardsCTA />
      </MockBrandProvider>
    );
    expect(screen.getByText(/join our rewards/i)).toBeInTheDocument();
  });
}); 
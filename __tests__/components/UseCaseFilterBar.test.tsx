import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import UseCaseFilterBar from '../../src/components/UseCaseFilterBar';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('UseCaseFilterBar', () => {
  it('renders without crashing', () => {
    render(
      <MockBrandProvider>
        <UseCaseFilterBar />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('usecase-filter-bar')).toBeInTheDocument();
    expect(screen.getByText('Party')).toBeInTheDocument();
    expect(screen.getByText('Relax')).toBeInTheDocument();
    expect(screen.getByText('Mixer')).toBeInTheDocument();
    expect(screen.getByText('Classic')).toBeInTheDocument();
  });

  it('handles single selection by default', () => {
    const mockOnChange = jest.fn();
    render(
      <MockBrandProvider>
        <UseCaseFilterBar onChange={mockOnChange} />
      </MockBrandProvider>
    );
    
    fireEvent.click(screen.getByTestId('usecase-pill-party'));
    expect(mockOnChange).toHaveBeenCalledWith(['party']);
    
    fireEvent.click(screen.getByTestId('usecase-pill-relax'));
    expect(mockOnChange).toHaveBeenCalledWith(['relax']);
  });

  it('handles multi-selection when multi=true', () => {
    const mockOnChange = jest.fn();
    render(
      <MockBrandProvider>
        <UseCaseFilterBar multi={true} onChange={mockOnChange} />
      </MockBrandProvider>
    );
    
    fireEvent.click(screen.getByTestId('usecase-pill-party'));
    expect(mockOnChange).toHaveBeenCalledWith(['party']);
    
    fireEvent.click(screen.getByTestId('usecase-pill-relax'));
    expect(mockOnChange).toHaveBeenCalledWith(['party', 'relax']);
  });

  it('deselects when clicking selected item', () => {
    const mockOnChange = jest.fn();
    render(
      <MockBrandProvider>
        <UseCaseFilterBar selected={['party']} onChange={mockOnChange} />
      </MockBrandProvider>
    );
    
    fireEvent.click(screen.getByTestId('usecase-pill-party'));
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <UseCaseFilterBar />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has correct ARIA attributes', () => {
    render(
      <MockBrandProvider>
        <UseCaseFilterBar selected={['party']} />
      </MockBrandProvider>
    );
    
    expect(screen.getByLabelText('Use Case Filter')).toBeInTheDocument();
    expect(screen.getByTestId('usecase-pill-party')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('usecase-pill-relax')).toHaveAttribute('aria-pressed', 'false');
  });

  it('applies custom className', () => {
    render(
      <MockBrandProvider>
        <UseCaseFilterBar className="custom-class" />
      </MockBrandProvider>
    );
    
    expect(screen.getByTestId('usecase-filter-bar')).toHaveClass('custom-class');
  });
}); 
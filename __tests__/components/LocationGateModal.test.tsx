import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import LocationGateModal from '../../src/components/LocationGateModal';

const MockBrandProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-brand="liquidheaven">{children}</div>
);

describe('LocationGateModal', () => {
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
  });

  it('renders when open is true', () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    expect(screen.getByTestId('location-gate-modal')).toBeInTheDocument();
    expect(screen.getByText('Welcome to GSI Orders')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={false} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    expect(screen.queryByTestId('location-gate-modal')).not.toBeInTheDocument();
  });

  it('has proper modal attributes', () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    const modal = screen.getByTestId('location-gate-modal');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-label', 'Location Gate Modal');
  });

  it('shows error when trying to confirm without age verification', async () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    
    const stateSelect = screen.getByTestId('state-select');
    fireEvent.change(stateSelect, { target: { value: 'California' } });
    
    const confirmButton = screen.getByTestId('location-gate-confirm');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('location-gate-error')).toHaveTextContent('You must confirm you are 21+');
    });
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('shows error when trying to confirm without state selection', async () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    
    const ageCheckbox = screen.getByTestId('age-checkbox');
    fireEvent.click(ageCheckbox);
    
    const confirmButton = screen.getByTestId('location-gate-confirm');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('location-gate-error')).toHaveTextContent('Please select your state');
    });
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm with selected state when form is valid', async () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    
    const ageCheckbox = screen.getByTestId('age-checkbox');
    fireEvent.click(ageCheckbox);
    
    const stateSelect = screen.getByTestId('state-select');
    fireEvent.change(stateSelect, { target: { value: 'California' } });
    
    const confirmButton = screen.getByTestId('location-gate-confirm');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledWith('California');
    });
  });

  it('disables confirm button when form is incomplete', () => {
    render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    
    const confirmButton = screen.getByTestId('location-gate-confirm');
    expect(confirmButton).toBeDisabled();
  });

  it('is accessible', async () => {
    const { container } = render(
      <MockBrandProvider>
        <LocationGateModal open={true} onConfirm={mockOnConfirm} />
      </MockBrandProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MegaMenuDropdown from '../../src/components/MegaMenuDropdown';

// Mock the useCurrentBrand hook
jest.mock('../../src/hooks/useCurrentBrand', () => ({
  useCurrentBrand: () => ({
    brand: { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' }
  })
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, onClick, className, onMouseEnter }: any) {
    return (
      <a href={href} onClick={onClick} className={className} onMouseEnter={onMouseEnter}>
        {children}
      </a>
    );
  };
});

// Mock Image constructor for preloading tests
const mockImage = {
  onload: null as any,
  onerror: null as any,
  src: '',
};

Object.defineProperty(global, 'Image', {
  value: jest.fn(() => mockImage),
  writable: true,
});

describe('MegaMenuDropdown', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    jest.clearAllMocks();
    // Reset timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <MegaMenuDropdown isOpen={false} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders mega menu when isOpen is true', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    // Check for main sections
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.getByText('Shop by Mood')).toBeInTheDocument();
    expect(screen.getByText('Shop by Potency')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('displays category links correctly', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Beverages')).toBeInTheDocument();
    expect(screen.getByText('Tinctures')).toBeInTheDocument();
    expect(screen.getByText('Topicals')).toBeInTheDocument();
    expect(screen.getByText('Concentrates')).toBeInTheDocument();
    expect(screen.getByText('Sexual Enhancers')).toBeInTheDocument();
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('displays mood options with emojis', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Relaxed')).toBeInTheDocument();
    expect(screen.getByText('Focused')).toBeInTheDocument();
    expect(screen.getByText('Energized')).toBeInTheDocument();
    expect(screen.getByText('Creative')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('Sleepy')).toBeInTheDocument();
    expect(screen.getByText('Happy')).toBeInTheDocument();
    expect(screen.getByText('Calm')).toBeInTheDocument();
  });

  it('displays potency options with strength indicators', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Mild')).toBeInTheDocument();
    expect(screen.getByText('5-10mg')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('10-25mg')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('25mg+')).toBeInTheDocument();
  });

  it('displays more section links', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Best Sellers')).toBeInTheDocument();
    expect(screen.getByText('New Products')).toBeInTheDocument();
    expect(screen.getByText('Bundles')).toBeInTheDocument();
    expect(screen.getByText('Gift Cards')).toBeInTheDocument();
  });

  it('displays featured banner', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('New Customer? Get 20% Off')).toBeInTheDocument();
    expect(screen.getByText('Use code WELCOME20 on your first order')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const backdrop = document.querySelector('.fixed.inset-0.z-40');
    expect(backdrop).toBeInTheDocument();
    
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when a menu link is clicked', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const beveragesLink = screen.getByText('Beverages');
    fireEvent.click(beveragesLink);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const menuContainer = screen.getByRole('menu');
    expect(menuContainer).toHaveAttribute('aria-label', 'Product navigation menu');
    
    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();
  });

  it('displays default cannabis image initially', () => {
    render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
    
    const cannabisImage = screen.getByAltText('Premium cannabis products');
    expect(cannabisImage).toBeInTheDocument();
    expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1506905925346-21bda4d32df4'));
  });

  describe('Dynamic Image Switching', () => {
    it('preloads images when menu opens', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      await waitFor(() => {
        expect(global.Image).toHaveBeenCalledTimes(6); // 6 category images
      });
    });

    it('changes image when hovering over Beverages category', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const beveragesLink = screen.getByText('Beverages');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      // Initially shows default image
      expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1506905925346-21bda4d32df4'));
      
      // Hover over Beverages
      fireEvent.mouseEnter(beveragesLink);
      
      // Fast-forward the timeout
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1544145945-f90425340c7e'));
      });
    });

    it('changes image when hovering over Tinctures category', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const tincturesLink = screen.getByText('Tinctures');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      fireEvent.mouseEnter(tincturesLink);
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1615671524827-c1fe3973b648'));
      });
    });

    it('changes image when hovering over Topicals category', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const topicalsLink = screen.getByText('Topicals');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      fireEvent.mouseEnter(topicalsLink);
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1556228720-195a672e8a03'));
      });
    });

    it('changes image when hovering over Concentrates category', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const concentratesLink = screen.getByText('Concentrates');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      fireEvent.mouseEnter(concentratesLink);
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1618177707446-3b4ba094717d'));
      });
    });

    it('changes image when hovering over Sexual Enhancers category', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const sexualEnhancersLink = screen.getByText('Sexual Enhancers');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      fireEvent.mouseEnter(sexualEnhancersLink);
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1571019613454-1cb2f99b2d8b'));
      });
    });

    it('resets to default image when leaving category area', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const beveragesLink = screen.getByText('Beverages');
      const categorySection = beveragesLink.closest('.space-y-4');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      // Hover over Beverages to change image
      fireEvent.mouseEnter(beveragesLink);
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1544145945-f90425340c7e'));
      });
      
      // Leave the category section
      if (categorySection) {
        fireEvent.mouseLeave(categorySection);
        act(() => {
          jest.advanceTimersByTime(150);
        });
        
        await waitFor(() => {
          expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1506905925346-21bda4d32df4'));
        });
      }
    });

    it('applies fade transition classes during image switching', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      // Check for transition classes
      expect(cannabisImage).toHaveClass('transition-opacity', 'duration-300', 'ease-in-out');
    });

    it('handles image loading errors gracefully', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      // Simulate image error
      fireEvent.error(cannabisImage);
      
      // Should fallback to default image
      await waitFor(() => {
        expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('photo-1506905925346-21bda4d32df4'));
      });
    });

    it('adds hover scale effect to category links', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const beveragesLink = screen.getByText('Beverages');
      
      expect(beveragesLink).toHaveClass('hover:scale-105', 'transform');
    });

    it('does not change image when hovering over non-category items', async () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const relaxedLink = screen.getByText('Relaxed');
      const cannabisImage = screen.getByAltText('Premium cannabis products');
      
      const initialSrc = cannabisImage.getAttribute('src');
      
      // Hover over mood item (should not change image)
      fireEvent.mouseEnter(relaxedLink);
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      
      // Image should remain the same
      expect(cannabisImage).toHaveAttribute('src', initialSrc);
    });

    it('maintains image overlay and text content', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('Premium Quality')).toBeInTheDocument();
      expect(screen.getByText('Lab tested & certified')).toBeInTheDocument();
      
      // Check for gradient overlay
      const imageContainer = screen.getByText('Premium Quality').closest('.relative');
      const overlay = imageContainer?.querySelector('.absolute.inset-0.bg-gradient-to-t');
      expect(overlay).toBeInTheDocument();
    });
  });
}); 
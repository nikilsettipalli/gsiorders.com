import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MegaMenuDropdown from '../../src/components/MegaMenuDropdown';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, onClick, ...props }: any) {
    return <a href={href} onClick={onClick} {...props}>{children}</a>;
  };
});

describe('MegaMenuDropdown', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Basic Functionality', () => {
    it('renders when isOpen is true', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('SHOP BY CATEGORY')).toBeInTheDocument();
      expect(screen.getByText('SHOP BY MOOD')).toBeInTheDocument();
      expect(screen.getByText('SHOP BY POTENCY')).toBeInTheDocument();
      expect(screen.getByText('MORE')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<MegaMenuDropdown isOpen={false} onClose={mockOnClose} />);
      
      expect(screen.queryByText('SHOP BY CATEGORY')).not.toBeInTheDocument();
    });
  });

  describe('Category Section', () => {
    it('renders all category items correctly', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const expectedCategories = [
        'Gummies', 'Flower', 'Edibles', 'Beverages', 'Pre-Rolls',
        'Concentrates', 'Vapes', 'Merch', 'All Products'
      ];

      expectedCategories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('has correct links for category items', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const gummiesLink = screen.getByText('Gummies');
      expect(gummiesLink.closest('a')).toHaveAttribute('href', '/products?category=gummies');
      
      const flowerLink = screen.getByText('Flower');
      expect(flowerLink.closest('a')).toHaveAttribute('href', '/products?category=flower');
    });
  });

  describe('Mood Section', () => {
    it('renders all mood items correctly', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const expectedMoods = [
        'Aroused', 'Sleepy', 'Classic High', 'Happy', 'Energized',
        'Chill', 'Soothing', 'Focused', 'Creative', 'Social'
      ];

      expectedMoods.forEach(mood => {
        expect(screen.getByText(mood)).toBeInTheDocument();
      });
    });

    it('has correct links for mood items', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const arousalLink = screen.getByText('Aroused');
      expect(arousalLink.closest('a')).toHaveAttribute('href', '/products?mood=aroused');
      
      const happyLink = screen.getByText('Happy');
      expect(happyLink.closest('a')).toHaveAttribute('href', '/products?mood=happy');
    });
  });

  describe('Potency Section', () => {
    it('renders all potency levels with indicators', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('Mild Potency')).toBeInTheDocument();
      expect(screen.getByText('Medium Potency')).toBeInTheDocument();
      expect(screen.getByText('High Potency')).toBeInTheDocument();
    });

    it('has correct links for potency levels', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const mildLink = screen.getByText('Mild Potency');
      expect(mildLink.closest('a')).toHaveAttribute('href', '/products?potency=mild');
      
      const highLink = screen.getByText('High Potency');
      expect(highLink.closest('a')).toHaveAttribute('href', '/products?potency=high');
    });
  });

  describe('More Section', () => {
    it('renders all "more" items correctly', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const expectedMoreItems = [
        'Best Sellers', 'New', 'Bundles', 'Summer Collection', 'Mindful Bakery'
      ];

      expectedMoreItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('renders promotional banner', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('New Customer?')).toBeInTheDocument();
      expect(screen.getByText('Get 20% Off Your First Order')).toBeInTheDocument();
    });

    it('has correct links for "more" items', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const bestSellersLink = screen.getByText('Best Sellers');
      expect(bestSellersLink.closest('a')).toHaveAttribute('href', '/products?collection=best-sellers');
      
      const bundlesLink = screen.getByText('Bundles');
      expect(bundlesLink.closest('a')).toHaveAttribute('href', '/products?collection=bundles');
    });
  });

  describe('Cannabis Image', () => {
    it('renders cannabis image with correct attributes', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const cannabisImage = screen.getByAltText('Premium Cannabis');
      expect(cannabisImage).toBeInTheDocument();
      expect(cannabisImage).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
    });
  });

  describe('Styling and Layout', () => {
    it('has proper grid layout classes', () => {
      const { container } = render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const gridContainer = container.querySelector('.grid.grid-cols-5');
      expect(gridContainer).toBeInTheDocument();
    });

    it('has proper styling classes for hover effects', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const categoryLinks = screen.getAllByText('Gummies')[0].closest('a');
      expect(categoryLinks).toHaveClass('hover:text-emerald-600');
    });

    it('has proper background and shadow styling', () => {
      const { container } = render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const dropdown = container.firstChild as HTMLElement;
      expect(dropdown).toHaveClass('bg-white', 'shadow-xl', 'border-t', 'border-gray-100');
    });
  });

  describe('Interaction', () => {
    it('calls onClose when link is clicked', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const gummiesLink = screen.getByText('Gummies');
      fireEvent.click(gummiesLink);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose for multiple different links', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      fireEvent.click(screen.getByText('Flower'));
      fireEvent.click(screen.getByText('Happy'));
      fireEvent.click(screen.getByText('Best Sellers'));
      
      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('SHOP BY CATEGORY')).toBeInTheDocument();
      expect(screen.getByText('SHOP BY MOOD')).toBeInTheDocument();
      expect(screen.getByText('SHOP BY POTENCY')).toBeInTheDocument();
      expect(screen.getByText('MORE')).toBeInTheDocument();
    });

    it('has proper alt text for cannabis image', () => {
      render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const image = screen.getByAltText('Premium Cannabis');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive container classes', () => {
      const { container } = render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const maxWidthContainer = container.querySelector('.max-w-7xl');
      expect(maxWidthContainer).toBeInTheDocument();
    });

    it('has proper spacing classes', () => {
      const { container } = render(<MegaMenuDropdown isOpen={true} onClose={mockOnClose} />);
      
      const paddingContainer = container.querySelector('.p-8');
      expect(paddingContainer).toBeInTheDocument();
    });
  });
}); 
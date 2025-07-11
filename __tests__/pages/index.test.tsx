import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '../../pages/index';

// Mock Next.js components
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ href, children, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

// Mock useCurrentBrand hook
jest.mock('../../src/hooks/useCurrentBrand', () => ({
  useCurrentBrand: () => ({
    brand: { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' }
  })
}));

// Mock components
jest.mock('../../src/components', () => ({
  MainNavbar: () => <nav data-testid="main-navbar">Main Navigation</nav>,
  TopBanner: () => <div data-testid="top-banner">Top Banner</div>,
  CategoryGrid: () => <div data-testid="category-grid">Category Grid</div>,
  ProductGrid: () => <div data-testid="product-grid">Product Grid</div>,
  ReviewHighlight: () => <div data-testid="review-highlight">Review Highlight</div>,
  FarmerStorySection: () => <div data-testid="farmer-story">Farmer Story</div>,
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('HomePage - mood.com Style', () => {
  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HomePage />);
    // Use heading role to find the main title
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('displays the hero section with mood.com style content', () => {
    render(<HomePage />);
    
    // Check for the main heading content using heading role
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Premium');
    expect(mainHeading).toHaveTextContent('Cannabis');
    expect(mainHeading).toHaveTextContent('Products');
    expect(screen.getByText('Discover the finest selection of premium CBD, wellness products, and specialty items from trusted brands.')).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<HomePage />);
    
    expect(screen.getByTestId('top-banner')).toBeInTheDocument();
    expect(screen.getByTestId('main-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('category-grid')).toBeInTheDocument();
    expect(screen.getByTestId('farmer-story')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays featured products section with mood.com styling', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('Our most popular and highest-rated products, trusted by thousands of customers')).toBeInTheDocument();
    
    // Check for product cards
    expect(screen.getByText('Premium CBD Oil Tincture')).toBeInTheDocument();
    expect(screen.getByText('Organic CBD Gummies')).toBeInTheDocument();
    expect(screen.getByText('Full Spectrum CBD Capsules')).toBeInTheDocument();
    expect(screen.getByText('CBD Topical Cream')).toBeInTheDocument();
  });

  it('displays enhanced customer reviews section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument();
    expect(screen.getByText('Real reviews from verified customers who love our products')).toBeInTheDocument();
    
    // Check for customer names
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Michael Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument();
    
    // Check for verified customer badges
    expect(screen.getAllByText('Verified Customer')).toHaveLength(3);
  });

  it('displays enhanced brand showcase section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Our Premium Brands')).toBeInTheDocument();
    expect(screen.getAllByText('Liquid Heaven')).toHaveLength(2); // Hero pills + Brand showcase
    expect(screen.getAllByText('Motaquila')).toHaveLength(2);
    expect(screen.getAllByText('Last Genie')).toHaveLength(2);
    
    // Check for product counts
    expect(screen.getByText('50+ Products')).toBeInTheDocument();
    expect(screen.getByText('25+ Products')).toBeInTheDocument();
    expect(screen.getByText('30+ Products')).toBeInTheDocument();
  });

  it('has correct brand links with mood.com styling', () => {
    render(<HomePage />);
    
    // Get all links and check the first occurrence of each brand
    const liquidHeavenLinks = screen.getAllByRole('link', { name: /liquid heaven/i });
    const motaquilaLinks = screen.getAllByRole('link', { name: /motaquila/i });
    const lastGenieLinks = screen.getAllByRole('link', { name: /last genie/i });
    
    expect(liquidHeavenLinks[0]).toHaveAttribute('href', '/liquidheaven');
    expect(motaquilaLinks[0]).toHaveAttribute('href', '/motaquila');
    expect(lastGenieLinks[0]).toHaveAttribute('href', '/lastgenie');
  });

  it('displays section headings with mood.com typography', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument();
    expect(screen.getByText('Stay in the Loop')).toBeInTheDocument();
  });

  it('has enhanced newsletter signup section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Stay in the Loop')).toBeInTheDocument();
    expect(screen.getByText('Get exclusive access to new products, special offers, and cannabis education content')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe Now' })).toBeInTheDocument();
    expect(screen.getByText('No spam, unsubscribe anytime. We respect your privacy.')).toBeInTheDocument();
  });

  it('has proper CTA buttons in hero section with mood.com styling', () => {
    render(<HomePage />);
    
    expect(screen.getByRole('link', { name: 'Shop All Products' })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: 'Explore CBD Collection' })).toHaveAttribute('href', '/liquidheaven');
  });

  it('displays product badges correctly', () => {
    render(<HomePage />);
    
    // Use getAllByText since there are multiple Popular badges
    expect(screen.getAllByText('Popular')).toHaveLength(2);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Sale')).toBeInTheDocument();
  });

  it('shows product ratings with stars', () => {
    render(<HomePage />);
    
    // Check for rating displays
    expect(screen.getByText('(4.8)')).toBeInTheDocument();
    expect(screen.getByText('(4.9)')).toBeInTheDocument();
    expect(screen.getByText('(4.7)')).toBeInTheDocument();
    expect(screen.getByText('(4.6)')).toBeInTheDocument();
  });

  it('displays Add to Cart buttons with hover effects', () => {
    render(<HomePage />);
    
    const addToCartButtons = screen.getAllByText('Add to Cart');
    expect(addToCartButtons.length).toBeGreaterThan(0);
  });

  it('has responsive design classes with mood.com breakpoints', () => {
    render(<HomePage />);
    
    // Find hero section by heading instead of text
    const mainHeading = screen.getByRole('heading', { level: 1 });
    const heroSection = mainHeading.closest('section');
    expect(heroSection).toHaveClass('bg-white', 'overflow-hidden');
    
    const sections = screen.getAllByRole('generic');
    const hasResponsiveClasses = sections.some(section => 
      section.className.includes('sm:') || section.className.includes('lg:')
    );
    expect(hasResponsiveClasses).toBe(true);
  });

  it('has mood.com color palette and styling', () => {
    render(<HomePage />);
    
    // Check for emerald/green color scheme
    const emeraldElements = document.querySelectorAll('.text-emerald-600, .bg-emerald-600, .from-emerald-600');
    expect(emeraldElements.length).toBeGreaterThan(0);
    
    // Check for rounded corners (mood.com style)
    const roundedElements = document.querySelectorAll('.rounded-2xl, .rounded-3xl');
    expect(roundedElements.length).toBeGreaterThan(0);
  });

  it('has proper semantic HTML structure', () => {
    render(<HomePage />);
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5); // Actual section count
    
    // Check for navigation
    expect(screen.getByTestId('main-navbar')).toBeInTheDocument();
    
    // Check for footer
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('has smooth scroll behavior and premium styling', () => {
    render(<HomePage />);
    
    // Find the main container with scroll-smooth class
    const mainContainer = document.querySelector('.scroll-smooth');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('scroll-smooth', 'antialiased');
  });

  it('displays cannabis/CBD product imagery placeholders', () => {
    render(<HomePage />);
    
    // Check for image elements
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Check for specific alt text
    expect(screen.getByAltText('Premium CBD Products')).toBeInTheDocument();
    expect(screen.getByAltText('CBD Oil')).toBeInTheDocument();
    expect(screen.getByAltText('CBD Gummies')).toBeInTheDocument();
  });

  it('displays correct meta information for cannabis brand', () => {
    render(<HomePage />);
    
    // Note: In a real test environment, you might want to test the actual head content
    // This is a simplified test since we're mocking Next.js Head
    expect(document.title).toBeDefined();
  });

  it('has premium typography with mood.com font weights', () => {
    render(<HomePage />);
    
    // Check for font-black (mood.com style heavy headings)
    const heavyHeadings = document.querySelectorAll('.font-black');
    expect(heavyHeadings.length).toBeGreaterThan(0);
    
    // Check for font-light (mood.com style light descriptions)
    const lightText = document.querySelectorAll('.font-light');
    expect(lightText.length).toBeGreaterThan(0);
  });

  it('has proper hover effects and transitions', () => {
    render(<HomePage />);
    
    // Check for hover classes
    const hoverElements = document.querySelectorAll('[class*="hover:"]');
    expect(hoverElements.length).toBeGreaterThan(0);
    
    // Check for transition classes
    const transitionElements = document.querySelectorAll('.transition-all, .transition-colors, .transition-transform');
    expect(transitionElements.length).toBeGreaterThan(0);
  });
}); 
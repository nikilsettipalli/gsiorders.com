import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 10,
    images: null,
    inventory_count: 5,
    brands: { name: 'Test Brand', slug: 'test' }
  };

  it('uses fallback image when no images provided', () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText('Test Product');
    expect(img).toHaveAttribute('src', '/images/placeholder-product.svg');
  });

  it('renders out of stock overlay when inventory is 0', () => {
    const zeroStock = { ...mockProduct, inventory_count: 0 };
    render(<ProductCard product={zeroStock} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
}); 
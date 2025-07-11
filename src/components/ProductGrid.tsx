import React, { useEffect, useState } from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ProductGridProps {
  userRole?: 'user' | 'admin' | 'rep';
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ userRole = 'user', className = '' }) => {
  const [products, setProducts] = useState<ProductCardProps['product'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, images, inventory_count, brands (name, slug), badge, rating, type')
          .eq('type', 'beverage')
          .gt('inventory_count', 0);
        if (error) throw error;
        setProducts(data || []);
      } catch (err: any) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`} data-testid="product-grid-loading">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" data-testid="product-skeleton" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-error text-center py-8" data-testid="product-grid-error">{error}</div>;
  }

  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      aria-label="Product Grid"
      data-testid="product-grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} userRole={userRole} />
      ))}
    </section>
  );
};

export default ProductGrid; 
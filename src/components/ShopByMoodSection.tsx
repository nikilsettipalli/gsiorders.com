import React, { useState, useEffect } from 'react';
import UseCaseFilterBar from './UseCaseFilterBar';
import ProductCard, { ProductCardProps } from './ProductCard';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const moods = [
  { key: 'party', label: 'Party' },
  { key: 'relax', label: 'Relax' },
  { key: 'mixer', label: 'Mixer' },
  { key: 'classic', label: 'Classic' },
];

interface ShopByMoodSectionProps {
  userRole?: 'user' | 'admin' | 'rep';
  className?: string;
}

const ShopByMoodSection: React.FC<ShopByMoodSectionProps> = ({ userRole = 'user', className = '' }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductCardProps['product'][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selected.length === 0) {
      setProducts([]);
      return;
    }
    setLoading(true);
    setError(null);
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, images, inventory_count, brands (name, slug), badge, rating, type, moods')
          .eq('type', 'beverage')
          .overlaps('moods', selected);
        if (error) throw error;
        // Map brands array to brands object for ProductCard
        const mapped = (data || []).map((p: any) => ({
          ...p,
          brands: Array.isArray(p.brands) ? p.brands[0] : p.brands,
        }));
        setProducts(mapped);
      } catch (err: any) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selected]);

  return (
    <section className={`my-8 ${className}`} aria-label="Shop By Mood" data-testid="shop-by-mood-section">
      <h2 className="text-xl font-bold text-brand-primary mb-3">Shop by Mood</h2>
      <UseCaseFilterBar selected={selected} onChange={setSelected} multi className="mb-4" />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="mood-grid-loading">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" data-testid="mood-skeleton" />
          ))}
        </div>
      ) : error ? (
        <div className="text-error text-center py-8" data-testid="mood-grid-error">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="mood-product-grid">
          {products.length === 0 ? (
            <div className="col-span-full text-gray-500 text-center py-8" data-testid="mood-empty">No products found for selected mood(s).</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} userRole={userRole} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default ShopByMoodSection; 
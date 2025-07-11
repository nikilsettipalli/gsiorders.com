import React from 'react';

const categories = [
  { key: 'ready-to-drink', label: 'Ready to Drink', icon: '🍹' },
  { key: 'mixers', label: 'Mixers', icon: '🥤' },
  { key: 'non-alcoholic', label: 'Non-Alcoholic', icon: '🧃' },
];

interface CategoryGridProps {
  onSelect?: (category: string) => void;
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelect, className = '' }) => (
  <section
    className={`grid grid-cols-1 sm:grid-cols-3 gap-4 w-full my-6 ${className}`}
    aria-label="Product Categories"
    data-testid="category-grid"
  >
    {categories.map((cat) => (
      <button
        key={cat.key}
        type="button"
        className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        onClick={() => onSelect?.(cat.key)}
        data-testid={`category-${cat.key}`}
        aria-label={cat.label}
      >
        <span className="text-3xl mb-2" aria-hidden="true">{cat.icon}</span>
        <span className="font-semibold text-brand-primary text-lg">{cat.label}</span>
      </button>
    ))}
  </section>
);

export default CategoryGrid; 
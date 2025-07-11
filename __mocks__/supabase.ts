// __mocks__/supabase.ts

export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  inventory_count: number;
  brand_id: string;
  brands?: { name: string; slug: string };
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type CartItem = {
  product_id: string;
  quantity: number;
  product: Product;
};

export const mockBrands: Brand[] = [
  { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' },
  { id: '2', name: 'Motaquila', slug: 'motaquila' },
  { id: '3', name: 'Last Genie', slug: 'lastgenie' },
];

export const mockProducts: Product[] = [
  {
    id: '101',
    name: 'Motaquila Classic Margarita',
    price: 19.99,
    images: ['/motaquila-margarita.webp'],
    inventory_count: 25,
    brand_id: '2',
    brands: { name: 'Motaquila', slug: 'motaquila' },
  },
  {
    id: '102',
    name: 'Liquid Heaven Sparkling Water',
    price: 3.99,
    images: ['/liquidheaven-sparkling.webp'],
    inventory_count: 100,
    brand_id: '1',
    brands: { name: 'Liquid Heaven', slug: 'liquidheaven' },
  },
  {
    id: '103',
    name: 'Last Genie Tonic',
    price: 5.99,
    images: ['/lastgenie-tonic.webp'],
    inventory_count: 50,
    brand_id: '3',
    brands: { name: 'Last Genie', slug: 'lastgenie' },
  },
];

export const mockCart: CartItem[] = [
  {
    product_id: '101',
    quantity: 2,
    product: mockProducts[0],
  },
];

export const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: (field: string, value: string) => ({
        data:
          table === 'products'
            ? mockProducts.filter((p) => p.brand_id === value)
            : table === 'brands'
            ? mockBrands.filter((b) => b.slug === value)
            : [],
        error: null,
      }),
      data: table === 'products' ? mockProducts : table === 'brands' ? mockBrands : [],
      error: null,
    }),
  }),
  // Add more mock methods as needed
}; 
// src/hooks/useCurrentBrand.ts
import { useMemo } from 'react';

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

const BRANDS: Brand[] = [
  { id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' },
  { id: '2', name: 'Motaquila', slug: 'motaquila' },
  { id: '3', name: 'Last Genie', slug: 'lastgenie' },
];

function getBrandFromQuery(): Brand {
  if (typeof window === 'undefined') return BRANDS[0];
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('brand') || (window as any).STORYBOOK_BRAND;
  return (
    BRANDS.find((b) => b.slug === slug) || BRANDS[0]
  );
}

export function useCurrentBrand(): { brand: Brand } {
  const brand = useMemo(() => getBrandFromQuery(), []);
  return { brand };
} 
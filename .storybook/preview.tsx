// .storybook/preview.tsx
import React from 'react';
import type { Preview } from '@storybook/react';
import { useCurrentBrand, Brand } from '../src/hooks/useCurrentBrand';

const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { brand } = useCurrentBrand();
  React.useEffect(() => {
    document.body.setAttribute('data-brand', brand.slug);
  }, [brand.slug]);
  return <>{children}</>;
};

const preview: Preview = {
  decorators: [
    (Story) => <BrandProvider><Story /></BrandProvider>,
  ],
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Brand theme',
      defaultValue: 'liquidheaven',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'liquidheaven', title: 'Liquid Heaven' },
          { value: 'motaquila', title: 'Motaquila' },
          { value: 'lastgenie', title: 'Last Genie' },
        ],
      },
    },
  },
};

export default preview; 
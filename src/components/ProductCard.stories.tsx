import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import { mockProducts } from '../../__mocks__/supabase';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    userRole: {
      control: 'select',
      options: ['user', 'admin', 'rep'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProducts[0],
    userRole: 'user',
  },
};

export const AdminView: Story = {
  args: {
    product: mockProducts[0],
    userRole: 'admin',
  },
};

export const OutOfStock: Story = {
  args: {
    product: { ...mockProducts[0], inventory_count: 0 },
    userRole: 'user',
  },
};

export const Mobile: Story = {
  args: {
    product: mockProducts[0],
    userRole: 'user',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 
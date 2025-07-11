import type { Meta, StoryObj } from '@storybook/react';
import TopBanner from './TopBanner';

const meta: Meta<typeof TopBanner> = {
  title: 'Components/TopBanner',
  component: TopBanner,
  parameters: {
    layout: 'fullwidth',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 
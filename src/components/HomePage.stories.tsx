import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '../../pages/index';
import { BrandProvider } from '../contexts/BrandContext';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main homepage featuring mood.com-inspired premium cannabis brand aesthetic with clean white backgrounds, cannabis/CBD product imagery, enhanced typography, and modern styling. Includes hero section with floating product cards, enhanced brand showcase, and premium visual hierarchy.'
      }
    }
  },
  decorators: [
    (Story) => (
      <BrandProvider>
        <Story />
      </BrandProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Homepage - mood.com Style',
  parameters: {
    docs: {
      description: {
        story: 'The premium homepage layout with mood.com aesthetic featuring clean white backgrounds, cannabis/CBD imagery, enhanced typography with mood.com font weights, green primary buttons with rounded corners, floating product images, and premium visual hierarchy.'
      }
    }
  }
};

export const LiquidHeavenBrand: Story = {
  name: 'Liquid Heaven Brand Context',
  decorators: [
    (Story) => (
      <BrandProvider initialBrand={{ id: '1', name: 'Liquid Heaven', slug: 'liquidheaven' }}>
        <Story />
      </BrandProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Homepage with Liquid Heaven brand context - features emerald green theming with mood.com styling, premium CBD product imagery, and cannabis brand aesthetic throughout the interface.'
      }
    }
  }
};

export const MotaquilaBrand: Story = {
  name: 'Motaquila Brand Context',
  decorators: [
    (Story) => (
      <BrandProvider initialBrand={{ id: '2', name: 'Motaquila', slug: 'motaquila' }}>
        <Story />
      </BrandProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Homepage with Motaquila brand context - features pink theming with mood.com styling, premium beverage product imagery, and modern brand aesthetic throughout the interface.'
      }
    }
  }
};

export const LastGenieBrand: Story = {
  name: 'Last Genie Brand Context',
  decorators: [
    (Story) => (
      <BrandProvider initialBrand={{ id: '3', name: 'Last Genie', slug: 'lastgenie' }}>
        <Story />
      </BrandProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Homepage with Last Genie brand context - features indigo theming with mood.com styling, premium specialty product imagery, and modern brand aesthetic throughout the interface.'
      }
    }
  }
};

export const MobileViewport: Story = {
  name: 'Mobile Viewport - mood.com Style',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Homepage optimized for mobile devices with mood.com responsive design, touch-friendly interactions, mobile-optimized typography, and premium cannabis brand aesthetic.'
      }
    }
  }
};

export const TabletViewport: Story = {
  name: 'Tablet Viewport - mood.com Style',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Homepage optimized for tablet devices with mood.com responsive grid layouts, appropriate spacing, and premium cannabis brand aesthetic for mid-size screens.'
      }
    }
  }
}; 
import React from 'react';
import Image from 'next/image';

interface FarmerStorySectionProps {
  name?: string;
  story?: string;
  imageUrl?: string;
  className?: string;
}

const FarmerStorySection: React.FC<FarmerStorySectionProps> = ({
  name = 'Sierra Valley Distillers',
  story = 'Our award-winning partners in California craft small-batch beverages with a focus on quality, sustainability, and local ingredients.',
  imageUrl = '/farmer-placeholder.jpg',
  className = '',
}) => (
  <section
    className={`flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow p-6 gap-6 my-8 ${className}`}
    aria-label="Supplier Highlight"
    data-testid="farmer-story-section"
  >
    <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
      <Image
        src={imageUrl}
        alt={name}
        width={128}
        height={128}
        className="object-cover w-full h-full"
        data-testid="farmer-image"
      />
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold text-brand-primary mb-1" data-testid="farmer-name">{name}</h3>
      <p className="text-gray-700" data-testid="farmer-story">{story}</p>
    </div>
  </section>
);

export default FarmerStorySection; 
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FarmerStorySectionProps {
  name?: string;
  story?: string;
  imageUrl?: string;
  className?: string;
}

const FarmerStorySection: React.FC<FarmerStorySectionProps> = ({
  name = 'Premium Partner Network',
  story = 'We partner with the finest farms and manufacturers across the country, ensuring every product meets our strict quality standards. From CBD farms to wellness product facilities, we source only the best.',
  imageUrl = '',
  className = '',
}) => (
  <Card className={`${className}`}>
    <CardContent className="p-8">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Image replacement with colored div */}
        <div className="w-32 h-32 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
          <div className="text-center text-white">
            <div className="text-4xl mb-1">🏭</div>
            <div className="text-xs font-semibold opacity-90">Partners</div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {name}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {story}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default FarmerStorySection; 
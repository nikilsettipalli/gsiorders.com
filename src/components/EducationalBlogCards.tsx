import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'CBD 101: Understanding Bioavailability',
    summary: 'Learn how our advanced formulation technology enhances CBD absorption for maximum benefits.',
    color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    href: '/blog/cbd-bioavailability',
    icon: '🌿'
  },
  {
    title: 'Dosage Guide: Finding Your Perfect Dose',
    summary: 'Discover how to determine the right CBD dosage for your wellness goals and lifestyle.',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    href: '/blog/dosage-guide',
    icon: '⚖️'
  },
  {
    title: 'Sustainable Hemp: Our Commitment to Quality',
    summary: 'How GSI Orders ensures environmental responsibility while maintaining premium product standards.',
    color: 'bg-gradient-to-br from-green-400 to-green-600',
    href: '/blog/sustainable-hemp',
    icon: '🌱'
  },
];

const EducationalBlogCards: React.FC = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Learn & Discover
      </h3>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Stay informed with our expert guides and educational content
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogPosts.map((post) => (
        <Card key={post.title} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-0">
            {/* Image replacement with colored gradient */}
            <div className={`h-48 ${post.color} flex items-center justify-center`}>
              <span className="text-6xl">{post.icon}</span>
            </div>
            
            <div className="p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {post.summary}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Read More
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default EducationalBlogCards; 
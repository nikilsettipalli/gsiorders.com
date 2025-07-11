import React from 'react';
import Image from 'next/image';

const blogPosts = [
  {
    title: 'CBD 101: Understanding Bioavailability',
    summary: 'Learn how our Amrit water-soluble technology enhances CBD absorption for maximum benefits.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&auto=format',
    href: '/blog/cbd-bioavailability',
  },
  {
    title: 'Dosage Guide: Finding Your Perfect Dose',
    summary: 'Discover how to determine the right CBD dosage for your wellness goals and lifestyle.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=250&fit=crop&auto=format',
    href: '/blog/dosage-guide',
  },
  {
    title: 'Sustainable Hemp: Our Commitment to Quality',
    summary: 'How GSI Orders partners with eco-friendly farms for premium, sustainable hemp products.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop&auto=format',
    href: '/blog/sustainable-hemp',
  },
];

const EducationalBlogCards: React.FC = () => (
  <section
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
    aria-label="Educational Blog Cards"
    data-testid="educational-blog-cards"
  >
    {blogPosts.map((post) => (
      <a
        key={post.href}
        href={post.href}
        className="bg-white rounded-2xl shadow hover:shadow-lg transition-all flex flex-col overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-primary"
        data-testid="blog-card"
      >
        <div className="relative w-full h-40">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            data-testid="blog-image"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h4 className="font-bold text-brand-primary text-lg mb-1" data-testid="blog-title">{post.title}</h4>
          <p className="text-gray-700 text-sm mb-2 flex-1" data-testid="blog-summary">{post.summary}</p>
          <span className="text-brand-accent font-medium mt-auto">Read More →</span>
        </div>
      </a>
    ))}
  </section>
);

export default EducationalBlogCards; 
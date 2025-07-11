import React from 'react';
import Image from 'next/image';

const blogPosts = [
  {
    title: 'Mixology 101: Crafting the Perfect Cocktail',
    summary: 'Learn the basics of mixing drinks and impress your guests with pro tips.',
    image: '/blog-mixology.jpg',
    href: '/blog/mixology-101',
  },
  {
    title: 'Non-Alcoholic Beverages for Every Occasion',
    summary: 'Discover delicious alcohol-free options for parties, brunch, and more.',
    image: '/blog-nonalc.jpg',
    href: '/blog/non-alcoholic-beverages',
  },
  {
    title: 'Sustainable Sourcing: Our Commitment',
    summary: 'How GSI Orders partners with eco-friendly suppliers and brands.',
    image: '/blog-sustain.jpg',
    href: '/blog/sustainable-sourcing',
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
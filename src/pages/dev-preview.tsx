import React, { useState } from 'react';
import { useCurrentBrand } from '../hooks/useCurrentBrand';
import {
  TopBanner,
  MainNavbar,
  LocationGateModal,
  CategoryGrid,
  UseCaseFilterBar,
  ProductGrid,
  RewardsCTA,
  ReviewHighlight,
  FarmerStorySection,
  ShopByMoodSection,
  ComplianceGrid,
  CustomerSupportCard,
  EducationalBlogCards,
  Footer,
} from '../components';

const DevPreview: React.FC = () => {
  const { brand } = useCurrentBrand();
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" data-brand={brand.slug}>
      <TopBanner />
      <MainNavbar />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Component Preview - {brand.name}</h2>
          <button
            onClick={() => setShowLocationModal(true)}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg mb-6"
          >
            Show Location Modal
          </button>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Category Grid</h3>
          <CategoryGrid onSelect={(cat) => console.log('Selected:', cat)} />
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Use Case Filter Bar</h3>
          <UseCaseFilterBar 
            multi={true}
            onChange={(selected) => console.log('Selected use cases:', selected)}
          />
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Product Grid</h3>
          <ProductGrid userRole="user" />
        </section>

        <RewardsCTA />
        <ReviewHighlight />
        <FarmerStorySection />
        <ShopByMoodSection />
        <ComplianceGrid />
        <CustomerSupportCard />
        <EducationalBlogCards />
      </main>

      <Footer />

      {showLocationModal && (
        <LocationGateModal
          open={showLocationModal}
          onConfirm={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
};

export default DevPreview; 
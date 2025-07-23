
import React from 'react';

import { AboutHeroSection } from '@/components/pages/about/AboutHeroSection';
import { MissionValuesSection } from '@/components/pages/about/MissionValuesSection';
import { ProductRangeSection } from '@/components/pages/about/ProductRangeSection';
import { BrandsPartnershipSection } from '@/components/pages/about/BrandsPartnershipSection';
import { WhyChooseUsSection } from '@/components/pages/about/WhyChooseUsSection';




// Main About Page Component
export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHeroSection />
      <MissionValuesSection />
      <ProductRangeSection />
      <BrandsPartnershipSection />
      <WhyChooseUsSection />
    </div>
  );
}
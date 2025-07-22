import { BrandsPartnersSection } from "@/components/sections/brands/BrandsPartnersSection";
import { AboutExpertiseSection } from "@/components/sections/catalog/ProductCatalogSection";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { ServicesModernSection } from "@/components/sections/services/ServicesModernSection";

export default function HomePage() {
  return (
    <>
    <HeroSection />
      <BrandsPartnersSection/>
    <AboutExpertiseSection/>
    <ServicesModernSection/>
    

    </>
    
  );
}

import { ContactFormSection } from '@/components/pages/contacts/ContactFormSection';
import { ContactHeroSection } from '@/components/pages/contacts/ContactHeroSection';
import { ContactInfoSection } from '@/components/pages/contacts/ContactInfoSection';
import { LocationHoursSection } from '@/components/pages/contacts/LocationHoursSection';
import React from 'react';



// Main Contacts Page Component
export default function ContactsPage() {
  return (
    <div className="bg-white">
      <ContactHeroSection />
      <ContactInfoSection />
      <LocationHoursSection />
      <ContactFormSection />
    </div>
  );
}
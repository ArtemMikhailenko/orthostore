
import { ContactFormSection } from '@/components/pages/contacts/ContactFormSection';
import { ContactHeroSection } from '@/components/pages/contacts/ContactHeroSection';
import { ContactInfoSection, type ContactMethod } from '@/components/pages/contacts/ContactInfoSection';
import { LocationHoursSection } from '@/components/pages/contacts/LocationHoursSection';
import { getPageContent } from '@/lib/api/public';
import React from 'react';

// Main Contacts Page Component
export default async function ContactsPage() {
  const data = await getPageContent('contacts-page').catch(() => ({} as Record<string, unknown>));

  return (
    <div className="bg-white">
      <ContactHeroSection
        heroTitle={(data.heroTitle as string) ?? undefined}
        heroSubtitle={(data.heroSubtitle as string) ?? undefined}
        buttonText={(data.heroButtonText as string) ?? undefined}
      />
      <ContactInfoSection
        contactMethods={(data.contactMethods as ContactMethod[]) ?? undefined}
      />
      <LocationHoursSection
        address={(data.address as string) ?? undefined}
        workingHours={(data.workingHours as { day: string; hours: string }[]) ?? undefined}
        howToGetMetro={(data.howToGetMetro as string) ?? undefined}
        howToGetTransport={(data.howToGetTransport as string) ?? undefined}
        howToGetParking={(data.howToGetParking as string) ?? undefined}
        destinationUrl={(data.destinationUrl as string) ?? undefined}
        openMapUrl={(data.openMapUrl as string) ?? undefined}
        embedMapUrl={(data.embedMapUrl as string) ?? undefined}
      />
      <ContactFormSection />
    </div>
  );
}

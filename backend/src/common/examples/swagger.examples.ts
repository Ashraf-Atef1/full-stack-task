export const SwaggerExamples = {
  apartment: {
    create: {
      example1: {
        summary: 'Luxury Apartment Example',
        description: 'Example of a luxury apartment in New Cairo',
        value: {
          referenceNo: 'NAW-2024-001',
          compound: 'Madinaty',
          neighborhood: 'New Cairo',
          developer: 'Talaat Moustafa Group',
          saleType: 'Resale',
          price: 4500000,
          areaSqm: 180,
          bedrooms: 3,
          bathrooms: 2,
          finishingStatus: 'Super Lux',
          deliveryStatus: 'Ready',
          downPayment: 1350000,
          monthlyInstallment: 45000,
          installmentDurationYears: 7,
          isDelivered: true,
          amenities: ['Swimming Pool', 'Gym', 'Security', 'Parking'],
          listingUrl: 'https://nawy.com/apartment/NAW-2024-001',
          galleryImages: [
            'https://nawy.com/images/apt1/living.jpg',
            'https://nawy.com/images/apt1/bedroom.jpg',
            'https://nawy.com/images/apt1/kitchen.jpg',
          ],
          floorPlanUrl: 'https://nawy.com/images/apt1/floorplan.pdf',
          translations: [
            {
              locale: 'en',
              title: 'Luxury 3BR Apartment in Madinaty',
              description:
                'Beautiful 3-bedroom apartment with modern finishes and amazing amenities.',
            },
            {
              locale: 'ar',
              title: 'شقة فاخرة 3 غرف في مدينتي',
              description:
                'شقة جميلة بـ 3 غرف نوم مع تشطيبات حديثة ومرافق رائعة.',
            },
          ],
        },
      },
      example2: {
        summary: 'Affordable Apartment Example',
        description: 'Example of an affordable apartment in 6th of October',
        value: {
          referenceNo: 'NAW-2024-002',
          compound: 'Palm Hills October',
          neighborhood: '6th of October',
          developer: 'Palm Hills Developments',
          saleType: 'Primary',
          price: 2800000,
          areaSqm: 120,
          bedrooms: 2,
          bathrooms: 2,
          finishingStatus: 'Semi Finished',
          deliveryStatus: 'Under Construction',
          downPayment: 840000,
          monthlyInstallment: 28000,
          installmentDurationYears: 8,
          isDelivered: false,
          amenities: ['Clubhouse', 'Landscaping', 'Security'],
          listingUrl: 'https://nawy.com/apartment/NAW-2024-002',
          galleryImages: [
            'https://nawy.com/images/apt2/exterior.jpg',
            'https://nawy.com/images/apt2/interior.jpg',
          ],
          floorPlanUrl: 'https://nawy.com/images/apt2/plan.pdf',
          translations: [
            {
              locale: 'en',
              title: 'Cozy 2BR Apartment in Palm Hills October',
              description:
                'Modern 2-bedroom apartment in a prime location with excellent facilities.',
            },
            {
              locale: 'ar',
              title: 'شقة مريحة غرفتين في بالم هيلز أكتوبر',
              description:
                'شقة حديثة بغرفتين نوم في موقع متميز مع مرافق ممتازة.',
            },
          ],
        },
      },
    },
  },
};

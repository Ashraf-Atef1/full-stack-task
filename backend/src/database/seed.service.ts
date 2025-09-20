import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Apartment } from '../apartment/entities/apartment.entity';
import { ApartmentTranslation } from '../apartment/entities/apartment-translation.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    @InjectRepository(ApartmentTranslation)
    private translationRepository: Repository<ApartmentTranslation>,
    private dataSource: DataSource,
  ) {}

  async seedApartments(): Promise<void> {
    console.log('🌱 Starting apartment seeding...');

    // Check if apartments already exist
    const existingApartments = await this.apartmentRepository.count();
    if (existingApartments > 0) {
      console.log('✅ Apartments already exist, skipping seeding');
      return;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Egyptian compounds and areas for realistic data
      const compounds = [
        {
          name: 'Madinaty',
          area: 'New Cairo',
          developer: 'Talaat Moustafa Group',
        },
        {
          name: 'Palm Hills October',
          area: '6th of October',
          developer: 'Palm Hills Developments',
        },
        {
          name: 'The Square',
          area: 'Shorouk City',
          developer: 'Al Ahly Real Estate Development',
        },
        {
          name: 'Zahra El Maadi',
          area: 'New Maadi',
          developer: 'City Edge Developments',
        },
        {
          name: 'Hyde Park',
          area: 'New Cairo',
          developer: 'Hyde Park Developments',
        },
        {
          name: 'Mountain View iCity',
          area: '6th of October',
          developer: 'Mountain View',
        },
        {
          name: 'Stone Residence',
          area: 'New Cairo',
          developer: 'Stone Residence',
        },
        { name: 'Eastown', area: 'New Cairo', developer: 'Sodic' },
        { name: 'Allegria', area: 'Sheikh Zayed', developer: 'Sodic' },
        {
          name: 'Badya',
          area: '6th of October',
          developer: 'Palm Hills Developments',
        },
        {
          name: 'Capital Gardens',
          area: 'New Administrative Capital',
          developer: 'Palm Hills Developments',
        },
        { name: 'Telal', area: 'Sokhna', developer: 'Rooya Group' },
        { name: 'IL Monte Galala', area: 'Sokhna', developer: 'Tatweer Misr' },
        { name: 'Mivida', area: 'New Cairo', developer: 'Emaar Misr' },
        {
          name: 'Cairo Festival City',
          area: 'New Cairo',
          developer: 'Al-Futtaim Group Real Estate',
        },
      ];

      const saleTypes = ['Primary', 'Resale', 'Rent'];
      const finishingStatuses = [
        'Core & Shell',
        'Semi-finished',
        'Fully finished',
        'Lux',
        'Super Lux',
      ];
      const deliveryStatuses = ['Under Construction', 'Ready', 'Delivered'];

      const amenities = [
        'Swimming Pool',
        'Gym',
        'Security 24/7',
        'Parking',
        'Kids Area',
        'Spa',
        'Business Center',
        'Clubhouse',
        'Landscaping',
        'Tennis Court',
        'Basketball Court',
        'Jogging Track',
        'Shopping Mall',
        'Medical Center',
        'School',
        'Mosque',
        'Central AC',
        'Elevator',
      ];

      const apartmentsData = [];

      // Generate 20 apartments with realistic data
      for (let i = 1; i <= 20; i++) {
        const compound =
          compounds[Math.floor(Math.random() * compounds.length)];
        const saleType =
          saleTypes[Math.floor(Math.random() * saleTypes.length)];
        const bedrooms = Math.floor(Math.random() * 4) + 1; // 1-4 bedrooms
        const bathrooms = Math.min(bedrooms, Math.floor(Math.random() * 3) + 1); // 1-3 bathrooms
        const areaSqm = 80 + bedrooms * 30 + Math.floor(Math.random() * 50); // Realistic area based on bedrooms

        // Price calculation based on area, location, and sale type
        let pricePerSqm = 15000; // Base price per sqm in EGP
        if (compound.area === 'New Cairo' || compound.area === 'Sheikh Zayed')
          pricePerSqm += 5000;
        if (compound.area === 'New Administrative Capital') pricePerSqm += 8000;
        if (saleType === 'Rent') pricePerSqm = Math.floor(pricePerSqm / 100); // Monthly rent

        const basePrice = areaSqm * pricePerSqm;
        const price = Math.floor(basePrice * (0.9 + Math.random() * 0.4)); // ±20% variation

        const downPayment =
          saleType !== 'Rent'
            ? Math.floor(price * (0.2 + Math.random() * 0.2))
            : null; // 20-40%
        const installmentYears =
          saleType !== 'Rent' ? Math.floor(Math.random() * 6) + 5 : null; // 5-10 years
        const monthlyInstallment = downPayment
          ? Math.floor((price - downPayment) / (installmentYears * 12))
          : null;

        const finishingStatus =
          finishingStatuses[
            Math.floor(Math.random() * finishingStatuses.length)
          ];
        const deliveryStatus =
          deliveryStatuses[Math.floor(Math.random() * deliveryStatuses.length)];
        const isDelivered =
          deliveryStatus === 'Delivered' ||
          (deliveryStatus === 'Ready' && Math.random() > 0.3);

        // Select random amenities (3-8 amenities per apartment)
        const selectedAmenities = [];
        const amenityCount = Math.floor(Math.random() * 6) + 3;
        const shuffledAmenities = [...amenities].sort(
          () => 0.5 - Math.random(),
        );
        for (let j = 0; j < amenityCount; j++) {
          selectedAmenities.push(shuffledAmenities[j]);
        }

        // Generate working image URLs using Picsum and Unsplash
        const galleryImages = [
          `https://picsum.photos/800/600?random=${i}1`, // Living room
          `https://picsum.photos/800/600?random=${i}2`, // Bedroom
          `https://picsum.photos/800/600?random=${i}3`, // Kitchen
          `https://picsum.photos/800/600?random=${i}4`, // Bathroom
        ];

        // Add extra images for larger apartments
        if (bedrooms >= 3) {
          galleryImages.push(`https://picsum.photos/800/600?random=${i}5`); // Master bedroom
        }
        if (areaSqm > 150) {
          galleryImages.push(`https://picsum.photos/800/600?random=${i}6`); // Balcony/terrace
        }

        const apartmentData = {
          apartment: {
            referenceNo: `NAW-2024-${String(i).padStart(3, '0')}`,
            compound: compound.name,
            neighborhood: compound.area,
            developer: compound.developer,
            saleType,
            price,
            areaSqm,
            bedrooms,
            bathrooms,
            finishingStatus,
            deliveryStatus,
            downPayment,
            monthlyInstallment,
            installmentDurationYears: installmentYears,
            isDelivered,
            listingUrl: `https://nawy.com/apartment/NAW-2024-${String(i).padStart(3, '0')}`,
            phoneNumber: `+2011${Math.floor(Math.random() * 90000000) + 10000000}`, // Egyptian mobile format
            galleryImages,
            floorPlanUrl: `https://picsum.photos/1200/800?random=${i}0&grayscale`, // Floor plan as grayscale
          },
          translations: [
            {
              locale: 'en',
              title: `${finishingStatus} ${bedrooms}BR Apartment in ${compound.name}`,
              description: `${bedrooms === 1 ? 'Spacious studio' : `Beautiful ${bedrooms}-bedroom`} apartment featuring ${finishingStatus.toLowerCase()} finishes in the prestigious ${compound.name} development. This ${areaSqm}sqm unit offers modern living with premium amenities including ${selectedAmenities.slice(0, 3).join(', ')}. ${saleType === 'Rent' ? 'Available for immediate rental' : deliveryStatus === 'Ready' ? 'Ready for immediate delivery' : 'Under construction with flexible payment plans'}.`,
              seoTitle:
                `${bedrooms}BR ${compound.name} - ${saleType}`.substring(0, 60),
              seoDescription: `${finishingStatus} ${bedrooms}-bedroom apartment in ${compound.name}, ${compound.area}. ${areaSqm}sqm with modern amenities and ${saleType.toLowerCase()} options available.`,
              seoKeywords: [
                compound.name.toLowerCase(),
                compound.area.toLowerCase().replace(' ', '_'),
                `${bedrooms}_bedroom`,
                'apartment',
                saleType.toLowerCase(),
                finishingStatus.toLowerCase().replace(' ', '_'),
                'egypt',
                'real_estate',
              ],
            },
            {
              locale: 'ar',
              title: `شقة ${bedrooms === 1 ? 'استوديو' : bedrooms === 2 ? 'غرفتين' : bedrooms === 3 ? '3 غرف' : '4 غرف'} ${finishingStatus === 'Super Lux' ? 'سوبر لوكس' : finishingStatus === 'Lux' ? 'لوكس' : finishingStatus === 'Fully finished' ? 'مكتملة التشطيب' : finishingStatus === 'Semi-finished' ? 'نصف تشطيب' : 'هيكل فقط'} في ${compound.name}`,
              description: `شقة ${bedrooms === 1 ? 'استوديو واسعة' : `جميلة بـ ${bedrooms} غرف نوم`} بتشطيبات ${finishingStatus === 'Super Lux' ? 'سوبر لوكس' : finishingStatus === 'Lux' ? 'لوكس' : finishingStatus === 'Fully finished' ? 'مكتملة' : finishingStatus === 'Semi-finished' ? 'نصف تشطيب' : 'أساسية'} في مجمع ${compound.name} المرموق. هذه الوحدة بمساحة ${areaSqm} متر مربع تقدم معيشة عصرية مع مرافق راقية تشمل ${selectedAmenities
                .slice(0, 3)
                .map((amenity) => {
                  const arabicAmenities = {
                    'Swimming Pool': 'حمام سباحة',
                    Gym: 'جيم',
                    'Security 24/7': 'أمن 24 ساعة',
                    Parking: 'موقف سيارات',
                    'Kids Area': 'منطقة أطفال',
                    Spa: 'سبا',
                    'Business Center': 'مركز أعمال',
                    Clubhouse: 'نادي',
                    Landscaping: 'مناظر طبيعية',
                  };
                  return arabicAmenities[amenity] || amenity;
                })
                .join(
                  '، ',
                )}. ${saleType === 'Rent' ? 'متاحة للإيجار فوراً' : deliveryStatus === 'Ready' ? 'جاهزة للتسليم الفوري' : 'تحت الإنشاء مع خطط دفع مرنة'}.`,
              seoTitle:
                `شقة ${bedrooms === 2 ? 'غرفتين' : bedrooms === 3 ? '3 غرف' : bedrooms === 4 ? '4 غرف' : 'استوديو'} ${compound.name}`.substring(
                  0,
                  60,
                ),
              seoDescription: `شقة ${finishingStatus === 'Super Lux' ? 'سوبر لوكس' : 'مميزة'} ${bedrooms === 2 ? 'بغرفتين' : bedrooms === 3 ? 'بـ 3 غرف' : bedrooms === 4 ? 'بـ 4 غرف' : 'استوديو'} في ${compound.name}، ${compound.area}. مساحة ${areaSqm} متر مع مرافق حديثة.`,
              seoKeywords: [
                compound.name,
                compound.area
                  .replace('New ', 'الجديدة')
                  .replace('6th of October', 'أكتوبر')
                  .replace('Sheikh Zayed', 'الشيخ زايد'),
                bedrooms === 2
                  ? 'غرفتين'
                  : bedrooms === 3
                    ? 'ثلاث_غرف'
                    : bedrooms === 4
                      ? 'أربع_غرف'
                      : 'استوديو',
                'شقة',
                saleType === 'Rent'
                  ? 'إيجار'
                  : saleType === 'Primary'
                    ? 'بيع_أولي'
                    : 'إعادة_بيع',
                'مصر',
                'عقارات',
              ],
            },
          ],
        };

        apartmentsData.push(apartmentData);
      }

      // Create apartments and their translations
      for (const apartmentData of apartmentsData) {
        // Create apartment
        const apartment = queryRunner.manager.create(
          Apartment,
          apartmentData.apartment,
        );
        const savedApartment = await queryRunner.manager.save(apartment);

        // Create translations
        const translations = apartmentData.translations.map((translation) => {
          const { ...translationData } = translation;
          return queryRunner.manager.create(ApartmentTranslation, {
            ...translationData,
            apartmentId: savedApartment.id,
          });
        });

        await queryRunner.manager.save(translations);
        console.log(
          `✅ Created apartment: ${apartmentData.apartment.referenceNo} - ${apartmentData.translations[0].title}`,
        );
      }

      await queryRunner.commitTransaction();
      console.log(
        '🎉 Apartment seeding completed successfully! Created 20 apartments with realistic data.',
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Error seeding apartments:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async clearDatabase(): Promise<void> {
    console.log('🗑️ Clearing database...');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Delete in correct order due to foreign key constraints
      await queryRunner.manager.delete(ApartmentTranslation, {});
      await queryRunner.manager.delete(Apartment, {});

      await queryRunner.commitTransaction();
      console.log('✅ Database cleared successfully!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Error clearing database:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async seedAll(): Promise<void> {
    console.log('🌱 Starting complete database seeding...');

    try {
      await this.seedApartments();
      console.log('🎉 All seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    }
  }
}

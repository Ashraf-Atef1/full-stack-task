import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Apartment } from '../src/apartment/entities/apartment.entity';
import { ApartmentTranslation } from '../src/apartment/entities/apartment-translation.entity';

export class TestDatabaseHelper {
  private static dataSource: DataSource;

  static async createTestModule(entities: any[] = []): Promise<{
    module: TestingModule;
    dataSource: DataSource;
  }> {
    const testModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities:
            entities.length > 0 ? entities : [Apartment, ApartmentTranslation],
          synchronize: true,
          dropSchema: true,
          logging: false,
        }),
      ],
    }).compile();

    const dataSource = testModule.get<DataSource>(DataSource);
    this.dataSource = dataSource;

    return { module: testModule, dataSource };
  }

  static async clearDatabase(dataSource: DataSource): Promise<void> {
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
  }

  static async closeDatabase(): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }

  static createMockRepository<T>(): Partial<Repository<T>> {
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
      getMany: jest.fn(),
      getOne: jest.fn(),
      getCount: jest.fn(),
    };

    return {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      createQueryBuilder: jest.fn(() => mockQueryBuilder as any),
    };
  }
}

export class MockDataHelper {
  static createApartmentData() {
    return {
      referenceNo: 'TEST-001',
      compound: 'Test Compound',
      neighborhood: 'Test Neighborhood',
      developer: 'Test Developer',
      type: 'Apartment',
      subtype: '2 Bedroom',
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      price: 1000000,
      currency: 'EGP',
      deliveryDate: new Date('2025-12-31'),
      paymentPlan: 'Cash',
      amenities: ['Pool', 'Gym'],
      images: ['image1.jpg', 'image2.jpg'],
      slug: 'test-apartment-001',
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createApartmentTranslationData(
    apartmentId: number,
    language: string = 'en',
  ) {
    return {
      apartmentId,
      language,
      title: `Test Apartment ${language.toUpperCase()}`,
      description: `Test description in ${language}`,
      locationDescription: `Location description in ${language}`,
      amenitiesDescription: `Amenities description in ${language}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createCreateApartmentDto() {
    return {
      referenceNo: 'TEST-001',
      compound: 'Test Compound',
      neighborhood: 'Test Neighborhood',
      developer: 'Test Developer',
      saleType: 'Resale',
      price: 1000000,
      areaSqm: 100,
      bedrooms: 2,
      bathrooms: 2,
      finishingStatus: 'Fully finished',
      deliveryStatus: 'Ready',
      downPayment: 100000,
      installmentYears: 5,
      yearBuilt: 2023,
      views: ['Garden View'],
      isDelivered: true,
      amenities: ['Pool', 'Gym'],
      listingUrl: 'https://nawy.com/apartment/TEST-001',
      phoneNumber: '+201234567890',
      galleryImages: ['image1.jpg', 'image2.jpg'],
      floorPlanUrl: 'https://nawy.com/floorplan/TEST-001.pdf',
      translations: [
        {
          locale: 'en',
          title: 'Test Apartment EN',
          description: 'Test description in English',
          locationDescription: 'Location description in English',
          amenitiesDescription: 'Amenities description in English',
        },
        {
          locale: 'ar',
          title: 'شقة تجريبية',
          description: 'وصف تجريبي باللغة العربية',
          locationDescription: 'وصف الموقع باللغة العربية',
          amenitiesDescription: 'وصف المرافق باللغة العربية',
        },
      ],
    };
  }
}

export class MockI18nService {
  translate(key: string, options?: any): string {
    const translations: Record<string, string> = {
      'errors.apartment.notFound': 'Apartment not found',
      'errors.apartment.slugExists': 'Apartment with this slug already exists',
      'errors.apartment.duplicateEntry': 'Duplicate apartment entry',
      'errors.apartment.createFailed': 'Failed to create apartment',
      'errors.validation.invalid_string': 'Invalid string value',
      'errors.validation.invalid_number': 'Invalid number value',
    };

    return translations[key] || key;
  }
}

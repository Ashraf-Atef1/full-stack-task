import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { Apartment } from '../src/apartment/entities/apartment.entity';
import { ApartmentTranslation } from '../src/apartment/entities/apartment-translation.entity';
import { MockDataHelper } from './test-helpers';

describe('ApartmentController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Enable validation globally
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean database before each test
    await dataSource.getRepository(ApartmentTranslation).delete({});
    await dataSource.getRepository(Apartment).delete({});
  });

  describe('/apartments (POST)', () => {
    it('should create a new apartment successfully', async () => {
      const createDto = MockDataHelper.createCreateApartmentDto();

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(createDto)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        referenceNo: createDto.referenceNo,
        compound: createDto.compound,
        neighborhood: createDto.neighborhood,
        developer: createDto.developer,
        saleType: createDto.saleType,
        price: createDto.price,
        areaSqm: createDto.areaSqm,
        bedrooms: createDto.bedrooms,
        bathrooms: createDto.bathrooms,
        finishingStatus: createDto.finishingStatus,
        deliveryStatus: createDto.deliveryStatus,
      });

      expect(response.body.translations).toHaveLength(2);
    });

    it('should fail to create apartment with invalid data', async () => {
      const invalidDto = {
        referenceNo: '', // Empty reference number
        compound: 'Test Compound',
        // Missing required fields
      };

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(invalidDto)
        .expect(400);

      expect(response.body.message).toEqual(
        expect.arrayContaining([expect.stringContaining('referenceNo')]),
      );
    });

    it('should fail to create apartment with missing required fields', async () => {
      const incompleteDto = {
        referenceNo: 'TEST-001',
        // Missing many required fields
      };

      await request(app.getHttpServer())
        .post('/apartments')
        .send(incompleteDto)
        .expect(400);
    });

    it('should handle duplicate reference number', async () => {
      const createDto = MockDataHelper.createCreateApartmentDto();

      // Create first apartment
      await request(app.getHttpServer())
        .post('/apartments')
        .send(createDto)
        .expect(201);

      // Try to create second apartment with same reference number
      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(createDto)
        .expect(409);

      expect(response.body.message).toContain('already exists');
    });
  });

  describe('/apartments (GET)', () => {
    let createdApartments: any[];

    beforeEach(async () => {
      // Create test apartments
      createdApartments = [];

      for (let i = 1; i <= 3; i++) {
        const createDto = {
          ...MockDataHelper.createCreateApartmentDto(),
          referenceNo: `TEST-00${i}`,
          price: 1000000 + i * 100000,
          compound: `Test Compound ${i}`,
        };

        const response = await request(app.getHttpServer())
          .post('/apartments')
          .send(createDto);

        createdApartments.push(response.body);
      }
    });

    it('should get all apartments without filters', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments')
        .expect(200);

      expect(response.body).toMatchObject({
        apartments: expect.any(Array),
        total: 3,
        page: 1,
        limit: 10,
        totalPages: 1,
      });

      expect(response.body.apartments).toHaveLength(3);
    });

    it('should filter apartments by search term', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments')
        .query({ search: 'Compound 1' })
        .expect(200);

      expect(response.body.total).toBe(1);
      expect(response.body.apartments[0].compound).toContain('Compound 1');
    });

    it('should filter apartments by price range', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments')
        .query({
          priceMin: 1200000,
          priceMax: 1400000,
        })
        .expect(200);

      expect(response.body.total).toBe(2); // Should find apartments 2 and 3
      response.body.apartments.forEach((apt: any) => {
        expect(apt.price).toBeGreaterThanOrEqual(1200000);
        expect(apt.price).toBeLessThanOrEqual(1400000);
      });
    });

    it('should handle pagination', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments')
        .query({
          page: 1,
          limit: 2,
        })
        .expect(200);

      expect(response.body).toMatchObject({
        apartments: expect.any(Array),
        total: 3,
        page: 1,
        limit: 2,
        totalPages: 2,
      });

      expect(response.body.apartments).toHaveLength(2);
    });

    it('should filter by language', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments')
        .query({ lang: 'ar' })
        .expect(200);

      expect(response.body.apartments).toHaveLength(3);
      // Check that apartments have Arabic translations
      response.body.apartments.forEach((apt: any) => {
        expect(apt.translations.some((t: any) => t.locale === 'ar')).toBe(true);
      });
    });

    it('should return empty result for non-matching filters', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments')
        .query({ search: 'NonExistentTerm' })
        .expect(200);

      expect(response.body).toMatchObject({
        apartments: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      });
    });
  });

  describe('/apartments/:id (GET)', () => {
    let createdApartment: any;

    beforeEach(async () => {
      const createDto = MockDataHelper.createCreateApartmentDto();

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(createDto);

      createdApartment = response.body;
    });

    it('should get apartment by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/apartments/${createdApartment.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdApartment.id,
        referenceNo: createdApartment.referenceNo,
        compound: createdApartment.compound,
      });

      expect(response.body.translations).toHaveLength(2);
    });

    it('should get apartment with specific language', async () => {
      const response = await request(app.getHttpServer())
        .get(`/apartments/${createdApartment.id}`)
        .query({ lang: 'ar' })
        .expect(200);

      expect(response.body.id).toBe(createdApartment.id);
      // Should have flattened Arabic translation data
      expect(response.body.title).toContain('شقة');
    });

    it('should return 404 for non-existent apartment', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments/99999')
        .expect(404);

      expect(response.body.message).toContain('not found');
    });

    it('should return 400 for invalid apartment id', async () => {
      await request(app.getHttpServer())
        .get('/apartments/invalid-id')
        .expect(400);
    });
  });

  describe('Validation and Error Handling', () => {
    it('should validate price is a number', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        price: 'invalid-price',
      };

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(invalidDto)
        .expect(400);

      expect(response.body.message).toEqual(
        expect.arrayContaining([expect.stringContaining('price')]),
      );
    });

    it('should validate required translation fields', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        translations: [
          {
            locale: 'en',
            // Missing title
            description: 'Test description',
          },
        ],
      };

      await request(app.getHttpServer())
        .post('/apartments')
        .send(invalidDto)
        .expect(400);
    });

    it('should handle internal server errors gracefully', async () => {
      // This test would be more complex in a real scenario
      // For now, we test that the server can handle malformed data
      const malformedDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        translations: null, // This should cause an error
      };

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(malformedDto)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Language Support', () => {
    let createdApartment: any;

    beforeEach(async () => {
      const createDto = MockDataHelper.createCreateApartmentDto();

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(createDto);

      createdApartment = response.body;
    });

    it('should return English translation by default', async () => {
      const response = await request(app.getHttpServer())
        .get(`/apartments/${createdApartment.id}`)
        .expect(200);

      expect(response.body.title).toBe('Test Apartment EN');
    });

    it('should return Arabic translation when requested', async () => {
      const response = await request(app.getHttpServer())
        .get(`/apartments/${createdApartment.id}`)
        .query({ lang: 'ar' })
        .expect(200);

      expect(response.body.title).toBe('شقة تجريبية');
    });

    it('should fallback to English for unsupported language', async () => {
      const response = await request(app.getHttpServer())
        .get(`/apartments/${createdApartment.id}`)
        .query({ lang: 'fr' })
        .expect(200);

      expect(response.body.title).toBe('Test Apartment EN');
    });
  });
});

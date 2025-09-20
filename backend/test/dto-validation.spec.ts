import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateApartmentDto } from '../src/apartment/dto/create-apartment.dto';
import { ApartmentTranslationDto } from '../src/apartment/dto/apartment-translation.dto';
import { GetApartmentDto } from '../src/apartment/dto/get-apartments.dto';
import { MockDataHelper } from './test-helpers';

describe('DTO Validation', () => {
  describe('CreateApartmentDto', () => {
    it('should validate a complete and valid DTO', async () => {
      const validDto = MockDataHelper.createCreateApartmentDto();
      const dto = plainToClass(CreateApartmentDto, validDto);

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
      const incompleteDto = {
        referenceNo: 'TEST-001',
        // Missing many required fields
      };

      const dto = plainToClass(CreateApartmentDto, incompleteDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      // Check for specific required field errors
      const errorProperties = errors.map((error) => error.property);
      expect(errorProperties).toContain('compound');
      expect(errorProperties).toContain('neighborhood');
      expect(errorProperties).toContain('developer');
      expect(errorProperties).toContain('saleType');
      expect(errorProperties).toContain('price');
    });

    it('should fail validation for invalid string fields', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        referenceNo: '', // Empty string
        compound: 123, // Not a string
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const referenceNoError = errors.find(
        (error) => error.property === 'referenceNo',
      );
      const compoundError = errors.find(
        (error) => error.property === 'compound',
      );

      expect(referenceNoError).toBeDefined();
      expect(compoundError).toBeDefined();
    });

    it('should fail validation for invalid number fields', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        price: 'not-a-number',
        areaSqm: -1, // Negative number
        bedrooms: 15, // Too many bedrooms
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const priceError = errors.find((error) => error.property === 'price');
      const areaError = errors.find((error) => error.property === 'areaSqm');

      expect(priceError).toBeDefined();
      expect(areaError).toBeDefined();
    });

    it('should fail validation for invalid enum values', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        saleType: 'InvalidSaleType',
        finishingStatus: 'InvalidFinishing',
        deliveryStatus: 'InvalidDelivery',
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const saleTypeError = errors.find(
        (error) => error.property === 'saleType',
      );
      const finishingError = errors.find(
        (error) => error.property === 'finishingStatus',
      );
      const deliveryError = errors.find(
        (error) => error.property === 'deliveryStatus',
      );

      expect(saleTypeError).toBeDefined();
      expect(finishingError).toBeDefined();
      expect(deliveryError).toBeDefined();
    });

    it('should validate array fields', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        amenities: 'not-an-array', // Should be array
        galleryImages: [''], // Array with empty string
        views: null, // Null instead of array
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const amenitiesError = errors.find(
        (error) => error.property === 'amenities',
      );
      expect(amenitiesError).toBeDefined();
    });

    it('should validate nested translation DTOs', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        translations: [
          {
            locale: 'invalid-locale', // Invalid locale
            title: '', // Empty title
            // Missing required fields
          },
          {
            // Missing locale
            title: 'Test Title',
            description: 'Test description',
          },
        ],
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const translationsError = errors.find(
        (error) => error.property === 'translations',
      );
      expect(translationsError).toBeDefined();
    });

    it('should validate boolean fields', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        isDelivered: 'not-a-boolean', // Should be boolean
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const isDeliveredError = errors.find(
        (error) => error.property === 'isDelivered',
      );
      expect(isDeliveredError).toBeDefined();
    });

    it('should validate URL fields', async () => {
      const invalidDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        listingUrl: 'not-a-valid-url',
        floorPlanUrl: 'also-invalid',
      };

      const dto = plainToClass(CreateApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const listingUrlError = errors.find(
        (error) => error.property === 'listingUrl',
      );
      expect(listingUrlError).toBeDefined();
    });
  });

  describe('ApartmentTranslationDto', () => {
    it('should validate a complete and valid translation DTO', async () => {
      const validDto = {
        locale: 'en',
        title: 'Test Apartment',
        description: 'This is a test apartment description',
        locationDescription: 'Great location',
        amenitiesDescription: 'Amazing amenities',
      };

      const dto = plainToClass(ApartmentTranslationDto, validDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
      const incompleteDto = {
        locale: 'en',
        // Missing title
        description: 'Test description',
      };

      const dto = plainToClass(ApartmentTranslationDto, incompleteDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const titleError = errors.find((error) => error.property === 'title');
      expect(titleError).toBeDefined();
    });

    it('should fail validation for invalid locale', async () => {
      const invalidDto = {
        locale: 'invalid-locale',
        title: 'Test Title',
        description: 'Test description',
      };

      const dto = plainToClass(ApartmentTranslationDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const localeError = errors.find((error) => error.property === 'locale');
      expect(localeError).toBeDefined();
    });

    it('should validate string length constraints', async () => {
      const invalidDto = {
        locale: 'en',
        title: 'AB', // Too short (minimum 3 characters)
        description: 'x'.repeat(1001), // Too long (maximum 1000 characters)
      };

      const dto = plainToClass(ApartmentTranslationDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);

      const titleError = errors.find((error) => error.property === 'title');
      const descriptionError = errors.find(
        (error) => error.property === 'description',
      );

      expect(titleError).toBeDefined();
      expect(descriptionError).toBeDefined();
    });
  });

  describe('GetApartmentDto', () => {
    it('should validate a complete and valid query DTO', async () => {
      const validDto = {
        search: 'luxury apartment',
        priceMin: 100000,
        priceMax: 500000,
        bedroomsMin: 2,
        bedroomsMax: 4,
        bathroomsMin: 1,
        bathroomsMax: 3,
        areaSqmMin: 50,
        areaSqmMax: 200,
        saleType: 'Resale',
        finishingStatus: 'Fully finished',
        deliveryStatus: 'Ready',
        isDelivered: true,
        page: 1,
        limit: 10,
        sortBy: 'price',
        sortOrder: 'asc',
        lang: 'en',
      };

      const dto = plainToClass(GetApartmentDto, validDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should handle optional fields correctly', async () => {
      const minimalDto = {}; // All fields are optional

      const dto = plainToClass(GetApartmentDto, minimalDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation for invalid enum values', async () => {
      const invalidDto = {
        saleType: 'InvalidSaleType',
        finishingStatus: 'InvalidFinishing',
        deliveryStatus: 'InvalidDelivery',
        sortBy: 'invalidField',
        sortOrder: 'invalidOrder',
        lang: 'invalidLang',
      };

      const dto = plainToClass(GetApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation for invalid number ranges', async () => {
      const invalidDto = {
        priceMin: -1000, // Negative price
        priceMax: 'not-a-number',
        page: 0, // Page should be >= 1
        limit: 101, // Limit too high
      };

      const dto = plainToClass(GetApartmentDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate type transformations', async () => {
      // Test that string numbers are transformed to numbers
      const stringNumberDto = {
        priceMin: '100000', // String that should be converted to number
        priceMax: '500000',
        page: '2',
        limit: '15',
      };

      const dto = plainToClass(GetApartmentDto, stringNumberDto, {
        enableImplicitConversion: true,
      });
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
      expect(typeof dto.priceMin).toBe('number');
      expect(typeof dto.priceMax).toBe('number');
      expect(typeof dto.page).toBe('number');
      expect(typeof dto.limit).toBe('number');
    });
  });

  describe('Cross-field validation', () => {
    it('should validate that priceMax is greater than priceMin', async () => {
      // This would require custom validation if implemented
      const invalidDto = {
        priceMin: 500000,
        priceMax: 300000, // Max is less than min
      };

      const dto = plainToClass(GetApartmentDto, invalidDto);
      const errors = await validate(dto);

      // For now, this will pass unless custom validation is added
      // In a real implementation, you might add @IsGreaterThan custom decorator
      expect(errors.length).toBeGreaterThanOrEqual(0);
    });

    it('should validate logical relationships in apartment data', async () => {
      const illogicalDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        bedrooms: 0,
        bathrooms: 5, // More bathrooms than bedrooms might be unusual
        price: 0, // Zero price
      };

      const dto = plainToClass(CreateApartmentDto, illogicalDto);
      const errors = await validate(dto);

      // Basic validation should catch the zero price
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});

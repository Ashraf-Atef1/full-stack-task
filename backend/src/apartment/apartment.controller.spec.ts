import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { GetApartmentDto } from './dto/get-apartments.dto';
import { MockDataHelper } from '../../test/test-helpers';

describe('ApartmentController', () => {
  let controller: ApartmentController;
  let service: jest.Mocked<ApartmentService>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentController],
      providers: [
        {
          provide: ApartmentService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ApartmentController>(ApartmentController);
    service = module.get(ApartmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an apartment successfully', async () => {
      // Arrange
      const createDto = MockDataHelper.createCreateApartmentDto();
      const expectedApartment = {
        id: 1,
        ...MockDataHelper.createApartmentData(),
        translations: [],
      };

      service.create.mockResolvedValue(expectedApartment as any);

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedApartment);
    });

    it('should handle service errors when creating apartment', async () => {
      // Arrange
      const createDto = MockDataHelper.createCreateApartmentDto();
      const error = new Error('Database error');

      service.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(createDto)).rejects.toThrow(
        'Database error',
      );
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated apartments', async () => {
      // Arrange
      const filters: GetApartmentDto = {
        search: 'luxury',
        priceMin: 100000,
        priceMax: 500000,
        page: 1,
        limit: 10,
        lang: 'en',
      };

      const expectedResult = {
        apartments: [MockDataHelper.createApartmentData()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      service.findAll.mockResolvedValue(expectedResult as any);

      // Act
      const result = await controller.findAll(filters);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(filters);
      expect(result).toEqual(expectedResult);
    });

    it('should return apartments without filters', async () => {
      // Arrange
      const expectedResult = {
        apartments: [MockDataHelper.createApartmentData()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      service.findAll.mockResolvedValue(expectedResult as any);

      // Act
      const result = await controller.findAll({});

      // Assert
      expect(service.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(expectedResult);
    });

    it('should handle empty results', async () => {
      // Arrange
      const expectedResult = {
        apartments: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      };

      service.findAll.mockResolvedValue(expectedResult as any);

      // Act
      const result = await controller.findAll({});

      // Assert
      expect(service.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single apartment', async () => {
      // Arrange
      const apartmentId = 1;
      const locale = 'en';
      const expectedApartment = {
        id: apartmentId,
        ...MockDataHelper.createApartmentData(),
        translations: [
          MockDataHelper.createApartmentTranslationData(apartmentId),
        ],
      };

      service.findOne.mockResolvedValue(expectedApartment as any);

      // Act
      const result = await controller.findOne(apartmentId, locale);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(apartmentId, locale);
      expect(result).toEqual(expectedApartment);
    });

    it('should find apartment without locale parameter', async () => {
      // Arrange
      const apartmentId = 1;
      const expectedApartment = {
        id: apartmentId,
        ...MockDataHelper.createApartmentData(),
        translations: [
          MockDataHelper.createApartmentTranslationData(apartmentId),
        ],
      };

      service.findOne.mockResolvedValue(expectedApartment as any);

      // Act
      const result = await controller.findOne(apartmentId);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(apartmentId, undefined);
      expect(result).toEqual(expectedApartment);
    });

    it('should handle service errors when finding apartment', async () => {
      // Arrange
      const apartmentId = 999;
      const locale = 'en';
      const error = new Error('Apartment not found');

      service.findOne.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findOne(apartmentId, locale)).rejects.toThrow(
        'Apartment not found',
      );
      expect(service.findOne).toHaveBeenCalledWith(apartmentId, locale);
    });
  });
});

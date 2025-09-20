import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { ApartmentService } from './apartment.service';
import { Apartment } from './entities/apartment.entity';
import { ApartmentTranslation } from './entities/apartment-translation.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { GetApartmentDto } from './dto/get-apartments.dto';
import {
  TestDatabaseHelper,
  MockDataHelper,
  MockI18nService,
} from '../../test/test-helpers';

describe('ApartmentService', () => {
  let service: ApartmentService;
  let apartmentRepository: jest.Mocked<Repository<Apartment>>;
  let translationRepository: jest.Mocked<Repository<ApartmentTranslation>>;
  let dataSource: jest.Mocked<DataSource>;
  let queryRunner: jest.Mocked<QueryRunner>;
  let i18nService: MockI18nService;

  beforeEach(async () => {
    // Create mock repositories
    const mockApartmentRepo =
      TestDatabaseHelper.createMockRepository<Apartment>();
    const mockTranslationRepo =
      TestDatabaseHelper.createMockRepository<ApartmentTranslation>();

    // Create mock query runner with proper jest mocks
    const mockManagerCreate = jest.fn();
    const mockManagerSave = jest.fn();
    const mockManagerFindOne = jest.fn();

    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        create: mockManagerCreate,
        save: mockManagerSave,
        findOne: mockManagerFindOne,
      },
    } as any;

    // Create mock data source
    dataSource = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunner),
    } as any;

    // Create mock i18n service
    i18nService = new MockI18nService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentService,
        {
          provide: getRepositoryToken(Apartment),
          useValue: mockApartmentRepo,
        },
        {
          provide: getRepositoryToken(ApartmentTranslation),
          useValue: mockTranslationRepo,
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
        {
          provide: I18nService,
          useValue: i18nService,
        },
      ],
    }).compile();

    service = module.get<ApartmentService>(ApartmentService);
    apartmentRepository = module.get(getRepositoryToken(Apartment));
    translationRepository = module.get(
      getRepositoryToken(ApartmentTranslation),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an apartment successfully with translations', async () => {
      // Arrange
      const createDto = MockDataHelper.createCreateApartmentDto();
      const savedApartment = { id: 1, ...MockDataHelper.createApartmentData() };
      const expectedResult = { ...savedApartment, translations: [] };

      (queryRunner.manager.create as jest.Mock).mockReturnValueOnce(
        savedApartment,
      );
      (queryRunner.manager.save as jest.Mock)
        .mockResolvedValueOnce(savedApartment) // Save apartment
        .mockResolvedValueOnce([]); // Save translations

      // Mock findOne to return the created apartment
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

      // Act
      const result = await service.create(createDto);

      // Assert
      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.create).toHaveBeenCalledWith(
        Apartment,
        createDto,
      );
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(2); // apartment + translations
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(savedApartment.id);
      expect(result).toEqual(expectedResult);
    });

    it('should create an apartment without translations', async () => {
      // Arrange
      const createDto = {
        ...MockDataHelper.createCreateApartmentDto(),
        translations: [],
      };
      const savedApartment = { id: 1, ...MockDataHelper.createApartmentData() };
      const expectedResult = { ...savedApartment, translations: [] };

      (queryRunner.manager.create as jest.Mock).mockReturnValueOnce(
        savedApartment,
      );
      (queryRunner.manager.save as jest.Mock).mockResolvedValueOnce(
        savedApartment,
      );

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

      // Act
      const result = await service.create(createDto);

      // Assert
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(1); // only apartment
      expect(result).toEqual(expectedResult);
    });

    it('should handle slug conflict error', async () => {
      // Arrange
      const createDto = MockDataHelper.createCreateApartmentDto();
      const error = { code: '23505', constraint: 'apartment_slug_unique' };

      (queryRunner.manager.create as jest.Mock).mockReturnValueOnce({});
      (queryRunner.manager.save as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });

    it('should handle duplicate entry error', async () => {
      // Arrange
      const createDto = MockDataHelper.createCreateApartmentDto();
      const error = { code: '23505', constraint: 'apartment_reference_unique' };

      (queryRunner.manager.create as jest.Mock).mockReturnValueOnce({});
      (queryRunner.manager.save as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });

    it('should handle general database error', async () => {
      // Arrange
      const createDto = MockDataHelper.createCreateApartmentDto();
      const error = new Error('Database connection failed');

      (queryRunner.manager.create as jest.Mock).mockReturnValueOnce({});
      (queryRunner.manager.save as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return paginated apartments with filters', async () => {
      // Arrange
      const filters: GetApartmentDto = {
        search: 'test',
        priceMin: 100000,
        priceMax: 2000000,
        page: 1,
        limit: 10,
        lang: 'en',
      };

      const apartments = [MockDataHelper.createApartmentData()];
      const total = 1;

      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getCount.mockResolvedValue(total);
      mockQueryBuilder.getMany.mockResolvedValue(apartments);

      // Act
      const result = await service.findAll(filters);

      // Assert
      expect(apartmentRepository.createQueryBuilder).toHaveBeenCalledWith(
        'apartment',
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'apartment.translations',
        'translation',
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        expect.stringContaining('ILIKE'),
        { search: '%test%' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'apartment.price >= :priceMin',
        { priceMin: 100000 },
      );
      expect(result).toEqual({
        apartments,
        total,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });

    it('should return apartments without filters', async () => {
      // Arrange
      const apartments = [MockDataHelper.createApartmentData()];
      const total = 1;

      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getCount.mockResolvedValue(total);
      mockQueryBuilder.getMany.mockResolvedValue(apartments);

      // Act
      const result = await service.findAll({});

      // Assert
      expect(apartmentRepository.createQueryBuilder).toHaveBeenCalledWith(
        'apartment',
      );
      expect(result.apartments).toEqual(apartments);
      expect(result.total).toBe(total);
    });

    it('should handle empty results', async () => {
      // Arrange
      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getCount.mockResolvedValue(0);
      mockQueryBuilder.getMany.mockResolvedValue([]);

      // Act
      const result = await service.findAll({});

      // Assert
      expect(result).toEqual({
        apartments: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      });
    });
  });

  describe('findOne', () => {
    it('should return an apartment with translations', async () => {
      // Arrange
      const apartmentId = 1;
      const apartment = {
        id: apartmentId,
        ...MockDataHelper.createApartmentData(),
        translations: [
          MockDataHelper.createApartmentTranslationData(apartmentId),
        ],
      };

      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getOne.mockResolvedValue(apartment);

      // Act
      const result = await service.findOne(apartmentId);

      // Assert
      expect(apartmentRepository.createQueryBuilder).toHaveBeenCalledWith(
        'apartment',
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'apartment.translations',
        'translation',
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'apartment.id = :id',
        { id: apartmentId },
      );
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException when apartment not found', async () => {
      // Arrange
      const apartmentId = 999;
      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(apartmentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an apartment successfully', async () => {
      // Arrange
      const apartmentId = 1;
      const apartment = {
        id: apartmentId,
        ...MockDataHelper.createApartmentData(),
        translations: [
          MockDataHelper.createApartmentTranslationData(apartmentId),
        ],
      };

      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getOne.mockResolvedValue(apartment);
      apartmentRepository.remove.mockResolvedValue(apartment as any);

      // Act
      await service.remove(apartmentId);

      // Assert
      expect(apartmentRepository.createQueryBuilder).toHaveBeenCalledWith(
        'apartment',
      );
      expect(apartmentRepository.remove).toHaveBeenCalledWith(apartment);
    });

    it('should throw NotFoundException when apartment to remove not found', async () => {
      // Arrange
      const apartmentId = 999;
      const mockQueryBuilder = apartmentRepository.createQueryBuilder() as any;
      mockQueryBuilder.getOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(apartmentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(apartmentRepository.remove).not.toHaveBeenCalled();
    });
  });
});

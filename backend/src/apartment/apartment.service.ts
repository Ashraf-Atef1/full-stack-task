import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Apartment } from './entities/apartment.entity';
import { ApartmentTranslation } from './entities/apartment-translation.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { GetApartmentDto } from './dto/get-apartments.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    @InjectRepository(ApartmentTranslation)
    private translationRepository: Repository<ApartmentTranslation>,
    private dataSource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    console.log('Submitting apartment:', JSON.stringify(createApartmentDto));
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create the apartment first
      console.log('before creating apartment');
      const apartment = queryRunner.manager.create(Apartment, {
        ...createApartmentDto,
      });
      const savedApartment = await queryRunner.manager.save(apartment);
      console.log('Created apartment:');

      // Create translations if provided
      if (
        createApartmentDto.translations &&
        createApartmentDto.translations.length > 0
      ) {
        console.log('bfore creating translations');
        const translations = createApartmentDto.translations.map(
          (translation) =>
            queryRunner.manager.create(ApartmentTranslation, {
              ...translation,
              apartmentId: savedApartment.id,
            }),
        );
        await queryRunner.manager.save(translations);
      }
      await queryRunner.commitTransaction();

      // Return the apartment with translations
      return this.findOne(savedApartment.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // PostgreSQL unique violation
      if (error.code === '23505') {
        if (error.constraint?.includes('slug')) {
          throw new ConflictException(
            this.i18n.translate('errors.apartment.slugExists'),
          );
        }
        console.log('error.constraint', error);
        throw new ConflictException(
          this.i18n.translate('errors.apartment.duplicateEntry'),
        );
      }

      throw new InternalServerErrorException(
        this.i18n.translate('errors.apartment.createFailed'),
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(filters: GetApartmentDto): Promise<{
    apartments: Apartment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const queryBuilder = this.apartmentRepository
      .createQueryBuilder('apartment')
      .leftJoinAndSelect('apartment.translations', 'translation');

    // Apply filters
    if (filters) {
      if (filters.search) {
        queryBuilder.andWhere(
          '(apartment.compound ILIKE :search OR apartment.neighborhood ILIKE :search OR apartment.developer ILIKE :search OR translation.title ILIKE :search OR translation.description ILIKE :search)',
          { search: `%${filters.search}%` },
        );
      }

      if (filters.priceMin !== undefined) {
        queryBuilder.andWhere('apartment.price >= :priceMin', {
          priceMin: filters.priceMin,
        });
      }

      if (filters.priceMax !== undefined) {
        queryBuilder.andWhere('apartment.price <= :priceMax', {
          priceMax: filters.priceMax,
        });
      }

      if (filters.areaMin !== undefined) {
        queryBuilder.andWhere('apartment.areaSqm >= :areaMin', {
          areaMin: filters.areaMin,
        });
      }

      if (filters.areaMax !== undefined) {
        queryBuilder.andWhere('apartment.areaSqm <= :areaMax', {
          areaMax: filters.areaMax,
        });
      }

      if (filters.bedrooms !== undefined) {
        queryBuilder.andWhere('apartment.bedrooms = :bedrooms', {
          bedrooms: filters.bedrooms,
        });
      }

      if (filters.bathrooms !== undefined) {
        queryBuilder.andWhere('apartment.bathrooms = :bathrooms', {
          bathrooms: filters.bathrooms,
        });
      }

      if (filters.compound) {
        queryBuilder.andWhere('apartment.compound ILIKE :compound', {
          compound: `%${filters.compound}%`,
        });
      }

      if (filters.neighborhood) {
        queryBuilder.andWhere('apartment.neighborhood ILIKE :neighborhood', {
          neighborhood: `%${filters.neighborhood}%`,
        });
      }

      if (filters.saleType) {
        queryBuilder.andWhere('apartment.saleType = :saleType', {
          saleType: filters.saleType,
        });
      }

      if (filters.deliveryStatus) {
        queryBuilder.andWhere('apartment.deliveryStatus = :deliveryStatus', {
          deliveryStatus: filters.deliveryStatus,
        });
      }

      if (filters.isDelivered !== undefined) {
        queryBuilder.andWhere('apartment.isDelivered = :isDelivered', {
          isDelivered: filters.isDelivered,
        });
      }

      // Apply sorting with validation
      const allowedSortFields = [
        'price',
        'areaSqm',
        'createdAt',
        'bedrooms',
        'bathrooms',
      ];
      if (filters.sortBy && allowedSortFields.includes(filters.sortBy)) {
        const order =
          filters.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        queryBuilder.orderBy(`apartment.${filters.sortBy}`, order);
      } else {
        queryBuilder.orderBy('apartment.createdAt', 'DESC');
      }

      // Apply pagination with validation
      const page = Math.max(1, Math.floor(filters.page || 1));
      const limit = Math.max(1, Math.min(100, Math.floor(filters.limit || 10))); // Max 100 items per page
      const skip = (page - 1) * limit;

      queryBuilder.skip(skip).take(limit);

      // Get total count
      const total = await queryBuilder.getCount();
      const apartments = await queryBuilder.getMany();

      return {
        apartments: apartments.map((apartment) =>
          this.transformApartmentResponse(apartment, filters.lang),
        ),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }

    // Default behavior when no filters
    const apartments = await queryBuilder
      .orderBy('apartment.createdAt', 'DESC')
      .getMany();

    return {
      apartments: apartments.map((apartment) =>
        this.transformApartmentResponse(apartment, filters.lang),
      ),
      total: apartments.length,
      page: 1,
      limit: apartments.length,
      totalPages: 1,
    };
  }

  async findOne(id: number, locale?: string): Promise<Apartment> {
    const queryBuilder = this.apartmentRepository
      .createQueryBuilder('apartment')
      .leftJoinAndSelect('apartment.translations', 'translation')
      .where('apartment.id = :id', { id });

    const apartment = await queryBuilder.getOne();

    if (!apartment) {
      throw new NotFoundException(
        this.i18n.translate('errors.apartment.notFound'),
      );
    }

    return this.transformApartmentResponse(apartment, locale);
  }

  async update(
    id: number,
    updateApartmentDto: Partial<CreateApartmentDto>,
  ): Promise<Apartment> {
    const apartment = await this.findOne(id);

    try {
      // Update apartment data
      Object.assign(apartment, updateApartmentDto);
      return await this.apartmentRepository.save(apartment);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          this.i18n.translate('errors.apartment.slugExists'),
        );
      }
      throw new InternalServerErrorException(
        this.i18n.translate('errors.apartment.updateFailed'),
      );
    }
  }

  async remove(id: number): Promise<void> {
    const apartment = await this.findOne(id);

    try {
      await this.apartmentRepository.remove(apartment);
    } catch {
      throw new InternalServerErrorException(
        this.i18n.translate('errors.apartment.deleteFailed'),
      );
    }
  }

  /**
   * Transform apartment response to flatten translation data
   * Uses requested locale or falls back to English
   */
  private transformApartmentResponse(apartment: Apartment, locale?: string) {
    // Get the requested translation or fallback to English
    const requestedTranslation = apartment.translations?.find(
      (t) => t.locale === (locale || 'en'),
    );

    // Create the flattened response
    const response = {
      // Flattened translation data
      ...requestedTranslation,
      ...apartment,
    };

    return response;
  }
}

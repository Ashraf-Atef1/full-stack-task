import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApartmentTranslationDto } from './apartment-translation.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({
    description: 'Unique reference number for the apartment',
    example: 'NAW-2024-001',
    minLength: 3,
    maxLength: 50,
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  referenceNo: string;

  @ApiProperty({
    description: 'Name of the compound or development',
    example: 'Madinaty',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  compound: string;

  @ApiProperty({
    description: 'Neighborhood or area where the apartment is located',
    example: 'New Cairo',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  neighborhood: string;

  @ApiProperty({
    description: 'Developer or construction company',
    example: 'Talaat Moustafa Group',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  developer: string;

  @ApiProperty({
    description: 'Type of sale (Primary, Resale, Rent)',
    example: 'Resale',
    enum: ['Primary', 'Resale', 'Rent'],
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  saleType: string;

  @ApiProperty({
    description: 'Price of the apartment in EGP',
    example: 4500000,
    minimum: 0,
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  price: number;

  @ApiProperty({
    description: 'Area of the apartment in square meters',
    example: 180,
    minimum: 1,
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  areaSqm: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
    minimum: 0,
    maximum: 10,
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  bedrooms: number;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2,
    minimum: 1,
    maximum: 10,
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  bathrooms: number;

  @ApiProperty({
    description: 'Finishing status of the apartment',
    example: 'Super Lux',
    enum: [
      'Core & Shell',
      'Semi-finished',
      'Fully finished',
      'Lux',
      'Super Lux',
    ],
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  finishingStatus: string;

  @ApiProperty({
    description: 'Delivery status of the apartment',
    example: 'Ready',
    enum: ['Under Construction', 'Ready', 'Delivered'],
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  deliveryStatus: string;

  @ApiProperty({
    description: 'Down payment amount in EGP',
    example: 1350000,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  downPayment?: number;

  @ApiProperty({
    description: 'Monthly installment amount in EGP',
    example: 45000,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  monthlyInstallment?: number;

  @ApiProperty({
    description: 'Installment duration in years',
    example: 7,
    required: false,
    minimum: 1,
    maximum: 30,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('errors.validation.invalid_number'),
    },
  )
  installmentDurationYears?: number;

  @ApiProperty({
    description: 'Whether the apartment has been delivered to the owner',
    example: true,
  })
  @IsBoolean({
    message: i18nValidationMessage('errors.validation.invalid_boolean'),
  })
  isDelivered: boolean;

  @ApiProperty({
    description: 'List of available amenities',
    example: ['Swimming Pool', 'Gym', 'Security', 'Parking'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({
    message: i18nValidationMessage('errors.validation.invalid_array'),
  })
  amenities?: string[];

  @ApiProperty({
    description: 'URL to the apartment listing page',
    example: 'https://nawy.com/apartment/NAW-2024-001',
    format: 'uri',
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  listingUrl: string;

  @ApiProperty({
    description: 'Contact phone number for inquiries',
    example: '+201234567890',
    required: false,
    maxLength: 20,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Array of image URLs for the apartment gallery',
    example: [
      'https://nawy.com/images/apt1/living.jpg',
      'https://nawy.com/images/apt1/bedroom.jpg',
      'https://nawy.com/images/apt1/kitchen.jpg',
    ],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({
    message: i18nValidationMessage('errors.validation.invalid_array'),
  })
  galleryImages?: string[];

  @ApiProperty({
    description: 'URL to the floor plan document or image',
    example: 'https://nawy.com/images/apt1/floorplan.pdf',
    required: false,
    format: 'uri',
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  floorPlanUrl?: string;

  @ApiProperty({
    description: 'Array of translations for different languages',
    type: [ApartmentTranslationDto],
    example: [
      {
        locale: 'en',
        title: 'Luxury 3BR Apartment in Madinaty',
        description:
          'Beautiful 3-bedroom apartment with modern finishes and amazing amenities.',
      },
      {
        locale: 'ar',
        title: 'شقة فاخرة 3 غرف في مدينتي',
        description: 'شقة جميلة بـ 3 غرف نوم مع تشطيبات حديثة ومرافق رائعة.',
      },
    ],
  })
  @IsArray({
    message: i18nValidationMessage('errors.validation.invalid_array'),
  })
  @ValidateNested({ each: true })
  @Type(() => ApartmentTranslationDto)
  translations: ApartmentTranslationDto[];
}

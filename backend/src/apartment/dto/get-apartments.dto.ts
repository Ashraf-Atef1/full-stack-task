import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApartmentTranslationDto } from './apartment-translation.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class GetApartmentDto {
  @ApiProperty({
    description: 'Language code for filtering translations',
    example: 'en',
    required: false,
    enum: ['en', 'ar'],
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  lang?: string;

  @ApiProperty({
    description: 'Search term for apartments',
    example: 'luxury',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: 'Minimum price for filtering apartments',
    example: 100000,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  priceMin?: number;

  @ApiProperty({
    description: 'Maximum price for filtering apartments',
    example: 500000,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  priceMax?: number;

  @ApiProperty({
    description: 'Minimum area (in sqm) for filtering apartments',
    example: 100,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  areaMin?: number;

  @ApiProperty({
    description: 'Maximum area (in sqm) for filtering apartments',
    example: 300,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  areaMax?: number;

  @ApiProperty({
    description: 'Number of bedrooms for filtering apartments',
    example: 3,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  bedrooms?: number;

  @ApiProperty({
    description: 'Number of bathrooms for filtering apartments',
    example: 2,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  bathrooms?: number;

  @ApiProperty({
    description: 'Compound name for filtering apartments',
    example: 'Palm Hills',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  compound?: string;

  @ApiProperty({
    description: 'Neighborhood name for filtering apartments',
    example: 'New Cairo',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({
    description: 'Type of sale for filtering apartments',
    example: 'Resale',
    required: false,
    enum: ['Primary', 'Resale', 'Rent'],
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  saleType?: string;

  @ApiProperty({
    description: 'Delivery status for filtering apartments',
    example: 'Ready',
    required: false,
    enum: ['Ready', 'Under Construction', 'Off Plan'],
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  deliveryStatus?: string;

  @ApiProperty({
    description: 'Filter by delivery status',
    example: true,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return undefined;
  })
  @IsBoolean({
    message: i18nValidationMessage('validation.boolean'),
  })
  isDelivered?: boolean;

  @ApiProperty({
    description: 'Current page number for pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 1))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page for pagination',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 10))
  @IsNumber({}, { message: i18nValidationMessage('validation.number') })
  limit?: number = 10;

  @ApiProperty({
    description: 'Field to sort apartments by',
    example: 'price',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validation.string') })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({
    description: 'Sort order for apartments',
    example: 'asc',
    required: false,
  })
  @IsEnum(['asc', 'desc'], {
    message: i18nValidationMessage('validation.enum'),
  })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

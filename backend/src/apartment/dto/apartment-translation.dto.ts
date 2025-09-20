import { IsString, IsOptional, IsArray } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class ApartmentTranslationDto {
  @ApiProperty({
    description: 'Language code for the translation',
    example: 'en',
    enum: ['en', 'ar'],
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  locale: string;

  @ApiProperty({
    description: 'Apartment title in the specified language',
    example: 'Luxury 3BR Apartment in Madinaty',
    minLength: 3,
    maxLength: 200,
  })
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  title: string;

  @ApiProperty({
    description:
      'Detailed description of the apartment in the specified language',
    example:
      'Beautiful 3-bedroom apartment with modern finishes and amazing amenities. Located in the heart of New Cairo.',
    required: false,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  description?: string;

  @ApiProperty({
    description:
      'URL-friendly slug for the apartment in the specified language',
    example: 'luxury-3br-apartment-in-madinaty',
    required: false,
    maxLength: 250,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  slug?: string;

  @ApiProperty({
    description: 'SEO title for the apartment page',
    example: 'Luxury 3BR Apartment in Madinaty - Best Price in New Cairo',
    required: false,
    maxLength: 60,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  seoTitle?: string;

  @ApiProperty({
    description: 'SEO meta description for the apartment page',
    example:
      'Beautiful 3-bedroom apartment in Madinaty with modern finishes, great amenities, and competitive pricing.',
    required: false,
    maxLength: 160,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('errors.validation.invalid_string'),
  })
  seoDescription?: string;

  @ApiProperty({
    description: 'SEO keywords for the apartment page',
    example: ['luxury apartment', 'madinaty', '3 bedroom', 'new cairo'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({
    message: i18nValidationMessage('errors.validation.invalid_array'),
  })
  @IsString({ each: true })
  seoKeywords?: string[];
}

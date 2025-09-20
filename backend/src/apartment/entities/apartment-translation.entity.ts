import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Apartment } from './apartment.entity';

@Entity('apartment_translations')
@Index('idx_apartment_locale', ['apartmentId', 'locale'])
@Index('idx_locale', ['locale'])
@Index('idx_apartment_id', ['apartmentId'])
@Index('idx_slug', ['slug'], { where: 'slug IS NOT NULL' })
export class ApartmentTranslation {
  @ApiProperty({
    description: 'Unique identifier for the translation',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Language code (ISO 639-1)',
    example: 'en',
    enum: ['en', 'ar'],
  })
  @Column({
    type: 'varchar',
    length: 2,
    comment: 'Language code (en, ar, etc.)',
  })
  locale: string;

  @ApiProperty({
    description: 'Localized title of the apartment',
    example: 'Luxury 3BR Apartment in Madinaty',
  })
  @Column({
    type: 'varchar',
    length: 200,
    comment: 'Apartment title in the specified language',
  })
  title: string;

  @ApiProperty({
    description: 'Localized description of the apartment',
    example: 'Beautiful apartment with modern finishes and amazing amenities.',
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Detailed description in the specified language',
  })
  description: string;

  @ApiProperty({
    description: 'SEO-friendly URL slug',
    example: 'luxury-3br-apartment-madinaty-en',
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'URL-friendly slug for SEO',
  })
  slug: string;

  @ApiProperty({
    description: 'SEO title for search engines (max 60 chars)',
    example: 'Luxury 3BR Apartment in Madinaty - Best Price',
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
    comment: 'SEO title for search engines',
  })
  seoTitle: string;

  @ApiProperty({
    description: 'SEO meta description for search engines (max 160 chars)',
    example:
      'Beautiful 3-bedroom apartment in Madinaty with modern finishes and great amenities.',
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 160,
    nullable: true,
    comment: 'Meta description for search engines',
  })
  seoDescription: string;

  @ApiProperty({
    description: 'SEO keywords for search optimization',
    example: ['luxury', 'apartment', 'new cairo'],
    required: false,
  })
  @Column({
    type: 'simple-array',
    nullable: true,
    comment: 'Search keywords in the specified language',
  })
  seoKeywords: string[];

  @Column({
    name: 'apartment_id',
    comment: 'Reference to the main apartment record',
  })
  apartmentId: number;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'When this translation was created',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'When this translation was last updated',
  })
  updatedAt: Date;

  @ManyToOne(() => Apartment, (apartment) => apartment.translations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'apartment_id' })
  apartment: Apartment;

  // Auto-generate slug if not provided
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (!this.slug && this.title) {
      this.slug =
        this.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/--+/g, '-') // Replace multiple hyphens with single
          .trim() + `-${this.locale}`;
    }

    // Validate locale
    if (!['en', 'ar'].includes(this.locale)) {
      throw new Error(`Invalid locale: ${this.locale}. Must be 'en' or 'ar'.`);
    }

    // Validate title length
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
  }
}

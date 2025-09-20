import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ApartmentTranslation } from './apartment-translation.entity';

@Entity('apartments')
export class Apartment {
  @ApiProperty({
    description: 'Unique identifier for the apartment',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Unique reference number for the apartment',
    example: 'NAW-2024-001',
  })
  @Column()
  referenceNo: string;

  @ApiProperty({
    description: 'Name of the compound or development',
    example: 'Madinaty',
  })
  @Column()
  compound: string;

  @ApiProperty({
    description: 'Neighborhood or area where the apartment is located',
    example: 'New Cairo',
  })
  @Column()
  neighborhood: string;

  @ApiProperty({
    description: 'Developer or construction company',
    example: 'Talaat Moustafa Group',
  })
  @Column()
  developer: string;

  @ApiProperty({
    description: 'Type of sale',
    example: 'Resale',
  })
  @Column()
  saleType: string;

  @ApiProperty({
    description: 'Price of the apartment in EGP',
    example: 4500000,
  })
  @Column('numeric')
  price: number;

  @ApiProperty({
    description: 'Area of the apartment in square meters',
    example: 180,
  })
  @Column('numeric')
  areaSqm: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  finishingStatus: string;

  @Column()
  deliveryStatus: string;

  @Column('numeric', { nullable: true })
  downPayment: number;

  @Column('numeric', { nullable: true })
  monthlyInstallment: number;

  @Column({ nullable: true })
  installmentDurationYears: number;

  @Column({ default: false })
  isDelivered: boolean;

  @Column()
  listingUrl: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column('text', { array: true, nullable: true })
  galleryImages: string[];

  @Column({ nullable: true })
  floorPlanUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ApartmentTranslation,
    (translation) => translation.apartment,
    {
      cascade: true,
      eager: true,
    },
  )
  translations: ApartmentTranslation[];
}

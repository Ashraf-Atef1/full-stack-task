import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Apartment } from '../apartment/entities/apartment.entity';
import { ApartmentTranslation } from '../apartment/entities/apartment-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, ApartmentTranslation])],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}

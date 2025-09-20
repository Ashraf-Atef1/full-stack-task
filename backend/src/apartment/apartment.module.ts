import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { ApartmentTranslation } from './entities/apartment-translation.entity';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, ApartmentTranslation])],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService],
})
export class ApartmentModule {}

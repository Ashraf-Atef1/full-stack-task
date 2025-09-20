import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartment.entity';
import {
  ApiController,
  ApiCreateApartmentOperation,
  ApiGetAllOperation,
  ApiGetOneOperation,
  ApiIdParam,
  ApiLanguageQuery,
} from '../common/decorators/swagger.decorators';
import { GetApartmentDto } from './dto/get-apartments.dto';

@ApiController('apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @ApiCreateApartmentOperation(
    'Create a new apartment',
    'Creates a new apartment listing with multi-language support. The apartment data includes property details, pricing, and localized content.',
  )
  @ApiOkResponse({
    description: 'Apartment created successfully',
    type: Apartment,
  })
  async create(@Body() dto: CreateApartmentDto): Promise<Apartment> {
    return this.apartmentService.create(dto);
  }

  @Get()
  @ApiGetAllOperation(
    'Get all apartments',
    'Retrieves a list of all apartments with optional language filtering for localized content.',
  )
  @ApiLanguageQuery()
  @ApiOkResponse({
    description: 'List of apartments retrieved successfully',
    type: [Apartment],
  })
  async findAll(
    @Query()
    query: GetApartmentDto,
  ): Promise<{
    apartments: Apartment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.apartmentService.findAll(query);
  }

  @Get(':id')
  @ApiGetOneOperation(
    'Get apartment by ID',
    'Retrieves a specific apartment by its ID with optional language filtering for localized content.',
  )
  @ApiIdParam('Apartment ID')
  @ApiLanguageQuery()
  @ApiOkResponse({
    description: 'Apartment retrieved successfully',
    type: Apartment,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('lang') locale?: string,
  ): Promise<Apartment> {
    return this.apartmentService.findOne(id, locale);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Validation failed',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: ['title should not be empty'],
    required: false,
  })
  details?: string[];

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path that caused the error',
    example: '/api/apartments',
  })
  path: string;
}

export class ValidationErrorDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Validation error details',
    example: ['title should not be empty', 'price must be a positive number'],
  })
  details: string[];
}

export class NotFoundErrorDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Not found error message',
    example: 'Apartment not found',
  })
  message: string;
}

export class ConflictErrorDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Conflict error message',
    example: 'Apartment with this reference number already exists',
  })
  message: string;
}

export class InternalServerErrorDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Internal server error message',
    example: 'An unexpected error occurred',
  })
  message: string;
}

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 200,
  })
  statusCode: number;
}

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  hasNext: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  hasPrevious: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of items',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}

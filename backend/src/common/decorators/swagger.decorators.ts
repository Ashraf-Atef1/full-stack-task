import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  ValidationErrorDto,
  NotFoundErrorDto,
  ConflictErrorDto,
  ErrorResponseDto,
} from '../dto/common-response.dto';
import { SwaggerExamples } from '../examples/swagger.examples';

// Common error responses
const commonErrorResponses = () => [
  ApiBadRequestResponse({
    description: 'Validation error',
    type: ValidationErrorDto,
  }),
  ApiNotFoundResponse({
    description: 'Resource not found',
    type: NotFoundErrorDto,
  }),
  ApiConflictResponse({
    description: 'Resource conflict',
    type: ConflictErrorDto,
  }),
  ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ErrorResponseDto,
  }),
];

// Create operation decorator with examples
export const ApiCreateOperation = (summary: string, description?: string) =>
  applyDecorators(
    ApiOperation({ summary, description }),
    ApiCreatedResponse({
      description: 'Resource created successfully',
    }),
    ...commonErrorResponses(),
  );

// Create operation decorator specifically for apartments with examples
export const ApiCreateApartmentOperation = (
  summary: string,
  description?: string,
) =>
  applyDecorators(
    ApiOperation({ summary, description }),
    ApiBody({
      description: 'Apartment data to create',
      examples: SwaggerExamples.apartment.create,
    }),
    ApiCreatedResponse({
      description: 'Apartment created successfully',
    }),
    ...commonErrorResponses(),
  );

// Get all operation decorator
export const ApiGetAllOperation = (summary: string, description?: string) =>
  applyDecorators(
    ApiOperation({ summary, description }),
    ApiOkResponse({
      description: 'Resources retrieved successfully',
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: ValidationErrorDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: ErrorResponseDto,
    }),
  );

// Get one operation decorator
export const ApiGetOneOperation = (summary: string, description?: string) =>
  applyDecorators(
    ApiOperation({ summary, description }),
    ApiOkResponse({
      description: 'Resource retrieved successfully',
    }),
    ApiNotFoundResponse({
      description: 'Resource not found',
      type: NotFoundErrorDto,
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: ValidationErrorDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: ErrorResponseDto,
    }),
  );

// Update operation decorator
export const ApiUpdateOperation = (summary: string, description?: string) =>
  applyDecorators(
    ApiOperation({ summary, description }),
    ApiOkResponse({
      description: 'Resource updated successfully',
    }),
    ApiNotFoundResponse({
      description: 'Resource not found',
      type: NotFoundErrorDto,
    }),
    ApiConflictResponse({
      description: 'Resource conflict',
      type: ConflictErrorDto,
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: ValidationErrorDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: ErrorResponseDto,
    }),
  );

// Delete operation decorator
export const ApiDeleteOperation = (summary: string, description?: string) =>
  applyDecorators(
    ApiOperation({ summary, description }),
    ApiOkResponse({
      description: 'Resource deleted successfully',
    }),
    ApiNotFoundResponse({
      description: 'Resource not found',
      type: NotFoundErrorDto,
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: ValidationErrorDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: ErrorResponseDto,
    }),
  );

// Parameter decorators
export const ApiIdParam = (description = 'Resource ID') =>
  ApiParam({
    name: 'id',
    type: 'number',
    description,
    example: 1,
  });

export const ApiLanguageQuery = (
  description = 'Language code for localization',
) =>
  ApiQuery({
    name: 'lang',
    type: 'string',
    required: false,
    description,
    example: 'en',
    enum: ['en', 'ar'],
  });

// Controller decorator
export const ApiController = (name: string) => applyDecorators(ApiTags(name));

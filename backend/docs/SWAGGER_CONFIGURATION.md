# Swagger Configuration Documentation

This document explains the centralized Swagger configuration structure implemented in the Nawy Apartments API.

## Architecture

The Swagger configuration has been centralized into the following components:

### 1. Core Configuration (`/src/config/swagger.config.ts`)

Contains the main Swagger document builder configuration:

- API metadata (title, description, version, contact, license)
- Server configurations
- Tags definition
- Global parameters and security schemes
- Document generation options
- Setup options for the Swagger UI

### 2. Common Response DTOs (`/src/common/dto/common-response.dto.ts`)

Standardized response schemas for:

- **ErrorResponseDto**: Base error response structure
- **ValidationErrorDto**: Validation error responses
- **NotFoundErrorDto**: 404 error responses
- **ConflictErrorDto**: 409 conflict responses
- **InternalServerErrorDto**: 500 server error responses
- **SuccessResponseDto**: Generic success responses
- **PaginationMetaDto**: Pagination metadata
- **PaginatedResponseDto**: Paginated response wrapper

### 3. Reusable Decorators (`/src/common/decorators/swagger.decorators.ts`)

Composite decorators that combine multiple Swagger decorators:

#### Operation Decorators

- `@ApiCreateOperation()`: POST operations with standard error responses
- `@ApiGetAllOperation()`: GET collection operations
- `@ApiGetOneOperation()`: GET single resource operations
- `@ApiUpdateOperation()`: PUT/PATCH operations
- `@ApiDeleteOperation()`: DELETE operations

#### Parameter Decorators

- `@ApiIdParam()`: Standard ID path parameter
- `@ApiLanguageQuery()`: Language query parameter
- `@ApiSlugParam()`: SEO slug path parameter
- `@ApiSearchQuery()`: Search query parameter
- `@ApiPaginationQueries()`: Page and limit query parameters

#### Controller Decorator

- `@ApiController()`: Replacement for `@ApiTags()`

## Usage Examples

### Before (Verbose)

```typescript
@Controller('apartments')
@ApiTags('apartments')
export class ApartmentController {
  @Post()
  @ApiOperation({
    summary: 'Create apartment',
    description: 'Creates a new apartment listing',
  })
  @ApiCreatedResponse({ description: 'Apartment created' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConflictResponse({ description: 'Apartment exists' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  async create() {}
}
```

### After (Clean)

```typescript
@ApiController('apartments')
@Controller('apartments')
export class ApartmentController {
  @Post()
  @ApiCreateOperation('Create apartment', 'Creates a new apartment listing')
  async create() {}
}
```

## Benefits

1. **Consistency**: All endpoints use the same error response formats
2. **Maintainability**: Changes to error structures are centralized
3. **Readability**: Controllers focus on business logic, not documentation boilerplate
4. **Reusability**: Common patterns are defined once and reused
5. **Type Safety**: All response schemas are properly typed

## Configuration Locations

- **Main Setup**: `/src/main.ts` - Imports and applies the centralized config
- **Swagger Config**: `/src/config/swagger.config.ts` - Core configuration
- **Response DTOs**: `/src/common/dto/common-response.dto.ts` - Response schemas
- **Decorators**: `/src/common/decorators/swagger.decorators.ts` - Reusable decorators
- **Controllers**: Use the new decorators for clean, consistent documentation

## Customization

To add new operation types:

1. Create a new decorator in `swagger.decorators.ts`
2. Combine the appropriate Swagger decorators with standard error responses
3. Export and use in controllers

To modify error responses:

1. Update the DTOs in `common-response.dto.ts`
2. The changes will automatically apply to all endpoints using the decorators

## Migration Guide

To migrate existing controllers:

1. Replace `@ApiTags()` with `@ApiController()`
2. Replace operation decorators with the new composite decorators
3. Remove manual error response definitions (handled automatically)
4. Use parameter decorators for common parameters
5. Import new decorators from `../common/decorators/swagger.decorators`

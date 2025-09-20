# Testing Guide

This document provides comprehensive information about testing in the Nawy Apartments Backend API.

## Overview

The project includes multiple types of tests to ensure code quality and reliability:

- **Unit Tests**: Test individual components in isolation with mocked dependencies
- **Integration Tests**: Test interactions between components with real database
- **E2E Tests**: Test complete user workflows through HTTP API
- **DTO Validation Tests**: Test data validation and transformation logic

## Test Structure

```
backend/
├── src/
│   └── apartment/
│       ├── apartment.service.spec.ts      # Unit tests for service
│       └── apartment.controller.spec.ts   # Unit tests for controller
├── test/
│   ├── apartment.e2e-spec.ts             # E2E tests for apartment API
│   ├── dto-validation.spec.ts            # DTO validation tests
│   ├── test-helpers.ts                   # Test utilities and mocks
│   ├── jest-setup.ts                     # Unit test setup
│   ├── jest-setup.e2e.ts                 # E2E test setup
│   └── jest-e2e.json                     # E2E Jest configuration
└── .env.test                             # Test environment variables
```

## Available Test Scripts

### Individual Test Types

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

### Apartment-specific Tests

```bash
# Run all apartment-related tests
npm run test:apartment

# Run apartment unit tests only
npm run test:apartment:unit

# Run apartment E2E tests only
npm run test:apartment:e2e

# Run DTO validation tests
npm run test:validation
```

### Debugging Tests

```bash
# Run tests in debug mode
npm run test:debug

# Run all test suites sequentially
npm run test:all
```

## Test Configuration

### Unit Tests Configuration (package.json)

- **Test pattern**: `*.spec.ts` files in the `src` directory
- **Environment**: Node.js with Jest
- **Setup**: `test/jest-setup.ts`
- **Timeout**: 10 seconds
- **Coverage**: Collected from all TypeScript files except specs

### E2E Tests Configuration (test/jest-e2e.json)

- **Test pattern**: `*.e2e-spec.ts` files in the `test` directory
- **Environment**: Node.js with Jest
- **Setup**: `test/jest-setup.e2e.ts`
- **Timeout**: 30 seconds
- **Database**: Uses test database with real TypeORM

## Writing Tests

### Unit Tests Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentService } from './apartment.service';
import { MockDataHelper } from '../../test/test-helpers';

describe('ApartmentService', () => {
  let service: ApartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentService,
        // Mock dependencies
      ],
    }).compile();

    service = module.get<ApartmentService>(ApartmentService);
  });

  it('should create apartment', async () => {
    const createDto = MockDataHelper.createCreateApartmentDto();
    const result = await service.create(createDto);

    expect(result).toBeDefined();
    expect(result.referenceNo).toBe(createDto.referenceNo);
  });
});
```

### E2E Tests Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ApartmentController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/apartments (POST)', () => {
    return request(app.getHttpServer())
      .post('/apartments')
      .send(createDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });
});
```

## Test Utilities

### MockDataHelper

Provides pre-configured test data:

```typescript
import { MockDataHelper } from '../test/test-helpers';

// Create valid apartment DTO
const apartmentDto = MockDataHelper.createCreateApartmentDto();

// Create apartment entity data
const apartmentData = MockDataHelper.createApartmentData();

// Create translation data
const translationData = MockDataHelper.createApartmentTranslationData(1, 'en');
```

### TestDatabaseHelper

Provides database testing utilities:

```typescript
import { TestDatabaseHelper } from '../test/test-helpers';

// Create in-memory test database
const { module, dataSource } = await TestDatabaseHelper.createTestModule();

// Clear database between tests
await TestDatabaseHelper.clearDatabase(dataSource);

// Create mock repository
const mockRepo = TestDatabaseHelper.createMockRepository<Apartment>();
```

## Test Environment

### Environment Variables

Tests use `.env.test` file with the following configurations:

- Separate test database
- Disabled external services
- Reduced logging
- Test-specific secrets

### Database Setup

- **Development**: Uses PostgreSQL with test database
- **CI/CD**: Uses in-memory SQLite for faster execution
- **Local Testing**: Configurable via environment variables

## Coverage Reports

### Running Coverage

```bash
npm run test:cov
```

### Coverage Targets

- **Lines**: 80%+
- **Functions**: 80%+
- **Branches**: 70%+
- **Statements**: 80%+

### Coverage Output

- **Console**: Summary displayed after test run
- **HTML Report**: Generated in `coverage/` directory
- **LCOV**: Available for CI/CD integration

## Continuous Integration

### GitHub Actions (Example)

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test:all
      - run: npm run test:cov
```

### Pre-commit Hooks

Consider adding these scripts to `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:unit",
      "pre-push": "npm run test:all"
    }
  }
}
```

## Best Practices

### Unit Tests

1. **Isolation**: Mock all external dependencies
2. **Fast**: Each test should run in milliseconds
3. **Deterministic**: Same input always produces same output
4. **Focused**: Test one behavior per test case
5. **Clear naming**: Test names should describe the scenario

### E2E Tests

1. **Real scenarios**: Test actual user workflows
2. **Data cleanup**: Clean database between tests
3. **Error cases**: Test both success and failure paths
4. **Performance**: Monitor test execution time
5. **Stability**: Use proper waits and assertions

### General Guidelines

1. **AAA Pattern**: Arrange, Act, Assert
2. **DRY**: Use test helpers for common operations
3. **Readable**: Tests should be self-documenting
4. **Maintainable**: Update tests when code changes
5. **Comprehensive**: Cover edge cases and error conditions

## Troubleshooting

### Common Issues

#### Test Database Connection

```bash
# Check if test database exists
PGPASSWORD=postgres psql -h localhost -U postgres -c "SELECT datname FROM pg_database WHERE datname='nawy_test';"

# Create test database if missing
PGPASSWORD=postgres psql -h localhost -U postgres -c "CREATE DATABASE nawy_test;"
```

#### Jest Configuration

```bash
# Clear Jest cache
npx jest --clearCache

# Run specific test file
npx jest apartment.service.spec.ts

# Run tests with verbose output
npx jest --verbose
```

#### TypeORM Issues

```bash
# Check entity synchronization
npm run test:e2e -- --verbose

# Debug SQL queries
# Set DB_LOGGING=true in .env.test
```

### Performance Issues

1. **Parallel execution**: Use `--maxWorkers` flag
2. **Test isolation**: Ensure tests don't interfere with each other
3. **Database cleanup**: Use transactions for faster cleanup
4. **Mocking**: Mock expensive operations in unit tests

## Contributing

When adding new features:

1. **Write tests first** (TDD approach)
2. **Maintain coverage** above target thresholds
3. **Update test documentation** when adding new patterns
4. **Run full test suite** before committing
5. **Add integration tests** for new API endpoints

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [TypeORM Testing](https://typeorm.io/testing)
- [Class Validator Testing](https://github.com/typestack/class-validator)

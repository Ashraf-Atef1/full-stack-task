# 🏗️ Nawy Apartments - Backend API

> **NestJS-powered apartment management API with comprehensive testing and documentation**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-ea2845)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://postgresql.org/)
[![Tests](https://img.shields.io/badge/Tests-21_Unit_Passing-brightgreen)](#testing)
[![Swagger](https://img.shields.io/badge/API_Docs-Swagger-85ea2d)](http://localhost:3000/api)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📖 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🗄️ Database](#️-database)
- [🌐 Internationalization](#-internationalization)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [🐳 Docker](#-docker)
- [📦 Deployment](#-deployment)

## 🎯 Overview

A production-ready REST API built with NestJS that manages apartment listings with full CRUD operations, advanced filtering, file uploads, and bilingual content support.

### ✨ Key Features

- **🏛️ Clean Architecture**: Domain-driven design with clear separation of concerns
- **📚 Auto-generated Documentation**: Interactive Swagger/OpenAPI specs
- **🌍 Internationalization**: English & Arabic content support
- **🧪 Comprehensive Testing**: Unit, integration, and E2E tests
- **📤 File Upload**: Image gallery and floor plan management
- **🔍 Advanced Filtering**: Price range, location, amenities filtering
- **✅ Data Validation**: Robust input validation with custom decorators
- **🗄️ Database Relations**: Proper entity relationships with TypeORM

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                          │
│                    (Express + NestJS)                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   Controllers                               │
│              (HTTP Request Handling)                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     Services                                │
│                (Business Logic)                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   Data Layer                                │
│              (TypeORM + PostgreSQL)                         │
└─────────────────────────────────────────────────────────────┘
```

### 🎨 Design Patterns Used

- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer and validation
- **Dependency Injection**: Loose coupling and testability
- **Guard Pattern**: Route protection and validation
- **Interceptor Pattern**: Request/response transformation
- **Exception Filters**: Centralized error handling

## 🚀 Quick Start

### 🐳 With Docker (Recommended)

```bash
# From project root
docker-compose up --build
```

### 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL (Docker)
docker-compose up postgres

# 3. Start development server
npm run start:dev
```

The API will be available at **http://localhost:3000**

### 🌐 API Documentation

Interactive Swagger documentation: **http://localhost:3000/api**

## 📖 API Documentation

### 🔌 Core Endpoints

| Method   | Endpoint            | Description                    | Auth |
| -------- | ------------------- | ------------------------------ | ---- |
| `GET`    | `/apartments`       | List apartments with filtering | ❌   |
| `POST`   | `/apartments`       | Create new apartment           | ❌   |
| `GET`    | `/apartments/:id`   | Get apartment details          | ❌   |
| `PUT`    | `/apartments/:id`   | Update apartment               | ❌   |
| `DELETE` | `/apartments/:id`   | Delete apartment               | ❌   |
| `POST`   | `/upload/apartment` | Upload apartment images        | ❌   |
| `GET`    | `/health`           | Health check endpoint          | ❌   |

### 📊 Query Parameters for Listing

```typescript
interface GetApartmentDto {
  page?: number; // Page number (default: 1)
  limit?: number; // Items per page (default: 6)
  search?: string; // Text search
  priceMin?: number; // Minimum price
  priceMax?: number; // Maximum price
  bedrooms?: number; // Number of bedrooms
  bathrooms?: number; // Number of bathrooms
  compound?: string; // Compound name
  neighborhood?: string; // Neighborhood name
  saleType?: SaleType; // new | resale | under-construction
  deliveryStatus?: string; // ready | under-construction
  lang?: string; // en | ar (default: en)
}
```

### 💡 Example API Calls

**Get All Apartments:**

```bash
curl -X GET "http://localhost:3000/apartments" \
  -H "Content-Type: application/json"
```

**Filter Apartments:**

```bash
curl -X GET "http://localhost:3000/apartments?priceMin=1000000&bedrooms=3&lang=en" \
  -H "Content-Type: application/json"
```

**Create Apartment:**

```bash
curl -X POST "http://localhost:3000/apartments" \
  -H "Content-Type: application/json" \
  -H "lang: en" \
  -d '{
    "referenceNo": "APT-001",
    "compound": "Palm Hills",
    "neighborhood": "6th of October",
    "price": 2500000,
    "areaSqm": 150,
    "bedrooms": 3,
    "bathrooms": 2,
    "translations": [
      {
        "locale": "en",
        "title": "Luxury Apartment",
        "description": "Beautiful apartment with garden view"
      }
    ]
  }'
```

## 🧪 Testing

### 📊 Test Results Summary

| Test Suite            | Tests     | Status       | Coverage               |
| --------------------- | --------- | ------------ | ---------------------- |
| **Unit Tests**        | 21 tests  | ✅ Passing   | Controllers & Services |
| **Integration Tests** | 13 tests  | ⚠️ 7 failing | DTO Validation         |
| **E2E Tests**         | Available | ⏳ Pending   | Full API workflows     |

### 🏃‍♂️ Running Tests

```bash
# All test suites
npm run test:all

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Specific test suites
npm run test:apartment        # Apartment module tests
npm run test:validation       # DTO validation tests

# With coverage
npm run test:cov
```

### 🧪 Test Structure

**Unit Tests (✅ 21 Passing):**

- **Controller Tests**: HTTP request handling
- **Service Tests**: Business logic validation
- **Mocking**: Database and external dependencies

**Integration Tests (⚠️ Partial):**

- **DTO Validation**: Input validation testing
- **Database Integration**: Real database operations
- **Error Handling**: Exception scenarios

**E2E Tests:**

- **Full API Workflows**: Complete user journeys
- **Real Database**: Integration testing environment

### 💻 Test Examples

**Unit Test Example:**

```typescript
describe('ApartmentService', () => {
  it('should create apartment with translations', async () => {
    const apartmentDto = createMockApartmentDto();
    const result = await service.create(apartmentDto);

    expect(result.id).toBeDefined();
    expect(result.translations).toHaveLength(2);
  });
});
```

**Integration Test Example:**

```typescript
describe('CreateApartmentDto Validation', () => {
  it('should validate required fields', async () => {
    const dto = new CreateApartmentDto();
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});
```

## 🗄️ Database

### 📊 Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────────────────┐
│   Apartments    │1      N │  ApartmentTranslations      │
│                 ├─────────┤                             │
│ - id (PK)       │         │ - id (PK)                   │
│ - referenceNo   │         │ - apartmentId (FK)          │
│ - compound      │         │ - locale                    │
│ - neighborhood  │         │ - title                     │
│ - price         │         │ - description               │
│ - areaSqm       │         │ - slug                      │
│ - bedrooms      │         └─────────────────────────────┘
│ - bathrooms     │
│ - ...           │
└─────────────────┘
```

### 🏗️ Database Schema

**Apartments Table:**

```sql
CREATE TABLE apartments (
  id SERIAL PRIMARY KEY,
  reference_no VARCHAR(100) UNIQUE NOT NULL,
  compound VARCHAR(200) NOT NULL,
  neighborhood VARCHAR(200) NOT NULL,
  developer VARCHAR(200),
  sale_type sale_type_enum NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  area_sqm INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  finishing_status finishing_status_enum,
  delivery_status delivery_status_enum,
  down_payment DECIMAL(12,2),
  installment_years INTEGER,
  year_built INTEGER,
  views TEXT[],
  is_delivered BOOLEAN DEFAULT false,
  amenities TEXT[],
  listing_url VARCHAR(500),
  phone_number VARCHAR(50),
  gallery_images TEXT[],
  floor_plan_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Apartment Translations:**

```sql
CREATE TABLE apartment_translations (
  id SERIAL PRIMARY KEY,
  apartment_id INTEGER REFERENCES apartments(id) ON DELETE CASCADE,
  locale VARCHAR(5) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  location_description TEXT,
  amenities_description TEXT,
  slug VARCHAR(600) UNIQUE,
  seo_title VARCHAR(200),
  seo_description VARCHAR(500),
  seo_keywords TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(apartment_id, locale)
);
```

### 🔄 Migrations & Seeding

**Auto-Migration Setup:**

```typescript
// Database module configuration
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true, // Auto-sync in development
      entities: [Apartment, ApartmentTranslation],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true
    })
  ]
})
```

**Seeding Commands:**

```bash
npm run seed              # Add sample data
npm run seed:clear        # Clear all data
npm run seed:reseed       # Clear and re-add data
```

## 🌐 Internationalization

### 🔤 Language Support

The API supports bilingual content with automatic language detection:

**Supported Locales:**

- `en` - English (default)
- `ar` - Arabic

**Language Detection Priority:**

1. `lang` header in request
2. `Accept-Language` header
3. Default to `en`

### 📝 Translation Implementation

**Entity Structure:**

```typescript
@Entity('apartment_translations')
export class ApartmentTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apartmentId: number;

  @Column({ length: 5 })
  locale: string; // 'en' | 'ar'

  @Column({ length: 500 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 600, unique: true, nullable: true })
  slug: string;
}
```

**Controller Usage:**

```typescript
@Get()
async findAll(
  @Query() query: GetApartmentDto,
  @Headers('lang') lang: string = 'en'
) {
  return this.apartmentService.findAll(query, lang);
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── apartment/                 # Apartment module
│   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── create-apartment.dto.ts
│   │   │   ├── get-apartment.dto.ts
│   │   │   └── apartment-translation.dto.ts
│   │   ├── entities/             # Database entities
│   │   │   ├── apartment.entity.ts
│   │   │   └── apartment-translation.entity.ts
│   │   ├── apartment.controller.ts
│   │   ├── apartment.service.ts
│   │   ├── apartment.module.ts
│   │   └── __tests__/           # Unit tests
│   ├── common/                   # Shared utilities
│   │   ├── decorators/          # Custom decorators
│   │   ├── dto/                 # Base DTOs
│   │   ├── filters/             # Exception filters
│   │   └── services/            # Shared services
│   ├── config/                   # Configuration
│   │   ├── config.service.ts
│   │   └── swagger.config.ts
│   ├── database/                 # Database utilities
│   │   ├── database.module.ts
│   │   ├── seed.service.ts
│   │   └── seed.command.ts
│   ├── upload/                   # File upload module
│   │   ├── upload.controller.ts
│   │   └── upload.module.ts
│   ├── i18n/                     # Internationalization
│   │   ├── en.json
│   │   └── ar.json
│   ├── app.module.ts            # Root module
│   ├── app.controller.ts        # Health check
│   └── main.ts                  # Application bootstrap
├── test/                         # Test configuration
│   ├── jest-e2e.json
│   ├── jest-integration.json
│   └── *.spec.ts               # Integration & E2E tests
├── uploads/                      # File upload directory
├── docs/                        # Documentation
├── postman/                     # API collection
├── Dockerfile
├── package.json
└── README.md
```

## 🔧 Development

### 🛠️ Environment Setup

**Required Environment Variables:**

```env
PORT=3000
MODE=DEV
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=apartments_db
```

### 🚀 Development Scripts

```bash
# Development
npm run start:dev         # Hot reload development
npm run start:debug       # Debug mode
npm run start:prod        # Production mode

# Building
npm run build            # Compile TypeScript
npm run format           # Format code with Prettier
npm run lint            # ESLint checking and fixing

# Database
npm run seed            # Seed database with sample data
npm run seed:clear      # Clear all data
npm run seed:reseed     # Clear and reseed
```

### 🔍 Development Tools

**Code Quality:**

- ESLint with TypeScript rules
- Prettier for code formatting
- Husky for pre-commit hooks
- Conventional commits

**API Development:**

- Hot reloading with Nodemon
- Swagger UI for API testing
- Postman collection included
- Request logging middleware

### 📊 Performance Monitoring

**Built-in Monitoring:**

- Request/response logging
- Database query logging
- Error tracking with stack traces
- Health check endpoint (`/health`)

## 🐳 Docker

### 🏗️ Docker Configuration

**Production Dockerfile:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

**Development with Docker Compose:**

```bash
# Start with hot reload
docker-compose up backend

# Build and start
docker-compose up --build backend

# View logs
docker-compose logs -f backend
```

### 🔧 Container Health Checks

```yaml
services:
  backend:
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📦 Deployment

### ☁️ Production Deployment

**Environment Preparation:**

```bash
# Build for production
npm run build

# Install production dependencies only
npm ci --only=production

# Start production server
npm run start:prod
```

**Docker Production:**

```bash
# Build production image
docker build -t nawy-backend .

# Run production container
docker run -p 3000:3000 \
  -e POSTGRES_HOST=your-db-host \
  -e POSTGRES_PASSWORD=your-password \
  nawy-backend
```

### 🌍 Cloud Platforms

**Recommended Platforms:**

- **Railway**: Zero-config deployment
- **DigitalOcean App Platform**: Managed containers
- **AWS ECS**: Enterprise container orchestration
- **Google Cloud Run**: Serverless containers

### 📋 Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] CORS settings configured
- [ ] Rate limiting implemented
- [ ] Monitoring and logging setup
- [ ] Backup strategy in place
- [ ] Health checks configured

---

<div align="center">
  <strong>🏗️ Built with NestJS & TypeScript</strong><br>
  <sub>Production-ready apartment management API</sub>
</div>

# 🏢 Nawy Apartments - Full-Stack Application

> **Pre-Interview Technical Assessment**  
> A comprehensive apartment management platform built with modern web technologies

[![Backend Tests](https://img.shields.io/badge/Backend_Tests-21_Passing-brightgreen)](#backend-testing)
[![Frontend Tests](https://img.shields.io/badge/Frontend_Tests-77_Passing-brightgreen)](#frontend-testing)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](#quick-start-with-docker)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [🏢 Nawy Apartments - Full-Stack Application](#-nawy-apartments---full-stack-application)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Project Overview](#-project-overview)
  - [🚀 Quick Start with Docker](#-quick-start-with-docker)
  - [🏗️ Architecture Overview](#️-architecture-overview)
  - [💻 Technology Stack](#-technology-stack)
  - [🌟 Key Features](#-key-features)
  - [📖 API Documentation](#-api-documentation)
  - [🧪 Testing](#-testing)
  - [🔧 Development Setup](#-development-setup)
  - [📱 Frontend Features](#-frontend-features)
  - [🗄️ Database Schema](#️-database-schema)
  - [🌐 Internationalization](#-internationalization)
  - [📦 Deployment](#-deployment)
  - [🔍 Troubleshooting](#-troubleshooting)
  - [📞 Contact](#-contact)

## 🎯 Project Overview

A modern, full-stack apartment management platform that demonstrates enterprise-level development practices. Built for Nawy's technical assessment, showcasing proficiency in React, Node.js, PostgreSQL, and modern development methodologies.

### ✨ Highlights

- **🏛️ Clean Architecture**: Domain-driven design with clear separation of concerns
- **🔄 Real-time Data**: Live apartment listings with advanced filtering
- **🌍 Multi-language Support**: English & Arabic with RTL support
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🧪 Comprehensive Testing**: 98+ tests across frontend and backend
- **🐳 Containerized**: Ready-to-deploy Docker setup
- **📚 Auto-generated API Docs**: Interactive Swagger documentation

## 🚀 Quick Start with Docker

**One command to rule them all:**

```bash
git clone <repository-url>
cd nawy
docker-compose up --build
```

That's it! No environment files needed. The application will be available at:

- **🌐 Frontend**: http://localhost:8000
- **🔌 Backend API**: http://localhost:3000
- **📚 API Docs**: http://localhost:3000/api
- **🗄️ Database**: PostgreSQL on port 5433

### 🏃‍♂️ What Happens Next

1. **Database**: PostgreSQL starts with pre-seeded data
2. **Backend**: NestJS API with Swagger documentation
3. **Frontend**: Next.js application with server-side rendering
4. **Auto-migration**: Database schema and sample data loaded

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (NestJS)       │◄──►│  (PostgreSQL)   │
│   Port: 8000    │    │   Port: 3000     │    │   Port: 5433    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ React   │             │ Express │             │ TypeORM │
    │ TypeScript│           │ TypeScript│            │ Migrations│
    │ Tailwind │             │ Swagger │             │ Seeding │
    │ i18n     │             │ i18n    │             │         │
    └─────────┘             └─────────┘             └─────────┘
```

## 💻 Technology Stack

### 🎨 Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Redux Toolkit + React Query
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + Testing Library
- **Internationalization**: next-intl

### ⚙️ Backend

- **Framework**: NestJS with Express
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL with TypeORM
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest (Unit + Integration + E2E)
- **Internationalization**: nestjs-i18n

### 🛠️ DevOps & Tools

- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL 16
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git with conventional commits

## 🌟 Key Features

### 🔍 Apartment Management

- **CRUD Operations**: Full apartment lifecycle management
- **Advanced Filtering**: Search by price, location, amenities
- **Multi-language Content**: English & Arabic descriptions
- **Image Gallery**: Multiple photos with upload functionality
- **Floor Plans**: PDF/image floor plan attachments

### 📊 Data Features

- **Rich Search**: Text search across all apartment fields
- **Smart Filtering**: Real-time filter combinations
- **Pagination**: Efficient data loading with page controls
- **Sorting**: Multiple sort criteria
- **Export**: Data export capabilities

### 🎨 User Experience

- **Responsive Design**: Works on all device sizes
- **Dark/Light Theme**: User preference persistence
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Graceful error boundaries
- **Accessibility**: WCAG 2.1 AA compliance

## 📖 API Documentation

Interactive API documentation is available at: **http://localhost:3000/api**

### 🔌 Key Endpoints

```http
GET    /apartments          # List all apartments with filtering
POST   /apartments          # Create new apartment
GET    /apartments/:id      # Get apartment details
PUT    /apartments/:id      # Update apartment
DELETE /apartments/:id      # Delete apartment
POST   /upload/apartment    # Upload apartment images
```

### 📝 Example API Call

```bash
curl -X GET "http://localhost:3000/apartments?priceMin=1000000&bedrooms=3" \
  -H "Content-Type: application/json" \
  -H "lang: en"
```

## 🧪 Testing

### 📊 Test Coverage Summary

| Component               | Tests     | Coverage                             |
| ----------------------- | --------- | ------------------------------------ |
| **Backend Unit**        | 21 tests  | ✅ Passing                           |
| **Backend Integration** | 13 tests  | ⚠️ 7 failing (validation edge cases) |
| **Frontend Unit**       | 77 tests  | ✅ Passing                           |
| **Total Coverage**      | 111 tests | 87% success rate                     |

### 🏃‍♂️ Running Tests

```bash
# Frontend tests
cd frontend
npm test                    # All tests
npm run test:coverage       # With coverage report
npm run test:ui            # UI components only

# Backend tests
cd backend
npm run test:all           # All test suites
npm run test:unit          # Unit tests only
npm run test:e2e           # End-to-end tests
```

### 📋 Test Categories

**Frontend (77 Tests)**

- ✅ UI Components (Button, Input, Badge, ApartmentCard)
- ✅ Custom Hooks (useApartments, useCreateApartment)
- ✅ API Integration (Apartment routes with mocking)
- ✅ Form Validation (Zod schemas)
- ✅ Redux Store (Theme management)

**Backend (21 Unit Tests Passing)**

- ✅ Controller Logic (CRUD operations)
- ✅ Service Layer (Business logic)
- ✅ Data Validation (DTO validation)
- ⚠️ Integration tests need refinement

## 🔧 Development Setup

### 🐳 Option 1: Docker (Recommended)

```bash
# Start all services
docker-compose up --build

# Start specific services
docker-compose up postgres      # Database only
docker-compose up backend       # Backend only
```

### 💻 Option 2: Local Development

**Prerequisites:**

- Node.js 18+
- PostgreSQL 16
- npm or yarn

**Setup:**

```bash
# 1. Start PostgreSQL (use Docker or local installation)
docker-compose up postgres

# 2. Backend setup
cd backend
npm install
npm run start:dev          # Runs on :3000

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev               # Runs on :3000 (will auto-change to :8000)
```

### 🌍 Environment Variables

**Backend (.env)**:

```env
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=apartments_db
```

**Frontend (.env.local)**:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📱 Frontend Features

### 🎨 UI Components

- **Design System**: Consistent shadcn/ui components
- **Theme System**: Dark/light mode with persistence
- **Responsive Grid**: CSS Grid with Tailwind breakpoints
- **Loading States**: Skeleton loaders and spinners
- **Error Boundaries**: Graceful error handling

### 📝 Form Management

- **React Hook Form**: Performance-optimized forms
- **Zod Validation**: Type-safe schema validation
- **File Uploads**: Drag & drop image uploads
- **Real-time Validation**: Instant feedback
- **Multi-step Forms**: Wizard-style apartment creation

### 🌐 Internationalization

- **Two Languages**: English (LTR) & Arabic (RTL)
- **Dynamic Routing**: `/en/apartments` & `/ar/apartments`
- **RTL Support**: Proper Arabic text rendering
- **Number Formatting**: Localized price display

## 🗄️ Database Schema

### 📊 Core Tables

**Apartments Table:**

```sql
CREATE TABLE apartments (
  id SERIAL PRIMARY KEY,
  reference_no VARCHAR(100) UNIQUE NOT NULL,
  compound VARCHAR(200) NOT NULL,
  neighborhood VARCHAR(200) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  area_sqm INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Apartment Translations:**

```sql
CREATE TABLE apartment_translations (
  id SERIAL PRIMARY KEY,
  apartment_id INTEGER REFERENCES apartments(id),
  locale VARCHAR(5) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  slug VARCHAR(600) UNIQUE
);
```

### 🔄 Migrations & Seeding

- **Auto-migration**: Database schema created on startup
- **Sample Data**: 50+ realistic apartment listings
- **Translations**: Bilingual content for all apartments
- **Images**: Placeholder images for galleries

## 🌐 Internationalization

### 🔤 Language Support

**English (en)**:

- URL: `/en/apartments`
- Direction: LTR
- Number Format: 1,234,567 EGP

**Arabic (ar)**:

- URL: `/ar/apartments`
- Direction: RTL
- Number Format: ١٬٢٣٤٬٥٦٧ جنيه

### 🎯 Implementation Features

- **Server-side Rendering**: SEO-friendly localized pages
- **Dynamic Routing**: Automatic locale detection
- **RTL Layout**: CSS logical properties for Arabic
- **Number Localization**: Proper Arabic numeral display

## 📦 Deployment

### 🐳 Docker Production

```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build

# With custom environment
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

### ☁️ Cloud Deployment Options

**Recommended Platforms:**

- **Railway**: One-click deployment
- **Vercel**: Frontend deployment
- **DigitalOcean**: Full-stack hosting
- **AWS**: Enterprise-grade infrastructure

### 🔧 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection secured
- [ ] CORS settings updated
- [ ] SSL certificates installed
- [ ] Monitoring setup
- [ ] Backup strategy implemented

## 🔍 Troubleshooting

### 🐛 Common Issues

**Port Already in Use:**

```bash
# Check what's using the port
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Database Connection Failed:**

```bash
# Reset Docker volumes
docker-compose down -v
docker-compose up --build
```

**Frontend Build Errors:**

```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run build
```

### 📞 Health Checks

**Backend Health:**

```bash
curl http://localhost:3000/health
```

**Database Connection:**

```bash
docker-compose exec postgres psql -U postgres -d apartments_db -c "SELECT COUNT(*) FROM apartments;"
```

## 📞 Contact

**Candidate**: Ashraf Atef  
**Position**: Full-Stack Developer  
**Assessment**: Nawy Pre-Interview Technical Task

---

> 💼 **For Nawy Recruitment Team**: This project demonstrates proficiency in modern web development, clean code practices, testing methodologies, and full-stack architecture. Ready for technical discussion and code review.

---

<div align="center">
  <strong>🏢 Built with ❤️ for Nawy</strong><br>
  <sub>Comprehensive apartment management platform</sub>
</div>
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=apartments_db
```

**Frontend** (`./frontend/.env.docker`):

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Then use the override compose file:

```bash
docker-compose -f docker-compose.override.yml up --build
```

#### Option 2: Edit docker-compose.yml directly

Modify the environment variables directly in the `docker-compose.yml` file.

## Services

### Database (PostgreSQL)

- **Container**: `nawy-postgres`
- **Port**: `5433:5432`
- **Database**: `apartments_db`
- **User**: `postgres`
- **Password**: `postgres`

### Backend API (NestJS)

- **Container**: `nawy-backend`
- **Port**: `3000:3000`
- **Health Check**: `http://localhost:3000`
- **API Documentation**: `http://localhost:3000/api` (Swagger)

### Frontend (Next.js)

- **Container**: `nawy-frontend`
- **Port**: `8000:3000`
- **URL**: `http://localhost:8000`

## Environment Configuration

### Backend Environment (`.env.docker`)

```env
PORT=3000
MODE=DEV
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=apartments_db
```

### Frontend Environment (`.env.docker`)

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Default Values

The main `docker-compose.yml` includes these default values, so no configuration files are required to start the project.

## Docker Commands

### Start all services

```bash
docker-compose up
```

### Start with rebuild

```bash
docker-compose up --build
```

### Start in background

```bash
docker-compose up -d
```

### Stop all services

```bash
docker-compose down
```

### Stop and remove volumes

```bash
docker-compose down -v
```

### View logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

### Rebuild specific service

```bash
docker-compose build backend
docker-compose build frontend
```

## Development

### Local Development (without Docker)

If you want to run services locally for development:

1. **Database**: Use the PostgreSQL container only

   ```bash
   docker-compose up postgres
   ```

2. **Backend**: Run locally

   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Frontend**: Run locally
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Database Migration

The PostgreSQL container automatically runs the migration script (`migration-final-translations.sql`) on first startup.

### File Uploads

The backend uploads directory is mounted as a volume to persist uploaded files:

```yaml
volumes:
  - ./backend/uploads:/app/uploads
```

## Troubleshooting

### Service Health Checks

The docker-compose includes health checks for database and backend:

- **Database**: `pg_isready -U postgres`
- **Backend**: `curl -f http://localhost:3000/health || exit 1`

### Check Service Status

```bash
docker-compose ps
```

### Restart a Service

```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart postgres
```

### Access Database

```bash
docker-compose exec postgres psql -U postgres -d apartments_db
```

### Access Container Shell

```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

## Network Configuration

All services run on a custom bridge network `nawy-network` for internal communication.

## Volume Management

- **postgres_data**: Persists PostgreSQL data
- **uploads**: Persists uploaded apartment images

To reset the database:

```bash
docker-compose down -v
docker-compose up --build
```

## API Testing

Once the services are running, you can test the API:

```bash
# Health check
curl http://localhost:3000

# API documentation
open http://localhost:3000/api

# Frontend application
open http://localhost:8000
```

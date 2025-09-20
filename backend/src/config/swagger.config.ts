import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export class SwaggerConfig {
  static createDocument() {
    return new DocumentBuilder()
      .setTitle('Nawy Apartments API')
      .setDescription(
        `# Nawy Apartments API

A comprehensive RESTful API for managing apartment listings with multi-language support and rich translation capabilities.

## Features
- **Multi-language Support**: Full i18n support with Arabic and English translations
- **Rich Apartment Data**: Comprehensive apartment information including pricing, amenities, and gallery
- **SEO Optimization**: Built-in SEO fields for title, description, and keywords
- **Translation Management**: Separate translation entities for localized content
- **Flexible Querying**: Filter and search apartments with various parameters

## Entity Structure
The API uses a relational structure with:
- **Apartment**: Main apartment entity with core data (price, area, bedrooms, etc.)
- **ApartmentTranslation**: Localized content (title, description, SEO data) linked to apartments

## Language Support
- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support
- Language can be specified via query parameter (\`?lang=ar\`) or headers (\`Accept-Language\` or \`x-lang\`)

## Data Validation
All endpoints include comprehensive validation with localized error messages.`,
      )
      .setVersion('1.0')
      .setContact(
        'Nawy Development Team',
        'https://nawy.com',
        'developers@nawy.com',
      )
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .addServer('http://localhost:3000', 'Development Server')
      .addServer('https://api.nawy.com', 'Production Server')
      .addTag(
        'apartments',
        'Apartment management endpoints - CRUD operations for apartment listings',
      )
      .addTag(
        'translations',
        'Translation management endpoints - Manage localized content',
      )
      .addTag('health', 'Health check endpoints - API status and monitoring')
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-lang',
          in: 'header',
          description:
            'Language preference header (en or ar). Overrides Accept-Language header.',
        },
        'language',
      )
      .addGlobalParameters({
        name: 'lang',
        in: 'query',
        required: false,
        description:
          'Language preference query parameter (en or ar). Takes priority over headers.',
        schema: {
          type: 'string',
          enum: ['en', 'ar'],
          default: 'en',
        },
      })
      .build();
  }

  static getDocumentOptions(): SwaggerDocumentOptions {
    return {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
      deepScanRoutes: true,
    };
  }

  static getSetupOptions() {
    return {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        filter: true,
        docExpansion: 'none',
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
      },
      customSiteTitle: 'Nawy Apartments API Documentation',
      customfavIcon: 'https://nawy.com/favicon.ico',
      customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { 
          color: #2c3e50; 
          font-size: 2.2em; 
          font-weight: 600;
          margin-bottom: 0.5em;
        }
        .swagger-ui .info .description { 
          font-size: 1.1em; 
          line-height: 1.7; 
          color: #34495e;
        }
        .swagger-ui .info .description h1 {
          font-size: 1.5em;
          color: #2c3e50;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .swagger-ui .info .description h2 {
          font-size: 1.3em;
          color: #3498db;
          margin-top: 1.2em;
          margin-bottom: 0.4em;
        }
        .swagger-ui .info .description ul {
          margin: 0.8em 0;
          padding-left: 1.5em;
        }
        .swagger-ui .info .description li {
          margin: 0.3em 0;
        }
        .swagger-ui .info .description code {
          background: #f8f9fa;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 0.9em;
        }
        .swagger-ui .scheme-container { 
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
          padding: 20px; 
          border-radius: 8px; 
          border: 1px solid #dee2e6;
          margin: 1em 0;
        }
        .swagger-ui .opblock.opblock-post { 
          border-color: #28a745; 
          background: rgba(40, 167, 69, 0.05);
        }
        .swagger-ui .opblock.opblock-get { 
          border-color: #007bff; 
          background: rgba(0, 123, 255, 0.05);
        }
        .swagger-ui .opblock.opblock-put { 
          border-color: #ffc107; 
          background: rgba(255, 193, 7, 0.05);
        }
        .swagger-ui .opblock.opblock-delete { 
          border-color: #dc3545; 
          background: rgba(220, 53, 69, 0.05);
        }
        .swagger-ui .opblock-tag {
          font-size: 1.2em;
          font-weight: 600;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.3em;
          margin-bottom: 1em;
        }
        .swagger-ui .opblock-summary-description {
          font-size: 0.9em;
          color: #6c757d;
        }
        .swagger-ui .parameter__name {
          font-weight: 600;
          color: #495057;
        }
        .swagger-ui .response-col_status {
          font-weight: 600;
        }
        .swagger-ui .model-box {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
        }
        .swagger-ui .model-title {
          font-weight: 600;
          color: #2c3e50;
        }
      `,
    };
  }
}

# Nawy Apartments API - Postman Collection

This Postman collection provides comprehensive testing for the Nawy Apartments API with full support for the new entity structure including apartment translations and SEO optimization.

## Collection Overview

The collection is organized into the following test categories:

### 1. Health Check

- **Get App Status**: Basic API health check

### 2. Apartments

- **Create Apartment**: Basic apartment creation with required translations
- **Create Complete Apartment (All Fields)**: Full apartment creation with all optional fields
- **Create Minimal Apartment (Required Fields Only)**: Minimal apartment with only required fields
- **Get All Apartments**: Retrieve all apartments (default language)
- **Get All Apartments (English)**: Retrieve all apartments with English translations
- **Get All Apartments (Arabic)**: Retrieve all apartments with Arabic translations
- **Get Apartment by ID**: Retrieve specific apartment (default language)
- **Get Apartment by ID (English)**: Retrieve specific apartment with English translation
- **Get Apartment by ID (Arabic)**: Retrieve specific apartment with Arabic translation
- **Get Non-existent Apartment (404 Test)**: Test error handling for missing apartments

### 3. Error Testing

- **Create Apartment - Validation Error**: Test validation with invalid data
- **Create Apartment - Duplicate Reference**: Test duplicate reference number handling
- **Invalid Apartment ID (String)**: Test invalid ID parameter handling

### 4. Localization Testing

- **Test English Headers**: Test language detection via headers
- **Test Arabic Headers**: Test Arabic language detection
- **Test Query Parameter Priority**: Test that query params override headers

### 5. Swagger Documentation

- **Get Swagger JSON**: Retrieve API specification
- **Get Swagger UI**: Access interactive documentation

## Entity Structure

### Apartment Entity

The main apartment entity includes:

- Basic info: `referenceNo`, `compound`, `neighborhood`, `developer`
- Sale details: `saleType`, `price`, `areaSqm`
- Property details: `bedrooms`, `bathrooms`, `finishingStatus`, `deliveryStatus`
- Financial: `downPayment`, `monthlyInstallment`, `installmentDurationYears`
- Media: `galleryImages[]`, `floorPlanUrl`
- Contact: `listingUrl`, `phoneNumber`
- Status: `isDelivered`

### Translation Entity

Each apartment must have at least one translation with:

- **Required**: `locale`, `title`
- **Optional**: `description`, `slug`, `seoTitle`, `seoDescription`, `seoKeywords[]`

## Language Support

The API supports two languages:

- **English (`en`)**: Default language
- **Arabic (`ar`)**: Full RTL support

Language can be specified via:

1. Query parameter: `?lang=ar` (highest priority)
2. Header: `x-lang: ar`
3. Header: `Accept-Language: ar`

## Sample Data Structure

### Complete Apartment Creation

```json
{
  "referenceNo": "NAW-2024-TEST-001",
  "compound": "Test Compound",
  "neighborhood": "Test Area",
  "developer": "Test Developer",
  "saleType": "Resale",
  "price": 3500000,
  "areaSqm": 150,
  "bedrooms": 3,
  "bathrooms": 2,
  "finishingStatus": "Super Lux",
  "deliveryStatus": "Ready",
  "downPayment": 1050000,
  "monthlyInstallment": 35000,
  "installmentDurationYears": 7,
  "isDelivered": true,
  "listingUrl": "https://nawy.com/apartment/NAW-2024-TEST-001",
  "phoneNumber": "+201234567890",
  "galleryImages": [
    "https://nawy.com/images/test1/living.jpg",
    "https://nawy.com/images/test1/bedroom.jpg"
  ],
  "floorPlanUrl": "https://nawy.com/images/test1/floorplan.pdf",
  "translations": [
    {
      "locale": "en",
      "title": "Test Luxury Apartment in Prime Location",
      "description": "Beautiful test apartment with modern finishes...",
      "slug": "test-luxury-apartment-prime-location",
      "seoTitle": "Luxury 3BR Apartment for Sale - Best Price",
      "seoDescription": "Beautiful 3-bedroom apartment with modern finishes...",
      "seoKeywords": ["test", "luxury", "apartment", "3 bedrooms"]
    },
    {
      "locale": "ar",
      "title": "شقة تجريبية فاخرة في موقع مميز",
      "description": "شقة تجريبية جميلة مع تشطيبات حديثة...",
      "slug": "شقة-تجريبية-فاخرة-موقع-مميز",
      "seoTitle": "شقة فاخرة 3 غرف للبيع - أفضل سعر",
      "seoDescription": "شقة جميلة بـ 3 غرف نوم مع تشطيبات حديثة...",
      "seoKeywords": ["تجريبي", "فاخر", "شقة", "3 غرف"]
    }
  ]
}
```

## Environment Variables

### Local Development

- `baseUrl`: `http://localhost:3000`

### Production

- `baseUrl`: `https://api.nawy.com`

## Validation Rules

### Required Fields

- `referenceNo`: 3-50 characters, unique
- `compound`: 2-100 characters
- `neighborhood`: 2-100 characters
- `developer`: 2-100 characters
- `saleType`: enum ['Primary', 'Resale', 'Rent']
- `price`: positive number
- `areaSqm`: positive number >= 1
- `bedrooms`: 0-10
- `bathrooms`: 1-10
- `finishingStatus`: enum ['Core & Shell', 'Semi-finished', 'Fully finished', 'Lux', 'Super Lux']
- `deliveryStatus`: enum ['Under Construction', 'Ready', 'Delivered']
- `isDelivered`: boolean
- `listingUrl`: valid URL
- `translations`: array with at least one translation

### Translation Fields

- `locale`: enum ['en', 'ar']
- `title`: 3-200 characters (required)
- `description`: max 1000 characters (optional)
- `slug`: max 250 characters (auto-generated if not provided)
- `seoTitle`: max 60 characters (optional)
- `seoDescription`: max 160 characters (optional)
- `seoKeywords`: array of strings (optional)

## Testing Strategy

1. **Happy Path**: Test successful apartment creation with valid data
2. **Validation**: Test all validation rules with invalid data
3. **Localization**: Test language switching and translation retrieval
4. **Error Handling**: Test 404s, validation errors, and duplicates
5. **Edge Cases**: Test minimal data, maximum data, and boundary conditions

## Pre-request Scripts

The collection includes global pre-request scripts that:

- Set common headers
- Log request details for debugging

## Test Scripts

The collection includes global test scripts that:

- Verify response times (< 5000ms)
- Check content types
- Log responses for debugging

## Getting Started

1. Import the collection into Postman
2. Import the appropriate environment (local or production)
3. Run the entire collection or individual folders
4. Check the test results and response logs

## Notes

- All monetary values are in EGP (Egyptian Pounds)
- All areas are in square meters
- Gallery images should be publicly accessible URLs
- Phone numbers should include country code
- SEO fields are optional but recommended for better search visibility
- Slugs are auto-generated if not provided

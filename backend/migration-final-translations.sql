-- Migration: Add final apartment translation table with optimizations
-- Run this migration after dropping the old translation table

-- Drop the old translation table if exists
DROP TABLE IF EXISTS apartment_translations;

-- Create the final optimized translation table
CREATE TABLE apartment_translations (
    id SERIAL PRIMARY KEY,
    locale VARCHAR(2) NOT NULL CHECK (locale IN ('en', 'ar')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE,
    meta_description VARCHAR(160),
    keywords TEXT[], -- Array of keywords
    apartment_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint with cascade
    CONSTRAINT fk_apartment_translations_apartment_id 
        FOREIGN KEY (apartment_id) 
        REFERENCES apartments(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Create unique constraint for apartment_id + locale combination
CREATE UNIQUE INDEX idx_apartment_locale_unique 
    ON apartment_translations(apartment_id, locale);

-- Create performance indexes
CREATE INDEX idx_locale ON apartment_translations(locale);
CREATE INDEX idx_apartment_id ON apartment_translations(apartment_id);
CREATE INDEX idx_slug ON apartment_translations(slug) WHERE slug IS NOT NULL;

-- Add trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_apartment_translations_updated_at 
    BEFORE UPDATE ON apartment_translations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE apartment_translations IS 'Localized content for apartments';
COMMENT ON COLUMN apartment_translations.locale IS 'Language code (en, ar, etc.)';
COMMENT ON COLUMN apartment_translations.title IS 'Apartment title in the specified language';
COMMENT ON COLUMN apartment_translations.description IS 'Detailed description in the specified language';
COMMENT ON COLUMN apartment_translations.slug IS 'URL-friendly slug for SEO';
COMMENT ON COLUMN apartment_translations.meta_description IS 'Meta description for search engines';
COMMENT ON COLUMN apartment_translations.keywords IS 'Search keywords in the specified language';
COMMENT ON COLUMN apartment_translations.apartment_id IS 'Reference to the main apartment record';
COMMENT ON COLUMN apartment_translations.created_at IS 'When this translation was created';
COMMENT ON COLUMN apartment_translations.updated_at IS 'When this translation was last updated';

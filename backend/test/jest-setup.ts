import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific logs during testing
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup test timeout
jest.setTimeout(10000);

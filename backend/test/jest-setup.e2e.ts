// Setup for E2E tests
import { DataSource } from 'typeorm';

// Mock console methods to reduce noise in E2E tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup test timeout for E2E tests (longer than unit tests)
jest.setTimeout(30000);

// Global test cleanup
afterAll(async () => {
  // Clean up any open database connections
  const dataSource = (global as any).__TEST_DATASOURCE__;
  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy();
  }
});

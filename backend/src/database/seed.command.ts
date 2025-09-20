import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    const command = process.argv[2];

    switch (command) {
      case 'seed':
        await seedService.seedAll();
        break;
      case 'clear':
        await seedService.clearDatabase();
        break;
      case 'reseed':
        await seedService.clearDatabase();
        await seedService.seedAll();
        break;
      default:
        console.log('Available commands:');
        console.log('  seed   - Seed the database with sample data');
        console.log('  clear  - Clear all data from the database');
        console.log('  reseed - Clear and re-seed the database');
        break;
    }
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();

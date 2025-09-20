import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationService } from './common/services/translation.service';
import { SeedService } from './database/seed.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockTranslationService = {
    translateMessage: jest.fn().mockResolvedValue('Hello World!'),
  };

  const mockSeedService = {
    seedAll: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: TranslationService,
          useValue: mockTranslationService,
        },
        {
          provide: SeedService,
          useValue: mockSeedService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await appController.getHello();
      expect(result).toBe('Hello World!');
      expect(mockTranslationService.translateMessage).toHaveBeenCalledWith(
        'general.welcome',
      );
    });
  });
});

import { Injectable } from '@nestjs/common';
import { TranslationService } from './common/services/translation.service';
import { SeedService } from './database/seed.service';

@Injectable()
export class AppService {
  constructor(
    private readonly translationService: TranslationService,
    private readonly seedService: SeedService,
  ) {
    // seed the database
    this.seedService.seedAll();
  }

  async getHello(): Promise<string> {
    return this.translationService.translateMessage('general.welcome');
  }
}

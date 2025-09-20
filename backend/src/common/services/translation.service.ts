import { Injectable } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService<Record<string, unknown>>) {}

  async translate(
    key: string,
    options?: {
      lang?: string;
      args?: Record<string, any>;
    },
  ): Promise<string> {
    const currentContext = I18nContext.current();
    const language = options?.lang || currentContext?.lang || 'en';

    return this.i18n.translate(key, {
      lang: language,
      args: options?.args,
    });
  }

  async translateError(
    errorKey: string,
    options?: {
      lang?: string;
      args?: Record<string, any>;
    },
  ): Promise<string> {
    return this.translate(`errors.${errorKey}`, options);
  }

  async translateMessage(
    messageKey: string,
    options?: {
      lang?: string;
      args?: Record<string, any>;
    },
  ): Promise<string> {
    return this.translate(`messages.${messageKey}`, options);
  }

  async translateField(
    fieldKey: string,
    options?: {
      lang?: string;
      args?: Record<string, any>;
    },
  ): Promise<string> {
    return this.translate(`fields.${fieldKey}`, options);
  }

  getCurrentLanguage(): string {
    const currentContext = I18nContext.current();
    return currentContext?.lang || 'en';
  }
}

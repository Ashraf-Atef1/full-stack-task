import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract language from various sources
    const langFromQuery = req.query.lang || req.query.locale || req.query.l;

    // Priority: query param > custom header > accept-language header
    let selectedLang = 'en'; // default

    if (langFromQuery) {
      selectedLang = langFromQuery as string;
    } else if (req.headers['lang']) {
      selectedLang = req.headers['lang'] as string;
    } else if (req.headers['accept-language']) {
      // Parse accept-language header to get the first preferred language
      const acceptLang = req.headers['accept-language'] as string;
      const langs = acceptLang.split(',').map((lang) => {
        const [code] = lang.trim().split(';');
        return code.toLowerCase();
      });

      // Find supported language (en or ar)
      const supportedLang = langs.find(
        (lang) => lang.startsWith('en') || lang.startsWith('ar'),
      );

      if (supportedLang) {
        selectedLang = supportedLang.startsWith('ar') ? 'ar' : 'en';
      }
    }

    // Validate and set the language (only allow 'en' or 'ar')
    if (!['en', 'ar'].includes(selectedLang)) {
      selectedLang = 'en';
    }

    // Set the language in request for later use
    (req as any).language = selectedLang;

    // Also set it in headers for nestjs-i18n to pick up
    req.headers['lang'] = selectedLang;

    next();
  }
}

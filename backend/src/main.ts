import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { I18nService } from 'nestjs-i18n';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files for uploaded content
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Get the I18nService instance
  const i18nService = app.get(I18nService<Record<string, unknown>>);

  // Enable global validation pipe with localized messages
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Register global exception filter
  app.useGlobalFilters(new HttpExceptionFilter(i18nService));

  // Enable CORS if needed
  app.enableCors();

  // Setup Swagger Documentation
  const config = SwaggerConfig.createDocument();
  const documentOptions = SwaggerConfig.getDocumentOptions();
  const setupOptions = SwaggerConfig.getSetupOptions();

  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('api', app, document, setupOptions);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📚 Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
bootstrap();

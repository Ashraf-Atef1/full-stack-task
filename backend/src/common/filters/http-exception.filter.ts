import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly i18n: I18nService<Record<string, unknown>>) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18nContext = I18nContext.current(host);

    let status: number;
    let message: string;
    let errorKey: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        // Handle validation errors
        if (Array.isArray(exceptionResponse.message)) {
          // Handle class-validator validation errors
          const validationErrors = exceptionResponse.message;

          if (validationErrors.length > 0) {
            // Try to translate validation error message
            const translatedMessage = await this.i18n.translate(
              'errors.validation.failed',
              {
                lang: i18nContext?.lang || 'en',
              },
            );

            // If translation fails, use fallback
            message =
              translatedMessage === 'errors.validation.failed'
                ? 'Validation failed'
                : translatedMessage;
          } else {
            message = await this.i18n.translate('errors.validation.required', {
              lang: i18nContext?.lang || 'en',
            });

            // If translation fails, fallback to default message
            if (message === 'errors.validation.required') {
              message = 'This field is required';
            }
          }
        } else {
          // Try to find a translation key for the error message
          errorKey = this.mapErrorToTranslationKey(
            exceptionResponse.message as string,
            status,
          );
          message = await this.i18n.translate(errorKey, {
            lang: i18nContext?.lang || 'en',
          });

          // If translation fails, fallback to original message
          if (message === errorKey) {
            message = exceptionResponse.message as string;
          }
        }
      } else {
        errorKey = this.mapStatusToTranslationKey(status);
        message = await this.i18n.translate(errorKey, {
          lang: i18nContext?.lang || 'en',
        });

        // If translation fails, fallback to HTTP status text
        if (message === errorKey) {
          message = this.getHttpStatusText(status);
        }
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = await this.i18n.translate(
        'errors.general.internal_server_error',
        {
          lang: i18nContext?.lang || 'en',
        },
      );
    }

    // Log the error
    this.logger.error(
      `HTTP Exception: ${status} - ${message}`,
      exception instanceof Error ? exception.stack : 'Unknown error',
    );

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...(process.env.NODE_ENV === 'development' && {
        error: exception instanceof Error ? exception.message : 'Unknown error',
      }),
    };

    response.status(status).json(errorResponse);
  }

  private mapErrorToTranslationKey(message: string, status: number): string {
    // Map common error messages to translation keys
    const messageMap: Record<string, string> = {
      'Apartment not found': 'errors.apartment.not_found',
      'Invalid apartment reference': 'errors.apartment.invalid_reference',
      'Apartment already exists': 'errors.apartment.already_exists',
      Unauthorized: 'errors.auth.unauthorized',
      Forbidden: 'errors.auth.forbidden',
      'Bad Request': 'errors.general.bad_request',
      'Not Found': 'errors.general.not_found',
      Conflict: 'errors.general.conflict',
    };

    return messageMap[message] || this.mapStatusToTranslationKey(status);
  }

  private mapStatusToTranslationKey(status: number): string {
    const statusMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'errors.general.bad_request',
      [HttpStatus.UNAUTHORIZED]: 'errors.auth.unauthorized',
      [HttpStatus.FORBIDDEN]: 'errors.auth.forbidden',
      [HttpStatus.NOT_FOUND]: 'errors.general.not_found',
      [HttpStatus.CONFLICT]: 'errors.general.conflict',
      [HttpStatus.INTERNAL_SERVER_ERROR]:
        'errors.general.internal_server_error',
    };

    return statusMap[status] || 'errors.general.internal_server_error';
  }

  private getHttpStatusText(status: number): string {
    const statusTextMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'Bad Request',
      [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
      [HttpStatus.FORBIDDEN]: 'Forbidden',
      [HttpStatus.NOT_FOUND]: 'Not Found',
      [HttpStatus.CONFLICT]: 'Conflict',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    };

    return statusTextMap[status] || 'Unknown Error';
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import {
  ApiController,
  ApiGetOneOperation,
} from './common/decorators/swagger.decorators';

@ApiController('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiGetOneOperation(
    'Health check endpoint',
    'Returns a welcome message to verify the API is running',
  )
  @ApiOkResponse({
    description: 'Welcome message returned successfully',
    schema: {
      type: 'string',
      example: 'Welcome to Nawy Apartments API',
    },
  })
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}

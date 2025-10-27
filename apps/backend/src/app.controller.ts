import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HelloResponse } from 'shared-types';

@ApiTags('api')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiOperation({ summary: 'Get hello world message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a hello world message with timestamp',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Hello World from NestJS!',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-10-27T14:23:52.317Z',
        },
      },
    },
  })
  getHello(): HelloResponse {
    return this.appService.getHello();
  }
}
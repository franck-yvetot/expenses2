import { Injectable } from '@nestjs/common';
import { HelloResponse } from 'shared-types';

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    return {
      message: 'Hello World from NestJS!',
      timestamp: new Date().toISOString(),
    };
  }
}
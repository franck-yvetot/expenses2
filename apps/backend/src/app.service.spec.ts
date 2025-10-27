import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HelloResponse } from 'shared-types';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return a HelloResponse with message', () => {
      const result: HelloResponse = service.getHello();
      expect(result.message).toBe('Hello World from NestJS!');
    });

    it('should return a HelloResponse with timestamp', () => {
      const result: HelloResponse = service.getHello();
      expect(result.timestamp).toBeDefined();
      expect(typeof result.timestamp).toBe('string');
    });

    it('should return a valid ISO timestamp', () => {
      const result: HelloResponse = service.getHello();
      const date = new Date(result.timestamp);
      expect(date.toISOString()).toBe(result.timestamp);
    });
  });
});
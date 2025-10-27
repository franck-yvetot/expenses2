import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloResponse } from 'shared-types';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return a HelloResponse object', () => {
      const result: HelloResponse = {
        message: 'Hello World from NestJS!',
        timestamp: '2025-10-27T14:00:00.000Z',
      };

      jest.spyOn(appService, 'getHello').mockReturnValue(result);

      expect(appController.getHello()).toEqual(result);
    });

    it('should call appService.getHello', () => {
      const spy = jest.spyOn(appService, 'getHello');
      appController.getHello();
      expect(spy).toHaveBeenCalled();
    });
  });
});
import axios from 'axios';
import { fetchHello } from './api';
import { HelloResponse } from 'shared-types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchHello', () => {
    it('should fetch hello data successfully', async () => {
      const mockResponse: HelloResponse = {
        message: 'Hello World from NestJS!',
        timestamp: '2025-10-27T14:00:00.000Z',
      };

      mockedAxios.create = jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      } as any);

      const result = await fetchHello();

      expect(result).toEqual(mockResponse);
      expect(result.message).toBe('Hello World from NestJS!');
      expect(result.timestamp).toBeDefined();
    });

    it('should handle errors when fetching data', async () => {
      const errorMessage = 'Network Error';

      mockedAxios.create = jest.fn().mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error(errorMessage)),
      } as any);

      await expect(fetchHello()).rejects.toThrow(errorMessage);
    });
  });
});
import axios from 'axios';
import { HelloResponse } from 'shared-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHello = async (): Promise<HelloResponse> => {
  const response = await apiClient.get<HelloResponse>('/api/hello');
  return response.data;
};
import axios from 'axios';
import type {
  ExpenseDto,
  CreateExpenseDto,
  UpdateExpenseDto,
} from 'shared-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const expenseService = {
  async getExpenses(reportId?: string): Promise<ExpenseDto[]> {
    const response = await axios.get(`${API_URL}/api/expenses`, {
      params: reportId ? { reportId } : undefined,
    });
    return response.data;
  },

  async getExpense(id: string): Promise<ExpenseDto> {
    const response = await axios.get(`${API_URL}/api/expenses/${id}`);
    return response.data;
  },

  async createExpense(data: CreateExpenseDto): Promise<ExpenseDto> {
    const response = await axios.post(`${API_URL}/api/expenses`, data);
    return response.data;
  },

  async updateExpense(id: string, data: UpdateExpenseDto): Promise<ExpenseDto> {
    const response = await axios.patch(`${API_URL}/api/expenses/${id}`, data);
    return response.data;
  },

  async deleteExpense(id: string): Promise<void> {
    await axios.delete(`${API_URL}/api/expenses/${id}`);
  },
};
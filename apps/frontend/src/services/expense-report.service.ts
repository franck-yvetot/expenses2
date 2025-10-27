import axios from 'axios';
import type {
  ExpenseReportDto,
  ExpenseReportListItemDto,
  CreateExpenseReportDto,
  UpdateExpenseReportDto,
  ExpenseReportFilterDto,
  PaginatedResponseDto,
  ApiResponseDto,
} from 'shared-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const expenseReportService = {
  async getExpenseReports(
    filters?: ExpenseReportFilterDto
  ): Promise<PaginatedResponseDto<ExpenseReportListItemDto>> {
    const response = await axios.get(`${API_URL}/api/expense-reports`, {
      params: filters,
    });
    return response.data;
  },

  async getExpenseReport(id: string): Promise<ExpenseReportDto> {
    const response = await axios.get(`${API_URL}/api/expense-reports/${id}`);
    return response.data;
  },

  async createExpenseReport(
    data: CreateExpenseReportDto
  ): Promise<ExpenseReportDto> {
    const response = await axios.post(`${API_URL}/api/expense-reports`, data);
    return response.data;
  },

  async updateExpenseReport(
    id: string,
    data: UpdateExpenseReportDto
  ): Promise<ExpenseReportDto> {
    const response = await axios.patch(
      `${API_URL}/api/expense-reports/${id}`,
      data
    );
    return response.data;
  },

  async deleteExpenseReport(id: string): Promise<void> {
    await axios.delete(`${API_URL}/api/expense-reports/${id}`);
  },

  async submitExpenseReport(id: string): Promise<ExpenseReportDto> {
    const response = await axios.post(
      `${API_URL}/api/expense-reports/${id}/submit`
    );
    return response.data;
  },
};
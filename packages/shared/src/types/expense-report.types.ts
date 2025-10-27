import { ReportStatus } from './enums';
import { ExpenseDto } from './expense.types';

/**
 * Expense Report Data Transfer Object
 * Complete expense report with all expenses
 */
export interface ExpenseReportDto {
  id: string;
  purpose: string;
  reportDate: string; // ISO date string
  status: ReportStatus;
  totalAmount: number;
  userId: string;
  expenses: ExpenseDto[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Expense Report DTO
 * Data required to create a new expense report
 */
export interface CreateExpenseReportDto {
  purpose: string;
  reportDate: string; // ISO date string in format YYYY-MM-DD
}

/**
 * Update Expense Report DTO
 * Data that can be updated on an expense report
 */
export interface UpdateExpenseReportDto {
  purpose?: string;
  reportDate?: string;
  status?: ReportStatus;
}

/**
 * Expense Report List Item DTO
 * Simplified expense report for list views
 */
export interface ExpenseReportListItemDto {
  id: string;
  purpose: string;
  reportDate: string;
  status: ReportStatus;
  totalAmount: number;
  expenseCount: number;
  createdAt: string;
}

/**
 * Expense Report Filter DTO
 * Parameters for filtering expense reports
 */
export interface ExpenseReportFilterDto {
  status?: ReportStatus[];
  amountMin?: number;
  amountMax?: number;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'reportDate' | 'totalAmount' | 'createdAt' | 'purpose';
  sortOrder?: 'ASC' | 'DESC';
}
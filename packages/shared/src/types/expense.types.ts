import { ExpenseCategory, ExpenseStatus } from './enums';
import { AttachmentDto } from './attachment.types';

/**
 * Expense Data Transfer Object
 * Complete expense with all attachments
 */
export interface ExpenseDto {
  id: string;
  reportId: string;
  category: ExpenseCategory;
  amount: number;
  expenseName?: string;
  description?: string;
  expenseDate: string; // ISO date string
  status: ExpenseStatus;
  attachments: AttachmentDto[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Expense DTO
 * Data required to create a new expense
 */
export interface CreateExpenseDto {
  reportId: string;
  category: ExpenseCategory;
  amount: number;
  expenseName?: string;
  description?: string;
  expenseDate: string; // ISO date string in format YYYY-MM-DD
}

/**
 * Update Expense DTO
 * Data that can be updated on an expense
 */
export interface UpdateExpenseDto {
  category?: ExpenseCategory;
  amount?: number;
  expenseName?: string;
  description?: string;
  expenseDate?: string;
  status?: ExpenseStatus;
}
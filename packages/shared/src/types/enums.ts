/**
 * Expense Report Status Enumeration
 * Represents the lifecycle of an expense report
 */
export enum ReportStatus {
  Created = 'Created',
  Submitted = 'Submitted',
  Validated = 'Validated',
  Denied = 'Denied',
  Paid = 'Paid',
}

/**
 * Expense Category Enumeration
 * Defines the allowed categories for individual expenses
 */
export enum ExpenseCategory {
  Travel = 'Travel',
  Meals = 'Meals',
  OfficeSupplies = 'Office Supplies',
  Transportation = 'Transportation',
  Accommodation = 'Accommodation',
  Entertainment = 'Entertainment',
}

/**
 * Individual Expense Status Enumeration
 * Represents the status of a single expense within a report
 */
export enum ExpenseStatus {
  Created = 'Created',
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Denied = 'Denied',
}
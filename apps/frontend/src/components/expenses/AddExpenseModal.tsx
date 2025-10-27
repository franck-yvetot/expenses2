import React, { useState } from 'react';
import type { CreateExpenseDto } from 'shared-types';
import { ExpenseCategory } from 'shared-types';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateExpenseDto) => Promise<void>;
  reportId: string;
  reportDate: string;
}

const categoryOptions: ExpenseCategory[] = [
  ExpenseCategory.Travel,
  ExpenseCategory.Meals,
  ExpenseCategory.OfficeSupplies,
  ExpenseCategory.Transportation,
  ExpenseCategory.Accommodation,
  ExpenseCategory.Entertainment,
];

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  reportId,
  reportDate,
}) => {
  const [formData, setFormData] = useState<CreateExpenseDto>({
    reportId,
    category: ExpenseCategory.Meals,
    amount: 0,
    expenseName: '',
    description: '',
    expenseDate: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        reportId,
        category: ExpenseCategory.Meals,
        amount: 0,
        expenseName: '',
        description: '',
        expenseDate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Failed to create expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-end justify-center sm:items-center">
        <div className="relative w-full bg-background-light dark:bg-background-dark sm:max-w-lg sm:rounded-xl">
          {/* Header */}
          <header className="flex items-center p-4 border-b border-gray-200 dark:border-white/10">
            <button
              onClick={onClose}
              className="p-2 text-foreground-light dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h1 className="flex-1 text-center font-bold text-lg text-foreground-light dark:text-foreground-dark pr-12">
              Add Expense
            </h1>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-4rem)] sm:h-auto">
            {/* Main Form Content */}
            <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              {/* Category and Amount Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div>
                  <label
                    className="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as ExpenseCategory })
                    }
                    className="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-foreground-light dark:text-foreground-dark focus:ring-2 focus:ring-primary appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label
                    className="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <span className="text-foreground-light/50 dark:text-foreground-dark/50">$</span>
                    </div>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.amount || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 pl-8 pr-4 text-foreground-light dark:text-foreground-dark placeholder:text-foreground-light/50 dark:placeholder:text-foreground-dark/50 focus:ring-2 focus:ring-primary"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Expense Name (Optional) */}
              <div>
                <label
                  className="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1"
                  htmlFor="expense-name"
                >
                  Expense Name{' '}
                  <span className="text-foreground-light/50 dark:text-foreground-dark/50">(Optional)</span>
                </label>
                <input
                  id="expense-name"
                  name="expense-name"
                  type="text"
                  value={formData.expenseName}
                  onChange={(e) => setFormData({ ...formData, expenseName: e.target.value })}
                  className="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-foreground-light dark:text-foreground-dark placeholder:text-foreground-light/50 dark:placeholder:text-foreground-dark/50 focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Client Dinner"
                />
              </div>

              {/* Description (Optional) */}
              <div>
                <label
                  className="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1"
                  htmlFor="description"
                >
                  Description{' '}
                  <span className="text-foreground-light/50 dark:text-foreground-dark/50">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg p-4 text-foreground-light dark:text-foreground-dark placeholder:text-foreground-light/50 dark:placeholder:text-foreground-dark/50 focus:ring-2 focus:ring-primary resize-none"
                  placeholder="A short description of the expense"
                />
              </div>

              {/* File Upload Zone - Placeholder */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-subtle-dark/30 dark:border-subtle-light/30 rounded-xl p-6 text-center bg-subtle-light/50 dark:bg-subtle-dark/50">
                <div className="bg-primary/20 dark:bg-primary/30 p-3 rounded-full mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                </div>
                <p className="font-semibold text-foreground-light dark:text-foreground-dark">
                  Drag & drop files here
                </p>
                <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">
                  or click to upload (coming soon)
                </p>
              </div>

              {/* Date Fields */}
              <div className="space-y-2 pt-2">
                {/* Report Date (Read-only) */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-subtle-light dark:bg-subtle-dark">
                  <span className="text-foreground-light dark:text-foreground-dark">Report Date</span>
                  <span className="text-foreground-light dark:text-foreground-dark font-medium">
                    {formatDate(reportDate)}
                  </span>
                </div>

                {/* Expense Date */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-subtle-light dark:bg-subtle-dark">
                  <label htmlFor="expense-date" className="text-foreground-light dark:text-foreground-dark">
                    Expense Date
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      id="expense-date"
                      value={formData.expenseDate}
                      onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                      className="text-primary font-medium bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
                      required
                    />
                  </div>
                </div>
              </div>
            </main>

            {/* Footer with Action Buttons */}
            <footer className="p-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark font-bold h-14 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold h-14 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};
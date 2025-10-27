import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { ExpenseReportDto, ExpenseDto, CreateExpenseDto, ExpenseCategory } from 'shared-types';
import { expenseReportService } from '../services/expense-report.service';
import { expenseService } from '../services/expense.service';
import { AddExpenseModal } from '../components/expenses/AddExpenseModal';

const categoryIconMap: Record<ExpenseCategory, string> = {
  Travel: 'flight',
  Meals: 'restaurant',
  'Office Supplies': 'shopping_cart',
  Transportation: 'local_taxi',
  Accommodation: 'hotel',
  Entertainment: 'groups',
};

const expenseStatusColors = {
  Created: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  Submitted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Denied: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const ExpenseReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ExpenseReportDto | null>(null);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    if (id) {
      fetchReportDetails();
    }
  }, [id]);

  const fetchReportDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const reportResponse = await expenseReportService.getExpenseReport(id);
      setReport(reportResponse);
      
      const expensesResponse = await expenseService.getExpenses(id);
      setExpenses(expensesResponse);
    } catch (err) {
      setError('Failed to load report details');
      console.error('Error fetching report details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!id) return;
    
    try {
      await expenseReportService.submitExpenseReport(id);
      await fetchReportDetails(); // Refresh to show updated status
    } catch (err) {
      console.error('Error submitting report:', err);
      alert('Failed to submit report');
    }
  };

  const handleDeleteReport = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await expenseReportService.deleteExpenseReport(id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting report:', err);
        alert('Failed to delete report');
      }
    }
  };

  const handleCreateExpense = async (data: CreateExpenseDto) => {
    await expenseService.createExpense(data);
    await fetchReportDetails(); // Refresh to show new expense
  };

  const handleTitleEdit = async () => {
    if (!id || !editedTitle.trim() || editedTitle === report?.purpose) {
      setIsEditingTitle(false);
      return;
    }

    try {
      await expenseReportService.updateExpenseReport(id, { purpose: editedTitle.trim() });
      await fetchReportDetails();
      setIsEditingTitle(false);
    } catch (err) {
      console.error('Error updating report title:', err);
      alert('Failed to update report title');
    }
  };

  const getCategoryIcon = (category: ExpenseCategory) => {
    return categoryIconMap[category] || 'receipt';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAmount = (amount: number) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="text-subtle-light dark:text-subtle-dark">Loading...</div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
        <div className="text-red-600 dark:text-red-400 mb-4">{error || 'Report not found'}</div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const canSubmit = report.status === 'Created' && expenses.length > 0;
  const canEdit = report.status === 'Created';

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col font-display" style={{ backgroundColor: '#F6F8F7' }}>
      {/* Header */}
      <header className="p-4 sticky top-0 z-10" style={{ backgroundColor: '#F6F8F7' }}>
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 text-content-light dark:text-content-dark"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 className="section-title text-center flex-grow">
            Expense Report Details
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 pb-40">
        {/* Report Title Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="flex-grow">
              {!isEditingTitle ? (
                <h2
                  className="page-title cursor-pointer"
                  onClick={() => {
                    setEditedTitle(report.purpose);
                    setIsEditingTitle(true);
                  }}
                >
                  {report.purpose}
                </h2>
              ) : (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleTitleEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleTitleEdit();
                    }
                  }}
                  className="page-title bg-transparent border-0 focus:ring-0 p-0 w-full"
                  autoFocus
                />
              )}
            </div>
            <button
              onClick={() => {
                setEditedTitle(report.purpose);
                setIsEditingTitle(true);
              }}
              className="p-1 text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">edit</span>
            </button>
          </div>
          <p className="expense-subtitle mt-1">
            Created on {formatDate(report.reportDate)}
          </p>
        </div>

        {/* Expenses List */}
        <div className="space-y-3">
          {expenses.length === 0 ? (
            <div className="expense-card text-center py-8">
              <p className="expense-subtitle">
                No expenses added yet. Click "Add Expense" to get started.
              </p>
            </div>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="expense-card">
                <div className="flex items-center gap-4">
                  <div className="category-icon">
                    <span className="material-symbols-outlined">
                      {getCategoryIcon(expense.category)}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="expense-title">
                      {expense.expenseName || expense.category}
                    </p>
                    <p className="expense-subtitle">
                      {formatAmount(expense.amount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`expense-status-badge ${expenseStatusColors[expense.status]}`}>
                      {expense.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer with Action Buttons */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm max-w-md mx-auto" style={{ backgroundColor: 'rgba(246, 248, 247, 0.8)' }}>
        <div className="space-y-3">
          {canSubmit && (
            <button
              onClick={handleSubmitReport}
              className="btn-primary"
            >
              <span className="material-symbols-outlined">send</span>
              <span>Submit Report</span>
            </button>
          )}
          {canEdit && (
            <button
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="btn-secondary"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add Expense</span>
            </button>
          )}
        </div>
      </footer>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onSubmit={handleCreateExpense}
        reportId={report.id}
        reportDate={report.reportDate}
      />
    </div>
  );
};
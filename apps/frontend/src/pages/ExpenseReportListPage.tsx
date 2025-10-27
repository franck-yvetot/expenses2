import React, { useState, useEffect } from 'react';
import type { ExpenseReportListItemDto } from 'shared-types';
import { ExpenseReportCard } from '../components/expense-reports/ExpenseReportCard';
import { CreateReportModal } from '../components/expense-reports/CreateReportModal';
import { expenseReportService } from '../services/expense-report.service';

export const ExpenseReportListPage: React.FC = () => {
  const [reports, setReports] = useState<ExpenseReportListItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseReportService.getExpenseReports();
      setReports(response.data);
    } catch (err) {
      setError('Failed to load expense reports');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateReport = async (data: any) => {
    await expenseReportService.createExpenseReport(data);
    await fetchReports(); // Refresh list
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="sticky top-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
          <div className="w-10" />
          <h1 className="text-lg font-bold text-foreground-light dark:text-foreground-dark">
            Expense Reports
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          >
            <svg
              className="text-primary"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19" />
              <line x1="5" x2="19" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-24">
        <div className="p-4 space-y-4">
          {/* Search Bar - Placeholder for future */}
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-background-dark/50 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary"
              placeholder="Search reports..."
              type="text"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-muted-light dark:text-muted-dark">
                search
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="text-muted-light dark:text-muted-dark">Loading...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="px-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
              {error}
            </div>
          </div>
        )}

        {/* Expense Report Cards */}
        {!loading && !error && (
          <div className="px-4 space-y-4">
            {reports.length === 0 ? (
              <div className="text-center p-8 text-muted-light dark:text-muted-dark">
                No expense reports yet. Create your first one!
              </div>
            ) : (
              reports.map((report) => (
                <ExpenseReportCard key={report.id} report={report} />
              ))
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation - Placeholder */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark/80 backdrop-blur-sm border-t border-black/5 dark:border-white/10">
        <nav className="flex justify-around items-center h-16">
          <div className="flex flex-col items-center gap-1 text-primary">
            <svg
              className="text-primary"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 21V3h14v18l-7-3-7 3z" />
            </svg>
            <span className="text-xs font-medium">Reports</span>
          </div>
        </nav>
      </footer>

      {/* Create Report Modal */}
      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReport}
      />
    </div>
  );
};
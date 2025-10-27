import React, { useState } from 'react';
import type { CreateExpenseReportDto } from 'shared-types';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateExpenseReportDto) => Promise<void>;
}

export const CreateReportModal: React.FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [purpose, setPurpose] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose || !reportDate) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ purpose, reportDate });
      setPurpose('');
      setReportDate('');
      onClose();
    } catch (error) {
      console.error('Failed to create report:', error);
      alert('Failed to create report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-text-light dark:text-text-dark"
            type="button"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-text-light dark:text-text-dark flex-grow text-center">
            New Report
          </h1>
          <div className="w-6" />
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between">
        <main className="flex-grow p-4 space-y-6">
          {/* Purpose Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-text-light/80 dark:text-text-dark/80"
              htmlFor="purpose"
            >
              Purpose
            </label>
            <input
              className="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-text-light dark:text-text-dark placeholder-placeholder-light dark:placeholder-placeholder-dark focus:ring-2 focus:ring-primary focus:outline-none"
              id="purpose"
              placeholder="e.g. Q3 Client Meeting"
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </div>

          {/* Date Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-text-light/80 dark:text-text-dark/80"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-text-light dark:text-text-dark placeholder-placeholder-light dark:placeholder-placeholder-dark focus:ring-2 focus:ring-primary focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
              id="date"
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </main>

        {/* Footer with Action Buttons */}
        <footer className="p-4 pb-8">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-subtle-light dark:bg-subtle-dark text-text-light dark:text-text-dark font-bold h-14 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold h-14 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Report'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};
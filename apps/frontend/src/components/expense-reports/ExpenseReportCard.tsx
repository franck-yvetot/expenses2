import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExpenseReportListItemDto, ExpenseCategory } from 'shared-types';
import { StatusBadge } from '../common/StatusBadge';

interface ExpenseReportCardProps {
  report: ExpenseReportListItemDto;
}

const categoryIconMap: Record<ExpenseCategory, string> = {
  Travel: 'flight',
  Meals: 'restaurant',
  'Office Supplies': 'shopping_cart',
  Transportation: 'local_parking',
  Accommodation: 'hotel',
  Entertainment: 'groups',
};

export const ExpenseReportCard: React.FC<ExpenseReportCardProps> = ({ report }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAmount = (amount: number) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  const handleClick = () => {
    navigate(`/reports/${report.id}`);
  };

  const renderCategoryIcons = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'rgba(64, 181, 157, 0.1)' }}>
          <span className="material-symbols-outlined text-lg" style={{ color: '#40B59D' }}>receipt</span>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-background-dark/50 p-4 rounded-xl shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-foreground-light dark:text-foreground-dark font-semibold">
            {report.purpose}
          </p>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            {formatDate(report.reportDate)}
          </p>
        </div>
        <p className="text-lg font-bold" style={{ color: '#40B59D' }}>
          {formatAmount(report.totalAmount)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        {renderCategoryIcons()}
        <StatusBadge status={report.status} />
      </div>
    </div>
  );
};
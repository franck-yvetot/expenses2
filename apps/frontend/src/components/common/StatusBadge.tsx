import React from 'react';
import type { ReportStatus, ExpenseStatus } from 'shared-types';

interface StatusBadgeProps {
  status: ReportStatus | ExpenseStatus;
  className?: string;
}

const statusClassMap: Record<string, string> = {
  Created: 'status-created',
  Submitted: 'status-submitted',
  Validated: 'status-validated',
  Paid: 'status-paid',
  Denied: 'status-denied',
  Accepted: 'status-accepted',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusClass = statusClassMap[status] || 'text-muted-light dark:text-muted-dark';

  return (
    <span className={`text-sm font-medium ${statusClass} ${className}`}>
      {status}
    </span>
  );
};
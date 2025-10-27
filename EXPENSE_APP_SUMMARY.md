# Expense Application - Executive Summary

## Project Overview

Building a full-stack expense management application based on the provided UI mockups. The application allows users to create expense reports, add individual expenses with receipts, and track their status through an approval workflow.

## Key Features

### Expense Report Management
- Create expense reports with purpose and date
- Add multiple expenses to each report
- Filter and sort reports by status, amount, date
- Submit reports for validation
- Track report status: Created → Submitted → Validated → Paid (or Denied)

### Individual Expense Tracking
- 6 expense categories: Travel, Meals, Office Supplies, Transportation, Accommodation, Entertainment
- Add expenses with amount, description, and date
- Upload receipts (PDF, PNG, JPG up to 5MB)
- Track expense status: Created → Submitted → Accepted/Denied

### File Management
- Drag & drop file upload
- Preview uploaded receipts
- Download and delete attachments
- Store files on disk (migrate to Supabase later)

## Technical Stack

### Backend
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL with TypeORM
- **API**: RESTful with Swagger/OpenAPI documentation
- **Auth**: Mock authentication guard (real auth later)
- **File Upload**: Multer with disk storage

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library

### Shared
- **Package**: Centralized TypeScript interfaces and DTOs
- **Ensures**: Type safety across frontend and backend

## Database Schema

**PostgreSQL Schema: `expenses`**

All tables are organized in the `expenses` schema for proper isolation from other applications.

### Three Main Tables

1. **expenses.expense_reports**
   - id, purpose, reportDate, status, totalAmount, userId
   - Statuses: Created, Submitted, Validated, Denied, Paid

2. **expenses.expenses**
   - id, reportId, category, amount, expenseName, description, expenseDate, status
   - Categories: Travel, Meals, Office Supplies, Transportation, Accommodation, Entertainment
   - Statuses: Created, Submitted, Accepted, Denied

3. **expenses.attachments**
   - id, expenseId, fileName, originalName, mimeType, fileSize, filePath
   - Stores file metadata and disk location

## API Endpoints (Total: 20+)

### Expense Reports (7 endpoints)
- `GET /api/expense-reports` - List with filtering/sorting/pagination
- `GET /api/expense-reports/:id` - Get single report with expenses
- `POST /api/expense-reports` - Create new report
- `PATCH /api/expense-reports/:id` - Update report
- `DELETE /api/expense-reports/:id` - Soft delete
- `POST /api/expense-reports/:id/submit` - Submit for validation
- `GET /api/expense-reports/statistics/summary` - Get statistics

### Expenses (5 endpoints)
- `GET /api/expenses` - List all or by reportId
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create new expense
- `PATCH /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Soft delete

### Attachments (4 endpoints)
- `POST /api/expenses/:expenseId/attachments` - Upload file
- `GET /api/attachments/:id` - Get metadata
- `GET /api/attachments/:id/download` - Download file
- `DELETE /api/attachments/:id` - Delete file

## Frontend Pages & Components

### Pages (3)
1. **ExpenseReportListPage** - Browse and filter reports
2. **ExpenseReportDetailPage** - View expenses in a report
3. **NotFoundPage** - 404 handler

### Key Components (15+)
- ExpenseReportList, ExpenseReportCard
- ExpenseList, ExpenseCard
- CreateReportModal, AddExpenseModal
- AttachmentUpload, AttachmentPreview
- StatusBadge, LoadingSpinner, ErrorMessage
- ReportFilters, SuccessModal

## Implementation Timeline

| Phase | Duration | Focus |
|-------|----------|-------|
| Phase 1 | 2-3 days | Backend foundation (DB, entities, shared types) |
| Phase 2 | 3-4 days | Backend features (API endpoints, file upload) |
| Phase 3 | 1-2 days | Backend testing & Swagger docs |
| Phase 4 | 2-3 days | Frontend foundation (routing, services, hooks) |
| Phase 5 | 2-3 days | Frontend expense reports |
| Phase 6 | 2-3 days | Frontend expenses |
| Phase 7 | 2-3 days | File upload UI |
| Phase 8 | 2-3 days | Polish & UX |
| Phase 9 | 2-3 days | Testing & QA |
| Phase 10 | 1-2 days | Documentation |

**Total Estimated Time**: 4-6 weeks

## Quality Standards

- **Test Coverage**: Minimum 80% for backend and frontend
- **Code Quality**: ESLint + Prettier enforced
- **API Documentation**: Complete Swagger/OpenAPI specs
- **Type Safety**: Strict TypeScript across all packages
- **Responsive Design**: Mobile-friendly UI

## Future Enhancements (Not in Initial Version)

- Real user authentication with JWT
- User roles and permissions (Manager, Admin)
- Email notifications for status changes
- Approval workflow with comments
- Supabase storage integration
- PDF report generation
- Multi-currency support
- Real-time updates with WebSockets

## Files Created

1. **EXPENSE_APP_PLAN.md** (883 lines)
   - Complete data models (database entities, TypeScript interfaces)
   - All API endpoint specifications with examples
   - Swagger documentation structure
   - File upload implementation details
   - Mock authentication setup
   - Validation rules

2. **EXPENSE_APP_ARCHITECTURE.md** (481 lines)
   - System architecture diagrams (Mermaid)
   - Database ERD
   - Workflow state machines
   - API request flow sequences
   - Component hierarchy
   - Data flow diagrams
   - Module organization

3. **IMPLEMENTATION_CHECKLIST.md** (494 lines)
   - 10 implementation phases
   - 150+ granular tasks
   - Backend setup (30+ tasks)
   - Frontend features (60+ tasks)
   - Testing requirements (20+ tasks)
   - Quality gates and completion criteria

4. **EXPENSE_APP_SUMMARY.md** (This file)
   - Quick reference overview
   - Key decisions and rationale

## Dependencies to Install

### Backend
```bash
# Already installed: @nestjs/typeorm, typeorm, pg
npm install --save multer @types/multer
npm install --save class-validator class-transformer
```

### Frontend
```bash
npm install --save react-router-dom
npm install --save-dev @types/react-router-dom
```

## Configuration Requirements

### Environment Variables (.env)

**Backend:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/expenses2_dev
DB_SCHEMA=expenses
DB_SYNCHRONIZE=true
DB_LOGGING=true
PORT=3001
CORS_ORIGIN=http://localhost:3000
UPLOAD_DIR=./uploads/receipts
MAX_FILE_SIZE=5242880
```

**Frontend:**
```env
VITE_API_URL=http://localhost:3001
```

## Starting Point

The project already has:
- ✅ Monorepo structure with workspaces
- ✅ Frontend (React + Vite + Tailwind)
- ✅ Backend (NestJS + TypeORM)
- ✅ Shared package structure
- ✅ Testing infrastructure
- ✅ Development servers running

**Next Steps**: Proceed with implementation starting at Phase 1

## Key Design Decisions

1. **PostgreSQL Schema**: Using `expenses` schema for proper table isolation. Professional approach that keeps table names clean and separates this application from others in the same database.

2. **Mock Authentication**: Simple guard that adds a mock user to all requests. Easy to replace with real auth later.

3. **File Storage**: Store on disk initially with path in database. Migration to Supabase storage will be straightforward.

4. **Status Workflow**: Linear workflow (Created → Submitted → Validated → Paid) with Denied as an alternate path. Keeps complexity low.

5. **Soft Deletes**: Use TypeORM's soft delete for all entities. Data is never permanently removed.

6. **Currency**: USD only for MVP. Schema supports decimal(10,2) which allows adding currency later.

7. **Pagination**: Backend handles pagination/filtering. Frontend requests data as needed.

8. **Validation**: class-validator on backend DTOs, form validation on frontend. Double validation for security.

9. **Categories**: Fixed set of 6 expense categories. Can be made configurable later.

## Success Criteria

- [ ] All CRUD operations work for expense reports
- [ ] All CRUD operations work for expenses
- [ ] File upload/download works correctly
- [ ] Filtering and sorting work on report list
- [ ] Status workflows function correctly
- [ ] All API endpoints documented in Swagger
- [ ] 80%+ test coverage achieved
- [ ] UI matches provided mockups
- [ ] Mobile responsive
- [ ] No critical bugs

## Questions Answered

✅ **Expense Categories**: Travel, Meals, Office Supplies, Transportation, Accommodation, Entertainment

✅ **Status Workflow**: Created → Submitted → Validated → Paid (with Denied as alternate)

✅ **Currency**: USD only for now

✅ **File Types**: PDF, PNG, JPG, JPEG up to 5MB

✅ **User Roles**: Employee only with mock auth (Manager/Admin later)

---

**Status**: Planning complete and ready for implementation approval.

**Next Action**: Review plans and proceed to Code mode for implementation.
# Expense Application - Implementation Checklist

## Overview
This checklist breaks down the implementation into manageable tasks. Each task should be completed in order within its phase.

---

## Phase 1: Backend Foundation & Database Setup

### 1.1 Database Schema Setup
- [ ] Create migration to create `expenses` PostgreSQL schema
- [ ] Create database migration for ExpenseReport entity (in expenses schema)
- [ ] Create database migration for Expense entity (in expenses schema)
- [ ] Create database migration for Attachment entity (in expenses schema)
- [ ] Add database indexes for performance
- [ ] Configure TypeORM with schema: 'expenses'
- [ ] Test migrations (up/down)
- [ ] Verify schema and tables in PostgreSQL

### 1.2 Shared TypeScript Package
- [ ] Create enums file (`packages/shared/src/types/enums.ts`)
  - [ ] ReportStatus enum
  - [ ] ExpenseCategory enum
  - [ ] ExpenseStatus enum
- [ ] Create expense-report types (`packages/shared/src/types/expense-report.types.ts`)
  - [ ] ExpenseReportDto
  - [ ] CreateExpenseReportDto
  - [ ] UpdateExpenseReportDto
  - [ ] ExpenseReportListItemDto
  - [ ] ExpenseReportFilterDto
  - [ ] ExpenseReportSortDto
- [ ] Create expense types (`packages/shared/src/types/expense.types.ts`)
  - [ ] ExpenseDto
  - [ ] CreateExpenseDto
  - [ ] UpdateExpenseDto
- [ ] Create attachment types (`packages/shared/src/types/attachment.types.ts`)
  - [ ] AttachmentDto
  - [ ] UploadAttachmentResponseDto
- [ ] Create common types (`packages/shared/src/types/common.types.ts`)
  - [ ] PaginationDto
  - [ ] PaginatedResponseDto
  - [ ] ApiResponseDto
- [ ] Update index.ts to export all types
- [ ] Build shared package (`npm run build -w packages/shared`)

### 1.3 Backend Entity Models
- [ ] Create ExpenseReport entity with schema decorator: `@Entity('expense_reports', { schema: 'expenses' })`
- [ ] Create Expense entity with schema decorator: `@Entity('expenses', { schema: 'expenses' })`
- [ ] Create Attachment entity with schema decorator: `@Entity('attachments', { schema: 'expenses' })`
- [ ] Verify entity relationships
- [ ] Test entity creation with TypeORM in expenses schema

---

## Phase 2: Backend Core Functionality

### 2.1 Authentication & Guards
- [ ] Create MockAuthGuard (`apps/backend/src/common/guards/mock-auth.guard.ts`)
- [ ] Create CurrentUser decorator (`apps/backend/src/common/decorators/current-user.decorator.ts`)
- [ ] Test guard functionality
- [ ] Apply guard globally or to protected routes

### 2.2 File Upload Configuration
- [ ] Create upload config (`apps/backend/src/config/upload.config.ts`)
- [ ] Configure Multer with disk storage
- [ ] Set file size limits (5MB)
- [ ] Set allowed MIME types (PDF, PNG, JPG, JPEG)
- [ ] Create uploads directory structure
- [ ] Add file validation logic

### 2.3 ExpenseReport Module
- [ ] Create ExpenseReport module
- [ ] Create ExpenseReport controller
  - [ ] GET /api/expense-reports (list with pagination, filtering, sorting)
  - [ ] GET /api/expense-reports/:id (single report with expenses)
  - [ ] POST /api/expense-reports (create new report)
  - [ ] PATCH /api/expense-reports/:id (update report)
  - [ ] DELETE /api/expense-reports/:id (soft delete)
  - [ ] POST /api/expense-reports/:id/submit (submit for validation)
- [ ] Create ExpenseReport service
  - [ ] findAll with filters and pagination
  - [ ] findOne with relations
  - [ ] create
  - [ ] update
  - [ ] remove (soft delete)
  - [ ] submit (change status)
  - [ ] calculateTotalAmount helper
- [ ] Create ExpenseReport repository (if using custom repository)
- [ ] Add input validation with class-validator DTOs
- [ ] Add Swagger decorators to controller

### 2.4 Expense Module
- [ ] Create Expense module
- [ ] Create Expense controller
  - [ ] GET /api/expenses (list, optionally filtered by reportId)
  - [ ] GET /api/expenses/:id (single expense)
  - [ ] POST /api/expenses (create new expense)
  - [ ] PATCH /api/expenses/:id (update expense)
  - [ ] DELETE /api/expenses/:id (soft delete)
- [ ] Create Expense service
  - [ ] findAll with optional reportId filter
  - [ ] findOne with relations
  - [ ] create
  - [ ] update
  - [ ] remove (soft delete)
  - [ ] updateReportTotal helper (recalculate report total)
- [ ] Create Expense repository (if using custom repository)
- [ ] Add input validation with class-validator DTOs
- [ ] Add Swagger decorators to controller

### 2.5 Attachment Module
- [ ] Create Attachment module
- [ ] Create Attachment controller
  - [ ] POST /api/expenses/:expenseId/attachments (upload file)
  - [ ] GET /api/attachments/:id (get metadata)
  - [ ] GET /api/attachments/:id/download (download file)
  - [ ] DELETE /api/attachments/:id (delete file and record)
- [ ] Create Attachment service
  - [ ] create (save file metadata to DB)
  - [ ] findOne
  - [ ] remove (delete file from disk and DB record)
  - [ ] getFilePath helper
  - [ ] validateFileType helper
- [ ] Create Attachment repository (if using custom repository)
- [ ] Add file upload validation
- [ ] Add Swagger decorators to controller
- [ ] Configure static file serving or download endpoint

### 2.6 Statistics Module
- [ ] Create Statistics module
- [ ] Create Statistics controller
  - [ ] GET /api/expense-reports/statistics/summary
- [ ] Create Statistics service
  - [ ] getSummary (total reports, total amount, by status, by category)
- [ ] Add Swagger decorators to controller

---

## Phase 3: Backend Polish & Testing

### 3.1 Error Handling & Validation
- [ ] Create global exception filter
- [ ] Add validation pipes globally
- [ ] Add proper error messages for all endpoints
- [ ] Test validation rules
- [ ] Test error responses

### 3.2 Swagger Documentation
- [ ] Configure Swagger in main.ts
- [ ] Add API tags for each module
- [ ] Add operation summaries and descriptions
- [ ] Add request/response examples
- [ ] Add authentication decorator (bearer token for future)
- [ ] Test Swagger UI at /api-docs

### 3.3 Backend Testing
- [ ] Write unit tests for ExpenseReport service
- [ ] Write unit tests for Expense service
- [ ] Write unit tests for Attachment service
- [ ] Write integration tests for ExpenseReport controller
- [ ] Write integration tests for Expense controller
- [ ] Write integration tests for Attachment controller
- [ ] Achieve 80%+ test coverage
- [ ] Run all tests successfully

---

## Phase 4: Frontend Foundation

### 4.1 Project Setup & Routing
- [ ] Install React Router DOM (`npm install react-router-dom`)
- [ ] Create route configuration
  - [ ] / (ExpenseReportListPage)
  - [ ] /reports/:id (ExpenseReportDetailPage)
  - [ ] * (NotFoundPage)
- [ ] Set up Router in App.tsx
- [ ] Create basic page components

### 4.2 API Service Layer
- [ ] Update api.ts base configuration
- [ ] Create expense-report.service.ts
  - [ ] getExpenseReports (with filters, pagination)
  - [ ] getExpenseReport (by id)
  - [ ] createExpenseReport
  - [ ] updateExpenseReport
  - [ ] deleteExpenseReport
  - [ ] submitExpenseReport
- [ ] Create expense.service.ts
  - [ ] getExpenses (optional reportId filter)
  - [ ] getExpense (by id)
  - [ ] createExpense
  - [ ] updateExpense
  - [ ] deleteExpense
- [ ] Create attachment.service.ts
  - [ ] uploadAttachment
  - [ ] getAttachment
  - [ ] downloadAttachment
  - [ ] deleteAttachment
- [ ] Add error handling for all services
- [ ] Add loading states

### 4.3 Custom Hooks
- [ ] Create useExpenseReports hook (fetch, filter, pagination)
- [ ] Create useExpenseReport hook (fetch single, update, delete)
- [ ] Create useExpenses hook (fetch by report)
- [ ] Create useAttachments hook (upload, delete)

### 4.4 Common Components
- [ ] Create StatusBadge component (color-coded status display)
- [ ] Create LoadingSpinner component
- [ ] Create ErrorMessage component
- [ ] Create SuccessModal component
- [ ] Create ConfirmDialog component
- [ ] Create EmptyState component

---

## Phase 5: Frontend Features - Expense Reports

### 5.1 Expense Report List Page
- [ ] Create ExpenseReportListPage component
- [ ] Create ExpenseReportList component
- [ ] Create ExpenseReportCard component
  - [ ] Display purpose, date, status, total amount
  - [ ] Show expense count
  - [ ] Add click handler to navigate to details
- [ ] Create ReportFilters component
  - [ ] Status filter (multi-select)
  - [ ] Amount range filter
  - [ ] Date range filter
  - [ ] Search by purpose
- [ ] Add pagination controls
- [ ] Add sorting controls (by date, amount, created date)
- [ ] Implement filter logic
- [ ] Add loading and error states

### 5.2 Create Report Modal
- [ ] Create CreateReportModal component
- [ ] Create form with purpose and date fields
- [ ] Add form validation
  - [ ] Purpose required (1-255 chars)
  - [ ] Date required, not in future
- [ ] Add submit handler
- [ ] Show success message
- [ ] Refresh list after creation
- [ ] Handle errors

### 5.3 Expense Report Detail Page
- [ ] Create ExpenseReportDetailPage component
- [ ] Create ReportHeader component
  - [ ] Display purpose, date, status, total
  - [ ] Add Edit button
  - [ ] Add Submit button (if status is Created)
  - [ ] Add Delete button
- [ ] Create ExpenseList component
- [ ] Fetch report with expenses on load
- [ ] Add "Add Expense" button
- [ ] Handle report submission
- [ ] Handle report deletion with confirmation
- [ ] Add loading and error states

---

## Phase 6: Frontend Features - Expenses

### 6.1 Expense Components
- [ ] Create ExpenseCard component
  - [ ] Display category icon
  - [ ] Display expense name, amount, date
  - [ ] Display status badge
  - [ ] Show description if present
  - [ ] Display attachment count
  - [ ] Add Edit/Delete buttons
- [ ] Create category icons mapping
- [ ] Add edit/delete handlers

### 6.2 Add/Edit Expense Modal
- [ ] Create AddExpenseModal component
- [ ] Create ExpenseForm component
  - [ ] Category dropdown (all 6 categories)
  - [ ] Amount input (currency format)
  - [ ] Expense name input (optional)
  - [ ] Description textarea (optional)
  - [ ] Expense date picker
- [ ] Add form validation
  - [ ] Category required
  - [ ] Amount required, positive, 2 decimals
  - [ ] Date required, not in future
- [ ] Add submit handler (create or update)
- [ ] Show success message
- [ ] Refresh expense list after creation/update
- [ ] Handle errors

---

## Phase 7: Frontend Features - File Upload

### 7.1 File Upload Component
- [ ] Create AttachmentUpload component
- [ ] Implement drag & drop zone
- [ ] Add click-to-browse file input
- [ ] Add file type validation (PDF, PNG, JPG, JPEG)
- [ ] Add file size validation (max 5MB)
- [ ] Show upload progress
- [ ] Display validation errors
- [ ] Handle upload success/failure

### 7.2 Attachment Display
- [ ] Create AttachmentList component
- [ ] Create AttachmentPreview component
  - [ ] Show PDF preview (first page or icon)
  - [ ] Show image preview (thumbnail)
  - [ ] Add download button
  - [ ] Add delete button with confirmation
  - [ ] Add zoom controls
- [ ] Implement delete handler
- [ ] Implement download handler
- [ ] Add loading states

---

## Phase 8: Frontend Polish

### 8.1 Styling & Responsiveness
- [ ] Apply Tailwind CSS styles consistently
- [ ] Match design mockups for colors, spacing, typography
- [ ] Ensure mobile responsiveness
- [ ] Add hover states and transitions
- [ ] Test on different screen sizes

### 8.2 User Experience
- [ ] Add loading spinners for all async operations
- [ ] Add optimistic updates where appropriate
- [ ] Add toast notifications for success/error messages
- [ ] Add keyboard navigation support
- [ ] Add accessibility attributes (ARIA labels)
- [ ] Test user flows end-to-end

### 8.3 Error Handling
- [ ] Display user-friendly error messages
- [ ] Add retry mechanisms for failed requests
- [ ] Add form validation feedback
- [ ] Test error scenarios

---

## Phase 9: Testing & Quality Assurance

### 9.1 Frontend Testing
- [ ] Write component tests for common components
- [ ] Write component tests for expense report components
- [ ] Write component tests for expense components
- [ ] Write tests for custom hooks
- [ ] Write tests for API services
- [ ] Achieve 80%+ test coverage
- [ ] Run all tests successfully

### 9.2 Integration Testing
- [ ] Test complete expense report creation flow
- [ ] Test expense creation with file upload
- [ ] Test report submission workflow
- [ ] Test filtering and sorting
- [ ] Test pagination
- [ ] Test error scenarios

### 9.3 Manual Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Edge
- [ ] Test on mobile browsers
- [ ] Test all CRUD operations
- [ ] Test file upload with different file types and sizes
- [ ] Test validation rules
- [ ] Test error handling

---

## Phase 10: Documentation & Deployment Prep

### 10.1 Documentation
- [ ] Update README.md with setup instructions
- [ ] Document API endpoints
- [ ] Document component usage
- [ ] Add inline code comments
- [ ] Create user guide (optional)

### 10.2 Code Quality
- [ ] Run ESLint and fix all warnings
- [ ] Run Prettier and format all code
- [ ] Remove console.logs and debug code
- [ ] Remove unused imports
- [ ] Review code for improvements

### 10.3 Performance
- [ ] Optimize image loading
- [ ] Add lazy loading for routes
- [ ] Minimize bundle size
- [ ] Test performance with large datasets
- [ ] Add loading indicators

### 10.4 Security
- [ ] Review authentication implementation
- [ ] Add input sanitization
- [ ] Review file upload security
- [ ] Test SQL injection prevention
- [ ] Test XSS prevention

---

## Completion Checklist

### Backend ✓
- [ ] All endpoints implemented and tested
- [ ] Swagger documentation complete
- [ ] 80%+ test coverage achieved
- [ ] Error handling implemented
- [ ] Mock authentication working

### Frontend ✓
- [ ] All pages and components implemented
- [ ] File upload working
- [ ] All CRUD operations working
- [ ] Responsive design complete
- [ ] Error handling implemented

### Integration ✓
- [ ] Frontend successfully communicates with backend
- [ ] All features work end-to-end
- [ ] File upload and download working
- [ ] Status workflows functional

### Quality ✓
- [ ] Code linted and formatted
- [ ] Tests passing
- [ ] Documentation complete
- [ ] No critical bugs
- [ ] Ready for review

---

## Estimated Timeline

- **Phase 1**: 2-3 days (Backend foundation)
- **Phase 2**: 3-4 days (Backend features)
- **Phase 3**: 1-2 days (Backend testing)
- **Phase 4**: 2-3 days (Frontend foundation)
- **Phase 5**: 2-3 days (Frontend expense reports)
- **Phase 6**: 2-3 days (Frontend expenses)
- **Phase 7**: 2-3 days (File upload)
- **Phase 8**: 2-3 days (Polish)
- **Phase 9**: 2-3 days (Testing)
- **Phase 10**: 1-2 days (Documentation)

**Total**: 19-29 days (approximately 4-6 weeks)

---

## Notes

- Complete tasks in order within each phase
- Test thoroughly after each major feature
- Commit frequently with meaningful messages
- Keep documentation updated as you progress
- Ask for clarification if requirements are unclear
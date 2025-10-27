# Expense Application - Detailed Implementation Plan

## 1. Database Schema

### 1.1 Database Schema

**Schema Name: `expenses`**

All tables will be created in the `expenses` PostgreSQL schema for proper isolation.

```sql
CREATE SCHEMA IF NOT EXISTS expenses;
```

### 1.2 ExpenseReport Entity

```typescript
@Entity('expense_reports', { schema: 'expenses' })
export class ExpenseReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  purpose: string;

  @Column({ type: 'date' })
  reportDate: Date;

  @Column({
    type: 'enum',
    enum: ['Created', 'Submitted', 'Validated', 'Denied', 'Paid'],
    default: 'Created'
  })
  status: ReportStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  userId: string; // Mock user ID for now

  @OneToMany(() => Expense, (expense) => expense.report, { cascade: true })
  expenses: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
```

### 1.3 Expense Entity

```typescript
@Entity('expenses', { schema: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ExpenseReport, (report) => report.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reportId' })
  report: ExpenseReport;

  @Column({ type: 'uuid' })
  reportId: string;

  @Column({
    type: 'enum',
    enum: ['Travel', 'Meals', 'Office Supplies', 'Transportation', 'Accommodation', 'Entertainment'],
  })
  category: ExpenseCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  expenseName: string; // Optional expense name

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  expenseDate: Date;

  @Column({
    type: 'enum',
    enum: ['Created', 'Submitted', 'Accepted', 'Denied'],
    default: 'Created'
  })
  status: ExpenseStatus;

  @OneToMany(() => Attachment, (attachment) => attachment.expense, { cascade: true })
  attachments: Attachment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
```

### 1.4 Attachment Entity

```typescript
@Entity('attachments', { schema: 'expenses' })
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Expense, (expense) => expense.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'expenseId' })
  expense: Expense;

  @Column({ type: 'uuid' })
  expenseId: string;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'bigint' })
  fileSize: number;

  @Column({ type: 'varchar', length: 500 })
  filePath: string; // Relative path to file on disk

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### 1.5 Database Indexes

```sql
-- Performance indexes (within expenses schema)
CREATE INDEX idx_expense_reports_status ON expenses.expense_reports(status);
CREATE INDEX idx_expense_reports_user ON expenses.expense_reports(user_id);
CREATE INDEX idx_expense_reports_created_at ON expenses.expense_reports(created_at DESC);
CREATE INDEX idx_expenses_report_id ON expenses.expenses(report_id);
CREATE INDEX idx_expenses_category ON expenses.expenses(category);
CREATE INDEX idx_attachments_expense_id ON expenses.attachments(expense_id);
```

### 1.6 TypeORM Configuration

```typescript
// apps/backend/src/app.module.ts
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get('DATABASE_URL'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
    logging: configService.get('DB_LOGGING') === 'true',
    schema: 'expenses', // Default schema for all entities
    ssl: {
      rejectUnauthorized: false,
    },
  }),
}),
```

## 2. TypeScript Interfaces (Shared Package)

### 2.1 Enums

```typescript
// packages/shared/src/types/enums.ts

export enum ReportStatus {
  Created = 'Created',
  Submitted = 'Submitted',
  Validated = 'Validated',
  Denied = 'Denied',
  Paid = 'Paid'
}

export enum ExpenseCategory {
  Travel = 'Travel',
  Meals = 'Meals',
  OfficeSupplies = 'Office Supplies',
  Transportation = 'Transportation',
  Accommodation = 'Accommodation',
  Entertainment = 'Entertainment'
}

export enum ExpenseStatus {
  Created = 'Created',
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Denied = 'Denied'
}
```

### 2.2 DTOs and Interfaces

```typescript
// packages/shared/src/types/expense-report.types.ts

export interface ExpenseReportDto {
  id: string;
  purpose: string;
  reportDate: string; // ISO date string
  status: ReportStatus;
  totalAmount: number;
  userId: string;
  expenses: ExpenseDto[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseReportDto {
  purpose: string;
  reportDate: string; // ISO date string in format YYYY-MM-DD
}

export interface UpdateExpenseReportDto {
  purpose?: string;
  reportDate?: string;
  status?: ReportStatus;
}

export interface ExpenseReportListItemDto {
  id: string;
  purpose: string;
  reportDate: string;
  status: ReportStatus;
  totalAmount: number;
  expenseCount: number;
  createdAt: string;
}

export interface ExpenseReportFilterDto {
  status?: ReportStatus[];
  amountMin?: number;
  amountMax?: number;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface ExpenseReportSortDto {
  field: 'reportDate' | 'totalAmount' | 'createdAt' | 'purpose';
  order: 'ASC' | 'DESC';
}
```

```typescript
// packages/shared/src/types/expense.types.ts

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

export interface CreateExpenseDto {
  reportId: string;
  category: ExpenseCategory;
  amount: number;
  expenseName?: string;
  description?: string;
  expenseDate: string; // ISO date string in format YYYY-MM-DD
}

export interface UpdateExpenseDto {
  category?: ExpenseCategory;
  amount?: number;
  expenseName?: string;
  description?: string;
  expenseDate?: string;
  status?: ExpenseStatus;
}
```

```typescript
// packages/shared/src/types/attachment.types.ts

export interface AttachmentDto {
  id: string;
  expenseId: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
}

export interface UploadAttachmentResponseDto {
  attachmentId: string;
  fileName: string;
  fileSize: number;
}
```

```typescript
// packages/shared/src/types/common.types.ts

export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: PaginationDto;
}

export interface ApiResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## 3. API Endpoints Specification

### 3.1 Expense Reports Endpoints

#### GET /api/expense-reports
Get paginated list of expense reports with filtering and sorting

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `status` (ReportStatus[], optional) - Filter by status
- `amountMin` (number, optional) - Minimum amount
- `amountMax` (number, optional) - Maximum amount
- `dateFrom` (string, optional) - Start date (YYYY-MM-DD)
- `dateTo` (string, optional) - End date (YYYY-MM-DD)
- `search` (string, optional) - Search in purpose
- `sortBy` (string, optional) - Sort field
- `sortOrder` (string, optional) - ASC or DESC

**Response:** `PaginatedResponseDto<ExpenseReportListItemDto>`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "purpose": "Q4 Client On-site",
      "reportDate": "2024-10-24",
      "status": "Submitted",
      "totalAmount": 175.00,
      "expenseCount": 3,
      "createdAt": "2024-10-21T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### GET /api/expense-reports/:id
Get single expense report with all expenses

**Response:** `ApiResponseDto<ExpenseReportDto>`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "purpose": "Business Trip to SF",
    "reportDate": "2024-07-18",
    "status": "Submitted",
    "totalAmount": 1513.60,
    "userId": "mock-user-1",
    "expenses": [...],
    "createdAt": "2024-07-15T10:00:00Z",
    "updatedAt": "2024-07-18T14:30:00Z"
  }
}
```

#### POST /api/expense-reports
Create new expense report

**Request Body:** `CreateExpenseReportDto`

```json
{
  "purpose": "Q3 Client Meeting",
  "reportDate": "2024-10-24"
}
```

**Response:** `ApiResponseDto<ExpenseReportDto>`

#### PATCH /api/expense-reports/:id
Update expense report

**Request Body:** `UpdateExpenseReportDto`

```json
{
  "purpose": "Updated Purpose",
  "status": "Submitted"
}
```

**Response:** `ApiResponseDto<ExpenseReportDto>`

#### DELETE /api/expense-reports/:id
Soft delete expense report

**Response:** `ApiResponseDto<{ deleted: boolean }>`

#### POST /api/expense-reports/:id/submit
Submit expense report for validation

**Response:** `ApiResponseDto<ExpenseReportDto>`

### 3.2 Expenses Endpoints

#### GET /api/expenses
Get all expenses (optionally filtered by reportId)

**Query Parameters:**
- `reportId` (string, optional) - Filter by report

**Response:** `ApiResponseDto<ExpenseDto[]>`

#### GET /api/expenses/:id
Get single expense

**Response:** `ApiResponseDto<ExpenseDto>`

#### POST /api/expenses
Create new expense

**Request Body:** `CreateExpenseDto`

```json
{
  "reportId": "uuid",
  "category": "Travel",
  "amount": 450.50,
  "expenseName": "Flight to SFO",
  "description": "Round trip flight for client meeting",
  "expenseDate": "2024-10-24"
}
```

**Response:** `ApiResponseDto<ExpenseDto>`

#### PATCH /api/expenses/:id
Update expense

**Request Body:** `UpdateExpenseDto`

**Response:** `ApiResponseDto<ExpenseDto>`

#### DELETE /api/expenses/:id
Soft delete expense

**Response:** `ApiResponseDto<{ deleted: boolean }>`

### 3.3 Attachments Endpoints

#### POST /api/expenses/:expenseId/attachments
Upload attachment for an expense

**Request:** multipart/form-data with `file` field

**Validation:**
- Max file size: 5MB
- Allowed types: PDF, PNG, JPG, JPEG

**Response:** `ApiResponseDto<UploadAttachmentResponseDto>`

```json
{
  "success": true,
  "data": {
    "attachmentId": "uuid",
    "fileName": "receipt_20241024.pdf",
    "fileSize": 245678
  }
}
```

#### GET /api/attachments/:id
Get attachment metadata

**Response:** `ApiResponseDto<AttachmentDto>`

#### GET /api/attachments/:id/download
Download attachment file

**Response:** File stream with appropriate headers

#### DELETE /api/attachments/:id
Delete attachment

**Response:** `ApiResponseDto<{ deleted: boolean }>`

### 3.4 Statistics Endpoints

#### GET /api/expense-reports/statistics/summary
Get expense report statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "totalReports": 45,
    "totalAmount": 12345.67,
    "byStatus": {
      "Created": 5,
      "Submitted": 10,
      "Validated": 20,
      "Paid": 8,
      "Denied": 2
    },
    "byCategory": {
      "Travel": 5000.00,
      "Meals": 2000.00,
      "Accommodation": 3000.00,
      "Transportation": 1500.00,
      "Office Supplies": 500.00,
      "Entertainment": 345.67
    }
  }
}
```

## 4. Swagger/OpenAPI Specification

### 4.1 API Documentation Structure

```typescript
// main.ts - Swagger setup
const config = new DocumentBuilder()
  .setTitle('Expense Management API')
  .setDescription('API for managing expense reports and expenses')
  .setVersion('1.0')
  .addTag('expense-reports', 'Expense report management')
  .addTag('expenses', 'Individual expense management')
  .addTag('attachments', 'File attachment management')
  .addTag('statistics', 'Reports and statistics')
  .addBearerAuth()
  .build();
```

### 4.2 Controller Decorators Example

```typescript
@ApiTags('expense-reports')
@Controller('api/expense-reports')
export class ExpenseReportController {
  
  @Get()
  @ApiOperation({ summary: 'Get all expense reports' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ReportStatus, isArray: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns paginated expense reports',
    type: PaginatedExpenseReportListDto
  })
  async findAll(@Query() query: ExpenseReportFilterDto) {
    // Implementation
  }

  @Post()
  @ApiOperation({ summary: 'Create new expense report' })
  @ApiBody({ type: CreateExpenseReportDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Expense report created successfully',
    type: ExpenseReportDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() dto: CreateExpenseReportDto) {
    // Implementation
  }
}
```

## 5. File Upload Strategy

### 5.1 Storage Configuration

```typescript
// File storage configuration
const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg'
  ],
  uploadDirectory: './uploads/receipts',
  fileNaming: 'timestamp-uuid' // e.g., 20241027-uuid.pdf
};
```

### 5.2 Upload Implementation

```typescript
// Use multer for file handling
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/receipts',
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const uuid = uuidv4();
      const extension = path.extname(file.originalname);
      cb(null, `${timestamp}-${uuid}${extension}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
};
```

### 5.3 File Serving

```typescript
// Serve static files
app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  prefix: '/uploads/',
});

// Or use dedicated endpoint with access control
@Get(':id/download')
async downloadAttachment(@Param('id') id: string, @Res() res: Response) {
  const attachment = await this.attachmentService.findOne(id);
  const filePath = path.join(process.cwd(), attachment.filePath);
  res.download(filePath, attachment.originalName);
}
```

## 6. Mock Authentication Guard

### 6.1 Mock Auth Guard Implementation

```typescript
// guards/mock-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Add mock user to request
    request.user = {
      id: 'mock-user-1',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'employee'
    };
    
    return true;
  }
}
```

### 6.2 Usage in Controllers

```typescript
@Controller('api/expense-reports')
@UseGuards(MockAuthGuard)
export class ExpenseReportController {
  // All routes protected by mock auth
  
  @Post()
  async create(@Body() dto: CreateExpenseReportDto, @Request() req) {
    const userId = req.user.id; // Access mock user
    return this.service.create(dto, userId);
  }
}
```

### 6.3 User Context Decorator

```typescript
// decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage
@Post()
async create(@Body() dto: CreateExpenseReportDto, @CurrentUser() user: any) {
  return this.service.create(dto, user.id);
}
```

## 7. Project Structure

```
apps/backend/src/
├── main.ts
├── app.module.ts
├── common/
│   ├── guards/
│   │   └── mock-auth.guard.ts
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   ├── interceptors/
│   │   └── transform.interceptor.ts
│   └── filters/
│       └── http-exception.filter.ts
├── config/
│   ├── database.config.ts
│   └── upload.config.ts
├── modules/
│   ├── expense-reports/
│   │   ├── expense-report.entity.ts
│   │   ├── expense-report.module.ts
│   │   ├── expense-report.controller.ts
│   │   ├── expense-report.service.ts
│   │   └── expense-report.repository.ts
│   ├── expenses/
│   │   ├── expense.entity.ts
│   │   ├── expense.module.ts
│   │   ├── expense.controller.ts
│   │   ├── expense.service.ts
│   │   └── expense.repository.ts
│   ├── attachments/
│   │   ├── attachment.entity.ts
│   │   ├── attachment.module.ts
│   │   ├── attachment.controller.ts
│   │   ├── attachment.service.ts
│   │   └── attachment.repository.ts
│   └── statistics/
│       ├── statistics.module.ts
│       ├── statistics.controller.ts
│       └── statistics.service.ts
└── database/
    └── migrations/
        └── 1698000000000-InitialSchema.ts

apps/frontend/src/
├── main.tsx
├── App.tsx
├── pages/
│   ├── ExpenseReportListPage.tsx
│   ├── ExpenseReportDetailPage.tsx
│   └── NotFoundPage.tsx
├── components/
│   ├── expense-reports/
│   │   ├── ExpenseReportList.tsx
│   │   ├── ExpenseReportCard.tsx
│   │   ├── CreateReportModal.tsx
│   │   └── ReportFilters.tsx
│   ├── expenses/
│   │   ├── ExpenseList.tsx
│   │   ├── ExpenseCard.tsx
│   │   ├── AddExpenseModal.tsx
│   │   └── ExpenseForm.tsx
│   ├── attachments/
│   │   ├── AttachmentUpload.tsx
│   │   ├── AttachmentPreview.tsx
│   │   └── AttachmentList.tsx
│   └── common/
│       ├── StatusBadge.tsx
│       ├── LoadingSpinner.tsx
│       ├── ErrorMessage.tsx
│       └── SuccessModal.tsx
├── services/
│   ├── api.ts
│   ├── expense-report.service.ts
│   ├── expense.service.ts
│   └── attachment.service.ts
├── hooks/
│   ├── useExpenseReports.ts
│   ├── useExpenses.ts
│   └── useAttachments.ts
├── types/
│   └── (imports from shared package)
└── utils/
    ├── formatters.ts
    ├── validators.ts
    └── constants.ts
```

## 8. Implementation Tasks Breakdown

### Phase 1: Backend Foundation (Priority 1)
1. Create database entities (ExpenseReport, Expense, Attachment)
2. Set up TypeORM migrations
3. Create shared TypeScript interfaces and enums
4. Implement mock authentication guard
5. Set up file upload configuration

### Phase 2: Backend API (Priority 1)
6. Implement ExpenseReport module (CRUD + submit)
7. Implement Expense module (CRUD)
8. Implement Attachment module (upload, download, delete)
9. Implement Statistics endpoint
10. Add comprehensive Swagger documentation
11. Add input validation with class-validator
12. Add error handling and logging

### Phase 3: Frontend Foundation (Priority 2)
13. Set up React Router for navigation
14. Create API service layer with Axios
15. Set up state management (Context API or Zustand)
16. Create common components (StatusBadge, modals, etc.)
17. Implement responsive layout structure

### Phase 4: Frontend Features (Priority 2)
18. Implement Expense Report List page with filters/sorting
19. Implement Expense Report Detail page
20. Implement Create/Edit Report modals
21. Implement Add/Edit Expense modals
22. Implement file upload component with drag & drop
23. Implement attachment preview modal
24. Add form validation and error handling

### Phase 5: Polish & Testing (Priority 3)
25. Add loading states and error messages
26. Implement success confirmations
27. Add unit tests for services and controllers
28. Add integration tests for API endpoints
29. Add component tests for React components
30. Performance optimization
31. Documentation updates

## 9. API Response Codes

### Success Codes
- `200 OK` - Successful GET, PATCH, DELETE
- `201 Created` - Successful POST

### Error Codes
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing or invalid auth (future)
- `403 Forbidden` - Insufficient permissions (future)
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate or conflict
- `413 Payload Too Large` - File size exceeds limit
- `415 Unsupported Media Type` - Invalid file type
- `422 Unprocessable Entity` - Validation failed
- `500 Internal Server Error` - Server error

## 10. Validation Rules

### Expense Report
- `purpose`: Required, 1-255 characters
- `reportDate`: Required, valid date, not in future

### Expense
- `category`: Required, valid enum value
- `amount`: Required, positive number, max 2 decimal places
- `expenseName`: Optional, max 255 characters
- `description`: Optional, max 1000 characters
- `expenseDate`: Required, valid date, not in future

### File Upload
- Max size: 5MB
- Allowed types: PDF, PNG, JPG, JPEG
- Original filename preserved
- Unique filename on disk

## 11. Notes & Considerations

### Future Enhancements (Not in Initial Version)
- Real user authentication with JWT
- User roles and permissions (Manager, Admin)
- Email notifications
- Approval workflow
- Expense report comments/notes
- Supabase storage integration
- PDF report generation
- Multi-currency support
- Mobile responsive optimization
- Real-time updates with WebSockets

### Technical Debt to Address
- Replace mock auth with real authentication
- Move file storage to Supabase
- Add comprehensive error logging
- Implement rate limiting
- Add API request caching
- Set up CI/CD pipeline
- Add E2E tests
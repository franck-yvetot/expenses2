# Expense Application - Architecture & Data Flow

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend - React + Vite"
        UI[User Interface]
        Pages[Pages Layer]
        Components[Components Layer]
        Services[API Services]
        Hooks[Custom Hooks]
    end
    
    subgraph "Backend - NestJS"
        API[REST API Controllers]
        Guards[Auth Guards]
        Services_BE[Business Logic Services]
        Repositories[TypeORM Repositories]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL Database)]
        Files[File Storage - Disk]
    end
    
    subgraph "Shared Package"
        Types[TypeScript Interfaces]
        Enums[Enums & Constants]
        DTOs[Data Transfer Objects]
    end
    
    UI --> Pages
    Pages --> Components
    Components --> Hooks
    Hooks --> Services
    Services -->|HTTP/JSON| API
    
    API --> Guards
    Guards --> Services_BE
    Services_BE --> Repositories
    Repositories --> DB
    
    Services_BE --> Files
    
    Services -.->|Import| Types
    Services -.->|Import| DTOs
    API -.->|Import| Types
    API -.->|Import| DTOs
    Services_BE -.->|Import| Enums
```

## 2. Database Entity Relationship Diagram

```mermaid
erDiagram
    ExpenseReport ||--o{ Expense : contains
    Expense ||--o{ Attachment : has
    
    ExpenseReport {
        uuid id PK
        varchar purpose
        date reportDate
        enum status
        decimal totalAmount
        varchar userId
        timestamp createdAt
        timestamp updatedAt
        timestamp deletedAt
    }
    
    Expense {
        uuid id PK
        uuid reportId FK
        enum category
        decimal amount
        varchar expenseName
        text description
        date expenseDate
        enum status
        timestamp createdAt
        timestamp updatedAt
        timestamp deletedAt
    }
    
    Attachment {
        uuid id PK
        uuid expenseId FK
        varchar fileName
        varchar originalName
        varchar mimeType
        bigint fileSize
        varchar filePath
        timestamp createdAt
        timestamp updatedAt
    }
```

## 3. Expense Report Workflow

```mermaid
stateDiagram-v2
    [*] --> Created: Create Report
    Created --> Submitted: Add Expenses & Submit
    Submitted --> Validated: Manager Approves
    Submitted --> Denied: Manager Rejects
    Validated --> Paid: Finance Processes
    Denied --> Created: Revise & Resubmit
    Paid --> [*]
    
    note right of Created
        Employee can add/edit expenses
        Employee can delete report
    end note
    
    note right of Submitted
        Waiting for manager review
        Cannot edit expenses
    end note
    
    note right of Validated
        Approved by manager
        Waiting for payment
    end note
    
    note right of Denied
        Rejected by manager
        Can revise and resubmit
    end note
    
    note right of Paid
        Payment processed
        Final state
    end note
```

## 4. Individual Expense Status Flow

```mermaid
stateDiagram-v2
    [*] --> Created: Create Expense
    Created --> Submitted: Include in Report
    Submitted --> Accepted: Approved
    Submitted --> Denied: Rejected
    Accepted --> [*]
    Denied --> Created: Revise
    
    note right of Created
        Draft state
        Can edit/delete
    end note
    
    note right of Submitted
        Part of submitted report
        Under review
    end note
```

## 5. API Request Flow - Create Expense Report

```mermaid
sequenceDiagram
    participant User
    participant UI as React UI
    participant Service as API Service
    participant Controller as ExpenseReport Controller
    participant Guard as Mock Auth Guard
    participant ExpenseService as ExpenseReport Service
    participant Repository as TypeORM Repository
    participant DB as PostgreSQL
    
    User->>UI: Click "Create Report"
    UI->>UI: Open Modal & Fill Form
    User->>UI: Submit Form
    UI->>Service: createReport(data)
    Service->>Controller: POST /api/expense-reports
    Controller->>Guard: Check Authentication
    Guard->>Guard: Add Mock User
    Guard-->>Controller: Authorized
    Controller->>Controller: Validate DTO
    Controller->>ExpenseService: create(dto, userId)
    ExpenseService->>Repository: save(entity)
    Repository->>DB: INSERT INTO expense_reports
    DB-->>Repository: Report Created
    Repository-->>ExpenseService: ExpenseReport Entity
    ExpenseService-->>Controller: ExpenseReportDto
    Controller-->>Service: 201 Created + Data
    Service-->>UI: Success Response
    UI->>UI: Show Success Modal
    UI->>UI: Refresh List
```

## 6. API Request Flow - Upload Attachment

```mermaid
sequenceDiagram
    participant User
    participant UI as React UI
    participant Service as Attachment Service
    participant Controller as Attachment Controller
    participant Multer as Multer Middleware
    participant AttachmentService as Attachment Service
    participant FileSystem as Disk Storage
    participant DB as PostgreSQL
    
    User->>UI: Select File & Upload
    UI->>Service: uploadFile(expenseId, file)
    Service->>Controller: POST /api/expenses/:id/attachments
    Controller->>Multer: Process File Upload
    Multer->>Multer: Validate Type & Size
    Multer->>FileSystem: Save to /uploads/receipts
    FileSystem-->>Multer: File Path
    Multer-->>Controller: File Metadata
    Controller->>AttachmentService: create(expenseId, metadata)
    AttachmentService->>DB: INSERT INTO attachments
    DB-->>AttachmentService: Attachment Created
    AttachmentService-->>Controller: AttachmentDto
    Controller-->>Service: 201 Created + Data
    Service-->>UI: Success Response
    UI->>UI: Show File Preview
```

## 7. Component Hierarchy - Frontend

```mermaid
graph TD
    App[App.tsx]
    App --> Router[React Router]
    
    Router --> ListPage[ExpenseReportListPage]
    Router --> DetailPage[ExpenseReportDetailPage]
    Router --> NotFound[NotFoundPage]
    
    ListPage --> ReportList[ExpenseReportList]
    ListPage --> Filters[ReportFilters]
    ListPage --> CreateModal[CreateReportModal]
    
    ReportList --> ReportCard[ExpenseReportCard]
    
    DetailPage --> ExpenseList[ExpenseList]
    DetailPage --> ReportHeader[ReportHeader]
    DetailPage --> AddExpenseModal[AddExpenseModal]
    
    ExpenseList --> ExpenseCard[ExpenseCard]
    
    ExpenseCard --> AttachmentList[AttachmentList]
    ExpenseCard --> StatusBadge[StatusBadge]
    
    AddExpenseModal --> ExpenseForm[ExpenseForm]
    AddExpenseModal --> AttachmentUpload[AttachmentUpload]
    
    AttachmentUpload --> AttachmentPreview[AttachmentPreview]
    
    style App fill:#e1f5ff
    style ListPage fill:#fff4e1
    style DetailPage fill:#fff4e1
    style CreateModal fill:#e8f5e9
    style AddExpenseModal fill:#e8f5e9
```

## 8. Data Flow - Complete User Journey

```mermaid
graph TB
    Start([User Opens App])
    Start --> ViewList[View Expense Reports List]
    ViewList --> ApplyFilters{Apply Filters?}
    ApplyFilters -->|Yes| FilteredList[Filtered List]
    ApplyFilters -->|No| CreateNew{Create New?}
    FilteredList --> CreateNew
    
    CreateNew -->|Yes| OpenModal[Open Create Modal]
    CreateNew -->|No| SelectReport{Select Report?}
    
    OpenModal --> EnterPurpose[Enter Purpose & Date]
    EnterPurpose --> SubmitReport[Submit to API]
    SubmitReport --> ShowSuccess[Show Success]
    ShowSuccess --> ViewList
    
    SelectReport -->|Yes| ViewDetail[View Report Details]
    SelectReport -->|No| ViewList
    
    ViewDetail --> AddExpense{Add Expense?}
    AddExpense -->|Yes| OpenExpenseModal[Open Add Expense Modal]
    AddExpense -->|No| SubmitForReview{Submit Report?}
    
    OpenExpenseModal --> FillExpense[Fill Expense Details]
    FillExpense --> UploadFile{Upload Receipt?}
    UploadFile -->|Yes| AttachFile[Upload File]
    UploadFile -->|No| SaveExpense[Save Expense]
    AttachFile --> SaveExpense
    SaveExpense --> ViewDetail
    
    SubmitForReview -->|Yes| Submit[Submit Report]
    SubmitForReview -->|No| ViewDetail
    Submit --> ConfirmSubmit[Show Confirmation]
    ConfirmSubmit --> End([Done])
```

## 9. Backend Module Organization

```mermaid
graph LR
    AppModule[App Module]
    
    AppModule --> ConfigMod[Config Module]
    AppModule --> TypeORM[TypeORM Module]
    AppModule --> ReportMod[ExpenseReport Module]
    AppModule --> ExpenseMod[Expense Module]
    AppModule --> AttachMod[Attachment Module]
    AppModule --> StatsMod[Statistics Module]
    
    ReportMod --> ReportCtrl[Report Controller]
    ReportMod --> ReportSvc[Report Service]
    ReportMod --> ReportRepo[Report Repository]
    
    ExpenseMod --> ExpenseCtrl[Expense Controller]
    ExpenseMod --> ExpenseSvc[Expense Service]
    ExpenseMod --> ExpenseRepo[Expense Repository]
    
    AttachMod --> AttachCtrl[Attachment Controller]
    AttachMod --> AttachSvc[Attachment Service]
    AttachMod --> AttachRepo[Attachment Repository]
    
    StatsMod --> StatsCtrl[Statistics Controller]
    StatsMod --> StatsSvc[Statistics Service]
    
    ReportCtrl -.->|Uses| MockGuard[Mock Auth Guard]
    ExpenseCtrl -.->|Uses| MockGuard
    AttachCtrl -.->|Uses| MockGuard
    
    style AppModule fill:#e1f5ff
    style ReportMod fill:#fff4e1
    style ExpenseMod fill:#e8f5e9
    style AttachMod fill:#fce4ec
    style StatsMod fill:#f3e5f5
```

## 10. File Upload Architecture

```mermaid
graph TB
    subgraph "Frontend"
        DropZone[Drag & Drop Zone]
        FileInput[File Input]
        Preview[File Preview]
    end
    
    subgraph "Backend - NestJS"
        MulterMW[Multer Middleware]
        Validation[File Validation]
        Controller[Attachment Controller]
        Service[Attachment Service]
    end
    
    subgraph "Storage"
        DiskStorage[Disk Storage<br/>/uploads/receipts]
        DBMeta[Database Metadata]
    end
    
    DropZone --> MulterMW
    FileInput --> MulterMW
    MulterMW --> Validation
    
    Validation -->|Valid| Controller
    Validation -->|Invalid| Error[Return Error 415/413]
    
    Controller --> Service
    Service --> DiskStorage
    Service --> DBMeta
    
    DiskStorage -.->|File Path| DBMeta
    DBMeta -.->|Metadata| Preview
```

## 11. API Security & Validation Flow

```mermaid
graph TB
    Request[Incoming Request]
    Request --> Guard{Auth Guard}
    Guard -->|Fail| Unauthorized[401 Unauthorized]
    Guard -->|Pass| Validation{DTO Validation}
    
    Validation -->|Invalid| BadRequest[400 Bad Request]
    Validation -->|Valid| Controller[Controller Method]
    
    Controller --> Service[Service Layer]
    Service --> Repository[Repository Layer]
    Repository --> DB[(Database)]
    
    DB -->|Error| DBError[500 Server Error]
    DB -->|Success| Transform[Response Transform]
    
    Transform --> Response[JSON Response]
    
    Controller -.->|Catch| ErrorHandler[Exception Filter]
    Service -.->|Catch| ErrorHandler
    Repository -.->|Catch| ErrorHandler
    
    ErrorHandler --> ErrorResponse[Error Response]
```

## 12. Future Architecture - With Real Auth

```mermaid
graph TB
    subgraph "Future Enhancements"
        Frontend[Frontend App]
        
        subgraph "Auth Layer"
            Login[Login Page]
            JWT[JWT Token Storage]
            AuthGuard[Real Auth Guard]
        end
        
        subgraph "Backend Services"
            UserService[User Service]
            RoleGuard[Role-Based Guard]
            EmailService[Email Service]
        end
        
        subgraph "External Services"
            Supabase[Supabase Storage]
            EmailProvider[Email Provider]
        end
        
        Frontend --> Login
        Login --> UserService
        UserService --> JWT
        JWT --> AuthGuard
        AuthGuard --> RoleGuard
        
        RoleGuard -->|Employee| EmployeeRoutes[Employee Routes]
        RoleGuard -->|Manager| ManagerRoutes[Manager Routes]
        RoleGuard -->|Admin| AdminRoutes[Admin Routes]
        
        EmailService --> EmailProvider
        FileUpload[File Upload] --> Supabase
    end
    
    style Login fill:#ffeb3b
    style JWT fill:#ffeb3b
    style AuthGuard fill:#ffeb3b
    style RoleGuard fill:#ff9800
    style Supabase fill:#4caf50
```

## Implementation Priority

### Phase 1: Core Backend (Week 1)
1. Database setup and migrations
2. Entity models
3. Shared TypeScript interfaces
4. Basic CRUD endpoints
5. Mock authentication

### Phase 2: Backend Features (Week 2)
6. File upload functionality
7. Swagger documentation
8. Business logic (status workflows)
9. Validation and error handling
10. Statistics endpoints

### Phase 3: Frontend Foundation (Week 3)
11. Project setup and routing
12. API service layer
13. Common components
14. Layout and navigation

### Phase 4: Frontend Features (Week 4)
15. Report list and detail pages
16. Create/edit modals
17. Expense management
18. File upload UI
19. Status indicators

### Phase 5: Polish (Week 5)
20. Testing (unit, integration)
21. Error handling and loading states
22. Responsive design refinement
23. Documentation
24. Performance optimization

---

**Ready for Implementation**: This architecture provides a solid foundation for building a scalable, maintainable expense management application.
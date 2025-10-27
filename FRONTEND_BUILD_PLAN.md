# Frontend Build Plan - Screen by Screen

## Agreed Implementation Order

1. **Screen 1: Expense Reports List** + **Screen 2: Create Report Modal**
2. **Screen 3: Expense Report Details** (we'll design based on mockups)
3. **Screen 4: Add/Edit Expense Modal**
4. **Screen 5: Attachment Preview**

## Screen 1 & 2: Expense Reports List Page

### Components to Build
1. `ExpenseReportListPage.tsx` - Main page container
2. `ExpenseReportCard.tsx` - Individual report card
3. `CreateReportModal.tsx` - Modal for creating new report
4. `StatusBadge.tsx` - Colored status display
5. `BottomNav.tsx` - Fixed navigation bar
6. `FilterModal.tsx` - Slide-up filter panel

### Features
- Search bar
- Filter & Sort button
- Active filter chips
- Report cards with:
  - Purpose and date
  - Total amount
  - Category icons
  - Status badge
- Create report modal
- Bottom navigation

### Data Flow
```
ExpenseReportListPage
  ├── useState for reports, loading, error
  ├── useState for filters
  ├── useState for createModalOpen
  ├── useEffect to fetch reports
  ├── SearchBar
  ├── FilterButton → opens FilterModal
  ├── ActiveFilterChips
  ├── ExpenseReportCard[] (map over reports)
  ├── CreateReportModal
  └── BottomNav
```

### API Integration
- Fetch: `expenseReportService.getExpenseReports(filters)`
- Create: `expenseReportService.createExpenseReport(data)`
- Navigate: On click, go to `/reports/:id`

## Screen 3: Expense Report Details

### Components to Build
1. `ExpenseReportDetailPage.tsx` - Main detail container
2. `ReportHeader.tsx` - Report info and actions
3. `ExpenseCard.tsx` - Individual expense card
4. `AddExpenseModal.tsx` - Modal for adding expense

### Features
- Back button
- Report header (purpose, date, total, status)
- List of expenses
- Add Expense button
- Submit Report button
- Edit/Delete actions

### Data Flow
```
ExpenseReportDetailPage
  ├── useParams to get reportId
  ├── useState for report, expenses, loading
  ├── useState for addExpenseModalOpen
  ├── useEffect to fetch report details
  ├── ReportHeader
  ├── ExpenseCard[] (map over expenses)
  ├── AddExpenseModal
  └── Action buttons (Submit, Edit, Delete)
```

### API Integration
- Fetch: `expenseReportService.getExpenseReport(id)`
- Submit: `expenseReportService.submitExpenseReport(id)`
- Update: `expenseReportService.updateExpenseReport(id, data)`
- Delete: `expenseReportService.deleteExpenseReport(id)`

## Screen 4: Add/Edit Expense Modal

### Components to Build
1. `AddExpenseModal.tsx` - Main modal
2. `ExpenseForm.tsx` - Form fields
3. `FileUploadZone.tsx` - Drag & drop upload
4. `CategoryIcon.tsx` - Category icon display

### Features
- Category dropdown
- Amount input with currency
- Optional name and description
- Date picker
- File upload zone
- Report date display
- Expense date selector

### Data Flow
```
AddExpenseModal
  ├── Props: isOpen, onClose, reportId, expense (for edit)
  ├── useState for formData
  ├── useState for uploadedFiles
  ├── handleSubmit
  ├── ExpenseForm
  └── FileUploadZone
```

### API Integration
- Create: `expenseService.createExpense(data)`
- Update: `expenseService.updateExpense(id, data)`
- Upload: `attachmentService.uploadAttachment(expenseId, file)`

## Screen 5: Attachment Preview

### Components to Build
1. `AttachmentPreview.tsx` - Full-screen preview
2. `ZoomControls.tsx` - Zoom/rotate buttons

### Features
- Full-screen image/PDF display
- Back button
- Zoom in/out
- Rotate
- Download option

### Data Flow
```
AttachmentPreview
  ├── useParams to get attachmentId
  ├── useState for attachment, zoom, rotation
  ├── useEffect to fetch attachment
  ├── Image display with transform
  └── ZoomControls
```

### API Integration
- Fetch: `attachmentService.getAttachment(id)`
- Download: `attachmentService.getDownloadUrl(id)`

---

## Status Colors Reference

From [`index.css`](apps/frontend/src/index.css:11):
```css
.status-created   { color: #f59e0b; }  /* Amber */
.status-submitted { color: #3b82f6; }  /* Blue */
.status-validated { color: #84cc16; }  /* Lime */
.status-paid      { color: #10b981; }  /* Emerald */
.status-denied    { color: #ef4444; }  /* Red */
.status-accepted  { color: #10b981; }  /* Emerald */
```

## Material Icons Reference

Common icons used:
- `search` - Search
- `tune` - Filter
- `close` - Close/Remove
- `restaurant` - Meals
- `flight` - Travel
- `shopping_cart` - Office Supplies
- `groups` - Entertainment
- `local_parking` - Transportation
- `hotel` - Accommodation
- `cloud_upload` - File upload
- `arrow_back_ios_new` - Back navigation
- `zoom_in`, `zoom_out`, `rotate_right` - Image controls

---

## Implementation Steps

### Phase 1: Report List (Next)
1. Create ExpenseReportListPage
2. Create ExpenseReportCard component
3. Create CreateReportModal
4. Set up routing in App.tsx
5. Test creating and viewing reports

### Phase 2: Report Details
1. Create ExpenseReportDetailPage
2. Create ReportHeader
3. Create ExpenseCard
4. Add navigation from list to details
5. Test viewing report with expenses

### Phase 3: Expense Management
1. Create AddExpenseModal
2. Create ExpenseForm
3. Create FileUploadZone
4. Test creating expenses
5. Test file uploads

### Phase 4: Attachment Preview
1. Create AttachmentPreview component
2. Add zoom/rotate functionality
3. Test viewing attachments
4. Test download

---

**Current Status**: Ready to build Screen 1 (Expense Reports List)

**Next Action**: Create `ExpenseReportListPage.tsx` based on HTML reference
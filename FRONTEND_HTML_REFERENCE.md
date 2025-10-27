# Frontend HTML/CSS Reference - Screen Designs

This document contains the HTML/CSS code for each screen to use as reference during React component implementation.

---

## Screen 1: Expense Reports List Page

### Description
Main page showing list of expense reports with search, filters, and navigation.

### Features
- Search bar
- Filter & Sort button with slide-up modal
- Active filter chips (removable)
- Expense report cards with:
  - Title and date
  - Total amount
  - Category icons
  - Status badge
- Bottom navigation (Reports, Submit, Profile)

### HTML/CSS Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Expense Tracker</title>
  <link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
  <link as="style" href="https://fonts.googleapis.com/css2?display=swap&family=Inter%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            primary: "#40B59D",
            "background-light": "#f6f8f7",
            "background-dark": "#12201d",
            "foreground-light": "#1f2937",
            "foreground-dark": "#f9fafb",
            "muted-light": "#6b7280",
            "muted-dark": "#9ca3af",
          },
          fontFamily: {
            display: ["Inter", "sans-serif"],
          },
          borderRadius: {
            DEFAULT: "0.5rem",
            lg: "0.75rem",
            xl: "1rem",
            full: "9999px",
          },
        },
      },
    };
  </script>
  <style>
    .status-created {
      color: #f59e0b;
    }
    .status-submitted {
      color: #3b82f6;
    }
    .status-validated {
      color: #84cc16;
    }
    .status-paid {
      color: #10b981;
    }
    .status-denied {
      color: #ef4444;
    }
  </style>
  <style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display" x-data="{ filterOpen: false }">
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="sticky top-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm z-10">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
        <div class="w-10"></div>
        <h1 class="text-lg font-bold text-foreground-light dark:text-foreground-dark">
          Expense Reports
        </h1>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <svg class="text-primary" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow pb-24">
      <div class="p-4 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <input class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-background-dark/50 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary" placeholder="Search reports..." type="text"/>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-muted-light dark:text-muted-dark">search</span>
          </div>
        </div>

        <!-- Filter Button -->
        <div class="flex items-center space-x-2">
          <button @click="filterOpen = true" class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary whitespace-nowrap">
            <span class="material-symbols-outlined text-base">tune</span>
            Filter & Sort
          </button>
        </div>

        <!-- Active Filters -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          <div class="flex items-center gap-1 bg-primary text-white text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            <span>Status: Submitted</span>
            <button class="text-white/80 hover:text-white">
              <span class="material-symbols-outlined text-base">close</span>
            </button>
          </div>
          <div class="flex items-center gap-1 bg-primary text-white text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            <span>Amount: High to Low</span>
            <button class="text-white/80 hover:text-white">
              <span class="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Expense Report Cards -->
      <div class="px-4 space-y-4">
        <!-- Card 1 -->
        <div class="bg-white dark:bg-background-dark/50 p-4 rounded-xl shadow-sm space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-foreground-light dark:text-foreground-dark font-semibold">Q4 Client On-site</p>
              <p class="text-sm text-muted-light dark:text-muted-dark">Oct 26, 2023</p>
            </div>
            <p class="text-lg font-bold text-primary">$175.00</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">restaurant</span>
              </div>
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">flight</span>
              </div>
            </div>
            <p class="text-sm status-submitted font-medium">Submitted</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white dark:bg-background-dark/50 p-4 rounded-xl shadow-sm space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-foreground-light dark:text-foreground-dark font-semibold">October Office Supplies</p>
              <p class="text-sm text-muted-light dark:text-muted-dark">Oct 24, 2023</p>
            </div>
            <p class="text-lg font-bold text-primary">$75.00</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">shopping_cart</span>
              </div>
            </div>
            <p class="text-sm status-validated font-medium">Validated</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white dark:bg-background-dark/50 p-4 rounded-xl shadow-sm space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-foreground-light dark:text-foreground-dark font-semibold">Team Offsite Event</p>
              <p class="text-sm text-muted-light dark:text-muted-dark">Oct 22, 2023</p>
            </div>
            <p class="text-lg font-bold text-primary">$215.00</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">groups</span>
              </div>
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">local_parking</span>
              </div>
            </div>
            <p class="text-sm status-paid font-medium">Paid</p>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-white dark:bg-background-dark/50 p-4 rounded-xl shadow-sm space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-foreground-light dark:text-foreground-dark font-semibold">Commute & Meals</p>
              <p class="text-sm text-muted-light dark:text-muted-dark">Oct 21, 2023</p>
            </div>
            <p class="text-lg font-bold text-primary">$40.00</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">local_parking</span>
              </div>
              <div class="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <span class="material-symbols-outlined text-primary text-lg">restaurant</span>
              </div>
            </div>
            <p class="text-sm status-created font-medium">Created</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <footer class="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark/80 backdrop-blur-sm border-t border-black/5 dark:border-white/10">
      <nav class="flex justify-around items-center h-16">
        <a class="flex flex-col items-center gap-1 text-primary" href="#">
          <svg class="text-primary" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 21V3h14v18l-7-3-7 3z"></path>
          </svg>
          <span class="text-xs font-medium">Reports</span>
        </a>
        <a class="flex flex-col items-center gap-1 text-muted-light dark:text-muted-dark hover:text-primary transition-colors" href="#">
          <svg class="w-6 h-6" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          <span class="text-xs font-medium">Submit</span>
        </a>
        <a class="flex flex-col items-center gap-1 text-muted-light dark:text-muted-dark hover:text-primary transition-colors" href="#">
          <svg class="w-6 h-6" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="text-xs font-medium">Profile</span>
        </a>
      </nav>
      <div class="h-[env(safe-area-inset-bottom)] bg-white dark:bg-background-dark/80"></div>
    </footer>
  </div>

  <!-- Filter Modal Overlay -->
  <div class="fixed inset-0 bg-black/50 z-20" style="display: none;" x-show="filterOpen" x-transition:enter="transition ease-out duration-300" x-transition:enter-end="opacity-100" x-transition:enter-start="opacity-0" x-transition:leave="transition ease-in duration-300" x-transition:leave-end="opacity-0" x-transition:leave-start="opacity-100"></div>

  <!-- Filter Modal -->
  <div class="fixed bottom-0 left-0 right-0 z-30 bg-background-light dark:bg-background-dark rounded-t-xl shadow-lg" style="display: none;" x-show="filterOpen" x-transition:enter="transition ease-out duration-300" x-transition:enter-end="translate-y-0" x-transition:enter-start="translate-y-full" x-transition:leave="transition ease-in duration-300" x-transition:leave-end="translate-y-full" x-transition:leave-start="translate-y-0">
    <!-- Modal Header -->
    <div class="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
      <h2 class="text-lg font-bold text-foreground-light dark:text-foreground-dark">Filter & Sort</h2>
      <button @click="filterOpen = false" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
        <span class="material-symbols-outlined text-muted-light dark:text-muted-dark">close</span>
      </button>
    </div>

    <!-- Modal Content -->
    <div class="p-4 space-y-6 max-h-[70vh] overflow-y-auto pb-24">
      <!-- Status Filter -->
      <div>
        <h3 class="font-semibold text-foreground-light dark:text-foreground-dark mb-2">Status</h3>
        <div class="grid grid-cols-2 gap-2">
          <button class="px-4 py-2.5 rounded-lg text-sm font-medium text-left bg-white dark:bg-white/10 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-white/20">All</button>
          <button class="px-4 py-2.5 rounded-lg text-sm font-medium text-left status-submitted bg-blue-500/10 border border-blue-500/20 text-blue-500">Submitted</button>
          <button class="px-4 py-2.5 rounded-lg text-sm font-medium text-left status-validated bg-lime-500/10 border border-lime-500/20 text-lime-500">Approved</button>
          <button class="px-4 py-2.5 rounded-lg text-sm font-medium text-left status-denied bg-red-500/10 border border-red-500/20 text-red-500">Denied</button>
          <button class="px-4 py-2.5 rounded-lg text-sm font-medium text-left status-paid bg-primary/10 border border-primary/20 text-primary">Paid</button>
        </div>
      </div>

      <!-- Date Range Filter -->
      <div>
        <h3 class="font-semibold text-foreground-light dark:text-foreground-dark mb-2">Date Range</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-muted-light dark:text-muted-dark" for="start-date">From</label>
            <input class="w-full mt-1 p-2 rounded-lg bg-white dark:bg-background-dark/50 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary" id="start-date" type="date"/>
          </div>
          <div>
            <label class="text-sm text-muted-light dark:text-muted-dark" for="end-date">To</label>
            <input class="w-full mt-1 p-2 rounded-lg bg-white dark:bg-background-dark/50 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary" id="end-date" type="date"/>
          </div>
        </div>
      </div>

      <!-- Amount Range Filter -->
      <div>
        <h3 class="font-semibold text-foreground-light dark:text-foreground-dark mb-2">Total Amount</h3>
        <div class="space-y-2">
          <input class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" max="1000" min="0" type="range" value="250"/>
          <div class="flex justify-between text-sm text-muted-light dark:text-muted-dark">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>

      <!-- Categories Filter -->
      <div>
        <h3 class="font-semibold text-foreground-light dark:text-foreground-dark mb-2">Categories</h3>
        <div class="flex flex-wrap gap-2">
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-base">restaurant</span>
            <span>Meals</span>
          </button>
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-white/10 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-white/20">
            <span class="material-symbols-outlined text-base">flight</span>
            <span>Travel</span>
          </button>
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-white/10 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-white/20">
            <span class="material-symbols-outlined text-base">shopping_cart</span>
            <span>Supplies</span>
          </button>
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-white/10 text-foreground-light dark:text-foreground-dark border border-gray-200 dark:border-white/20">
            <span class="material-symbols-outlined text-base">groups</span>
            <span>Team Event</span>
          </button>
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-base">local_parking</span>
            <span>Parking</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10">
      <div class="flex gap-4">
        <button @click="filterOpen = false" class="w-full py-3 rounded-lg text-sm font-bold bg-gray-200 dark:bg-white/10 text-foreground-light dark:text-foreground-dark">Clear</button>
        <button @click="filterOpen = false" class="w-full py-3 rounded-lg text-sm font-bold bg-primary text-white">Apply Filters</button>
      </div>
      <div class="h-[env(safe-area-inset-bottom)]"></div>
    </div>
  </div>

  <script defer="" src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></script>
</body>
</html>
```

### Key Design Elements

**Color Scheme:**
- Primary: `#40B59D` (teal/green)
- Background Light: `#f6f8f7`
- Background Dark: `#12201d`
- Foreground Light: `#1f2937`
- Foreground Dark: `#f9fafb`

**Status Colors:**
- Created: `#f59e0b` (amber)
- Submitted: `#3b82f6` (blue)
- Validated: `#84cc16` (lime)
- Paid: `#10b981` (emerald)
- Denied: `#ef4444` (red)

**Material Icons Used:**
- `search` - Search icon
- `tune` - Filter icon
- `close` - Close/remove icon
- `restaurant` - Meals category
- `flight` - Travel category
- `shopping_cart` - Office Supplies
- `groups` - Team Event/Entertainment
- `local_parking` - Transportation/Parking

**Components to Build:**
1. `Header` - Sticky header with title and add button
2. `SearchBar` - Search input with icon
3. `FilterButton` - Opens filter modal
4. `FilterChip` - Active filter display with remove button
5. `ExpenseReportCard` - Card displaying report summary
6. `StatusBadge` - Colored status label
7. `CategoryIcon` - Round icon for categories
8. `BottomNav` - Fixed navigation bar
9. `FilterModal` - Slide-up filter panel

---

## Screen 2: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

## Screen 3: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

## Screen 4: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

## Screen 5: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

## Implementation Notes

### Tailwind Configuration
The provided designs use a custom Tailwind configuration with:
- Custom colors (primary, background, foreground, muted variants)
- Custom font (Inter)
- Custom border radii
- Dark mode support

### Dependencies
- Tailwind CSS (already installed)
- Material Symbols Outlined font
- Alpine.js for modal interactions (we'll use React state instead)

### React Migration Strategy
When converting to React components:
1. Replace Alpine.js `x-data` with `useState`
2. Replace `@click` with `onClick`
3. Replace `x-show`/`x-transition` with conditional rendering and CSS transitions
4. Use React Router for navigation
5. Implement real data fetching instead of static content

---

**Status**: Screen 1 documented. Ready to receive screens 2-5.

## Screen 2: New Expense Report (Create Report Modal)

### Description
Modal/page for creating a new expense report with purpose and date fields.

### Features
- Close/Cancel button (X in header)
- Title centered in header ("New Report")
- Purpose text input with placeholder
- Date picker input
- Two action buttons (Cancel and Create Report)
- Clean, minimalist design

### HTML/CSS Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>New Expense Report</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#40B59D",
            "background-light": "#f6f8f7",
            "background-dark": "#12201d",
            "text-light": "#111827",
            "text-dark": "#f3f4f6",
            "subtle-light": "#e5e7eb",
            "subtle-dark": "#374151",
            "placeholder-light": "#9ca3af",
            "placeholder-dark": "#6b7280"
          },
          fontFamily: {
            "display": ["Inter", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "0.5rem",
            "lg": "0.75rem",
            "xl": "1rem",
            "full": "9999px"
          },
        },
      },
    }
  </script>
  <style>
    .form-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
  <style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display">
  <div class="flex flex-col h-screen justify-between">
    <!-- Main Content -->
    <main class="flex-grow">
      <!-- Header -->
      <header class="p-4">
        <div class="flex items-center justify-between">
          <button class="text-text-light dark:text-text-dark">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <h1 class="text-lg font-bold text-text-light dark:text-text-dark flex-grow text-center">New Report</h1>
          <div class="w-6"></div>
        </div>
      </header>

      <!-- Form Fields -->
      <div class="p-4 space-y-6">
        <!-- Purpose Field -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-text-light/80 dark:text-text-dark/80" for="purpose">Purpose</label>
          <input 
            class="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-text-light dark:text-text-dark placeholder-placeholder-light dark:placeholder-placeholder-dark focus:ring-2 focus:ring-primary focus:outline-none" 
            id="purpose" 
            placeholder="e.g. Q3 Client Meeting" 
            type="text"
          />
        </div>

        <!-- Date Field -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-text-light/80 dark:text-text-dark/80" for="date">Date</label>
          <input 
            class="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-text-light dark:text-text-dark placeholder-placeholder-light dark:placeholder-placeholder-dark focus:ring-2 focus:ring-primary focus:outline-none [color-scheme:light] dark:[color-scheme:dark]" 
            id="date" 
            type="date"
          />
        </div>
      </div>
    </main>

    <!-- Footer with Action Buttons -->
    <footer class="p-4 pb-8">
      <div class="flex items-center space-x-4">
        <button class="w-full bg-subtle-light dark:bg-subtle-dark text-text-light dark:text-text-dark font-bold h-14 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90">
          Cancel
        </button>
        <button class="w-full bg-primary text-white font-bold h-14 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90">
          Create Report
        </button>
      </div>
    </footer>
  </div>
</body>
</html>
```

### Key Design Elements

**Layout:**
- Full screen height with flex layout
- Header with close button, centered title, spacer
- Main content area with form fields
- Footer fixed at bottom with action buttons

**Form Styling:**
- Input height: `h-14` (3.5rem / 56px)
- Rounded corners: `rounded-lg`
- No borders, subtle background color
- Focus state: 2px primary color ring
- Label opacity: 80%

**Button Styling:**
- Equal width buttons in a row
- Height: `h-14`
- Cancel: subtle background, text color
- Primary: primary background, white text
- Hover: slight opacity change (90%)

**Components to Build:**
1. `CreateReportModal` - Main modal component
2. `FormField` - Reusable form field with label
3. `TextInput` - Styled text input
4. `DateInput` - Styled date picker
5. `ActionButtons` - Footer button group

---

## Screen 3: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

## Screen 4: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

## Screen 5: [Placeholder for next screen]

Waiting for HTML/CSS code...

---

**Status**: Screens 1-2 documented. Ready to receive screens 3-5.

## Screen 4: Add Expense Modal

### Description
Modal/page for adding a new expense to a report with comprehensive form fields and file upload.

### Features
- Close button (X) in header
- Title centered in header ("Add Expense")
- Category dropdown selector
- Amount input with currency symbol ($)
- Optional expense name field
- Optional description textarea
- Drag & drop file upload area
- Report date display (read-only)
- Expense date selector (clickable with arrow)
- Two action buttons (Cancel and Save)

### HTML/CSS Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Add Expense</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#40B59D",
            "background-light": "#f6f8f7",
            "background-dark": "#12201d",
            "foreground-light": "#121716",
            "foreground-dark": "#f6f8f7",
            "subtle-light": "#e3e8e7",
            "subtle-dark": "#2a3835"
          },
          fontFamily: {
            "display": ["Inter", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "0.5rem",
            "lg": "0.75rem",
            "xl": "1rem",
            "full": "9999px"
          },
        },
      },
    }
  </script>
  <style>
    .form-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }
    .dark .form-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    }
  </style>
  <style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display">
  <div class="flex flex-col h-screen justify-between">
    <div>
      <!-- Header -->
      <header class="p-4 flex items-center">
        <button class="p-2 text-foreground-light dark:text-foreground-dark">
          <span class="material-symbols-outlined">close</span>
        </button>
        <h1 class="flex-1 text-center font-bold text-lg text-foreground-light dark:text-foreground-dark pr-8">Add Expense</h1>
      </header>

      <!-- Main Form Content -->
      <main class="px-4 space-y-6">
        <!-- Category and Amount Row -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Category Dropdown -->
          <div>
            <label class="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1" for="category">Category</label>
            <select class="form-select w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-foreground-light dark:text-foreground-dark focus:ring-2 focus:ring-primary" id="category" name="category">
              <option>Travel</option>
              <option>Food</option>
              <option>Supplies</option>
            </select>
          </div>

          <!-- Amount Input -->
          <div>
            <label class="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1" for="amount">Amount</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span class="text-foreground-light/50 dark:text-foreground-dark/50">$</span>
              </div>
              <input class="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 pl-8 pr-4 text-foreground-light dark:text-foreground-dark placeholder:text-foreground-light/50 dark:placeholder:text-foreground-dark/50 focus:ring-2 focus:ring-primary" id="amount" name="amount" placeholder="0.00" type="text"/>
            </div>
          </div>
        </div>

        <!-- Expense Name (Optional) -->
        <div>
          <label class="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1" for="expense-name">Expense Name <span class="text-foreground-light/50 dark:text-foreground-dark/50">(Optional)</span></label>
          <input class="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg h-14 px-4 text-foreground-light dark:text-foreground-dark placeholder:text-foreground-light/50 dark:placeholder:text-foreground-dark/50 focus:ring-2 focus:ring-primary" id="expense-name" name="expense-name" placeholder="e.g. Client Dinner" type="text"/>
        </div>

        <!-- Description (Optional) -->
        <div>
          <label class="block text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 mb-1" for="description">Description <span class="text-foreground-light/50 dark:text-foreground-dark/50">(Optional)</span></label>
          <textarea class="w-full bg-subtle-light dark:bg-subtle-dark border-none rounded-lg p-4 text-foreground-light dark:text-foreground-dark placeholder:text-foreground-light/50 dark:placeholder:text-foreground-dark/50 focus:ring-2 focus:ring-primary" id="description" name="description" placeholder="A short description of the expense" rows="3"></textarea>
        </div>

        <!-- File Upload Drag & Drop Zone -->
        <div class="flex flex-col items-center justify-center border-2 border-dashed border-subtle-dark/30 dark:border-subtle-light/30 rounded-xl p-6 text-center bg-subtle-light/50 dark:bg-subtle-dark/50">
          <div class="bg-primary/20 dark:bg-primary/30 p-3 rounded-full mb-4">
            <span class="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
          </div>
          <p class="font-semibold text-foreground-light dark:text-foreground-dark">Drag & drop files here</p>
          <p class="text-sm text-foreground-light/60 dark:text-foreground-dark/60">or click to upload</p>
          <input class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
        </div>

        <!-- Date Fields -->
        <div class="space-y-2 pt-2">
          <!-- Report Date (Read-only) -->
          <div class="flex items-center justify-between p-4 rounded-lg bg-subtle-light dark:bg-subtle-dark">
            <span class="text-foreground-light dark:text-foreground-dark">Report Date</span>
            <span class="text-foreground-light dark:text-foreground-dark font-medium">Oct 24, 2024</span>
          </div>

          <!-- Expense Date (Clickable) -->
          <div class="flex items-center justify-between p-4 rounded-lg bg-subtle-light dark:bg-subtle-dark">
            <span class="text-foreground-light dark:text-foreground-dark">Expense Date</span>
            <div class="flex items-center gap-2">
              <span class="text-primary font-medium">Oct 24, 2024</span>
              <span class="material-symbols-outlined text-foreground-light/60 dark:text-foreground-dark/60">arrow_forward_ios</span>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer with Action Buttons -->
    <footer class="p-4 bg-background-light dark:bg-background-dark">
      <div class="grid grid-cols-2 gap-4">
        <button class="w-full bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark font-bold h-14 rounded-xl flex items-center justify-center">
          Cancel
        </button>
        <button class="w-full bg-primary text-white font-bold h-14 rounded-xl flex items-center justify-center">
          Save
        </button>
      </div>
    </footer>
  </div>
</body>
</html>
```

### Key Design Elements

**Layout:**
- Header with close button and centered title
- Scrollable main content area with form fields
- Footer fixed at bottom with action buttons

**Form Elements:**
- **Grid layout**: 2-column for category and amount
- **Input height**: `h-14` (consistent across all inputs)
- **Currency input**: Dollar sign prefix, right-aligned placeholder
- **Dropdown**: Custom styling with arrow indicator
- **Textarea**: 3 rows for description
- **Optional labels**: Lighter color for "(Optional)" text

**File Upload Zone:**
- Dashed border with rounded corners
- Cloud upload icon in primary-tinted circle
- Click or drag & drop functionality
- Hidden file input with full coverage

**Date Display:**
- Two date rows in separate containers
- Report date: read-only display
- Expense date: clickable with arrow indicator and primary color

**Colors:**
- Primary: `#40B59D`
- Subtle backgrounds: `#e3e8e7` (light), `#2a3835` (dark)
- Text opacity: 80% for labels, 50% for placeholders

**Components to Build:**
1. `AddExpenseModal` - Main modal component
2. `CategorySelect` - Dropdown with custom styling
3. `AmountInput` - Currency input with prefix
4. `TextAreaField` - Multi-line text input
5. `FileUploadZone` - Drag & drop file upload
6. `DateDisplay` - Read-only date display
7. `DateSelector` - Clickable date picker trigger

---

**Status**: Screens 1, 2, and 4 documented. Waiting for screens 3 and 5.

## Screen 5: Attachment Preview

### Description
Full-screen attachment viewer for previewing uploaded receipts and documents.

### Features
- Back button to return to previous screen
- Centered title ("Attachment")
- Full-screen image/document preview
- Zoom in/out controls
- Rotate control
- Clean, minimal interface focused on content

### HTML/CSS Code

```html
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Attachment Preview</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
  <link as="style" href="https://fonts.googleapis.com/css2?display=swap&family=Inter%3Awght%40400%3B500%3B700%3B900&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#169c7f",
            "background-light": "#f6f8f8",
            "background-dark": "#11211d",
          },
          fontFamily: {
            "display": ["Inter"]
          },
          borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
        },
      },
    }
  </script>
  <style>
    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
    }
  </style>
  <style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display">
  <div class="flex flex-col h-screen">
    <!-- Header with Back Button -->
    <header class="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark border-b border-white/10 dark:border-white/10">
      <button class="flex items-center justify-center w-10 h-10 text-slate-700 dark:text-slate-300">
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <h1 class="text-lg font-bold text-slate-900 dark:text-white flex-1 text-center">Attachment</h1>
      <div class="w-10"></div>
    </header>

    <!-- Main Preview Area -->
    <main class="flex-1 flex items-center justify-center p-4 overflow-hidden">
      <div class="w-full h-full rounded-lg bg-center bg-contain bg-no-repeat" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUQd9yX0EVOHibFgO7U3kp8ZVK5J20UCmzerS_kibgaN0LOetiSdoeruaeWP1skYR9_R7Gl4nUc61fQbhYg0lPeNsK22aGRUAzczAIafOFtQLbLSsxh6J7N72rnQs0a4YbzvEYThcOrCvu_T_aqZV5FPwM1Icl6xLnumaWNOd1CQUk_s8xEZ28gkqc69-Nf--9jSR-BF0s_uBgYdQouFI_U_KXlIs4RIyWS_4vm0TOGawoHvI2U9QTCILh00SMzliqBifh7qangyE");'>
      </div>
    </main>

    <!-- Footer with Control Buttons -->
    <footer class="flex items-center justify-center p-4 bg-background-light dark:bg-background-dark border-t border-white/10 dark:border-white/10">
      <div class="flex items-center space-x-8">
        <button class="text-slate-700 dark:text-slate-300">
          <span class="material-symbols-outlined text-3xl">zoom_in</span>
        </button>
        <button class="text-slate-700 dark:text-slate-300">
          <span class="material-symbols-outlined text-3xl">zoom_out</span>
        </button>
        <button class="text-slate-700 dark:text-slate-300">
          <span class="material-symbols-outlined text-3xl">rotate_right</span>
        </button>
      </div>
    </footer>
  </div>
</body>
</html>
```

### Key Design Elements

**Layout:**
- Full-screen height with flex column
- Header and footer with borders
- Main content area takes all available space
- Content centered both horizontally and vertically

**Preview Area:**
- Full width and height within padding
- Background image with `contain` sizing (maintains aspect ratio)
- Centered positioning
- Rounded corners
- Overflow hidden to keep content within bounds

**Controls:**
- Three icon buttons evenly spaced
- Icon size: `text-3xl` (30px)
- Material icons: `zoom_in`, `zoom_out`, `rotate_right`
- Neutral slate colors

**Header:**
- Back button on left
- Title centered
- Spacer on right for balance
- Border bottom for separation

**Footer:**
- Border top for separation
- Controls centered horizontally
- Equal spacing between buttons

**Material Icons Used:**
- `arrow_back_ios_new` - Back navigation
- `zoom_in` - Zoom in control
- `zoom_out` - Zoom out control
- `rotate_right` - Rotate image

**Components to Build:**
1. `AttachmentPreview` - Main preview component
2. `ImageViewer` - Zoomable/rotatable image viewer
3. `ZoomControls` - Zoom and rotate button group
4. `PreviewHeader` - Header with back button

**Features to Implement:**
- Image zoom in/out functionality
- Image rotation (90-degree increments)
- Pinch-to-zoom on touch devices
- Double-tap to zoom
- Pan/drag when zoomed in
- Support for PDF preview (render first page)
- Support for different image formats

---

**Status**: Screens 1, 2, 4, and 5 documented. Waiting for screen 3 (expense report details).
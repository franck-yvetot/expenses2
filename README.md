# Expenses2 - Full Stack Monorepo

A modern full-stack application built with React frontend and NestJS backend in a monorepo architecture.

## 🏗️ Architecture

This project uses **npm workspaces** for monorepo management with three main packages:

- **apps/frontend** - React 18 + Vite + TypeScript + Tailwind CSS
- **apps/backend** - NestJS + TypeScript + TypeORM + PostgreSQL
- **packages/shared** - Shared TypeScript types and interfaces

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **PostgreSQL** >= 14 (for database connectivity)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies for all packages in the workspace.

### 2. Set Up Environment Variables

#### Backend (.env)
```bash
cd apps/backend
cp .env.example .env
```

Edit `apps/backend/.env` with your database credentials:
```env
PORT=3001
CORS_ORIGIN=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=expenses2_dev
DB_SYNCHRONIZE=true
```

#### Frontend (.env)
```bash
cd apps/frontend
cp .env.example .env
```

The default configuration should work:
```env
VITE_API_URL=http://localhost:3001
```

### 3. Set Up PostgreSQL Database

Create the database:
```bash
createdb expenses2_dev
```

Or using psql:
```sql
CREATE DATABASE expenses2_dev;
```

**Note**: The initial Hello World feature does NOT require database connectivity. The database infrastructure is configured but not yet used.

### 4. Build Shared Package

```bash
npm run build -w packages/shared
```

### 5. Start Development Servers

#### Option A: Run Both Applications Concurrently
```bash
npm run dev
```

#### Option B: Run Applications Separately

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Endpoint**: http://localhost:3001/api/hello

## 📁 Project Structure

```
expenses2/
├── apps/
│   ├── frontend/          # React application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── HelloWorld/
│   │   │   ├── services/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── jest.config.js
│   │
│   └── backend/           # NestJS application
│       ├── src/
│       │   ├── app.module.ts
│       │   ├── app.controller.ts
│       │   ├── app.service.ts
│       │   └── main.ts
│       ├── package.json
│       └── nest-cli.json
│
├── packages/
│   └── shared/            # Shared TypeScript types
│       └── src/
│           └── types/
│               └── hello.types.ts
│
├── package.json           # Root workspace config
└── README.md
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Frontend Tests Only
```bash
npm run test -w apps/frontend
```

### Run Backend Tests Only
```bash
npm run test -w apps/backend
```

### Coverage Requirements
- Minimum 80% coverage for branches, functions, lines, and statements
- Enforced via Jest configuration

## 🔨 Building

### Build All Packages
```bash
npm run build
```

### Build Frontend Only
```bash
npm run build -w apps/frontend
```

### Build Backend Only
```bash
npm run build -w apps/backend
```

## 🎨 Code Quality

### Linting

Run ESLint across all packages:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

### Formatting

Format code with Prettier:
```bash
npm run format
```

Check code formatting:
```bash
npm run format:check
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM (configured, no entities yet)
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier

### Shared
- **Language**: TypeScript
- **Purpose**: Shared types and interfaces

## 📡 API Endpoints

### Hello World
- **Method**: GET
- **Path**: `/api/hello`
- **Response**:
```json
{
  "message": "Hello World from NestJS!",
  "timestamp": "2025-10-27T14:23:52.317Z"
}
```

## 🔧 Development Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build all packages
- `npm test` - Run all tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint all packages
- `npm run format` - Format all code

### Frontend (apps/frontend)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code

### Backend (apps/backend)
- `npm run dev` - Start development server with watch mode
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code

## 🐛 Troubleshooting

### TypeScript Errors
If you see TypeScript errors about missing shared types:
```bash
npm run build -w packages/shared
```

### Port Already in Use
If port 3000 or 3001 is already in use:
- Frontend: Edit `apps/frontend/vite.config.ts` to change the port
- Backend: Edit `apps/backend/.env` to change the PORT value

### Database Connection Issues
Ensure PostgreSQL is running:
```bash
# Check PostgreSQL status
pg_ctl status

# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql@14

# Start PostgreSQL (Linux)
sudo systemctl start postgresql
```

## 📝 Notes

- The TypeORM configuration is set up but no database entities have been created yet
- The Hello World feature demonstrates the full stack integration without database dependency
- All packages enforce 80% test coverage
- ESLint and Prettier are configured for consistent code style
- CORS is enabled for local development

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass: `npm test`
4. Ensure code is formatted: `npm run format`
5. Ensure no linting errors: `npm run lint`
6. Submit a pull request

## 📄 License

MIT

---

**Built with** ❤️ **using modern web technologies**
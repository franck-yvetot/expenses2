# Setup Instructions - Expenses2 Project

## Current Status

✅ **Project Structure Created**
- Complete monorepo with frontend, backend, and shared packages
- All configuration files in place
- Source code implemented with Swagger documentation
- Tests written with 80% coverage requirements

⚠️ **Dependency Installation In Progress**

## Manual Setup Steps (If Needed)

### 1. Stop All Running Terminals
Press `Ctrl+C` in each terminal to stop all running processes.

### 2. Clean Installation

```powershell
# Remove all node_modules and lock files
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules, apps/backend/node_modules, apps/frontend/node_modules, packages/shared/node_modules
Remove-Item -Force -ErrorAction SilentlyContinue package-lock.json, apps/*/package-lock.json, packages/*/package-lock.json

# Install all dependencies
npm install --legacy-peer-deps

# Build shared package
npm run build -w packages/shared
```

### 3. Start Applications

**Terminal 1 - Backend:**
```powershell
npm run dev:backend
```

**Terminal 2 - Frontend:**
```powershell
npm run dev:frontend
```

## Access Points

Once running, access the application at:

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/hello
- **Swagger Documentation**: http://localhost:3001/api-docs

## What's Implemented

### Backend (NestJS)
- ✅ Main application with CORS enabled
- ✅ Hello endpoint: `GET /api/hello`
- ✅ Swagger/OpenAPI documentation
- ✅ ConfigModule for environment variables
- ✅ Complete unit tests
- ✅ ESLint + Prettier configured
- ✅ TypeORM infrastructure ready (not connected)

### Frontend (React + Vite)
- ✅ HelloWorld component
- ✅ API service with Axios
- ✅ Tailwind CSS styling
- ✅ Complete unit tests
- ✅ ESLint + Prettier configured
- ✅ Environment variable setup

### Shared Package
- ✅ HelloResponse interface
- ✅ TypeScript types shared between frontend/backend

## Testing

Run tests once dependencies are installed:

```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Frontend only
npm run test -w apps/frontend

# Backend only
npm run test -w apps/backend
```

## Troubleshooting

### If you get "module not found" errors:
1. Stop all terminals
2. Delete all node_modules
3. Run `npm install --legacy-peer-deps`
4. Build shared package: `npm run build -w packages/shared`

### If ports are in use:
- Frontend port: Edit `apps/frontend/vite.config.ts`
- Backend port: Edit `apps/backend/.env`

### If TypeScript errors persist:
```bash
npm run build -w packages/shared
```

## Architecture Notes

- **Monorepo**: npm workspaces (no additional tooling)
- **TypeORM**: Infrastructure configured but commented out (no database needed for Hello World)
- **Swagger**: Full API documentation at `/api-docs`
- **Testing**: Jest with 80% coverage enforcement
- **Shared Types**: Type-safe communication between frontend and backend

## Next Steps After Successful Start

1. Verify Hello World works end-to-end
2. Check Swagger documentation at http://localhost:3001/api-docs
3. Run tests to verify 80% coverage
4. Review architecture in ARCHITECTURE.md
5. Add database models when ready (uncomment TypeORM in app.module.ts)

---

For detailed information, see:
- [`README.md`](README.md) - Complete project documentation
- [`ARCHITECTURE.md`](ARCHITECTURE.md) - Technical architecture details
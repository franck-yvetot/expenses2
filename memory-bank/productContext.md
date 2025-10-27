# Product Context

This file provides a high-level overview of the project and the expected product that will be created. Initially it is based upon projectBrief.md (if provided) and all other available project-related information in the working directory. This file is intended to be updated as the project evolves, and should be used to inform all other modes of the project's goals and context.

---

## Project Goal

Create a full-stack monorepo application with React frontend and NestJS backend, demonstrating a clean architectural foundation for building scalable web applications. The initial implementation includes a simple Hello World feature to verify the complete integration between frontend and backend.

## Key Features

### Initial Release (Hello World)
- Single-page React application displaying data from backend API
- RESTful API endpoint serving Hello World response
- Complete TypeScript type safety across frontend and backend
- Comprehensive unit test coverage (80% minimum)
- Development environment with hot-reload for both applications

### Technical Features
- Monorepo architecture using npm workspaces
- Shared TypeScript types/interfaces between frontend and backend
- Modern development stack with Vite and NestJS
- Tailwind CSS for styling
- Axios for HTTP communication
- Jest testing infrastructure with coverage enforcement

## Overall Architecture

### Monorepo Structure
```
expenses2/
├── apps/
│   ├── frontend/    # React + Vite + TypeScript
│   └── backend/     # NestJS + TypeScript
└── packages/
    └── shared/      # Shared TypeScript types
```

### Technology Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Axios, Jest
- **Backend**: NestJS, TypeScript, Jest
- **Shared**: TypeScript interfaces and types
- **Monorepo**: npm workspaces

### Key Architectural Decisions
1. **Monorepo with npm workspaces**: Native solution, no additional tooling required
2. **Vite for frontend**: Modern, fast build tool with excellent DX
3. **Jest for testing**: Industry standard, works well with TypeScript
4. **Shared package**: Ensures type safety across frontend/backend boundary
5. **Separate .env files**: Each package manages its own environment variables
6. **80% coverage requirement**: Enforced via Jest configuration

### Development Ports
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### API Endpoints (Initial)
- `GET /api/hello` - Returns HelloResponse with message and timestamp

---

### Update Log
- 2025-10-27 15:19:27 - Initial Memory Bank creation
- 2025-10-27 15:28:48 - Updated with monorepo project architecture and Hello World feature specifications
# System Patterns

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.

---

## Coding Patterns

### TypeScript Patterns
- **Strict Mode**: All TypeScript configurations use strict mode
- **No Implicit Any**: Explicit typing required throughout
- **Interface over Type**: Prefer interfaces for object shapes
- **Shared Types**: All shared types/interfaces live in `packages/shared`

### Component Patterns (Frontend)
- **Functional Components**: Use React functional components with hooks
- **Co-located Tests**: Test files alongside component files (ComponentName.test.tsx)
- **Named Exports**: Prefer named exports over default exports
- **Props Interfaces**: Define Props interfaces for all components

### Service Patterns (Backend)
- **Dependency Injection**: Use NestJS dependency injection
- **Controller/Service Separation**: Controllers handle HTTP, services contain business logic
- **DTO Pattern**: Use Data Transfer Objects for API requests/responses
- **Exception Handling**: Use NestJS built-in exception filters

## Architectural Patterns

### Monorepo Organization
```
apps/          # Applications (frontend, backend)
packages/      # Shared code (types, utilities)
```

### Layered Architecture (Backend)
1. **Controller Layer**: HTTP request/response handling
2. **Service Layer**: Business logic
3. **Data Layer**: (Future) Database interactions

### Component Architecture (Frontend)
1. **Components**: UI components
2. **Services**: API communication, external services
3. **Types**: Imported from @shared package

### Cross-Cutting Concerns
- **Type Safety**: Shared types ensure consistency across stack
- **Environment Config**: Each package manages its own .env
- **CORS**: Backend configured to accept frontend origin
- **Error Handling**: Consistent error responses from backend

### Import Patterns
```typescript
// Shared types from monorepo package
import { HelloResponse } from '@shared';

// Local imports
import { SomeComponent } from './components/SomeComponent';
import { apiService } from './services/api';
```

## Testing Patterns

### Test Organization
- **Unit Tests**: All services, controllers, and components
- **Co-location**: Tests live next to source files
- **Naming Convention**: `*.test.ts` or `*.spec.ts`

### Test Coverage
- **Minimum Threshold**: 80% for branches, functions, lines, statements
- **Enforcement**: Via Jest configuration in each package
- **Coverage Reports**: Generated in coverage/ directory

### Test Structure (AAA Pattern)
```typescript
describe('Feature', () => {
  it('should do something', () => {
    // Arrange: Set up test data and dependencies
    
    // Act: Execute the code under test
    
    // Assert: Verify the results
  });
});
```

### Mocking Patterns
- **Backend**: Use Jest mocks for dependencies
- **Frontend**: Mock API calls with jest.mock()
- **Shared**: No mocking needed (pure types)

### Test Categories
1. **Unit Tests**: Individual functions/components in isolation
2. **Integration Tests**: Multiple units working together
3. **E2E Tests**: (Future) Full user workflows

## Development Patterns

### Git Workflow
- **Branch Strategy**: To be defined
- **Commit Messages**: To be defined
- **Code Review**: To be defined

### Development Workflow
```bash
# Start both apps in development mode
npm run dev

# Or start individually
npm run dev:frontend
npm run dev:backend
```

### Build Process
```bash
# Build all packages
npm run build

# TypeScript compilation happens per package
```

---

### Update Log
- 2025-10-27 15:19:27 - Initial Memory Bank creation
- 2025-10-27 15:29:11 - Added architectural patterns for monorepo project
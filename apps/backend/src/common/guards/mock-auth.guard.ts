import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Mock Authentication Guard
 * Adds a mock user to all requests for development purposes
 * Will be replaced with real authentication in production
 */
@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Add mock user to request
    request.user = {
      id: 'mock-user-1',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'employee',
    };

    return true;
  }
}
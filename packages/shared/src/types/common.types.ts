/**
 * Pagination Metadata
 * Contains information about the current page and total pages
 */
export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated Response
 * Generic wrapper for paginated data responses
 */
export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: PaginationDto;
}

/**
 * Standard API Response
 * Generic wrapper for all API responses
 */
export interface ApiResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
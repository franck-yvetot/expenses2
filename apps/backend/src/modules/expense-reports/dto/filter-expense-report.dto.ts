import { IsOptional, IsEnum, IsNumber, IsDateString, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ReportStatus } from 'shared-types';

export class FilterExpenseReportDto {
  @ApiProperty({
    description: 'Filter by status',
    enum: ReportStatus,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(ReportStatus, { each: true })
  status?: ReportStatus[];

  @ApiProperty({
    description: 'Minimum amount',
    required: false,
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amountMin?: number;

  @ApiProperty({
    description: 'Maximum amount',
    required: false,
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amountMax?: number;

  @ApiProperty({
    description: 'Start date for filtering (YYYY-MM-DD)',
    required: false,
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiProperty({
    description: 'End date for filtering (YYYY-MM-DD)',
    required: false,
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiProperty({
    description: 'Search in purpose field',
    required: false,
    example: 'client',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    description: 'Sort field',
    enum: ['reportDate', 'totalAmount', 'createdAt', 'purpose'],
    required: false,
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'reportDate' | 'totalAmount' | 'createdAt' | 'purpose' = 'createdAt';

  @ApiProperty({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    required: false,
    default: 'DESC',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
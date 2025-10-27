import { IsString, IsOptional, IsDateString, IsEnum, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from 'shared-types';

export class UpdateExpenseReportDto {
  @ApiProperty({
    description: 'Purpose of the expense report',
    example: 'Q3 Client Meeting',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  purpose?: string;

  @ApiProperty({
    description: 'Report date in ISO format (YYYY-MM-DD)',
    example: '2024-10-24',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  reportDate?: string;

  @ApiProperty({
    description: 'Report status',
    enum: ReportStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}
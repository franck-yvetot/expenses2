import { IsString, IsNotEmpty, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseReportDto {
  @ApiProperty({
    description: 'Purpose of the expense report',
    example: 'Q3 Client Meeting',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  purpose: string;

  @ApiProperty({
    description: 'Report date in ISO format (YYYY-MM-DD)',
    example: '2024-10-24',
  })
  @IsDateString()
  @IsNotEmpty()
  reportDate: string;
}
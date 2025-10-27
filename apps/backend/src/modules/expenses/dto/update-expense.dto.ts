import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory, ExpenseStatus } from 'shared-types';

export class UpdateExpenseDto {
  @ApiProperty({
    description: 'Category of the expense',
    enum: ExpenseCategory,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;

  @ApiProperty({
    description: 'Amount of the expense',
    example: 450.50,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount?: number;

  @ApiProperty({
    description: 'Optional name for the expense',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  expenseName?: string;

  @ApiProperty({
    description: 'Optional description of the expense',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Date of the expense',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expenseDate?: string;

  @ApiProperty({
    description: 'Status of the expense',
    enum: ExpenseStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExpenseStatus)
  status?: ExpenseStatus;
}
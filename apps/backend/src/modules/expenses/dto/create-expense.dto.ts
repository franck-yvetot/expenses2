import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from 'shared-types';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'ID of the expense report this expense belongs to',
    example: '1e9047e6-927b-481a-a5bc-60e75b59e140',
  })
  @IsUUID()
  @IsNotEmpty()
  reportId: string;

  @ApiProperty({
    description: 'Category of the expense',
    enum: ExpenseCategory,
    example: 'Travel',
  })
  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  category: ExpenseCategory;

  @ApiProperty({
    description: 'Amount of the expense',
    example: 450.50,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Optional name for the expense',
    example: 'Flight to SFO',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  expenseName?: string;

  @ApiProperty({
    description: 'Optional description of the expense',
    example: 'Round trip flight for client meeting',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Date of the expense in ISO format (YYYY-MM-DD)',
    example: '2024-10-24',
  })
  @IsDateString()
  @IsNotEmpty()
  expenseDate: string;
}
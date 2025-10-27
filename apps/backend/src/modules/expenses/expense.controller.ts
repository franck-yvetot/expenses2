import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';

@ApiTags('expenses')
@Controller('api/expenses')
@UseGuards(MockAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({
    status: 201,
    description: 'Expense created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Expense report not found' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiQuery({
    name: 'reportId',
    required: false,
    description: 'Filter expenses by report ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all expenses, optionally filtered by report',
  })
  findAll(@Query('reportId') reportId?: string) {
    return this.expenseService.findAll(reportId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the expense with all attachments',
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense' })
  @ApiResponse({
    status: 200,
    description: 'Expense updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an expense (soft delete)' })
  @ApiResponse({
    status: 204,
    description: 'Expense deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
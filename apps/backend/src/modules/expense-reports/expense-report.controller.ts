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
import { ExpenseReportService } from './expense-report.service';
import { CreateExpenseReportDto } from './dto/create-expense-report.dto';
import { UpdateExpenseReportDto } from './dto/update-expense-report.dto';
import { FilterExpenseReportDto } from './dto/filter-expense-report.dto';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('expense-reports')
@Controller('api/expense-reports')
@UseGuards(MockAuthGuard)
export class ExpenseReportController {
  constructor(private readonly expenseReportService: ExpenseReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense report' })
  @ApiResponse({
    status: 201,
    description: 'Expense report created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createExpenseReportDto: CreateExpenseReportDto,
    @CurrentUser() user: any,
  ) {
    return this.expenseReportService.create(createExpenseReportDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expense reports with filtering and pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, isArray: true })
  @ApiQuery({ name: 'amountMin', required: false, type: Number })
  @ApiQuery({ name: 'amountMax', required: false, type: Number })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated expense reports',
  })
  findAll(@Query() filterDto: FilterExpenseReportDto) {
    return this.expenseReportService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single expense report by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the expense report with all expenses',
  })
  @ApiResponse({ status: 404, description: 'Expense report not found' })
  findOne(@Param('id') id: string) {
    return this.expenseReportService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense report' })
  @ApiResponse({
    status: 200,
    description: 'Expense report updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Expense report not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id') id: string,
    @Body() updateExpenseReportDto: UpdateExpenseReportDto,
  ) {
    return this.expenseReportService.update(id, updateExpenseReportDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an expense report (soft delete)' })
  @ApiResponse({
    status: 204,
    description: 'Expense report deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Expense report not found' })
  remove(@Param('id') id: string) {
    return this.expenseReportService.remove(id);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit an expense report for validation' })
  @ApiResponse({
    status: 200,
    description: 'Expense report submitted successfully',
  })
  @ApiResponse({ status: 404, description: 'Expense report not found' })
  @ApiResponse({
    status: 400,
    description: 'Report cannot be submitted in its current status',
  })
  submit(@Param('id') id: string) {
    return this.expenseReportService.submit(id);
  }
}
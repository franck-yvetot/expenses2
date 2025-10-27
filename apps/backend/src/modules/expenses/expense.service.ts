import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseStatus } from 'shared-types';
import { ExpenseReportService } from '../expense-reports/expense-report.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly expenseReportService: ExpenseReportService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    // Verify the expense report exists
    await this.expenseReportService.findOne(createExpenseDto.reportId);

    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      status: ExpenseStatus.Created,
    });

    const savedExpense = await this.expenseRepository.save(expense);

    // Recalculate report total amount
    await this.expenseReportService.recalculateTotalAmount(
      createExpenseDto.reportId,
    );

    return savedExpense;
  }

  async findAll(reportId?: string): Promise<Expense[]> {
    const query = this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.attachments', 'attachment');

    if (reportId) {
      query.where('expense.reportId = :reportId', { reportId });
    }

    query.orderBy('expense.expenseDate', 'DESC');

    return await query.getMany();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['attachments', 'report'],
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return expense;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const expense = await this.findOne(id);
    const oldAmount = Number(expense.amount);

    Object.assign(expense, updateExpenseDto);

    const savedExpense = await this.expenseRepository.save(expense);

    // Recalculate report total if amount changed
    if (updateExpenseDto.amount !== undefined && updateExpenseDto.amount !== oldAmount) {
      await this.expenseReportService.recalculateTotalAmount(expense.reportId);
    }

    return savedExpense;
  }

  async remove(id: string): Promise<void> {
    const expense = await this.findOne(id);
    const reportId = expense.reportId;

    await this.expenseRepository.softRemove(expense);

    // Recalculate report total after deletion
    await this.expenseReportService.recalculateTotalAmount(reportId);
  }
}
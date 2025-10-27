import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { CreateExpenseReportDto } from './dto/create-expense-report.dto';
import { UpdateExpenseReportDto } from './dto/update-expense-report.dto';
import { FilterExpenseReportDto } from './dto/filter-expense-report.dto';
import { ReportStatus } from 'shared-types';

@Injectable()
export class ExpenseReportService {
  constructor(
    @InjectRepository(ExpenseReport)
    private readonly expenseReportRepository: Repository<ExpenseReport>,
  ) {}

  async create(
    createExpenseReportDto: CreateExpenseReportDto,
    userId: string,
  ): Promise<ExpenseReport> {
    const expenseReport = this.expenseReportRepository.create({
      ...createExpenseReportDto,
      userId,
      status: ReportStatus.Created,
      totalAmount: 0,
    });

    return await this.expenseReportRepository.save(expenseReport);
  }

  async findAll(filterDto: FilterExpenseReportDto) {
    const {
      status,
      amountMin,
      amountMax,
      dateFrom,
      dateTo,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = filterDto;

    const query = this.expenseReportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.expenses', 'expense');

    // Apply filters
    if (status && status.length > 0) {
      query.andWhere('report.status IN (:...status)', { status });
    }

    if (amountMin !== undefined) {
      query.andWhere('report.totalAmount >= :amountMin', { amountMin });
    }

    if (amountMax !== undefined) {
      query.andWhere('report.totalAmount <= :amountMax', { amountMax });
    }

    if (dateFrom) {
      query.andWhere('report.reportDate >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      query.andWhere('report.reportDate <= :dateTo', { dateTo });
    }

    if (search) {
      query.andWhere('LOWER(report.purpose) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    // Apply sorting
    query.orderBy(`report.${sortBy}`, sortOrder);

    // Apply pagination
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<ExpenseReport> {
    const expenseReport = await this.expenseReportRepository.findOne({
      where: { id },
      relations: ['expenses', 'expenses.attachments'],
    });

    if (!expenseReport) {
      throw new NotFoundException(`Expense report with ID ${id} not found`);
    }

    return expenseReport;
  }

  async update(
    id: string,
    updateExpenseReportDto: UpdateExpenseReportDto,
  ): Promise<ExpenseReport> {
    const expenseReport = await this.findOne(id);

    Object.assign(expenseReport, updateExpenseReportDto);

    return await this.expenseReportRepository.save(expenseReport);
  }

  async remove(id: string): Promise<void> {
    const expenseReport = await this.findOne(id);
    await this.expenseReportRepository.softRemove(expenseReport);
  }

  async submit(id: string): Promise<ExpenseReport> {
    const expenseReport = await this.findOne(id);

    if (expenseReport.status !== ReportStatus.Created) {
      throw new Error('Only reports with Created status can be submitted');
    }

    expenseReport.status = ReportStatus.Submitted;
    return await this.expenseReportRepository.save(expenseReport);
  }

  async recalculateTotalAmount(reportId: string): Promise<void> {
    const report = await this.findOne(reportId);

    const totalAmount = report.expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    report.totalAmount = totalAmount;
    await this.expenseReportRepository.save(report);
  }
}
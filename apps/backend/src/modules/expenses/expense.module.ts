import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
import { ExpenseReportModule } from '../expense-reports/expense-report.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    ExpenseReportModule, // Import to access ExpenseReportService
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
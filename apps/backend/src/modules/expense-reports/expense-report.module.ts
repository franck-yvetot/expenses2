import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseReportController } from './expense-report.controller';
import { ExpenseReportService } from './expense-report.service';
import { ExpenseReport } from './expense-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseReport])],
  controllers: [ExpenseReportController],
  providers: [ExpenseReportService],
  exports: [ExpenseReportService],
})
export class ExpenseReportModule {}
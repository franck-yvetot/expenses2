import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ReportStatus } from 'shared-types';
import { Expense } from '../expenses/expense.entity';

@Entity('expense_reports', { schema: 'expenses' })
export class ExpenseReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  purpose: string;

  @Column({ type: 'date' })
  reportDate: Date;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.Created,
  })
  status: ReportStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  userId: string;

  @OneToMany(() => Expense, (expense) => expense.report, { cascade: true })
  expenses: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
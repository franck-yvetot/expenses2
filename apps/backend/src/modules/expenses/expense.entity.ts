import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ExpenseCategory, ExpenseStatus } from 'shared-types';
import { ExpenseReport } from '../expense-reports/expense-report.entity';
import { Attachment } from '../attachments/attachment.entity';

@Entity('expenses', { schema: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ExpenseReport, (report) => report.expenses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reportId' })
  report: ExpenseReport;

  @Column({ type: 'uuid' })
  reportId: string;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  expenseName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  expenseDate: Date;

  @Column({
    type: 'enum',
    enum: ExpenseStatus,
    default: ExpenseStatus.Created,
  })
  status: ExpenseStatus;

  @OneToMany(() => Attachment, (attachment) => attachment.expense, {
    cascade: true,
  })
  attachments: Attachment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
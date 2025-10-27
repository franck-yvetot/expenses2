import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseReportModule } from './modules/expense-reports/expense-report.module';
import { ExpenseReport } from './modules/expense-reports/expense-report.entity';
import { Expense } from './modules/expenses/expense.entity';
import { Attachment } from './modules/attachments/attachment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { DataSource } = await import('typeorm');
        
        // Create a temporary connection to create the schema
        const tempDataSource = new DataSource({
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false,
          },
        });

        try {
          await tempDataSource.initialize();
          const schemaName = configService.get('DB_SCHEMA', 'expenses');
          await tempDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
          await tempDataSource.destroy();
        } catch (error) {
          console.error('Error creating schema:', error);
        }

        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: [ExpenseReport, Expense, Attachment],
          synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
          logging: configService.get('DB_LOGGING') === 'true',
          schema: configService.get('DB_SCHEMA', 'expenses'),
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    ExpenseReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
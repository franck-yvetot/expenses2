import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { Attachment } from './attachment.entity';
import { ExpenseModule } from '../expenses/expense.module';
import { multerConfig } from '../../config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
    MulterModule.register(multerConfig),
    ExpenseModule, // Import to access ExpenseService
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
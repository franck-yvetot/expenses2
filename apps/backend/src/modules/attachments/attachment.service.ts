import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  async create(
    expenseId: string,
    file: Express.Multer.File,
  ): Promise<Attachment> {
    const attachment = this.attachmentRepository.create({
      expenseId,
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
    });

    return await this.attachmentRepository.save(attachment);
  }

  async findOne(id: string): Promise<Attachment> {
    const attachment = await this.attachmentRepository.findOne({
      where: { id },
      relations: ['expense'],
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }

    return attachment;
  }

  async findByExpenseId(expenseId: string): Promise<Attachment[]> {
    return await this.attachmentRepository.find({
      where: { expenseId },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string): Promise<void> {
    const attachment = await this.findOne(id);

    // Delete file from disk
    try {
      await fs.unlink(attachment.filePath);
    } catch (error) {
      console.error(`Failed to delete file: ${attachment.filePath}`, error);
      // Continue even if file deletion fails
    }

    // Delete database record
    await this.attachmentRepository.remove(attachment);
  }

  getFilePath(attachment: Attachment): string {
    return path.resolve(attachment.filePath);
  }
}
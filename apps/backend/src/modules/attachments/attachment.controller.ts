import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AttachmentService } from './attachment.service';
import { ExpenseService } from '../expenses/expense.service';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { multerConfig } from '../../config/multer.config';

@ApiTags('attachments')
@Controller('api')
@UseGuards(MockAuthGuard)
export class AttachmentController {
  constructor(
    private readonly attachmentService: AttachmentService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Post('expenses/:expenseId/attachments')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Upload an attachment for an expense' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Attachment uploaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request or invalid file' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  @ApiResponse({ status: 413, description: 'File too large (max 5MB)' })
  @ApiResponse({ status: 415, description: 'Unsupported file type' })
  async uploadFile(
    @Param('expenseId') expenseId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Verify expense exists
    await this.expenseService.findOne(expenseId);

    const attachment = await this.attachmentService.create(expenseId, file);

    return {
      success: true,
      data: {
        attachmentId: attachment.id,
        fileName: attachment.fileName,
        fileSize: attachment.fileSize,
      },
    };
  }

  @Get('attachments/:id')
  @ApiOperation({ summary: 'Get attachment metadata' })
  @ApiResponse({
    status: 200,
    description: 'Returns attachment metadata',
  })
  @ApiResponse({ status: 404, description: 'Attachment not found' })
  findOne(@Param('id') id: string) {
    return this.attachmentService.findOne(id);
  }

  @Get('attachments/:id/download')
  @ApiOperation({ summary: 'Download attachment file' })
  @ApiResponse({
    status: 200,
    description: 'File download',
  })
  @ApiResponse({ status: 404, description: 'Attachment not found' })
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const attachment = await this.attachmentService.findOne(id);
    const filePath = this.attachmentService.getFilePath(attachment);

    res.download(filePath, attachment.originalName);
  }

  @Delete('attachments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an attachment' })
  @ApiResponse({
    status: 204,
    description: 'Attachment deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Attachment not found' })
  remove(@Param('id') id: string) {
    return this.attachmentService.remove(id);
  }
}
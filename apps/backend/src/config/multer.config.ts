import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/receipts',
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const uuid = uuidv4();
      const extension = extname(file.originalname);
      cb(null, `${timestamp}-${uuid}${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
        ),
        false,
      );
    }
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};
/**
 * Attachment Data Transfer Object
 * Represents a file attachment for an expense
 */
export interface AttachmentDto {
  id: string;
  expenseId: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
}

/**
 * Upload Attachment Response DTO
 * Response after successfully uploading an attachment
 */
export interface UploadAttachmentResponseDto {
  attachmentId: string;
  fileName: string;
  fileSize: number;
}
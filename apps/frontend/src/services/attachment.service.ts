import axios from 'axios';
import type { AttachmentDto, UploadAttachmentResponseDto } from 'shared-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const attachmentService = {
  async uploadAttachment(
    expenseId: string,
    file: File
  ): Promise<UploadAttachmentResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${API_URL}/api/expenses/${expenseId}/attachments`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  async getAttachment(id: string): Promise<AttachmentDto> {
    const response = await axios.get(`${API_URL}/api/attachments/${id}`);
    return response.data;
  },

  getDownloadUrl(id: string): string {
    return `${API_URL}/api/attachments/${id}/download`;
  },

  async deleteAttachment(id: string): Promise<void> {
    await axios.delete(`${API_URL}/api/attachments/${id}`);
  },
};
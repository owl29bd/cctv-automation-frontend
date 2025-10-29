import { APIUrl } from "@/lib/constants/url.config";
import httpClient from "@/lib/utils/httpClient";

class FileManagementService {
  async uploadFile(file: File) {
    const res = await httpClient.postForm<string>(APIUrl.file.upload(), {
      file,
    });
    return res.data;
  }

  async uploadMultipleFiles(formData: FormData) {
    const res = await httpClient.postForm<string>(APIUrl.file.uploadMultiple(), formData);
    return res.data;
  }
}

const fileManagementService = new FileManagementService();

export default fileManagementService;

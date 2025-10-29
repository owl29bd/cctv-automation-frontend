import { z } from "zod";
import { FileUploadValidation } from "../validators/file-upload.validators";


export type FileUploadReq = z.infer<typeof FileUploadValidation>;
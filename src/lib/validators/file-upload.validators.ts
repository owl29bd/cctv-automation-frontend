import { z } from "zod";

export const FileUploadValidation = z.object({
    // file: z.instanceof(File) || z.string() || null,
    file: z.union([z.instanceof(FileList), z.null()]),
    // details: z.string().optional(),
})
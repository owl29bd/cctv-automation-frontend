import { z } from "zod";
import { FileResponse } from "./file.dto";

export const CreateOrderValidation = z.object({
  clientName: z.string().min(1, { message: "Invalid Client Name." }),
  remarks: z.string().min(1, { message: "Invalid Remarks." }),
});

export type CreateOrderReq = z.infer<typeof CreateOrderValidation>;

export const UpdateOrderValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  clientName: z.string().min(1, { message: "Invalid Client Name." }),
  remarks: z.string().min(1, { message: "Invalid Remarks." }),
});

export type UpdateOrderReq = z.infer<typeof UpdateOrderValidation>;

export type OrderRes = BaseResponse & {
  clientName: string;
  files: {url: string; name: string}[];
  remarks: string;
  dueDate: Date;
};

export type Order = BaseResponse & {
  clientName: string;
  files: string[];
  remarks: string;
  dueDate: Date;
};

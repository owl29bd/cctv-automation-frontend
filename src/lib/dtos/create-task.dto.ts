import { z } from "zod";
import { AssignSubTaskValidation, CreateSubTaskValidation } from "../validators/task.validator";

export const CreateTaskValidation = z.object({
  profileId: z.string().min(1, { message: "Invalid Profile." }),
  taskType: z.string().min(1, { message: "Invalid Task Type." }),
  assignedBy: z.string().min(1, { message: "Invalid Assigned By." }),
  assignedTo: z.string().array().min(1, { message: "Invalid Assigned To." }),
  status: z.string().min(1, { message: "Invalid Status." }),
  reports: z.string().optional(),
  orderId: z.string().min(1, { message: "Invalid Order ID." }),
  subTasks: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
});

export type CreateTaskReq = z.infer<typeof CreateTaskValidation>;

export type AssignSubTaskReq = z.infer<typeof AssignSubTaskValidation>;

export type CreateSubtaskReq = z.infer<typeof CreateSubTaskValidation>;
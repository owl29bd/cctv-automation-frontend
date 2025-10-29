import {z} from "zod";
import { TaskType } from "../enums/tasks-enum";
import { TaskStatus } from "../enums/status.enum";

export const AssignSubTaskValidation = z.object({
    assignedTo: z.string().min(1, {message: "Invalid Assigned To."}),
    dueDate: z.string().min(1, {message: "Due date is required"}),
})

export const CreateSubTaskValidation = z.object({
    assignedTo: z.array(z.string()).min(1, {message: "Invalid Assigned To."}),
    dueDate: z.string().min(1, {message: "Due date is required"}),
})
import { TaskType } from "../enums/tasks-enum";

export type TasksTable = {
  id: string;
  profileId: string;
  taskType: TaskType;
  status: string;
  assignedTo: string[];
  assignedBy: string;
  reports: string[];
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

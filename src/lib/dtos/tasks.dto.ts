import { TaskStatus } from "../enums/status.enum";
import { TaskType } from "../enums/tasks-enum";
import { Order, OrderRes } from "./order.dto";
import { ProfileRes } from "./profile.dto";
import { ReportRes, ReportTable } from "./report.dto";
import { UserRes, UserResV2SI } from "./user.dto";

export type SI_Tasks_Table = BaseResponse & {
  profileId: ProfileRes; // backend compatible
  dueDate: Date; // backend compatible
  assignedTo: UserResV2SI[]; // backend compatible
  assignedBy: UserResV2SI; // backend compatible
  taskType: TaskType; // backend compatible
  reports: ReportRes[]; // backend compatible
  status: TaskStatus; // backend compatible
  orderId: Order;
};

export type TaskRes = BaseResponse & {
  profileId: ProfileRes;
  dueDate: Date;
  assignedTo: UserRes[];
  assignedBy: UserRes;
  taskType: TaskType;
  reports: ReportRes[];
  status: TaskStatus;
  orderId: Order;
  subTasks: TaskRes[];
};

export type TaskResDummy = BaseResponse & {
  profileId: string; // backend compatible
  dueDate: Date; // backend compatible
  assignedTo: string[]; // backend compatible
  assignedBy: string; // backend compatible
  taskType: TaskType; // backend compatible
  reports: string[]; // backend compatible
  status: TaskStatus; // backend compatible
  orderId: string;
};

export type TaskResV2 = BaseResponse & {
  profileId: ProfileRes; // backend compatible
  dueDate: Date; // backend compatible
  assignedTo: UserResV2SI[]; // backend compatible
  assignedBy: UserResV2SI; // backend compatible
  taskType: TaskType; // backend compatible
  reports: ReportTable[]; // backend compatible
  status: TaskStatus; // backend compatible
  orderId: Order;
};

type ProfileResNoOrderPopulate = BaseResponse & {
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  remarks: string[];
  orderId: {
    id: string;
  };
};

type userResponse = BaseResponse & {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: string;
  status: string[];
};

export type TaskDetailsReq = BaseResponse & {
  taskType: string;
  status: string;
  dueDate: string;
  profileId: ProfileResNoOrderPopulate;
  assignedBy: userResponse;
  assignedTo: userResponse[];
  reports: ReportTable[];
  orderId: Order;
  subTasks: string[];
};


export type TaskDetailsRes = BaseResponse & {
  profileId: ProfileRes;
  taskType: TaskType;
  assignedBy: UserRes;
  assignedTo: UserRes[];
  status: TaskStatus;
  reports: ReportRes[];
  dueDate: Date;
  orderId: Order;
}

export type SubTaskResponseNoPopulate = BaseResponse & {
  profileId: ProfileRes;
  taskType: TaskType;
  assignedBy: UserRes;
  assignedTo: UserRes[];
  status: TaskStatus;
  reports: ReportRes[];
  dueDate: Date;
  orderId: OrderRes;
  subTasks: TaskRes[];
};

export type TaskWithSubTasksRes = BaseResponse & {
  profileId: ProfileResNoOrderPopulate;
  taskType: string;
  assignedBy: userResponse;
  assignedTo: userResponse[];
  status: string;
  reports: ReportTable[];
  dueDate: string;
  orderId: Order;
  subTasks: SubTaskResponseNoPopulate[];
};

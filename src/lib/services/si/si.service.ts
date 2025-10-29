import { APIUrl } from "@/lib/constants/url.config";
import { AssignSubTaskReq, CreateTaskReq } from "@/lib/dtos/create-task.dto";
import { Order } from "@/lib/dtos/order.dto";
import { ProfileRes, SI_Profile_Table } from "@/lib/dtos/profile.dto";
import { ReportRes, StagingReportRes } from "@/lib/dtos/report.dto";
import {
  TaskDetailsRes,
  TaskRes,
  TaskWithSubTasksRes,
} from "@/lib/dtos/tasks.dto";
import httpClient from "@/lib/utils/httpClient";

class SiManagementService {
  async getOrders(params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<Order>>(
      APIUrl.si.getOrders(),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getProfilesByOrderId(orderId: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<SI_Profile_Table>>(
      APIUrl.si.getProfilesByOrderId(orderId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getProfieById(profileId: string | undefined) {
    if (!profileId) throw new Error("Profile ID is required");
    const res = await httpClient.get<ProfileRes>(
      APIUrl.si.getProfileById(profileId),
    );
    return res.data;
  }

  async getTasksByProfileId(profileId: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.si.getTasksByProfileId(profileId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getReportsByProfileId(profileId: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<ReportRes>>(
      APIUrl.si.getReportsByProfileId(profileId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getTasksByAssigneeId(assigneeId: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.si.getTasksByAssigneeId(assigneeId || ""),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getTaskByTaskId(taskId: string) {
    const res = await httpClient.get<TaskDetailsRes>(
      APIUrl.si.getTaskByTaskId(taskId),
    );
    return res.data;
  }

  async createTaskForAllProfiles(orderId: string) {
    const res = await httpClient.post<{
      createdCount: number;
      skippedCount: number;
    }>(APIUrl.si.createTaskForAllProfiles(), { orderId: orderId });
    return res.data;
  }

  async getStagingReportsByOrderId(orderId: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<StagingReportRes>>(
      APIUrl.si.getStagingReportsByOrderId(orderId),
      {
        params,
      },
    );
    return res.data;
  }

  async getTasksByAssignedToId(assignedToId: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.si.getTasksByAssignedToId(assignedToId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getTaskByTaskType(taskType: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.si.getTaskByTaskType(taskType),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getTaskWithSubTasks(taskId: string) {
    const res = await httpClient.get<ApiPaginatedResponse<TaskWithSubTasksRes>>(
      APIUrl.si.getTasksWithSubTasks(taskId),
    );
    return res.data;
  }

  async assignTask(taskId: string, data: CreateTaskReq) {
    const res = await httpClient.patch<TaskRes>(
      APIUrl.si.assignTask(taskId),
      data,
    );
  }

  async assignSubTask(taskId: string, data: AssignSubTaskReq) {
    const res = await httpClient.patch<TaskRes>(
      APIUrl.si.assignSubTask(taskId),
      data,
    );
  }
}

const siOrderManagementService = new SiManagementService();

export default siOrderManagementService;

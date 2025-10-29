import httpClient from "@/lib/utils/httpClient";
import { APIUrl } from "@/lib/constants/url.config";
import { TaskRes } from "@/lib/dtos/tasks.dto";
import { UserRes } from "@/lib/dtos/user.dto";
import { CreateTaskReq } from "@/lib/dtos/create-task.dto";
import { ReportStatus } from "@/lib/enums/status.enum";

class SATaskManagementService {
  async getTasksByAssignedTo(userId: string | undefined, params: QueryParams) {
    if (!userId) throw new Error("User ID is required");

    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.sa.getByAssignedToId(userId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getTasksByAssigneeId(userId: string | undefined, params: QueryParams) {
    if (!userId) throw new Error("User ID is required");
    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.sa.getTasksByAssigneeId(userId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async createSubTask(task: CreateTaskReq, parentTaskId: string | undefined) {
    if (!parentTaskId) throw new Error("Parent Task ID is required");
    const res = await httpClient.post<TaskRes>(
      APIUrl.sa.createSubTask(parentTaskId),
      task,
    );
    return res.data;
  }

  async getGroupMembers(userId: string | undefined, params: QueryParams) {
    if (!userId) throw new Error("User ID is required");
    const res = await httpClient.get<ApiPaginatedResponse<UserRes>>(
      APIUrl.groupManagement.getMyGroupMembers(userId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getTaskById(taskId: string | undefined) {
    if (!taskId) throw new Error("Task ID is required");

    const res = await httpClient.get<TaskRes>(APIUrl.sa.getTaskById(taskId));
    return res.data;
  }

  async approveReport(reportId: string | undefined, status: ReportStatus) {
    if (!reportId) throw new Error("Report ID is required");

    const res = await httpClient.patch(APIUrl.sa.approveReport(reportId), {
      status,
    });

    return res.data;
  }

  async getSubTasks(taskId: string | undefined, params: QueryParams) {
    if (!taskId) throw new Error("Task ID is required");
    const res = await httpClient.get<ApiPaginatedResponse<TaskRes>>(
      APIUrl.sa.getSubTasks(taskId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }
}

const saTaskManagementService = new SATaskManagementService();
export default saTaskManagementService;

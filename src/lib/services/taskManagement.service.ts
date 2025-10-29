import { APIUrl } from "../constants/url.config";
import { CreateSubtaskReq } from "../dtos/create-task.dto";
import { TaskRes } from "../dtos/tasks.dto";
import httpClient from "../utils/httpClient";

class TaskManagementService {
    async createSubTask(taskId: string, data: CreateSubtaskReq) {
        const res = await httpClient.post<CreateSubtaskReq>(
            APIUrl.taskManagement.createSubTask(taskId),
            data
        );
        return res.data;
    }
}

const taskManagementService = new TaskManagementService();

export default taskManagementService;
import { CreateGroupReq, UpdateGroupReq } from "@/lib/dtos/user-management.dto";

import { APIUrl } from "@/lib/constants/url.config";
import httpClient from "@/lib/utils/httpClient";
import { GroupRes, UserRes } from "../dtos/user.dto";

class GroupManagementService {
  async get(params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<GroupRes>>(
      APIUrl.groupManagement.get(),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getById(id: string) {
    const res = await httpClient.get<GroupRes>(
      APIUrl.groupManagement.getById(id),
    );

    return res.data;
  }

  async createGroup(data: CreateGroupReq) {
    const res = await httpClient.post<CreateGroupReq>(
      APIUrl.groupManagement.createGroup(),
      data,
    );
  }

  async updateGroup(data: UpdateGroupReq) {
    const reqData = {
      groupName: data.groupName,
      groupLeader: data.groupLeader,
      groupType: data.groupType,
      groupMembers: data.groupMembers,
    };
    const res = await httpClient.patch<CreateGroupReq>(
      APIUrl.groupManagement.updateGroup(data.id),
      reqData,
    );
    return res.data;
  }

  async getGroupMembersByGroupLeader(id: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<UserRes>>(
      APIUrl.groupManagement.getMyGroupMembers(id),
      {
        params: params ? params : null,
      },
    );
    return res.data;
  }
}

const groupManagementService = new GroupManagementService();

export default groupManagementService;

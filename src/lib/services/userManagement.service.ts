import { CreateUserReq, UpdateUserReq } from "@/lib/dtos/user-management.dto";

import { APIUrl } from "@/lib/constants/url.config";
import { UserRes } from "@/lib/dtos/user.dto";
import httpClient from "@/lib/utils/httpClient";
import { getSession } from "next-auth/react";

class UserManagementService {
  async get(params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<UserRes>>(
      APIUrl.userManagement.get(),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getById(id: string) {
    const res = await httpClient.get<UserRes>(
      APIUrl.userManagement.getById(id),
    );
    return res.data;
  }

  async createUser(data: CreateUserReq) {
    const reqData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      // photo: { id: "" },
      role: data.role,
      status: { id: 1 },
    };

    const res = await httpClient.post<UserRes>(
      APIUrl.userManagement.createUser(),
      reqData,
    );
  }

  async updateUser(data: UpdateUserReq) {
    const reqData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };
    const res = await httpClient.patch<UserRes>(
      APIUrl.userManagement.updateUser(data.id),
      reqData,
    );
    return res.data;
  }

  async getUsersByRole(role: string, params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<UserRes>>(
      APIUrl.userManagement.getUsersByRole(role),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }
}

const userManagementService = new UserManagementService();

export default userManagementService;

import httpClient from "../../utils/httpClient";
import { APIUrl } from "../../constants/url.config";
import { ProfileRes } from "@/lib/dtos/profile.dto";
import { ProfileReq, UpdateProfileReq } from "@/lib/dtos/create-profile.dto";

class ProfileManagementService {
  async get(params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<ProfileRes>>(
      APIUrl.uploader.profile.getAll(),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getProfileByOrderId(orderId: string) {
    const res = await httpClient.get<ApiPaginatedResponse<ProfileRes>>(
      APIUrl.uploader.profile.getProfileByOrderId(orderId),
    );
    return res.data;
  }

  async getById(id: string) {
    const res = await httpClient.get<ProfileRes>(
      APIUrl.uploader.profile.getById(id),
    );
    return res.data;
  }

  async create(formData: ProfileReq) {
    const res = await httpClient.post<ProfileRes>(
      APIUrl.uploader.profile.create(),
      formData,
    );
    return res.data;
  }

  async update(data: UpdateProfileReq) {
    const res = await httpClient.patch<ProfileRes>(
      APIUrl.uploader.profile.update(data.id),
      data,
    );
    return res.data;
  }

  async delete(id: string) {
    const res = await httpClient.delete<ProfileRes>(
      APIUrl.uploader.profile.delete(id),
    );
    return res.data;
  }

  async getByOrderId(params: QueryParams, orderId: string) {
    const res = await httpClient.get<ApiPaginatedResponse<ProfileRes>>(
      APIUrl.uploader.profile.getByOrderId(orderId),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }
}

const profileManagementService = new ProfileManagementService();
export default profileManagementService;

import httpClient from "../utils/httpClient";
import { APIUrl } from "../constants/url.config";
import { CreateOrderReq, OrderRes, UpdateOrderReq } from "../dtos/order.dto";

class OrderManagementService {
  async get(params?: QueryParams) {
    const res = await httpClient.get<ApiPaginatedResponse<OrderRes>>(
      APIUrl.order.getAll(),
      {
        params: params ? params : "",
      },
    );
    return res.data;
  }

  async getById(id: string) {
    const res = await httpClient.get<OrderRes>(APIUrl.order.getById(id));
    return res.data;
  }

  async create(formData: CreateOrderReq) {
    const files: string[] = [];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);
    const data = {
      ...formData,
      files,
      dueDate,
    };

    const res = await httpClient.post<OrderRes>(APIUrl.order.create(), data);
    return res.data;
  }

  async update(data: UpdateOrderReq) {
    const res = await httpClient.patch<OrderRes>(
      APIUrl.order.update(data.id),
      data,
    );
    return res.data;
  }

  async delete(id: string) {
    const res = await httpClient.delete<OrderRes>(APIUrl.order.delete(id));
    return res.data;
  }

  async uploadFiles(
    orderId: string,
    files: { base64: string; name: string; type: string }[],
  ) {
    const res = await httpClient.patch<OrderRes>(
      APIUrl.order.uploadFiles(orderId),
      files,
    );
    return res.data;
  }
}

const orderManagementService = new OrderManagementService();
export default orderManagementService;

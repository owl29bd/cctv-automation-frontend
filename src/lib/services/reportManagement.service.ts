import { APIUrl } from "../constants/url.config";
import { CreateReportReq } from "../dtos/create-report-dto";
import { ReportRes } from "../dtos/report.dto";
import httpClient from "../utils/httpClient";

class ReportManagementService {
  async create(data: CreateReportReq, taskId: string) {
    const res = await httpClient.post<ReportRes>(
      APIUrl.reportManagement.createReport(taskId),
      data,
    );
    return res.data;
  }

  async getReportById(reportId: string) {
    const res = await httpClient.get<ReportRes>(
      APIUrl.reportManagement.getReportById(reportId),
    );
    return res.data;
  }

  async getFinalReportByOrderId(orderId: string) {
    const res = await httpClient.get<ReportRes[]>(
      APIUrl.reportManagement.getFinalReportsByOrderId(orderId),
    );
    return res.data;
  }
}

const reportManagementService = new ReportManagementService();
export default reportManagementService;

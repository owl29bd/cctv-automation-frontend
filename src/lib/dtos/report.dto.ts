import { ReportLevel } from "../enums/report.enum";
import { ReportStatus } from "../enums/status.enum";
import { Order } from "./order.dto";
import { ProfileRes } from "./profile.dto";
import { UserRes } from "./user.dto";

export type ReportTable = BaseResponse & {
  profileId: string;
  reportLevel: ReportLevel;
  details: string;
  status: ReportStatus;
  orderId: Order;
};

export type StagingReportRes = {
  profileId: string;
  reportId: string;
  reportStatus: string;
};

export type ReportRes = BaseResponse & {
  profileId: ProfileRes;
  reportLevel: ReportLevel;
  status: ReportStatus;
  orderId: Order;
  submittedBy: UserRes;
  details: any[];
}
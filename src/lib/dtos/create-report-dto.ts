import { z } from "zod";
import { ReportLevel } from "../enums/report.enum";
import { ReportStatus } from "../enums/status.enum";

export const CreateReportValidation = z.object({
  profileId: z.string().min(1, { message: "Invalid Profile ID." }),
  orderId: z.string().min(1, { message: "Invalid Order ID." }),
  submittedBy: z.string().min(1, { message: "Invalid Submitted By." }),
  status: z.nativeEnum(ReportStatus).nullish(),
  reportLevel: z.nativeEnum(ReportLevel).nullish(),
  details: z.array(z.any()),
});

export type CreateReportReq = z.infer<typeof CreateReportValidation>;

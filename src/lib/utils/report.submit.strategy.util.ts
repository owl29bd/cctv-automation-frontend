import { ReportLevel } from "../enums/report.enum";
import { ReportStatus } from "../enums/status.enum";
import { TaskType } from "../enums/tasks-enum";

export default class ReportSubmitStrategy {
  // determine which strategy to use based on the task type
  public static getReportSubmitStrategy(taskType?: TaskType) {
    switch (taskType) {
      case TaskType.SA_Analyst:
        return this.gnerateReportForAnalystToSA();
      case TaskType.SI_SA:
        return this.generateReportForSAtoSI();
      case TaskType.PIL_PI:
        return this.generateReportForPItoPILeader();
      case TaskType.SI_PIL:
        return this.generateReportForPILeaderToSi();
      case TaskType.APPROVER_SI:
        return this.generateReportForApproverToSi();
      default:
        return this.gnerateReportForAnalystToSA();
    }
  }
  //  generate default report content
  public static gnerateReportForAnalystToSA() {
    return {
      reportLevel: ReportLevel.RL1,
      stauts: ReportStatus.IN_REVIEW,
    };
  }

  public static generateReportForSAtoSI() {
    return {
      reportLevel: ReportLevel.RL2,
      status: ReportStatus.IN_REVIEW,
    };
  }

  public static generateReportForPItoPILeader() {
    return {
      reportLevel: ReportLevel.RL3,
      status: ReportStatus.IN_REVIEW,
    };
  }

  public static generateReportForPILeaderToSi() {
    return {
      reportLevel: ReportLevel.RL3,
      status: ReportStatus.IN_REVIEW,
    };
  }

  public static generateReportForApproverToSi() {
    return {
      reportLevel: ReportLevel.FINAL,
      status: ReportStatus.IN_REVIEW,
    };
  }
}

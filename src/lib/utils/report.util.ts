import { Role } from "../enums/role.enum";

export const getUserRole = (role: Role): string => {
  switch (role) {
    case Role.Investigator:
      return "pi";
    case Role.SA:
      return "sa";
    case Role.Analyst:
      return "analyst";
    case Role.PIL:
      return "pi-leader";
    case Role.SI:
      return "si";
    case Role.REPORT_APPROVER:
      return "reportApprover";
    default:
      return "admin";
  }
};

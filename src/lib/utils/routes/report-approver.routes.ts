import {
  RiPieChart2Line as AnalyticsIcon,
  RiDashboardLine as OverviewIcon,
} from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import { SidebarGroup } from "./index.routes";

export const REPORT_APPROVER_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Report Approver Dashboard",
    items: [
      {
        link: "/reportApprover/dashboard",
        text: "Dashboard",
        icon: OverviewIcon,
      },
      {
        link: "/reportApprover/orders",
        text: "Orders",
        icon: AnalyticsIcon,
      },
      {
        link: "/reportApprover/tasks",
        text: "Tasks",
        icon: GoTasklist,
      },
    ],
  },
];

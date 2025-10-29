import {
  RiPieChart2Line as AnalyticsIcon,
  RiDashboardLine as OverviewIcon,
  RiDashboard3Line,
  RiStackFill,
} from "react-icons/ri";
import { SidebarGroup } from "./index.routes";

export const DELIVERY_APPROVER_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Delivery Approver Dashboard",
    items: [
      {
        link: "/deliveryApprover/dashboard",
        text: "Dashboard",
        icon: OverviewIcon,
      },
      {
        link: "/deliveryApprover/analytics",
        text:  "Analytics",
        icon: AnalyticsIcon,
      },
    ],
  },
];

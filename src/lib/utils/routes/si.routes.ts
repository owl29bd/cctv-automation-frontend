import { FaTasks as MyTasksIcon } from "react-icons/fa";
import {
  RiPieChart2Line as AnalyticsIcon
} from "react-icons/ri";
import { SiGoogletasks as TaskMonitorIcon } from "react-icons/si";
import { TbLayoutDashboardFilled as DashboardIcon } from "react-icons/tb";

import { SidebarGroup } from "./index.routes";

export const SI_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "SI Dashboard",
    items: [
      {
        link: "/si/dashboard",
        text: "Dashboard",
        icon: DashboardIcon,
      },
      {
        link: "/si/orders",
        text: "Orders",
        icon: AnalyticsIcon,
      },
      {
        link: "/si/tasks",
        text: "Tasks",
        icon: TaskMonitorIcon,
      },
    ],
  },
];

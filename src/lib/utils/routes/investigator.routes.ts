import { FaTasks as MyTasksIcon } from "react-icons/fa";
import { TbLayoutDashboardFilled as DashboardIcon } from "react-icons/tb";
import { SidebarGroup } from "./index.routes";

export const INVESTIGATOR_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Investigator Dashboard",
    items: [
      {
        link: "/pi/dashboard",
        text: "Dashboard",
        icon: DashboardIcon,
      },
      {
        link: "/pi/tasks",
        text: "Tasks",
        icon: MyTasksIcon,
      },
    ],
  },
];

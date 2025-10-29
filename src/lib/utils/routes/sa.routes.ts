import { FaTasks } from "react-icons/fa";
import { SidebarGroup } from "./index.routes";
import { RiApps2Line as OverviewIcon, RiTodoLine } from "react-icons/ri";

export const SA_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Tasks",
    items: [
      {
        link: "/sa/dashboard",
        text: "Dashboard",
        icon: OverviewIcon,
      },
      {
        link: "/sa/tasks",
        text: "My Tasks",
        icon: FaTasks,
      },
      {
        link: "/sa/members-tasks",
        text: "Members Tasks",
        icon: RiTodoLine,
      },
    ],
  },
];

import {
  RiPieChart2Line as AnalyticsIcon,
  RiArticleLine as CourseworkIcon,
  RiDashboardLine as OverviewIcon,
  RiMoneyDollarCircleLine as PaymentsIcon,
  RiPlayList2Line as PlaylistManagementIcon,
  RiDashboard3Line,
  RiFileList3Line,
  RiQuestionLine,
} from "react-icons/ri";
import { SidebarGroup } from "./index.routes";
import { FcTodoList } from "react-icons/fc";

export const ANALYST_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Analyst Dashboard",
    items: [
      {
        link: "/analyst/dashboard",
        text: "Dashboard",
        icon: OverviewIcon,
      },
      {
        link: "/analyst/tasks",
        text: "Tasks",
        icon: FcTodoList,
      },
    ],
  },
];

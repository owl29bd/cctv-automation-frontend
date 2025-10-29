import { FaTasks as MyTasksIcon } from "react-icons/fa";
import {
  RiPieChart2Line as AnalyticsIcon,
  RiStackLine as AssignmentIcon,
  RiMoneyDollarCircleLine as BillingIcon,
  RiArticleLine as CourseworkIcon,
  RiDraftLine as ExamIcon,
  RiGroup3Line as FamilyIcon,
  RiBookReadLine as LessonIcon,
  RiShoppingCartLine as OrdersIcon,
  RiApps2Line as OverviewIcon,
  RiBankCardLine as PaymentsIcon,
  RiLineChartLine as ProgressIcon,
  RiFileUnknowLine as QuestionIcon,
  RiFileList3Line as QuestionSetIcon,
  RiArrowLeftRightLine,
  RiBookletLine,
  RiSettings2Line as SettingsIcon,
  RiFolderUserLine as UserManagementIcon,
} from "react-icons/ri";
import { SiGoogletasks as TaskMonitorIcon } from "react-icons/si";
import { TbLayoutDashboardFilled as DashboardIcon } from "react-icons/tb";
import { SidebarGroup } from "./index.routes";

export const PILeader_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "PI Leader Dashboard",
    items: [
      {
        link: "/pi-leader/dashboard",
        text: "Dashboard",
        icon: DashboardIcon,
      },
      {
        link: "/pi-leader/tasks",
        text: "Tasks",
        icon: MyTasksIcon,
      },
    ],
  },
];

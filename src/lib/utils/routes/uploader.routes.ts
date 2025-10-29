import { SidebarGroup } from "./index.routes";
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
  RiOrderPlayLine,
  RiSettings2Line as SettingsIcon,
  RiFolderUserLine as UserManagementIcon,
} from "react-icons/ri";

export const UPLOADER_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Uploader Dashboard",
    items: [
      {
        link: "/uploader/dashboard",
        text: "Dashboard",
        icon: OverviewIcon,
      },
      {
        link: "/uploader/orders",
        text: "Orders",
        icon: RiOrderPlayLine,
      },
    ],
  },
];

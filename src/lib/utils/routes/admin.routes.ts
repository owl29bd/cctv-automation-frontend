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
  // owl29bd
  RiGroup2Fill as GroupManagementIcon,
} from "react-icons/ri";

import { RouteUrls } from "@/lib/constants/url.config";
import { SidebarGroup } from "./index.routes";

export const ADMIN_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Dashboard",
    items: [
      {
        link: RouteUrls.admin.dashboard.index,
        text: "Dashboard",
        icon: OverviewIcon,
      },
      // {
      //   link: RouteUrls.admin.analytics.index,
      //   text: "Analytics",
      //   icon: AnalyticsIcon,
      // },
    ],
  },

  {
    header: "User Management",
    items: [
      {
        link: RouteUrls.admin.userManagement.index,
        text: "User Management",
        icon: UserManagementIcon,
      },
      {
        link: RouteUrls.admin.groupManagement.index,
        text: "Group Management",
        icon: GroupManagementIcon,
      },
      // {
      //   link: RouteUrls.admin.billingManagement.index,
      //   text: "User Billing and Invoices Management",
      //   icon: BillingIcon,
      // },
      // {
      //   link: RouteUrls.admin.familyBilling.index,
      //   text: "Family Billing and Invoices Management",
      //   icon: PaymentsIcon,
      // },
    ],
  },
  // {
  //   header: "Lesson Management",
  //   items: [
  //     {
  //       link: RouteUrls.admin.progressReports.index,
  //       text: "Progress Reports",
  //       icon: ProgressIcon,
  //     },
  //   ],
  // },
  // {
  //   header: "Settings",
  //   items: [
  //     {
  //       link: RouteUrls.admin.systemSettings.index,
  //       text: "System Settings",
  //       icon: SettingsIcon,
  //     },
  //   ],
  // },
];

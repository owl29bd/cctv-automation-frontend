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
    RiSettings2Line as SettingsIcon,
    RiFolderUserLine as UserManagementIcon,
} from "react-icons/ri";

export const USER_SIDEBAR_ITEMS: SidebarGroup[] = [
    {
        header: "User Dashboard",
        items: [
            {
                link: "/user/dashboard",
                text: "Dashboard",
                icon: OverviewIcon,
            },
            {
                link: "/user/analytics",
                text: "Analytics",
                icon: AnalyticsIcon,
            },
        ],
    }
]
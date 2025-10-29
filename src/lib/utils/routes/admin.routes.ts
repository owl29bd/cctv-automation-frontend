import {
  RiApps2Line as OverviewIcon,
  RiFolderUserLine as UserManagementIcon,
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
    ],
  },
];

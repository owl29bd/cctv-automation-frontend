import { RouteUrls } from "@/lib/constants/url.config";
import { RiApps2Line as OverviewIcon } from "react-icons/ri";
import { SidebarGroup } from "./index.routes";

export const ADMINISTRATOR_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Dashboard",
    items: [
      {
        link: RouteUrls.administrator.dashboard.index,
        text: "Dashboard",
        icon: OverviewIcon,
      },
    ],
  },
];

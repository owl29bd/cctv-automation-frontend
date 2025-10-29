import { RouteUrls } from "@/lib/constants/url.config";
import { RiApps2Line as OverviewIcon } from "react-icons/ri";
import { SidebarGroup } from "./index.routes";

export const SERVICE_PROVIDER_SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    header: "Dashboard",
    items: [
      {
        link: RouteUrls.serviceProvider.dashboard.index,
        text: "Dashboard",
        icon: OverviewIcon,
      },
    ],
  },
];

import { RouteUrls } from "@/lib/constants/url.config";
import { LuSwitchCamera } from "react-icons/lu";
import { MdOutlineCameraOutdoor } from "react-icons/md";
import {
  RiCameraOffLine as CameraOffIcon,
  RiCameraLine as CameraOnlineIcon,
  RiApps2Line as OverviewIcon,
} from "react-icons/ri";
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
  {
    header: "Cameras",
    items: [
      {
        link: RouteUrls.administrator.cameras.all,
        text: "All Cameras",
        icon: MdOutlineCameraOutdoor,
      },
      {
        link: RouteUrls.administrator.cameras.online,
        text: "Online Cameras",
        icon: CameraOnlineIcon,
      },
      {
        link: RouteUrls.administrator.cameras.offline,
        text: "Offline Cameras",
        icon: CameraOffIcon,
      },
      {
        link: RouteUrls.administrator.cameras.maintenance,
        text: "Maintenance Cameras",
        icon: LuSwitchCamera,
      },
    ],
  },
];

import { IconType } from "react-icons/lib";
import { ADMIN_SIDEBAR_ITEMS } from "./admin.routes";
import { SERVICE_PROVIDER_SIDEBAR_ITEMS } from "./service-provider.routes";
import { USER_SIDEBAR_ITEMS } from "./user.routes";
import { ADMINISTRATOR_SIDEBAR_ITEMS } from "./administrator.routes";

export interface SidebarItem {
  link: string;
  text: string;
  icon: IconType;
  child?: {
    header?: string;
    items: SidebarItem[];
  };
}

export interface SidebarGroup {
  header?: string;
  items: SidebarItem[];
}

export const roleAccessConfig = {
  admin: ["/"],
  serviceProvider: ["/service-provider/"],
  administrator: ["/administrator/"],
  user: ["/user/"],
};

export const SIDEBAR_ITEMS = {
  ADMIN: ADMIN_SIDEBAR_ITEMS,
  SERVICE_PROVIDER: SERVICE_PROVIDER_SIDEBAR_ITEMS,
  ADMINISTRATOR: ADMINISTRATOR_SIDEBAR_ITEMS,
  USER: USER_SIDEBAR_ITEMS,
};

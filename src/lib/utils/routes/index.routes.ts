import { IconType } from "react-icons/lib";
import { ADMIN_SIDEBAR_ITEMS } from "./admin.routes";
import { DELIVERY_APPROVER_SIDEBAR_ITEMS } from "./delivery-approver.routes";
import { REPORT_APPROVER_SIDEBAR_ITEMS } from "./report-approver.routes";
import { INVESTIGATOR_SIDEBAR_ITEMS } from "./investigator.routes";
import { ANALYST_SIDEBAR_ITEMS } from "./analyst.routes";
import { SA_SIDEBAR_ITEMS } from "./sa.routes";
import { SI_SIDEBAR_ITEMS } from "./si.routes";
import { USER_SIDEBAR_ITEMS } from "./user.routes";
import { UPLOADER_SIDEBAR_ITEMS } from "./uploader.routes";
import { PILeader_SIDEBAR_ITEMS } from "./pi-leader.routes";

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
  approver: ["/approver", "/onboarding"],
  analyst: ["/analyst", "/onboarding"],
  investigator: ["/investigator", "/onboarding"],
  si: ["/si", "/onboarding"],
  sa: ["/sa", "/onboarding"],
  user: ["/onboarding"],
};

export const SIDEBAR_ITEMS = {
  ADMIN: ADMIN_SIDEBAR_ITEMS,
  // APPROVER: APPROVER_SIDEBAR_ITEMS,
  PILEADER: PILeader_SIDEBAR_ITEMS,
  INVESTIGATOR: INVESTIGATOR_SIDEBAR_ITEMS,
  ANALYST: ANALYST_SIDEBAR_ITEMS,
  SA: SA_SIDEBAR_ITEMS,
  SI: SI_SIDEBAR_ITEMS,
  REPORT_APPROVER: REPORT_APPROVER_SIDEBAR_ITEMS,
  DELIVERY_APPROVER: DELIVERY_APPROVER_SIDEBAR_ITEMS,
  USER: USER_SIDEBAR_ITEMS,
  UPLOADER: UPLOADER_SIDEBAR_ITEMS,
};

"use client";

import LinkCardButton from "@/components/common/button/LinkCardButton";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { RiFolderUserLine, RiGroup2Fill } from "react-icons/ri";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <SectionCardLayout title="Dashboard" subtitle="Shortcuts for everything.">
        <div className="flex items-center justify-center gap-4">
          <LinkCardButton
            title="User Management"
            description="Add, edit, and delete users."
            link="/admin/user-management"
            icon={RiFolderUserLine}
          />
          <LinkCardButton
            title="Group Management"
            description="Add, edit, and delete groups."
            link="/admin/group-management"
            icon={RiGroup2Fill}
          />
          {/* <LinkCardButton
            title="System Settings"
            description="View and update system settings."
            link="/admin/system-settings"
            icon={RiListCheck3}
          /> */}
        </div>
      </SectionCardLayout>
    </div>
  );
}

"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { Button } from "@mui/material";
import { RiGroup2Fill as GroupManagementIcon } from "react-icons/ri";
import LinkCardButton from "@/components/common/button/LinkCardButton";

export default function GroupManagementPage() {
  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="Group Management"
        subtitle="See the list of groups and update their information if needed"
        avatarElementLeft={<GroupManagementIcon size={50} />}
        actionElementRight={
          <Button
            variant="outlined"
            href="/admin/group-management/create-new-group"
          >
            Create New Group
          </Button>
        }
      >
        <div className="flex w-full items-center justify-center gap-5">
          <LinkCardButton
            title="Analyst Groups"
            description="View Analyst Groups"
            link="/admin/group-management/analyst-group"
            icon={GroupManagementIcon}
          />
          <LinkCardButton
            title="Investigator Groups"
            description="View Investigator Groups"
            link="/admin/group-management/investigator-group"
            icon={GroupManagementIcon}
          />
        </div>
      </SectionCardLayout>
    </div>
  );
}

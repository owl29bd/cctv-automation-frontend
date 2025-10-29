"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { RiGroup2Fill as GroupManagementIcon } from "react-icons/ri";
import React from "react";
import ShowGroupsTable from "@/components/user-management/tables/ShowGroupsTable";

export default function ViewInvestigatorGroupsPage() {
  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="View Investigator Groups"
        subtitle="See the list of investigator groups and update their information if needed"
        avatarElementLeft={<GroupManagementIcon size={50} />}
      >
        <ShowGroupsTable groupType="Investigator" />
      </SectionCardLayout>
    </div>
  );
}

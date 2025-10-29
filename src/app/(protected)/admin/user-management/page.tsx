"use client";

import { Button } from "@mui/material";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { RiFolderUserFill as UserManagementIcon } from "react-icons/ri";
import UsersTable from "@/components/user-management/tables/UsersTable";

export default function UserManagementPage() {
  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="User Management"
        subtitle="See the list of users and update their data if needed"
        avatarElementLeft={<UserManagementIcon size={50} />}
        actionElementRight={
          <Button
            variant="contained"
            href="/admin/user-management/create-new-user"
          >
            Create New User
          </Button>
        }
      >
        <UsersTable />
      </SectionCardLayout>
    </div>
  );
}

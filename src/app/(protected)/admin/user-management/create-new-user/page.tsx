"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import CreateUserForm from "@/components/user-management/forms/CreateUserForm";
import { CreateUserReq } from "@/lib/dtos/user-management.dto";
import { RiFolderUserFill as UserManagementIcon } from "react-icons/ri";
import useUserManagementAction from "@/hooks/useUserManagementAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CretaeUserPage() {
  const router = useRouter();
  const { userCreationMutation } = useUserManagementAction();

  const onUserCreate = async (data: CreateUserReq) => {
    userCreationMutation.mutate(data, {
      onSuccess: () => {
        toast.success("User created successfully");
        router.push("/admin/user-management");
      },
      onError: (error) => {
        toast.error("Error creating user");
      },
    });
  };

  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="User Management / Create New User"
        subtitle="See the list of groups and update their information if needed"
        avatarElementLeft={<UserManagementIcon size={50} />}
      >
        <CreateUserForm onSubmit={onUserCreate} />
      </SectionCardLayout>
    </div>
  );
}

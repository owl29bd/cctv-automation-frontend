"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { UpdateUserReq } from "@/lib/dtos/user-management.dto";
import { RiFolderUserFill as UserManagementIcon } from "react-icons/ri";
import { Role } from "@/lib/enums/role.enum";
import useUserManagementAction from "@/hooks/useUserManagementAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UpdateUserForm from "@/components/user-management/forms/UpdateUserForm";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const { userUpdateMutation } = useUserManagementAction();
  const router = useRouter();

  const onUserUpdate = (data: UpdateUserReq) => {
    const reqData: UpdateUserReq = {
      id: params.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    };
    userUpdateMutation.mutate(reqData, {
      onSuccess: () => {
        toast.success("User updated successfully");
        router.push("/admin/user-management");
      },
      onError: (error) => {
        toast.error("Error updating user");
      },
    });
  };

  const { useUserQuery } = useUserManagementAction();

  const { data, isLoading } = useUserQuery(params.id);

  const propsData: UpdateUserReq = {
    id: params.id,
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    role: data?.role || Role.User,
  };

  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="User Management / Edit User"
        subtitle="See the list of groups and update their information if needed"
        avatarElementLeft={<UserManagementIcon size={50} />}
      >
        <UpdateUserForm onSubmit={onUserUpdate} initialData={propsData} />
      </SectionCardLayout>
    </div>
  );
}

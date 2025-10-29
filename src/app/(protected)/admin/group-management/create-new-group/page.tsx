"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import CreateGroupForm from "@/components/user-management/forms/CreateGroupForm";
import { CreateGroupReq } from "@/lib/dtos/user-management.dto";
import { RiGroup2Fill as GroupManagementIcon } from "react-icons/ri";
import useGroupManagementAction from "@/hooks/useGroupManagementAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CretaeGrupPage() {
  const { groupCreationMutation } = useGroupManagementAction();
  const router = useRouter();

  const onGroupCreate = (data: CreateGroupReq) => {
    groupCreationMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Group created successfully");
        router.push("/admin/group-management/");
      },
      onError: (error) => {
        toast.error("Error creating group");
      },
    });
  };

  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="Group Management / Create New Group"
        subtitle="See the list of groups and update their information if needed"
        avatarElementLeft={<GroupManagementIcon size={50} />}
      >
        <CreateGroupForm onSubmit={onGroupCreate} />
      </SectionCardLayout>
    </div>
  );
}

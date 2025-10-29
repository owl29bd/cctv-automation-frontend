"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { CreateGroupReq, UpdateGroupReq } from "@/lib/dtos/user-management.dto";
import { RiGroup2Fill as GroupManagementIcon } from "react-icons/ri";
import CreateGroupForm from "@/components/user-management/forms/CreateGroupForm";
import useGroupManagementAction from "@/hooks/useGroupManagementAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/common/loader/LoadingOverlay";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/lib/constants/query-keys";

export default function EditGrupPage({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { useGroupQuery, groupUpdateMutation } = useGroupManagementAction();
  const { data, isLoading } = useGroupQuery(params.id);
  const router = useRouter();

  const onGroupCreate = (data: CreateGroupReq) => {
    const reqData = {
      id: params.id,
      groupName: data.groupName,
      groupLeader: data.groupLeader,
      groupType: data.groupType,
      groupMembers: data.groupMembers,
    };
    groupUpdateMutation.mutate(reqData, {
      onSuccess: () => {
        toast.success("Group updated successfully");
        router.push("/admin/group-management/");
        queryClient.invalidateQueries({queryKey: [QUERYKEYS.groupManagement.getGroup, params.id]});
      },
      onError: (error) => {
        toast.error("Error updating group");
      },
    });
  };

  const propsData: UpdateGroupReq = {
    id: params.id,
    groupName: data?.groupName || "",
    groupType: data?.groupType || "",
    groupLeader: data?.groupLeader.id || "",
    groupMembers: data ? data.groupMembers.map((member) => member.id) : [],
  };

  return (
    <div className="space-y-10 p-4 md:p-10">
      <SectionCardLayout
        title="Group Management / Edit Group"
        subtitle="See the list of groups and update their information if needed"
        avatarElementLeft={<GroupManagementIcon size={50} />}
      >
        <div>
          {isLoading ? (
            <LoadingOverlay />
          ) : (
            <CreateGroupForm
              onSubmit={onGroupCreate}
              defaultValues={propsData}
            />
          )}
        </div>
      </SectionCardLayout>
    </div>
  );
}

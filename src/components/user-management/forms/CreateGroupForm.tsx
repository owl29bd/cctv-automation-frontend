"use client";

import { Button, MenuItem, TextField } from "@mui/material";
import { CreateGroupReq, UpdateGroupReq } from "@/lib/dtos/user-management.dto";
import { CreateGroupValidation } from "@/lib/validators/user-management.validator";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { UserRes } from "@/lib/dtos/user.dto";
import MemberCard from "../cards/MemberCard";
import GroupMemberSelectModal from "../tables/GroupMemberSelectModal";
import GroupLeaderSelectModal from "../tables/GroupLeaderSelectModal";

interface CreateGroupFormProps {
  onSubmit: (data: CreateGroupReq | UpdateGroupReq) => any;
  defaultValues?: CreateGroupReq;
  update?: boolean;
}

export default function CreateGroupForm({
  onSubmit,
  defaultValues: fetchValues,
  update,
}: CreateGroupFormProps) {
  const formMethods = useForm<CreateGroupReq>({
    resolver: zodResolver(CreateGroupValidation),
    defaultValues: {
      groupLeader: "",
      groupMembers: [],
      groupName: fetchValues?.groupName ?? "",
      groupType: fetchValues?.groupType ?? "",
      ...fetchValues,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
    watch,

    reset,
  } = formMethods;

  // new edition
  const [groupType, setGroupType] = useState<string>("");
  const [selectedLeader, setSelectedLeader] = useState<UserRes>();
  const [selectedMembers, setSelectedMembers] = useState<UserRes[]>([]);
  const valuesRef = useRef(getValues());
  const values = valuesRef.current;

  const onGroupLeaderSelect = (user: UserRes) => {
    setSelectedLeader(user);
  };

  const onGroupMemberSelect = (users: UserRes[]) => {
    setSelectedMembers(users);
    setValue(
      "groupMembers",
      users.map((user) => user.id),
    );
  };

  useEffect(() => {
    setValue("groupLeader", values.groupLeader ?? "");
    setGroupType(values.groupType);
    setValue("groupMembers", values.groupMembers ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="w-full gap-5">
      <FormProvider {...formMethods}>
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <TextField
              {...register("groupName")}
              label="Enter Group Name"
              placeholder="Group name"
              variant="outlined"
              fullWidth
              // autoFocus
              error={!!errors.groupName}
              helperText={errors?.groupName?.message}
              defaultValue={getValues().groupName ?? ""}
            />
          </div>
          <TextField
            {...register("groupType", { required: true })}
            select
            disabled={fetchValues?.groupType ? true : false}
            label="Select Group Type"
            variant="outlined"
            fullWidth
            error={!!errors.groupType}
            helperText={errors?.groupType?.message}
            value={watch("groupType") || ""}
            onChange={(e) => {
              setValue("groupType", e.target.value);
              setGroupType(e.target.value as unknown as string);
              setSelectedLeader(undefined);
              setSelectedMembers([]);
            }}
          >
            <MenuItem key="analyst" value="Analyst">
              Analyst Group
            </MenuItem>
            <MenuItem key="investigator" value="Investigator">
              Investigator Group
            </MenuItem>
          </TextField>
          {groupType === "Analyst" && (
            <>
              <GroupLeaderSelectModal
                onUserSelect={onGroupLeaderSelect}
                groupType={groupType}
                defaultValue={values?.groupLeader}
                updateSelectedUser={setSelectedLeader}
              />
              {selectedLeader && (
                <MemberCard
                  id={selectedLeader.id}
                  name={`${selectedLeader.firstName} ${selectedLeader.lastName}`}
                  role={selectedLeader.role}
                />
              )}
              <pre>{JSON.stringify(errors.groupLeader?.message, null, 2)}</pre>
              <GroupMemberSelectModal
                onUsersSelect={onGroupMemberSelect}
                groupType={groupType}
                defaultValues={values?.groupMembers}
                updateSelectedUsers={setSelectedMembers}
              />
            </>
          )}

          {groupType === "Investigator" && (
            <>
              <GroupLeaderSelectModal
                onUserSelect={onGroupLeaderSelect}
                groupType={groupType}
                defaultValue={fetchValues?.groupLeader}
              />
              {selectedLeader && (
                <MemberCard
                  id={selectedLeader.id}
                  name={`${selectedLeader.firstName} ${selectedLeader.lastName}`}
                  role={selectedLeader.role}
                />
              )}
              <pre>{JSON.stringify(errors.groupLeader?.message, null, 2)}</pre>
              <GroupMemberSelectModal
                onUsersSelect={onGroupMemberSelect}
                groupType={groupType}
              />
            </>
          )}

          <pre>{JSON.stringify(errors.groupMembers?.message, null, 2)}</pre>

          {selectedMembers.length > 0 &&
            selectedMembers.map((member) => (
              <MemberCard
                key={member.id}
                id={member.id}
                name={`${member.firstName} ${member.lastName}`}
                role={member.role}
              />
            ))}

          <Button type="submit" fullWidth variant="contained">
            {fetchValues ? "Update Group" : "Create new group"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

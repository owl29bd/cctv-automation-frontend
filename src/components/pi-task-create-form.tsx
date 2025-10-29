import { CreateSubtaskReq } from "@/lib/dtos/create-task.dto";
import { UserRes } from "@/lib/dtos/user.dto";
import { CreateSubTaskValidation } from "@/lib/validators/task.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import UsersSelectModal from "./UsersSelectModal";
import MemberCard from "./user-management/cards/MemberCard";
import { Button } from "@mui/material";

interface PiTaskCreateFormProps {
  onSubmit: (data: CreateSubtaskReq) => any;
  id: string;
}

export default function PiTaskCreateForm({
  onSubmit,
  id,
}: PiTaskCreateFormProps) {
  const [selectedUsers, setSelectedUsers] = useState<UserRes[]>([]);
  const formMethods = useForm<CreateSubtaskReq>({
    resolver: zodResolver(CreateSubTaskValidation),
    defaultValues: {
      dueDate: dayjs().toISOString(),
      assignedTo: [],
    },
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const onUsersSelect = (users: UserRes[]) => {
    setSelectedUsers(users);
  };

  useEffect(() => {
    const assignedTo = selectedUsers.map((user) => user.id);
    setValue("assignedTo", assignedTo);
  }, [selectedUsers, setValue]);

  return (
    <div className="p-6">
      <FormProvider {...formMethods}>
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <DatePicker
            label="Due Date"
            disablePast
            defaultValue={dayjs()}
            sx={{
              width: "100%",
            }}
            onChange={(d: dayjs.Dayjs | null) => {
              if (!d) return;
              setValue("dueDate", d?.toISOString());
            }}
          />
          <UsersSelectModal onUsersSelect={onUsersSelect} id={id} />
          {selectedUsers &&
            selectedUsers.map((user) => (
              <div className="flex flex-row gap-3" key={user.id}>
                <MemberCard
                  id={user.id}
                  name={`${user.firstName} ${user.lastName}`}
                  role={user.role}
                />
              </div>
            ))}
          <Button type="submit" fullWidth variant="contained">
            Create Sub Task
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

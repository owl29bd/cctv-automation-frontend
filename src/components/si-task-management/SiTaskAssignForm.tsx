import { AssignSubTaskReq } from "@/lib/dtos/create-task.dto";
import { UserRes } from "@/lib/dtos/user.dto";
import { TaskType } from "@/lib/enums/tasks-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MemberCard from "../user-management/cards/MemberCard";
import { Role } from "@/lib/enums/role.enum";
import UserSelectModal from "./UserSelectModal";
import { AssignSubTaskValidation } from "@/lib/validators/task.validator";

interface SiTaskAssignFormProps {
  taskType: TaskType;
  onSubmit: (data: AssignSubTaskReq) => any;
}

const columns: MRT_ColumnDef<UserRes>[] = [
  {
    accessorKey: "id",
    header: "Id",
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
    enableColumnFilter: true,
    enableSorting: true,
  },
];

export default function SiTaskAssignForm({
  taskType,
  onSubmit,
}: SiTaskAssignFormProps) {
  const [selectedUser, setSelectedUser] = useState<UserRes>();
  const formMethods = useForm<AssignSubTaskReq>({
    resolver: zodResolver(AssignSubTaskValidation),
    defaultValues: {
      dueDate: dayjs().toISOString(),
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const onUserSelect = (user: UserRes) => {
    setSelectedUser(user);
  };

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
          <UserSelectModal
            onUserSelect={onUserSelect}
            userType={taskType === TaskType.SI_SA ? Role.SA : Role.PIL}
          />
          {selectedUser && (
            <div className="items-center justify-center">
              <MemberCard
                id={selectedUser.id}
                name={`${selectedUser.firstName} ${selectedUser.lastName}`}
                role={selectedUser.role}
              />
            </div>
          )}
          <Button type="submit" fullWidth variant="contained">
            Assign Task
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

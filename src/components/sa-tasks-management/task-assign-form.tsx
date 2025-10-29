"use client";

import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  CreateTaskReq,
  CreateTaskValidation,
} from "@/lib/dtos/create-task.dto";
import ModalLayout from "@/components/common/modal/ModalLayout";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { UserRes } from "@/lib/dtos/user.dto";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import MemberCard from "../user-management/cards/MemberCard";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import useUserManagementAction from "@/hooks/useUserManagementAction";
import LoadingOverlay from "@/components/common/loader/LoadingOverlay";
import dayjs from "dayjs";
import useTaskAction from "@/hooks/sa/useTaskAction";
import { useSession } from "next-auth/react";

interface TaskAssignFormProps {
  onSubmit: (data: CreateTaskReq) => any;
  defaultValues?: Partial<CreateTaskReq>;
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

export default function TaskAssignForm({
  onSubmit,
  defaultValues,
}: TaskAssignFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
    reset,
  } = useForm<CreateTaskReq>({
    resolver: zodResolver(CreateTaskValidation),
    defaultValues,
  });

  const [openMemberAddModal, setMemberAddModal] = useState(false);
  const [memberRowSelection, setMemberRowSelection] = useState({});
  const [renderList, setRenderList] = useState(defaultValues ? true : false);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    columnFilters,
    setColumnFilters,
    columnFilterFns,
    setColumnFilterFns,
  } = useTableQueryParams<UserRes>({ columns });

  useEffect(() => {
    if (defaultValues) {
      const initialMemberSelection = Object.fromEntries(
        defaultValues.assignedTo?.map((memberId) => [memberId, true]) ?? [],
      );
      setMemberRowSelection(initialMemberSelection);
      setSelectedMembers(defaultValues.assignedTo ?? []);
      reset(defaultValues);
    }
  }, [defaultValues, reset, setValue]);

  const session = useSession();
  const { useGetGroupMembers } = useTaskAction();
  const { data, isLoading } = useGetGroupMembers(
    session.data?.user.id,
    queryParamBuilder({ pagination, sorting, search, columnFilters }),
  );

  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    defaultValues ? (defaultValues.assignedTo ?? []) : [],
  );

  const handleMembersSaveChanges = () => {
    const selectedRows = membersTable.getSelectedRowModel().rows;
    setRenderList(true);
    const memberArray = selectedRows.map((member) => member.id);
    setSelectedMembers(memberArray);
    if (selectedRows.length == 0) setRenderList(false);
  };

  const membersTable = useMaterialReactTable<UserRes>({
    columns,
    muiTablePaperProps: { elevation: 0 },
    muiTableBodyCellProps: { sx: { borderColor: "divider" } },
    muiTableHeadCellProps: { sx: { borderColor: "divider" } },
    muiTableContainerProps: { sx: { maxHeight: "50vh" } },
    data: data ? data.data : [],
    rowCount: data?.data.length || 0,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    getRowId: (row) => row.id,
    onRowSelectionChange: setMemberRowSelection,
    enableStickyHeader: true,
    state: {
      isLoading: isLoading,
      pagination,
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
      rowSelection: memberRowSelection,
    },
  });

  useEffect(() => {
    return setValue("assignedTo", selectedMembers);
  }, [selectedMembers, setValue]);

  if (!data || isLoading) return <LoadingOverlay />;

  return (
    <div className="p-6">
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
        <ModalLayout
          title="Select Assigned Members"
          externalControl={{
            open: openMemberAddModal,
            onClose: () => {
              setMemberAddModal(false);
              handleMembersSaveChanges();
            },
          }}
          maxWidth={"md"}
          targetComponent={
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setMemberAddModal(true)}
            >
              Select Assigned Members
            </Button>
          }
          dialogActions={{
            confirmButtonProps: {
              text: "Save changes",
              onClick: handleMembersSaveChanges,
            },
          }}
        >
          <MaterialReactTable table={membersTable} />
        </ModalLayout>
        <pre>{JSON.stringify(errors.assignedTo?.message, null, 2)}</pre>

        {renderList &&
          data?.data &&
          selectedMembers.map((member) => (
            <MemberCard
              key={member}
              id={member}
              name={
                data?.data[data?.data.findIndex((obj) => obj.id === member)]
                  ?.firstName +
                  " " +
                  data?.data[data?.data.findIndex((obj) => obj.id === member)]
                    ?.lastName || ""
              }
              role={
                data?.data[data?.data.findIndex((obj) => obj.id === member)]
                  .role
              }
            />
          ))}

        <Button type="submit" fullWidth variant="contained">
          Assign Task
        </Button>
      </form>
    </div>
  );
}

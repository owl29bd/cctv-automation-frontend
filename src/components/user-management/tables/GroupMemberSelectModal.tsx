"use client";

import useTableQueryParams from "@/hooks/useTableQueryParams";
import { UserRes } from "@/lib/dtos/user.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@mui/material";
import ModalLayout from "@/components/common/modal/ModalLayout";
import useUserManagementAction from "@/hooks/useUserManagementAction";
import { CreateGroupReq } from "@/lib/dtos/user-management.dto";
import { Role } from "@/lib/enums/role.enum";

const columns: MRT_ColumnDef<UserRes>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    Cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
  },
];

interface GroupMemberSelectModalProps {
  onUsersSelect: (users: UserRes[]) => any;
  groupType: string;
  defaultValues?: string[];
  updateSelectedUsers?: (users: UserRes[]) => void;
}

export default function GroupMemberSelectModal({
  onUsersSelect,
  groupType,
  defaultValues,
  updateSelectedUsers,
}: GroupMemberSelectModalProps) {
  const { setValue, getValues, watch } = useFormContext<CreateGroupReq>();

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [selectedUsers, setSelectedUsers] = useState<UserRes[]>([]);

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
  } = useTableQueryParams<UserRes>({
    columns,
    defaultColumnFilters: [
      {
        id: "role",
        value: groupType === "Analyst" ? Role.Analyst : Role.Investigator,
      },
    ],
  });

  const { useGetUsersByRoleQuery } = useUserManagementAction();

  const userRole = groupType === "Analyst" ? Role.Analyst : Role.Investigator;

  const { data, isLoading } = useGetUsersByRoleQuery(
    userRole.toString(),
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const handleUsersSelect = () => {
    if (selectedUsers.length > 0) {
      onUsersSelect(selectedUsers);
    }
  };

  useEffect(() => {
    setRowSelection(
      getValues("groupMembers").reduce(
        (acc, groupMembersId) => ({ ...acc, [groupMembersId]: true }),
        {},
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("groupMembers")]);

  useEffect(() => {
    if (data) {
      const allUsers = new Set([...selectedUsers, ...data.data]);
      setSelectedUsers(
        Array.from(allUsers).filter((user) => rowSelection[user.id]),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, data]);

  useEffect(() => {
    if (defaultValues && data) {
      const defaultMembers = data.data.filter((user) =>
        defaultValues.includes(user.id),
      );
      // handleUsersSelect();
      updateSelectedUsers && updateSelectedUsers(defaultMembers);
      defaultMembers &&
        setValue(
          "groupMembers",
          defaultMembers.map((user) => user.id),
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, data]);

  const table = useMaterialReactTable<UserRes>({
    columns,
    muiTablePaperProps: { elevation: 0 },
    muiTableBodyCellProps: { sx: { borderColor: "divider" } },
    muiTableHeadCellProps: { sx: { borderColor: "divider" } },
    muiTableContainerProps: { sx: { maxHeight: "50vh" } },
    data: data?.data || [],
    rowCount: data?.totalData || 0,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    enableStickyHeader: true,
    enableRowActions: true,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { left: ["mrt-row-actions"] },
    },
    state: {
      pagination,
      isLoading: isLoading,
      showProgressBars: isLoading,
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
      rowSelection,
    },
  });

  return (
    <ModalLayout
      title="Select User to Assign"
      maxWidth="xl"
      targetComponent={
        <Button variant="outlined" fullWidth color="primary">
          Select Group Members
        </Button>
      }
      dialogActions={{
        confirmButtonProps: {
          text: "Select",
          onClick: handleUsersSelect,
        },
        cancelButtonProps: {
          text: "Cancel",
        },
      }}
    >
      <MaterialReactTable table={table} />
    </ModalLayout>
  );
}

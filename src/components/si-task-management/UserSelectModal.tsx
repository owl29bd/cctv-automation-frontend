"use client";

import useTableQueryParams from "@/hooks/useTableQueryParams";
import useUserManagementAction from "@/hooks/useUserManagementAction";
import { UserRes } from "@/lib/dtos/user.dto";
import { Role } from "@/lib/enums/role.enum";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "../common/loader/LoadingOverlay";
import ModalLayout from "../common/modal/ModalLayout";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AssignSubTaskReq } from "@/lib/dtos/create-task.dto";

interface UserSelectModalProps {
  onUserSelect: (assignedTo: UserRes) => void;
  userType: Role;
}

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

export default function UserSelectModal({
  onUserSelect,
  userType,
}: UserSelectModalProps) {
  const [selectedUser, setSelectedUser] = useState<UserRes>();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const { useUserListQuery } = useUserManagementAction();

  const { getValues, watch, setValue } = useFormContext<AssignSubTaskReq>();

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
        value: userType,
      },
    ],
  });

  const { data, isLoading } = useUserListQuery(
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const handleUserSelect = () => {
    if (selectedUser) {
      onUserSelect(selectedUser);
    }
  };

  useEffect(() => {
    if (data) {
      const selectedUserId = Object.keys(rowSelection).find(
        (key) => rowSelection[key],
      );
      const selectedUser = data.data.find((user) => user.id === selectedUserId);
      setSelectedUser(selectedUser);
      if (selectedUser) {
        setValue("assignedTo", selectedUser.id);
      }
    }
  }, [rowSelection]);

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
    enableMultiRowSelection: false,
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

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ModalLayout
      title="Select User to Assign"
      maxWidth="xl"
      targetComponent={
        <Button variant="outlined" fullWidth color="primary">
          Assign User
        </Button>
      }
      dialogActions={{
        confirmButtonProps: {
          text: "Assign",
          onClick: handleUserSelect,
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

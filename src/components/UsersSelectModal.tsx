"use client";

import useGroupManagementAction from "@/hooks/useGroupManagementAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { CreateSubtaskReq } from "@/lib/dtos/create-task.dto";
import { UserRes } from "@/lib/dtos/user.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ModalLayout from "./common/modal/ModalLayout";
import { Button } from "@mui/material";

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

interface UsersSelectModalProps {
  onUsersSelect: (users: UserRes[]) => any;
  id: string;
}

export default function UsersSelectModal({
  onUsersSelect,
  id,
}: UsersSelectModalProps) {
  const { getValues, watch } = useFormContext<CreateSubtaskReq>();

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
  });

  const { useGroupByGroupLeaderQuery } = useGroupManagementAction();

  const { data, isLoading } = useGroupByGroupLeaderQuery(
    id,
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const handleUsersSelect = () => {
    onUsersSelect(selectedUsers);
  };

  useEffect(() => {
    setRowSelection(
      getValues("assignedTo").reduce(
        (acc, assignedToId) => ({ ...acc, [assignedToId]: true }),
        {},
      ),
    );
  }, [watch("assignedTo")]);

  useEffect(() => {
    if (data) {
      const allUsers = new Set([...selectedUsers, ...data.data]);
      setSelectedUsers(
        Array.from(allUsers).filter((user) => rowSelection[user.id]),
      );
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
          Select Members
        </Button>
      }
      dialogActions={{
        confirmButtonProps: {
          text: "Assign",
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

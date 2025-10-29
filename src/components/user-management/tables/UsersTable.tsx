import React from "react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Avatar } from "@mui/material";

// Import the UserRes type
import { type UserRes } from "@/lib/dtos/user.dto";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import useUserManagementAction from "@/hooks/useUserManagementAction";

// Define columns based on UserRes type
const columns: MRT_ColumnDef<UserRes>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    size: 50,
    Cell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Avatar
          src={
            // row.original.photo ||
            "https://uko-react.vercel.app/static/avatar/001-man.svg"
          }
          alt={`${row.original.firstName} ${row.original.lastName}`}
        />
      </Box>
    ),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    size: 100,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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

export default function UsersTable() {
  // hooks
  const router = useRouter();
  const { useUserListQuery } = useUserManagementAction();

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

  const { data, isLoading } = useUserListQuery(
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const usersTable = useMaterialReactTable({
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
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    initialState: {
      columnPinning: { left: ["mrt-row-actions"] },
      columnVisibility: { id: false },
    },
    state: {
      pagination,
      isLoading: isLoading,
      showProgressBars: isLoading,
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
    },
    renderRowActionMenuItems: ({ table, row, closeMenu }) => [
      <MRT_ActionMenuItem
        key={1}
        icon={<EditIcon />}
        label="Edit"
        table={table}
        onClick={() => {
          router.push("/admin/user-management/edit-user/" + row.original.id);
          closeMenu();
        }}
      />,
      <MRT_ActionMenuItem
        key={1}
        icon={<DeleteIcon />}
        label="Delete"
        table={table}
        onClick={() => {
          console.log("delete button clicked");
          closeMenu();
        }}
      />,
    ],
  });

  return <MaterialReactTable table={usersTable} />;
}

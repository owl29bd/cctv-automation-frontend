"use client";

import useSiTaskManagementAction from "@/hooks/si/useSiTaskManagementAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { TaskRes } from "@/lib/dtos/tasks.dto";
import { getChipColorForTaskStatus } from "@/lib/utils/chip.color.util";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import { Button, capitalize, Chip } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import { ViewIcon } from "lucide-react";
import { TaskType } from "@/lib/enums/tasks-enum";

interface ReportApproverTasksTableProps {
  taskType: TaskType;
  userType: string;
}

export default function ReportApproverTasksTable({
  taskType,
  userType,
}: ReportApproverTasksTableProps) {
  const { useGetTaskByTaskType } = useSiTaskManagementAction();

  const columns: MRT_ColumnDef<TaskRes>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "taskType",
      header: "Task Type",
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
      size: 50,
      Cell: ({ row }) => {
        const cellData = row.original.assignedTo;
        return cellData.map((data) => (
          <section key={1}>{data.firstName + " " + data.lastName}</section>
        ));
      },
    },
    {
      accessorKey: "assignedBy",
      header: "Assigned By",
      Cell: ({ row }) =>
        row.original.assignedBy && (
          <span>
            {row.original.assignedBy.firstName +
              " " +
              row.original.assignedBy.lastName}
          </span>
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ row }) => (
        <Chip
          label={capitalize(row.original.status)}
          color={getChipColorForTaskStatus(row.original.status)}
        />
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      Cell: ({ row }) => new Date(row.original.dueDate).toLocaleString(),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Update At",
      Cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <Link href={`/${userType}/tasks/${row.original.id}`}>
          <Button variant="contained" color="primary">
            <ViewIcon /> &nbsp; View
          </Button>
        </Link>
      ),
    },
  ];

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
  } = useTableQueryParams<TaskRes>({ columns });

  const { data, isLoading } = useGetTaskByTaskType(
    taskType,
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const table = useMaterialReactTable<TaskRes>({
    columns,
    data: data?.data || [],
    rowCount: data?.totalData || 0,
    muiTablePaperProps: { elevation: 0 },
    muiTableBodyCellProps: { sx: { borderColor: "divider" } },
    muiTableHeadCellProps: { sx: { borderColor: "divider" } },
    muiTableContainerProps: { sx: { maxHeight: "50vh" } },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    initialState: {
      density: "compact",
      columnPinning: { left: ["Action"] },
      columnVisibility: {
        id: false,
        createdAt: false,
        updatedAt: false,
      },
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
  });

  return <MaterialReactTable table={table} />;
}

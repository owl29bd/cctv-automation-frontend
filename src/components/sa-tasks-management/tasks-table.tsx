import useTableQueryParams from "@/hooks/useTableQueryParams";
import { TaskRes } from "@/lib/dtos/tasks.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import { Button } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { ViewIcon } from "lucide-react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Props {
  myTasks: boolean;
  isSaTasks?: boolean;
  isSubTasks?: boolean;
  useGetTaskAction: (
    userId: string | undefined,
    params: QueryParams,
  ) => UseQueryResult<ApiPaginatedResponse<TaskRes>, Error>;
}

const columns: MRT_ColumnDef<TaskRes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "profileId",
    header: "Profile",
    Cell: ({ row }) => row.original.profileId.name,
  },
  {
    accessorKey: "assignedBy",
    header: "Assigned By",
    Cell: ({ row }) =>
      row.original.assignedBy.firstName +
      " " +
      row.original.assignedBy.lastName,
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    Cell: ({ row }) =>
      row.original.assignedTo.map(
        (assignedTo) => assignedTo.firstName + " " + assignedTo.lastName,
      ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    Cell: ({ row }) => new Date(row.original.dueDate).toLocaleString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ row }) => (
      <span
        className={`rounded-md px-2 py-1 font-bold ${
          row.original.status === "To_do"
            ? "bg-[#c90404]"
            : row.original.status === "In_Review"
              ? "bg-[#fdc241]"
              : row.original.status === "Completed"
                ? "bg-[#2dce89]"
                : "bg-[#9b9a99]"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "taskType",
    header: "Task Type",
    Cell: ({ row }) => (
      <span
        className={`rounded-md px-2 py-1 font-bold ${
          row.original.taskType === "SA => Analyst"
            ? "bg-[#a646ff]"
            : row.original.taskType === "SI => SA"
              ? "bg-[#ff7c24]"
              : "bg-[#9b9a99]"
        }`}
      >
        {row.original.taskType}
      </span>
    ),
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   Cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
  // },
];

export default function TasksTable({
  myTasks,
  useGetTaskAction,
  isSaTasks,
  isSubTasks,
}: Props) {
  let id;
  const params = useParams();
  const session = useSession();
  if (isSubTasks) {
    id = Array.isArray(params.id) ? params.id[0] : params.id;
  } else {
    id = session.data?.user?.id;
  }

  const {
    pagination,
    setPagination,
    search,
    setSearch,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnFilterFns,
    setColumnFilterFns,
  } = useTableQueryParams<TaskRes>({
    columns,
  });
  const { data, isLoading } = useGetTaskAction(
    id,
    queryParamBuilder({
      pagination,
      search,
      sorting,
      columnFilters,
    }),
  );

  const tasksTable = useMaterialReactTable<TaskRes>({
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
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    initialState: {
      columnVisibility: { id: false },
    },
    getRowId: (row) => row.id,
    enableStickyHeader: true,
    state: {
      pagination,
      isLoading: isLoading,
      showProgressBars: isLoading,
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
    },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <div className="flex gap-2 hover:bg-background">
        {isSaTasks && myTasks && (
          <Link href={`/sa/tasks/${row.original.id}`}>
            <Button className="flex gap-1 p-1" variant="contained">
              <ViewIcon size={18} />
              <span className="font-semibold">View</span>
            </Button>
          </Link>
        )}
        {!isSaTasks && myTasks && (
          <Link href={`/analyst/tasks/${row.original.id}`}>
            <Button className="flex gap-1 p-1" variant="contained">
              <ViewIcon size={18} />
              <span className="font-semibold">View</span>
            </Button>
          </Link>
        )}
        {isSaTasks && !myTasks && (
          <Link href={`/sa/tasks/${row.original.id}`}>
            <Button className="flex gap-1 p-1" variant="contained">
              <ViewIcon size={18} />
              <span className="font-semibold">View</span>
            </Button>
          </Link>
        )}
      </div>
    ),
  });

  return <MaterialReactTable table={tasksTable} />;
}

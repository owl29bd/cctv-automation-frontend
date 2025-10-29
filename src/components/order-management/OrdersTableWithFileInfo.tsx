import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ViewIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Box, Button, Chip } from "@mui/material";
import useOrderManagementAction from "@/hooks/userOrderAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { OrderRes } from "@/lib/dtos/order.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import Link from "next/link";

const columns: MRT_ColumnDef<OrderRes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "files",
    header: "Files",
    Cell: ({ row }) =>
      row.original.files.length > 0 ? (
        <Chip label={`(${row.original.files.length}) files`} />
      ) : (
        "No Files"
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
    header: "Updated At",
    Cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
  },
];

export default function OrdersTableWithFileInfo() {
  const router = useRouter();
  const { useOrderListQuery } = useOrderManagementAction();
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
  } = useTableQueryParams<OrderRes>({
    columns,
  });

  const { data, isLoading } = useOrderListQuery(
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const orderTable = useMaterialReactTable<OrderRes>({
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
    renderRowActions: ({ row, table }) => (
      <Box>
        <Link
          href={`/uploader/orders/${row.original.id}`}
          className="flex gap-2"
        >
          <Button className="flex gap-1 p-1" variant="contained">
            <ViewIcon size={18} />
            <span className="font-semibold">View</span>
          </Button>
        </Link>
      </Box>
    ),
  });

  return <MaterialReactTable table={orderTable} />;
}

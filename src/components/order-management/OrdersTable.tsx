"use client";

import useOrderManagementAction from "@/hooks/userOrderAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { OrderRes } from "@/lib/dtos/order.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import { Button } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import { TbListDetails as DetailsIcon } from "react-icons/tb";

interface OrdersTableProps {
  tableType: string;
}

export default function OrdersTable({ tableType = "si" }: OrdersTableProps) {
  const { useOrderListQuery } = useOrderManagementAction();

  const columns: MRT_ColumnDef<OrderRes>[] = [
    {
      header: "Actions",
      Cell: ({ row }) => (
        <Link href={`/${tableType}/orders/` + row.original.id}>
          <Button startIcon={<DetailsIcon />} variant="contained">
            View
          </Button>
        </Link>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      Cell: ({ row }) => new Date(row.original.dueDate).toLocaleString(),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      Cell: ({ row }) => new Date(row.original.dueDate).toLocaleString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Update At",
      Cell: ({ row }) => new Date(row.original.dueDate).toLocaleString(),
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
  } = useTableQueryParams<OrderRes>({ columns });

  const { data, isLoading } = useOrderListQuery(
    queryParamBuilder({
      pagination,
      columnFilters,
      sorting,
      search,
    }),
  );

  const table = useMaterialReactTable<OrderRes>({
    columns,
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
    // enableColumnPinning: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      density: "compact",
      // columnPinning: { left: ["Actions"] },
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

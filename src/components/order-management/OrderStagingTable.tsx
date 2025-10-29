"use client";

import useOrderManagementAction from "@/hooks/si/useSiOrderManagementAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { StagingReportRes } from "@/lib/dtos/report.dto";
import { ReportStatus } from "@/lib/enums/status.enum";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import { getUserRole } from "@/lib/utils/report.util";
import { Button, Chip } from "@mui/material";
import { ViewIcon } from "lucide-react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useSession } from "next-auth/react";
import Link from "next/link";

// props for this component
interface OrderStagingTableProps {
  orderId: string;
  viewReportLink: string;
}

export default function OrderStagingTable({
  orderId,
  viewReportLink,
}: OrderStagingTableProps) {
  const { useGetStagingReportsByOrderId } = useOrderManagementAction();
  const session = useSession();
  const userRole = session.data?.user.role;
  const routeRole = userRole && getUserRole(userRole);

  const columns: MRT_ColumnDef<StagingReportRes>[] = [
    {
      header: "Actions",
      Cell: ({ row }) => {
        const reportId = row.original.reportId;
        const link = "/" + routeRole + "/reports/" + reportId;
        return (
          reportId && (
            <Link href={link}>
              <Button>
                <ViewIcon /> View
              </Button>
            </Link>
          )
        );
      },
    },
    {
      accessorKey: "profileId",
      header: "Profile ID",
    },
    {
      header: "Staging Report",
      Cell: ({ row }) => {
        function getChipLabelAndColor(reportStatus: string) {
          switch (reportStatus) {
            case ReportStatus.ACCEPTED:
              return { label: reportStatus, color: "success" };
            default:
              return { label: "Unavailable", color: "error" };
          }
        }
        const { label, color } = getChipLabelAndColor(
          row.original.reportStatus,
        );
        return <Chip label={label} variant="outlined" color={color as any} />;
      },
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
  } = useTableQueryParams<StagingReportRes>({ columns });

  const { data, isLoading } = useGetStagingReportsByOrderId(
    orderId,
    queryParamBuilder({
      pagination,
      columnFilters,
      search,
    }),
  );

  const table = useMaterialReactTable<StagingReportRes>({
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
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
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
    },
  });

  return <MaterialReactTable table={table} />;
}

"use client";
import useTaskAction from "@/hooks/sa/useTaskAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { ReportRes } from "@/lib/dtos/report.dto";
import { ReportStatus } from "@/lib/enums/status.enum";
import { getUserRole } from "@/lib/utils/report.util";
import { Button } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
  data: ReportRes[];
  isMemberTask?: boolean;
}

const columns: MRT_ColumnDef<ReportRes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "reportLevel",
    header: "Report Level",
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ row }) => (
      <span
        className={`rounded-md px-2 py-1 font-bold ${
          row.original.status === ReportStatus.IN_REVIEW
            ? "bg-[#FDE047]"
            : row.original.status === ReportStatus.ACCEPTED
              ? "bg-[#86EFAC]"
              : row.original.status === ReportStatus.REJECTED
                ? "bg-[#FCA5A5]"
                : "bg-[#9b9a99]"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Submitted At",
    Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];

export default function ReportsTable({ data, isMemberTask }: Props) {
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
  } = useTableQueryParams<ReportRes>({
    columns,
  });

  const isAccepted = data?.some(
    (report) => report.status === ReportStatus.ACCEPTED,
  );
  const { data: session } = useSession();

  const role = session?.user.role ? getUserRole(session.user.role) : null;
  const approveReport = useTaskAction().useApproveReport;

  const handleReportAction = async (reportId: string, status: ReportStatus) => {
    try {
      await approveReport.mutateAsync({ reportId, status });
      toast.success("Report status updated successfully");
    } catch (error) {
      toast.error("Failed to update report status");
    }
  };

  const table = useMaterialReactTable<ReportRes>({
    columns,
    muiTablePaperProps: { elevation: 0 },
    muiTableBodyCellProps: { sx: { borderColor: "divider" } },
    muiTableHeadCellProps: { sx: { borderColor: "divider" } },
    muiTableContainerProps: { sx: { maxHeight: "50vh" } },
    data: data || [],
    rowCount: data?.length || 0,
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
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
    },
    renderRowActions: ({ row }) => {
      if (isMemberTask && !isAccepted) {
        return (
          <div className="flex space-x-2">
            {row.original.status === ReportStatus.IN_REVIEW && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleReportAction(row.original.id, ReportStatus.ACCEPTED)
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    handleReportAction(row.original.id, ReportStatus.REJECTED)
                  }
                >
                  Reject
                </Button>
              </>
            )}
            <Link href={`/${role}/reports/${row.original.id}`}>
              <Button variant="outlined" color="primary">
                View
              </Button>
            </Link>
          </div>
        );
      } else {
        return (
          <Link href={`/${role}/reports/${row.original.id}`}>
            <Button variant="outlined" color="primary">
              View
            </Button>
          </Link>
        );
      }
    },
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

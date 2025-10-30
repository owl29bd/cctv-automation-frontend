import useTableQueryParams from "@/hooks/useTableQueryParams";
import { CameraStatus, type CameraResponse } from "@/lib/dtos/camera.dto";
import { EyeIcon } from "lucide-react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useRouter } from "next/navigation";

// Define columns based on UserRes type
const columns: MRT_ColumnDef<CameraResponse>[] = [
  {
    accessorKey: "name",
    header: "Camera Name",
    size: 100,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 100,
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ row }) => {
      let icon = null;
      let color = "";
      let label = "";

      switch (row.original.status) {
        case CameraStatus.Online:
          icon = (
            <span style={{ color: "#2e7d32", marginRight: 6 }}>
              {/* Green Dot */}
              <svg
                width="16"
                height="16"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <circle cx="8" cy="8" r="6" fill="#2e7d32" />
              </svg>
            </span>
          );
          color = "#2e7d32";
          label = "Online";
          break;
        case CameraStatus.Offline:
          icon = (
            <span style={{ color: "#d32f2f", marginRight: 6 }}>
              {/* Red Dot */}
              <svg
                width="16"
                height="16"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <circle cx="8" cy="8" r="6" fill="#d32f2f" />
              </svg>
            </span>
          );
          color = "#d32f2f";
          label = "Offline";
          break;
        case CameraStatus.Maintenance:
          icon = (
            <span style={{ color: "#ed6c02", marginRight: 6 }}>
              {/* Orange Wrench */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <path
                  d="M13.44 5.41l-1.47 1.47a2.5 2.5 0 0 1-2.84.54L4.18 12A2 2 0 1 0 8 15.82l4.59-4.59a2.5 2.5 0 0 1 .54-2.84l1.47-1.47a.5.5 0 0 0-.7-.7z"
                  fill="#ed6c02"
                />
              </svg>
            </span>
          );
          color = "#ed6c02";
          label = "Maintenance";
          break;
        default:
          label = row.original.status;
      }

      return (
        <span style={{ display: "flex", alignItems: "center", color }}>
          {icon}
          {label}
        </span>
      );
    },
  },
];

export default function MaintenanceCamerasTable() {
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
  } = useTableQueryParams<CameraResponse>({
    columns,
  });

  const router = useRouter();

  const data = [
    {
      id: "1",
      name: "Camera 1",
      description: "Camera 1 description",
      location: "Location 1",
      status: CameraStatus.Maintenance,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Camera 2",
      description: "Camera 2 description",
      location: "Location 2",
      status: CameraStatus.Maintenance,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Camera 3",
      description: "Camera 3 description",
      location: "Location 3",
      status: CameraStatus.Maintenance,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as CameraResponse[];

  const camerasTable = useMaterialReactTable({
    columns,
    muiTablePaperProps: { elevation: 0 },
    muiTableBodyCellProps: { sx: { borderColor: "divider" } },
    muiTableHeadCellProps: { sx: { borderColor: "divider" } },
    muiTableContainerProps: { sx: { maxHeight: "50vh" } },
    data: data || [],
    rowCount: data.length || 0,
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
      columnVisibility: { id: false, createdAt: false, updatedAt: false },
    },
    state: {
      pagination,
      isLoading: false,
      showProgressBars: false,
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
    },
    renderRowActionMenuItems: ({ table, row, closeMenu }) => [
      <MRT_ActionMenuItem
        key={1}
        icon={<EyeIcon />}
        label="View"
        table={table}
        onClick={() => {
          router.push("/administrator/cameras/" + row.original.id);
          closeMenu();
        }}
      />,
    ],
  });

  return <MaterialReactTable table={camerasTable} />;
}

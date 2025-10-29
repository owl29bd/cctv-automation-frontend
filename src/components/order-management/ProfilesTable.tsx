import useProfileAction from "@/hooks/uploader/useProfileAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { ProfileRes } from "@/lib/dtos/profile.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const BlockEditor = dynamic(
  () => import("@/components/common/blockEditor/BlockEditor"),
  {
    ssr: false,
  },
);

const columns: MRT_ColumnDef<ProfileRes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Profile Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone No.",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "details",
    header: "Details",
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

export default function ProfilesTable({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { useProfilesByOrderIdQuery } = useProfileAction();
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
  } = useTableQueryParams<ProfileRes>({
    columns,
  });

  const { data, isLoading } = useProfilesByOrderIdQuery(
    queryParamBuilder({
      pagination,
      search,
      sorting,
      columnFilters,
    }),
    orderId,
  );

  const profilesTable = useMaterialReactTable<ProfileRes>({
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
    renderDetailPanel: ({ row }) =>
      row.original.remarks ? (
        <div>
          <h2 className="font-bold">Remarks:</h2>
          <BlockEditor
            readOnly
            data={{ blocks: row.original.remarks, time: 0, version: "0" }}
          />
        </div>
      ) : null,
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

  return <MaterialReactTable table={profilesTable} />;
}

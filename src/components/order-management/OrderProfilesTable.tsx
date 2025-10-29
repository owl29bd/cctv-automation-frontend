"use client";

import useProfileAction from "@/hooks/uploader/useProfileAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { ProfileRes } from "@/lib/dtos/profile.dto";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { EditIcon } from "lucide-react";
import ModalLayout from "../common/modal/ModalLayout";
import CreateProfileForm from "./create-profile-form";

interface OrderProfilesTableProps {
  orderId: string;
}

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
  {
    accessorKey: "mrt-row-actions",
    header: "Actions",
  },
];

const BlockEditor = dynamic(
  () => import("@/components/common/blockEditor/BlockEditor"),
  {
    ssr: false,
  },
);

export default function OrderProfilesTable({
  orderId,
}: OrderProfilesTableProps) {
  const { useProfileByOrderIdQuery, useProfileUpdateMutation } =
    useProfileAction();

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

  const { data, isLoading } = useProfileByOrderIdQuery(
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
    orderId,
  );

  const table = useMaterialReactTable<ProfileRes>({
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
    renderRowActions: ({ row }) => [
      <>
        <ModalLayout
          title="Edit Profile"
          targetComponent={
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              color="primary"
            >
              Edit
            </Button>
          }
        >
          <CreateProfileForm
            initialData={row.original}
            onSubmit={(data) => {
              useProfileUpdateMutation.mutate({
                ...data,
                id: row.original.id,
              });
              window.location.reload();
            }}
          />
        </ModalLayout>
      </>,
    ],
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
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

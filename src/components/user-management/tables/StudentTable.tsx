// "use client";

// import ModalLayout from "@/components/common/modal/ModalLayout";
// import CourseTable from "@/components/coursework/course/CourseTable";
// import useTableQueryParams from "@/hooks/useTableQueryParams";
// import useUserManagementAction from "@/hooks/useUserManagementAction";
// import { labels } from "@/lib/constants/labels";
// import { UserRes } from "@/lib/dtos/user.dto";
// import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";
// import { Box, Button, capitalize, Chip } from "@mui/material";
// import {
//   MaterialReactTable,
//   MRT_ActionMenuItem,
//   MRT_ColumnDef,
//   useMaterialReactTable,
// } from "material-react-table";
// import React, { useState } from "react";
// import { RiGroupLine as AssignIcon } from "react-icons/ri";

// const columns: MRT_ColumnDef<UserRes>[] = [
//   {
//     accessorKey: "id",
//     header: "ID",
//   },
//   {
//     accessorKey: "firstName",
//     header: "First Name",
//   },
//   {
//     accessorKey: "lastName",
//     header: "Last Name",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//   },
//   {
//     accessorKey: "gender",
//     header: "Gender",
//     Cell: ({ row }) => labels[row.original.gender],
//   },
//   {
//     accessorKey: "role",
//     header: "Role",
//     Cell: ({ row }) => (
//       <Chip variant="outlined" label={capitalize(row.original.role)} />
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "status",
//     Cell: ({ row }) =>
//       row.original.status?.map((status) => (
//         <Chip
//           key={status}
//           variant="outlined"
//           label={capitalize(status)}
//           sx={{ m: 0.5 }}
//         />
//       )),
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Joined At",
//     Cell: ({ row }) => new Date(row.original.createdAt!).toLocaleString(),
//   },
//   {
//     accessorKey: "updatedAt",
//     header: "Last Updated",
//     Cell: ({ row }) => new Date(row.original.updatedAt!).toLocaleString(),
//   },
// ];

// export default function StudentTable() {
//   const [open, setOpen] = useState(false);
//   const [selectedStudentName, setSelectedStudentName] = useState("");
//   const { useUserListQuery } = useUserManagementAction();
//   const {
//     pagination,
//     setPagination,
//     search,
//     setSearch,
//     sorting,
//     setSorting,
//     columnFilters,
//     setColumnFilters,
//     columnFilterFns,
//     setColumnFilterFns,
//   } = useTableQueryParams<UserRes>({
//     columns,
//     defaultColumnFilters: [
//       {
//         id: "role",
//         value: "student",
//       },
//     ],
//   });

//   const { data, isLoading } = useUserListQuery(
//     queryParamBuilder({
//       pagination,
//       sorting,
//       search,
//       columnFilters,
//     }),
//   );

//   const table = useMaterialReactTable<UserRes>({
//     columns,
//     muiTablePaperProps: { elevation: 0 },
//     muiTableBodyCellProps: { sx: { borderColor: "divider" } },
//     muiTableHeadCellProps: { sx: { borderColor: "divider" } },
//     muiTableContainerProps: { sx: { maxHeight: "50vh" } },
//     data: data?.data || [],
//     rowCount: data?.totalData || 0,
//     manualPagination: true,
//     manualFiltering: true,
//     manualSorting: true,
//     enableRowActions: true,
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setSearch,
//     onPaginationChange: setPagination,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnFilterFnsChange: setColumnFilterFns,
//     initialState: {
//       columnPinning: { left: ["mrt-row-actions"] },
//       columnVisibility: { id: false },
//     },
//     getRowId: (row) => row.id,
//     enableStickyHeader: true,
//     state: {
//       pagination,
//       isLoading: isLoading,
//       showProgressBars: isLoading,
//       globalFilter: search,
//       sorting,
//       columnFilters,
//       columnFilterFns,
//     },
//     renderRowActionMenuItems: ({ table, row, closeMenu }) => [
//       <MRT_ActionMenuItem
//       key={1}
//       icon={<AssignIcon size={20} />}
//       label="Assign Tutor"
//       table={table}
//       onClick={() => {
//         setSelectedStudentName(`${row.original.firstName} ${row.original.lastName}`);
//         setOpen(true);
//         closeMenu();
//       }}
//       />
//     ],
//   });

//   return (
//     <div className="">
//       <ModalLayout
//         title="Assign Tutor"
//         subtitle={`Assign tutor to ${selectedStudentName}`}
//         externalControl={{
//           open: !!open,
//           onClose: () => setOpen(false),
//         }}
//         maxWidth="xl"
//         dialogActions={{
//             confirmButtonProps: {
//                 text: "Assign",
//                 onClick: () => {
//                     setOpen(false);
//                 },
//             },
//             cancelButtonProps: {
//                 text: "Cancel",
//                 onClick: () => setOpen(false),
//             }
//         }}
//       >
//         <CourseTable />
//       </ModalLayout>
//       <MaterialReactTable table={table} />
//     </div>
//   );
// }

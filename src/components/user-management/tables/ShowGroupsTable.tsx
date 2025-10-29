import { useMemo } from "react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
// import { RiSearchEyeLine as PreviewIcon } from "react-icons/ri";
import { GroupRes } from "@/lib/dtos/user.dto";
import { CiEdit as EditIcon } from "react-icons/ci";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { useRouter } from "next/navigation";
import useGroupManagementAction from "@/hooks/useGroupManagementAction";
import useTableQueryParams from "@/hooks/useTableQueryParams";
import { queryParamBuilder } from "@/lib/utils/queryParamBuilder";

type GroupsTableProps = {
  groupType: "Analyst" | "Investigator";
};

const ExampleTable = ({ groupType }: GroupsTableProps) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<GroupRes>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "groupName",
        header: "Group Name",
        size: 150,
      },
      {
        accessorKey: "groupType", //normal accessorKey
        header: "Group Type",
        size: 100,
      },
      {
        accessorKey: "groupLeader",
        header: "Group Leader",
        columnDefType: "display",
        size: 150,
        Cell: ({ row }) => {
          const colData = row.original.groupLeader;
          return (
            <section className="px-2" key={colData.id}>
              {colData.firstName + " " + colData.lastName}
            </section>
          );
        },
      },
      {
        accessorKey: "groupMembers",
        header: "Members",
        columnDefType: "display",
        size: 250,
        Cell: ({ row }) => {
          const colData = row.original.groupMembers;
          return colData.map((member, index) => (
            <section className="px-2" key={index}>
              {member.firstName + " " + member.lastName}
            </section>
          ));
        },
      },
    ],
    [],
  );

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
  } = useTableQueryParams<GroupRes>({
    columns,
    defaultColumnFilters: [{ id: "groupType", value: groupType }],
  });

  const { useGroupListQuery } = useGroupManagementAction();
  const { data, isLoading } = useGroupListQuery(
    queryParamBuilder({
      pagination,
      sorting,
      search,
      columnFilters,
    }),
  );

  const router = useRouter();

  const table = useMaterialReactTable({
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
    state: {
      pagination,
      isLoading: isLoading,
      showProgressBars: isLoading,
      globalFilter: search,
      sorting,
      columnFilters,
      columnFilterFns,
    },
    renderRowActionMenuItems: ({ table, row, closeMenu }) => [
      <MRT_ActionMenuItem
        key={1}
        icon={<EditIcon />}
        label="Edit"
        table={table}
        onClick={() => {
          router.push("/admin/group-management/edit-group/" + row.original.id);
          closeMenu();
        }}
      />,
      <MRT_ActionMenuItem
        key={1}
        icon={<DeleteIcon />}
        label="Delete"
        table={table}
        onClick={() => {
          console.log("delete button clicked");
          closeMenu();
        }}
      />,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default ExampleTable;
